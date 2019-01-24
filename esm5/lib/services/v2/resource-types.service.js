import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ResourceTypesService = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTypesService, _super);
    function ResourceTypesService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * Get all resource types defined by the vocabulary.
       *
       * @param {string} iri Vocabulary iri
       * @returns Observable<any>
       */
    ResourceTypesService.prototype.getResourceTypesByVoc = function (iri) {
        return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
    };
    /**
     * Get a specific resource type.
     *
     * @param {string} iri resource type iri
     * @returns Observable<any>
     */
    ResourceTypesService.prototype.getResourceType = function (iri) {
        return this.httpGet('/v1/resourcetypes/' + encodeURIComponent(iri));
    };
    ResourceTypesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceTypesService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ResourceTypesService, providedIn: "root" });
    return ResourceTypesService;
}(ApiService));
export { ResourceTypesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtdHlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFHNUM7SUFHMEMsZ0RBQVU7SUFIcEQ7O0tBNEJDO0lBdkJDOzs7OztTQUtLO0lBQ0wsb0RBQXFCLEdBQXJCLFVBQXNCLEdBQVc7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsOENBQWUsR0FBZixVQUFnQixHQUFXO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O2dCQXZCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7K0JBTkQ7Q0FnQ0MsQUE1QkQsQ0FHMEMsVUFBVSxHQXlCbkQ7U0F6Qlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VUeXBlc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiBHZXQgYWxsIHJlc291cmNlIHR5cGVzIGRlZmluZWQgYnkgdGhlIHZvY2FidWxhcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIFZvY2FidWxhcnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAgICovXG4gIGdldFJlc291cmNlVHlwZXNCeVZvYyhpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXM/dm9jYWJ1bGFyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHJlc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgcmVzb3VyY2UgdHlwZSBpcmlcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAqL1xuICBnZXRSZXNvdXJjZVR5cGUoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuXG4gIC8vIHB1dFJlc291cmNlVHlwZShpcmkpXG5cbn1cbiJdfQ==