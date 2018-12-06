import { Observable } from 'rxjs';
import { Group } from '../../declarations/';
import { ApiService } from '../api.service';
export declare class GroupsService extends ApiService {
    private path;
    /**
     * return a list of all groups
     *
     * @returns Observable of Group[]
     */
    getAllGroups(): Observable<Group[]>;
    /**
     * return a group object (filter by IRI)
     *
     * @param {string} iri
     * @returns Observable of Group
     */
    getGroupByIri(iri: string): Observable<Group>;
}
