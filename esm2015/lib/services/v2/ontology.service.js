import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Requests ontology information from Knora.
 */
export class OntologyService extends ApiService {
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns the metadata of all ontologies.
     */
    getOntologiesMetadata() {
        return this.httpGet('/v2/ontologies/metadata');
    }
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    }
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns the requested resource class definitions.
     */
    getResourceClasses(resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'));
        }
        let resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    }
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param propertyIris the Iris of the properties to be queried.
     * @returns the requested properties.
     */
    getProperties(propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No property Iris given for call of OntologyService.getProperties'));
        }
        let propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    }
}
OntologyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: OntologyService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSWxDOztHQUVHO0FBSUgsTUFBTSxzQkFBdUIsU0FBUSxVQUFVO0lBRTNDOzs7O09BSUc7SUFDSCxxQkFBcUI7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxvQ0FBb0MsQ0FBQyxXQUFtQjtRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLGlCQUFnQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQywwRUFBMEU7WUFDMUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQztRQUN4SSxDQUFDO1FBRUQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXhCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7WUFDM0MsY0FBYyxHQUFHLGNBQWMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxjQUFjLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsWUFBc0I7UUFFaEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDBFQUEwRTtZQUMxRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQyxDQUFDO1FBQzdILENBQUM7UUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUxQixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztZQUN0QyxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXhFLENBQUM7OztZQW5FSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgVXNlcnNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG59XG4iXX0=