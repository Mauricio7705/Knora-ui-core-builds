import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../../declarations/';
/**
 * This service uses the Knora admin API and handles all user data.
 */
export declare class UsersService extends ApiService {
    usersUrl: string;
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAllUsers(): Observable<User[]>;
    /**
     * Get user by username, email or by iri.
     *
     * @param {string} identifier - Get user by username, email or by iri
     * @returns Observable<User>
     */
    getUser(identifier: string): Observable<User>;
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    createUser(data: any): Observable<User>;
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    addUserToProject(userIri: string, projectIri: string): Observable<User>;
    /**
     * Add user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    addUserToProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     * Delete user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    removeUserFromProjectAdmin(userIri: string, projectIri: string): Observable<User>;
    /**
     * Add user to the admin system.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    addUserToSystemAdmin(userIri: string, data: any): Observable<User>;
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    activateUser(userIri: string): Observable<User>;
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    updateOwnPassword(userIri: string, oldPassword: string, newPassword: string): Observable<User>;
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    updateUsersPassword(userIri: string, requesterPassword: string, newPassword: string): Observable<User>;
    /**
     * Update user data.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    updateUser(userIri: string, data: any): Observable<User>;
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    deleteUser(userIri: string): Observable<User>;
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    removeUserFromProject(userIri: string, projectIri: string): Observable<User>;
}
