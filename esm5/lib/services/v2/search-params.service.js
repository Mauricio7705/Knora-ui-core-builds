import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Represents the parameters of an extended search.
 */
var ExtendedSearchParams = /** @class */ (function () {
    /**
     *
     * @param generateGravsearch a function that generates a Gravsearch query.
     *
     *                           The function takes the offset
     *                           as a parameter and returns a Gravsearch query string.
     *                           Returns false if not set correctly (init state).
     */
    function ExtendedSearchParams(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
    return ExtendedSearchParams;
}());
export { ExtendedSearchParams };
var SearchParamsService = /** @class */ (function () {
    function SearchParamsService() {
        // init with a dummy function that returns false
        // if the application is reloaded, this will be returned
        this._currentSearchParams = new BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
    }
    /**
     * Updates the parameters of an extended search.
     *
     * @param {ExtendedSearchParams} searchParams
     * @returns void
     */
    SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
        this._currentSearchParams.next(searchParams);
    };
    /**
     * Gets the search params of an extended search.
     *
     * @returns ExtendedSearchParams - search parameters
     */
    SearchParamsService.prototype.getSearchParams = function () {
        return this._currentSearchParams.getValue();
    };
    SearchParamsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    SearchParamsService.ctorParameters = function () { return []; };
    SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
    return SearchParamsService;
}());
export { SearchParamsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFHbkQ7O0dBRUc7QUFDSDtJQUVJOzs7Ozs7O09BT0c7SUFDSCw4QkFBbUIsa0JBQXdEO1FBQXhELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBc0M7SUFFM0UsQ0FBQztJQUVMLDJCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7O0FBRUQ7SUFVSTtRQUNJLGdEQUFnRDtRQUNoRCx3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUF1QixJQUFJLG9CQUFvQixDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbURBQXFCLEdBQXJCLFVBQXNCLFlBQWtDO1FBQ3BELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw2Q0FBZSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Z0JBakNKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7OEJBekJEO0NBMERDLEFBbkNELElBbUNDO1NBN0JZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW5lcmF0ZUdyYXZzZWFyY2ggYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgb2Zmc2V0XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBhIEdyYXZzZWFyY2ggcXVlcnkgc3RyaW5nLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJucyBmYWxzZSBpZiBub3Qgc2V0IGNvcnJlY3RseSAoaW5pdCBzdGF0ZSkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdlbmVyYXRlR3JhdnNlYXJjaDogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcgfCBib29sZWFuKSB7XG5cbiAgICB9XG5cbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGVtcG9yYXJpbHkgc3RvcmVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlYXJjaFBhcmFtc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudFNlYXJjaFBhcmFtcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBpbml0IHdpdGggYSBkdW1teSBmdW5jdGlvbiB0aGF0IHJldHVybnMgZmFsc2VcbiAgICAgICAgLy8gaWYgdGhlIGFwcGxpY2F0aW9uIGlzIHJlbG9hZGVkLCB0aGlzIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXh0ZW5kZWRTZWFyY2hQYXJhbXM+KG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcygob2Zmc2V0OiBudW1iZXIpID0+IGZhbHNlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGVkU2VhcmNoUGFyYW1zfSBzZWFyY2hQYXJhbXNcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgY2hhbmdlU2VhcmNoUGFyYW1zTXNnKHNlYXJjaFBhcmFtczogRXh0ZW5kZWRTZWFyY2hQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5uZXh0KHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VhcmNoIHBhcmFtcyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBFeHRlbmRlZFNlYXJjaFBhcmFtcyAtIHNlYXJjaCBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZ2V0U2VhcmNoUGFyYW1zKCk6IEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbn1cbiJdfQ==