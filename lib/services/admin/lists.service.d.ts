import { Observable } from 'rxjs';
import { List, ListCreatePayload, ListInfo, ListInfoUpdatePayload, ListNodeInfo } from '../../declarations';
import { ApiService } from '../api.service';
export declare class ListsService extends ApiService {
    private path;
    /**
     * returns a list of all lists
     *
     * @param {string} projectIri (optional)
     * @returns Observable of ListNodeInfo[]
     */
    getLists(projectIri?: string): Observable<ListNodeInfo[]>;
    /**
     * return a list object
     *
     * @param {string} listIri
     * @returns Observable of List
     */
    getList(listIri: string): Observable<List>;
    /**
     * return a list info object
     *
     * @param {string} listIri
     * @returns Observable of ListInfo
     */
    getListInfo(listIri: string): Observable<ListInfo>;
    /**
     * return a list node info object
     *
     * @param {string} nodeIri
     * @returns Observable of ListNodeInfo
     */
    getListNodeInfo(nodeIri: string): Observable<ListNodeInfo>;
    /**
     * create new list
     *
     * @param {ListCreatePayload} payload
     * @returns Observable of List
     */
    createList(payload: ListCreatePayload): Observable<List>;
    /**
     * edit list data
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable of ListInfo
     */
    updateListInfo(payload: ListInfoUpdatePayload): Observable<ListInfo>;
}
