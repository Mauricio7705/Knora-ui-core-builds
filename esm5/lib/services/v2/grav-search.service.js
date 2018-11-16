import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtendedSearchParams, SearchParamsService } from './search-params.service';
import { KnoraConstants, KnoraSchema, Utils } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "./search-params.service";
/**
 * Represents an error that occurred when generating KnarQL.
 */
var GravsearchGenerationError = /** @class */ (function (_super) {
    tslib_1.__extends(GravsearchGenerationError, _super);
    function GravsearchGenerationError(msg) {
        return _super.call(this, msg) || this;
    }
    return GravsearchGenerationError;
}(Error));
var GravsearchGenerationService = /** @class */ (function () {
    function GravsearchGenerationService(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns {string} the corresponding Iri of the simple type (knora-api simple).
       */
    GravsearchGenerationService.prototype.convertComplexTypeToSimpleType = function (complexType) {
        var simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
        if (simpleType !== undefined) {
            return simpleType;
        }
        else {
            throw new GravsearchGenerationError("complex type " + complexType + " could not be converted to simple type.");
        }
    };
    /**
       * Generates a Gravsearch query from the provided arguments.
       *
       * @param {PropertyWithValue[]} properties the properties specified by the user.
       * @param {string} mainResourceClassOption the class of the main resource, if specified.
       * @param offset the offset to be used (nth page of results).
       * @returns {string} a KnarQL query string.
       */
    GravsearchGenerationService.prototype.createGravsearchQuery = function (properties, mainResourceClassOption, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        // class restriction for the resource searched for
        var mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = "?mainRes a <" + Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption) + "> .";
        }
        // criteria for the order by statement
        var orderByCriteria = [];
        // statements to be returned in query results
        var returnStatements = [];
        // loop over given properties and create statements and Filters and type annotations from them
        var props = properties.map(function (propWithVal, index) {
            var propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
            var simpleType;
            if (!propWithVal.property.isLinkProperty) {
                simpleType = _this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
            }
            else {
                simpleType = KnoraConstants.resourceSimple;
            }
            // represents the object of a statement
            var propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = "?propVal" + index;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple);
            }
            // generate statement
            var statement = "?mainRes <" + propIriSimple + "> " + propValue + " .";
            // type annotations
            var propTypeAnnotation = "<" + propIriSimple + "> knora-api:objectType <" + simpleType + "> .";
            var propValueAnnotation = propValue + " a <" + simpleType + "> .";
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = "FILTER NOT EXISTS {\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n}";
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = "\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n";
            }
            // generate filter if comparison operator is not Exists
            var filter = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // use regex function for LIKE
                    filter = "FILTER regex(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ", \"i\")";
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // use contains function for MATCH
                    filter = "FILTER <" + KnoraConstants.matchFunction + ">(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
                else {
                    filter = "FILTER(" + propValue + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return statement + "\n" + filter + "\n";
        });
        var orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = "\nORDER BY " + orderByCriteria.join(' ') + "\n";
        }
        // template of the KnarQL query with dynamic components
        var gravsearchTemplate = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\nCONSTRUCT {\n\n?mainRes knora-api:isMainResource true .\n\n" + returnStatements.join('\n') + "\n\n} WHERE {\n\n?mainRes a knora-api:Resource .\n\n" + mainResourceClass + "\n\n" + props.join('') + "\n\n}\n" + orderByStatement;
        // offset component of the KnarQL query
        var offsetTemplate = "\nOFFSET " + offset + "\n";
        // function that generates the same KnarQL query with the given offset
        var generateGravsearchQueryWithCustomOffset = function (localOffset) {
            var offsetCustomTemplate = "\nOFFSET " + localOffset + "\n";
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        // console.log(knarqlTemplate + offsetTemplate);
        return gravsearchTemplate + offsetTemplate;
    };
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
    GravsearchGenerationService.ctorParameters = function () { return [
        { type: SearchParamsService }
    ]; };
    GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(i1.SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
    return GravsearchGenerationService;
}());
export { GravsearchGenerationService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUd4RTs7R0FFRztBQUNIO0lBQXdDLHFEQUFLO0lBRXpDLG1DQUFZLEdBQVc7ZUFDbkIsa0JBQU0sR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQUxELENBQXdDLEtBQUssR0FLNUM7QUFFRDtJQTJCSSxxQ0FBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7SUFBSSxDQUFDO0lBRWxFOzs7OztTQUtLO0lBQ0csb0VBQThCLEdBQXRDLFVBQXVDLFdBQW1CO1FBRXRELElBQU0sVUFBVSxHQUFXLDJCQUEyQixDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWxHLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxJQUFJLHlCQUF5QixDQUFDLGtCQUFnQixXQUFXLDRDQUF5QyxDQUFDLENBQUM7UUFDOUcsQ0FBQztJQUVMLENBQUM7SUFFRDs7Ozs7OztTQU9LO0lBQ0UsMkRBQXFCLEdBQTVCLFVBQTZCLFVBQStCLEVBQUUsdUJBQWdDLEVBQUUsTUFBa0I7UUFBbEgsaUJBNklDO1FBN0krRix1QkFBQSxFQUFBLFVBQWtC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YyxDQUFDLGFBQWE7UUFDdkYscURBQXFELEVBQUUsY0FBYyxDQUFDLE1BQU07UUFDNUUsZ0VBQWdFLEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDM0Ysc0RBQXNELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDakYsaUVBQWlFLEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDNUYseURBQXlELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDcEYsMkRBQTJELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDdEYsOERBQThELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDekYsMERBQTBELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDckYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLFNBQVM7S0FDbkYsQ0FBQzs7Z0JBekJMLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBaEI4QixtQkFBbUI7OztzQ0FEbEQ7Q0FxTkMsQUF0TUQsSUFzTUM7U0FuTVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8vIG1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lc1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLCAvLyB1c2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplclxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXggdHlwZSBJcmkgdG8gYSBzaW1wbGUgdHlwZSBJcmkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhUeXBlIHRoZSBJcmkgb2YgYSB2YWx1ZSB0eXBlIChrbm9yYS1hcGkgY29tcGxleCkuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgY29ycmVzcG9uZGluZyBJcmkgb2YgdGhlIHNpbXBsZSB0eXBlIChrbm9yYS1hcGkgc2ltcGxlKS5cbiAgICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKGNvbXBsZXhUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVR5cGU6IHN0cmluZyA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVtjb21wbGV4VHlwZV07XG5cbiAgICAgICAgaWYgKHNpbXBsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvcihgY29tcGxleCB0eXBlICR7Y29tcGxleFR5cGV9IGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gc2ltcGxlIHR5cGUuYCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtQcm9wZXJ0eVdpdGhWYWx1ZVtdfSBwcm9wZXJ0aWVzIHRoZSBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYWluUmVzb3VyY2VDbGFzc09wdGlvbiB0aGUgY2xhc3Mgb2YgdGhlIG1haW4gcmVzb3VyY2UsIGlmIHNwZWNpZmllZC5cbiAgICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iXX0=