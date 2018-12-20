import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ApiServiceResult } from '../../declarations';
/**
 * Requests representation of resources from Knora.
 */
export declare class ResourceService extends ApiService {
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (already URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    getResource(iri: any): Observable<ApiServiceResult>;
}
