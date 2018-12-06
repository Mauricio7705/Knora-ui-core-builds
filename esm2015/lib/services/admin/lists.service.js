import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ListInfoResponse, ListNodeInfoResponse, ListResponse, ListsResponse } from '../../declarations';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ListsService extends ApiService {
    constructor() {
        super(...arguments);
        this.path = '/admin/lists';
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * returns a list of all lists
     *
     * @param {string} projectIri (optional)
     * @returns Observable of ListNodeInfo[]
     */
    getLists(projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListsResponse).lists), catchError(this.handleJsonError));
    }
    /**
     * return a list object
     *
     * @param {string} listIri
     * @returns Observable of List
     */
    getList(listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    /**
     * return a list info object
     *
     * @param {string} listIri
     * @returns Observable of ListInfo
     */
    getListInfo(listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
    /**
     * return a list node info object
     *
     * @param {string} nodeIri
     * @returns Observable of ListNodeInfo
     */
    getListNodeInfo(nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListNodeInfoResponse).nodeinfo), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * create new list
     *
     * @param {ListCreatePayload} payload
     * @returns Observable of List
     */
    createList(payload) {
        return this.httpPost(this.path, payload).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * edit list data
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable of ListInfo
     */
    updateListInfo(payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
}
ListsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ListsService.ngInjectableDef = i0.defineInjectable({ factory: function ListsService_Factory() { return new ListsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ListsService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFLSCxnQkFBZ0IsRUFHaEIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixhQUFhLEVBQ2hCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLNUMsTUFBTSxtQkFBb0IsU0FBUSxVQUFVO0lBSDVDOztRQUtZLFNBQUksR0FBVyxjQUFjLENBQUM7S0FxR3pDO0lBbEdHLDJFQUEyRTtJQUMzRSxNQUFNO0lBQ04sMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLFVBQW1CO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxJQUFJLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDdEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBQyxPQUFlO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNuRSxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUM1RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsZUFBZSxDQUFDLE9BQWU7UUFDM0IsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUNoRixVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUdELDJFQUEyRTtJQUMzRSxPQUFPO0lBQ1AsMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLE9BQTBCO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6QyxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUdELDJFQUEyRTtJQUMzRSxNQUFNO0lBQ04sMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLE9BQThCO1FBQ3pDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEMsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUM1RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBRU4sQ0FBQzs7O1lBekdKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIGxpc3Qgb2YgYWxsIGxpc3RzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaSAob3B0aW9uYWwpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBMaXN0Tm9kZUluZm9bXVxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gYSBsaXN0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIExpc3RcbiAgICAgKi9cbiAgICBnZXRMaXN0KGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gYSBsaXN0IGluZm8gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgTGlzdEluZm9cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIGEgbGlzdCBub2RlIGluZm8gb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgTGlzdE5vZGVJbmZvXG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlIG5ldyBsaXN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBMaXN0XG4gICAgICovXG4gICAgY3JlYXRlTGlzdChwYXlsb2FkOiBMaXN0Q3JlYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIGVkaXQgbGlzdCBkYXRhXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RJbmZvVXBkYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgTGlzdEluZm9cbiAgICAgKi9cbiAgICB1cGRhdGVMaXN0SW5mbyhwYXlsb2FkOiBMaXN0SW5mb1VwZGF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQocGF5bG9hZC5saXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cbn1cbiJdfQ==