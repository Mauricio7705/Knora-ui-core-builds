import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ResourceService extends ApiService {
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param iri Iri of the resource (already URL encoded).
     * @returns {Observable<any>}
     */
    getResource(iri) {
        // console.log('IRI from resource service: ', iri);
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    }
}
ResourceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ResourceService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU01QyxNQUFNLHNCQUF1QixTQUFRLFVBQVU7SUFFM0M7Ozs7O09BS0c7SUFFSCxXQUFXLENBQUMsR0FBRztRQUNYLG1EQUFtRDtRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQWZKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKGFscmVhZHkgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG5cbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0lSSSBmcm9tIHJlc291cmNlIHNlcnZpY2U6ICcsIGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIC8vIFRPRE86IHdlIHNob3VsZCB1c2UgdGhlIEFwaVNlcnZpY2UgY29ycmVjdGx5LiBCdXQgcmlnaHQgbm93IGl0IGRvZXNuJ3Qgd29ya1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFJlYWRSZXNvdXJjZSkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG4gICAgKi9cblxuICAgIC8vIFRPRE86IHBvc3QsIHB1dCwgZGVsZXRlXG59XG4iXX0=