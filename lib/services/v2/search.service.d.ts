import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiServiceResult } from '../../declarations';
export declare class SearchService extends ApiService {
    /**
     * Perform a fulltext search.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearch(searchTerm: string, offset?: number): Observable<ApiServiceResult>;
    /**
     * Perform a fulltext search count query.
     *
     * @param {string} searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearchCountQuery(searchTerm: string): Observable<ApiServiceResult>;
    /**
     * Perform an extended search.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    doExtendedSearch(sparqlString: string): Observable<ApiServiceResult>;
    /**
     * Perform an extended search count query.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    doExtendedSearchCountQuery(sparqlString: string): Observable<ApiServiceResult>;
    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
     */
    searchByLabel(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ApiServiceResult>;
}
