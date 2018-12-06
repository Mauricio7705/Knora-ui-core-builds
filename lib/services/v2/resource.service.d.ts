import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ApiServiceResult } from '../../declarations';
export declare class ResourceService extends ApiService {
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param iri Iri of the resource (already URL encoded).
     * @returns {Observable<any>}
     */
    getResource(iri: any): Observable<ApiServiceResult>;
}
