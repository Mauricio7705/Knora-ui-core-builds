import { Observable } from 'rxjs';
import { SearchService } from './search.service';
export declare class IncomingService extends SearchService {
    /**
       * Returns all incoming regions for a particular resource.
       */
    getIncomingRegions(resourceIRI: string, offset: number): Observable<any>;
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    getStillImageRepresentationsForCompoundResource(resourceIri: string, offset: number): Observable<any>;
    /**
     *
     * Returns all incoming links for the given resource Iri
     * but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     */
    getIncomingLinksForResource(resourceIri: string, offset: number): Observable<any>;
}
