import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../../declarations/';
export declare class UsersService extends ApiService {
    usersUrl: string;
    /**
     * returns a list of all users
     *
     * @returns {Observable<User[]>}
     */
    getAllUsers(): Observable<User[]>;
    /**
     *
     * @param {string} email
     * @returns {Observable<User>}
     */
    getUserByEmail(email: string): Observable<User>;
    /**
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    getUserByIri(iri: string): Observable<User>;
    /**
     * Helper method combining user retrieval
     *
     * @param {string} path
     * @returns {Observable<User>}
     */
    protected getUser(path: string): Observable<User>;
    /**
     *
     * @param data
     * @returns {Observable<User>}
     */
    createUser(data: any): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    addUserToProject(userIri: string, projectIri: string): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    addUserToProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    removeUserFromProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    addUserToSystemAdmin(userIri: string, data: any): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    activateUser(userIri: string): Observable<User>;
    /**
     * Update own password
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Observable<User>}
     */
    updateOwnPassword(userIri: string, oldPassword: string, newPassword: string): Observable<User>;
    updateUsersPassword(userIri: string, requesterPassword: string, newPassword: string): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    updateUser(userIri: string, data: any): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    deleteUser(userIri: string): Observable<User>;
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    removeUserFromProject(userIri: string, projectIri: string): Observable<User>;
}
