import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
export declare class ResourceTypesService extends ApiService {
    /**
       * Get all resource types defined by the vocabulary
       * @param iri (Vocabulary iri)
       * @returns {Observable<any>}
       */
    getResourceTypesByVoc(iri: string): Observable<any>;
    /**
     * Get a specific resource type
     * @param iri   (resource type iri)
     * @returns {Observable<any>}
     */
    getResourceType(iri: string): Observable<any>;
}
