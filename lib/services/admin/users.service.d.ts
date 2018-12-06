import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../../declarations/';
export declare class UsersService extends ApiService {
    usersUrl: string;
    /**
     * returns a list of all users
     *
     * @returns Observable of User[]
     */
    getAllUsers(): Observable<User[]>;
    /**
     * return an user object filtered by email
     *
     * @param {string} email
     * @returns Observable of User
     */
    getUserByEmail(email: string): Observable<User>;
    /**
     * return an user object filtered by iri
     *
     * @param {string} iri
     * @returns Observable of User
     */
    getUserByIri(iri: string): Observable<User>;
    /**
     * return an user object
     *
     * @param {string} path
     * @returns {Observable<User>}
     */
    protected getUser(path: string): Observable<User>;
    /**
     * Add a new user.
     *
     * @param {any} data
     * @returns Observable of User
     */
    createUser(data: any): Observable<User>;
    /**
     * Add an user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable of User
     */
    addUserToProject(userIri: string, projectIri: string): Observable<User>;
    /**
     * Add an user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable of User
     */
    addUserToProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     * Delete an user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable of User
     */
    removeUserFromProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     * Add an user to the admin system
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable of User
     */
    addUserToSystemAdmin(userIri: string, data: any): Observable<User>;
    /**
     * Active an user.
     *
     * @param {string} userIri
     * @returns Observable of User
     */
    activateUser(userIri: string): Observable<User>;
    /**
     * Update own password
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable of User
     */
    updateOwnPassword(userIri: string, oldPassword: string, newPassword: string): Observable<User>;
    /**
     * Update users password.
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable of User
     */
    updateUsersPassword(userIri: string, requesterPassword: string, newPassword: string): Observable<User>;
    /**
     * Update user.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable of User
     */
    updateUser(userIri: string, data: any): Observable<User>;
    /**
     * Delete user.
     *
     * @param {string} userIri
     * @returns Observable of User
     */
    deleteUser(userIri: string): Observable<User>;
    /**
     * Remove an user from a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable of User
     */
    removeUserFromProject(userIri: string, projectIri: string): Observable<User>;
}
