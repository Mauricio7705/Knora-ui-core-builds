import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ProjectMembersResponse, ProjectResponse, ProjectsResponse } from '../../declarations/';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Request information about projects from Knora.
 */
export class ProjectsService extends ApiService {
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all projects.
     *
     * @returns Observable<Project[]>
     */
    getAllProjects() {
        return this.httpGet('/admin/projects').pipe(map((result) => result.getBody(ProjectsResponse).projects), catchError(this.handleJsonError));
    }
    /**
     * Returns a project object.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    getProjectByIri(iri) {
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    }
    /**
     * Returns a project object.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<Project>
     */
    getProjectByShortname(shortname) {
        const url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    }
    /**
     * Returns a project object.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<Project>
     */
    getProjectByShortcode(shortcode) {
        const url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    }
    /**
     * @private
     * Helper method combining project retrieval.
     *
     * @param {string} url
     * @returns Observable<Project>
     */
    getProject(url) {
        return this.httpGet(url).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    /**
     * Returns all project members.
     * Project identifier is project id (iri).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<User[]>
     */
    getProjectMembersByIri(iri) {
        const url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    }
    /**
     * Returns all project members.
     * Project identifier is shortname.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<User[]>
     */
    getProjectMembersByShortname(shortname) {
        const url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    }
    /**
     * Returns all project members.
     * Project identifier is shortcode.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<User[]>
     */
    getProjectMembersByShortcode(shortcode) {
        const url = '/admin/projects/members/' + shortcode + '?identifier=shortcode';
        return this.getProjectMembers(url);
    }
    /**
     * @private
     * Helper method combining project member retrieval.
     *
     * @param {string} url
     * @returns Observable<User[]>
     */
    getProjectMembers(url) {
        return this.httpGet(url).pipe(map((result) => result.getBody(ProjectMembersResponse).members), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new project.
     *
     * @param {any} data
     * @returns Observable<Project>
     */
    createProject(data) {
        const url = '/admin/projects';
        return this.httpPost(url, data).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Edit project data.
     *
     * @param {string} iri identifier of the project
     * @param {any} data
     * @returns Observable<Project>
     */
    updateProject(iri, data) {
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    /**
     * Activate project (if it was deleted).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    activateProject(iri) {
        const data = {
            status: true
        };
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete (set inactive) project.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    deleteProject(iri) {
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpDelete(url).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
}
ProjectsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ProjectsService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ProjectsService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL3Byb2plY3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBNkIsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFRLE1BQU0scUJBQXFCLENBQUM7QUFFakksT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFNUM7O0dBRUc7QUFJSCxNQUFNLHNCQUF1QixTQUFRLFVBQVU7SUFFM0MsMkVBQTJFO0lBQzNFLE1BQU07SUFDTiwyRUFBMkU7SUFFM0U7Ozs7T0FJRztJQUNILGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQ3ZDLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGVBQWUsQ0FBQyxHQUFXO1FBQ3ZCLE1BQU0sR0FBRyxHQUFXLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQkFBcUIsQ0FBQyxTQUFpQjtRQUNuQyxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsR0FBRyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7UUFD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ZUFBZSxDQUFDLEdBQVc7UUFDdkIsTUFBTSxJQUFJLEdBQVE7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBVyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLENBQUMsTUFBd0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFDMUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFHRCwyRUFBMkU7SUFDM0UsU0FBUztJQUNULDJFQUEyRTtJQUUzRTs7Ozs7T0FLRztJQUNILGFBQWEsQ0FBQyxHQUFXO1FBQ3JCLE1BQU0sR0FBRyxHQUFXLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQzFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDOzs7WUFuTUosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBQcm9qZWN0LCBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlLCBQcm9qZWN0UmVzcG9uc2UsIFByb2plY3RzUmVzcG9uc2UsIFVzZXIgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHByb2plY3RzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBwcm9qZWN0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdFtdPlxuICAgICAqL1xuICAgIGdldEFsbFByb2plY3RzKCk6IE9ic2VydmFibGU8UHJvamVjdFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi9wcm9qZWN0cycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdHNSZXNwb25zZSkucHJvamVjdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lIHNob3J0IG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGUgaGV4YWRlY2ltYWwgY29kZSB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IHJldHJpZXZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3QodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBwcm9qZWN0IGlkIChpcmkpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lIHNob3J0IG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydGNvZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlIGhleGFkZWNpbWFsIGNvZGUgdGhhdCB1bmlxdWVseSBpZGVudGlmaWVzIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IG1lbWJlciByZXRyaWV2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3RNZW1iZXJzKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdE1lbWJlcnNSZXNwb25zZSkubWVtYmVycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgY3JlYXRlUHJvamVjdChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRWRpdCBwcm9qZWN0IGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICB1cGRhdGVQcm9qZWN0KGlyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHByb2plY3QgKGlmIGl0IHdhcyBkZWxldGVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIChzZXQgaW5hY3RpdmUpIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZGVsZXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19