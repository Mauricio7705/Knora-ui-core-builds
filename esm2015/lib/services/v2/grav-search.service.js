import { Injectable } from '@angular/core';
import { ExtendedSearchParams, SearchParamsService } from './search-params.service';
import { KnoraConstants, KnoraSchema, Utils } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "./search-params.service";
/**
 * Represents an error that occurred when generating KnarQL.
 */
class GravsearchGenerationError extends Error {
    constructor(msg) {
        super(msg);
    }
}
export class GravsearchGenerationService {
    constructor(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns string - the corresponding Iri of the simple type (knora-api simple).
       */
    convertComplexTypeToSimpleType(complexType) {
        const simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
        if (simpleType !== undefined) {
            return simpleType;
        }
        else {
            throw new GravsearchGenerationError(`complex type ${complexType} could not be converted to simple type.`);
        }
    }
    /**
       * Generates a Gravsearch query from the provided arguments.
       *
       * @param {PropertyWithValue[]} properties the properties specified by the user.
       * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
       * @param {number} offset the offset to be used (nth page of results).
       * @returns string - a KnarQL query string.
       */
    createGravsearchQuery(properties, mainResourceClassOption, offset = 0) {
        // class restriction for the resource searched for
        let mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = `?mainRes a <${Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption)}> .`;
        }
        // criteria for the order by statement
        const orderByCriteria = [];
        // statements to be returned in query results
        const returnStatements = [];
        // loop over given properties and create statements and Filters and type annotations from them
        const props = properties.map((propWithVal, index) => {
            const propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
            let simpleType;
            if (!propWithVal.property.isLinkProperty) {
                simpleType = this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
            }
            else {
                simpleType = KnoraConstants.resourceSimple;
            }
            // represents the object of a statement
            let propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = `?propVal${index}`;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple);
            }
            // generate statement
            let statement = `?mainRes <${propIriSimple}> ${propValue} .`;
            // type annotations
            const propTypeAnnotation = `<${propIriSimple}> knora-api:objectType <${simpleType}> .`;
            const propValueAnnotation = `${propValue} a <${simpleType}> .`;
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = `FILTER NOT EXISTS {
${statement}
${propTypeAnnotation}
${propValueAnnotation}
}`;
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = `
${statement}
${propTypeAnnotation}
${propValueAnnotation}
`;
            }
            // generate filter if comparison operator is not Exists
            let filter = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // use regex function for LIKE
                    filter = `FILTER regex(${propValue}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)}, "i")`;
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // use contains function for MATCH
                    filter = `FILTER <${KnoraConstants.matchFunction}>(${propValue}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)})`;
                }
                else {
                    filter = `FILTER(${propValue} ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)})`;
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return `${statement}
${filter}
`;
        });
        let orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = `
ORDER BY ${orderByCriteria.join(' ')}
`;
        }
        // template of the KnarQL query with dynamic components
        const gravsearchTemplate = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
CONSTRUCT {

?mainRes knora-api:isMainResource true .

${returnStatements.join('\n')}

} WHERE {

?mainRes a knora-api:Resource .

${mainResourceClass}

${props.join('')}

}
${orderByStatement}`;
        // offset component of the KnarQL query
        const offsetTemplate = `
OFFSET ${offset}
`;
        // function that generates the same KnarQL query with the given offset
        const generateGravsearchQueryWithCustomOffset = (localOffset) => {
            const offsetCustomTemplate = `
OFFSET ${localOffset}
`;
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        // console.log(knarqlTemplate + offsetTemplate);
        return gravsearchTemplate + offsetTemplate;
    }
}
/**
 * Map of complex knora-api value types to simple ones.
 * Use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer.
 */
GravsearchGenerationService.typeConversionComplexToSimple = {
    'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.xsdInteger,
    'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.xsdDecimal,
    'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.xsdBoolean,
    'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.xsdString,
    'http://api.knora.org/ontology/knora-api/v2#DateValue': KnoraConstants.dateSimple,
    'http://api.knora.org/ontology/knora-api/v2#IntervalValue': KnoraConstants.intervalSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeomValue': KnoraConstants.geomSimple,
    'http://api.knora.org/ontology/knora-api/v2#ColorValue': KnoraConstants.colorSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeonameValue': KnoraConstants.geonameSimple,
    'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.xsdUri,
    'http://api.knora.org/ontology/knora-api/v2#StillImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#FileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DDDFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#AudioFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DocumentFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#TextFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.xsdString
};
GravsearchGenerationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
GravsearchGenerationService.ctorParameters = () => [
    { type: SearchParamsService }
];
GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(i1.SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBR3hFOztHQUVHO0FBQ0gsK0JBQWdDLFNBQVEsS0FBSztJQUV6QyxZQUFZLEdBQVc7UUFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBS0QsTUFBTTtJQTJCRixZQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUFJLENBQUM7SUFFbEU7Ozs7O1NBS0s7SUFDRyw4QkFBOEIsQ0FBQyxXQUFtQjtRQUV0RCxNQUFNLFVBQVUsR0FBVywyQkFBMkIsQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSx5QkFBeUIsQ0FBQyxnQkFBZ0IsV0FBVyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQzlHLENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7Ozs7U0FPSztJQUNFLHFCQUFxQixDQUFDLFVBQStCLEVBQUUsdUJBQWdDLEVBQUUsU0FBaUIsQ0FBQztRQUU5RyxrREFBa0Q7UUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFM0IsK0RBQStEO1FBQy9ELEVB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QUFxRCxFQUFFLGNBQWMsQ0FBQyxNQUFNO0lBQzVFLGdFQUFnRSxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQzNGLHNEQUFzRCxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQ2pGLGlFQUFpRSxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQzVGLHlEQUF5RCxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQ3BGLDJEQUEyRCxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQ3RGLDhEQUE4RCxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQ3pGLDBEQUEwRCxFQUFFLGNBQWMsQ0FBQyxVQUFVO0lBQ3JGLHNEQUFzRCxFQUFFLGNBQWMsQ0FBQyxTQUFTO0NBQ25GLENBQUM7O1lBNUJMLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQWhCOEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIE1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lcy5cbiAgICAgKiBVc2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlcixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkgZnJvbSB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21haW5SZXNvdXJjZUNsYXNzT3B0aW9uXSB0aGUgY2xhc3Mgb2YgdGhlIG1haW4gcmVzb3VyY2UsIGlmIHNwZWNpZmllZC5cbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iXX0=