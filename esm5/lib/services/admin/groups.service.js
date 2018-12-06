import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { GroupResponse, GroupsResponse } from '../../declarations/';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var GroupsService = /** @class */ (function (_super) {
    tslib_1.__extends(GroupsService, _super);
    function GroupsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/groups';
        return _this;
    }
    /**
     *
     * @returns {Observable<Group[]>}
     */
    GroupsService.prototype.getAllGroups = function () {
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupsResponse).groups; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} iri
     * @returns {Observable<Group>}
     */
    GroupsService.prototype.getGroupByIri = function (iri) {
        this.path += '/' + encodeURIComponent(iri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupResponse).group; }), catchError(this.handleJsonError));
    };
    GroupsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    GroupsService.ngInjectableDef = i0.defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: GroupsService, providedIn: "root" });
    return GroupsService;
}(ApiService));
export { GroupsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBMkIsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTVDO0lBR21DLHlDQUFVO0lBSDdDO1FBQUEscUVBZ0NDO1FBM0JXLFVBQUksR0FBVyxlQUFlLENBQUM7O0tBMkIxQztJQXpCRzs7O09BR0c7SUFDSCxvQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxFQUFyQyxDQUFxQyxDQUFDLEVBQ3hFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFDQUFhLEdBQWIsVUFBYyxHQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBbkMsQ0FBbUMsQ0FBQyxFQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQzs7Z0JBOUJKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozt3QkFSRDtDQXNDQyxBQWhDRCxDQUdtQyxVQUFVLEdBNkI1QztTQTdCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgR3JvdXAsIEdyb3VwUmVzcG9uc2UsIEdyb3Vwc1Jlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9ncm91cHMnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxHcm91cFtdPn1cbiAgICAgKi9cbiAgICBnZXRBbGxHcm91cHMoKTogT2JzZXJ2YWJsZTxHcm91cFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3Vwc1Jlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxHcm91cD59XG4gICAgICovXG4gICAgZ2V0R3JvdXBCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8R3JvdXA+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3VwUmVzcG9uc2UpLmdyb3VwKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=