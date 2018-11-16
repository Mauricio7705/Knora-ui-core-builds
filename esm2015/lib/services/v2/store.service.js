import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KuiCoreConfig } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class StoreService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
       * resets the content of the triplestore
       *
       * @param rdfDataObjects
       * @returns {Observable<string>}
       */
    resetTriplestoreContent(rdfDataObjects) {
        return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(map((data) => {
            const result = data;
            // console.log('StoreService - resetTriplestoreContent: ', result);
            return result.message;
        }, (error) => {
            if (error.error instanceof Error) {
                console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
            }
            else {
                console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
            }
            throw error;
        }));
    }
}
StoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
StoreService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StoreService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBa0QsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBTW5HLE1BQU07SUFFSixZQUFvQixJQUFnQixFQUEyQixNQUFxQjtRQUFoRSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBSSxDQUFDO0lBRXpGOzs7OztTQUtLO0lBQ0wsdUJBQXVCLENBQUMsY0FBK0I7UUFFckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFrQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxzQ0FBc0MsRUFBRSxjQUFjLENBQUM7YUFDN0gsSUFBSSxDQUNILEdBQUcsQ0FDRCxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1AsTUFBTSxNQUFNLEdBQW9DLElBQUksQ0FBQztZQUNyRCxtRUFBbUU7WUFDbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQyxFQUNELENBQUMsS0FBd0IsRUFBRSxFQUFFO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RixDQUFDO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQ0YsQ0FBQyxDQUFDO0lBRVQsQ0FBQzs7O1lBakNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVJRLFVBQVU7WUFHVixhQUFhLHVCQVFtQixNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnLCBSZGZEYXRhT2JqZWN0LCBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdG9yZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAgICogcmVzZXRzIHRoZSBjb250ZW50IG9mIHRoZSB0cmlwbGVzdG9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHJkZkRhdGFPYmplY3RzXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8c3RyaW5nPn1cbiAgICAgKi9cbiAgcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQocmRmRGF0YU9iamVjdHM6IFJkZkRhdGFPYmplY3RbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZT4odGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi9zdG9yZS9SZXNldFRyaXBsZXN0b3JlQ29udGVudCcsIHJkZkRhdGFPYmplY3RzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIENsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIFNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgfVxufVxuIl19