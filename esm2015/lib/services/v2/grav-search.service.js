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
       * @returns {string} the corresponding Iri of the simple type (knora-api simple).
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
       * @param {string} mainResourceClassOption the class of the main resource, if specified.
       * @param {number} offset the offset to be used (nth page of results).
       * @returns {string} a KnarQL query string.
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
// map of complex knora-api value types to simple ones
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBR3hFOztHQUVHO0FBQ0gsK0JBQWdDLFNBQVEsS0FBSztJQUV6QyxZQUFZLEdBQVc7UUFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBS0QsTUFBTTtJQXdCRixZQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUFJLENBQUM7SUFFbEU7Ozs7O1NBS0s7SUFDRyw4QkFBOEIsQ0FBQyxXQUFtQjtRQUV0RCxNQUFNLFVBQVUsR0FBVywyQkFBMkIsQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSx5QkFBeUIsQ0FBQyxnQkFBZ0IsV0FBVyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQzlHLENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7Ozs7U0FPSztJQUNFLHFCQUFxQixDQUFDLFVBQStCLEVBQUUsdUJBQWdDLEVBQUUsU0FBaUIsQ0FBQztRQUU5RyxrREFBa0Q7UUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFM0IsK0RBQStEO1FBQy9ELEVB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REFBcUQsRUFBRSxjQUFjLENBQUMsTUFBTTtJQUM1RSxnRUFBZ0UsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUMzRixzREFBc0QsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNqRixpRUFBaUUsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUM1Rix5REFBeUQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNwRiwyREFBMkQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUN0Riw4REFBOEQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUN6RiwwREFBMEQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNyRixzREFBc0QsRUFBRSxjQUFjLENBQUMsU0FBUztDQUNuRixDQUFDOztZQXpCTCxVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7WUFoQjhCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBTZWFyY2hQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgd2hlbiBnZW5lcmF0aW5nIEtuYXJRTC5cbiAqL1xuY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSB7XG5cbiAgICAvLyBtYXAgb2YgY29tcGxleCBrbm9yYS1hcGkgdmFsdWUgdHlwZXMgdG8gc2ltcGxlIG9uZXNcbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlciwgLy8gdXNlIGNvbXB1dGVkIHByb3BlcnR5IG5hbWU6IGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QtaW5pdGlhbGl6ZXJcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkgZnJvbSB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFpblJlc291cmNlQ2xhc3NPcHRpb24gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAobnRoIHBhZ2Ugb2YgcmVzdWx0cykuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXM6IFByb3BlcnR5V2l0aFZhbHVlW10sIG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uPzogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgcmVzb3VyY2Ugc2VhcmNoZWQgZm9yXG4gICAgICAgIGxldCBtYWluUmVzb3VyY2VDbGFzcyA9ICcnO1xuXG4gICAgICAgIC8vIGlmIGdpdmVuLCBjcmVhdGUgdGhlIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgbWFpbiByZXNvdXJjZVxuICAgICAgICBpZiAobWFpblJlc291cmNlQ2xhc3NPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFpblJlc291cmNlQ2xhc3MgPSBgP21haW5SZXMgYSA8JHtVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUobWFpblJlc291cmNlQ2xhc3NPcHRpb24pfT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgRmlsdGVycyBhbmQgdHlwZSBhbm5vdGF0aW9ucyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wSXJpU2ltcGxlID0gVXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKHByb3BXaXRoVmFsLnByb3BlcnR5LmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaW1wbGVUeXBlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IHRoaXMuY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKHByb3BXaXRoVmFsLnByb3BlcnR5Lm9iamVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5yZXNvdXJjZVNpbXBsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50OiBzdHJpbmcgPSBgP21haW5SZXMgPCR7cHJvcElyaVNpbXBsZX0+ICR7cHJvcFZhbHVlfSAuYDtcblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVHlwZUFubm90YXRpb24gPSBgPCR7cHJvcElyaVNpbXBsZX0+IGtub3JhLWFwaTpvYmplY3RUeXBlIDwke3NpbXBsZVR5cGV9PiAuYDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVBbm5vdGF0aW9uID0gYCR7cHJvcFZhbHVlfSBhIDwke3NpbXBsZVR5cGV9PiAuYDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSB0aGF0IGhhcyB0byBiZSB3cmFwcGVkIGluIGEgRklMVEVSIE5PVCBFWElTVFMgKGNvbXBhcmlzb24gb3BlcmF0b3IgTk9UX0VRVUFMUykgdG8gbmVnYXRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNsdWRlIHN0YXRlbWVudCBpbiByZXN1bHRzLCBiZWNhdXNlIHRoZSBxdWVyeSBjaGVja3MgZm9yIHRoZSBhYnNlbmNlIG9mIHRoaXMgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBGSUxURVIgTk9UIEVYSVNUUyB7XG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxufWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgc3RhdGVtZW50IHNob3VsZCBiZSByZXR1cm5lZCByZXR1cm5lZCBpbiByZXN1bHRzIChCb29sZWFuIGZsYWcgZnJvbSBjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RhdGVtZW50cy5wdXNoKHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGZpbHRlciBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSBhIEZJTFRFUiBpZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRVhJU1RTIGFuZCBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTGlrZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSByZWdleCBmdW5jdGlvbiBmb3IgTElLRVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiByZWdleCgke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9LCBcImlcIilgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdNYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjb250YWlucyBmdW5jdGlvbiBmb3IgTUFUQ0hcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgPCR7S25vcmFDb25zdGFudHMubWF0Y2hGdW5jdGlvbn0+KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIoJHtwcm9wVmFsdWV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCB2YWx1ZSBpcyBhIHNvcnQgY3JpdGVyaW9uXG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLmlzU29ydENyaXRlcmlvbikgb3JkZXJCeUNyaXRlcmlhLnB1c2gocHJvcFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnR9XG4ke2ZpbHRlcn1cbmA7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5U3RhdGVtZW50ID0gJyc7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlDcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckJ5U3RhdGVtZW50ID0gYFxuT1JERVIgQlkgJHtvcmRlckJ5Q3JpdGVyaWEuam9pbignICcpfVxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRlbXBsYXRlIG9mIHRoZSBLbmFyUUwgcXVlcnkgd2l0aCBkeW5hbWljIGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaFRlbXBsYXRlID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuQ09OU1RSVUNUIHtcblxuP21haW5SZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4ke3JldHVyblN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbn0gV0hFUkUge1xuXG4/bWFpblJlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbiR7bWFpblJlc291cmNlQ2xhc3N9XG5cbiR7cHJvcHMuam9pbignJyl9XG5cbn1cbiR7b3JkZXJCeVN0YXRlbWVudH1gO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEtuYXJRTCBxdWVyeVxuICAgICAgICBjb25zdCBvZmZzZXRUZW1wbGF0ZSA9IGBcbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIHNhbWUgS25hclFMIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQgPSAobG9jYWxPZmZzZXQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbk9GRlNFVCAke2xvY2FsT2Zmc2V0fVxuYDtcblxuICAgICAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEtuYXJRTCBxdWVyeSBjYW4gYmUgY3JlYXRlZCB3aXRoIGFuIGluY3JlYXNlZCBvZmZzZXRcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuY2hhbmdlU2VhcmNoUGFyYW1zTXNnKG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcyhnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGtuYXJxbFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcblxuICAgIH1cblxufVxuIl19