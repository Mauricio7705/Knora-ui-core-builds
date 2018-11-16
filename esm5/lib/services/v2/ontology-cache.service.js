import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { KnoraConstants, Utils } from '../../declarations';
import { OntologyService } from './ontology.service';
import { forkJoin, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ontology.service";
var jsonld = require('jsonld');
/**
 * Represents an error occurred in OntologyCacheService.
 */
var OntologyCacheError = /** @class */ (function (_super) {
    tslib_1.__extends(OntologyCacheError, _super);
    function OntologyCacheError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return OntologyCacheError;
}(Error));
/**
 * Represents an ontology's metadata.
 */
var OntologyMetadata = /** @class */ (function () {
    /**
     *
     * @param id Iri identifying the ontology.
     * @param label a label describing the ontology.
     */
    function OntologyMetadata(id, label) {
        this.id = id;
        this.label = label;
    }
    return OntologyMetadata;
}());
export { OntologyMetadata };
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
var Cardinality = /** @class */ (function () {
    /**
     *
     * @param occurrence type of given occurrence.
     * @param value numerical value of given occurrence.
     * @param property the property the given occurrence applies to.
     */
    function Cardinality(occurrence, value, property) {
        this.occurrence = occurrence;
        this.value = value;
        this.property = property;
    }
    return Cardinality;
}());
export { Cardinality };
/**
 * A resource class definition.
 */
var ResourceClass = /** @class */ (function () {
    /**
     *
     * @param id Iri identifying the resource class.
     * @param icon path to an icon representing the resource class.
     * @param comment comment on the resource class.
     * @param label label describing the resource class.
     * @param cardinalities the resource class's properties.
     */
    function ResourceClass(id, icon, comment, label, cardinalities) {
        this.id = id;
        this.icon = icon;
        this.comment = comment;
        this.label = label;
        this.cardinalities = cardinalities;
    }
    return ResourceClass;
}());
export { ResourceClass };
/**
 * A map of resource class Iris to resource class definitions.
 */
var ResourceClasses = /** @class */ (function () {
    function ResourceClasses() {
    }
    return ResourceClasses;
}());
export { ResourceClasses };
/**
 * A property definition.
 */
var Property = /** @class */ (function () {
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
    function Property(id, objectType, comment, label, subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty) {
        this.id = id;
        this.objectType = objectType;
        this.comment = comment;
        this.label = label;
        this.subPropertyOf = subPropertyOf;
        this.isEditable = isEditable;
        this.isLinkProperty = isLinkProperty;
        this.isLinkValueProperty = isLinkValueProperty;
    }
    return Property;
}());
export { Property };
/**
 * A map of property Iris to property definitions.
 */
var Properties = /** @class */ (function () {
    function Properties() {
    }
    return Properties;
}());
export { Properties };
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
var ResourceClassIrisForOntology = /** @class */ (function () {
    function ResourceClassIrisForOntology() {
    }
    return ResourceClassIrisForOntology;
}());
export { ResourceClassIrisForOntology };
/**
 * Represents cached ontology information (only used by this service internally).
 * This cache is updated whenever new definitions are requested from Knora.
 *
 * Requested ontology information by a service is represented by [[OntologyInformation]].
 */
var OntologyCache = /** @class */ (function () {
    function OntologyCache() {
        this.ontologies = [];
        this.resourceClassIrisForOntology = new ResourceClassIrisForOntology();
        this.resourceClasses = new ResourceClasses();
        this.properties = new Properties();
    }
    return OntologyCache;
}());
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
var OntologyInformation = /** @class */ (function () {
    /**
     *
     * @param resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    function OntologyInformation(resourceClassesForOntology, resourceClasses, properties) {
        this.resourceClassesForOntology = resourceClassesForOntology;
        this.resourceClasses = resourceClasses;
        this.properties = properties;
    }
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
    OntologyInformation.prototype.updateOntologyInformation = function (ontologyInfo) {
        // get new resourceClassIrisForOntology
        var newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();
        // update new resourceClassIrisForOntology
        // tslint:disable-next-line:forin
        for (var newResClassForOntology in newResourceClassesForOntology) {
            this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology];
        }
        // get new resource class definitions
        var newResourceClasses = ontologyInfo.getResourceClasses();
        // update resourceClasses
        // tslint:disable-next-line:forin
        for (var newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }
        // get new property definitions
        var newProperties = ontologyInfo.getProperties();
        // update properties
        // tslint:disable-next-line:forin
        for (var newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }
    };
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns all resource class definitions grouped by ontologies.
     */
    OntologyInformation.prototype.getResourceClassForOntology = function () {
        return this.resourceClassesForOntology;
    };
    /**
     * Returns all resource classes as an object.
     *
     * @returns all resource class definitions as an object.
     */
    OntologyInformation.prototype.getResourceClasses = function () {
        return this.resourceClasses;
    };
    /**
     * Returns all resource classes as an array.
     *
     * @returns {Array<ResourceClass>}
     */
    OntologyInformation.prototype.getResourceClassesAsArray = function () {
        var resClasses = [];
        // tslint:disable-next-line:forin
        for (var resClassIri in this.resourceClasses) {
            var resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        return resClasses;
    };
    /**
     * Returns a resource class's label.
     *
     * @param resClass resource class to query for.
     * @returns the resource class's label.
     */
    OntologyInformation.prototype.getLabelForResourceClass = function (resClass) {
        if (resClass !== undefined) {
            var resClassDef = this.resourceClasses[resClass];
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
    };
    /**
     * Returns all properties as an object.
     *
     * @returns all properties as an object.
     */
    OntologyInformation.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     * Returns all properties as an array.
     *
     * @returns all properties as an array.
     */
    OntologyInformation.prototype.getPropertiesAsArray = function () {
        var properties = [];
        // tslint:disable-next-line:forin
        for (var propIri in this.properties) {
            var prop = this.properties[propIri];
            properties.push(prop);
        }
        return properties;
    };
    /**
     * Returns a property's label.
     *
     * @param property to query for.
     * @returns the property's label.
     */
    OntologyInformation.prototype.getLabelForProperty = function (property) {
        if (property !== undefined) {
            var propDef = this.properties[property];
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
    };
    return OntologyInformation;
}());
export { OntologyInformation };
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
var OntologyCacheService = /** @class */ (function () {
    function OntologyCacheService(_ontologyService) {
        this._ontologyService = _ontologyService;
        // ontologies ingored by this service
        this.excludedOntologies = [KnoraConstants.SalsahGuiOntology, KnoraConstants.StandoffOntology];
        // properties that Knora is not responsible for and
        // that have to be ignored because they cannot be resolved at the moment
        this.excludedProperties = [KnoraConstants.RdfsLabel];
        // class definitions that are not be treated as Knora resource classes
        this.nonResourceClasses = [KnoraConstants.ForbiddenResource, KnoraConstants.XMLToStandoffMapping, KnoraConstants.ListNode];
        // central instance that caches all definitions
        this.cacheOntology = new OntologyCache();
    }
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    OntologyCacheService.prototype.getOntologiesMetadataFromKnora = function () {
        return this._ontologyService.getOntologiesMetadata().pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param ontologyIri the Iri of the requested ontology.
     */
    OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
        return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {string[]} ontologies metadata of all existing ontologies as JSON-LD.
     */
    OntologyCacheService.prototype.convertAndWriteOntologiesMetadataToCache = function (ontologies) {
        this.cacheOntology.ontologies = ontologies.map(function (ontology) {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    };
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns metadata of all existing ontologies.
     */
    OntologyCacheService.prototype.getAllOntologiesMetadataFromCache = function () {
        return this.cacheOntology.ontologies;
    };
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param classDefinitions the class definitions in an ontology response.
     * @returns resource class Iris from the given class definitions.
     */
    OntologyCacheService.prototype.getResourceClassIrisFromOntologyResponse = function (classDefinitions) {
        var resourceClassIris = [];
        try {
            for (var classDefinitions_1 = tslib_1.__values(classDefinitions), classDefinitions_1_1 = classDefinitions_1.next(); !classDefinitions_1_1.done; classDefinitions_1_1 = classDefinitions_1.next()) {
                var classDef = classDefinitions_1_1.value;
                var classIri = classDef['@id'];
                // check that class name is not listed as a non resource class and that the isResourceClass flag is present and set to true
                if (classIri !== KnoraConstants.Resource && this.nonResourceClasses.indexOf(classIri)
                    === -1 && (classDef[KnoraConstants.IsResourceClass] !== undefined && classDef[KnoraConstants.IsResourceClass] === true)) {
                    // it is not a value class, but a resource class definition
                    resourceClassIris.push(classIri);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (classDefinitions_1_1 && !classDefinitions_1_1.done && (_a = classDefinitions_1.return)) _a.call(classDefinitions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return resourceClassIris;
        var e_1, _a;
    };
    /**
     * Converts a Knora response for all entity definitions for the requested ontology
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
     * If they are defined in another ontology, that ontology is requested from Knora too.
     *
     * @param {Object} ontology the ontology to be cached.
     */
    OntologyCacheService.prototype.convertAndWriteAllEntityDefinitionsForOntologyToCache = function (ontology) {
        var graph = ontology['@graph'];
        // get all class definitions
        var classDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlClass;
        });
        // get all property definitions
        var propertyDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlObjectProperty ||
                entityType === KnoraConstants.OwlDatatypeProperty ||
                entityType === KnoraConstants.OwlAnnotationProperty ||
                entityType === KnoraConstants.RdfProperty;
        });
        // cache all resource class Iris belonging to the current ontology
        this.cacheOntology.resourceClassIrisForOntology[ontology['@id']] = this.getResourceClassIrisFromOntologyResponse(classDefs);
        // write class and property defintions to cache
        this.convertAndWriteEntityDefinitionsToCache(classDefs, propertyDefs);
    };
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param ontologyIris the ontologies for which definitions should be returned.
     * @returns the definitions for the requested ontologies.
     */
    OntologyCacheService.prototype.getOntologyInformationFromCache = function (ontologyIris) {
        var resourceClassesForOntology = new ResourceClassIrisForOntology();
        // collect resource class Iris for all requested named graphs
        var allResourceClassIris = [];
        try {
            for (var ontologyIris_1 = tslib_1.__values(ontologyIris), ontologyIris_1_1 = ontologyIris_1.next(); !ontologyIris_1_1.done; ontologyIris_1_1 = ontologyIris_1.next()) {
                var ontologyIri = ontologyIris_1_1.value;
                if (this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined) {
                    throw new OntologyCacheError("getResourceClassesForOntologiesFromCache: ontology not found in cache: " + ontologyIri);
                }
                // add information for the given ontology
                resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassIrisForOntology[ontologyIri];
                // add all resource class Iris of this ontology
                allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassIrisForOntology[ontologyIri]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ontologyIris_1_1 && !ontologyIris_1_1.done && (_a = ontologyIris_1.return)) _a.call(ontologyIris_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // get resource class definitions for all requested ontologies
        return this.getResourceClassDefinitions(allResourceClassIris).pipe(map(function (resClassDefs) {
            return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties());
        }));
        var e_2, _a;
    };
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param resourceClassDefinitions the resource class definitions returned by Knora.
     * @param propertyClassDefinitions the property definitions returned by Knora.
     */
    OntologyCacheService.prototype.convertAndWriteEntityDefinitionsToCache = function (resourceClassDefinitions, propertyClassDefinitions) {
        try {
            // convert and cache each given resource class definition
            for (var resourceClassDefinitions_1 = tslib_1.__values(resourceClassDefinitions), resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next(); !resourceClassDefinitions_1_1.done; resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next()) {
                var resClass = resourceClassDefinitions_1_1.value;
                var resClassIri = resClass['@id'];
                // represents all cardinalities of this resource class
                var cardinalities = [];
                if (resClass[KnoraConstants.RdfsSubclassOf] !== undefined) {
                    var subclassOfCollection = void 0;
                    // check if it is a single object or a collection
                    if (!Array.isArray(resClass[KnoraConstants.RdfsSubclassOf])) {
                        subclassOfCollection = [resClass[KnoraConstants.RdfsSubclassOf]];
                    }
                    else {
                        subclassOfCollection = resClass[KnoraConstants.RdfsSubclassOf];
                    }
                    try {
                        // get cardinalities for the properties of a resource class
                        for (var subclassOfCollection_1 = tslib_1.__values(subclassOfCollection), subclassOfCollection_1_1 = subclassOfCollection_1.next(); !subclassOfCollection_1_1.done; subclassOfCollection_1_1 = subclassOfCollection_1.next()) {
                            var curCard = subclassOfCollection_1_1.value;
                            // make sure it is a cardinality (it could also be an Iri of a superclass)
                            if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] === KnoraConstants.OwlRestriction) {
                                var newCard = void 0;
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
                                    throw new TypeError("cardinality type invalid for " + resClass['@id'] + " " + curCard[KnoraConstants.OwlOnProperty]);
                                }
                                // TODO: get gui order
                                // add cardinality
                                cardinalities.push(newCard);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_a = subclassOfCollection_1.return)) _a.call(subclassOfCollection_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                // write this resource class definition to the cache object
                this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_b = resourceClassDefinitions_1.return)) _b.call(resourceClassDefinitions_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // cache the property definitions
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
        var e_4, _b, e_3, _a;
    };
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param resClassIris the given resource class Iris
     * @returns {ResourceClasses} an [[OntologyCache]] representing the requested resource classes.
     */
    OntologyCacheService.prototype.getResourceClassDefinitionsFromCache = function (resClassIris) {
        // collect the definitions for each resource class from the cache
        var _this = this;
        var resClassDefs = new ResourceClasses();
        // collect the properties from the cardinalities of the given resource classes
        var propertyIris = [];
        resClassIris.forEach(function (resClassIri) {
            resClassDefs[resClassIri] = _this.cacheOntology.resourceClasses[resClassIri];
            _this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(function (card) {
                // get property definition for each cardinality
                propertyIris.push(card.property);
            });
        });
        return this.getPropertyDefinitions(propertyIris).pipe(map(function (propDefs) {
            return new OntologyInformation(new ResourceClassIrisForOntology(), resClassDefs, propDefs.getProperties());
        }));
    };
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param propertyDefinitionsFromKnora the property definitions returned by Knora
     */
    OntologyCacheService.prototype.convertAndWriteKnoraPropertyDefinitionsToOntologyCache = function (propertyDefinitionsFromKnora) {
        try {
            // convert and cache each given property definition
            for (var propertyDefinitionsFromKnora_1 = tslib_1.__values(propertyDefinitionsFromKnora), propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next(); !propertyDefinitionsFromKnora_1_1.done; propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next()) {
                var propDef = propertyDefinitionsFromKnora_1_1.value;
                var propIri = propDef['@id'];
                var isEditable = false;
                if (propDef[KnoraConstants.isEditable] !== undefined && propDef[KnoraConstants.isEditable] === true) {
                    isEditable = true;
                }
                var isLinkProperty = false;
                if (propDef[KnoraConstants.isLinkProperty] !== undefined && propDef[KnoraConstants.isLinkProperty] === true) {
                    isLinkProperty = true;
                }
                var isLinkValueProperty = false;
                if (propDef[KnoraConstants.isLinkValueProperty] !== undefined && propDef[KnoraConstants.isLinkValueProperty] === true) {
                    isLinkValueProperty = true;
                }
                var subPropertyOf = [];
                if (propDef[KnoraConstants.subPropertyOf] !== undefined && Array.isArray(propDef[KnoraConstants.subPropertyOf])) {
                    subPropertyOf = propDef[KnoraConstants.subPropertyOf].map(function (superProp) { return superProp['@id']; });
                }
                else if (propDef[KnoraConstants.subPropertyOf] !== undefined) {
                    subPropertyOf.push(propDef[KnoraConstants.subPropertyOf]['@id']);
                }
                var objectType = void 0;
                if (propDef[KnoraConstants.ObjectType] !== undefined) {
                    objectType = propDef[KnoraConstants.ObjectType]['@id'];
                }
                // cache property definition
                this.cacheOntology.properties[propIri] = new Property(propIri, objectType, propDef[KnoraConstants.RdfsComment], propDef[KnoraConstants.RdfsLabel], subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (propertyDefinitionsFromKnora_1_1 && !propertyDefinitionsFromKnora_1_1.done && (_a = propertyDefinitionsFromKnora_1.return)) _a.call(propertyDefinitionsFromKnora_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_5, _a;
    };
    /**
     * Returns property definitions from the cache.
     *
     * @param propertyIris the property definitions to be returned.
     * @returns requested property defintions.
     */
    OntologyCacheService.prototype.getPropertyDefinitionsFromCache = function (propertyIris) {
        var _this = this;
        var propertyDefs = new Properties();
        propertyIris.forEach(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return;
            }
            if (_this.cacheOntology.properties[propIri] === undefined) {
                throw new OntologyCacheError("getPropertyDefinitionsFromCache: property not found in cache: " + propIri);
            }
            propertyDefs[propIri] = _this.cacheOntology.properties[propIri];
        });
        return new OntologyInformation(new ResourceClassIrisForOntology(), new ResourceClasses(), propertyDefs);
    };
    /**
     * Returns metadata about all ontologies.
     *
     * @returns metadata about all ontologies.
     */
    OntologyCacheService.prototype.getOntologiesMetadata = function () {
        var _this = this;
        if (this.cacheOntology.ontologies.length === 0) {
            // nothing in cache yet, get metadata from Knora
            return this.getOntologiesMetadataFromKnora().pipe(map(function (metadata) {
                _this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter(function (onto) {
                    // ignore excluded ontologies
                    return _this.excludedOntologies.indexOf(onto['@id']) === -1;
                }));
                return _this.getAllOntologiesMetadataFromCache();
            }));
        }
        else {
            // return metadata from cache
            return of(this.getAllOntologiesMetadataFromCache());
        }
    };
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param ontologyIris Iris of the ontologies to be requested.
     */
    OntologyCacheService.prototype.getAndCacheOntologies = function (ontologyIris) {
        var _this = this;
        // array to be populated with Observables
        var observables = [];
        // do a request for each ontology
        ontologyIris.forEach(function (ontologyIri) {
            // push an Observable onto `observables`
            observables.push(_this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(map(function (ontology) {
                // write response to cache
                _this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
            })));
        });
        // forkJoin returns an Observable of an array of results
        // returned by each Observable contained in `observables`
        // a subscription to the Observable returned by forkJoin is executed
        // once all Observables have been completed
        return forkJoin(observables);
    };
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param ontologyIris Iris of the ontologies to be queried.
     */
    OntologyCacheService.prototype.getEntityDefinitionsForOntologies = function (ontologyIris) {
        var _this = this;
        var ontologyIrisToQuery = ontologyIris.filter(function (ontologyIri) {
            // return the ontology Iris that are not cached yet
            return _this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined;
        });
        // get ontologies that are mot cached yet
        if (ontologyIrisToQuery.length > 0) {
            return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(mergeMap(function (results) {
                // executed once all ontologies have been cached
                return _this.getOntologyInformationFromCache(ontologyIris);
            }));
        }
        else {
            return this.getOntologyInformationFromCache(ontologyIris);
        }
    };
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns the requested resource classes (including properties).
     */
    OntologyCacheService.prototype.getResourceClassDefinitions = function (resourceClassIris) {
        var _this = this;
        var resClassIrisToQueryFor = resourceClassIris.filter(function (resClassIri) {
            // return the resource class Iris that are not cached yet
            return _this.cacheOntology.resourceClasses[resClassIri] === undefined;
        });
        if (resClassIrisToQueryFor.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing resource classes
            var ontologyIris = resClassIrisToQueryFor.map(function (resClassIri) {
                return Utils.getOntologyIriFromEntityIri(resClassIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(mergeMap(function (results) {
                return _this.getResourceClassDefinitionsFromCache(resourceClassIris);
            }));
        }
        else {
            return this.getResourceClassDefinitionsFromCache(resourceClassIris);
        }
    };
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns the requested property definitions.
     */
    OntologyCacheService.prototype.getPropertyDefinitions = function (propertyIris) {
        var _this = this;
        var propertiesToQuery = propertyIris.filter(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return false;
            }
            // return the property Iris that are not cached yet
            return _this.cacheOntology.properties[propIri] === undefined;
        });
        if (propertiesToQuery.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing properties
            var ontologyIris = propertiesToQuery.map(function (propIri) {
                return Utils.getOntologyIriFromEntityIri(propIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(map(function (results) {
                if (results) {
                    return _this.getPropertyDefinitionsFromCache(propertyIris);
                }
                else {
                    throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                }
            }));
        }
        else {
            return of(this.getPropertyDefinitionsFromCache(propertyIris));
        }
    };
    OntologyCacheService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    OntologyCacheService.ctorParameters = function () { return [
        { type: OntologyService }
    ]; };
    OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(i1.OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
}());
export { OntologyCacheService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3ktY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFvQixjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFHL0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUVoQzs7R0FFRztBQUNIO0lBQWlDLDhDQUFLO0lBRWxDLDRCQUFxQixPQUFlO1FBQXBDLFlBQ0ksa0JBQU0sT0FBTyxDQUFDLFNBQ2pCO1FBRm9CLGFBQU8sR0FBUCxPQUFPLENBQVE7O0lBRXBDLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFMRCxDQUFpQyxLQUFLLEdBS3JDO0FBR0Q7O0dBRUc7QUFDSDtJQUVJOzs7O09BSUc7SUFDSCwwQkFBcUIsRUFBVSxFQUNsQixLQUFhO1FBREwsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBRTFCLENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFaRCxJQVlDOztBQUdEOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUM3Qix1RUFBVyxDQUFBO0lBQ1gsaUVBQVEsQ0FBQTtJQUNSLHVFQUFXLENBQUE7QUFDZixDQUFDLEVBSlcscUJBQXFCLEtBQXJCLHFCQUFxQixRQUloQztBQUdEOztHQUVHO0FBQ0g7SUFFSTs7Ozs7T0FLRztJQUNILHFCQUFxQixVQUFpQyxFQUN6QyxLQUFhLEVBQ2IsUUFBZ0I7UUFGUixlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUN6QyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUM3QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7QUFHRDs7R0FFRztBQUNIO0lBRUk7Ozs7Ozs7T0FPRztJQUNILHVCQUFxQixFQUFVLEVBQ2xCLElBQVksRUFDWixPQUFlLEVBQ2YsS0FBYSxFQUNiLGFBQWlDO1FBSnpCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2Isa0JBQWEsR0FBYixhQUFhLENBQW9CO0lBRTlDLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7O0FBR0Q7O0dBRUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBR0Q7O0dBRUc7QUFDSDtJQUVJOzs7Ozs7Ozs7O09BVUc7SUFDSCxrQkFBcUIsRUFBVSxFQUNsQixVQUFrQixFQUNsQixPQUFlLEVBQ2YsS0FBYSxFQUNiLGFBQTRCLEVBQzVCLFVBQW1CLEVBQ25CLGNBQXVCLEVBQ3ZCLG1CQUE0QjtRQVBwQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBQ3ZCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUztJQUV6QyxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7O0FBR0Q7O0dBRUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBR0Q7Ozs7R0FJRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsbUNBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFHRDs7Ozs7R0FLRztBQUNIO0lBc0JJO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksNEJBQTRCLEVBQUUsQ0FBQztRQUV2RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFFN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUFFRDs7OztHQUlHO0FBQ0g7SUFFSTs7Ozs7T0FLRztJQUNILDZCQUNZLDBCQUF3RCxFQUN4RCxlQUFnQyxFQUNoQyxVQUFzQjtRQUZ0QiwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQThCO1FBQ3hELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCx1REFBeUIsR0FBekIsVUFBMEIsWUFBaUM7UUFFdkQsdUNBQXVDO1FBQ3ZDLElBQU0sNkJBQTZCLEdBQWlDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBRS9HLDBDQUEwQztRQUMxQyxpQ0FBaUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxzQkFBc0IsSUFBSSw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsNkJBQTZCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwSCxDQUFDO1FBRUQscUNBQXFDO1FBQ3JDLElBQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFN0QseUJBQXlCO1FBQ3pCLGlDQUFpQztRQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFNLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRUQsK0JBQStCO1FBQy9CLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuRCxvQkFBb0I7UUFDcEIsaUNBQWlDO1FBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQU0sT0FBTyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUVMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseURBQTJCLEdBQTNCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdEQUFrQixHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdURBQXlCLEdBQXpCO1FBRUksSUFBTSxVQUFVLEdBQXlCLEVBQUUsQ0FBQztRQUU1QyxpQ0FBaUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBTSxRQUFRLEdBQWtCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEUsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUV0QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxzREFBd0IsR0FBeEIsVUFBeUIsUUFBZ0I7UUFFckMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdGQUFnRixDQUFDLENBQUM7UUFDbEcsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsMkNBQWEsR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsa0RBQW9CLEdBQXBCO1FBRUksSUFBTSxVQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUV2QyxpQ0FBaUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBTSxJQUFJLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBRXRCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlEQUFtQixHQUFuQixVQUFvQixRQUFnQjtRQUVoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV6QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQztRQUM3RixDQUFDO0lBQ0wsQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxBQXBLRCxJQW9LQzs7QUFHRDs7O0dBR0c7QUFDSDtJQWtCSSw4QkFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFickQscUNBQXFDO1FBQzdCLHVCQUFrQixHQUFrQixDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoSCxtREFBbUQ7UUFDbkQsd0VBQXdFO1FBQ2hFLHVCQUFrQixHQUFrQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV2RSxzRUFBc0U7UUFDOUQsdUJBQWtCLEdBQWtCLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0ksK0NBQStDO1FBQ3ZDLGtCQUFhLEdBQWtCLElBQUksYUFBYSxFQUFFLENBQUM7SUFHM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw2REFBOEIsR0FBdEM7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUNyRCxRQUFRO1FBQ0osNkZBQTZGO1FBQzdGLDJEQUEyRDtRQUMzRCw0RkFBNEY7UUFDNUYsVUFBQyxNQUF3QjtZQUNyQixJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BDLDJEQUEyRDtZQUMzRCxJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFeEQsOENBQThDO1lBQzlDLCtEQUErRDtZQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDBFQUEyQyxHQUFuRCxVQUFvRCxXQUFtQjtRQUVuRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9DQUFvQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDL0UsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RiwyREFBMkQ7UUFDM0QsNEZBQTRGO1FBQzVGLFVBQUMsTUFBd0I7WUFDckIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQywyREFBMkQ7WUFDM0QsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELDhDQUE4QztZQUM5QywrREFBK0Q7WUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSyx1RUFBd0MsR0FBaEQsVUFBaUQsVUFBb0I7UUFFakUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FDMUMsVUFBQSxRQUFRO1lBQ0osTUFBTSxDQUFDLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZ0VBQWlDLEdBQXpDO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBRXpDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx1RUFBd0MsR0FBaEQsVUFBaUQsZ0JBQStCO1FBQzVFLElBQU0saUJBQWlCLEdBQWEsRUFBRSxDQUFDOztZQUV2QyxHQUFHLENBQUMsQ0FBbUIsSUFBQSxxQkFBQSxpQkFBQSxnQkFBZ0IsQ0FBQSxrREFBQTtnQkFBbEMsSUFBTSxRQUFRLDZCQUFBO2dCQUNmLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakMsMkhBQTJIO2dCQUMzSCxFQUFFLENBQUMsQ0FDQyxRQUFRLEtBQUssY0FBYyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDN0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUgsMkRBQTJEO29CQUMzRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7YUFDSjs7Ozs7Ozs7O1FBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDOztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSyxvRkFBcUQsR0FBN0QsVUFBOEQsUUFBZ0I7UUFFMUUsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpDLDRCQUE0QjtRQUM1QixJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUMxQixVQUFDLE1BQWM7WUFDWCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLFVBQVUsS0FBSyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRVAsK0JBQStCO1FBQy9CLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQzdCLFVBQUMsTUFBYztZQUNYLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7Z0JBQ2xELFVBQVUsS0FBSyxjQUFjLENBQUMsbUJBQW1CO2dCQUNqRCxVQUFVLEtBQUssY0FBYyxDQUFDLHFCQUFxQjtnQkFDbkQsVUFBVSxLQUFLLGNBQWMsQ0FBQyxXQUFXLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFHUCxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsd0NBQXdDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUgsK0NBQStDO1FBQy9DLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFMUUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOERBQStCLEdBQXZDLFVBQXdDLFlBQXNCO1FBRTFELElBQU0sMEJBQTBCLEdBQUcsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1FBRXRFLDZEQUE2RDtRQUM3RCxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQzs7WUFFOUIsR0FBRyxDQUFDLENBQXNCLElBQUEsaUJBQUEsaUJBQUEsWUFBWSxDQUFBLDBDQUFBO2dCQUFqQyxJQUFNLFdBQVcseUJBQUE7Z0JBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDN0UsTUFBTSxJQUFJLGtCQUFrQixDQUFDLDRFQUEwRSxXQUFhLENBQUMsQ0FBQztnQkFDMUgsQ0FBQztnQkFFRCx5Q0FBeUM7Z0JBQ3pDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRXZHLCtDQUErQztnQkFDL0Msb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUNwSDs7Ozs7Ozs7O1FBRUQsOERBQThEO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQzlELEdBQUcsQ0FDQyxVQUFBLFlBQVk7WUFDUixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FDMUIsMEJBQTBCLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUM5RixDQUFDO1FBQ04sQ0FBQyxDQUNKLENBQ0osQ0FBQzs7SUFFTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxzRUFBdUMsR0FBL0MsVUFBZ0Qsd0JBQXVDLEVBQUUsd0JBQXVDOztZQUU1SCx5REFBeUQ7WUFDekQsR0FBRyxDQUFDLENBQW1CLElBQUEsNkJBQUEsaUJBQUEsd0JBQXdCLENBQUEsa0VBQUE7Z0JBQTFDLElBQU0sUUFBUSxxQ0FBQTtnQkFFZixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXBDLHNEQUFzRDtnQkFDdEQsSUFBTSxhQUFhLEdBQWtCLEVBQUUsQ0FBQztnQkFFeEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUV4RCxJQUFJLG9CQUFvQixTQUFBLENBQUM7b0JBRXpCLGlEQUFpRDtvQkFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFELG9CQUFvQixHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ25FLENBQUM7O3dCQUVELDJEQUEyRDt3QkFDM0QsR0FBRyxDQUFDLENBQWtCLElBQUEseUJBQUEsaUJBQUEsb0JBQW9CLENBQUEsMERBQUE7NEJBQXJDLElBQU0sT0FBTyxpQ0FBQTs0QkFFZCwwRUFBMEU7NEJBQzFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0NBRXBILElBQUksT0FBTyxTQUFBLENBQUM7Z0NBRVosaUJBQWlCO2dDQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQ0FDMUQsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUN0SixDQUFDO2dDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0NBQzlELE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ2hKLENBQUM7Z0NBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29DQUNqRSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ3RKLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osNEJBQTRCO29DQUM1QixNQUFNLElBQUksU0FBUyxDQUFDLGtDQUFnQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUcsQ0FBQyxDQUFDO2dDQUNwSCxDQUFDO2dDQUVELHNCQUFzQjtnQ0FHdEIsa0JBQWtCO2dDQUNsQixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUVoQyxDQUFDO3lCQUVKOzs7Ozs7Ozs7Z0JBQ0wsQ0FBQztnQkFFRCxJQUFNLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FDakMsV0FBVyxFQUNYLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQ3JDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQ3BDLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQ2xDLGFBQWEsQ0FDaEIsQ0FBQztnQkFFRiwyREFBMkQ7Z0JBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQzthQUNqRTs7Ozs7Ozs7O1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxzREFBc0QsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDOztJQUMxRixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssbUVBQW9DLEdBQTVDLFVBQTZDLFlBQXNCO1FBQy9ELGlFQUFpRTtRQURyRSxpQkE0QkM7UUF6QkcsSUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUUzQyw4RUFBOEU7UUFDOUUsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFVBQUEsV0FBVztZQUNQLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU1RSxLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUNqRSxVQUFBLElBQUk7Z0JBQ0EsK0NBQStDO2dCQUMvQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRVAsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2pELEdBQUcsQ0FDQyxVQUFBLFFBQVE7WUFDSixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLDRCQUE0QixFQUFFLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQy9HLENBQUMsQ0FDSixDQUNKLENBQUM7SUFFTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxxRkFBc0QsR0FBOUQsVUFBK0QsNEJBQTJDOztZQUV0RyxtREFBbUQ7WUFDbkQsR0FBRyxDQUFDLENBQWtCLElBQUEsaUNBQUEsaUJBQUEsNEJBQTRCLENBQUEsMEVBQUE7Z0JBQTdDLElBQU0sT0FBTyx5Q0FBQTtnQkFFZCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRS9CLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsRyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMxRyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixDQUFDO2dCQUVELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlHLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQWlCLElBQUssT0FBQSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztnQkFDdkcsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCxJQUFJLFVBQVUsU0FBQSxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNELENBQUM7Z0JBRUQsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FDakQsT0FBTyxFQUNQLFVBQVUsRUFDVixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUNqQyxhQUFhLEVBQ2IsVUFBVSxFQUNWLGNBQWMsRUFDZCxtQkFBbUIsQ0FDdEIsQ0FBQzthQUVMOzs7Ozs7Ozs7O0lBRUwsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssOERBQStCLEdBQXZDLFVBQXdDLFlBQXNCO1FBQTlELGlCQXFCQztRQW5CRyxJQUFNLFlBQVksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRXRDLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFVBQUEsT0FBTztZQUNILDJGQUEyRjtZQUMzRixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxtRUFBaUUsT0FBUyxDQUFDLENBQUM7WUFDN0csQ0FBQztZQUVELFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksNEJBQTRCLEVBQUUsRUFBRSxJQUFJLGVBQWUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRTVHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksb0RBQXFCLEdBQTVCO1FBQUEsaUJBb0JDO1FBbEJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLGdEQUFnRDtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUMsSUFBSSxDQUM3QyxHQUFHLENBQ0MsVUFBQSxRQUFRO2dCQUNKLEtBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTtvQkFDekUsNkJBQTZCO29CQUM3QixNQUFNLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsS0FBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7WUFDcEQsQ0FBQyxDQUNKLENBQ0osQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLDZCQUE2QjtZQUM3QixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUVMLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ssb0RBQXFCLEdBQTdCLFVBQThCLFlBQXNCO1FBQXBELGlCQXVCQztRQXJCRyx5Q0FBeUM7UUFDekMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLGlDQUFpQztRQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztZQUM1Qix3Q0FBd0M7WUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsMkNBQTJDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUMvRSxHQUFHLENBQ0MsVUFBQyxRQUFnQjtnQkFDYiwwQkFBMEI7Z0JBQzFCLEtBQUksQ0FBQyxxREFBcUQsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQ0osQ0FDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILHdEQUF3RDtRQUN4RCx5REFBeUQ7UUFDekQsb0VBQW9FO1FBQ3BFLDJDQUEyQztRQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRDs7OztPQUlHO0lBQ0ksZ0VBQWlDLEdBQXhDLFVBQXlDLFlBQXNCO1FBQS9ELGlCQXdCQztRQXRCRyxJQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQzNDLFVBQUEsV0FBVztZQUNQLG1EQUFtRDtZQUNuRCxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsS0FBSyxTQUFTLENBQUM7UUFDdEYsQ0FBQyxDQUFDLENBQUM7UUFFUCx5Q0FBeUM7UUFDekMsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FDdkQsUUFBUSxDQUNKLFVBQUEsT0FBTztnQkFDSCxnREFBZ0Q7Z0JBQ2hELE1BQU0sQ0FBQyxLQUFJLENBQUMsK0JBQStCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUNKLENBQ0osQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUVMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLDBEQUEyQixHQUFsQyxVQUFtQyxpQkFBMkI7UUFBOUQsaUJBaUNDO1FBL0JHLElBQU0sc0JBQXNCLEdBQWEsaUJBQWlCLENBQUMsTUFBTSxDQUM3RCxVQUFBLFdBQVc7WUFFUCx5REFBeUQ7WUFDekQsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUV6RSxDQUFDLENBQUMsQ0FBQztRQUVQLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLDRGQUE0RjtZQUM1RixJQUFNLFlBQVksR0FBYSxzQkFBc0IsQ0FBQyxHQUFHLENBQ3JELFVBQUEsV0FBVztnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FDSixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwQyw0Q0FBNEM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2hELFFBQVEsQ0FDSixVQUFBLE9BQU87Z0JBRUgsTUFBTSxDQUFDLEtBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FDSixDQUNKLENBQUM7UUFDTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEUsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxxREFBc0IsR0FBN0IsVUFBOEIsWUFBc0I7UUFBcEQsaUJBdUNDO1FBckNHLElBQU0saUJBQWlCLEdBQWEsWUFBWSxDQUFDLE1BQU0sQ0FDbkQsVUFBQSxPQUFPO1lBRUgsMkZBQTJGO1lBQzNGLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFFRCxtREFBbUQ7WUFDbkQsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUNoRSxDQUFDLENBQ0osQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLHNGQUFzRjtZQUN0RixJQUFNLFlBQVksR0FBYSxpQkFBaUIsQ0FBQyxHQUFHLENBQ2hELFVBQUEsT0FBTztnQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FDSixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwQyw0Q0FBNEM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2hELEdBQUcsQ0FDQyxVQUFBLE9BQU87Z0JBQ0gsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLENBQUMsS0FBSSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztnQkFDaEcsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUNKLENBQUM7UUFDTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDTCxDQUFDOztnQkEvakJKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBdldRLGVBQWU7OzsrQkFGeEI7Q0F1NkJDLEFBaGtCRCxJQWdrQkM7U0E3akJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIEtub3JhQ29uc3RhbnRzLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBPbnRvbG9neVNlcnZpY2UgfSBmcm9tICcuL29udG9sb2d5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ3MzAwMTAvYW5ndWxhcjItNS1taW51dGUtaW5zdGFsbC1idWctcmVxdWlyZS1pcy1ub3QtZGVmaW5lZFxuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlcnJvciBvY2N1cnJlZCBpbiBPbnRvbG9neUNhY2hlU2VydmljZS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gb250b2xvZ3kncyBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5TWV0YWRhdGEge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0gbGFiZWwgYSBsYWJlbCBkZXNjcmliaW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIE9jY3VycmVuY2Ugb2YgYSBwcm9wZXJ0eSBmb3IgYSByZXNvdXJjZSBjbGFzcyAoaXRzIGNhcmRpbmFsaXR5KS5cbiAqL1xuZXhwb3J0IGVudW0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlIHtcbiAgICBtaW5DYXJkID0gMCxcbiAgICBjYXJkID0gMSxcbiAgICBtYXhDYXJkID0gMlxufVxuXG5cbi8qKlxuICogQ2FyZGluYWxpdHkgb2YgYSBwcm9wZXJ0eSBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FyZGluYWxpdHkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2NjdXJyZW5jZSB0eXBlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHZhbHVlIG51bWVyaWNhbCB2YWx1ZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdGhlIGdpdmVuIG9jY3VycmVuY2UgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvY2N1cnJlbmNlOiBDYXJkaW5hbGl0eU9jY3VycmVuY2UsXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGljb24gcGF0aCB0byBhbiBpY29uIHJlcHJlc2VudGluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaWNvbjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhcmRpbmFsaXRpZXM6IEFycmF5PENhcmRpbmFsaXR5Pikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyB0byByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NlcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZXNvdXJjZUNsYXNzO1xufVxuXG5cbi8qKlxuICogQSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHN1YlByb3BlcnR5T2YgSXJpcyBvZiBwcm9wZXJ0aWVzIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIHN1YnByb3BlcnR5IG9mLlxuICAgICAqIEBwYXJhbSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIGlzTGlua1Byb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIGxpbmtpbmcgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIGlzTGlua1ZhbHVlUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IHJlZmVycyB0byBhIGxpbmsgdmFsdWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1Byb3BlcnR5OiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEEgbGlzdCBvZiBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBuYW1lZCBncmFwaC5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5O1xuXG4gICAgLyoqXG4gICAgICogUmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub250b2xvZ2llcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IFByb3BlcnRpZXMoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbnRvbG9neSBpbmZvcm1hdGlvbiByZXF1ZXN0ZWQgZnJvbSB0aGlzIHNlcnZpY2UuXG4gKlxuICogRm9yIGV2ZXJ5IHJlcXVlc3QsIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcmV0dXJuZWQgY29udGFpbmluZyB0aGUgcmVxdWVzdGVkIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBnaXZlbiBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSxcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcyxcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGdpdmVuIFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dIGludG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UsXG4gICAgICogdXBkYXRpbmcgdGhlIGV4aXN0aW5nIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBhIHNlcnZpY2UgbGlrZSB0aGUgc2VhcmNoIGZldGNoZXMgbmV3IHJlc3VsdHNcbiAgICAgKiB0aGF0IGhhdmUgdG8gYmUgYWRkZWQgdG8gYW4gZXhpc3RpbmcgY29sbGVjdGlvbi5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgb250b2xvZ3kgaW5mb3JtYXRpb24gbXVzdCBub3QgYmUgbG9zdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgb250b2xvZ3lJbmZvIHRoZSBnaXZlbiBkZWZpbml0aW9ucyB0aGF0IGhhdmUgdG8gYmUgaW50ZWdyYXRlZC5cbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBncm91cGVkIGJ5IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKCk6IFJlc291cmNlQ2xhc3NlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMge0FycmF5PFJlc291cmNlQ2xhc3M+fVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZiA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3Mgd2l0aG91dCBhcmd1bWVudCByZXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcygpOiBQcm9wZXJ0aWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0FzQXJyYXkoKTogQXJyYXk8UHJvcGVydHk+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eT4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcDogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5IHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyB0aGUgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWYgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldO1xuXG4gICAgICAgICAgICBpZiAocHJvcERlZiAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JQcm9wZXJ0eSB3aXRob3V0IGFyZ3VtZW50IHByb3BlcnR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEgYW5kIGNhY2hlcyBpdC5cbiAqIE90aGVyIGNvbXBvbmVudHMgb3Igc2VydmljZXMgb2J0YWluIG9udG9sb2d5IGluZm9ybWF0aW9uIHRocm91Z2ggdGhpcyBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5Q2FjaGVTZXJ2aWNlIHtcblxuICAgIC8vIG9udG9sb2dpZXMgaW5nb3JlZCBieSB0aGlzIHNlcnZpY2VcbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvLyBwcm9wZXJ0aWVzIHRoYXQgS25vcmEgaXMgbm90IHJlc3BvbnNpYmxlIGZvciBhbmRcbiAgICAvLyB0aGF0IGhhdmUgdG8gYmUgaWdub3JlZCBiZWNhdXNlIHRoZXkgY2Fubm90IGJlIHJlc29sdmVkIGF0IHRoZSBtb21lbnRcbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLy8gY2xhc3MgZGVmaW5pdGlvbnMgdGhhdCBhcmUgbm90IGJlIHRyZWF0ZWQgYXMgS25vcmEgcmVzb3VyY2UgY2xhc3Nlc1xuICAgIHByaXZhdGUgbm9uUmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLkZvcmJpZGRlblJlc291cmNlLCBLbm9yYUNvbnN0YW50cy5YTUxUb1N0YW5kb2ZmTWFwcGluZywgS25vcmFDb25zdGFudHMuTGlzdE5vZGVdO1xuXG4gICAgLy8gY2VudHJhbCBpbnN0YW5jZSB0aGF0IGNhY2hlcyBhbGwgZGVmaW5pdGlvbnNcbiAgICBwcml2YXRlIGNhY2hlT250b2xvZ3k6IE9udG9sb2d5Q2FjaGUgPSBuZXcgT250b2xvZ3lDYWNoZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb250b2xvZ3lTZXJ2aWNlOiBPbnRvbG9neVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIG1ldGFkYXRhIGZvciBhbGwgb250b2xvZ2llcyBhcyBKU09OLUxEIChubyBwcmVmaXhlcywgYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQpLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgKHJlc291cmNlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMpIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSB0aGUgSXJpIG9mIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhbGwgdGhlIG9udG9sb2dpZXMnIG1ldGFkYXRhIHJldHVybmVkIGJ5IEtub3JhIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2dpZXMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgYXMgSlNPTi1MRC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUob250b2xvZ2llczogb2JqZWN0W10pIHtcblxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcyA9IG9udG9sb2dpZXMubWFwKFxuICAgICAgICAgICAgb250b2xvZ3kgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lNZXRhZGF0YShvbnRvbG9neVsnQGlkJ10sIG9udG9sb2d5W0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9udG9sb2dpZXMnIG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlIGFuZCByZXR1cm5zIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NEZWZpbml0aW9ucyB0aGUgY2xhc3MgZGVmaW5pdGlvbnMgaW4gYW4gb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5OiBvYmplY3QpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncmFwaCA9IG9udG9sb2d5WydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBnZXQgYWxsIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IGNsYXNzRGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bENsYXNzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xPYmplY3RQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xEYXRhdHlwZVByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bEFubm90YXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5SZGZQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gY2FjaGUgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50IG9udG9sb2d5XG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5WydAaWQnXV0gPSB0aGlzLmdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZzKTtcblxuICAgICAgICAvLyB3cml0ZSBjbGFzcyBhbmQgcHJvcGVydHkgZGVmaW50aW9ucyB0byBjYWNoZVxuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShjbGFzc0RlZnMsIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhbGwgcmVxdWVzdGVkIG5hbWVkIGdyYXBoc1xuICAgICAgICBsZXQgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9udG9sb2d5SXJpIG9mIG9udG9sb2d5SXJpcykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9naWVzRnJvbUNhY2hlOiBvbnRvbG9neSBub3QgZm91bmQgaW4gY2FjaGU6ICR7b250b2xvZ3lJcml9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIG9udG9sb2d5XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV07XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBvZiB0aGlzIG9udG9sb2d5XG4gICAgICAgICAgICBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IGFsbFJlc291cmNlQ2xhc3NJcmlzLmNvbmNhdCh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBhbGwgcmVxdWVzdGVkIG9udG9sb2dpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKGFsbFJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5LCByZXNDbGFzc0RlZnMuZ2V0UmVzb3VyY2VDbGFzc2VzKCksIHJlc0NsYXNzRGVmcy5nZXRQcm9wZXJ0aWVzKClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIG9udG9sb2d5IHJlc3BvbnNlIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3ViY2xhc3NPZkNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIHNpbmdsZSBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSBbcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY2FyZGluYWxpdGllcyBmb3IgdGhlIHByb3BlcnRpZXMgb2YgYSByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VyQ2FyZCBvZiBzdWJjbGFzc09mQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgZ3VpIG9yZGVyXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMge1Jlc291cmNlQ2xhc3Nlc30gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmFcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZSBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9IG5ldyBQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSxcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcHJvcGVydHkgZGVmaW5pdGlvbnMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlJcmlzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW50aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZTogcHJvcGVydHkgbm90IGZvdW5kIGluIGNhY2hlOiAke3Byb3BJcml9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvcGVydHlEZWZzW3Byb3BJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIG5ldyBSZXNvdXJjZUNsYXNzZXMoKSwgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IHtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIGluIGNhY2hlIHlldCwgZ2V0IG1ldGFkYXRhIGZyb20gS25vcmFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUobWV0YWRhdGFbJ0BncmFwaCddLmZpbHRlcigob250bykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBleGNsdWRlZCBvbnRvbG9naWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZWRPbnRvbG9naWVzLmluZGV4T2Yob250b1snQGlkJ10pID09PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBtZXRhZGF0YSBmcm9tIGNhY2hlXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gS25vcmEsIGFkZGluZyB0aGVtIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgICAgICAvLyBhcnJheSB0byBiZSBwb3B1bGF0ZWQgd2l0aCBPYnNlcnZhYmxlc1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgICAgIC8vIGRvIGEgcmVxdWVzdCBmb3IgZWFjaCBvbnRvbG9neVxuICAgICAgICBvbnRvbG9neUlyaXMuZm9yRWFjaChvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAvLyBwdXNoIGFuIE9ic2VydmFibGUgb250byBgb2JzZXJ2YWJsZXNgXG4gICAgICAgICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChvbnRvbG9neTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9ya0pvaW4gcmV0dXJucyBhbiBPYnNlcnZhYmxlIG9mIGFuIGFycmF5IG9mIHJlc3VsdHNcbiAgICAgICAgLy8gcmV0dXJuZWQgYnkgZWFjaCBPYnNlcnZhYmxlIGNvbnRhaW5lZCBpbiBgb2JzZXJ2YWJsZXNgXG4gICAgICAgIC8vIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGZvcmtKb2luIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIG9uY2UgYWxsIE9ic2VydmFibGVzIGhhdmUgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICovXG4gICAgcHVibGljIGdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzVG9RdWVyeSA9IG9udG9sb2d5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbnRvbG9neSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IG9udG9sb2dpZXMgdGhhdCBhcmUgbW90IGNhY2hlZCB5ZXRcbiAgICAgICAgaWYgKG9udG9sb2d5SXJpc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzVG9RdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkIC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzVG9RdWVyeTogc3RyaW5nW10gPSBwcm9wZXJ0eUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzVG9RdWVyeS5tYXAoXG4gICAgICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocHJvcElyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIHdpdGg6IHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19