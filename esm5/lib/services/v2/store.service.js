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
       * resets the content of the triplestore
       *
       * @param rdfDataObjects
       * @returns {Observable<string>}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBa0QsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBR25HO0lBS0Usc0JBQW9CLElBQWdCLEVBQTJCLE1BQXFCO1FBQWhFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBMkIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFJLENBQUM7SUFFekY7Ozs7O1NBS0s7SUFDTCw4Q0FBdUIsR0FBdkIsVUFBd0IsY0FBK0I7UUFFckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFrQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxzQ0FBc0MsRUFBRSxjQUFjLENBQUM7YUFDN0gsSUFBSSxDQUNILEdBQUcsQ0FDRCxVQUFDLElBQUk7WUFDSCxJQUFNLE1BQU0sR0FBb0MsSUFBSSxDQUFDO1lBQ3JELG1FQUFtRTtZQUNuRSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDLEVBQ0QsVUFBQyxLQUF3QjtZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0YsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0YsQ0FBQztZQUNELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUNGLENBQUMsQ0FBQztJQUVULENBQUM7O2dCQWpDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJRLFVBQVU7Z0JBR1YsYUFBYSx1QkFRbUIsTUFBTSxTQUFDLFFBQVE7Ozt1QkFaeEQ7Q0F5Q0MsQUFsQ0QsSUFrQ0M7U0EvQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnLCBSZGZEYXRhT2JqZWN0LCBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdG9yZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAgICogcmVzZXRzIHRoZSBjb250ZW50IG9mIHRoZSB0cmlwbGVzdG9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHJkZkRhdGFPYmplY3RzXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8c3RyaW5nPn1cbiAgICAgKi9cbiAgcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQocmRmRGF0YU9iamVjdHM6IFJkZkRhdGFPYmplY3RbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZT4odGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi9zdG9yZS9SZXNldFRyaXBsZXN0b3JlQ29udGVudCcsIHJkZkRhdGFPYmplY3RzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIENsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIFNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgfVxufVxuIl19