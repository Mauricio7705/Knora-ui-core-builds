import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiServiceResult } from '../../declarations';
/**
 * Requests ontology information from Knora.
 */
export declare class OntologyService extends ApiService {
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns the metadata of all ontologies.
     */
    getOntologiesMetadata(): Observable<ApiServiceResult>;
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri: string): Observable<ApiServiceResult>;
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns the requested resource class definitions.
     */
    getResourceClasses(resourceClassIris: Array<string>): Observable<ApiServiceResult>;
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param propertyIris the Iris of the properties to be queried.
     * @returns the requested properties.
     */
    getProperties(propertyIris: string[]): Observable<ApiServiceResult>;
}
