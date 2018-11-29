import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Represents teh parameters of an extended search.
 */
export class ExtendedSearchParams {
    /**
     *
     * @param generateGravsearch a function the generates KnarQL.
     *                       The function is expected to take the offset
     *                       as a parameter and return a KnarQL query string.
     */
    constructor(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
}
/**
 * Temporarily stores the parameters of an extended search.
 */
export class SearchParamsService {
    constructor() {
        // init with a dummy function
        this.searchParamsMessage = new BehaviorSubject(new ExtendedSearchParams((offset) => ''));
        this.currentSearchParams = this.searchParamsMessage.asObservable();
    }
    /**
     * Update the parameters of an extended seacrh.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    changeSearchParamsMsg(searchParams) {
        this.searchParamsMessage.next(searchParams);
    }
}
SearchParamsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
SearchParamsService.ctorParameters = () => [];
SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFHbkQ7O0dBRUc7QUFDSCxNQUFNO0lBRUY7Ozs7O09BS0c7SUFDSCxZQUFtQixrQkFBOEM7UUFBOUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUE0QjtJQUVqRSxDQUFDO0NBRUo7QUFLRDs7R0FFRztBQUNILE1BQU07SUFNRjtRQUpBLDZCQUE2QjtRQUNyQix3QkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBdUIsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxSCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHOUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxxQkFBcUIsQ0FBQyxZQUFrQztRQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQXRCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGVoIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhlIGdlbmVyYXRlcyBLbmFyUUwuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiBpcyBleHBlY3RlZCB0byB0YWtlIHRoZSBvZmZzZXRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybiBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdlbmVyYXRlR3JhdnNlYXJjaDogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUZW1wb3JhcmlseSBzdG9yZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFyYW1zU2VydmljZSB7XG5cbiAgICAvLyBpbml0IHdpdGggYSBkdW1teSBmdW5jdGlvblxuICAgIHByaXZhdGUgc2VhcmNoUGFyYW1zTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXh0ZW5kZWRTZWFyY2hQYXJhbXM+KG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcygob2Zmc2V0OiBudW1iZXIpID0+ICcnKSk7XG4gICAgY3VycmVudFNlYXJjaFBhcmFtcyA9IHRoaXMuc2VhcmNoUGFyYW1zTWVzc2FnZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFjcmguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGVkU2VhcmNoUGFyYW1zfSBzZWFyY2hQYXJhbXNcbiAgICAgKi9cbiAgICBjaGFuZ2VTZWFyY2hQYXJhbXNNc2coc2VhcmNoUGFyYW1zOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtc01lc3NhZ2UubmV4dChzZWFyY2hQYXJhbXMpO1xuICAgIH1cblxufVxuIl19