import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { UserResponse, UsersResponse } from '../../declarations/';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * This service uses the Knora admin API and handles all user data.
 */
export class UsersService extends ApiService {
    constructor() {
        super(...arguments);
        this.usersUrl = this.config.api + '/admin/users';
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    getAllUsers() {
        return this.httpGet('/admin/users').pipe(map((result) => result.getBody(UsersResponse).users), catchError(this.handleJsonError));
    }
    /**
     * Get user by username, email or by iri.
     *
     * @param {string} identifier - Get user by username, email or by iri
     * @returns Observable<User>
     */
    getUser(identifier) {
        const path = '/admin/users/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    createUser(data) {
        const path = '/admin/users';
        return this.httpPost(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    addUserToProject(userIri, projectIri) {
        const path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     * Add user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    addUserToProjectAdmin(userIri, projectIri) {
        const path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     * Delete user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    removeUserFromProjectAdmin(userIri, projectIri) {
        const path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Add user to the admin system.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    addUserToSystemAdmin(userIri, data) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    activateUser(userIri) {
        const data = {
            status: true
        };
        return this.updateUser(userIri, data);
    }
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    updateOwnPassword(userIri, oldPassword, newPassword) {
        const data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.updateUser(userIri, data);
    }
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    updateUsersPassword(userIri, requesterPassword, newPassword) {
        const data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    }
    /**
     * Update user data.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    updateUser(userIri, data) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    deleteUser(userIri) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    removeUserFromProject(userIri, projectIri) {
        const path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
}
UsersService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
UsersService.ngInjectableDef = i0.defineInjectable({ factory: function UsersService_Factory() { return new UsersService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: UsersService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBR0gsWUFBWSxFQUNaLGFBQWEsRUFDaEIsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBRTdCOztHQUVHO0FBSUgsTUFBTSxtQkFBb0IsU0FBUSxVQUFVO0lBSDVDOztRQUtJLGFBQVEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUM7S0F1TnZEO0lBcE5HLDJFQUEyRTtJQUMzRSxNQUFNO0lBQ04sMkVBQTJFO0lBRTNFOzs7O09BSUc7SUFDSCxXQUFXO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLFVBQWtCO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzFCLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0s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O0lBQ1QsMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLE9BQWU7UUFDdEIsTUFBTSxJQUFJLEdBQUcsZUFBZSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUVOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDckQsTUFBTSxJQUFJLEdBQUcsd0JBQXdCLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7OztZQTNOSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHVzZXMgdGhlIEtub3JhIGFkbWluIEFQSSBhbmQgaGFuZGxlcyBhbGwgdXNlciBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgdXNlcnNVcmw6IHN0cmluZyA9IHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vdXNlcnMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB1c2Vycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgLSBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdXNlciBvZiBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gdGhlIGFkbWluIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG93biBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZU93blBhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgb2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHBhc3N3b3JkIG9mIGFub3RoZXIgdXNlciAobm90IG93bikuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2Vyc1Bhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgcmVxdWVzdGVyUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdXNlciBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgLyBkZWFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBkZWxldGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19