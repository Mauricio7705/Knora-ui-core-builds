import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { KuiCoreConfig } from '../../declarations';
import { ConvertJSONLD } from './convert-jsonld';
import { map, mergeMap } from 'rxjs/operators';
import { OntologyCacheService } from './ontology-cache.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./ontology-cache.service";
/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
export class SearchService extends ApiService {
    constructor(http, config, _ontologyCacheService) {
        super(http, config);
        this.http = http;
        this.config = config;
        this._ontologyCacheService = _ontologyCacheService;
        /**
         * Converts a JSON-LD object to a `ReadResorceSequence`.
         * To be passed as a function pointer (arrow notation required).
         *
         * @param {Object} resourceResponse
         * @returns {Observable<ReadResourcesSequence>}
         */
        this.convertJSONLDToReadResourceSequence = (resourceResponse) => {
            // convert JSON-LD into a ReadResourceSequence
            const resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map((ontoInfo) => {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        };
    }
    /**
     * Performs a fulltext search.
     * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearch(searchTerm, offset = 0) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        return this.httpGet('/v2/search/' + searchTerm, httpParams);
    }
    /**
     * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    doFullTextSearchReadResourceSequence(searchTerm, offset = 0) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        const res = this.httpGet('/v2/search/' + searchTerm, httpParams);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        this.convertJSONLDToReadResourceSequence));
    }
    /**
     * Performs a fulltext search count query.
     * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
     *
     * @param searchTerm the term to search for.
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearchCountQuery(searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    }
    /**
     * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
     *
     * @param {string} searchTerm the term to search for.
     * @returns Observable<CountQueryResult>
     */
    doFullTextSearchCountQueryCountQueryResult(searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }
        const res = this.httpGet('/v2/search/count/' + searchTerm);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    }
    /**
     * Performs an extended search.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearch(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }
        return this.httpPost('/v2/searchextended', gravsearchQuery);
    }
    /**
     * Performs an extended search and turns the result into a `ReadResourceSequence`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchReadResourceSequence(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }
        const res = this.httpPost('/v2/searchextended', gravsearchQuery);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    }
    /**
     * Performs an extended search count query.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQuery(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }
        return this.httpPost('/v2/searchextended/count', gravsearchQuery);
    }
    /**
     * Performs an extended search count query and turns the result into a `CountQueryResult`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQueryCountQueryResult(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }
        const res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    }
    /**
     * Perform a search by a resource's rdfs:label.
     * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabel(searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
    }
    /**
     * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabelReadResourceSequence(searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        const res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    }
}
SearchService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
SearchService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
    { type: OntologyCacheService }
];
SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.HttpClient), i0.inject("config"), i0.inject(i2.OntologyCacheService)); }, token: SearchService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQXNDLGFBQWEsRUFBeUIsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQXVCLE1BQU0sMEJBQTBCLENBQUM7QUFDckYsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUU1RDs7R0FFRztBQUlILE1BQU0sb0JBQXFCLFNBQVEsVUFBVTtJQUV6QyxZQUFtQixJQUFnQixFQUNFLE1BQXFCLEVBQ3RDLHFCQUEyQztRQUMzRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSEwsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNFLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDdEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUkvRDs7Ozs7O1dBTUc7UUFDSyx3Q0FBbUMsR0FBb0UsQ0FBQyxnQkFBd0IsRUFBRSxFQUFFO1lBQ3hJLDhDQUE4QztZQUM5QyxNQUFNLE1BQU0sR0FBMEIsYUFBYSxDQUFDLHFDQUFxQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFNUcsOEJBQThCO1lBQzlCLE1BQU0saUJBQWlCLEdBQWEsYUFBYSxDQUFD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LENBQUM7OztZQXBSSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7OztZQVBPLFVBQVU7WUFKMkIsYUFBYSx1QkFlekMsTUFBTSxTQUFDLFFBQVE7WUFadkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgQ291bnRRdWVyeVJlc3VsdCwgS3VpQ29yZUNvbmZpZywgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLyoqXG4gKiBQZXJmb3JtcyBzZWFyY2hlcyAoZnVsbHRleHQgb3IgZXh0ZW5kZWQpIGFuZCBzZWFyY2ggY291bnQgcXVlcmllcyBpbnRvIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX29udG9sb2d5Q2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgSlNPTi1MRCBvYmplY3QgdG8gYSBgUmVhZFJlc29yY2VTZXF1ZW5jZWAuXG4gICAgICogVG8gYmUgcGFzc2VkIGFzIGEgZnVuY3Rpb24gcG9pbnRlciAoYXJyb3cgbm90YXRpb24gcmVxdWlyZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlUmVzcG9uc2VcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2U6IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiA9IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IHtcbiAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAoZm9yIHBhZ2luZywgZmlyc3Qgb2Zmc2V0IGlzIDApLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSwgaHR0cFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnb2Zmc2V0Jywgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtLCBodHRwUGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdGAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGNvdW50IHF1ZXJ5IGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0byBhIGBDb3VudFF1ZXJ5UmVzdWx0YFxuICAgICAgICAgICAgICAgIENvbnZlcnRKU09OTEQuY3JlYXRlQ291bnRRdWVyeVJlc3VsdFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoKGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkJywgZ3JhdnNlYXJjaFF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBncmF2c2VhcmNoUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnkoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50JywgZ3JhdnNlYXJjaFF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkgYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50JywgZ3JhdnNlYXJjaFF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0byBhIGBDb3VudFF1ZXJ5UmVzdWx0YFxuICAgICAgICAgICAgICAgIENvbnZlcnRKU09OTEQuY3JlYXRlQ291bnRRdWVyeVJlc3VsdFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYHNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNvdXJjZUNsYXNzSVJJXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgc2VhcmNoQnlMYWJlbChzZWFyY2hUZXJtOiBzdHJpbmcsIHJlc291cmNlQ2xhc3NJUkk/OiBzdHJpbmcsIHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJywgcmVzb3VyY2VDbGFzc0lSSSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9Qcm9qZWN0JywgcHJvamVjdElyaSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwR2V0KCkgZXhwZWN0cyBvbmx5IG9uZSBhcmd1bWVudCwgbm90IDJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgc2VhcmNoIGJ5IGEgcmVzb3VyY2UncyByZGZzOmxhYmVsIGFuZCB0dXJucyB0aGUgcmVzdWx0cyBpbiBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzb3VyY2VDbGFzc0lSSV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtOiBzdHJpbmcsIHJlc291cmNlQ2xhc3NJUkk/OiBzdHJpbmcsIHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSVJJICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Jlc291cmNlQ2xhc3MnLCByZXNvdXJjZUNsYXNzSVJJKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Byb2plY3QnLCBwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==