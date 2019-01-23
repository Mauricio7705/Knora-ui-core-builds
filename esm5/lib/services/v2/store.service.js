import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KuiCoreConfig } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var StoreService = /** @class */ (function () {
    function StoreService(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
       * Resets the content of the triplestore.
       *
       * @param rdfDataObjects
       * @returns Observable<string>
       */
    StoreService.prototype.resetTriplestoreContent = function (rdfDataObjects) {
        return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(map(function (data) {
            var result = data;
            // console.log('StoreService - resetTriplestoreContent: ', result);
            return result.message;
        }, function (error) {
            if (error.error instanceof Error) {
                console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
            }
            else {
                console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
            }
            throw error;
        }));
    };
    StoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StoreService, providedIn: "root" });
    return StoreService;
}());
export { StoreService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBa0QsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBR25HO0lBS0Usc0JBQW9CLElBQWdCLEVBQTJCLE1BQXFCO1FBQWhFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBMkIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFJLENBQUM7SUFFekY7Ozs7O1NBS0s7SUFDTCw4Q0FBdUIsR0FBdkIsVUFBd0IsY0FBK0I7UUFFckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBa0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsc0NBQXNDLEVBQUUsY0FBYyxDQUFDO2FBQzdILElBQUksQ0FDSCxHQUFHLENBQ0QsVUFBQyxJQUFJO1lBQ0gsSUFBTSxNQUFNLEdBQW9DLElBQUksQ0FBQztZQUNyRCxtRUFBbUU7WUFDbkUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUMsRUFDRCxVQUFDLEtBQXdCO1lBQ3ZCLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDNUY7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM1RjtZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUNGLENBQUMsQ0FBQztJQUVULENBQUM7O2dCQWpDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJRLFVBQVU7Z0JBR1YsYUFBYSx1QkFRbUIsTUFBTSxTQUFDLFFBQVE7Ozt1QkFaeEQ7Q0F5Q0MsQUFsQ0QsSUFrQ0M7U0EvQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnLCBSZGZEYXRhT2JqZWN0LCBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdG9yZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBjb250ZW50IG9mIHRoZSB0cmlwbGVzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZGZEYXRhT2JqZWN0c1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8c3RyaW5nPlxuICAgICAqL1xuICByZXNldFRyaXBsZXN0b3JlQ29udGVudChyZGZEYXRhT2JqZWN0czogUmRmRGF0YU9iamVjdFtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlPih0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3N0b3JlL1Jlc2V0VHJpcGxlc3RvcmVDb250ZW50JywgcmRmRGF0YU9iamVjdHMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gQ2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gU2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApKTtcblxuICB9XG59XG4iXX0=