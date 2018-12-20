import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KuiCoreConfig, RdfDataObject } from '../../declarations';
export declare class StoreService {
    private http;
    config: KuiCoreConfig;
    constructor(http: HttpClient, config: KuiCoreConfig);
    /**
       * Resets the content of the triplestore.
       *
       * @param rdfDataObjects
       * @returns Observable<string>
       */
    resetTriplestoreContent(rdfDataObjects: RdfDataObject[]): Observable<string>;
}
