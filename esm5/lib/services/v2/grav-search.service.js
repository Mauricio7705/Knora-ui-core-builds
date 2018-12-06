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
       * @returns string - the corresponding Iri of the simple type (knora-api simple).
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
       * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
       * @param {number} offset the offset to be used (nth page of results).
       * @returns string - a KnarQL query string.
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
    GravsearchGenerationService.ctorParameters = function () { return [
        { type: SearchParamsService }
    ]; };
    GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(i1.SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
    return GravsearchGenerationService;
}());
export { GravsearchGenerationService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUd4RTs7R0FFRztBQUNIO0lBQXdDLHFEQUFLO0lBRXpDLG1DQUFZLEdBQVc7ZUFDbkIsa0JBQU0sR0FBRyxDQUFDO0lBQ2QsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQUxELENBQXdDLEtBQUssR0FLNUM7QUFFRDtJQThCSSxxQ0FBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7SUFBSSxDQUFDO0lBRWxFOzs7OztTQUtLO0lBQ0csb0VBQThCLEdBQXRDLFVBQXVDLFdBQW1CO1FBRXRELElBQU0sVUFBVSxHQUFXLDJCQUEyQixDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWxHLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxJQUFJLHlCQUF5QixDQUFDLGtCQUFnQixXQUFXLDRDQUF5QyxDQUFDLENBQUM7UUFDOUcsQ0FBQztJQUVMLENBQUM7SUFFRDs7Ozs7OztTQU9LO0lBQ0UsMkRBQXFCLEdBQTVCLFVBQTZCLFVBQStCLEVBQUUsdUJBQWdDLEVBQUUsTUFBa0I7UUFBbEgsaUJBNklDO1FBN0krRix1QkFBQSxFQUFBLFVBQWtCO1FBRTlHLGtEQUFrRDtRQUNsRCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUUzQiwrREFBK0Q7UUFDL0QsRUFBRSxDQUFDLENBQUMsdUJBQXVCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QyxpQkFBaUIsR0FBRyxpQkFBZSxLQUFLLENBQUMsdUNBQXVDLENBQUMsdUJBQXVCLENBQUMsUUFBSyxDQUFDO1FBQ25ILENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTNCLDZDQUE2QztRQUM3QyxJQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU1Qiw4RkFBOEY7UUFDOUYsSUFBTSxLQUFLLEdBQWEsVUFBVSxDQUFDLEdBQUcsQ0FDbEMsVUFBQyxXQUE4QixFQUFFLEtBQWE7WUFFMUMsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFN0YsSUFBSSxVQUFVLENBQUM7WUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsVUFBVSxHQUFHLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsdUNBQXVDO1lBQ3ZDLElBQUksU0FBUyxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xILG9HQUFvRztnQkFDcEcsMkdBQTJHO2dCQUMzRyxTQUFTLEdBQUcsYUFBVyxLQUFPLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGtGQUFrRjtnQkFDbEYsU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUUsQ0FBQztZQUVELHFCQUFxQjtZQUNyQixJQUFJLFNBQVMsR0FBVyxlQUFhLGFBQWEsVUFBSyxTQUFTLE9BQUksQ0FBQztZQUVyRSxtQkFBbUI7WUFDbkIsSUFBTSxrQkFBa0IsR0FBRyxNQUFJLGFBQWEsZ0NBQTJCLFVBQVUsUUFBSyxDQUFDO1lBQ3ZGLElBQU0sbUJBQW1CLEdBQU0sU0FBUyxZQUFPLFVBQVUsUUFBSyxDQUFDO1lBRS9ELGdJQUFnSTtZQUNoSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BILGtHQUFrRztnQkFDbEcsU0FBUyxHQUFHLDBCQUM5QixTQUFTLFVBQ1Qsa0JBQWtCLFVBQ2xCLG1CQUFtQixRQUNuQixDQUFDO1lBQ2EsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLCtGQUErRjtnQkFDL0YsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLEdBQUcsT0FDOUIsU0FBUyxVQUNULGtCQUFrQixVQUNsQixtQkFBbUIsT0FDcEIsQ0FBQztZQUNjLENBQUM7WUFFRCx1REFBdUQ7WUFDdkQsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDO1lBQ3hCLGlHQUFpRztZQUNqRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFbEgsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4RSw4QkFBOEI7b0JBQzlCLE1BQU0sR0FBRyxrQkFBZ0IsU0FBUyxVQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQVEsQ0FBQztnQkFDL0csQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNoRixrQ0FBa0M7b0JBQ2xDLE1BQU0sR0FBRyxhQUFXLGNBQWMsQ0FBQyxhQUFhLFVBQUssU0FBUyxVQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQUcsQ0FBQztnQkFDdEksQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLEdBQUcsWUFBVSxTQUFTLFNBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFNBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBRyxDQUFDO2dCQUN2SixDQUFDO1lBQ0wsQ0FBQztZQUVELDZDQUE2QztZQUM3QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO2dCQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFakUsTUFBTSxDQUFJLFNBQVMsVUFDakMsTUFBTSxPQUNQLENBQUM7UUFFVSxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixnQkFBZ0IsR0FBRyxnQkFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FDbkMsQ0FBQztRQUNNLENBQUM7UUFFRCx1REFBdUQ7UUFDdkQsSUFBTSxrQkFBa0IsR0FBRywwSUFNakMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw0REFNM0IsaUJBQWlCLFlBRWpCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBR2QsZ0JBQWtCLENBQUM7UUFFYix1Q0FBdUM7UUFDdkMsSUFBTSxjQUFjLEdBQUcsY0FDdEIsTUFBTSxPQUNkLENBQUM7UUFFTSxzRUFBc0U7UUFDdEUsSUFBTSx1Q0FBdUMsR0FBRyxVQUFDLFdBQW1CO1lBQ2hFLElBQU0sb0JBQW9CLEdBQUcsY0FDaEMsV0FBVyxPQUNuQixDQUFDO1lBRVUsTUFBTSxDQUFDLGtCQUFrQixHQUFHLG9CQUFvQixDQUFDO1FBQ3JELENBQUMsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YscUZBQXFGO1lBQ3JGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQztRQUN2SCxDQUFDO1FBRUQsZ0RBQWdEO1FBRWhELE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7SUFFL0MsQ0FBQztJQWxNRDs7O09BR0c7SUFDVyx5REFBNkIsR0FBRztRQUMxQyxxREFBcUQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNoRix5REFBeUQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNwRix5REFBeUQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNwRixzREFBc0QsRUFBRSxjQUFjLENBQUMsU0FBUztRQUNoRixzREFBc0QsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNqRiwwREFBMEQsRUFBRSxjQUFjLENBQUMsY0FBYztRQUN6RixzREFBc0QsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNqRix1REFBdUQsRUFBRSxjQUFjLENBQUMsV0FBVztRQUNuRix5REFBeUQsRUFBRSxjQUFjLENBQUMsYUFBYTtRQUN2RixxREFBcUQsRUFBRSxjQUFjLENBQUMsTUFBTTtRQUM1RSxnRUFBZ0UsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUMzRixzREFBc0QsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNqRixpRUFBaUUsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUM1Rix5REFBeUQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNwRiwyREFBMkQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUN0Riw4REFBOEQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUN6RiwwREFBMEQsRUFBRSxjQUFjLENBQUMsVUFBVTtRQUNyRixzREFBc0QsRUFBRSxjQUFjLENBQUMsU0FBUztLQUNuRixDQUFDOztnQkE1QkwsVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFoQjhCLG1CQUFtQjs7O3NDQURsRDtDQXdOQyxBQXpNRCxJQXlNQztTQXRNWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSwgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgUHJvcGVydHlXaXRoVmFsdWUgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlcnJvciB0aGF0IG9jY3VycmVkIHdoZW4gZ2VuZXJhdGluZyBLbmFyUUwuXG4gKi9cbmNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXggdHlwZSBJcmkgdG8gYSBzaW1wbGUgdHlwZSBJcmkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhUeXBlIHRoZSBJcmkgb2YgYSB2YWx1ZSB0eXBlIChrbm9yYS1hcGkgY29tcGxleCkuXG4gICAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgY29ycmVzcG9uZGluZyBJcmkgb2YgdGhlIHNpbXBsZSB0eXBlIChrbm9yYS1hcGkgc2ltcGxlKS5cbiAgICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKGNvbXBsZXhUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVR5cGU6IHN0cmluZyA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVtjb21wbGV4VHlwZV07XG5cbiAgICAgICAgaWYgKHNpbXBsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvcihgY29tcGxleCB0eXBlICR7Y29tcGxleFR5cGV9IGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gc2ltcGxlIHR5cGUuYCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtQcm9wZXJ0eVdpdGhWYWx1ZVtdfSBwcm9wZXJ0aWVzIHRoZSBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWFpblJlc291cmNlQ2xhc3NPcHRpb25dIHRoZSBjbGFzcyBvZiB0aGUgbWFpbiByZXNvdXJjZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAgICogQHJldHVybnMgc3RyaW5nIC0gYSBLbmFyUUwgcXVlcnkgc3RyaW5nLlxuICAgICAgICovXG4gICAgcHVibGljIGNyZWF0ZUdyYXZzZWFyY2hRdWVyeShwcm9wZXJ0aWVzOiBQcm9wZXJ0eVdpdGhWYWx1ZVtdLCBtYWluUmVzb3VyY2VDbGFzc09wdGlvbj86IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcblxuICAgICAgICAvLyBjbGFzcyByZXN0cmljdGlvbiBmb3IgdGhlIHJlc291cmNlIHNlYXJjaGVkIGZvclxuICAgICAgICBsZXQgbWFpblJlc291cmNlQ2xhc3MgPSAnJztcblxuICAgICAgICAvLyBpZiBnaXZlbiwgY3JlYXRlIHRoZSBjbGFzcyByZXN0cmljdGlvbiBmb3IgdGhlIG1haW4gcmVzb3VyY2VcbiAgICAgICAgaWYgKG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1haW5SZXNvdXJjZUNsYXNzID0gYD9tYWluUmVzIGEgPCR7VXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uKX0+IC5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JpdGVyaWEgZm9yIHRoZSBvcmRlciBieSBzdGF0ZW1lbnRcbiAgICAgICAgY29uc3Qgb3JkZXJCeUNyaXRlcmlhID0gW107XG5cbiAgICAgICAgLy8gc3RhdGVtZW50cyB0byBiZSByZXR1cm5lZCBpbiBxdWVyeSByZXN1bHRzXG4gICAgICAgIGNvbnN0IHJldHVyblN0YXRlbWVudHMgPSBbXTtcblxuICAgICAgICAvLyBsb29wIG92ZXIgZ2l2ZW4gcHJvcGVydGllcyBhbmQgY3JlYXRlIHN0YXRlbWVudHMgYW5kIEZpbHRlcnMgYW5kIHR5cGUgYW5ub3RhdGlvbnMgZnJvbSB0aGVtXG4gICAgICAgIGNvbnN0IHByb3BzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXMubWFwKFxuICAgICAgICAgICAgKHByb3BXaXRoVmFsOiBQcm9wZXJ0eVdpdGhWYWx1ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcElyaVNpbXBsZSA9IFV0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2ltcGxlVHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSB0aGlzLmNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gS25vcmFDb25zdGFudHMucmVzb3VyY2VTaW1wbGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50cyB0aGUgb2JqZWN0IG9mIGEgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHByb3BWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5IHx8IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdFeGlzdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHksIGNyZWF0ZSBhIHZhcmlhYmxlIGZvciB0aGUgdmFsdWUgKHRvIGJlIHVzZWQgYnkgYSBzdWJzZXF1ZW50IEZJTFRFUilcbiAgICAgICAgICAgICAgICAgICAgLy8gT1IgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgRXhpc3RzIGlzIHVzZWQgaW4gd2hpY2ggY2FzZSB3ZSBkbyBub3QgbmVlZCB0byBzcGVjaWZ5IHRoZSBvYmplY3QgYW55IGZ1cnRoZXJcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gYD9wcm9wVmFsJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSBhbmQgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0cywgdXNlIGl0cyBJUklcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlbWVudDogc3RyaW5nID0gYD9tYWluUmVzIDwke3Byb3BJcmlTaW1wbGV9PiAke3Byb3BWYWx1ZX0gLmA7XG5cbiAgICAgICAgICAgICAgICAvLyB0eXBlIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFR5cGVBbm5vdGF0aW9uID0gYDwke3Byb3BJcmlTaW1wbGV9PiBrbm9yYS1hcGk6b2JqZWN0VHlwZSA8JHtzaW1wbGVUeXBlfT4gLmA7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlQW5ub3RhdGlvbiA9IGAke3Byb3BWYWx1ZX0gYSA8JHtzaW1wbGVUeXBlfT4gLmA7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgdGhhdCBoYXMgdG8gYmUgd3JhcHBlZCBpbiBhIEZJTFRFUiBOT1QgRVhJU1RTIChjb21wYXJpc29uIG9wZXJhdG9yIE5PVF9FUVVBTFMpIHRvIG5lZ2F0ZSBpdFxuICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTm90RXF1YWxzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgaW5jbHVkZSBzdGF0ZW1lbnQgaW4gcmVzdWx0cywgYmVjYXVzZSB0aGUgcXVlcnkgY2hlY2tzIGZvciB0aGUgYWJzZW5jZSBvZiB0aGlzIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgRklMVEVSIE5PVCBFWElTVFMge1xuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbn1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHN0YXRlbWVudCBzaG91bGQgYmUgcmV0dXJuZWQgcmV0dXJuZWQgaW4gcmVzdWx0cyAoQm9vbGVhbiBmbGFnIGZyb20gY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgXG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxuYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBmaWx0ZXIgaWYgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjogc3RyaW5nID0gJyc7XG4gICAgICAgICAgICAgICAgLy8gb25seSBjcmVhdGUgYSBGSUxURVIgaWYgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEVYSVNUUyBhbmQgaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSAhPT0gJ0V4aXN0cycpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0xpa2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgcmVnZXggZnVuY3Rpb24gZm9yIExJS0VcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgcmVnZXgoJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSwgXCJpXCIpYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgY29udGFpbnMgZnVuY3Rpb24gZm9yIE1BVENIXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIDwke0tub3JhQ29uc3RhbnRzLm1hdGNoRnVuY3Rpb259Pigke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSKCR7cHJvcFZhbHVlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IudHlwZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgdmFsdWUgaXMgYSBzb3J0IGNyaXRlcmlvblxuICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC5pc1NvcnRDcml0ZXJpb24pIG9yZGVyQnlDcml0ZXJpYS5wdXNoKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7c3RhdGVtZW50fVxuJHtmaWx0ZXJ9XG5gO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3JkZXJCeVN0YXRlbWVudCA9ICcnO1xuXG4gICAgICAgIGlmIChvcmRlckJ5Q3JpdGVyaWEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3JkZXJCeVN0YXRlbWVudCA9IGBcbk9SREVSIEJZICR7b3JkZXJCeUNyaXRlcmlhLmpvaW4oJyAnKX1cbmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0ZW1wbGF0ZSBvZiB0aGUgS25hclFMIHF1ZXJ5IHdpdGggZHluYW1pYyBjb21wb25lbnRzXG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2hUZW1wbGF0ZSA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cbkNPTlNUUlVDVCB7XG5cbj9tYWluUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuJHtyZXR1cm5TdGF0ZW1lbnRzLmpvaW4oJ1xcbicpfVxuXG59IFdIRVJFIHtcblxuP21haW5SZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4ke21haW5SZXNvdXJjZUNsYXNzfVxuXG4ke3Byb3BzLmpvaW4oJycpfVxuXG59XG4ke29yZGVyQnlTdGF0ZW1lbnR9YDtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBLbmFyUUwgcXVlcnlcbiAgICAgICAgY29uc3Qgb2Zmc2V0VGVtcGxhdGUgPSBgXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRoZSBzYW1lIEtuYXJRTCBxdWVyeSB3aXRoIHRoZSBnaXZlbiBvZmZzZXRcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnlXaXRoQ3VzdG9tT2Zmc2V0ID0gKGxvY2FsT2Zmc2V0OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Q3VzdG9tVGVtcGxhdGUgPSBgXG5PRkZTRVQgJHtsb2NhbE9mZnNldH1cbmA7XG5cbiAgICAgICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRDdXN0b21UZW1wbGF0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgZnVuY3Rpb24gc28gYW5vdGhlciBLbmFyUUwgcXVlcnkgY2FuIGJlIGNyZWF0ZWQgd2l0aCBhbiBpbmNyZWFzZWQgb2Zmc2V0XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmNoYW5nZVNlYXJjaFBhcmFtc01zZyhuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnlXaXRoQ3VzdG9tT2Zmc2V0KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhrbmFycWxUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlKTtcblxuICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG5cbiAgICB9XG5cbn1cbiJdfQ==