import { Observable } from 'rxjs';
import { List, ListCreatePayload, ListInfo, ListInfoUpdatePayload, ListNodeInfo } from '../../declarations';
import { ApiService } from '../api.service';
export declare class ListsService extends ApiService {
    private path;
    /**
     *
     * @param {string} projectIri (optional)
     * @returns {Observable<ListNodeInfo[]>}
     */
    getLists(projectIri?: string): Observable<ListNodeInfo[]>;
    /**
     *
     * @param {string} listIri
     * @returns {Observable<List>}
     */
    getList(listIri: string): Observable<List>;
    /**
     *
     * @param {string} listIri
     * @returns {Observable<ListInfo>}
     */
    getListInfo(listIri: string): Observable<ListInfo>;
    /**
     *
     * @param {string} nodeIri
     * @returns {Observable<ListNodeInfo>}
     */
    getListNodeInfo(nodeIri: string): Observable<ListNodeInfo>;
    /**
     *
     * @param {ListCreatePayload} payload
     * @returns {Observable<List>}
     */
    createList(payload: ListCreatePayload): Observable<List>;
    /**
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns {Observable<ListInfo>}
     */
    updateListInfo(payload: ListInfoUpdatePayload): Observable<ListInfo>;
}
