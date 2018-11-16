import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiServiceError, KuiCoreConfig } from '../declarations';
export declare abstract class ApiService {
    http: HttpClient;
    config: KuiCoreConfig;
    /**
     *  if is loading, set it true;
     *  it can be used in components
     *  for progress loader element
     */
    loading: boolean;
    protected constructor(http: HttpClient, config: KuiCoreConfig);
    /**
     * GET
     *
     * @param {string} path
     * @returns {Observable<any>}
     */
    httpGet(path: string, params?: any): Observable<any>;
    /**
     * POST
     *
     * @param {string} path
     * @param body
     * @returns {Observable<any>}
     */
    httpPost(path: string, body?: any): Observable<any>;
    /**
     * PUT
     *
     * @param {string} path
     * @param body
     * @returns {Observable<any>}
     */
    httpPut(path: string, body?: any): Observable<any>;
    /**
     * DELETE
     *
     * @param {string} path
     * @returns {Observable<any>}
     */
    httpDelete(path: string): Observable<any>;
    /**
     * handle request error in case of server error
     *
     * @param {HttpErrorResponse} error
     * @returns {Observable<ApiServiceError>}
     */
    protected handleRequestError(error: HttpErrorResponse): Observable<ApiServiceError>;
    /**
     * handle json error in case of type error in json response (json2typescript)
     *
     * @param error
     * @returns {Observable<ApiServiceError>}
     */
    protected handleJsonError(error: any): Observable<ApiServiceError>;
}
