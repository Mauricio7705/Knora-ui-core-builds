import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Represents the parameters of an extended search.
 */
export class ExtendedSearchParams {
    /**
     *
     * @param generateGravsearch a function that generates a Gravsearch query.
     *
     *                           The function takes the offset
     *                           as a parameter and returns a Gravsearch query string.
     *                           Returns false if not set correctly (init state).
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
        // init with a dummy function that returns false
        // if the application is reloaded, this will be returned
        this._currentSearchParams = new BehaviorSubject(new ExtendedSearchParams((offset) => false));
    }
    /**
     * Updates the parameters of an extended search.
     *
     * @param {ExtendedSearchParams} searchParams
     * @returns {void}
     */
    changeSearchParamsMsg(searchParams) {
        this._currentSearchParams.next(searchParams);
    }
    /**
     * Gets the search params of an extended search.
     *
     * @returns {ExtendedSearchParams} search parameters
     */
    getSearchParams() {
        return this._currentSearchParams.getValue();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFHbkQ7O0dBRUc7QUFDSCxNQUFNO0lBRUY7Ozs7Ozs7T0FPRztJQUNILFlBQW1CLGtCQUF3RDtRQUF4RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXNDO0lBRTNFLENBQUM7Q0FFSjtBQUtEOztHQUVHO0FBQ0gsTUFBTTtJQUlGO1FBQ0ksZ0RBQWdEO1FBQ2hELHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxlQUFlLENBQXVCLElBQUksb0JBQW9CLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUJBQXFCLENBQUMsWUFBa0M7UUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWU7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hELENBQUM7OztZQWpDSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBHcmF2c2VhcmNoIHF1ZXJ5IHN0cmluZy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgZmFsc2UgaWYgbm90IHNldCBjb3JyZWN0bHkgKGluaXQgc3RhdGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgYm9vbGVhbikge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2N1cnJlbnRTZWFyY2hQYXJhbXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGZhbHNlXG4gICAgICAgIC8vIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyByZWxvYWRlZCwgdGhpcyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgY2hhbmdlU2VhcmNoUGFyYW1zTXNnKHNlYXJjaFBhcmFtczogRXh0ZW5kZWRTZWFyY2hQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5uZXh0KHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VhcmNoIHBhcmFtcyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RXh0ZW5kZWRTZWFyY2hQYXJhbXN9IHNlYXJjaCBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZ2V0U2VhcmNoUGFyYW1zKCk6IEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbn1cbiJdfQ==