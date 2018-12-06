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
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    getOntologiesMetadata() {
        return this.httpGet('/v2/ontologies/metadata');
    }
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    }
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
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
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSWxDOztHQUVHO0FBSUgsTUFBTSxzQkFBdUIsU0FBUSxVQUFVO0lBRTNDOzs7O09BSUc7SUFDSCxxQkFBcUI7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxvQ0FBb0MsQ0FBQyxXQUFtQjtRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLGlCQUFnQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQywwRUFBMEU7WUFDMUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQztRQUN4SSxDQUFDO1FBRUQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXhCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVc7WUFDM0MsY0FBYyxHQUFHLGNBQWMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxjQUFjLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsWUFBc0I7UUFFaEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDBFQUEwRTtZQUMxRSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQyxDQUFDO1FBQzdILENBQUM7UUFFRCxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUxQixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztZQUN0QyxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXhFLENBQUM7OztZQW5FSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgVXNlcnNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaXMgb2YgdGhlIG5hbWVkIGdyYXBocyB3aG9zZSByZXNvdXJjZSBjbGFzc2VzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9hbGxlbnRpdGllcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9udG9sb2d5SXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgSXJpcyBvZiB0aGUgcmVzb3VyY2UgY2xhc3NlcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUNsYXNzSXJpczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHJlc291cmNlIGNsYXNzIElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NlcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNDbGFzc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICByZXNDbGFzc1VyaUVuYyA9IHJlc0NsYXNzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9jbGFzc2VzJyArIHJlc0NsYXNzVXJpRW5jKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBwcm9wZXJ0aWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocHJvcGVydHlJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcHJvcGVydHkgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UHJvcGVydGllcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzVXJpRW5jID0gcHJvcGVydGllc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvcHJvcGVydGllcycgKyBwcm9wZXJ0aWVzVXJpRW5jKTtcblxuICAgIH1cbn1cbiJdfQ==