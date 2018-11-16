import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KuiCoreConfig } from '../../declarations';
export declare class StatusMsgService {
    private _http;
    config: KuiCoreConfig;
    constructor(_http: HttpClient, config: KuiCoreConfig);
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    getStatusMsg(): Observable<any>;
}
