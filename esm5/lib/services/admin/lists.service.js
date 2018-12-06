import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ListInfoResponse, ListNodeInfoResponse, ListResponse, ListsResponse } from '../../declarations';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ListsService = /** @class */ (function (_super) {
    tslib_1.__extends(ListsService, _super);
    function ListsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/lists';
        return _this;
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
    ListsService.prototype.getLists = function (projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListsResponse).lists; }), catchError(this.handleJsonError));
    };
    /**
     * return a list object
     *
     * @param {string} listIri
     * @returns Observable of List
     */
    ListsService.prototype.getList = function (listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    /**
     * return a list info object
     *
     * @param {string} listIri
     * @returns Observable of ListInfo
     */
    ListsService.prototype.getListInfo = function (listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    /**
     * return a list node info object
     *
     * @param {string} nodeIri
     * @returns Observable of ListNodeInfo
     */
    ListsService.prototype.getListNodeInfo = function (nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * create new list
     *
     * @param {ListCreatePayload} payload
     * @returns Observable of List
     */
    ListsService.prototype.createList = function (payload) {
        return this.httpPost(this.path, payload).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * edit list data
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable of ListInfo
     */
    ListsService.prototype.updateListInfo = function (payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    ListsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ListsService.ngInjectableDef = i0.defineInjectable({ factory: function ListsService_Factory() { return new ListsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ListsService, providedIn: "root" });
    return ListsService;
}(ApiService));
export { ListsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBS0gsZ0JBQWdCLEVBR2hCLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osYUFBYSxFQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTVDO0lBR2tDLHdDQUFVO0lBSDVDO1FBQUEscUVBMEdDO1FBckdXLFVBQUksR0FBVyxjQUFjLENBQUM7O0tBcUd6QztJQWxHRywyRUFBMkU7SUFDM0UsTUFBTTtJQUNOLDJFQUEyRTtJQUUzRTs7Ozs7T0FLRztJQUNILCtCQUFRLEdBQVIsVUFBUyxVQUFtQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLElBQUksSUFBSSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBbkMsQ0FBbUMsQ0FBQyxFQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsOEJBQU8sR0FBUCxVQUFRLE9BQWU7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ25FLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBakMsQ0FBaUMsQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsa0NBQVcsR0FBWCxVQUFZLE9BQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQXpDLENBQXlDLENBQUMsRUFDNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHNDQUFlLEdBQWYsVUFBZ0IsT0FBZTtRQUMzQixJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQixHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsRUFBN0MsQ0FBNkMsQ0FBQyxFQUNoRixVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUdELDJFQUEyRTtJQUMzRSxPQUFPO0lBQ1AsMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsaUNBQVUsR0FBVixVQUFXLE9BQTBCO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6QyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQWpDLENBQWlDLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFHRCwyRUFBMkU7SUFDM0UsTUFBTTtJQUNOLDJFQUEyRTtJQUUzRTs7Ozs7T0FLRztJQUNILHFDQUFjLEdBQWQsVUFBZSxPQUE4QjtRQUN6QyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLEVBQzVFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFFTixDQUFDOztnQkF6R0osVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7O3VCQXRCRDtDQThIQyxBQTFHRCxDQUdrQyxVQUFVLEdBdUczQztTQXZHWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBMaXN0LFxuICAgIExpc3RDcmVhdGVQYXlsb2FkLFxuICAgIExpc3RJbmZvLFxuICAgIExpc3RJbmZvUmVzcG9uc2UsXG4gICAgTGlzdEluZm9VcGRhdGVQYXlsb2FkLFxuICAgIExpc3ROb2RlSW5mbyxcbiAgICBMaXN0Tm9kZUluZm9SZXNwb25zZSxcbiAgICBMaXN0UmVzcG9uc2UsXG4gICAgTGlzdHNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2xpc3RzJztcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgbGlzdCBvZiBhbGwgbGlzdHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpIChvcHRpb25hbClcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIExpc3ROb2RlSW5mb1tdXG4gICAgICovXG4gICAgZ2V0TGlzdHMocHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+IHtcbiAgICAgICAgaWYgKHByb2plY3RJcmkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCArPSAnP3Byb2plY3RJcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0c1Jlc3BvbnNlKS5saXN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybiBhIGxpc3Qgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgTGlzdFxuICAgICAqL1xuICAgIGdldExpc3QobGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybiBhIGxpc3QgaW5mbyBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBMaXN0SW5mb1xuICAgICAqL1xuICAgIGdldExpc3RJbmZvKGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gYSBsaXN0IG5vZGUgaW5mbyBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBMaXN0Tm9kZUluZm9cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZUluZm8obm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdE5vZGVJbmZvUmVzcG9uc2UpLm5vZGVpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgbmV3IGxpc3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdENyZWF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIExpc3RcbiAgICAgKi9cbiAgICBjcmVhdGVMaXN0KHBheWxvYWQ6IExpc3RDcmVhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogZWRpdCBsaXN0IGRhdGFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdEluZm9VcGRhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBMaXN0SW5mb1xuICAgICAqL1xuICAgIHVwZGF0ZUxpc3RJbmZvKHBheWxvYWQ6IExpc3RJbmZvVXBkYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLmxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxufVxuIl19