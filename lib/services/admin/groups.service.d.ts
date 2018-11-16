import { Observable } from 'rxjs';
import { Group } from '../../declarations/';
import { ApiService } from '../api.service';
export declare class GroupsService extends ApiService {
    private path;
    /**
     *
     * @returns {Observable<Group[]>}
     */
    getAllGroups(): Observable<Group[]>;
    /**
     *
     * @param {string} iri
     * @returns {Observable<Group>}
     */
    getGroupByIri(iri: string): Observable<Group>;
}
