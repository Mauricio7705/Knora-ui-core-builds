import { OntologyService } from './ontology.service';
import { Observable } from 'rxjs';
/**
 * Represents an ontology's metadata.
 */
export declare class OntologyMetadata {
    readonly id: string;
    readonly label: string;
    /**
     *
     * @param id Iri identifying the ontology.
     * @param label a label describing the ontology.
     */
    constructor(id: string, label: string);
}
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
export declare enum CardinalityOccurrence {
    minCard = 0,
    card = 1,
    maxCard = 2,
}
/**
 * Cardinality of a property for the given resource class.
 */
export declare class Cardinality {
    readonly occurrence: CardinalityOccurrence;
    readonly value: number;
    readonly property: string;
    /**
     *
     * @param occurrence type of given occurrence.
     * @param value numerical value of given occurrence.
     * @param property the property the given occurrence applies to.
     */
    constructor(occurrence: CardinalityOccurrence, value: number, property: string);
}
/**
 * A resource class definition.
 */
export declare class ResourceClass {
    readonly id: string;
    readonly icon: string;
    readonly comment: string;
    readonly label: string;
    readonly cardinalities: Array<Cardinality>;
    /**
     *
     * @param id Iri identifying the resource class.
     * @param icon path to an icon representing the resource class.
     * @param comment comment on the resource class.
     * @param label label describing the resource class.
     * @param cardinalities the resource class's properties.
     */
    constructor(id: string, icon: string, comment: string, label: string, cardinalities: Array<Cardinality>);
}
/**
 * A map of resource class Iris to resource class definitions.
 */
export declare class ResourceClasses {
    [index: string]: ResourceClass;
}
/**
 * A property definition.
 */
export declare class Property {
    readonly id: string;
    readonly objectType: string;
    readonly comment: string;
    readonly label: string;
    readonly subPropertyOf: Array<string>;
    readonly isEditable: Boolean;
    readonly isLinkProperty: Boolean;
    readonly isLinkValueProperty: Boolean;
    /**
     *
     * @param id Iri identifying the property definition.
     * @param objectType the property's object constraint.
     * @param comment comment on the property definition.
     * @param label label describing the property definition.
     * @param subPropertyOf Iris of properties the given property is a subproperty of.
     * @param isEditable indicates whether the given property can be edited by the client.
     * @param isLinkProperty indicates whether the given property is a linking property.
     * @param isLinkValueProperty indicates whether the given property refers to a link value.
     */
    constructor(id: string, objectType: string, comment: string, label: string, subPropertyOf: Array<string>, isEditable: Boolean, isLinkProperty: Boolean, isLinkValueProperty: Boolean);
}
/**
 * A map of property Iris to property definitions.
 */
export declare class Properties {
    [index: string]: Property;
}
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
export declare class ResourceClassIrisForOntology {
    [index: string]: Array<string>;
}
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
export declare class OntologyInformation {
    private resourceClassesForOntology;
    private resourceClasses;
    private properties;
    /**
     *
     * @param resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    constructor(resourceClassesForOntology: ResourceClassIrisForOntology, resourceClasses: ResourceClasses, properties: Properties);
    /**
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     *
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @params ontologyInfo the given definitions that have to be integrated.
     */
    updateOntologyInformation(ontologyInfo: OntologyInformation): void;
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns all resource class definitions grouped by ontologies.
     */
    getResourceClassForOntology(): ResourceClassIrisForOntology;
    /**
     * Returns all resource classes as an object.
     *
     * @returns all resource class definitions as an object.
     */
    getResourceClasses(): ResourceClasses;
    /**
     * Returns all resource classes as an array.
     *
     * @returns {Array<ResourceClass>}
     */
    getResourceClassesAsArray(): Array<ResourceClass>;
    /**
     * Returns a resource class's label.
     *
     * @param resClass resource class to query for.
     * @returns the resource class's label.
     */
    getLabelForResourceClass(resClass: string): string;
    /**
     * Returns all properties as an object.
     *
     * @returns all properties as an object.
     */
    getProperties(): Properties;
    /**
     * Returns all properties as an array.
     *
     * @returns all properties as an array.
     */
    getPropertiesAsArray(): Array<Property>;
    /**
     * Returns a property's label.
     *
     * @param property to query for.
     * @returns the property's label.
     */
    getLabelForProperty(property: string): string;
}
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
export declare class OntologyCacheService {
    private _ontologyService;
    private excludedOntologies;
    private excludedProperties;
    private nonResourceClasses;
    private cacheOntology;
    constructor(_ontologyService: OntologyService);
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    private getOntologiesMetadataFromKnora();
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param ontologyIri the Iri of the requested ontology.
     */
    private getAllEntityDefinitionsForOntologyFromKnora(ontologyIri);
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {string[]} ontologies metadata of all existing ontologies as JSON-LD.
     */
    private convertAndWriteOntologiesMetadataToCache(ontologies);
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns metadata of all existing ontologies.
     */
    private getAllOntologiesMetadataFromCache();
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param classDefinitions the class definitions in an ontology response.
     * @returns resource class Iris from the given class definitions.
     */
    private getResourceClassIrisFromOntologyResponse(classDefinitions);
    /**
     * Converts a Knora response for all entity definitions for the requested ontology
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
     * If they are defined in another ontology, that ontology is requested from Knora too.
     *
     * @param {Object} ontology the ontology to be cached.
     */
    private convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param ontologyIris the ontologies for which definitions should be returned.
     * @returns the definitions for the requested ontologies.
     */
    private getOntologyInformationFromCache(ontologyIris);
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param resourceClassDefinitions the resource class definitions returned by Knora.
     * @param propertyClassDefinitions the property definitions returned by Knora.
     */
    private convertAndWriteEntityDefinitionsToCache(resourceClassDefinitions, propertyClassDefinitions);
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param resClassIris the given resource class Iris
     * @returns {ResourceClasses} an [[OntologyCache]] representing the requested resource classes.
     */
    private getResourceClassDefinitionsFromCache(resClassIris);
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param propertyDefinitionsFromKnora the property definitions returned by Knora
     */
    private convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyDefinitionsFromKnora);
    /**
     * Returns property definitions from the cache.
     *
     * @param propertyIris the property definitions to be returned.
     * @returns requested property defintions.
     */
    private getPropertyDefinitionsFromCache(propertyIris);
    /**
     * Returns metadata about all ontologies.
     *
     * @returns metadata about all ontologies.
     */
    getOntologiesMetadata(): Observable<Array<OntologyMetadata>>;
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param ontologyIris Iris of the ontologies to be requested.
     */
    private getAndCacheOntologies(ontologyIris);
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param ontologyIris Iris of the ontologies to be queried.
     */
    getEntityDefinitionsForOntologies(ontologyIris: string[]): Observable<OntologyInformation>;
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns the requested resource classes (including properties).
     */
    getResourceClassDefinitions(resourceClassIris: string[]): Observable<OntologyInformation>;
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns the requested property definitions.
     */
    getPropertyDefinitions(propertyIris: string[]): Observable<OntologyInformation>;
}
