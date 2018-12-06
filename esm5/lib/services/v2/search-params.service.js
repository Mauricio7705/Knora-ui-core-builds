import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Represents teh parameters of an extended search.
 */
var ExtendedSearchParams = /** @class */ (function () {
    /**
     *
     * @param generateGravsearch a function the generates KnarQL.
     *                       The function is expected to take the offset
     *                       as a parameter and return a KnarQL query string.
     */
    function ExtendedSearchParams(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
    return ExtendedSearchParams;
}());
export { ExtendedSearchParams };
var SearchParamsService = /** @class */ (function () {
    function SearchParamsService() {
        // init with a dummy function
        this.searchParamsMessage = new BehaviorSubject(new ExtendedSearchParams(function (offset) { return ''; }));
        this.currentSearchParams = this.searchParamsMessage.asObservable();
    }
    /**
     * Update the parameters of an extended seacrh.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
        this.searchParamsMessage.next(searchParams);
    };
    SearchParamsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    SearchParamsService.ctorParameters = function () { return []; };
    SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
    return SearchParamsService;
}());
export { SearchParamsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFHbkQ7O0dBRUc7QUFDSDtJQUVJOzs7OztPQUtHO0lBQ0gsOEJBQW1CLGtCQUE4QztRQUE5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTRCO0lBRWpFLENBQUM7SUFFTCwyQkFBQztBQUFELENBQUMsQUFaRCxJQVlDOztBQUVEO0lBWUk7UUFKQSw2QkFBNkI7UUFDckIsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQXVCLElBQUksb0JBQW9CLENBQUMsVUFBQyxNQUFjLElBQUssT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDLENBQUMsQ0FBQztRQUMxSCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHOUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxtREFBcUIsR0FBckIsVUFBc0IsWUFBa0M7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDOztnQkF0QkosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7Ozs7OEJBdkJEO0NBNkNDLEFBeEJELElBd0JDO1NBbEJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0ZWggcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW5lcmF0ZUdyYXZzZWFyY2ggYSBmdW5jdGlvbiB0aGUgZ2VuZXJhdGVzIEtuYXJRTC5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIGlzIGV4cGVjdGVkIHRvIHRha2UgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJuIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2VuZXJhdGVHcmF2c2VhcmNoOiAob2Zmc2V0OiBudW1iZXIpID0+IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIC8vIGluaXQgd2l0aCBhIGR1bW15IGZ1bmN0aW9uXG4gICAgcHJpdmF0ZSBzZWFyY2hQYXJhbXNNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFeHRlbmRlZFNlYXJjaFBhcmFtcz4obmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKChvZmZzZXQ6IG51bWJlcikgPT4gJycpKTtcbiAgICBjdXJyZW50U2VhcmNoUGFyYW1zID0gdGhpcy5zZWFyY2hQYXJhbXNNZXNzYWdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYWNyaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kZWRTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xuICAgICAqL1xuICAgIGNoYW5nZVNlYXJjaFBhcmFtc01zZyhzZWFyY2hQYXJhbXM6IEV4dGVuZGVkU2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zTWVzc2FnZS5uZXh0KHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuXG59XG4iXX0=