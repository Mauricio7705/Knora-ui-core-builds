import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiServiceResult } from '../../declarations';
export declare class SearchService extends ApiService {
    /**
     * Perform a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearch(searchTerm: string, offset?: number): Observable<ApiServiceResult>;
    /**
     * Perform a fulltext search count query.
     *
     * @param searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearchCountQuery(searchTerm: string): Observable<ApiServiceResult>;
    /**
     * Perform an extended search.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<any>}
     */
    doExtendedSearch(sparqlString: string): Observable<ApiServiceResult>;
    /**
     * Perform an extended search count query.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    doExtendedSearchCountQuery(sparqlString: string): Observable<ApiServiceResult>;
    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param resourceClassIRI restrict search to given resource class.
     * @param projectIri restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
     */
    searchByLabel(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ApiServiceResult>;
}
