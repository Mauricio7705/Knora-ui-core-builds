import { Observable } from 'rxjs';
import { Project, User } from '../../declarations/';
import { ApiService } from '../api.service';
export declare class ProjectsService extends ApiService {
    /**
     * Returns a list of all projects.
     *
     * @returns Observable<Project[]>
     */
    getAllProjects(): Observable<Project[]>;
    /**
     * Returns a project object.
     *
     * @param {string} iri
     * @returns Observable<Project>
     */
    getProjectByIri(iri: string): Observable<Project>;
    /**
     * Returns a project object.
     *
     * @param {string} shortname
     * @returns Observable<Project>
     */
    getProjectByShortname(shortname: string): Observable<Project>;
    /**
     * Returns a project object.
     *
     * @param {string} shortcode
     * @returns Observable<Project>
     */
    getProjectByShortcode(shortcode: string): Observable<Project>;
    /**
     * Helper method combining project retrieval.
     *
     * @param {string} url
     * @returns Observable<Project>
     */
    protected getProject(url: string): Observable<Project>;
    /**
     * Returns all project members.
     * Project identifier is project id (iri).
     *
     * @param {string} iri
     * @returns Observable<User[]>
     */
    getProjectMembersByIri(iri: string): Observable<User[]>;
    /**
     * Returns all project members.
     * Project identifier is shortname.
     *
     * @param {string} shortname
     * @returns Observable<User[]>
     */
    getProjectMembersByShortname(shortname: string): Observable<User[]>;
    /**
     * Returns all project members.
     * Project identifier is shortcode.
     *
     * @param {string} shortcode
     * @returns Observable<User[]>
     */
    getProjectMembersByShortcode(shortcode: string): Observable<User[]>;
    /**
     * Helper method combining project member retrieval.
     *
     * @param {string} url
     * @returns Observable<User[]>
     */
    protected getProjectMembers(url: string): Observable<User[]>;
    /**
     * Create new project.
     *
     * @param {any} data
     * @returns Observable<Project>
     */
    createProject(data: any): Observable<Project>;
    /**
     * Edit project data.
     *
     * @param {string} iri
     * @param {any} data
     * @returns Observable<Project>
     */
    updateProject(iri: string, data: any): Observable<Project>;
    /**
     * Activate project (if it was deleted).
     *
     * @param {string} iri
     * @returns Observable<Project>
     */
    activateProject(iri: string): Observable<Project>;
    /**
     * Delete (set inactive) project.
     *
     * @param {string} iri
     * @returns Observable<Project>
     */
    deleteProject(iri: string): Observable<Project>;
}
