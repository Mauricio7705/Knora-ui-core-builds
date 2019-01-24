import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KuiCoreConfig } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class StatusMsgService {
    constructor(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    getStatusMsg() {
        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map((res) => {
            return res;
        }, err => {
            console.error(err);
        }));
    }
    ;
}
StatusMsgService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
StatusMsgService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
StatusMsgService.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StatusMsgService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLW1zZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFLbkQsTUFBTTtJQUVKLFlBQW9CLEtBQWlCLEVBQ1YsTUFBcUI7UUFENUIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQWU7SUFDaEQsQ0FBQztJQUVEOzs7OztNQUtFO0lBQ0YsWUFBWTtRQUVWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsNkJBQTZCLENBQUM7YUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FDUCxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ1gsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQ0QsR0FBRyxDQUFDLEVBQUU7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUNBLENBQUM7SUFFTixDQUFDO0lBQUEsQ0FBQzs7O1lBNUJILFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBUlEsVUFBVTtZQUlWLGFBQWEsdUJBUWpCLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTXNnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gIH1cblxuICAvKipcbiAgKiB0aGlzIG1ldGhvZCBnZXQgdGhlIHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBzdGF0dXNNc2cuanNvbiBmaWxlXG4gICogd2hpY2ggYXJlIGRlZmluZWQgaGVyZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2Rlc1xuICAqIGFuZCBoZXJlOiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcFxuICAqXG4gICovXG4gIGdldFN0YXR1c01zZygpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwcCArICcvYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nKVxuICAgICAgLnBpcGUobWFwKFxuICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgKTtcblxuICB9O1xufVxuIl19