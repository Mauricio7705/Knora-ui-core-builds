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
       * Resets the content of the triplestore.
       *
       * @param rdfDataObjects
       * @returns Observable<string>
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
StoreService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StoreService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQWMsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBa0QsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBTW5HLE1BQU07SUFFSixZQUFvQixJQUFnQixFQUEyQixNQUFxQjtRQUFoRSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBSSxDQUFDO0lBRXpGOzs7OztTQUtLO0lBQ0wsdUJBQXVCLENBQUMsY0FBK0I7UUFFckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBa0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsc0NBQXNDLEVBQUUsY0FBYyxDQUFDO2FBQzdILElBQUksQ0FDSCxHQUFHLENBQ0QsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNQLE1BQU0sTUFBTSxHQUFvQyxJQUFJLENBQUM7WUFDckQsbUVBQW1FO1lBQ25FLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDLEVBQ0QsQ0FBQyxLQUF3QixFQUFFLEVBQUU7WUFDM0IsSUFBSSxLQUFLLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBc0UsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM1RjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHNFQUFzRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzVGO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQ0YsQ0FBQyxDQUFDO0lBRVQsQ0FBQzs7O1lBakNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBUlEsVUFBVTtZQUdWLGFBQWEsdUJBUW1CLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcsIFJkZkRhdGFPYmplY3QsIFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7IH1cblxuICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIHRyaXBsZXN0b3JlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJkZkRhdGFPYmplY3RzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxzdHJpbmc+XG4gICAgICovXG4gIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50KHJkZkRhdGFPYmplY3RzOiBSZGZEYXRhT2JqZWN0W10pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2U+KHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vc3RvcmUvUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQnLCByZGZEYXRhT2JqZWN0cylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQ6ICcsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBDbGllbnQtc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBTZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gIH1cbn1cbiJdfQ==