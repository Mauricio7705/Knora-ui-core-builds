import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Requests ontology information from Knora.
 */
var OntologyService = /** @class */ (function (_super) {
    tslib_1.__extends(OntologyService, _super);
    function OntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns the requested ontology.
     */
    OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    };
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns the requested resource class definitions.
     */
    OntologyService.prototype.getResourceClasses = function (resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
        }
        var resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    };
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param propertyIris the Iris of the properties to be queried.
     * @returns the requested properties.
     */
    OntologyService.prototype.getProperties = function (propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
        }
        var propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    };
    OntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: OntologyService, providedIn: "root" });
    return OntologyService;
}(ApiService));
export { OntologyService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUlsQzs7R0FFRztBQUNIO0lBR3FDLDJDQUFVO0lBSC9DOztLQW9FQztJQS9ERzs7OztPQUlHO0lBQ0gsK0NBQXFCLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw4REFBb0MsR0FBcEMsVUFBcUMsV0FBbUI7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0Q0FBa0IsR0FBbEIsVUFBbUIsaUJBQWdDO1FBRS9DLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLDBFQUEwRTtZQUMxRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkVBQTZFLENBQUMsRUFBN0YsQ0FBNkYsQ0FBQyxDQUFDO1FBQ3hJLENBQUM7UUFFRCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFeEIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztZQUMzQyxjQUFjLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHVDQUFhLEdBQWIsVUFBYyxZQUFzQjtRQUVoQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsMEVBQTBFO1lBQzFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxFQUFsRixDQUFrRixDQUFDLENBQUM7UUFDN0gsQ0FBQztRQUVELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTFCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxXQUFXO1lBQ3RDLGdCQUFnQixHQUFHLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixHQUFHLGdCQUFnQixDQUFDLENBQUM7SUFFeEUsQ0FBQzs7Z0JBbkVKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7OzswQkFYRDtDQTZFQyxBQXBFRCxDQUdxQyxVQUFVLEdBaUU5QztTQWpFWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFVzZXJzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmkgdGhlIElyaXMgb2YgdGhlIG5hbWVkIGdyYXBocyB3aG9zZSByZXNvdXJjZSBjbGFzc2VzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2FsbGVudGl0aWVzLycgKyBlbmNvZGVVUklDb21wb25lbnQob250b2xvZ3lJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3NlcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgSXJpcyBvZiB0aGUgcmVzb3VyY2UgY2xhc3NlcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKHJlc291cmNlQ2xhc3NJcmlzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc2VzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzVXJpRW5jID0gcmVzQ2xhc3NVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnICsgcmVzQ2xhc3NVcmlFbmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHByb3BlcnRpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBwcm9wZXJ0eSBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRQcm9wZXJ0aWVzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnRpZXNVcmlFbmMgPSAnJztcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNVcmlFbmMgPSBwcm9wZXJ0aWVzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJyArIHByb3BlcnRpZXNVcmlFbmMpO1xuXG4gICAgfVxufVxuIl19