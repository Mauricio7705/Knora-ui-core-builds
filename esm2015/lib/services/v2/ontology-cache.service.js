import { Injectable } from '@angular/core';
import { KnoraConstants } from '../../declarations/api/knora-constants';
import { Utils } from '../../declarations/utils';
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
     * @hideconstructor
     *
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
     * Sorts an array of `ResourceClass` or `Property` by label.
     *
     * @param a first element
     * @param b second element
     * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
     */
    static sortFunc(a, b) {
        // dealing with 'undefined' labels
        if (a.label === undefined) {
            return 1;
        }
        else if (b.label === undefined) {
            return -1;
        }
        const labelA = a.label.toLowerCase();
        const labelB = b.label.toLowerCase();
        if (labelA < labelB) {
            return -1;
        }
        else if (labelA > labelB) {
            return 1;
        }
        else {
            return 0;
        }
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
     * @param {boolean} sortAsc sort resource classes by label in ascending order by default
     * @returns ResourceClass[]
     */
    getResourceClassesAsArray(sortAsc = true) {
        const resClasses = [];
        // tslint:disable-next-line:forin
        for (const resClassIri in this.resourceClasses) {
            const resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        // resourceClasses order by label in ascending order
        resClasses.sort(OntologyInformation.sortFunc);
        // resourceClasses order by label in descending order
        if (!sortAsc) {
            resClasses.reverse();
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
                console.log(`cannot get label for ${resClass}`);
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
     * @param {boolean} sortAsc sort properties by label in ascending order by default
     * @returns Property[] - all properties as an array.
     */
    getPropertiesAsArray(sortAsc = true) {
        const properties = [];
        // tslint:disable-next-line:forin
        for (const propIri in this.properties) {
            const prop = this.properties[propIri];
            properties.push(prop);
        }
        // properties order by label in ascending order
        properties.sort(OntologyInformation.sortFunc);
        // properties order by label in descending order
        if (!sortAsc) {
            properties.reverse();
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
                console.log(`cannot get label for ${property}`);
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
OntologyCacheService.ctorParameters = () => [
    { type: OntologyService }
];
OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(i1.OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3ktY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRy9DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQzs7R0FFRztBQUNILHdCQUF5QixTQUFRLEtBQUs7SUFFbEMsWUFBcUIsT0FBZTtRQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFRO0lBRXBDLENBQUM7Q0FDSjtBQUdEOztHQUVHO0FBQ0gsTUFBTTtJQUVGOzs7OztPQUtHO0lBQ0gsWUFBcUIsRUFBVSxFQUNWLEtBQWE7UUFEYixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUVsQyxDQUFDO0NBRUo7QUFHRDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLHFCQUlYO0FBSkQsV0FBWSxxQkFBcUI7SUFDN0IsdUVBQVcsQ0FBQTtJQUNYLGlFQUFRLENBQUE7SUFDUix1RUFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUpXLHFCQUFxQixLQUFyQixxQkFBcUIsUUFJaEM7QUFHRDs7R0FFRztBQUNILE1BQU07SUFFRjs7OztPQUlHO0lBQ0gsWUFBcUIsVUFBaUMsRUFDakMsS0FBYSxFQUNiLFFBQWdCO1FBRmhCLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBQ2pDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQ3JDLENBQUM7Q0FDSjtBQUdEOztHQUVHO0FBQ0gsTUFBTTtJQUVGOzs7Ozs7T0FNRztJQUNILFlBQXFCLEVBQVUsRUFDVixJQUFZLEVBQ1osT0FBZSxFQUNmLEtBQWEsRUFDYixhQUFpQztRQUpqQyxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2Isa0JBQWEsR0FBYixhQUFhLENBQW9CO0lBRXRELENBQUM7Q0FDSjtBQUdEOztHQUVHO0FBQ0gsTUFBTTtDQUVMO0FBR0Q7O0dBRUc7QUFDSCxNQUFNO0lBRUY7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBcUIsRUFBVSxFQUNWLFVBQWtCLEVBQ2xCLE9BQWUsRUFDZixLQUFhLEVBQ2IsYUFBNEIsRUFDNUIsVUFBbUIsRUFDbkIsY0FBdUIsRUFDdkIsbUJBQTRCO1FBUDVCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQUN2Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVM7SUFFakQsQ0FBQztDQUNKO0FBR0Q7O0dBRUc7QUFDSCxNQUFNO0NBRUw7QUFHRDs7OztHQUlHO0FBQ0gsTUFBTTtDQUVMO0FBR0Q7Ozs7O0dBS0c7QUFDSDtJQXNCSTtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLDRCQUE0QixFQUFFLENBQUM7UUFFdkUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTTtJQUVGOzs7O09BSUc7SUFDSCxZQUNZLDBCQUF3RCxFQUN4RCxlQUFnQyxFQUNoQyxVQUFzQjtRQUZ0QiwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQThCO1FBQ3hELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ2xDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQTJCLEVBQUUsQ0FBMkI7UUFDcEUsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDOUIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNiO1FBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2I7YUFBTSxJQUFJLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDeEIsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNO1lBQ0gsT0FBTyxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCx5QkFBeUIsQ0FBQyxZQUFpQztRQUV2RCx1Q0FBdUM7UUFDdkMsTUFBTSw2QkFBNkIsR0FBaUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFFL0csMENBQTBDO1FBQzFDLGlDQUFpQztRQUNqQyxLQUFLLE1BQU0sc0JBQXNCLElBQUksNkJBQTZCLEVBQUU7WUFDaEUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsNkJBQTZCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNuSDtRQUVELHFDQUFxQztRQUNyQyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTdELHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsS0FBSyxNQUFNLFdBQVcsSUFBSSxrQkFBa0IsRUFBRTtZQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsK0JBQStCO1FBQy9CLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuRCxvQkFBb0I7UUFDcEIsaUNBQWlDO1FBQ2pDLEtBQUssTUFBTSxPQUFPLElBQUksYUFBYSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQkFBMkI7UUFDdkIsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gseUJBQXlCLENBQUMsVUFBbUIsSUFBSTtRQUU3QyxNQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO1FBRTVDLGlDQUFpQztRQUNqQyxLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDNUMsTUFBTSxRQUFRLEdBQWtCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEUsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUVELG9EQUFvRDtRQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFFdEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsd0JBQXdCLENBQUMsUUFBZ0I7UUFFckMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBRXhCLE1BQU0sV0FBVyxHQUFrQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWxFLElBQUksV0FBVyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDOUQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDbkQ7U0FDSjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG9CQUFvQixDQUFDLFVBQW1CLElBQUk7UUFFeEMsTUFBTSxVQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUV2QyxpQ0FBaUM7UUFDakMsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25DLE1BQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUVELCtDQUErQztRQUMvQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFFdEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsUUFBZ0I7UUFFaEMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBRXhCLE1BQU0sT0FBTyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFcEQsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN0RCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNuRDtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDJFQUEyRSxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0NBRUo7QUFHRDs7O0dBR0c7QUFJSCxNQUFNO0lBdUJGLFlBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBckJyRDs7O1dBR0c7UUFDSyx1QkFBa0IsR0FBa0IsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFaEg7O1dBRUc7UUFDSyx1QkFBa0IsR0FBa0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkU7O1dBRUc7UUFDSyx1QkFBa0IsR0FBa0IsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLG9CQUFvQixFQUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3STs7V0FFRztRQUNLLGtCQUFhLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7SUFHM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw4QkFBOEI7UUFFbEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQ3JELFFBQVE7UUFDSiw2RkFBNkY7UUFDN0YsMkRBQTJEO1FBQzNELDRGQUE0RjtRQUM1RixDQUFDLE1BQXdCLEVBQUUsRUFBRTtZQUN6QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BDLDJEQUEyRDtZQUMzRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFeEQsOENBQThDO1lBQzlDLCtEQUErRDtZQUMvRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssMkNBQTJDLENBQUMsV0FBbUI7UUFFbkUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0NBQW9DLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUMvRSxRQUFRO1FBQ0osNkZBQTZGO1FBQzdGLDJEQUEyRDtRQUMzRCw0RkFBNEY7UUFDNUYsQ0FBQyxNQUF3QixFQUFFLEVBQUU7WUFDekIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQywyREFBMkQ7WUFDM0QsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELDhDQUE4QztZQUM5QywrREFBK0Q7WUFDL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHdDQUF3QyxDQUFDLFVBQW9CO1FBRWpFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQzFDLFFBQVEsQ0FBQyxFQUFFO1lBQ1AsT0FBTyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGlDQUFpQztRQUVyQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBRXpDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx3Q0FBd0MsQ0FBQyxnQkFBK0I7UUFDNUUsTUFBTSxpQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFFdkMsS0FBSyxNQUFNLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRTtZQUNyQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFakMsMkhBQTJIO1lBQzNILElBQ0ksUUFBUSxLQUFLLGNBQWMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQzdFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDekgsMkRBQTJEO2dCQUMzRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7U0FDSjtRQUVELE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLHFEQUFxRCxDQUFDLFFBQWdCO1FBRTFFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVqQyw0QkFBNEI7UUFDNUIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FDMUIsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUNmLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxPQUFPLFVBQVUsS0FBSyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRVAsK0JBQStCO1FBQy9CLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQzdCLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDZixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsT0FBTyxVQUFVLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtnQkFDbEQsVUFBVSxLQUFLLGNBQWMsQ0FBQyxtQkFBbUI7Z0JBQ2pELFVBQVUsS0FBSyxjQUFjLENBQUMscUJBQXFCO2dCQUNuRCxVQUFVLEtBQUssY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUdQLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1SCwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUUxRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSywrQkFBK0IsQ0FBQyxZQUFzQjtRQUUxRCxNQUFNLDBCQUEwQixHQUFHLElBQUksNEJBQTRCLEVBQUUsQ0FBQztRQUV0RSw2REFBNkQ7UUFDN0QsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFFOUIsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUU7WUFFcEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDNUUsTUFBTSxJQUFJLGtCQUFrQixDQUFDLDBFQUEwRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ3pIO1lBRUQseUNBQXlDO1lBQ3pDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFdkcsK0NBQStDO1lBQy9DLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFFRCw4REFBOEQ7UUFDOUQsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQzlELEdBQUcsQ0FDQyxZQUFZLENBQUMsRUFBRTtZQUNYLE9BQU8sSUFBSSxtQkFBbUIsQ0FDMUIsMEJBQTBCLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUM5RixDQUFDO1FBQ04sQ0FBQyxDQUNKLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx1Q0FBdUMsQ0FBQyx3QkFBdUMsRUFBRSx3QkFBdUM7UUFFNUgseURBQXlEO1FBQ3pELEtBQUssTUFBTSxRQUFRLElBQUksd0JBQXdCLEVBQUU7WUFFN0MsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXBDLHNEQUFzRDtZQUN0RCxNQUFNLGFBQWEsR0FBa0IsRUFBRSxDQUFDO1lBRXhDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBRXZELElBQUksb0JBQW9CLENBQUM7Z0JBRXpCLGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFO29CQUN6RCxvQkFBb0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztpQkFDcEU7cUJBQU07b0JBQ0gsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDbEU7Z0JBRUQsMkRBQTJEO2dCQUMzRCxLQUFLLE1BQU0sT0FBTyxJQUFJLG9CQUFvQixFQUFFO29CQUV4QywwRUFBMEU7b0JBQzFFLElBQUksT0FBTyxZQUFZLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxjQUFjLENBQUMsY0FBYyxFQUFFO3dCQUVuSCxJQUFJLE9BQU8sQ0FBQzt3QkFFWixpQkFBaUI7d0JBQ2pCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLFNBQVMsRUFBRTs0QkFDekQsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUNySjs2QkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUM3RCxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUMvSTs2QkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxTQUFTLEVBQUU7NEJBQ2hFLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt5QkFDcko7NkJBQU07NEJBQ0gsNEJBQTRCOzRCQUM1QixNQUFNLElBQUksU0FBUyxDQUFDLGdDQUFnQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQ25IO3dCQUVELHNCQUFzQjt3QkFHdEIsa0JBQWtCO3dCQUNsQixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUUvQjtpQkFFSjthQUNKO1lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxhQUFhLENBQ2pDLFdBQVcsRUFDWCxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUNyQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUNwQyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNsQyxhQUFhLENBQ2hCLENBQUM7WUFFRiwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ2pFO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxzREFBc0QsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxvQ0FBb0MsQ0FBQyxZQUFzQjtRQUMvRCxpRUFBaUU7UUFFakUsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUUzQyw4RUFBOEU7UUFDOUUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFdBQVcsQ0FBQyxFQUFFO1lBQ1YsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTVFLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQ2pFLElBQUksQ0FBQyxFQUFFO2dCQUNILCtDQUErQztnQkFDL0MsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVQLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDakQsR0FBRyxDQUNDLFFBQVEsQ0FBQyxFQUFFO1lBQ1AsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksNEJBQTRCLEVBQUUsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDL0csQ0FBQyxDQUNKLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxzREFBc0QsQ0FBQyw0QkFBMkM7UUFFdEcsbURBQW1EO1FBQ25ELEtBQUssTUFBTSxPQUFPLElBQUksNEJBQTRCLEVBQUU7WUFFaEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNqRyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1lBRUQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3pHLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDekI7WUFFRCxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbkgsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2FBQzlCO1lBRUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7Z0JBQzdHLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3RHO2lCQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzVELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxVQUFVLENBQUM7WUFDZixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUNsRCxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxRDtZQUVELDRCQUE0QjtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FDakQsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNqQyxhQUFhLEVBQ2IsVUFBVSxFQUNWLGNBQWMsRUFDZCxtQkFBbUIsQ0FDdEIsQ0FBQztTQUVMO0lBRUwsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssK0JBQStCLENBQUMsWUFBc0I7UUFFMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUV0QyxZQUFZLENBQUMsT0FBTyxDQUNoQixPQUFPLENBQUMsRUFBRTtZQUNOLDJGQUEyRjtZQUMzRixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9DLE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN0RCxNQUFNLElBQUksa0JBQWtCLENBQUMsaUVBQWlFLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDNUc7WUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUNKLENBQUM7UUFFRixPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSw0QkFBNEIsRUFBRSxFQUFFLElBQUksZUFBZSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFNUcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxxQkFBcUI7UUFFeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVDLGdEQUFnRDtZQUNoRCxPQUFPLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLElBQUksQ0FDN0MsR0FBRyxDQUNDLFFBQVEsQ0FBQyxFQUFFO2dCQUNQLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzdFLDZCQUE2QjtvQkFDN0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNKLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7WUFDcEQsQ0FBQyxDQUNKLENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCw2QkFBNkI7WUFDN0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUVMLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNLLHFCQUFxQixDQUFDLFlBQXNCO1FBRWhELHlDQUF5QztRQUN6QyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdkIsaUNBQWlDO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDL0Isd0NBQXdDO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDL0UsR0FBRyxDQUNDLENBQUMsUUFBZ0IsRUFBRSxFQUFFO2dCQUNqQiwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxxREFBcUQsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQ0osQ0FDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILHdEQUF3RDtRQUN4RCx5REFBeUQ7UUFDekQsb0VBQW9FO1FBQ3BFLDJDQUEyQztRQUMzQyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDSSxpQ0FBaUMsQ0FBQyxZQUFzQjtRQUUzRCxNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQzNDLFdBQVcsQ0FBQyxFQUFFO1lBQ1YsbURBQW1EO1lBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLENBQUM7UUFDdEYsQ0FBQyxDQUFDLENBQUM7UUFFUCx5Q0FBeUM7UUFDekMsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRWhDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUN2RCxRQUFRLENBQ0osT0FBTyxDQUFDLEVBQUU7Z0JBQ04sZ0RBQWdEO2dCQUNoRCxPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQ0osQ0FDSixDQUFDO1NBQ0w7YUFBTTtZQUVILE9BQU8sSUFBSSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdEO0lBRUwsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksMkJBQTJCLENBQUMsaUJBQTJCO1FBRTFELE1BQU0sc0JBQXNCLEdBQWEsaUJBQWlCLENBQUMsTUFBTSxDQUM3RCxXQUFXLENBQUMsRUFBRTtZQUVWLHlEQUF5RDtZQUN6RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUV6RSxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUVuQyw0RkFBNEY7WUFDNUYsTUFBTSxZQUFZLEdBQWEsc0JBQXNCLENBQUMsR0FBRyxDQUNyRCxXQUFXLENBQUMsRUFBRTtnQkFDVixPQUFPLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQ0osQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFcEMsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDaEQsUUFBUSxDQUNKLE9BQU8sQ0FBQyxFQUFFO2dCQUVOLE9BQU8sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUNKLENBQ0osQ0FBQztTQUNMO2FBQU07WUFFSCxPQUFPLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBRXZFO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHNCQUFzQixDQUFDLFlBQXNCO1FBRWhELE1BQU0saUJBQWlCLEdBQWEsWUFBWSxDQUFDLE1BQU0sQ0FDbkQsT0FBTyxDQUFDLEVBQUU7WUFFTiwyRkFBMkY7WUFDM0YsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMvQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELG1EQUFtRDtZQUNuRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUNoRSxDQUFDLENBQ0osQ0FBQztRQUVGLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUU5QixzRkFBc0Y7WUFDdEYsTUFBTSxZQUFZLEdBQWEsaUJBQWlCLENBQUMsR0FBRyxDQUNoRCxPQUFPLENBQUMsRUFBRTtnQkFDTixPQUFPLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQ0osQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFcEMsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUNDLE9BQU8sQ0FBQyxFQUFFO2dCQUNOLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sSUFBSSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7aUJBQy9GO1lBQ0wsQ0FBQyxDQUNKLENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7OztZQTlrQkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFqWlEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBhIGxhYmVsIGRlc2NyaWJpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBPY2N1cnJlbmNlIG9mIGEgcHJvcGVydHkgZm9yIGEgcmVzb3VyY2UgY2xhc3MgKGl0cyBjYXJkaW5hbGl0eSkuXG4gKi9cbmV4cG9ydCBlbnVtIENhcmRpbmFsaXR5T2NjdXJyZW5jZSB7XG4gICAgbWluQ2FyZCA9IDAsXG4gICAgY2FyZCA9IDEsXG4gICAgbWF4Q2FyZCA9IDJcbn1cblxuXG4vKipcbiAqIENhcmRpbmFsaXR5IG9mIGEgcHJvcGVydHkgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhcmRpbmFsaXR5IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q2FyZGluYWxpdHlPY2N1cnJlbmNlfSBvY2N1cnJlbmNlIHR5cGUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgbnVtZXJpY2FsIHZhbHVlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0aGUgZ2l2ZW4gb2NjdXJyZW5jZSBhcHBsaWVzIHRvLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9jY3VycmVuY2U6IENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICAgICAgICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5W119IGNhcmRpbmFsaXRpZXMgdGhlIHJlc291cmNlIGNsYXNzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGljb246IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjYXJkaW5hbGl0aWVzOiBBcnJheTxDYXJkaW5hbGl0eT4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHJlc291cmNlIGNsYXNzIElyaXMgdG8gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVzb3VyY2VDbGFzcztcbn1cblxuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdFR5cGUgdGhlIHByb3BlcnR5J3Mgb2JqZWN0IGNvbnN0cmFpbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzdWJQcm9wZXJ0eU9mIElyaXMgb2YgcHJvcGVydGllcyB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBzdWJwcm9wZXJ0eSBvZi5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRWRpdGFibGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGNhbiBiZSBlZGl0ZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGlua1Byb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIGxpbmtpbmcgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtWYWx1ZVByb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSByZWZlcnMgdG8gYSBsaW5rIHZhbHVlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNFZGl0YWJsZTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWFkb25seSBpc0xpbmtQcm9wZXJ0eTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5TWV0YWRhdGFbXX0gb250b2xvZ2llcyBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSBsaXN0IG9mIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIG5hbWVkIGdyYXBoLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbnRvbG9naWVzID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9udG9sb2d5IGluZm9ybWF0aW9uIHJlcXVlc3RlZCBmcm9tIHRoaXMgc2VydmljZS5cbiAqXG4gKiBGb3IgZXZlcnkgcmVxdWVzdCwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBjb250YWluaW5nIHRoZSByZXF1ZXN0ZWQgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNvcnRzIGFuIGFycmF5IG9mIGBSZXNvdXJjZUNsYXNzYCBvciBgUHJvcGVydHlgIGJ5IGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGEgZmlyc3QgZWxlbWVudFxuICAgICAqIEBwYXJhbSBiIHNlY29uZCBlbGVtZW50XG4gICAgICogQHJldHVybiBuZWdhdGl2ZSAtMSBpZiB0aGUgZmlyc3QgZWxlbWVudCBpcyBjb25zaWRlcmVkIGxvd2VyIHRoYW4gdGhlIHNlY29uZCwgMSBpZiB0aGUgc2Vjb25kIGVsZW1lbnQgaXMgY29uc2lkZXJlZCBiaWdnZXIsIDAgaWYgdGhleSBhcmUgZXF1YWxcbiAgICAgKi9cbiAgICBzdGF0aWMgc29ydEZ1bmMoYTogUmVzb3VyY2VDbGFzcyB8IFByb3BlcnR5LCBiOiBSZXNvdXJjZUNsYXNzIHwgUHJvcGVydHkpIHtcbiAgICAgICAgLy8gZGVhbGluZyB3aXRoICd1bmRlZmluZWQnIGxhYmVsc1xuICAgICAgICBpZiAoYS5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChiLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhYmVsQSA9IGEubGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbGFiZWxCID0gYi5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChsYWJlbEEgPCBsYWJlbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbEEgPiBsYWJlbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUgZ2l2ZW4gW1tPbnRvbG9neUluZm9ybWF0aW9uXV0gaW50byB0aGUgY3VycmVudCBpbnN0YW5jZSxcbiAgICAgKiB1cGRhdGluZyB0aGUgZXhpc3RpbmcgaW5mb3JtYXRpb24uXG4gICAgICogVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBhIHNlcnZpY2UgbGlrZSB0aGUgc2VhcmNoIGZldGNoZXMgbmV3IHJlc3VsdHNcbiAgICAgKiB0aGF0IGhhdmUgdG8gYmUgYWRkZWQgdG8gYW4gZXhpc3RpbmcgY29sbGVjdGlvbi5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgb250b2xvZ3kgaW5mb3JtYXRpb24gbXVzdCBub3QgYmUgbG9zdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIHRoZSBnaXZlbiBkZWZpbml0aW9ucyB0aGF0IGhhdmUgdG8gYmUgaW50ZWdyYXRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgdXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzRm9yT250b2xvZ3kgaW4gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV0gPSBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSByZXNvdXJjZUNsYXNzZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3MgaW4gbmV3UmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc10gPSBuZXdSZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdQcm9wZXJ0aWVzID0gb250b2xvZ3lJbmZvLmdldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdQcm9wIGluIG5ld1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1tuZXdQcm9wXSA9IG5ld1Byb3BlcnRpZXNbbmV3UHJvcF07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IC0gYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGdyb3VwZWQgYnkgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc2VzIC0gYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMoKTogUmVzb3VyY2VDbGFzc2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNvcnRBc2Mgc29ydCByZXNvdXJjZSBjbGFzc2VzIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlciBieSBkZWZhdWx0XG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc1tdXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheShzb3J0QXNjOiBib29sZWFuID0gdHJ1ZSk6IEFycmF5PFJlc291cmNlQ2xhc3M+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzSXJpIGluIHRoaXMucmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICBjb25zdCByZXNDbGFzczogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucHVzaChyZXNDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNvdXJjZUNsYXNzZXMgb3JkZXIgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIHJlc0NsYXNzZXMuc29ydChPbnRvbG9neUluZm9ybWF0aW9uLnNvcnRGdW5jKTtcblxuICAgICAgICAvLyByZXNvdXJjZUNsYXNzZXMgb3JkZXIgYnkgbGFiZWwgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBpZiAoIXNvcnRBc2MpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc0NsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNDbGFzcyByZXNvdXJjZSBjbGFzcyB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlc0NsYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChyZXNDbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NEZWYgIT09IHVuZGVmaW5lZCAmJiByZXNDbGFzc0RlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY2Fubm90IGdldCBsYWJlbCBmb3IgJHtyZXNDbGFzc31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzIHdpdGhvdXQgYXJndW1lbnQgcmVzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvcGVydGllcyAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKCk6IFByb3BlcnRpZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNvcnRBc2Mgc29ydCBwcm9wZXJ0aWVzIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlciBieSBkZWZhdWx0XG4gICAgICogQHJldHVybnMgUHJvcGVydHlbXSAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KHNvcnRBc2M6IGJvb2xlYW4gPSB0cnVlKTogQXJyYXk8UHJvcGVydHk+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eT4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcDogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm9wZXJ0aWVzIG9yZGVyIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgICBwcm9wZXJ0aWVzLnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgLy8gcHJvcGVydGllcyBvcmRlciBieSBsYWJlbCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGlmICghc29ydEFzYykge1xuICAgICAgICAgICAgcHJvcGVydGllcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWY6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHByb3BEZWYgIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNhbm5vdCBnZXQgbGFiZWwgZm9yICR7cHJvcGVydHl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUHJvcGVydHkgd2l0aG91dCBhcmd1bWVudCBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gKiBPdGhlciBjb21wb25lbnRzIG9yIHNlcnZpY2VzIG9idGFpbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRoaXMgc2VydmljZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUNhY2hlU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBPbnRvbG9naWVzIGluZ29yZWQgYnkgdGhpcyBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkT250b2xvZ2llc1xuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRPbnRvbG9naWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5LCBLbm9yYUNvbnN0YW50cy5TdGFuZG9mZk9udG9sb2d5XTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkUHJvcGVydGllcyBwcm9wZXJ0aWVzIHRoYXQgS25vcmEgaXMgbm90IHJlc3BvbnNpYmxlIGZvciBhbmQgdGhhdCBoYXZlIHRvIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZXNvbHZlZCBhdCB0aGUgbW9tZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRQcm9wZXJ0aWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub25SZXNvdXJjZUNsYXNzZXMgY2xhc3MgZGVmaW5pdGlvbnMgdGhhdCBhcmUgbm90IGJlIHRyZWF0ZWQgYXMgS25vcmEgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgbm9uUmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLkZvcmJpZGRlblJlc291cmNlLCBLbm9yYUNvbnN0YW50cy5YTUxUb1N0YW5kb2ZmTWFwcGluZywgS25vcmFDb25zdGFudHMuTGlzdE5vZGVdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUNhY2hlfSBjYWNoZU9udG9sb2d5IGNlbnRyYWwgaW5zdGFuY2UgdGhhdCBjYWNoZXMgYWxsIGRlZmluaXRpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWNoZU9udG9sb2d5OiBPbnRvbG9neUNhY2hlID0gbmV3IE9udG9sb2d5Q2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29udG9sb2d5U2VydmljZTogT250b2xvZ3lTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIG9udG9sb2dpZXMgYXMgSlNPTi1MRCAobm8gcHJlZml4ZXMsIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0T250b2xvZ2llc01ldGFkYXRhKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIChyZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzKSBmb3IgdGhlIGdpdmVuIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaSBvZiB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8b2JqZWN0PiAtIG1ldGFkYXRhIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYWxsIHRoZSBvbnRvbG9naWVzJyBtZXRhZGF0YSByZXR1cm5lZCBieSBLbm9yYSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBvbnRvbG9naWVzIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgYSBuZXcgT250b2xvZ3lNZXRhZGF0YSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUob250b2xvZ2llczogb2JqZWN0W10pIHtcblxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcyA9IG9udG9sb2dpZXMubWFwKFxuICAgICAgICAgICAgb250b2xvZ3kgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lNZXRhZGF0YShvbnRvbG9neVsnQGlkJ10sIG9udG9sb2d5W0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9udG9sb2dpZXMnIG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlIGFuZCByZXR1cm5zIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiAtIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogYGtub3JhLWFwaTpSZXNvdXJjZWAgd2lsbCBiZSBleGNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gY2xhc3NEZWZpbml0aW9ucyB0aGUgY2xhc3MgZGVmaW5pdGlvbnMgaW4gYW4gb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIGdpdmVuIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzRGVmIG9mIGNsYXNzRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzSXJpID0gY2xhc3NEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGF0IGNsYXNzIG5hbWUgaXMgbm90IGxpc3RlZCBhcyBhIG5vbiByZXNvdXJjZSBjbGFzcyBhbmQgdGhhdCB0aGUgaXNSZXNvdXJjZUNsYXNzIGZsYWcgaXMgcHJlc2VudCBhbmQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjbGFzc0lyaSAhPT0gS25vcmFDb25zdGFudHMuUmVzb3VyY2UgJiYgdGhpcy5ub25SZXNvdXJjZUNsYXNzZXMuaW5kZXhPZihjbGFzc0lyaSlcbiAgICAgICAgICAgICAgICA9PT0gLTEgJiYgKGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gIT09IHVuZGVmaW5lZCAmJiBjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIHZhbHVlIGNsYXNzLCBidXQgYSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMucHVzaChjbGFzc0lyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc0lyaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9neVxuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEtub3JhIGF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGluIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICogSWYgdGhleSBhcmUgZGVmaW5lZCBpbiBhbm90aGVyIG9udG9sb2d5LCB0aGF0IG9udG9sb2d5IGlzIHJlcXVlc3RlZCBmcm9tIEtub3JhIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbnRvbG9neSB0aGUgb250b2xvZ3kgdG8gYmUgY2FjaGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5OiBvYmplY3QpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncmFwaCA9IG9udG9sb2d5WydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBnZXQgYWxsIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IGNsYXNzRGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bENsYXNzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xPYmplY3RQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xEYXRhdHlwZVByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bEFubm90YXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5SZGZQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gY2FjaGUgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50IG9udG9sb2d5XG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5WydAaWQnXV0gPSB0aGlzLmdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZzKTtcblxuICAgICAgICAvLyB3cml0ZSBjbGFzcyBhbmQgcHJvcGVydHkgZGVmaW50aW9ucyB0byBjYWNoZVxuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShjbGFzc0RlZnMsIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgdGhlIG9udG9sb2dpZXMgZm9yIHdoaWNoIGRlZmluaXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhbGwgcmVxdWVzdGVkIG5hbWVkIGdyYXBoc1xuICAgICAgICBsZXQgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9udG9sb2d5SXJpIG9mIG9udG9sb2d5SXJpcykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9naWVzRnJvbUNhY2hlOiBvbnRvbG9neSBub3QgZm91bmQgaW4gY2FjaGU6ICR7b250b2xvZ3lJcml9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIG9udG9sb2d5XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV07XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBvZiB0aGlzIG9udG9sb2d5XG4gICAgICAgICAgICBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IGFsbFJlc291cmNlQ2xhc3NJcmlzLmNvbmNhdCh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBhbGwgcmVxdWVzdGVkIG9udG9sb2dpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKGFsbFJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5LCByZXNDbGFzc0RlZnMuZ2V0UmVzb3VyY2VDbGFzc2VzKCksIHJlc0NsYXNzRGVmcy5nZXRQcm9wZXJ0aWVzKClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIG9udG9sb2d5IHJlc3BvbnNlIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyB0aGUgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcHJvcGVydHlDbGFzc0RlZmluaXRpb25zIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUocmVzb3VyY2VDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+LCBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzcyBvZiByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmkgPSByZXNDbGFzc1snQGlkJ107XG5cbiAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgYWxsIGNhcmRpbmFsaXRpZXMgb2YgdGhpcyByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdGllczogQ2FyZGluYWxpdHlbXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBzdWJjbGFzc09mQ29sbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgc2luZ2xlIG9iamVjdCBvciBhIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdKSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IFtyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCBjYXJkaW5hbGl0aWVzIGZvciB0aGUgcHJvcGVydGllcyBvZiBhIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjdXJDYXJkIG9mIHN1YmNsYXNzT2ZDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0IGlzIGEgY2FyZGluYWxpdHkgKGl0IGNvdWxkIGFsc28gYmUgYW4gSXJpIG9mIGEgc3VwZXJjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmQgaW5zdGFuY2VvZiBPYmplY3QgJiYgY3VyQ2FyZFsnQHR5cGUnXSAhPT0gdW5kZWZpbmVkICYmIGN1ckNhcmRbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLk93bFJlc3RyaWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDYXJkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb2NjdXJyZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5taW5DYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UuY2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1heENhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIGtub3duIG9jY3VycmVuY2UgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBjYXJkaW5hbGl0eSB0eXBlIGludmFsaWQgZm9yICR7cmVzQ2xhc3NbJ0BpZCddfSAke2N1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBndWkgb3JkZXJcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXMucHVzaChuZXdDYXJkKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzT2JqID0gbmV3IFJlc291cmNlQ2xhc3MoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmksXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmVzb3VyY2VJY29uXSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyB3cml0ZSB0aGlzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24gdG8gdGhlIGNhY2hlIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPSByZXNDbGFzc09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3NlcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKiBUaGUgYW5zd2VyIGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBieSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc0NsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbiBbW09udG9sb2d5Q2FjaGVdXSByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc0NsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgZGVmaW5pdGlvbnMgZm9yIGVhY2ggcmVzb3VyY2UgY2xhc3MgZnJvbSB0aGUgY2FjaGVcblxuICAgICAgICBjb25zdCByZXNDbGFzc0RlZnMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIGNvbnN0IHByb3BlcnR5SXJpcyA9IFtdO1xuXG4gICAgICAgIHJlc0NsYXNzSXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmc1tyZXNDbGFzc0lyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldLmNhcmRpbmFsaXRpZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgcHJvcGVydHkgZGVmaW5pdGlvbiBmb3IgZWFjaCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlJcmlzLnB1c2goY2FyZC5wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcHJvcERlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgcmVzQ2xhc3NEZWZzLCBwcm9wRGVmcy5nZXRQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXNcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmE6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCBwcm9wRGVmIG9mIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcElyaSA9IHByb3BEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICBsZXQgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN1YlByb3BlcnR5T2YgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdKSkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdLm1hcCgoc3VwZXJQcm9wOiBPYmplY3QpID0+IHN1cGVyUHJvcFsnQGlkJ10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLnB1c2gocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXVsnQGlkJ10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXVsnQGlkJ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID0gbmV3IFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZixcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlLFxuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT250b2xvZ3lJbmZvcm1hdGlvbiAtIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbnRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gbmV3IFByb3BlcnRpZXMoKTtcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlOiBwcm9wZXJ0eSBub3QgZm91bmQgaW4gY2FjaGU6ICR7cHJvcElyaX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eURlZnNbcHJvcElyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgbmV3IFJlc291cmNlQ2xhc3NlcygpLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IC0gbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnlbXT5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgICAgIC8vIGFycmF5IHRvIGJlIHBvcHVsYXRlZCB3aXRoIE9ic2VydmFibGVzXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gW107XG5cbiAgICAgICAgLy8gZG8gYSByZXF1ZXN0IGZvciBlYWNoIG9udG9sb2d5XG4gICAgICAgIG9udG9sb2d5SXJpcy5mb3JFYWNoKG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgIC8vIHB1c2ggYW4gT2JzZXJ2YWJsZSBvbnRvIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgICAgIG9ic2VydmFibGVzLnB1c2godGhpcy5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKG9udG9sb2d5OiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHJlc3BvbnNlIHRvIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JrSm9pbiByZXR1cm5zIGFuIE9ic2VydmFibGUgb2YgYW4gYXJyYXkgb2YgcmVzdWx0c1xuICAgICAgICAvLyByZXR1cm5lZCBieSBlYWNoIE9ic2VydmFibGUgY29udGFpbmVkIGluIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgLy8gYSBzdWJzY3JpcHRpb24gdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgZm9ya0pvaW4gaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gb25jZSBhbGwgT2JzZXJ2YWJsZXMgaGF2ZSBiZWVuIGNvbXBsZXRlZFxuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbGwgb250b2xvZ3kgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBvbnRvbG9neUlyaXNUb1F1ZXJ5ID0gb250b2xvZ3lJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9udG9sb2d5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgb250b2xvZ2llcyB0aGF0IGFyZSBtb3QgY2FjaGVkIHlldFxuICAgICAgICBpZiAob250b2xvZ3lJcmlzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXNUb1F1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGVkIG9uY2UgYWxsIG9udG9sb2dpZXMgaGF2ZSBiZWVuIGNhY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBQcm9wZXJ0aWVzIGNvbnRhaW5lZCBpbiB0aGUgY2FyZGluYWxpdGllcyB3aWxsIGJlIHJldHVybmVkIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3NlcyAoaW5jbHVkaW5nIHByb3BlcnRpZXMpLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmlzVG9RdWVyeUZvcjogc3RyaW5nW10gPSByZXNvdXJjZUNsYXNzSXJpcy5maWx0ZXIoXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPT09IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShyZXNDbGFzc0lyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWQgLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzVG9RdWVyeTogc3RyaW5nW10gPSBwcm9wZXJ0eUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzVG9RdWVyeS5tYXAoXG4gICAgICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocHJvcElyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIHdpdGg6IHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19