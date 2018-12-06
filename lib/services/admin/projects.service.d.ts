import { Observable } from 'rxjs';
import { Project, User } from '../../declarations/';
import { ApiService } from '../api.service';
export declare class ProjectsService extends ApiService {
    /**
     * returns a list of all projects
     *
     * @returns Observable of Project[]
     */
    getAllProjects(): Observable<Project[]>;
    /**
     * returns a project object
     *
     * @param {string} iri
     * @returns Observable of Project
     */
    getProjectByIri(iri: string): Observable<Project>;
    /**
     * returns a project object
     *
     * @param {string} shortname
     * @returns Observable of Project
     */
    getProjectByShortname(shortname: string): Observable<Project>;
    /**
     * returns a project object
     *
     * @param {string} shortcode
     * @returns Observable of Project
     */
    getProjectByShortcode(shortcode: string): Observable<Project>;
    /**
     * Helper method combining project retrieval
     *
     * @param {string} url
     * @returns Observable of Project
     */
    protected getProject(url: string): Observable<Project>;
    /**
     * returns all project members
     * project identifier is project id (iri)
     *
     * @param {string} iri
     * @returns Observable of User[]
     */
    getProjectMembersByIri(iri: string): Observable<User[]>;
    /**
     * returns all project members
     * project identifier is shortname
     *
     * @param {string} shortname
     * @returns Observable of User[]
     */
    getProjectMembersByShortname(shortname: string): Observable<User[]>;
    /**
     * returns all project members
     * project identifier is shortcode
     *
     * @param {string} shortcode
     * @returns {Observable<User[]>}
     */
    getProjectMembersByShortcode(shortcode: string): Observable<User[]>;
    /**
     * Helper method combining project member retrieval
     *
     * @param {string} url
     * @returns Observable of User[]
     */
    protected getProjectMembers(url: string): Observable<User[]>;
    /**
     * create new project
     *
     * @param {any} data
     * @returns Observable of Project
     */
    createProject(data: any): Observable<Project>;
    /**
     * edit project data
     *
     * @param {string} iri
     * @param {any} data
     * @returns Observable of Project
     */
    updateProject(iri: string, data: any): Observable<Project>;
    /**
     * activate project (if it was deleted)
     *
     * @param {string} iri
     * @returns Observable of Project
     */
    activateProject(iri: string): Observable<Project>;
    /**
     * Delete (set inactive) project
     *
     * @param {string} iri
     * @returns Observable of Project
     */
    deleteProject(iri: string): Observable<Project>;
}
