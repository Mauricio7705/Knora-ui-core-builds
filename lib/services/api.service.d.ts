import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiServiceError, KuiCoreConfig } from '../declarations';
export declare abstract class ApiService {
    http: HttpClient;
    config: KuiCoreConfig;
    loading: boolean;
    protected constructor(http: HttpClient, config: KuiCoreConfig);
    /**
     * GET
     *
     * @param {string} path
     * @returns Observable of any
     */
    httpGet(path: string, params?: any): Observable<any>;
    /**
     * POST
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    httpPost(path: string, body?: any): Observable<any>;
    /**
     * PUT
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    httpPut(path: string, body?: any): Observable<any>;
    /**
     * DELETE
     *
     * @param {string} path
     * @returns Observable of any
     */
    httpDelete(path: string): Observable<any>;
    /**
     * handle request error in case of server error
     *
     * @param {HttpErrorResponse} error
     * @returns Observable of ApiServiceError
     */
    protected handleRequestError(error: HttpErrorResponse): Observable<ApiServiceError>;
    /**
     * handle json error in case of type error in json response (json2typescript)
     *
     * @param {any} error
     * @returns Observable of ApiServiceError
     */
    protected handleJsonError(error: any): Observable<ApiServiceError>;
}
