import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { KuiCoreConfig } from '../../declarations';
import { ApiService } from '../api.service';
import { ConvertJSONLD } from './convert-jsonld';
import { OntologyCacheService } from './ontology-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./ontology-cache.service";
/**
 * Requests representation of resources from Knora.
 */
var ResourceService = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceService, _super);
    function ResourceService(http, config, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._ontologyCacheService = _ontologyCacheService;
        return _this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    ResourceService.prototype.getResource = function (iri) {
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    };
    /**
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns {Observable<ReadResourcesSequence>}
     */
    ResourceService.prototype.getReadResource = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        // TODO: handle case of an ApiServiceError
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    };
    ResourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
        { type: OntologyCacheService }
    ]; };
    ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject("config"), i0.inject(i2.OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
    return ResourceService;
}(ApiService));
export { ResourceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBcUMsYUFBYSxFQUF5QixNQUFNLG9CQUFvQixDQUFDO0FBQzdHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUF1QixNQUFNLDBCQUEwQixDQUFDOzs7O0FBRXJGOztHQUVHO0FBQ0g7SUFHcUMsMkNBQVU7SUFFM0MseUJBQW1CLElBQWdCLEVBQ0UsTUFBcUIsRUFDdEMscUJBQTJDO1FBRi9ELFlBR0ksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQUprQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0UsWUFBTSxHQUFOLE1BQU0sQ0FBZTtRQUN0QywyQkFBcUIsR0FBckIscUJBQXFCLENBQXNCOztJQUUvRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQ0FBVyxHQUFYLFVBQVksR0FBRztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHlDQUFlLEdBQWYsVUFBZ0IsR0FBVztRQUEzQixpQkFnQ0M7UUEvQkcsSUFBTSxHQUFHLEdBQW1ELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVySCwwQ0FBMEM7UUFFMUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLFFBQVE7UUFDSiw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLGFBQWEsQ0FDckIsRUFDRCxRQUFRO1FBQ0osNkNBQTZDO1FBQzdDLFVBQUMsZ0JBQXdCO1lBQ3JCLDhDQUE4QztZQUM5QyxJQUFNLE1BQU0sR0FBMEIsYUFBYSxDQUFDLHFDQUFxQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFNUcsOEJBQThCO1lBQzlCLElBQU0saUJBQWlCLEdBQWEsYUFBYSxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFakcsNkNBQTZDO1lBQzdDLE9BQU8sS0FBSSxDQUFDLHFCQUFxQixDQUFDLDJCQUEyQixDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUNqRixHQUFHLENBQ0MsVUFBQyxRQUE2QjtnQkFDMUIsbURBQW1EO2dCQUNuRCxNQUFNLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FDSixDQUNKLENBQUM7UUFDTixDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBM0RKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7OztnQkFkUSxVQUFVO2dCQUl5QixhQUFhLHVCQWN4QyxNQUFNLFNBQUMsUUFBUTtnQkFYdkIsb0JBQW9COzs7MEJBUDdCO0NBMEVDLEFBOURELENBR3FDLFVBQVUsR0EyRDlDO1NBM0RZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBLdWlDb3JlQ29uZmlnLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IE9udG9sb2d5Q2FjaGVTZXJ2aWNlLCBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0cyByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZXMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfb250b2xvZ3lDYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKG5vdCB5ZXQgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlIGFzIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBnZXRSZWFkUmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgY2FzZSBvZiBhbiBBcGlTZXJ2aWNlRXJyb3JcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiJdfQ==