import { Injectable } from '@angular/core';
import { KnoraConstants, Utils } from '../../declarations';
import { OntologyService } from './ontology.service';
import { forkJoin, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ontology.service";
const jsonld = require('jsonld');
/**
 * Represents an error occurred in OntologyCacheService.
 */
class OntologyCacheError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
/**
 * Represents an ontology's metadata.
 */
export class OntologyMetadata {
    /**
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
}
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
export var CardinalityOccurrence;
(function (CardinalityOccurrence) {
    CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
    CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
    CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
})(CardinalityOccurrence || (CardinalityOccurrence = {}));
/**
 * Cardinality of a property for the given resource class.
 */
export class Cardinality {
    /**
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    constructor(occurrence, value, property) {
        this.occurrence = occurrence;
        this.value = value;
        this.property = property;
    }
}
/**
 * A resource class definition.
 */
export class ResourceClass {
    /**
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label describing the resource class.
     * @param {Cardinality[]} cardinalities the resource class's properties.
     */
    constructor(id, icon, comment, label, cardinalities) {
        this.id = id;
        this.icon = icon;
        this.comment = comment;
        this.label = label;
        this.cardinalities = cardinalities;
    }
}
/**
 * A map of resource class Iris to resource class definitions.
 */
export class ResourceClasses {
}
/**
 * A property definition.
 */
export class Property {
    /**
     * @param {string} id Iri identifying the property definition.
     * @param {string} objectType the property's object constraint.
     * @param {string} comment comment on the property definition.
     * @param {string} label label describing the property definition.
     * @param {string[]} subPropertyOf Iris of properties the given property is a subproperty of.
     * @param {boolean} isEditable indicates whether the given property can be edited by the client.
     * @param {boolean} isLinkProperty indicates whether the given property is a linking property.
     * @param {boolean} isLinkValueProperty indicates whether the given property refers to a link value.
     */
    constructor(id, objectType, comment, label, subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty) {
        this.id = id;
        this.objectType = objectType;
        this.comment = comment;
        this.label = label;
        this.subPropertyOf = subPropertyOf;
        this.isEditable = isEditable;
        this.isLinkProperty = isLinkProperty;
        this.isLinkValueProperty = isLinkValueProperty;
    }
}
/**
 * A map of property Iris to property definitions.
 */
export class Properties {
}
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
export class ResourceClassIrisForOntology {
}
/**
 * Represents cached ontology information (only used by this service internally).
 * This cache is updated whenever new definitions are requested from Knora.
 *
 * Requested ontology information by a service is represented by [[OntologyInformation]].
 */
class OntologyCache {
    constructor() {
        this.ontologies = [];
        this.resourceClassIrisForOntology = new ResourceClassIrisForOntology();
        this.resourceClasses = new ResourceClasses();
        this.properties = new Properties();
    }
}
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
export class OntologyInformation {
    /**
     * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    constructor(resourceClassesForOntology, resourceClasses, properties) {
        this.resourceClassesForOntology = resourceClassesForOntology;
        this.resourceClasses = resourceClasses;
        this.properties = properties;
    }
    /**
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @param {OntologyInformation} ontologyInfo the given definitions that have to be integrated.
     * @returns void
     */
    updateOntologyInformation(ontologyInfo) {
        // get new resourceClassIrisForOntology
        const newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();
        // update new resourceClassIrisForOntology
        // tslint:disable-next-line:forin
        for (const newResClassForOntology in newResourceClassesForOntology) {
            this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology];
        }
        // get new resource class definitions
        const newResourceClasses = ontologyInfo.getResourceClasses();
        // update resourceClasses
        // tslint:disable-next-line:forin
        for (const newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }
        // get new property definitions
        const newProperties = ontologyInfo.getProperties();
        // update properties
        // tslint:disable-next-line:forin
        for (const newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }
    }
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
     */
    getResourceClassForOntology() {
        return this.resourceClassesForOntology;
    }
    /**
     * Returns all resource classes as an object.
     *
     * @returns ResourceClasses - all resource class definitions as an object.
     */
    getResourceClasses() {
        return this.resourceClasses;
    }
    /**
     * Returns all resource classes as an array.
     *
     * @returns ResourceClass[]
     */
    getResourceClassesAsArray() {
        const resClasses = [];
        // tslint:disable-next-line:forin
        for (const resClassIri in this.resourceClasses) {
            const resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        return resClasses;
    }
    /**
     * Returns a resource class's label.
     *
     * @param {string} resClass resource class to query for.
     * @returns string - the resource class's label.
     */
    getLabelForResourceClass(resClass) {
        if (resClass !== undefined) {
            const resClassDef = this.resourceClasses[resClass];
            if (resClassDef !== undefined && resClassDef.label !== undefined) {
                return resClassDef.label;
            }
            else {
                return resClassDef.id;
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForResourceClass without argument resClass');
        }
    }
    /**
     * Returns all properties as an object.
     *
     * @returns Properties - all properties as an object.
     */
    getProperties() {
        return this.properties;
    }
    /**
     * Returns all properties as an array.
     *
     * @returns Property[] - all properties as an array.
     */
    getPropertiesAsArray() {
        const properties = [];
        // tslint:disable-next-line:forin
        for (const propIri in this.properties) {
            const prop = this.properties[propIri];
            properties.push(prop);
        }
        return properties;
    }
    /**
     * Returns a property's label.
     *
     * @param {string} property to query for.
     * @returns string - the property's label.
     */
    getLabelForProperty(property) {
        if (property !== undefined) {
            const propDef = this.properties[property];
            if (propDef !== undefined && propDef.label !== undefined) {
                return propDef.label;
            }
            else {
                return propDef.id;
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForProperty without argument property');
        }
    }
}
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
export class OntologyCacheService {
    constructor(_ontologyService) {
        this._ontologyService = _ontologyService;
        /**
         * Ontologies ingored by this service.
         * @param {string[]} excludedOntologies
         */
        this.excludedOntologies = [KnoraConstants.SalsahGuiOntology, KnoraConstants.StandoffOntology];
        /**
         * @param {string[]} excludedProperties properties that Knora is not responsible for and that have to be ignored because they cannot be resolved at the moment.
         */
        this.excludedProperties = [KnoraConstants.RdfsLabel];
        /**
         * @param {string[]} nonResourceClasses class definitions that are not be treated as Knora resource classes
         */
        this.nonResourceClasses = [KnoraConstants.ForbiddenResource, KnoraConstants.XMLToStandoffMapping, KnoraConstants.ListNode];
        /**
         * @param {OntologyCache} cacheOntology central instance that caches all definitions
         */
        this.cacheOntology = new OntologyCache();
    }
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns Observable<object> - metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    getOntologiesMetadataFromKnora() {
        return this._ontologyService.getOntologiesMetadata().pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        (ontRes) => {
            const ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            const ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    }
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param {string} ontologyIri the Iri of the requested ontology.
     * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
     */
    getAllEntityDefinitionsForOntologyFromKnora(ontologyIri) {
        return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        (ontRes) => {
            const ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            const ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    }
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
     * @returns a new OntologyMetadata object
     */
    convertAndWriteOntologiesMetadataToCache(ontologies) {
        this.cacheOntology.ontologies = ontologies.map(ontology => {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    }
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
     */
    getAllOntologiesMetadataFromCache() {
        return this.cacheOntology.ontologies;
    }
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Array<object>} classDefinitions the class definitions in an ontology response.
     * @returns string[] - resource class Iris from the given class definitions.
     */
    getResourceClassIrisFromOntologyResponse(classDefinitions) {
        const resourceClassIris = [];
        for (const classDef of classDefinitions) {
            const classIri = classDef['@id'];
            // check that class name is not listed as a non resource class and that the isResourceClass flag is present and set to true
            if (classIri !== KnoraConstants.Resource && this.nonResourceClasses.indexOf(classIri)
                === -1 && (classDef[KnoraConstants.IsResourceClass] !== undefined && classDef[KnoraConstants.IsResourceClass] === true)) {
                // it is not a value class, but a resource class definition
                resourceClassIris.push(classIri);
            }
        }
        return resourceClassIris;
    }
    /**
     * Converts a Knora response for all entity definitions for the requested ontology
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
     * If they are defined in another ontology, that ontology is requested from Knora too.
     *
     * @param {Object} ontology the ontology to be cached.
     * @returns void
     */
    convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology) {
        const graph = ontology['@graph'];
        // get all class definitions
        const classDefs = graph.filter((entity) => {
            const entityType = entity['@type'];
            return entityType === KnoraConstants.OwlClass;
        });
        // get all property definitions
        const propertyDefs = graph.filter((entity) => {
            const entityType = entity['@type'];
            return entityType === KnoraConstants.OwlObjectProperty ||
                entityType === KnoraConstants.OwlDatatypeProperty ||
                entityType === KnoraConstants.OwlAnnotationProperty ||
                entityType === KnoraConstants.RdfProperty;
        });
        // cache all resource class Iris belonging to the current ontology
        this.cacheOntology.resourceClassIrisForOntology[ontology['@id']] = this.getResourceClassIrisFromOntologyResponse(classDefs);
        // write class and property defintions to cache
        this.convertAndWriteEntityDefinitionsToCache(classDefs, propertyDefs);
    }
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
     * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
     */
    getOntologyInformationFromCache(ontologyIris) {
        const resourceClassesForOntology = new ResourceClassIrisForOntology();
        // collect resource class Iris for all requested named graphs
        let allResourceClassIris = [];
        for (const ontologyIri of ontologyIris) {
            if (this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined) {
                throw new OntologyCacheError(`getResourceClassesForOntologiesFromCache: ontology not found in cache: ${ontologyIri}`);
            }
            // add information for the given ontology
            resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassIrisForOntology[ontologyIri];
            // add all resource class Iris of this ontology
            allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassIrisForOntology[ontologyIri]);
        }
        // get resource class definitions for all requested ontologies
        return this.getResourceClassDefinitions(allResourceClassIris).pipe(map(resClassDefs => {
            return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties());
        }));
    }
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
     * @returns void
     */
    convertAndWriteEntityDefinitionsToCache(resourceClassDefinitions, propertyClassDefinitions) {
        // convert and cache each given resource class definition
        for (const resClass of resourceClassDefinitions) {
            const resClassIri = resClass['@id'];
            // represents all cardinalities of this resource class
            const cardinalities = [];
            if (resClass[KnoraConstants.RdfsSubclassOf] !== undefined) {
                let subclassOfCollection;
                // check if it is a single object or a collection
                if (!Array.isArray(resClass[KnoraConstants.RdfsSubclassOf])) {
                    subclassOfCollection = [resClass[KnoraConstants.RdfsSubclassOf]];
                }
                else {
                    subclassOfCollection = resClass[KnoraConstants.RdfsSubclassOf];
                }
                // get cardinalities for the properties of a resource class
                for (const curCard of subclassOfCollection) {
                    // make sure it is a cardinality (it could also be an Iri of a superclass)
                    if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] === KnoraConstants.OwlRestriction) {
                        let newCard;
                        // get occurrence
                        if (curCard[KnoraConstants.OwlMinCardinality] !== undefined) {
                            newCard = new Cardinality(CardinalityOccurrence.minCard, curCard[KnoraConstants.OwlMinCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                        }
                        else if (curCard[KnoraConstants.OwlCardinality] !== undefined) {
                            newCard = new Cardinality(CardinalityOccurrence.card, curCard[KnoraConstants.OwlCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                        }
                        else if (curCard[KnoraConstants.OwlMaxCardinality] !== undefined) {
                            newCard = new Cardinality(CardinalityOccurrence.maxCard, curCard[KnoraConstants.OwlMaxCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                        }
                        else {
                            // no known occurrence found
                            throw new TypeError(`cardinality type invalid for ${resClass['@id']} ${curCard[KnoraConstants.OwlOnProperty]}`);
                        }
                        // TODO: get gui order
                        // add cardinality
                        cardinalities.push(newCard);
                    }
                }
            }
            const resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
            // write this resource class definition to the cache object
            this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
        }
        // cache the property definitions
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
    }
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param {string[]} resClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
     */
    getResourceClassDefinitionsFromCache(resClassIris) {
        // collect the definitions for each resource class from the cache
        const resClassDefs = new ResourceClasses();
        // collect the properties from the cardinalities of the given resource classes
        const propertyIris = [];
        resClassIris.forEach(resClassIri => {
            resClassDefs[resClassIri] = this.cacheOntology.resourceClasses[resClassIri];
            this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(card => {
                // get property definition for each cardinality
                propertyIris.push(card.property);
            });
        });
        return this.getPropertyDefinitions(propertyIris).pipe(map(propDefs => {
            return new OntologyInformation(new ResourceClassIrisForOntology(), resClassDefs, propDefs.getProperties());
        }));
    }
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
     * @returns void
     */
    convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyDefinitionsFromKnora) {
        // convert and cache each given property definition
        for (const propDef of propertyDefinitionsFromKnora) {
            const propIri = propDef['@id'];
            let isEditable = false;
            if (propDef[KnoraConstants.isEditable] !== undefined && propDef[KnoraConstants.isEditable] === true) {
                isEditable = true;
            }
            let isLinkProperty = false;
            if (propDef[KnoraConstants.isLinkProperty] !== undefined && propDef[KnoraConstants.isLinkProperty] === true) {
                isLinkProperty = true;
            }
            let isLinkValueProperty = false;
            if (propDef[KnoraConstants.isLinkValueProperty] !== undefined && propDef[KnoraConstants.isLinkValueProperty] === true) {
                isLinkValueProperty = true;
            }
            let subPropertyOf = [];
            if (propDef[KnoraConstants.subPropertyOf] !== undefined && Array.isArray(propDef[KnoraConstants.subPropertyOf])) {
                subPropertyOf = propDef[KnoraConstants.subPropertyOf].map((superProp) => superProp['@id']);
            }
            else if (propDef[KnoraConstants.subPropertyOf] !== undefined) {
                subPropertyOf.push(propDef[KnoraConstants.subPropertyOf]['@id']);
            }
            let objectType;
            if (propDef[KnoraConstants.ObjectType] !== undefined) {
                objectType = propDef[KnoraConstants.ObjectType]['@id'];
            }
            // cache property definition
            this.cacheOntology.properties[propIri] = new Property(propIri, objectType, propDef[KnoraConstants.RdfsComment], propDef[KnoraConstants.RdfsLabel], subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty);
        }
    }
    /**
     * Returns property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns OntologyInformation - requested property defintions.
     */
    getPropertyDefinitionsFromCache(propertyIris) {
        const propertyDefs = new Properties();
        propertyIris.forEach(propIri => {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (this.excludedProperties.indexOf(propIri) > -1) {
                return;
            }
            if (this.cacheOntology.properties[propIri] === undefined) {
                throw new OntologyCacheError(`getPropertyDefinitionsFromCache: property not found in cache: ${propIri}`);
            }
            propertyDefs[propIri] = this.cacheOntology.properties[propIri];
        });
        return new OntologyInformation(new ResourceClassIrisForOntology(), new ResourceClasses(), propertyDefs);
    }
    /**
     * Returns metadata about all ontologies.
     *
     * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
     */
    getOntologiesMetadata() {
        if (this.cacheOntology.ontologies.length === 0) {
            // nothing in cache yet, get metadata from Knora
            return this.getOntologiesMetadataFromKnora().pipe(map(metadata => {
                this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter((onto) => {
                    // ignore excluded ontologies
                    return this.excludedOntologies.indexOf(onto['@id']) === -1;
                }));
                return this.getAllOntologiesMetadataFromCache();
            }));
        }
        else {
            // return metadata from cache
            return of(this.getAllOntologiesMetadataFromCache());
        }
    }
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be requested.
     * @returns Observable<any[]>
     */
    getAndCacheOntologies(ontologyIris) {
        // array to be populated with Observables
        const observables = [];
        // do a request for each ontology
        ontologyIris.forEach(ontologyIri => {
            // push an Observable onto `observables`
            observables.push(this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(map((ontology) => {
                // write response to cache
                this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
            })));
        });
        // forkJoin returns an Observable of an array of results
        // returned by each Observable contained in `observables`
        // a subscription to the Observable returned by forkJoin is executed
        // once all Observables have been completed
        return forkJoin(observables);
    }
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     * @returns Observable<OntologyInformation> - all ontology metadata from the cache
     */
    getEntityDefinitionsForOntologies(ontologyIris) {
        const ontologyIrisToQuery = ontologyIris.filter(ontologyIri => {
            // return the ontology Iris that are not cached yet
            return this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined;
        });
        // get ontologies that are mot cached yet
        if (ontologyIrisToQuery.length > 0) {
            return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(mergeMap(results => {
                // executed once all ontologies have been cached
                return this.getOntologyInformationFromCache(ontologyIris);
            }));
        }
        else {
            return this.getOntologyInformationFromCache(ontologyIris);
        }
    }
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param {string[]} resourceClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
     */
    getResourceClassDefinitions(resourceClassIris) {
        const resClassIrisToQueryFor = resourceClassIris.filter(resClassIri => {
            // return the resource class Iris that are not cached yet
            return this.cacheOntology.resourceClasses[resClassIri] === undefined;
        });
        if (resClassIrisToQueryFor.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing resource classes
            const ontologyIris = resClassIrisToQueryFor.map(resClassIri => {
                return Utils.getOntologyIriFromEntityIri(resClassIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(mergeMap(results => {
                return this.getResourceClassDefinitionsFromCache(resourceClassIris);
            }));
        }
        else {
            return this.getResourceClassDefinitionsFromCache(resourceClassIris);
        }
    }
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns Observable<OntologyInformation> - the requested property definitions.
     */
    getPropertyDefinitions(propertyIris) {
        const propertiesToQuery = propertyIris.filter(propIri => {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (this.excludedProperties.indexOf(propIri) > -1) {
                return false;
            }
            // return the property Iris that are not cached yet
            return this.cacheOntology.properties[propIri] === undefined;
        });
        if (propertiesToQuery.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing properties
            const ontologyIris = propertiesToQuery.map(propIri => {
                return Utils.getOntologyIriFromEntityIri(propIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(map(results => {
                if (results) {
                    return this.getPropertyDefinitionsFromCache(propertyIris);
                }
                else {
                    throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                }
            }));
        }
        else {
            return of(this.getPropertyDefinitionsFromCache(propertyIris));
        }
    }
}
OntologyCacheService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
OntologyCacheService.ctorParameters = () => [
    { type: OntologyService }
];
OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(i1.OntologyService)); }, token: OntologyCacheService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3ktY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQW9CLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUcvQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakM7O0dBRUc7QUFDSCx3QkFBeUIsU0FBUSxLQUFLO0lBRWxDLFlBQXFCLE9BQWU7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUVwQyxDQUFDO0NBQ0o7QUFHRDs7R0FFRztBQUNILE1BQU07SUFFRjs7O09BR0c7SUFDSCxZQUFxQixFQUFVLEVBQ2xCLEtBQWE7UUFETCxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQVE7SUFFMUIsQ0FBQztDQUVKO0FBR0Q7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxxQkFJWDtBQUpELFdBQVkscUJBQXFCO0lBQzdCLHVFQUFXLENBQUE7SUFDWCxpRUFBUSxDQUFBO0lBQ1IsdUVBQVcsQ0FBQTtBQUNmLENBQUMsRUFKVyxxQkFBcUIsS0FBckIscUJBQXFCLFFBSWhDO0FBR0Q7O0dBRUc7QUFDSCxNQUFNO0lBRUY7Ozs7T0FJRztJQUNILFlBQXFCLFVB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SSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztnQkFDaEcsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUNKLENBQUM7UUFDTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDTCxDQUFDOzs7WUE5a0JKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQWxXUSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgS25vcmFDb25zdGFudHMsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IE9udG9sb2d5U2VydmljZSB9IGZyb20gJy4vb250b2xvZ3kuc2VydmljZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIG9jY3VycmVkIGluIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBvbnRvbG9neSdzIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lNZXRhZGF0YSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgYSBsYWJlbCBkZXNjcmliaW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIE9jY3VycmVuY2Ugb2YgYSBwcm9wZXJ0eSBmb3IgYSByZXNvdXJjZSBjbGFzcyAoaXRzIGNhcmRpbmFsaXR5KS5cbiAqL1xuZXhwb3J0IGVudW0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlIHtcbiAgICBtaW5DYXJkID0gMCxcbiAgICBjYXJkID0gMSxcbiAgICBtYXhDYXJkID0gMlxufVxuXG5cbi8qKlxuICogQ2FyZGluYWxpdHkgb2YgYSBwcm9wZXJ0eSBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FyZGluYWxpdHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eU9jY3VycmVuY2V9IG9jY3VycmVuY2UgdHlwZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBudW1lcmljYWwgdmFsdWUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRoZSBnaXZlbiBvY2N1cnJlbmNlIGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb2NjdXJyZW5jZTogQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiBwYXRoIHRvIGFuIGljb24gcmVwcmVzZW50aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eVtdfSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaWNvbjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhcmRpbmFsaXRpZXM6IEFycmF5PENhcmRpbmFsaXR5Pikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyB0byByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NlcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZXNvdXJjZUNsYXNzO1xufVxuXG5cbi8qKlxuICogQSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0VHlwZSB0aGUgcHJvcGVydHkncyBvYmplY3QgY29uc3RyYWludC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHN1YlByb3BlcnR5T2YgSXJpcyBvZiBwcm9wZXJ0aWVzIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIHN1YnByb3BlcnR5IG9mLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFZGl0YWJsZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgY2FuIGJlIGVkaXRlZCBieSB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgbGlua2luZyBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGlua1ZhbHVlUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IHJlZmVycyB0byBhIGxpbmsgdmFsdWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1Byb3BlcnR5OiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5TWV0YWRhdGFbXX0gb250b2xvZ2llcyBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSBsaXN0IG9mIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIG5hbWVkIGdyYXBoLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbnRvbG9naWVzID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9udG9sb2d5IGluZm9ybWF0aW9uIHJlcXVlc3RlZCBmcm9tIHRoaXMgc2VydmljZS5cbiAqXG4gKiBGb3IgZXZlcnkgcmVxdWVzdCwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBjb250YWluaW5nIHRoZSByZXF1ZXN0ZWQgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGEgc2VydmljZSBsaWtlIHRoZSBzZWFyY2ggZmV0Y2hlcyBuZXcgcmVzdWx0c1xuICAgICAqIHRoYXQgaGF2ZSB0byBiZSBhZGRlZCB0byBhbiBleGlzdGluZyBjb2xsZWN0aW9uLlxuICAgICAqIFRoZSBleGlzdGluZyBvbnRvbG9neSBpbmZvcm1hdGlvbiBtdXN0IG5vdCBiZSBsb3N0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gdGhlIGdpdmVuIGRlZmluaXRpb25zIHRoYXQgaGF2ZSB0byBiZSBpbnRlZ3JhdGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzZXMgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NbXVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZiA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3Mgd2l0aG91dCBhcmd1bWVudCByZXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBQcm9wZXJ0aWVzIC0gYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMoKTogUHJvcGVydGllcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFByb3BlcnR5W10gLSBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzQXNBcnJheSgpOiBBcnJheTxQcm9wZXJ0eT4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BJcmkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUHJvcGVydHkocHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChwcm9wRGVmICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclByb3BlcnR5IHdpdGhvdXQgYXJndW1lbnQgcHJvcGVydHknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICogT3RoZXIgY29tcG9uZW50cyBvciBzZXJ2aWNlcyBvYnRhaW4gb250b2xvZ3kgaW5mb3JtYXRpb24gdGhyb3VnaCB0aGlzIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lDYWNoZVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogT250b2xvZ2llcyBpbmdvcmVkIGJ5IHRoaXMgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZE9udG9sb2dpZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZFByb3BlcnRpZXMgcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kIHRoYXQgaGF2ZSB0byBiZSBpZ25vcmVkIGJlY2F1c2UgdGhleSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm9uUmVzb3VyY2VDbGFzc2VzIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lDYWNoZX0gY2FjaGVPbnRvbG9neSBjZW50cmFsIGluc3RhbmNlIHRoYXQgY2FjaGVzIGFsbCBkZWZpbml0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2FjaGVPbnRvbG9neTogT250b2xvZ3lDYWNoZSA9IG5ldyBPbnRvbG9neUNhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vbnRvbG9neVNlcnZpY2U6IE9udG9sb2d5U2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcyBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBvbnRvbG9naWVzIGFzIEpTT04tTEQgKG5vIHByZWZpeGVzLCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyAocmVzb3VyY2UgY2xhc3NlcyBhbmQgcHJvcGVydGllcykgZm9yIHRoZSBnaXZlbiBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmkgb2YgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3Igb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGFsbCB0aGUgb250b2xvZ2llcycgbWV0YWRhdGEgcmV0dXJuZWQgYnkgS25vcmEgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gb250b2xvZ2llcyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIGEgbmV3IE9udG9sb2d5TWV0YWRhdGEgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4gLSBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PG9iamVjdD59IGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3ViY2xhc3NPZkNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIHNpbmdsZSBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSBbcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY2FyZGluYWxpdGllcyBmb3IgdGhlIHByb3BlcnRpZXMgb2YgYSByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VyQ2FyZCBvZiBzdWJjbGFzc09mQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgZ3VpIG9yZGVyXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZSBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9IG5ldyBQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSxcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcHJvcGVydHkgZGVmaW5pdGlvbnMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9udG9sb2d5SW5mb3JtYXRpb24gLSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW50aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZTogcHJvcGVydHkgbm90IGZvdW5kIGluIGNhY2hlOiAke3Byb3BJcml9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvcGVydHlEZWZzW3Byb3BJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIG5ldyBSZXNvdXJjZUNsYXNzZXMoKSwgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiAtIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgaW4gY2FjaGUgeWV0LCBnZXQgbWV0YWRhdGEgZnJvbSBLbm9yYVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShtZXRhZGF0YVsnQGdyYXBoJ10uZmlsdGVyKChvbnRvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIGV4Y2x1ZGVkIG9udG9sb2dpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlZE9udG9sb2dpZXMuaW5kZXhPZihvbnRvWydAaWQnXSkgPT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmV0dXJuIG1ldGFkYXRhIGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSBLbm9yYSwgYWRkaW5nIHRoZW0gdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcmVxdWVzdGVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55W10+XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgICAgICAvLyBhcnJheSB0byBiZSBwb3B1bGF0ZWQgd2l0aCBPYnNlcnZhYmxlc1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgICAgIC8vIGRvIGEgcmVxdWVzdCBmb3IgZWFjaCBvbnRvbG9neVxuICAgICAgICBvbnRvbG9neUlyaXMuZm9yRWFjaChvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAvLyBwdXNoIGFuIE9ic2VydmFibGUgb250byBgb2JzZXJ2YWJsZXNgXG4gICAgICAgICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChvbnRvbG9neTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9ya0pvaW4gcmV0dXJucyBhbiBPYnNlcnZhYmxlIG9mIGFuIGFycmF5IG9mIHJlc3VsdHNcbiAgICAgICAgLy8gcmV0dXJuZWQgYnkgZWFjaCBPYnNlcnZhYmxlIGNvbnRhaW5lZCBpbiBgb2JzZXJ2YWJsZXNgXG4gICAgICAgIC8vIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGZvcmtKb2luIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIG9uY2UgYWxsIE9ic2VydmFibGVzIGhhdmUgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYWxsIG9udG9sb2d5IG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlXG4gICAgICovXG4gICAgcHVibGljIGdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzVG9RdWVyeSA9IG9udG9sb2d5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbnRvbG9neSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IG9udG9sb2dpZXMgdGhhdCBhcmUgbW90IGNhY2hlZCB5ZXRcbiAgICAgICAgaWYgKG9udG9sb2d5SXJpc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzVG9RdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkIC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllc1RvUXVlcnk6IHN0cmluZ1tdID0gcHJvcGVydHlJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcHJvcGVydGllc1RvUXVlcnkubWFwKFxuICAgICAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHByb3BJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSB3aXRoOiByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==