import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var SearchService = /** @class */ (function (_super) {
    tslib_1.__extends(SearchService, _super);
    function SearchService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Perform a fulltext search.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    SearchService.prototype.doFulltextSearch = function (searchTerm, offset) {
        if (offset === void 0) { offset = 0; }
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        return this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);
    };
    /**
     * Perform a fulltext search count query.
     *
     * @param {string} searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
     */
    SearchService.prototype.doFulltextSearchCountQuery = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    };
    /**
     * Perform an extended search.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    SearchService.prototype.doExtendedSearch = function (sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        // return this.httpGet('/v2/searchextended/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended', sparqlString);
    };
    /**
     * Perform an extended search count query.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    SearchService.prototype.doExtendedSearchCountQuery = function (sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        // return this.httpGet('/v2/searchextended/count/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended/count', sparqlString);
    };
    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
     */
    SearchService.prototype.searchByLabel = function (searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var params = {};
        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }
        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), params);
        // return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm));
    };
    SearchService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: SearchService, providedIn: "root" });
    return SearchService;
}(ApiService));
export { SearchService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBR2xDO0lBR21DLHlDQUFVO0lBSDdDOztLQWtHQztJQTdGRzs7Ozs7O09BTUc7SUFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBa0IsRUFBRSxNQUFrQjtRQUFsQix1QkFBQSxFQUFBLFVBQWtCO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxFQUFqRixDQUFpRixDQUFDLENBQUM7UUFDNUgsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtEQUEwQixHQUExQixVQUEyQixVQUFrQjtRQUV6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkVBQTJFLENBQUMsRUFBM0YsQ0FBMkYsQ0FBQyxDQUFDO1FBQ3RJLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsWUFBb0I7UUFFakMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLG1FQUFtRSxDQUFDLEVBQW5GLENBQW1GLENBQUMsQ0FBQztRQUM5SCxDQUFDO1FBRUQsaUZBQWlGO1FBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRTdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtEQUEwQixHQUExQixVQUEyQixZQUFvQjtRQUUzQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkVBQTZFLENBQUMsRUFBN0YsQ0FBNkYsQ0FBQyxDQUFDO1FBQ3hJLENBQUM7UUFFRCx1RkFBdUY7UUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxxQ0FBYSxHQUFiLFVBQWMsVUFBa0IsRUFBRSxnQkFBeUIsRUFBRSxVQUFtQjtRQUU1RSxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUVBQWlFLENBQUMsRUFBakYsQ0FBaUYsQ0FBQyxDQUFDO1FBQzVILENBQUM7UUFFRCxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztRQUN0RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQzFDLENBQUM7UUFFRCw2Q0FBNkM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkYsOEVBQThFO0lBRWxGLENBQUM7O2dCQWpHSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7d0JBUEQ7Q0F1R0MsQUFsR0QsQ0FHbUMsVUFBVSxHQStGNUM7U0EvRlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bGx0ZXh0IHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtICsgJz9vZmZzZXQ9JyArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnkoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChzcGFycWxTdHJpbmc6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzcGFycWxTdHJpbmcgPT09IHVuZGVmaW5lZCB8fCBzcGFycWxTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkLycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBzcGFycWxTdHJpbmcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnkoc3BhcnFsU3RyaW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc3BhcnFsU3RyaW5nID09PSB1bmRlZmluZWQgfHwgc3BhcnFsU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQvJyArIGVuY29kZVVSSUNvbXBvbmVudChzcGFycWxTdHJpbmcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIHNwYXJxbFN0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNvdXJjZUNsYXNzSVJJXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zWydsaW1pdFRvUmVzb3VyY2VDbGFzcyddID0gcmVzb3VyY2VDbGFzc0lSSTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtc1snbGltaXRUb1Byb2plY3QnXSA9IHByb2plY3RJcmk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwR2V0KCkgZXhwZWN0cyBvbmx5IG9uZSBhcmd1bWVudCwgbm90IDJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgcGFyYW1zKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSk7XG5cbiAgICB9XG59XG4iXX0=