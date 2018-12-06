import { __decorate, __metadata } from 'tslib';
import { JsonObject, JsonProperty, JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, Inject, Injectable, defineInjectable, inject } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Subject, Observable, forkJoin, from, of, BehaviorSubject } from 'rxjs';

/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
let KuiCoreConfig = class KuiCoreConfig {
    constructor() {
        /**
         * (Salsah) name of the app
         * @type {string}
         */
        this.name = undefined;
        /**
         * (knora) url of the api
         * @type {string}
         */
        this.api = undefined;
        /**
         * (sipi) url of media/file server
         * @type {string}
         */
        this.media = undefined;
        /**
         * (salsah) url of the app
         * @type {undefined}
         */
        this.app = undefined;
    }
};
__decorate([
    JsonProperty('name', String),
    __metadata("design:type", String)
], KuiCoreConfig.prototype, "name", void 0);
__decorate([
    JsonProperty('api', String),
    __metadata("design:type", String)
], KuiCoreConfig.prototype, "api", void 0);
__decorate([
    JsonProperty('media', String),
    __metadata("design:type", String)
], KuiCoreConfig.prototype, "media", void 0);
__decorate([
    JsonProperty('app', String),
    __metadata("design:type", String)
], KuiCoreConfig.prototype, "app", void 0);
KuiCoreConfig = __decorate([
    JsonObject('KuiCoreConfig')
], KuiCoreConfig);

/**
 * Result class used as API url response in ApiService
 */
class ApiServiceResult {
    constructor() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
    }
    /**
     * Gets the result body as instance of classObject.
     * @param classObject
     * @returns {any}
     * @throws
     */
    getBody(classObject) {
        // console.log(this.body);
        return ApiServiceResult.jsonConvert.deserialize(this.body, classObject);
    }
}
ApiServiceResult.jsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

/**
 * Error class used as API response in ApiService
 */
class ApiServiceError {
    constructor() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
        /**
         * Additional error info
         */
        this.errorInfo = '';
    }
}

class KnoraConstants {
}
KnoraConstants.KnoraApi = 'http://api.knora.org/ontology/knora-api';
KnoraConstants.PathSeparator = '#';
KnoraConstants.KnoraOntologyPath = 'http://www.knora.org/ontology';
KnoraConstants.KnoraBase = KnoraConstants.KnoraOntologyPath + '/knora-base';
KnoraConstants.SystemProjectIRI = KnoraConstants.KnoraBase + '#SystemProject';
KnoraConstants.SystemAdminGroupIRI = KnoraConstants.KnoraBase + '#SystemAdmin';
KnoraConstants.ProjectAdminGroupIRI = KnoraConstants.KnoraBase + '#ProjectAdmin';
KnoraConstants.ProjectMemberGroupIRI = KnoraConstants.KnoraBase + '#ProjectMember';
KnoraConstants.KnoraApiV2WithValueObjectPath = KnoraConstants.KnoraApi + '/v2' + KnoraConstants.PathSeparator;
KnoraConstants.KnoraApiV2SimplePath = KnoraConstants.KnoraApi + '/simple/v2' + KnoraConstants.PathSeparator;
KnoraConstants.SalsahGuiOntology = 'http://api.knora.org/ontology/salsah-gui/v2';
KnoraConstants.SalsahGuiOrder = KnoraConstants.SalsahGuiOntology + '#guiOrder';
KnoraConstants.StandoffOntology = 'http://api.knora.org/ontology/standoff/v2';
KnoraConstants.Resource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Resource';
KnoraConstants.TextValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextValue';
KnoraConstants.IntValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntValue';
KnoraConstants.BooleanValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'BooleanValue';
KnoraConstants.UriValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'UriValue';
KnoraConstants.DecimalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DecimalValue';
KnoraConstants.DateValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DateValue';
KnoraConstants.ColorValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ColorValue';
KnoraConstants.GeomValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeomValue';
KnoraConstants.ListValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListValue';
KnoraConstants.IntervalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntervalValue';
KnoraConstants.LinkValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'LinkValue';
KnoraConstants.GeonameValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeonameValue';
KnoraConstants.FileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'FileValue';
KnoraConstants.AudioFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'AudioFileValue';
KnoraConstants.DDDFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DDDFileValue';
KnoraConstants.DocumentFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DocumentFileValue';
KnoraConstants.StillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'StillImageFileValue';
KnoraConstants.MovingImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'MovingImageFileValue';
KnoraConstants.TextFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextFileValue';
KnoraConstants.IsResourceClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isResourceClass';
KnoraConstants.IsValueClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isValueClass';
KnoraConstants.ForbiddenResource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ForbiddenResource';
KnoraConstants.XMLToStandoffMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'XMLToStandoffMapping';
KnoraConstants.ListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListNode';
KnoraConstants.ObjectType = KnoraConstants.KnoraApiV2WithValueObjectPath + 'objectType';
KnoraConstants.ResourceIcon = KnoraConstants.KnoraApiV2WithValueObjectPath + 'resourceIcon';
KnoraConstants.isEditable = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isEditable';
KnoraConstants.isLinkProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkProperty';
KnoraConstants.isLinkValueProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkValueProperty';
KnoraConstants.hasGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasGeometry';
KnoraConstants.schemaName = 'http://schema.org/name';
KnoraConstants.schemaNumberOfItems = 'http://schema.org/numberOfItems';
KnoraConstants.schemaItemListElement = 'http://schema.org/itemListElement';
KnoraConstants.RdfProperty = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property';
KnoraConstants.RdfsLabel = 'http://www.w3.org/2000/01/rdf-schema#label';
KnoraConstants.RdfsComment = 'http://www.w3.org/2000/01/rdf-schema#comment';
KnoraConstants.RdfsSubclassOf = 'http://www.w3.org/2000/01/rdf-schema#subClassOf';
KnoraConstants.subPropertyOf = 'http://www.w3.org/2000/01/rdf-schema#subPropertyOf';
KnoraConstants.owl = 'http://www.w3.org/2002/07/owl';
KnoraConstants.OwlClass = KnoraConstants.owl + '#Class';
KnoraConstants.OwlObjectProperty = KnoraConstants.owl + '#ObjectProperty';
KnoraConstants.OwlDatatypeProperty = KnoraConstants.owl + '#DatatypeProperty';
KnoraConstants.OwlAnnotationProperty = KnoraConstants.owl + '#AnnotationProperty';
KnoraConstants.OwlOnProperty = KnoraConstants.owl + '#onProperty';
KnoraConstants.OwlMaxCardinality = KnoraConstants.owl + '#maxCardinality';
KnoraConstants.OwlMinCardinality = KnoraConstants.owl + '#minCardinality';
KnoraConstants.OwlCardinality = KnoraConstants.owl + '#cardinality';
KnoraConstants.OwlRestriction = KnoraConstants.owl + '#Restriction';
KnoraConstants.creationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'creationDate';
KnoraConstants.lastModificationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'lastModificationDate';
KnoraConstants.hasPermissions = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasPermissions';
KnoraConstants.attachedToProject = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToProject';
KnoraConstants.attachedToUser = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToUser';
KnoraConstants.Region = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Region';
KnoraConstants.ReadTextValueAsHtml = 'ReadTextValueAsHtml';
KnoraConstants.ReadTextValueAsString = 'ReadTextValueAsString';
KnoraConstants.ReadTextValueAsXml = 'ReadTextValueAsXml';
KnoraConstants.ReadDateValue = 'ReadDateValue';
KnoraConstants.ReadLinkValue = 'ReadLinkValue';
KnoraConstants.ReadIntegerValue = 'ReadIntegerValue';
KnoraConstants.ReadDecimalValue = 'ReadDecimalValue';
KnoraConstants.ReadStillImageFileValue = 'ReadStillImageFileValue';
KnoraConstants.ReadTextFileValue = 'ReadTextFileValue';
KnoraConstants.ReadGeomValue = 'ReadGeomValue';
KnoraConstants.ReadColorValue = 'ReadColorValue';
KnoraConstants.ReadUriValue = 'ReadUriValue';
KnoraConstants.ReadBooleanValue = 'ReadBooleanValue';
KnoraConstants.ReadIntervalValue = 'ReadIntervalValue';
KnoraConstants.ReadListValue = 'ReadListValue';
KnoraConstants.valueAsString = KnoraConstants.KnoraApiV2WithValueObjectPath + 'valueAsString';
KnoraConstants.textValueAsHtml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsHtml';
KnoraConstants.textValueAsXml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsXml';
KnoraConstants.textValueHasMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueHasMapping';
KnoraConstants.hasStandoffLinkToValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStandoffLinkToValue';
KnoraConstants.dateValueHasStartYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartYear';
KnoraConstants.dateValueHasEndYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndYear';
KnoraConstants.dateValueHasStartEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartEra';
KnoraConstants.dateValueHasEndEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndEra';
KnoraConstants.dateValueHasStartMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartMonth';
KnoraConstants.dateValueHasEndMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndMonth';
KnoraConstants.dateValueHasStartDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartDay';
KnoraConstants.dateValueHasEndDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndDay';
KnoraConstants.dateValueHasCalendar = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasCalendar';
KnoraConstants.linkValueHasTarget = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTarget';
KnoraConstants.linkValueHasSource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSource';
KnoraConstants.linkValueHasSourceIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSourceIri';
KnoraConstants.linkValueHasTargetIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTargetIri';
KnoraConstants.integerValueAsInteger = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intValueAsInt';
KnoraConstants.decimalValueAsDecimal = KnoraConstants.KnoraApiV2WithValueObjectPath + 'decimalValueAsDecimal';
KnoraConstants.fileValueAsUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueAsUrl';
KnoraConstants.fileValueIsPreview = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueIsPreview';
KnoraConstants.fileValueHasFilename = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueHasFilename';
KnoraConstants.hasStillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStillImageFileValue';
KnoraConstants.stillImageFileValueHasDimX = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimX';
KnoraConstants.stillImageFileValueHasDimY = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimY';
KnoraConstants.stillImageFileValueHasIIIFBaseUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasIIIFBaseUrl';
KnoraConstants.colorValueAsColor = KnoraConstants.KnoraApiV2WithValueObjectPath + 'colorValueAsColor';
KnoraConstants.geometryValueAsGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'geometryValueAsGeometry';
KnoraConstants.uriValueAsUri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'uriValueAsUri';
KnoraConstants.booleanValueAsBoolean = KnoraConstants.KnoraApiV2WithValueObjectPath + 'booleanValueAsBoolean';
KnoraConstants.intervalValueHasStart = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasStart';
KnoraConstants.intervalValueHasEnd = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasEnd';
KnoraConstants.listValueAsListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNode';
KnoraConstants.listValueAsListNodeLabel = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNodeLabel';
KnoraConstants.Xsd = 'http://www.w3.org/2001/XMLSchema#';
KnoraConstants.xsdString = KnoraConstants.Xsd + 'string';
KnoraConstants.xsdBoolean = KnoraConstants.Xsd + 'boolean';
KnoraConstants.xsdInteger = KnoraConstants.Xsd + 'integer';
KnoraConstants.xsdDecimal = KnoraConstants.Xsd + 'decimal';
KnoraConstants.xsdUri = KnoraConstants.Xsd + 'anyURI';
KnoraConstants.resourceSimple = KnoraConstants.KnoraApiV2SimplePath + 'Resource';
KnoraConstants.dateSimple = KnoraConstants.KnoraApiV2SimplePath + 'Date';
KnoraConstants.intervalSimple = KnoraConstants.KnoraApiV2SimplePath + 'Interval';
KnoraConstants.geomSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geom';
KnoraConstants.colorSimple = KnoraConstants.KnoraApiV2SimplePath + 'Color';
KnoraConstants.geonameSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geoname';
KnoraConstants.fileSimple = KnoraConstants.KnoraApiV2SimplePath + 'File';
KnoraConstants.matchFunction = KnoraConstants.KnoraApiV2SimplePath + 'match';
KnoraConstants.EqualsComparisonOperator = '=';
KnoraConstants.EqualsComparisonLabel = 'is equal to';
KnoraConstants.NotEqualsComparisonOperator = '!=';
KnoraConstants.NotEqualsComparisonLabel = 'is not equal to';
KnoraConstants.GreaterThanComparisonOperator = '>';
KnoraConstants.GreaterThanComparisonLabel = 'is greater than';
KnoraConstants.GreaterThanEqualsComparisonOperator = '>=';
KnoraConstants.GreaterThanEqualsComparisonLabel = 'is greater than equals to';
KnoraConstants.LessThanComparisonOperator = '<';
KnoraConstants.LessThanComparisonLabel = 'is less than';
KnoraConstants.LessThanEqualsComparisonOperator = '<=';
KnoraConstants.LessThanQualsComparisonLabel = 'is less than equals to';
KnoraConstants.ExistsComparisonOperator = 'E';
KnoraConstants.ExistsComparisonLabel = 'exists';
KnoraConstants.LikeComparisonOperator = 'regex';
KnoraConstants.LikeComparisonLabel = 'is like';
KnoraConstants.MatchComparisonOperator = 'contains';
KnoraConstants.MatchComparisonLabel = 'matches';
KnoraConstants.SalsahLink = 'salsah-link'; // class on an HTML <a> element that indicates a link to a Knora resource
KnoraConstants.RefMarker = 'ref-marker'; // class on an HTML element that refers to another element in the same document
KnoraConstants.GNDPrefix = '(DE-588)';
KnoraConstants.GNDResolver = 'http://d-nb.info/gnd/';
KnoraConstants.VIAFPrefix = '(VIAF)';
KnoraConstants.VIAFResolver = 'https://viaf.org/viaf/';
var KnoraSchema;
(function (KnoraSchema) {
    KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
    KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
})(KnoraSchema || (KnoraSchema = {}));

/**
 * Collection of useful utility functions.
 */
// @dynamic
class Utils {
    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    static getOntologyIriFromEntityIri(entityIri) {
        // split class Iri on "#"
        const segments = entityIri.split(KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error(`Error: ${entityIri} is not a valid entity IRI.`);
        return segments[0];
    }
    /**
     * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
     *
     * @param {string} complexEntityIri
     * @returns {string}
     */
    static convertComplexKnoraApiEntityIritoSimple(complexEntityIri) {
        // split entity Iri on "#"
        const segments = complexEntityIri.split('v2' + KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error(`Error: ${complexEntityIri} is not a valid entity IRI.`);
        // add 'simple' to base path
        return segments[0] + 'simple/v2' + KnoraConstants.PathSeparator + segments[1];
    }
}
/**
 * A regex to validate Emails.
 *
 * @type {RegExp}
 */
Utils.RegexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/**
 * A regex to validate URLs.
 *
 * @type {RegExp}
 */
Utils.RegexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/i;
/**
 * A regex to validate Passwords
 *
 * @type {RegExp}
 */
Utils.RegexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i;
/**
 * A regex to validate Hexadecimal values
 *
 * @type {RegExp}
 */
Utils.RegexHex = /^[0-9A-Fa-f]+$/;
/**
 * A regex to validate shortname in projects
 *
 * @type {RegExp}
 */
Utils.RegexShortname = /^[a-zA-Z]+\S*$/;
/**
 * Lambda function eliminating duplicates in a collection to be passed to [[filter]].
 *
 * @param elem element of an Array that is currently being looked at.
 * @param index current elements index.
 * @param self reference to the whole Array.
 * @returns {boolean} true if the same element does not already exist in the Array.
 */
Utils.filterOutDuplicates = (elem, index, self) => {
    // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example
    // returns true if the element's index equals the index of the leftmost element
    // -> this means that there is no identical element before this index, hence it is not a duplicate
    // for all other elements, false is returned
    return index === self.indexOf(elem);
};

let StringLiteral = class StringLiteral {
    constructor() {
        this.value = undefined;
        this.language = '';
    }
};
__decorate([
    JsonProperty('value', String, false),
    __metadata("design:type", String)
], StringLiteral.prototype, "value", void 0);
__decorate([
    JsonProperty('language', String, true),
    __metadata("design:type", String)
], StringLiteral.prototype, "language", void 0);
StringLiteral = __decorate([
    JsonObject('StringLiteral')
], StringLiteral);

/**
 * Precision for DateSalsah.
 */
var Precision;
(function (Precision) {
    Precision[Precision["yearPrecision"] = 0] = "yearPrecision";
    Precision[Precision["monthPrecision"] = 1] = "monthPrecision";
    Precision[Precision["dayPrecision"] = 2] = "dayPrecision";
})(Precision || (Precision = {}));
/**
 * Represents a Salsah date object with a precision information.
 */
class DateSalsah {
    constructor(calendar, era, year, month, day) {
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        if (this.month === undefined) {
            // year precision
            this.precision = Precision.yearPrecision;
        }
        else if (this.day === undefined) {
            // month precision
            this.precision = Precision.monthPrecision;
        }
        else {
            // day precision
            this.precision = Precision.dayPrecision;
        }
    }
    /**
     * Returns a string representation of the date without the calendar.
     *
     * @returns {string}
     */
    getDateAsStringWithoutCalendar() {
        let dateString = '(' + this.era + ') ';
        switch (this.precision) {
            case Precision.yearPrecision: {
                dateString += this.year.toString();
                break;
            }
            case Precision.monthPrecision: {
                dateString += this.year + DateSalsah.separator + this.month;
                break;
            }
            case Precision.dayPrecision: {
                dateString += this.year + DateSalsah.separator + this.month + DateSalsah.separator + this.day;
                break;
            }
            default: {
                break;
            }
        }
        return dateString;
    }
    /**
     * Returns a string representation of the date (with calendar).
     *
     * @returns {string}
     */
    getDateAsString() {
        return this.calendar + ':' + this.getDateAsStringWithoutCalendar();
    }
}
DateSalsah.separator = '-';
/**
 * Represents a period (with start date and end date).
 */
class DateRangeSalsah {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns a string representation of the date range (with preceding calendar).
     *
     * @returns {string}
     */
    getDateAsString() {
        return this.start.getDateAsString() + ':' + this.end.getDateAsStringWithoutCalendar();
    }
}

let AuthenticationResponse = class AuthenticationResponse {
    constructor() {
        this.token = undefined;
    }
};
__decorate([
    JsonProperty('token', String),
    __metadata("design:type", String)
], AuthenticationResponse.prototype, "token", void 0);
AuthenticationResponse = __decorate([
    JsonObject('AuthenticationResponse')
], AuthenticationResponse);

let Project = class Project {
    constructor() {
        this.id = undefined;
        this.shortname = undefined;
        this.shortcode = undefined;
        this.longname = undefined;
        this.description = [new StringLiteral()];
        this.keywords = undefined;
        this.logo = undefined;
        this.institution = undefined;
        this.ontologies = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
};
__decorate([
    JsonProperty('id', String),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    JsonProperty('shortname', String),
    __metadata("design:type", String)
], Project.prototype, "shortname", void 0);
__decorate([
    JsonProperty('shortcode', String, true),
    __metadata("design:type", String)
], Project.prototype, "shortcode", void 0);
__decorate([
    JsonProperty('longname', String, true),
    __metadata("design:type", String)
], Project.prototype, "longname", void 0);
__decorate([
    JsonProperty('description', [StringLiteral], true),
    __metadata("design:type", Array)
], Project.prototype, "description", void 0);
__decorate([
    JsonProperty('keywords', [String], true),
    __metadata("design:type", Array)
], Project.prototype, "keywords", void 0);
__decorate([
    JsonProperty('logo', String, true),
    __metadata("design:type", String)
], Project.prototype, "logo", void 0);
__decorate([
    JsonProperty('institution', String, true),
    __metadata("design:type", String)
], Project.prototype, "institution", void 0);
__decorate([
    JsonProperty('ontologies', [String]),
    __metadata("design:type", Array)
], Project.prototype, "ontologies", void 0);
__decorate([
    JsonProperty('status', Boolean),
    __metadata("design:type", Boolean)
], Project.prototype, "status", void 0);
__decorate([
    JsonProperty('selfjoin', Boolean),
    __metadata("design:type", Boolean)
], Project.prototype, "selfjoin", void 0);
Project = __decorate([
    JsonObject('Project')
], Project);

let Group = class Group {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.project = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
};
__decorate([
    JsonProperty('id', String),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    JsonProperty('name', String),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    JsonProperty('description', String),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    JsonProperty('project', Project, false),
    __metadata("design:type", Project)
], Group.prototype, "project", void 0);
__decorate([
    JsonProperty('status', Boolean),
    __metadata("design:type", Boolean)
], Group.prototype, "status", void 0);
__decorate([
    JsonProperty('selfjoin', Boolean),
    __metadata("design:type", Boolean)
], Group.prototype, "selfjoin", void 0);
Group = __decorate([
    JsonObject('Group')
], Group);

let GroupResponse = class GroupResponse {
    constructor() {
        this.group = undefined;
    }
};
__decorate([
    JsonProperty('group', Group),
    __metadata("design:type", Group)
], GroupResponse.prototype, "group", void 0);
GroupResponse = __decorate([
    JsonObject('GroupResponse')
], GroupResponse);

let GroupsResponse = class GroupsResponse {
    constructor() {
        this.groups = undefined;
    }
};
__decorate([
    JsonProperty('groups', [Group]),
    __metadata("design:type", Array)
], GroupsResponse.prototype, "groups", void 0);
GroupsResponse = __decorate([
    JsonObject('GroupsResponse')
], GroupsResponse);

let ListInfo = class ListInfo {
    constructor() {
        this.id = undefined;
        this.projectIri = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
};
__decorate([
    JsonProperty('id', String, false),
    __metadata("design:type", String)
], ListInfo.prototype, "id", void 0);
__decorate([
    JsonProperty('projectIri', String, false),
    __metadata("design:type", String)
], ListInfo.prototype, "projectIri", void 0);
__decorate([
    JsonProperty('labels', [StringLiteral], true),
    __metadata("design:type", Array)
], ListInfo.prototype, "labels", void 0);
__decorate([
    JsonProperty('comments', [StringLiteral], true),
    __metadata("design:type", Array)
], ListInfo.prototype, "comments", void 0);
ListInfo = __decorate([
    JsonObject('ListInfo')
], ListInfo);

let ListNode = ListNode_1 = class ListNode {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.label = undefined;
        this.children = undefined;
        this.level = undefined;
        this.position = undefined;
    }
};
__decorate([
    JsonProperty('id', String, false),
    __metadata("design:type", String)
], ListNode.prototype, "id", void 0);
__decorate([
    JsonProperty('name', String, true),
    __metadata("design:type", String)
], ListNode.prototype, "name", void 0);
__decorate([
    JsonProperty('label', String, true),
    __metadata("design:type", String)
], ListNode.prototype, "label", void 0);
__decorate([
    JsonProperty('children', [ListNode_1], true),
    __metadata("design:type", Array)
], ListNode.prototype, "children", void 0);
__decorate([
    JsonProperty('level', Number, true),
    __metadata("design:type", Number)
], ListNode.prototype, "level", void 0);
__decorate([
    JsonProperty('position', Number, true),
    __metadata("design:type", Number)
], ListNode.prototype, "position", void 0);
ListNode = ListNode_1 = __decorate([
    JsonObject('ListNode')
], ListNode);
var ListNode_1;

let List = class List {
    constructor() {
        this.listinfo = undefined;
        this.children = undefined;
    }
};
__decorate([
    JsonProperty('listinfo', ListInfo, false),
    __metadata("design:type", ListInfo)
], List.prototype, "listinfo", void 0);
__decorate([
    JsonProperty('children', [ListNode], false),
    __metadata("design:type", Array)
], List.prototype, "children", void 0);
List = __decorate([
    JsonObject('List')
], List);

let ListInfoResponse = class ListInfoResponse {
    constructor() {
        this.listinfo = undefined;
    }
};
__decorate([
    JsonProperty('listinfo', ListInfo, false),
    __metadata("design:type", ListInfo)
], ListInfoResponse.prototype, "listinfo", void 0);
ListInfoResponse = __decorate([
    JsonObject('ListInfoResponse')
], ListInfoResponse);

let ListNodeInfo = class ListNodeInfo {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
};
__decorate([
    JsonProperty('id', String),
    __metadata("design:type", String)
], ListNodeInfo.prototype, "id", void 0);
__decorate([
    JsonProperty('name', String, true),
    __metadata("design:type", String)
], ListNodeInfo.prototype, "name", void 0);
__decorate([
    JsonProperty('projectIri', String, true),
    __metadata("design:type", String)
], ListNodeInfo.prototype, "projectIri", void 0);
__decorate([
    JsonProperty('isRootNode', Boolean, true),
    __metadata("design:type", Boolean)
], ListNodeInfo.prototype, "isRootNode", void 0);
__decorate([
    JsonProperty('labels', [StringLiteral]),
    __metadata("design:type", Array)
], ListNodeInfo.prototype, "labels", void 0);
__decorate([
    JsonProperty('comments', [StringLiteral]),
    __metadata("design:type", Array)
], ListNodeInfo.prototype, "comments", void 0);
ListNodeInfo = __decorate([
    JsonObject('ListNodeInfo')
], ListNodeInfo);

let ListNodeInfoResponse = class ListNodeInfoResponse {
    constructor() {
        this.nodeinfo = undefined;
    }
};
__decorate([
    JsonProperty('nodeinfo', ListNodeInfo, false),
    __metadata("design:type", ListNodeInfo)
], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
ListNodeInfoResponse = __decorate([
    JsonObject('ListNodeInfoResponse')
], ListNodeInfoResponse);

let ListResponse = class ListResponse {
    constructor() {
        this.list = undefined;
    }
};
__decorate([
    JsonProperty('list', List, false),
    __metadata("design:type", List)
], ListResponse.prototype, "list", void 0);
ListResponse = __decorate([
    JsonObject('ListResponse')
], ListResponse);

let ListsResponse = class ListsResponse {
    constructor() {
        this.lists = undefined;
    }
};
__decorate([
    JsonProperty('lists', [ListNodeInfo], false),
    __metadata("design:type", Array)
], ListsResponse.prototype, "lists", void 0);
ListsResponse = __decorate([
    JsonObject('ListsResponse')
], ListsResponse);

let OntologyInfoShort = class OntologyInfoShort {
    constructor() {
        this.ontologyIri = undefined;
        this.ontologyName = undefined;
    }
};
__decorate([
    JsonProperty('ontologyIri', String),
    __metadata("design:type", String)
], OntologyInfoShort.prototype, "ontologyIri", void 0);
__decorate([
    JsonProperty('ontologyName', String),
    __metadata("design:type", String)
], OntologyInfoShort.prototype, "ontologyName", void 0);
OntologyInfoShort = __decorate([
    JsonObject('OntologyInfoShort')
], OntologyInfoShort);

let PermissionData = class PermissionData {
    constructor() {
        this.groupsPerProject = undefined;
        this.administrativePermissionsPerProject = undefined;
    }
};
__decorate([
    JsonProperty('groupsPerProject', Object),
    __metadata("design:type", Object)
], PermissionData.prototype, "groupsPerProject", void 0);
__decorate([
    JsonProperty('administrativePermissionsPerProject', Object),
    __metadata("design:type", Object)
], PermissionData.prototype, "administrativePermissionsPerProject", void 0);
PermissionData = __decorate([
    JsonObject('PermissionData')
], PermissionData);

let User = class User {
    constructor() {
        this.id = undefined;
        this.email = undefined;
        this.username = undefined;
        this.password = undefined;
        this.token = undefined;
        this.givenName = undefined;
        this.familyName = undefined;
        this.status = undefined;
        this.lang = undefined;
        this.groups = undefined;
        this.projects = undefined;
        this.sessionId = undefined;
        this.permissions = undefined;
        this.systemAdmin = false;
    }
};
__decorate([
    JsonProperty('id', String),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    JsonProperty('email', String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    JsonProperty('username', String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    JsonProperty('password', String, true),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    JsonProperty('token', String, true),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    JsonProperty('givenName', String),
    __metadata("design:type", String)
], User.prototype, "givenName", void 0);
__decorate([
    JsonProperty('familyName', String),
    __metadata("design:type", String)
], User.prototype, "familyName", void 0);
__decorate([
    JsonProperty('status', Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    JsonProperty('lang', String),
    __metadata("design:type", String)
], User.prototype, "lang", void 0);
__decorate([
    JsonProperty('groups', [Group]),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    JsonProperty('projects', [Project]),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
__decorate([
    JsonProperty('sessionId', String, true),
    __metadata("design:type", String)
], User.prototype, "sessionId", void 0);
__decorate([
    JsonProperty('permissions', PermissionData),
    __metadata("design:type", PermissionData)
], User.prototype, "permissions", void 0);
__decorate([
    JsonProperty('systemAdmin', Boolean, true),
    __metadata("design:type", Boolean)
], User.prototype, "systemAdmin", void 0);
User = __decorate([
    JsonObject('User')
], User);

let ProjectMembersResponse = class ProjectMembersResponse {
    constructor() {
        this.members = undefined;
    }
};
__decorate([
    JsonProperty('members', [User]),
    __metadata("design:type", Array)
], ProjectMembersResponse.prototype, "members", void 0);
ProjectMembersResponse = __decorate([
    JsonObject('ProjectMembersResponse')
], ProjectMembersResponse);

let ProjectResponse = class ProjectResponse {
    constructor() {
        this.project = undefined;
    }
};
__decorate([
    JsonProperty('project', Project),
    __metadata("design:type", Project)
], ProjectResponse.prototype, "project", void 0);
ProjectResponse = __decorate([
    JsonObject('ProjectResponse')
], ProjectResponse);

let ProjectsResponse = class ProjectsResponse {
    constructor() {
        this.projects = undefined;
    }
};
__decorate([
    JsonProperty('projects', [Project]),
    __metadata("design:type", Array)
], ProjectsResponse.prototype, "projects", void 0);
ProjectsResponse = __decorate([
    JsonObject('ProjectsResponse')
], ProjectsResponse);

let CurrentUser = class CurrentUser {
    constructor() {
        this.name = undefined;
        this.jwt = undefined;
        this.lang = undefined;
        this.sysAdmin = undefined;
    }
};
__decorate([
    JsonProperty('name', String),
    __metadata("design:type", String)
], CurrentUser.prototype, "name", void 0);
__decorate([
    JsonProperty('jwt', String, true),
    __metadata("design:type", String)
], CurrentUser.prototype, "jwt", void 0);
__decorate([
    JsonProperty('lang', String, true),
    __metadata("design:type", String)
], CurrentUser.prototype, "lang", void 0);
__decorate([
    JsonProperty('sysAdmin', Boolean),
    __metadata("design:type", Boolean)
], CurrentUser.prototype, "sysAdmin", void 0);
CurrentUser = __decorate([
    JsonObject
], CurrentUser);

let UsersResponse = class UsersResponse {
    constructor() {
        this.users = undefined;
    }
};
__decorate([
    JsonProperty('users', [User]),
    __metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
UsersResponse = __decorate([
    JsonObject('UsersResponse')
], UsersResponse);

let UserResponse = class UserResponse {
    constructor() {
        this.user = undefined;
    }
};
__decorate([
    JsonProperty('user', User),
    __metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    JsonObject('UserResponse')
], UserResponse);

/**
 * Abstract class representing a text value object with or without markup.
 */
class ReadTextValue {
    constructor() {
        this.type = KnoraConstants.TextValue;
    }
}
/**
 * Represents a text value object without markup (mere character string).
 */
class ReadTextValueAsString extends ReadTextValue {
    constructor(id, propIri, str) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.str = str;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsString;
    }
    getContent() {
        return this.str;
    }
}
/**
 * Represents resources referred to by standoff links.
 */
class ReferredResourcesByStandoffLink {
}
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
class ReadTextValueAsHtml extends ReadTextValue {
    constructor(id, propIri, html, referredResources) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.html = html;
        this.referredResources = referredResources;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    getReferredResourceInfo(resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + ` (${resClassLabel})`;
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsHtml;
    }
    getContent() {
        return this.html;
    }
}
/**
 * Represents a text value object with markup as XML.
 */
class ReadTextValueAsXml extends ReadTextValue {
    constructor(id, propIri, xml, mappingIri) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.xml = xml;
        this.mappingIri = mappingIri;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsXml;
    }
    getContent() {
        return this.xml;
    }
}
/**
 * Represents a date value object.
 */
class ReadDateValue {
    constructor(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
        this.id = id;
        this.propIri = propIri;
        this.calendar = calendar;
        this.startYear = startYear;
        this.endYear = endYear;
        this.startEra = startEra;
        this.endEra = endEra;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
        this.startDay = startDay;
        this.endDay = endDay;
        this.type = KnoraConstants.DateValue;
        this.separator = '/';
    }
    getDateSalsah() {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    }
    getClassName() {
        return KnoraConstants.ReadDateValue;
    }
    getContent() {
        return this.getDateSalsah().getDateAsString();
    }
}
/**
 * Represents a link value object (reification).
 */
class ReadLinkValue {
    constructor(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    getReferredResourceInfo(ontologyInfo) {
        if (this.referredResource !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + ` (${resClassLabel})`;
        }
        else {
            return this.referredResourceIri;
        }
    }
    getClassName() {
        return KnoraConstants.ReadLinkValue;
    }
    getContent() {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    }
}
/**
 * Represents an integer value object.
 */
class ReadIntegerValue {
    constructor(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntegerValue;
    }
    getContent() {
        return this.integer.toString();
    }
}
/**
 * Represents a decimal value object.
 */
class ReadDecimalValue {
    constructor(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    getClassName() {
        return KnoraConstants.ReadDecimalValue;
    }
    getContent() {
        return this.decimal.toString();
    }
}
/**
 * Represents a still image value object.
 */
class ReadStillImageFileValue {
    constructor(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
        this.id = id;
        this.propIri = propIri;
        this.imageFilename = imageFilename;
        this.imageServerIIIFBaseURL = imageServerIIIFBaseURL;
        this.imagePath = imagePath;
        this.dimX = dimX;
        this.dimY = dimY;
        this.type = KnoraConstants.StillImageFileValue;
        // if the image is a jpeg, it is a preview image
        this.isPreview = imageFilename.endsWith('.jpg');
    }
    makeIIIFUrl(reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            let percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    }
    getClassName() {
        return KnoraConstants.ReadStillImageFileValue;
    }
    getContent() {
        return this.imagePath;
    }
}
/**
 * Represents a text representation value object
 */
class ReadTextFileValue {
    constructor(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadTextFileValue;
    }
    getContent() {
        return this.textFileURL;
    }
}
/**
 * Represents a color value object.
 */
class ReadColorValue {
    constructor(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    getClassName() {
        return KnoraConstants.ReadColorValue;
    }
    getContent() {
        return this.colorHex;
    }
}
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Represents a geometry value parsed from JSON.
 */
class RegionGeometry {
    constructor(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
}
/**
 * Represents a geometry value object.
 */
class ReadGeomValue {
    constructor(id, propIri, geometryString) {
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        const geometryJSON = JSON.parse(geometryString);
        const points = [];
        for (const point of geometryJSON.points) {
            points.push(new Point2D(point.x, point.y));
        }
        let radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    getClassName() {
        return KnoraConstants.ReadGeomValue;
    }
    getContent() {
        return this.geometryString;
    }
}
/**
 * Represents a URI value object.
 */
class ReadUriValue {
    constructor(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    getClassName() {
        return KnoraConstants.ReadUriValue;
    }
    getContent() {
        return this.uri;
    }
}
/**
 * Represents a Boolean value object.
 */
class ReadBooleanValue {
    constructor(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    getClassName() {
        return KnoraConstants.ReadBooleanValue;
    }
    getContent() {
        return this.bool.toString();
    }
}
/**
 * Represents an interval value object.
 */
class ReadIntervalValue {
    constructor(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntervalValue;
    }
    getContent() {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    }
}
/**
 * Represents an interval value object.
 */
class ReadListValue {
    constructor(id, propIri, listNodeIri, listNodeLabel) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.listNodeLabel = listNodeLabel;
        this.type = KnoraConstants.ListValue;
    }
    getClassName() {
        return KnoraConstants.ReadListValue;
    }
    getContent() {
        return this.listNodeLabel;
    }
}

/**
 * Represents a resource and its properties.
 */
class ReadResource {
    /**
     *
     * @param {string} id the resource's Iri.
     * @param {string} type the resource's type (class).
     * @param {string} label the resource's rdfs:label.
     * @param {Array<ReadResource>} incomingRegions regions pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingStillImageRepresentations still image representations pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingLinks resources pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {StillImageRepresentation[]} stillImageRepresentationsToDisplay  still image representations to be displayed for this resource, if any (possibly to be queried by additional requests).
     * @param {ReadProperties} properties the resources's properties.
     */
    constructor(id, type, label, incomingRegions, incomingStillImageRepresentations, incomingLinks, stillImageRepresentationsToDisplay, properties) {
        this.id = id;
        this.type = type;
        this.label = label;
        this.incomingRegions = incomingRegions;
        this.incomingStillImageRepresentations = incomingStillImageRepresentations;
        this.incomingLinks = incomingLinks;
        this.stillImageRepresentationsToDisplay = stillImageRepresentationsToDisplay;
        this.properties = properties;
    }
}

/**
 * Represents a sequence of resources.
 */
class ReadResourcesSequence {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
    }
}

/**
 * Represents an image including its regions.
 */
class StillImageRepresentation {
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    constructor(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
}

/**
 * Represents a region.
 * Contains a reference to the resource representing the region and its geometries.
 */
class ImageRegion {
    /**
     *
     * @param {ReadResource} regionResource a resource of type Region
     */
    constructor(regionResource) {
        this.regionResource = regionResource;
    }
    /**
     * Get all geometry information belonging to this region.
     *
     * @returns {ReadGeomValue[]}
     */
    getGeometries() {
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    }
}

const ɵ0 = KuiCoreConfig;
class KuiCoreModule {
    /**
     *
     * @param {KuiCoreConfig} config
     * @returns {ModuleWithProviders}
     */
    static forRoot(config) {
        // get the app environment configuration here
        // console.log(config);
        return {
            ngModule: KuiCoreModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    }
}
KuiCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule
                ],
                declarations: [],
                exports: [
                    HttpClientModule
                ],
                providers: [
                    { provide: 'config', useValue: ɵ0 }
                ]
            },] },
];

class ApiService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        /**
         *  if is loading, set it true;
         *  it can be used in components
         *  for progress loader element
         */
        this.loading = false;
    }
    /**
     * GET
     *
     * @param {string} path
     * @returns {Observable<any>}
     */
    httpGet(path, params) {
        this.loading = true;
        return this.http.get(this.config.api + path, { observe: 'response', params: params }).pipe(map((response) => {
            this.loading = false;
            const result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError((error) => {
            this.loading = false;
            return this.handleRequestError(error);
        }));
    }
    /**
     * POST
     *
     * @param {string} path
     * @param body
     * @returns {Observable<any>}
     */
    httpPost(path, body) {
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.post(this.config.api + path, body, { observe: 'response' }).pipe(map((response) => {
            this.loading = false;
            const result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError((error) => {
            this.loading = false;
            // console.error(error);
            return this.handleRequestError(error);
        }));
    }
    /**
     * PUT
     *
     * @param {string} path
     * @param body
     * @returns {Observable<any>}
     */
    httpPut(path, body) {
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.put(this.config.api + path, body, { observe: 'response' }).pipe(map((response) => {
            this.loading = false;
            // console.log(response);
            const result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError((error) => {
            this.loading = false;
            // console.error(error);
            return this.handleRequestError(error);
        }));
    }
    /**
     * DELETE
     *
     * @param {string} path
     * @returns {Observable<any>}
     */
    httpDelete(path) {
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.delete(this.config.api + path, { observe: 'response' }).pipe(map((response) => {
            this.loading = false;
            // console.log(response);
            const result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError((error) => {
            this.loading = false;
            // console.error(error);
            return this.handleRequestError(error);
        }));
    }
    /**
     * handle request error in case of server error
     *
     * @param {HttpErrorResponse} error
     * @returns {Observable<ApiServiceError>}
     */
    handleRequestError(error) {
        // console.error(error);
        const serviceError = new ApiServiceError();
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    }
    /**
     * handle json error in case of type error in json response (json2typescript)
     *
     * @param error
     * @returns {Observable<ApiServiceError>}
     */
    handleJsonError(error) {
        if (error instanceof ApiServiceError)
            return throwError(error);
        const serviceError = new ApiServiceError();
        serviceError.status = -1;
        serviceError.statusText = 'Invalid JSON';
        serviceError.errorInfo = error;
        serviceError.url = '';
        return throwError(serviceError);
    }
}
ApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
/** @nocollapse */
ApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient), inject("config")); }, token: ApiService, providedIn: "root" });

class GroupsService extends ApiService {
    constructor() {
        super(...arguments);
        this.path = '/admin/groups';
    }
    /**
     *
     * @returns {Observable<Group[]>}
     */
    getAllGroups() {
        return this.httpGet(this.path).pipe(map((result) => result.getBody(GroupsResponse).groups), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} iri
     * @returns {Observable<Group>}
     */
    getGroupByIri(iri) {
        this.path += '/' + encodeURIComponent(iri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(GroupResponse).group), catchError(this.handleJsonError));
    }
}
GroupsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
GroupsService.ngInjectableDef = defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(inject(HttpClient), inject("config")); }, token: GroupsService, providedIn: "root" });

class ListsService extends ApiService {
    constructor() {
        super(...arguments);
        this.path = '/admin/lists';
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     *
     * @param {string} projectIri (optional)
     * @returns {Observable<ListNodeInfo[]>}
     */
    getLists(projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListsResponse).lists), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} listIri
     * @returns {Observable<List>}
     */
    getList(listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} listIri
     * @returns {Observable<ListInfo>}
     */
    getListInfo(listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} nodeIri
     * @returns {Observable<ListNodeInfo>}
     */
    getListNodeInfo(nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListNodeInfoResponse).nodeinfo), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     *
     * @param {ListCreatePayload} payload
     * @returns {Observable<List>}
     */
    createList(payload) {
        return this.httpPost(this.path, payload).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns {Observable<ListInfo>}
     */
    updateListInfo(payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
}
ListsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ListsService.ngInjectableDef = defineInjectable({ factory: function ListsService_Factory() { return new ListsService(inject(HttpClient), inject("config")); }, token: ListsService, providedIn: "root" });

class ProjectsService extends ApiService {
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * returns a list of all projects
     *
     * @returns {Observable<Project[]>}
     */
    getAllProjects() {
        return this.httpGet('/admin/projects').pipe(map((result) => result.getBody(ProjectsResponse).projects), catchError(this.handleJsonError));
    }
    /**
     * returns a project object
     *
     * @param {string} iri
     * @returns {Observable<Project>}
     */
    getProjectByIri(iri) {
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    }
    /**
     * returns a project object
     *
     * @param {string} shortname
     * @returns {Observable<Project>}
     */
    getProjectByShortname(shortname) {
        const url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    }
    /**
     * returns a project object
     *
     * @param {string} shortcode
     * @returns {Observable<Project>}
     */
    getProjectByShortcode(shortcode) {
        const url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    }
    /**
     * Helper method combining project retrieval
     *
     * @param {string} url
     * @returns {Observable<Project>}
     */
    getProject(url) {
        return this.httpGet(url).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    /**
     * returns all project members
     * project identifier is project id (iri)
     *
     * @param {string} iri
     * @returns {Observable<User[]>}
     */
    getProjectMembersByIri(iri) {
        const url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    }
    /**
     * returns all project members
     * project identifier is shortname
     *
     * @param {string} shortname
     * @returns {Observable<User[]>}
     */
    getProjectMembersByShortname(shortname) {
        const url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    }
    /**
     * returns all project members
     * project identifier is shortcode
     *
     * @param {string} shortcode
     * @returns {Observable<User[]>}
     */
    getProjectMembersByShortcode(shortcode) {
        const url = '/admin/projects/members/' + shortcode + '?identifier=shortcode';
        return this.getProjectMembers(url);
    }
    /**
     * Helper method combining project member retrieval
     *
     * @param {string} url
     * @returns {Observable<User[]>}
     */
    getProjectMembers(url) {
        return this.httpGet(url).pipe(map((result) => result.getBody(ProjectMembersResponse).members), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * create new project
     *
     * @param data
     * @returns {Observable<Project>}
     */
    createProject(data) {
        const url = '/admin/projects';
        return this.httpPost(url, data).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * edit project data
     *
     * @param {string} iri
     * @param data
     * @returns {Observable<Project>}
     */
    updateProject(iri, data) {
        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map((result) => result.getBody(ProjectResponse).project), catchError(this.handleJsonError));
    }
    /**
     * activate project (if it was deleted)
     *
     * @param {string} iri
     * @returns {Observable<Project>}
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
     * Delete (set inactive) project
     *
     * @param {string} iri
     * @returns {Observable<Project>}
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
ProjectsService.ngInjectableDef = defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(inject(HttpClient), inject("config")); }, token: ProjectsService, providedIn: "root" });

class UsersService extends ApiService {
    constructor() {
        super(...arguments);
        this.usersUrl = this.config.api + '/admin/users';
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * returns a list of all users
     *
     * @returns {Observable<User[]>}
     */
    getAllUsers() {
        return this.httpGet('/admin/users').pipe(map((result) => result.getBody(UsersResponse).users), catchError(this.handleJsonError));
    }
    /**
     * Get user by username, email or by iri
     *
     * @param {string} identifier
     * @returns {Observable<User>}
     */
    getUser(identifier) {
        const path = '/admin/users/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     *
     * @param data
     * @returns {Observable<User>}
     */
    createUser(data) {
        const path = '/admin/users';
        return this.httpPost(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    addUserToProject(userIri, projectIri) {
        const path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    addUserToProjectAdmin(userIri, projectIri) {
        const path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    removeUserFromProjectAdmin(userIri, projectIri) {
        const path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    addUserToSystemAdmin(userIri, data) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    activateUser(userIri) {
        const data = {
            status: true
        };
        return this.updateUser(userIri, data);
    }
    /**
     * Update own password
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Observable<User>}
     */
    updateOwnPassword(userIri, oldPassword, newPassword) {
        const data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.updateUser(userIri, data);
    }
    updateUsersPassword(userIri, requesterPassword, newPassword) {
        const data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    }
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    updateUser(userIri, data) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    deleteUser(userIri) {
        const path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map((result) => result.getBody(UserResponse).user), catchError(this.handleJsonError));
    }
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
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
UsersService.ngInjectableDef = defineInjectable({ factory: function UsersService_Factory() { return new UsersService(inject(HttpClient), inject("config")); }, token: UsersService, providedIn: "root" });

class LanguageService {
    constructor() {
        this.subject = new Subject();
    }
    setLanguage(lang) {
        this.subject.next({ var: lang });
    }
    getLanguage() {
        return this.subject.asObservable();
    }
}
LanguageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
LanguageService.ngInjectableDef = defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(); }, token: LanguageService, providedIn: "root" });

class StatusMsgService {
    constructor(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    getStatusMsg() {
        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map((res) => {
            return res;
        }, err => {
            console.error(err);
        }));
    }
    ;
}
StatusMsgService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
StatusMsgService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
StatusMsgService.ngInjectableDef = defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(inject(HttpClient), inject("config")); }, token: StatusMsgService, providedIn: "root" });

/**
 * Requests ontology information from Knora.
 */
class OntologyService extends ApiService {
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns the metadata of all ontologies.
     */
    getOntologiesMetadata() {
        return this.httpGet('/v2/ontologies/metadata');
    }
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    }
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns the requested resource class definitions.
     */
    getResourceClasses(resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'));
        }
        let resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    }
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param propertyIris the Iris of the properties to be queried.
     * @returns the requested properties.
     */
    getProperties(propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No property Iris given for call of OntologyService.getProperties'));
        }
        let propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    }
}
OntologyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
OntologyService.ngInjectableDef = defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(inject(HttpClient), inject("config")); }, token: OntologyService, providedIn: "root" });

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
class OntologyMetadata {
    /**
     *
     * @param id Iri identifying the ontology.
     * @param label a label describing the ontology.
     */
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
}
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
var CardinalityOccurrence;
(function (CardinalityOccurrence) {
    CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
    CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
    CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
})(CardinalityOccurrence || (CardinalityOccurrence = {}));
/**
 * Cardinality of a property for the given resource class.
 */
class Cardinality {
    /**
     *
     * @param occurrence type of given occurrence.
     * @param value numerical value of given occurrence.
     * @param property the property the given occurrence applies to.
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
class ResourceClass {
    /**
     *
     * @param id Iri identifying the resource class.
     * @param icon path to an icon representing the resource class.
     * @param comment comment on the resource class.
     * @param label label describing the resource class.
     * @param cardinalities the resource class's properties.
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
class ResourceClasses {
}
/**
 * A property definition.
 */
class Property {
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
class Properties {
}
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
class ResourceClassIrisForOntology {
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
class OntologyInformation {
    /**
     *
     * @param resourceClassesForOntology all resource class Iris for a given ontology.
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
     *
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @params ontologyInfo the given definitions that have to be integrated.
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
     * @returns all resource class definitions grouped by ontologies.
     */
    getResourceClassForOntology() {
        return this.resourceClassesForOntology;
    }
    /**
     * Returns all resource classes as an object.
     *
     * @returns all resource class definitions as an object.
     */
    getResourceClasses() {
        return this.resourceClasses;
    }
    /**
     * Returns all resource classes as an array.
     *
     * @returns {Array<ResourceClass>}
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
     * @param resClass resource class to query for.
     * @returns the resource class's label.
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
     * @returns all properties as an object.
     */
    getProperties() {
        return this.properties;
    }
    /**
     * Returns all properties as an array.
     *
     * @returns all properties as an array.
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
     * @param property to query for.
     * @returns the property's label.
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
class OntologyCacheService {
    constructor(_ontologyService) {
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
     * @param ontologyIri the Iri of the requested ontology.
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
     * @param {string[]} ontologies metadata of all existing ontologies as JSON-LD.
     */
    convertAndWriteOntologiesMetadataToCache(ontologies) {
        this.cacheOntology.ontologies = ontologies.map(ontology => {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    }
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns metadata of all existing ontologies.
     */
    getAllOntologiesMetadataFromCache() {
        return this.cacheOntology.ontologies;
    }
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param classDefinitions the class definitions in an ontology response.
     * @returns resource class Iris from the given class definitions.
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
     * @param ontologyIris the ontologies for which definitions should be returned.
     * @returns the definitions for the requested ontologies.
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
     * @param resourceClassDefinitions the resource class definitions returned by Knora.
     * @param propertyClassDefinitions the property definitions returned by Knora.
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
     * @param resClassIris the given resource class Iris
     * @returns {ResourceClasses} an [[OntologyCache]] representing the requested resource classes.
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
     * @param propertyDefinitionsFromKnora the property definitions returned by Knora
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
     * @param propertyIris the property definitions to be returned.
     * @returns requested property defintions.
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
     * @returns metadata about all ontologies.
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
     * @param ontologyIris Iris of the ontologies to be requested.
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
     * @param ontologyIris Iris of the ontologies to be queried.
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
     * @param resourceClassIris the given resource class Iris
     * @returns the requested resource classes (including properties).
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
     * @returns the requested property definitions.
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
OntologyCacheService.ngInjectableDef = defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });

class ResourceService extends ApiService {
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param iri Iri of the resource (already URL encoded).
     * @returns {Observable<any>}
     */
    getResource(iri) {
        // console.log('IRI from resource service: ', iri);
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    }
}
ResourceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ResourceService.ngInjectableDef = defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(inject(HttpClient), inject("config")); }, token: ResourceService, providedIn: "root" });

class SearchService extends ApiService {
    /**
     * Perform a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearch(searchTerm, offset = 0) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        return this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);
    }
    /**
     * Perform a fulltext search count query.
     *
     * @param searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearchCountQuery(searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    }
    /**
     * Perform an extended search.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<any>}
     */
    doExtendedSearch(sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }
        // return this.httpGet('/v2/searchextended/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended', sparqlString);
    }
    /**
     * Perform an extended search count query.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    doExtendedSearchCountQuery(sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }
        // return this.httpGet('/v2/searchextended/count/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended/count', sparqlString);
    }
    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param resourceClassIRI restrict search to given resource class.
     * @param projectIri restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
     */
    searchByLabel(searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        const params = {};
        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }
        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), params);
        // return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm));
    }
}
SearchService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
SearchService.ngInjectableDef = defineInjectable({ factory: function SearchService_Factory() { return new SearchService(inject(HttpClient), inject("config")); }, token: SearchService, providedIn: "root" });

/**
 * Contains methods to convert JSON-LD representing resources and properties to classes.
 * These methods works only for instances of resources and properties, not for ontologies (data model).
 */
var ConvertJSONLD;
(function (ConvertJSONLD) {
    /**
     * Function to be passed to a filter used on an array of property names
     * sorting out all non value property names.
     *
     * Gets all property names that refer to value objects.
     *
     * @param propName the name of a property to be checked.
     * @returns Boolean indicating if the name refers to a value property.
     */
    const getPropertyNames = (propName) => {
        return propName !== '@id'
            && propName !== '@type'
            && propName !== KnoraConstants.RdfsLabel
            && propName !== KnoraConstants.attachedToProject
            && propName !== KnoraConstants.attachedToUser
            && propName !== KnoraConstants.creationDate
            && propName !== KnoraConstants.lastModificationDate
            && propName !== KnoraConstants.hasPermissions;
    };
    /**
     * Constructs a [[ReadResource]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourceJSONLD an a resource and its properties serialized as JSON-LD.
     * @returns a [[ReadResource]].
     */
    function constructReadResource(resourceJSONLD) {
        const properties = constructReadProperties(resourceJSONLD);
        return new ReadResource(resourceJSONLD['@id'], resourceJSONLD['@type'], resourceJSONLD[KnoraConstants.RdfsLabel], [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        properties);
    }
    /**
     * Constructs a [[ReadPropertyItem]] from JSON-LD,
     * taking into account the property's value type.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param propValue the value serialized as JSON-LD.
     * @param propIri the Iri of the property.
     * @param standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue, propIri, standoffLinkValues) {
        // convert a JSON-LD property value to a `ReadPropertyItem`
        let valueSpecificProp;
        // check for the property's value type
        switch (propValue['@type']) {
            case KnoraConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                let textValue;
                if (propValue[KnoraConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                }
                else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                    const referredResources = {};
                    // check for standoff links and include referred resources, if any
                    // when the user interacts with a standoff link, further information about the referred resource can be shown
                    for (const standoffLink of standoffLinkValues) {
                        const referredRes = standoffLink.referredResource;
                        referredResources[referredRes.id] = referredRes;
                    }
                    textValue = new ReadTextValueAsHtml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsHtml], referredResources);
                }
                else if (propValue[KnoraConstants.textValueAsXml] !== undefined && propValue[KnoraConstants.textValueHasMapping]['@id'] !== undefined) {
                    textValue = new ReadTextValueAsXml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsXml], propValue[KnoraConstants.textValueHasMapping]['@id']);
                }
                else {
                    // expected text value members not defined
                    console.error('ERROR: Invalid text value: ' + JSON.stringify(propValue));
                }
                valueSpecificProp = textValue;
                break;
            case KnoraConstants.DateValue:
                const dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                valueSpecificProp = dateValue;
                break;
            case KnoraConstants.LinkValue:
                let linkValue;
                // check if the referred resource is given as an object or just as an IRI
                if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object
                    const referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                }
                else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri
                    const referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                }
                else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object
                    const incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                }
                else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri
                    const incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }
                valueSpecificProp = linkValue;
                break;
            case KnoraConstants.IntValue:
                const intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;
                break;
            case KnoraConstants.DecimalValue:
                // a decimal value is represented as a string in order to preserve its precision
                const decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                const decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;
                break;
            case KnoraConstants.StillImageFileValue:
                const stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                valueSpecificProp = stillImageFileValue;
                break;
            case KnoraConstants.TextFileValue:
                const textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                valueSpecificProp = textFileValue;
                break;
            case KnoraConstants.ColorValue:
                const readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                valueSpecificProp = readColorValue;
                break;
            case KnoraConstants.GeomValue:
                const readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                valueSpecificProp = readGeomValue;
                break;
            case KnoraConstants.UriValue:
                const uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                valueSpecificProp = uriValue;
                break;
            case KnoraConstants.BooleanValue:
                const boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                valueSpecificProp = boolValue;
                break;
            case KnoraConstants.IntervalValue:
                // represented as strings to preserve precision
                const intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                const intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                const intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                valueSpecificProp = intervalValue;
                break;
            case KnoraConstants.ListValue:
                const listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
                valueSpecificProp = listValue;
                break;
            default:
                // unsupported value type
                console.error('ERROR: value type not implemented yet: ' + propValue['@type']);
                break;
        }
        return valueSpecificProp;
    }
    /**
     * Construct a [[ReadProperties]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourceJSONLD an object describing the resource and its properties.
     * @returns a [[ReadProperties]].
     */
    function constructReadProperties(resourceJSONLD) {
        // JSON-LD representing standoff link values
        // text values may contain standoff links
        const standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
        // to be populated with standoff link values
        const standoffLinkValues = [];
        // convert each standoff link value JSON-LD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            for (const standoffLinkJSONLD of standoffLinkValuesJSONLD) {
                const standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                standoffLinkValues.push(standoffVal);
            }
        }
        else if (standoffLinkValuesJSONLD !== undefined) {
            const standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
            standoffLinkValues.push(standoffVal);
        }
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const properties = {};
        // iterate over all the given property names
        for (const propName of propNames) {
            const propValues = [];
            // either an array of values or just one value is given
            if (Array.isArray(resourceJSONLD[propName])) {
                // array of values
                // for each property name, an array of property values is given, iterate over it
                for (const propValue of resourceJSONLD[propName]) {
                    // convert a JSON-LD property value to a `ReadPropertyItem`
                    const valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined)
                        propValues.push(valueSpecificProp);
                }
            }
            else {
                // only one value
                const valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                // if it is undefined, the value could not be constructed correctly
                // add the property value to the array of property values
                if (valueSpecificProp !== undefined)
                    propValues.push(valueSpecificProp);
            }
            // add the property to the properties object
            properties[propName] = propValues;
        }
        return properties;
    }
    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns a [[ReadResourcesSequence]].
     */
    function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD) {
        const resources = [];
        let numberOfResources;
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;
            for (const resourceJSONLD of resourcesGraph) {
                const resource = constructReadResource(resourceJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        else {
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                // empty answer, no resources given
                numberOfResources = 0;
            }
            else {
                // only one resource
                numberOfResources = 1;
                const resource = constructReadResource(resourcesResponseJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        return new ReadResourcesSequence(resources, numberOfResources);
    }
    ConvertJSONLD.createReadResourcesSequenceFromJsonLD = createReadResourcesSequenceFromJsonLD;
    /**
     * Collects all the types (classes) of referred resources from a given resource (from its linking properties).
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {Object} resourceJSONLD JSON-LD describing one resource.
     * @return an Array of resource class Iris (including duplicates).
     */
    function getReferredResourceClasses(resourceJSONLD) {
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const referredResourceClasses = [];
        for (const prop of propNames) {
            // several values given for this property
            if (Array.isArray(resourceJSONLD[prop])) {
                for (const referredRes of resourceJSONLD[prop]) {
                    // if the property is a LinkValue and it contains an embedded resource, get its type
                    if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasTarget] !== undefined) {
                        // target resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasTarget]['@type']);
                    }
                    else if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasSource] !== undefined) {
                        // source resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasSource]['@type']);
                    }
                }
            }
            else {
                // only one value given for this property
                // if the property is a LinkValue and it contains an embedded resource, get its type
                if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]
                    !== undefined) {
                    // target resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]['@type']);
                }
                else if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasSource]
                    !== undefined) {
                    // source resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasSource]['@type']);
                }
            }
        }
        return referredResourceClasses;
    }
    /**
     * Gets the resource types (classes) from a JSON-LD representing a sequence of resources.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns {Array<String>} the resource class Iris (without duplicates).
     */
    function getResourceClassesFromJsonLD(resourcesResponseJSONLD) {
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        let resourceClasses = [];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            for (const resourceJSONLD of resourcesGraph) {
                // get class of the current resource
                resourceClasses.push(resourceJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        else {
            // only one resource
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                return [];
            }
            else {
                resourceClasses.push(resourcesResponseJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
})(ConvertJSONLD || (ConvertJSONLD = {}));

class IncomingService extends SearchService {
    /**
       * Returns all incoming regions for a particular resource.
       */
    getIncomingRegions(resourceIRI, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?region knora-api:isMainResource true .

?region knora-api:hasGeometry ?geom .

?region knora-api:hasComment ?comment .

?region knora-api:hasColor ?color .
} WHERE {
?region a knora-api:Region .
?region a knora-api:Resource .

?region knora-api:isRegionOf <${resourceIRI}> .
knora-api:isRegionOf knora-api:objectType knora-api:Resource .

<${resourceIRI}> a knora-api:Resource .

?region knora-api:hasGeometry ?geom .
knora-api:hasGeometry knora-api:objectType knora-api:Geom .

?geom a knora-api:Geom .

?region knora-api:hasComment ?comment .
knora-api:hasComment knora-api:objectType xsd:string .

?comment a xsd:string .

?region knora-api:hasColor ?color .
knora-api:hasColor knora-api:objectType knora-api:Color .

?color a knora-api:Color .
} OFFSET ${offset}
`;
        // console.log('sparqlQueryStr ', sparqlQueryStr);
        return this.doExtendedSearch(sparqlQueryStr);
    }
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    getStillImageRepresentationsForCompoundResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?page knora-api:isMainResource true .

?page knora-api:seqnum ?seqnum .

?page knora-api:hasStillImageFile ?file .
} WHERE {

?page a knora-api:StillImageRepresentation .
?page a knora-api:Resource .

?page knora-api:isPartOf <${resourceIri}> .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

<${resourceIri}> a knora-api:Resource .

?page knora-api:seqnum ?seqnum .
knora-api:seqnum knora-api:objectType xsd:integer .

?seqnum a xsd:integer .

?page knora-api:hasStillImageFile ?file .
knora-api:hasStillImageFile knora-api:objectType knora-api:File .

?file a knora-api:File .

} ORDER BY ?seqnum
OFFSET ${offset}
`;
        return this.doExtendedSearch(sparqlQueryStr);
    }
    /**
     *
     * Returns all incoming links for the given resource Iri
     * but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     */
    getIncomingLinksForResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?incomingRes knora-api:isMainResource true .

?incomingRes ?incomingProp <${resourceIri}> .

} WHERE {

?incomingRes a knora-api:Resource .

?incomingRes ?incomingProp <${resourceIri}> .

<${resourceIri}> a knora-api:Resource .

?incomingProp knora-api:objectType knora-api:Resource .

knora-api:isRegionOf knora-api:objectType knora-api:Resource .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isRegionOf <${resourceIri}> .
}

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isPartOf <${resourceIri}> .
}

} OFFSET ${offset}
`;
        return this.doExtendedSearch(sparqlQueryStr);
    }
}
IncomingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
IncomingService.ngInjectableDef = defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(inject(HttpClient), inject("config")); }, token: IncomingService, providedIn: "root" });

/**
 * Represents the parameters of an extended search.
 */
class ExtendedSearchParams {
    /**
     *
     * @param generateGravsearch a function that generates a Gravsearch query.
     *
     *                           The function takes the offset
     *                           as a parameter and returns a Gravsearch query string.
     *                           Returns false if not set correctly (init state).
     */
    constructor(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
}
/**
 * Temporarily stores the parameters of an extended search.
 */
class SearchParamsService {
    constructor() {
        // init with a dummy function that returns false
        // if the application is reloaded, this will be returned
        this._currentSearchParams = new BehaviorSubject(new ExtendedSearchParams((offset) => false));
    }
    /**
     * Updates the parameters of an extended search.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    changeSearchParamsMsg(searchParams) {
        this._currentSearchParams.next(searchParams);
    }
    /**
     * Gets the search params of an extended search.
     *
     * @returns {ExtendedSearchParams}
     */
    getSearchParams() {
        return this._currentSearchParams.getValue();
    }
}
SearchParamsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
SearchParamsService.ctorParameters = () => [];
SearchParamsService.ngInjectableDef = defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });

/**
 * Represents an error that occurred when generating KnarQL.
 */
class GravsearchGenerationError extends Error {
    constructor(msg) {
        super(msg);
    }
}
class GravsearchGenerationService {
    constructor(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns {string} the corresponding Iri of the simple type (knora-api simple).
       */
    convertComplexTypeToSimpleType(complexType) {
        const simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
        if (simpleType !== undefined) {
            return simpleType;
        }
        else {
            throw new GravsearchGenerationError(`complex type ${complexType} could not be converted to simple type.`);
        }
    }
    /**
       * Generates a Gravsearch query from the provided arguments.
       *
       * @param {PropertyWithValue[]} properties the properties specified by the user.
       * @param {string} mainResourceClassOption the class of the main resource, if specified.
       * @param offset the offset to be used (nth page of results).
       * @returns {string} a KnarQL query string.
       */
    createGravsearchQuery(properties, mainResourceClassOption, offset = 0) {
        // class restriction for the resource searched for
        let mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = `?mainRes a <${Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption)}> .`;
        }
        // criteria for the order by statement
        const orderByCriteria = [];
        // statements to be returned in query results
        const returnStatements = [];
        // loop over given properties and create statements and Filters and type annotations from them
        const props = properties.map((propWithVal, index) => {
            const propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
            let simpleType;
            if (!propWithVal.property.isLinkProperty) {
                simpleType = this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
            }
            else {
                simpleType = KnoraConstants.resourceSimple;
            }
            // represents the object of a statement
            let propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = `?propVal${index}`;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple);
            }
            // generate statement
            let statement = `?mainRes <${propIriSimple}> ${propValue} .`;
            // type annotations
            const propTypeAnnotation = `<${propIriSimple}> knora-api:objectType <${simpleType}> .`;
            const propValueAnnotation = `${propValue} a <${simpleType}> .`;
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = `FILTER NOT EXISTS {
${statement}
${propTypeAnnotation}
${propValueAnnotation}
}`;
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = `
${statement}
${propTypeAnnotation}
${propValueAnnotation}
`;
            }
            // generate filter if comparison operator is not Exists
            let filter = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // use regex function for LIKE
                    filter = `FILTER regex(${propValue}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)}, "i")`;
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // use contains function for MATCH
                    filter = `FILTER <${KnoraConstants.matchFunction}>(${propValue}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)})`;
                }
                else {
                    filter = `FILTER(${propValue} ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple)})`;
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return `${statement}
${filter}
`;
        });
        let orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = `
ORDER BY ${orderByCriteria.join(' ')}
`;
        }
        // template of the KnarQL query with dynamic components
        const gravsearchTemplate = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
CONSTRUCT {

?mainRes knora-api:isMainResource true .

${returnStatements.join('\n')}

} WHERE {

?mainRes a knora-api:Resource .

${mainResourceClass}

${props.join('')}

}
${orderByStatement}`;
        // offset component of the KnarQL query
        const offsetTemplate = `
OFFSET ${offset}
`;
        // function that generates the same KnarQL query with the given offset
        const generateGravsearchQueryWithCustomOffset = (localOffset) => {
            const offsetCustomTemplate = `
OFFSET ${localOffset}
`;
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        // console.log(knarqlTemplate + offsetTemplate);
        return gravsearchTemplate + offsetTemplate;
    }
}
// map of complex knora-api value types to simple ones
GravsearchGenerationService.typeConversionComplexToSimple = {
    'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.xsdInteger,
    'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.xsdDecimal,
    'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.xsdBoolean,
    'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.xsdString,
    'http://api.knora.org/ontology/knora-api/v2#DateValue': KnoraConstants.dateSimple,
    'http://api.knora.org/ontology/knora-api/v2#IntervalValue': KnoraConstants.intervalSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeomValue': KnoraConstants.geomSimple,
    'http://api.knora.org/ontology/knora-api/v2#ColorValue': KnoraConstants.colorSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeonameValue': KnoraConstants.geonameSimple,
    'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.xsdUri,
    'http://api.knora.org/ontology/knora-api/v2#StillImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#FileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DDDFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#AudioFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DocumentFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#TextFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.xsdString
};
GravsearchGenerationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
GravsearchGenerationService.ctorParameters = () => [
    { type: SearchParamsService }
];
GravsearchGenerationService.ngInjectableDef = defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });

class StoreService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
       * resets the content of the triplestore
       *
       * @param rdfDataObjects
       * @returns {Observable<string>}
       */
    resetTriplestoreContent(rdfDataObjects) {
        return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(map((data) => {
            const result = data;
            // console.log('StoreService - resetTriplestoreContent: ', result);
            return result.message;
        }, (error) => {
            if (error.error instanceof Error) {
                console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
            }
            else {
                console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
            }
            throw error;
        }));
    }
}
StoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
StoreService.ctorParameters = () => [
    { type: HttpClient },
    { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
];
StoreService.ngInjectableDef = defineInjectable({ factory: function StoreService_Factory() { return new StoreService(inject(HttpClient), inject("config")); }, token: StoreService, providedIn: "root" });

class BasicOntologyService extends ApiService {
    /**
       * returns our list of a basic ontology
       *
       * @returns {Observable<any>}
       */
    // getBasicOntology(): Observable<any> {
    //     let url = environment.url;
    //     return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    // }
    getBasicOntology() {
        const url = this.config.app;
        return this.httpGet(url + '/data/base-data/basic-ontology.json');
        // return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    }
}
BasicOntologyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
BasicOntologyService.ngInjectableDef = defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(inject(HttpClient), inject("config")); }, token: BasicOntologyService, providedIn: "root" });

class ResourceTypesService extends ApiService {
    /**
       * Get all resource types defined by the vocabulary
       * @param iri (Vocabulary iri)
       * @returns {Observable<any>}
       */
    getResourceTypesByVoc(iri) {
        return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
    }
    /**
     * Get a specific resource type
     * @param iri   (resource type iri)
     * @returns {Observable<any>}
     */
    getResourceType(iri) {
        return this.httpGet('/v1/resourcetypes/' + encodeURIComponent(iri));
    }
}
ResourceTypesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
ResourceTypesService.ngInjectableDef = defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(inject(HttpClient), inject("config")); }, token: ResourceTypesService, providedIn: "root" });

/**
 * main api services
 */

class Equals {
    constructor() {
        this.type = KnoraConstants.EqualsComparisonOperator;
        this.label = KnoraConstants.EqualsComparisonLabel;
    }
    getClassName() {
        return 'Equals';
    }
}
class NotEquals {
    constructor() {
        this.type = KnoraConstants.NotEqualsComparisonOperator;
        this.label = KnoraConstants.NotEqualsComparisonLabel;
    }
    getClassName() {
        return 'NotEquals';
    }
}
class GreaterThanEquals {
    constructor() {
        this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
        this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
    }
    getClassName() {
        return 'GreaterThanEquals';
    }
}
class GreaterThan {
    constructor() {
        this.type = KnoraConstants.GreaterThanComparisonOperator;
        this.label = KnoraConstants.GreaterThanComparisonLabel;
    }
    getClassName() {
        return 'GreaterThan';
    }
}
class LessThan {
    constructor() {
        this.type = KnoraConstants.LessThanComparisonOperator;
        this.label = KnoraConstants.LessThanComparisonLabel;
    }
    getClassName() {
        return 'LessThan';
    }
}
class LessThanEquals {
    constructor() {
        this.type = KnoraConstants.LessThanEqualsComparisonOperator;
        this.label = KnoraConstants.LessThanQualsComparisonLabel;
    }
    getClassName() {
        return 'LessThanEquals';
    }
}
class Exists {
    constructor() {
        this.type = KnoraConstants.ExistsComparisonOperator;
        this.label = KnoraConstants.ExistsComparisonLabel;
    }
    getClassName() {
        return 'Exists';
    }
}
class Like {
    constructor() {
        this.type = KnoraConstants.LikeComparisonOperator;
        this.label = KnoraConstants.LikeComparisonLabel;
    }
    getClassName() {
        return 'Like';
    }
}
class Match {
    constructor() {
        this.type = KnoraConstants.MatchComparisonOperator;
        this.label = KnoraConstants.MatchComparisonLabel;
    }
    getClassName() {
        return 'Match';
    }
}
/**
 * Combination of a comparison operator and a value literal or an IRI.
 * In case the comparison operator is 'Exists', no value is given.
 */
class ComparisonOperatorAndValue {
    constructor(comparisonOperator, value) {
        this.comparisonOperator = comparisonOperator;
        this.value = value;
    }
}
/**
 * Represents a property's value as a literal with the indication of its type.
 */
class ValueLiteral {
    /**
     * Constructs a [ValueLiteral].
     *
     * @param {string} value the literal representation of the value.
     * @param {string} type the type of the value (making use of xsd).
     */
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    toSparql(schema) {
        let literalType;
        // check if a Knora schema conversion is necessary, e.g., knora-api:dateValue (complex) to knora-api:date (simple).
        // xsd types will remain unchanged
        if (schema === KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
            // convert to simple schema
            literalType = GravsearchGenerationService.typeConversionComplexToSimple[this.type];
        }
        else {
            // do not convert
            literalType = this.type;
        }
        return `"${this.value}"^^<${literalType}>`;
    }
}
/**
 * Represents an IRI.
 */
class IRI {
    /**
     * Constructs an [IRI].
     *
     * @param {string} iri the IRI of a resource instance.
     */
    constructor(iri) {
        this.iri = iri;
    }
    /**
     * Creates a SPARQL representation of the IRI.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    toSparql(schema) {
        // this is an instance Iri and does not have to be converted.
        return `<${this.iri}>`;
    }
}
/**
 * Represents a property, the specified comparison operator, and value.
 */
class PropertyWithValue {
    /**
     * Constructs a [PropertyWithValue].
     *
     * @param {Property} property the specified property.
     * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
     * @param isSortCriterion indicates if the property is used as a sort criterion.
     */
    constructor(property, valueLiteral, isSortCriterion) {
        this.property = property;
        this.valueLiteral = valueLiteral;
        this.isSortCriterion = isSortCriterion;
    }
}

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KuiCoreConfig as ɵa, Property as ɵb, KuiCoreModule, ɵ0, KuiCoreConfig, ApiServiceResult, ApiServiceError, Utils, KnoraConstants, KnoraSchema, StringLiteral, Precision, DateSalsah, DateRangeSalsah, AuthenticationResponse, Group, GroupResponse, GroupsResponse, List, ListInfo, ListInfoResponse, ListNode, ListNodeInfo, ListNodeInfoResponse, ListResponse, ListsResponse, OntologyInfoShort, PermissionData, Project, ProjectMembersResponse, ProjectResponse, ProjectsResponse, CurrentUser, UsersResponse, UserResponse, User, ReadTextValue, ReadTextValueAsString, ReferredResourcesByStandoffLink, ReadTextValueAsHtml, ReadTextValueAsXml, ReadDateValue, ReadLinkValue, ReadIntegerValue, ReadDecimalValue, ReadStillImageFileValue, ReadTextFileValue, ReadColorValue, Point2D, RegionGeometry, ReadGeomValue, ReadUriValue, ReadBooleanValue, ReadIntervalValue, ReadListValue, ReadResource, ReadResourcesSequence, StillImageRepresentation, ImageRegion, Equals, NotEquals, GreaterThanEquals, GreaterThan, LessThan, LessThanEquals, Exists, Like, Match, ComparisonOperatorAndValue, ValueLiteral, IRI, PropertyWithValue, ApiService, GroupsService, ListsService, ProjectsService, UsersService, LanguageService, StatusMsgService, OntologyService, OntologyMetadata, CardinalityOccurrence, Cardinality, ResourceClass, ResourceClasses, Property, Properties, ResourceClassIrisForOntology, OntologyInformation, OntologyCacheService, ResourceService, SearchService, ConvertJSONLD, IncomingService, ExtendedSearchParams, SearchParamsService, GravsearchGenerationService, StoreService, BasicOntologyService, ResourceTypesService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vdXNlcnMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2NvbnZlcnQtanNvbmxkLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvaW5jb21pbmcuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9pbmRleC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9rbm9yYS1jb3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogS25vcmEtdWkgY29yZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIHNlcnZlciBkZWZpbml0aW9ucyBvZjpcbiAqICAtIGFwaTogVVJMIG9mIGRhdGEgc2VydmljZSBlLmcuIGtub3JhOiBodHRwOi8vbG9jYWxob3N0OjMzMzNcbiAqICAtIG1lZGlhOiBVUkwgb2YgbWVkaWEgc2VydmVyIHNlcnZpY2UgZS5nLiBzaXBpOiBodHRwOi8vbG9jYWxob3N0OjEwMjRcbiAqICAtIGFwcDogVVJMIG9mIHRoZSBhcHAgZS5nLiBzYWxzYWg6IGh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFxuICovXG5ASnNvbk9iamVjdCgnS3VpQ29yZUNvbmZpZycpXG5leHBvcnQgY2xhc3MgS3VpQ29yZUNvbmZpZyB7XG5cbiAgICAvKipcbiAgICAgKiAoU2Fsc2FoKSBuYW1lIG9mIHRoZSBhcHBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChrbm9yYSkgdXJsIG9mIHRoZSBhcGlcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwaScsIFN0cmluZylcbiAgICBwdWJsaWMgYXBpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAoc2lwaSkgdXJsIG9mIG1lZGlhL2ZpbGUgc2VydmVyXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdtZWRpYScsIFN0cmluZylcbiAgICBwdWJsaWMgbWVkaWE6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChzYWxzYWgpIHVybCBvZiB0aGUgYXBwXG4gICAgICogQHR5cGUge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcHAnLCBTdHJpbmcpXG4gICAgcHVibGljIGFwcDogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiXG5pbXBvcnQgeyBKc29uQ29udmVydCwgT3BlcmF0aW9uTW9kZSwgVmFsdWVDaGVja2luZ01vZGUgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFJlc3VsdCBjbGFzcyB1c2VkIGFzIEFQSSB1cmwgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZVJlc3VsdCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBqc29uQ29udmVydDogSnNvbkNvbnZlcnQgPSBuZXcgSnNvbkNvbnZlcnQoT3BlcmF0aW9uTW9kZS5FTkFCTEUsIFZhbHVlQ2hlY2tpbmdNb2RlLkFMTE9XX05VTEwpO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgYXMgSlNPTlxuICAgICAqL1xuICAgIGJvZHk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc3VsdCBib2R5IGFzIGluc3RhbmNlIG9mIGNsYXNzT2JqZWN0LlxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICogQHRocm93c1xuICAgICAqL1xuXG4gICAgZ2V0Qm9keShjbGFzc09iamVjdD86IHsgbmV3KCk6IGFueSB9KTogYW55IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ib2R5KTtcbiAgICAgICAgcmV0dXJuIEFwaVNlcnZpY2VSZXN1bHQuanNvbkNvbnZlcnQuZGVzZXJpYWxpemUodGhpcy5ib2R5LCBjbGFzc09iamVjdCk7XG4gICAgfVxuXG5cbn1cbiIsIlxuLyoqXG4gKiBFcnJvciBjbGFzcyB1c2VkIGFzIEFQSSByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlRXJyb3Ige1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZXJyb3IgaW5mb1xuICAgICAqL1xuICAgIGVycm9ySW5mbyA9ICcnO1xuXG59XG4iLCJleHBvcnQgY2xhc3MgS25vcmFDb25zdGFudHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaSc7XG4gICAgcHVibGljIHN0YXRpYyBQYXRoU2VwYXJhdG9yID0gJyMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYU9udG9sb2d5UGF0aDogc3RyaW5nID0gJ2h0dHA6Ly93d3cua25vcmEub3JnL29udG9sb2d5JztcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQmFzZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFPbnRvbG9neVBhdGggKyAnL2tub3JhLWJhc2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1Qcm9qZWN0SVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbVByb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtQWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1BZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0QWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0QWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdE1lbWJlckdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RNZW1iZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyU2ltcGxlUGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPbnRvbG9neSA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT3JkZXIgPSBLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSArICcjZ3VpT3JkZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTdGFuZG9mZk9udG9sb2d5ID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3N0YW5kb2ZmL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBCb29sZWFuVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0Jvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBVcmlWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQ29sb3JWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9tVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3RWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpbmtWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb25hbWVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbmFtZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEF1ZGlvRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdBdWRpb0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBERERGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0REREZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEb2N1bWVudEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRG9jdW1lbnRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBNb3ZpbmdJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTW92aW5nSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJc1Jlc291cmNlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzUmVzb3VyY2VDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbHVlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzVmFsdWVDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBGb3JiaWRkZW5SZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRm9yYmlkZGVuUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgWE1MVG9TdGFuZG9mZk1hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1hNTFRvU3RhbmRvZmZNYXBwaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0Tm9kZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE9iamVjdFR5cGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdvYmplY3RUeXBlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlSWNvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAncmVzb3VyY2VJY29uJztcbiAgICBwdWJsaWMgc3RhdGljIGlzRWRpdGFibGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzRWRpdGFibGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1ZhbHVlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1ZhbHVlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2VvbWV0cnkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNHZW9tZXRyeSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU5hbWUgPSAnaHR0cDovL3NjaGVtYS5vcmcvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOdW1iZXJPZkl0ZW1zID0gJ2h0dHA6Ly9zY2hlbWEub3JnL251bWJlck9mSXRlbXMnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hSXRlbUxpc3RFbGVtZW50ID0gJ2h0dHA6Ly9zY2hlbWEub3JnL2l0ZW1MaXN0RWxlbWVudCc7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgUmRmUHJvcGVydHk6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0xhYmVsID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNsYWJlbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzQ29tbWVudCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjY29tbWVudCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU3ViY2xhc3NPZiA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjc3ViQ2xhc3NPZic7XG4gICAgcHVibGljIHN0YXRpYyBzdWJQcm9wZXJ0eU9mOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI3N1YlByb3BlcnR5T2YnO1xuXG4gICAgcHVibGljIHN0YXRpYyBvd2w6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE93bENsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0NsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9iamVjdFByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI09iamVjdFByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bERhdGF0eXBlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjRGF0YXR5cGVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xBbm5vdGF0aW9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQW5ub3RhdGlvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNYXhDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtYXhDYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNaW5DYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtaW5DYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNjYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xSZXN0cmljdGlvbiA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjUmVzdHJpY3Rpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjcmVhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdE1vZGlmaWNhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsYXN0TW9kaWZpY2F0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNQZXJtaXNzaW9ucyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1Blcm1pc3Npb25zJztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Qcm9qZWN0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1Byb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1VzZXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvVXNlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lvbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1JlZ2lvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1N0cmluZzogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERhdGVWYWx1ZTogc3RyaW5nID0gJ1JlYWREYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpbmtWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVnZXJWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlZ2VyVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERlY2ltYWxWYWx1ZTogc3RyaW5nID0gJ1JlYWREZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRHZW9tVmFsdWU6IHN0cmluZyA9ICdSZWFkR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRDb2xvclZhbHVlOiBzdHJpbmcgPSAnUmVhZENvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFVyaVZhbHVlOiBzdHJpbmcgPSAnUmVhZFVyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRCb29sZWFuVmFsdWU6IHN0cmluZyA9ICdSZWFkQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpc3RWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaXN0VmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd2YWx1ZUFzU3RyaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUhhc01hcHBpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVIYXNNYXBwaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0WWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0TW9udGggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZE1vbnRoID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kTW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzQ2FsZW5kYXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNDYWxlbmRhcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldCc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2UgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlSXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlSXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldElyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldElyaSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVnZXJWYWx1ZUFzSW50ZWdlciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludFZhbHVlQXNJbnQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWNpbWFsVmFsdWVBc0RlY2ltYWwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkZWNpbWFsVmFsdWVBc0RlY2ltYWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVBc1VybCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUFzVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUlzUHJldmlldyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUlzUHJldmlldyc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVIYXNGaWxlbmFtZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUhhc0ZpbGVuYW1lJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVknO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JWYWx1ZUFzQ29sb3IgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjb2xvclZhbHVlQXNDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2dlb21ldHJ5VmFsdWVBc0dlb21ldHJ5JztcbiAgICBwdWJsaWMgc3RhdGljIHVyaVZhbHVlQXNVcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd1cmlWYWx1ZUFzVXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGJvb2xlYW5WYWx1ZUFzQm9vbGVhbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2Jvb2xlYW5WYWx1ZUFzQm9vbGVhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNTdGFydCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNTdGFydCc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzRW5kID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc0VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFhzZCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnO1xuXG4gICAgcHVibGljIHN0YXRpYyB4c2RTdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnc3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEJvb2xlYW4gPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYm9vbGVhbic7XG4gICAgcHVibGljIHN0YXRpYyB4c2RJbnRlZ2VyID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2ludGVnZXInO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkRGVjaW1hbCA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdkZWNpbWFsJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZFVyaSA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdhbnlVUkknO1xuXG4gICAgcHVibGljIHN0YXRpYyByZXNvdXJjZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdEYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnSW50ZXJ2YWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb20nO1xuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9uYW1lU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRmlsZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoRnVuY3Rpb24gPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdtYXRjaCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc9JztcbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICchPSc7XG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgbm90IGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPic7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc+PSc7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPCc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBsZXNzIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc8PSc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxlc3MgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uT3BlcmF0b3IgPSAnRSc7XG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uTGFiZWwgPSAnZXhpc3RzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25PcGVyYXRvciA9ICdyZWdleCc7XG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxpa2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25PcGVyYXRvciA9ICdjb250YWlucyc7XG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25MYWJlbCA9ICdtYXRjaGVzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoTGluayA9ICdzYWxzYWgtbGluayc7IC8vIGNsYXNzIG9uIGFuIEhUTUwgPGE+IGVsZW1lbnQgdGhhdCBpbmRpY2F0ZXMgYSBsaW5rIHRvIGEgS25vcmEgcmVzb3VyY2VcbiAgICBwdWJsaWMgc3RhdGljIFJlZk1hcmtlciA9ICdyZWYtbWFya2VyJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCBlbGVtZW50IHRoYXQgcmVmZXJzIHRvIGFub3RoZXIgZWxlbWVudCBpbiB0aGUgc2FtZSBkb2N1bWVudFxuXG4gICAgcHVibGljIHN0YXRpYyBHTkRQcmVmaXggPSAnKERFLTU4OCknO1xuICAgIHB1YmxpYyBzdGF0aWMgR05EUmVzb2x2ZXIgPSAnaHR0cDovL2QtbmIuaW5mby9nbmQvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgVklBRlByZWZpeCA9ICcoVklBRiknO1xuICAgIHB1YmxpYyBzdGF0aWMgVklBRlJlc29sdmVyID0gJ2h0dHBzOi8vdmlhZi5vcmcvdmlhZi8nO1xuXG59XG5cblxuZXhwb3J0IGVudW0gS25vcmFTY2hlbWEge1xuICAgIGNvbXBsZXggPSAwLFxuICAgIHNpbXBsZSA9IDFcbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgdXRpbGl0eSBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7S25vcmFDb25zdGFudHN9IGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgRW1haWxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4RW1haWwgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVUkxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXJsID0gL14oaHR0cDpcXC9cXC93d3dcXC58aHR0cHM6XFwvXFwvd3d3XFwufGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcLyk/W2EtejAtOV0rKFtcXC1cXC5dezF9W2EtejAtOV0rKSpcXC5bYS16XXsyLDZ9KDpbMC05XXsxLDV9KT8oXFwvLiopPyQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgUGFzc3dvcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhQYXNzd29yZCA9IC9eKD89LipcXGQpKD89LipbYS16QS1aXSkuezgsfSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgSGV4YWRlY2ltYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhIZXggPSAvXlswLTlBLUZhLWZdKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBzaG9ydG5hbWUgaW4gcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFNob3J0bmFtZSA9IC9eW2EtekEtWl0rXFxTKiQvO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYW1iZGEgZnVuY3Rpb24gZWxpbWluYXRpbmcgZHVwbGljYXRlcyBpbiBhIGNvbGxlY3Rpb24gdG8gYmUgcGFzc2VkIHRvIFtbZmlsdGVyXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbSBlbGVtZW50IG9mIGFuIEFycmF5IHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGxvb2tlZCBhdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggY3VycmVudCBlbGVtZW50cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gc2VsZiByZWZlcmVuY2UgdG8gdGhlIHdob2xlIEFycmF5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzYW1lIGVsZW1lbnQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBpbiB0aGUgQXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJPdXREdXBsaWNhdGVzID0gKGVsZW0sIGluZGV4OiBudW1iZXIsIHNlbGYpID0+IHtcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc0Nzc5OC9kZWxldGUtZHVwbGljYXRlLWVsZW1lbnRzLWZyb20tYW4tYXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyP3Y9ZXhhbXBsZVxuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCdzIGluZGV4IGVxdWFscyB0aGUgaW5kZXggb2YgdGhlIGxlZnRtb3N0IGVsZW1lbnRcbiAgICAgICAgLy8gLT4gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIG5vIGlkZW50aWNhbCBlbGVtZW50IGJlZm9yZSB0aGlzIGluZGV4LCBoZW5jZSBpdCBpcyBub3QgYSBkdXBsaWNhdGVcbiAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBlbGVtZW50cywgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgS25vcmEgZW50aXR5IElSSSwgZ2V0cyB0aGUgb250b2xvZ3kgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eUlyaSBhbiBlbnRpdHkgSXJpLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIG9udG9sb2d5IElSSVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKGVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgY2xhc3MgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGVudGl0eUlyaS5zcGxpdChLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb21wbGV4IGtub3JhLWFwaSBlbnRpdHkgSXJpIHRvIGEga25vcmEtYXBpIHNpbXBsZSBlbnRpdHkgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhFbnRpdHlJcmlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKGNvbXBsZXhFbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGVudGl0eSBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gY29tcGxleEVudGl0eUlyaS5zcGxpdCgndjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7Y29tcGxleEVudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICAvLyBhZGQgJ3NpbXBsZScgdG8gYmFzZSBwYXRoXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXSArICdzaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvciArIHNlZ21lbnRzWzFdO1xuXG4gICAgfVxuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdTdHJpbmdMaXRlcmFsJylcbmV4cG9ydCBjbGFzcyBTdHJpbmdMaXRlcmFsIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3ZhbHVlJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmd1YWdlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJyc7XG59XG4iLCIvKipcbiAqIFByZWNpc2lvbiBmb3IgRGF0ZVNhbHNhaC5cbiAqL1xuZXhwb3J0IGVudW0gUHJlY2lzaW9uIHtcbiAgICB5ZWFyUHJlY2lzaW9uLFxuICAgIG1vbnRoUHJlY2lzaW9uLFxuICAgIGRheVByZWNpc2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBTYWxzYWggZGF0ZSBvYmplY3Qgd2l0aCBhIHByZWNpc2lvbiBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVTYWxzYWgge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcmVhZG9ubHkgcHJlY2lzaW9uOiBQcmVjaXNpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgbW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRheT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB5ZWFyIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBtb250aCBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF5IHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHdpdGhvdXQgdGhlIGNhbGVuZGFyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKSB7XG5cbiAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSAnKCcgKyB0aGlzLmVyYSArICcpICc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByZWNpc2lvbikge1xuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGggKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMuZGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgKHdpdGggY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhciArICc6JyArIHRoaXMuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBlcmlvZCAod2l0aCBzdGFydCBkYXRlIGFuZCBlbmQgZGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VTYWxzYWgge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0OiBEYXRlU2Fsc2FoLFxuICAgICAgICByZWFkb25seSBlbmQ6IERhdGVTYWxzYWhcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHJhbmdlICh3aXRoIHByZWNlZGluZyBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQuZ2V0RGF0ZUFzU3RyaW5nKCkgKyAnOicgKyB0aGlzLmVuZC5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnQXV0aGVudGljYXRpb25SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZylcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0JylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBzaG9ydG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0Y29kZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2hvcnRjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb25nbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9uZ25hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogU3RyaW5nTGl0ZXJhbFtdID0gW25ldyBTdHJpbmdMaXRlcmFsKCldO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna2V5d29yZHMnLCBbU3RyaW5nXSwgdHJ1ZSlcbiAgICBwdWJsaWMga2V5d29yZHM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9nbycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaW5zdGl0dXRpb24nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGluc3RpdHV0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9naWVzJywgW1N0cmluZ10pXG4gICAgcHVibGljIG9udG9sb2dpZXM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ0dyb3VwJylcbmV4cG9ydCBjbGFzcyBHcm91cCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgU3RyaW5nKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwJywgR3JvdXApXG4gICAgcHVibGljIGdyb3VwOiBHcm91cCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWwnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIHRydWUpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGV2ZWwnLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIGxldmVsOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwb3NpdGlvbicsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcbmltcG9ydCB7IExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LW5vZGUnO1xuXG5ASnNvbk9iamVjdCgnTGlzdCcpXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCBmYWxzZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdEluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpc1Jvb3ROb2RlJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgaXNSb290Tm9kZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdub2RlaW5mbycsIExpc3ROb2RlSW5mbywgZmFsc2UpXG4gICAgcHVibGljIG5vZGVpbmZvOiBMaXN0Tm9kZUluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuXG5ASnNvbk9iamVjdCgnTGlzdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdCcsIExpc3QsIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0OiBMaXN0ID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdHMnLCBbTGlzdE5vZGVJbmZvXSwgZmFsc2UpXG4gICAgcHVibGljIGxpc3RzOiBMaXN0Tm9kZUluZm9bXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnT250b2xvZ3lJbmZvU2hvcnQnKVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb1Nob3J0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SXJpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1Blcm1pc3Npb25EYXRhJylcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGF0YSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBncm91cHNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL2dyb3Vwcy9ncm91cCc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGF0YSB9IGZyb20gJy4uL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdVc2VyJylcbmV4cG9ydCBjbGFzcyBVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZW1haWwnLCBTdHJpbmcpXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VybmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bhc3N3b3JkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdnaXZlbk5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGdpdmVuTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZmFtaWx5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZmFtaWx5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZylcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZXNzaW9uSWQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGVybWlzc2lvbnMnLCBQZXJtaXNzaW9uRGF0YSlcbiAgICBwdWJsaWMgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzdGVtQWRtaW4nLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBzeXN0ZW1BZG1pbj86IGJvb2xlYW4gPSBmYWxzZTtcblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdE1lbWJlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdE1lbWJlcnNSZXNwb25zZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVtYmVycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgbWVtYmVyczogVXNlcltdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdClcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3RcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdqd3QnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGp3dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzQWRtaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzeXNBZG1pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlcnNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlclJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2VyUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcicsIFVzZXIpXG4gICAgcHVibGljIHVzZXI6IFVzZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlU2Fsc2FoLCBEYXRlU2Fsc2FoIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RhdGUnO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYW55IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyBJcmkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyB0eXBlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBwb2ludGluZyB0byB0aGUgdmFsdWUgb2JqZWN0LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGlzIGludGVyZmFjZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGFzIGEgc3RyaW5nIChjb21wbGV4aXR5IG9mIHRoZSB2YWx1ZSBwb3NzaWJseSByZWR1Y2VkKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBvciB3aXRob3V0IG1hcmt1cC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlYWRUZXh0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGhvdXQgbWFya3VwIChtZXJlIGNoYXJhY3RlciBzdHJpbmcpLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBzdHI6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyByZXNvdXJjZXMgcmVmZXJyZWQgdG8gYnkgc3RhbmRvZmYgbGlua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlYWRSZXNvdXJjZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgdGhhdCBoYXMgYmVlbiB0dXJuZWQgaW50byBIVE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzSHRtbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaHRtbDogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluaykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgYSByZXNvdXJjZSByZWZlcnJlZCB0byBieSBhIHN0YW5kb2ZmIGxpbmsgZnJvbSBhIHRleHQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UuXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gb250b2xvZ3kgaW5mb3JtYXRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlJ3MgY2xhc3MgYW5kIGl0cyBsYWJlbC5cbiAgICAgKi9cblxuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ocmVzb3VyY2VJcmk6IHN0cmluZywgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2VzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdubyBpbmZvcm1hdGlvbiBmb3VuZCBhYm91dCByZWZlcnJlZCByZXNvdXJjZSAodGFyZ2V0IG9mIHN0YW5kb2ZmIGxpbmspJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIGFzIFhNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1htbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgeG1sOiBzdHJpbmcsIHJlYWRvbmx5IG1hcHBpbmdJcmk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhtbDtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREYXRlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kWWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlbmRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kTW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RGF5PzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmREYXk/OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICBnZXREYXRlU2Fsc2FoKCk6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWgge1xuICAgICAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHRoaXMuZW5kWWVhciAmJiB0aGlzLnN0YXJ0TW9udGggPT09IHRoaXMuZW5kTW9udGggJiYgdGhpcy5zdGFydERheSA9PT0gdGhpcy5lbmREYXkgJiYgdGhpcy5zdGFydEVyYSA9PT0gdGhpcy5lbmRFcmEpIHtcbiAgICAgICAgICAgIC8vIHByZWNpc2UgZGF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF0ZSBwZXJpb2RcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlU2Fsc2FoKG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpLCBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLmVuZEVyYSwgdGhpcy5lbmRZZWFyLCB0aGlzLmVuZE1vbnRoLCB0aGlzLmVuZERheSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVNhbHNhaCgpLmdldERhdGVBc1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluayB2YWx1ZSBvYmplY3QgKHJlaWZpY2F0aW9uKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaW5rVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZT86IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTtcblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpbmtWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZWdlclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBpbnRlZ2VyOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVnZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRlY2ltYWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERlY2ltYWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgZGVjaW1hbDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0aWxsIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHJlcHJlc2VudGF0aW9uIHZhbHVlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHRleHRGaWxlbmFtZTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZVVSTDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEZpbGVVUkw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbG9yIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRDb2xvclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjb2xvckhleDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ySGV4O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gYSAyRC1jb29yZGluYXRlIHN5c3RlbSAoZm9yIGdlb21ldHJ5IHZhbHVlcykuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludDJEIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0dXM6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVDb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50MkRbXSxcbiAgICAgICAgcHVibGljIHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJhZGl1cz86IFBvaW50MkRcbiAgICApIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEdlb21WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9tZXRyeVN0cmluZztcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVSSSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVXJpVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGJvb2w6IGJvb2xlYW4pIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbC50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVydmFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZXJ2YWxTdGFydDogbnVtYmVyLCByZWFkb25seSBpbnRlcnZhbEVuZDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxTdGFydC50b1N0cmluZygpICsgJy0nICsgdGhpcy5pbnRlcnZhbEVuZDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVMYWJlbDogc3RyaW5nLCApIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVMYWJlbDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uL3N0aWxsLWltYWdlL3N0aWxsLWltYWdlLXJlcHJlc2VudGF0aW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSByZXNvdXJjZSdzIElyaS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgcmVzb3VyY2UncyB0eXBlIChjbGFzcykuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIHRoZSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1JlZ2lvbnMgcmVnaW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nTGlua3MgcmVzb3VyY2VzIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdfSBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ICBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgdG8gYmUgZGlzcGxheWVkIGZvciB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtSZWFkUHJvcGVydGllc30gcHJvcGVydGllcyB0aGUgcmVzb3VyY2VzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdSZWdpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdMaW5rczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXk6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVydGllcz86IFJlYWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuL3JlYWQtcmVzb3VyY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEltYWdlUmVnaW9uIH0gZnJvbSAnLi9pbWFnZS1yZWdpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW1hZ2UgaW5jbHVkaW5nIGl0cyByZWdpb25zLlxuICovXG5cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlfSBzdGlsbEltYWdlRmlsZVZhbHVlIGEgW1tSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZV1dIHJlcHJlc2VudGluZyBhbiBpbWFnZS5cbiAgICAgKiBAcGFyYW0ge0ltYWdlUmVnaW9uW119IHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgcmVhZG9ubHkgcmVnaW9uczogSW1hZ2VSZWdpb25bXSkge1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkR2VvbVZhbHVlLCBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWdpb24uXG4gKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgcmVzb3VyY2UgcmVwcmVzZW50aW5nIHRoZSByZWdpb24gYW5kIGl0cyBnZW9tZXRyaWVzLlxuICovXG5cbmV4cG9ydCBjbGFzcyBJbWFnZVJlZ2lvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFJlc291cmNlfSByZWdpb25SZXNvdXJjZSBhIHJlc291cmNlIG9mIHR5cGUgUmVnaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UmVhZEdlb21WYWx1ZVtdfVxuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi9kZWNsYXJhdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IEt1aUNvcmVDb25maWd9XG4gICAgXVxufSlcblxuXG5leHBvcnQgY2xhc3MgS3VpQ29yZU1vZHVsZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0t1aUNvcmVDb25maWd9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgICAqL1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogS3VpQ29yZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICAvLyBnZXQgdGhlIGFwcCBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGhlcmVcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBLdWlDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCwgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiAgaWYgaXMgbG9hZGluZywgc2V0IGl0IHRydWU7XG4gICAgICogIGl0IGNhbiBiZSB1c2VkIGluIGNvbXBvbmVudHNcbiAgICAgKiAgZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgICovXG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cEdldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCB7IG9ic2VydmU6ICdyZXNwb25zZScsIHBhcmFtczogcGFyYW1zIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0gYm9keVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBVVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0gYm9keVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cFB1dChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCBib2R5LCB7IG9ic2VydmU6ICdyZXNwb25zZScgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERUxFVEVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBodHRwRGVsZXRlKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZUVycm9yPn1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2dyb3Vwcyc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEdyb3VwW10+fVxuICAgICAqL1xuICAgIGdldEFsbEdyb3VwcygpOiBPYnNlcnZhYmxlPEdyb3VwW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEdyb3VwPn1cbiAgICAgKi9cbiAgICBnZXRHcm91cEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cD4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBSZXNwb25zZSkuZ3JvdXApLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaSAob3B0aW9uYWwpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+fVxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdD59XG4gICAgICovXG4gICAgZ2V0TGlzdChsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGggKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3RJbmZvPn1cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz59XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdD59XG4gICAgICovXG4gICAgY3JlYXRlTGlzdChwYXlsb2FkOiBMaXN0Q3JlYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0SW5mb1VwZGF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0SW5mbz59XG4gICAgICovXG4gICAgdXBkYXRlTGlzdEluZm8ocGF5bG9hZDogTGlzdEluZm9VcGRhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWQubGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFByb2plY3QsIFByb2plY3RNZW1iZXJzUmVzcG9uc2UsIFByb2plY3RSZXNwb25zZSwgUHJvamVjdHNSZXNwb25zZSwgVXNlciB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBsaXN0IG9mIGFsbCBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdFtdPn1cbiAgICAgKi9cbiAgICBnZXRBbGxQcm9qZWN0cygpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vcHJvamVjdHMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RzUmVzcG9uc2UpLnByb2plY3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIHByb2plY3Qgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcHJvamVjdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcHJvamVjdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IHJldHJpZXZhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYWxsIHByb2plY3QgbWVtYmVyc1xuICAgICAqIHByb2plY3QgaWRlbnRpZmllciBpcyBwcm9qZWN0IGlkIChpcmkpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnNcbiAgICAgKiBwcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnNcbiAgICAgKiBwcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRjb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IG1lbWJlciByZXRyaWV2YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0TWVtYmVycyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RNZW1iZXJzUmVzcG9uc2UpLm1lbWJlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZSBuZXcgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBjcmVhdGVQcm9qZWN0KGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBlZGl0IHByb2plY3QgZGF0YVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgdXBkYXRlUHJvamVjdChpcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZSBwcm9qZWN0IChpZiBpdCB3YXMgZGVsZXRlZClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIChzZXQgaW5hY3RpdmUpIHByb2plY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZSh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICB1c2Vyc1VybDogc3RyaW5nID0gdGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi91c2Vycyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyKGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFjdGl2YXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgb3duIHBhc3N3b3JkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHVwZGF0ZU93blBhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgb2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVVc2Vyc1Bhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgcmVxdWVzdGVyUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZGVsZXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHNldExhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgdmFyOiBsYW5nIH0pO1xuICB9XG4gIGdldExhbmd1YWdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgfVxuXG4gIC8qKlxuICAqIHRoaXMgbWV0aG9kIGdldCB0aGUgc3RhdHVzIG1lc3NhZ2VzIGZyb20gdGhlIHN0YXR1c01zZy5qc29uIGZpbGVcbiAgKiB3aGljaCBhcmUgZGVmaW5lZCBoZXJlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzXG4gICogYW5kIGhlcmU6IGh0dHA6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9odHRwbWVzc2FnZXMuYXNwXG4gICpcbiAgKi9cbiAgZ2V0U3RhdHVzTXNnKCk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBwICsgJy9hc3NldHMvaTE4bi9zdGF0dXNNc2cuanNvbicpXG4gICAgICAucGlwZShtYXAoXG4gICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgICApO1xuXG4gIH07XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgVXNlcnNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBLbm9yYUNvbnN0YW50cywgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgb250b2xvZ3kuXG4gICAgICogQHBhcmFtIGxhYmVsIGEgbGFiZWwgZGVzY3JpYmluZyB0aGUgb250b2xvZ3kuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBPY2N1cnJlbmNlIG9mIGEgcHJvcGVydHkgZm9yIGEgcmVzb3VyY2UgY2xhc3MgKGl0cyBjYXJkaW5hbGl0eSkuXG4gKi9cbmV4cG9ydCBlbnVtIENhcmRpbmFsaXR5T2NjdXJyZW5jZSB7XG4gICAgbWluQ2FyZCA9IDAsXG4gICAgY2FyZCA9IDEsXG4gICAgbWF4Q2FyZCA9IDJcbn1cblxuXG4vKipcbiAqIENhcmRpbmFsaXR5IG9mIGEgcHJvcGVydHkgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhcmRpbmFsaXR5IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG9jY3VycmVuY2UgdHlwZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBudW1lcmljYWwgdmFsdWUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRoZSBnaXZlbiBvY2N1cnJlbmNlIGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb2NjdXJyZW5jZTogQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gY2FyZGluYWxpdGllcyB0aGUgcmVzb3VyY2UgY2xhc3MncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGljb246IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjYXJkaW5hbGl0aWVzOiBBcnJheTxDYXJkaW5hbGl0eT4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHJlc291cmNlIGNsYXNzIElyaXMgdG8gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVzb3VyY2VDbGFzcztcbn1cblxuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gb2JqZWN0VHlwZSB0aGUgcHJvcGVydHkncyBvYmplY3QgY29uc3RyYWludC5cbiAgICAgKiBAcGFyYW0gY29tbWVudCBjb21tZW50IG9uIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBzdWJQcm9wZXJ0eU9mIElyaXMgb2YgcHJvcGVydGllcyB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBzdWJwcm9wZXJ0eSBvZi5cbiAgICAgKiBAcGFyYW0gaXNFZGl0YWJsZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgY2FuIGJlIGVkaXRlZCBieSB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSBpc0xpbmtWYWx1ZVByb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSByZWZlcnMgdG8gYSBsaW5rIHZhbHVlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IG9iamVjdFR5cGU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdWJQcm9wZXJ0eU9mOiBBcnJheTxzdHJpbmc+LFxuICAgICAgICByZWFkb25seSBpc0VkaXRhYmxlOiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtQcm9wZXJ0eTogQm9vbGVhbixcbiAgICAgICAgcmVhZG9ubHkgaXNMaW5rVmFsdWVQcm9wZXJ0eTogQm9vbGVhbikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcHJvcGVydHkgSXJpcyB0byBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUHJvcGVydHk7XG59XG5cblxuLyoqXG4gKiBHcm91cHMgcmVzb3VyY2UgY2xhc3NlcyBieSB0aGUgb250b2xvZ3kgdGhleSBhcmUgZGVmaW5lZCBpbi5cbiAqXG4gKiBBIG1hcCBvZiBvbnRvbG9neSBJcmlzIHRvIGFuIGFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IEFycmF5PHN0cmluZz47XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGNhY2hlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiAob25seSB1c2VkIGJ5IHRoaXMgc2VydmljZSBpbnRlcm5hbGx5KS5cbiAqIFRoaXMgY2FjaGUgaXMgdXBkYXRlZCB3aGVuZXZlciBuZXcgZGVmaW5pdGlvbnMgYXJlIHJlcXVlc3RlZCBmcm9tIEtub3JhLlxuICpcbiAqIFJlcXVlc3RlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiBieSBhIHNlcnZpY2UgaXMgcmVwcmVzZW50ZWQgYnkgW1tPbnRvbG9neUluZm9ybWF0aW9uXV0uXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGUge1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgb250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT47XG5cbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgbmFtZWQgZ3JhcGguXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTtcblxuICAgIC8qKlxuICAgICAqIFJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb250b2xvZ3kgaW5mb3JtYXRpb24gcmVxdWVzdGVkIGZyb20gdGhpcyBzZXJ2aWNlLlxuICpcbiAqIEZvciBldmVyeSByZXF1ZXN0LCBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHJldHVybmVkIGNvbnRhaW5pbmcgdGhlIHJlcXVlc3RlZCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gYSBzZXJ2aWNlIGxpa2UgdGhlIHNlYXJjaCBmZXRjaGVzIG5ldyByZXN1bHRzXG4gICAgICogdGhhdCBoYXZlIHRvIGJlIGFkZGVkIHRvIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGV4aXN0aW5nIG9udG9sb2d5IGluZm9ybWF0aW9uIG11c3Qgbm90IGJlIGxvc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIG9udG9sb2d5SW5mbyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgdGhhdCBoYXZlIHRvIGJlIGludGVncmF0ZWQuXG4gICAgICovXG4gICAgdXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzRm9yT250b2xvZ3kgaW4gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV0gPSBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSByZXNvdXJjZUNsYXNzZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3MgaW4gbmV3UmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc10gPSBuZXdSZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdQcm9wZXJ0aWVzID0gb250b2xvZ3lJbmZvLmdldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdQcm9wIGluIG5ld1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1tuZXdQcm9wXSA9IG5ld1Byb3BlcnRpZXNbbmV3UHJvcF07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtBcnJheTxSZXNvdXJjZUNsYXNzPn1cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBc0FycmF5KCk6IEFycmF5PFJlc291cmNlQ2xhc3M+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzSXJpIGluIHRoaXMucmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICBjb25zdCByZXNDbGFzczogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucHVzaChyZXNDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc0NsYXNzIHJlc291cmNlIGNsYXNzIHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzQ2xhc3M6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWYgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc0RlZiAhPT0gdW5kZWZpbmVkICYmIHJlc0NsYXNzRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzIHdpdGhvdXQgYXJndW1lbnQgcmVzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMoKTogUHJvcGVydGllcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KCk6IEFycmF5PFByb3BlcnR5PiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3A6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgdGhlIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHByb3BEZWYgIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUHJvcGVydHkgd2l0aG91dCBhcmd1bWVudCBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gKiBPdGhlciBjb21wb25lbnRzIG9yIHNlcnZpY2VzIG9idGFpbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRoaXMgc2VydmljZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUNhY2hlU2VydmljZSB7XG5cbiAgICAvLyBvbnRvbG9naWVzIGluZ29yZWQgYnkgdGhpcyBzZXJ2aWNlXG4gICAgcHJpdmF0ZSBleGNsdWRlZE9udG9sb2dpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3ksIEtub3JhQ29uc3RhbnRzLlN0YW5kb2ZmT250b2xvZ3ldO1xuXG4gICAgLy8gcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kXG4gICAgLy8gdGhhdCBoYXZlIHRvIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZXNvbHZlZCBhdCB0aGUgbW9tZW50XG4gICAgcHJpdmF0ZSBleGNsdWRlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXTtcblxuICAgIC8vIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8vIGNlbnRyYWwgaW5zdGFuY2UgdGhhdCBjYWNoZXMgYWxsIGRlZmluaXRpb25zXG4gICAgcHJpdmF0ZSBjYWNoZU9udG9sb2d5OiBPbnRvbG9neUNhY2hlID0gbmV3IE9udG9sb2d5Q2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29udG9sb2d5U2VydmljZTogT250b2xvZ3lTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBmb3IgYWxsIG9udG9sb2dpZXMgYXMgSlNPTi1MRCAobm8gcHJlZml4ZXMsIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0T250b2xvZ2llc01ldGFkYXRhKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIChyZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzKSBmb3IgdGhlIGdpdmVuIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmkgdGhlIElyaSBvZiB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYWxsIHRoZSBvbnRvbG9naWVzJyBtZXRhZGF0YSByZXR1cm5lZCBieSBLbm9yYSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9naWVzIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGFzIEpTT04tTEQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBga25vcmEtYXBpOlJlc291cmNlYCB3aWxsIGJlIGV4Y2x1ZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgZ2l2ZW4gY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgY2xhc3NEZWYgb2YgY2xhc3NEZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NJcmkgPSBjbGFzc0RlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgY2xhc3MgbmFtZSBpcyBub3QgbGlzdGVkIGFzIGEgbm9uIHJlc291cmNlIGNsYXNzIGFuZCB0aGF0IHRoZSBpc1Jlc291cmNlQ2xhc3MgZmxhZyBpcyBwcmVzZW50IGFuZCBzZXQgdG8gdHJ1ZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNsYXNzSXJpICE9PSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZSAmJiB0aGlzLm5vblJlc291cmNlQ2xhc3Nlcy5pbmRleE9mKGNsYXNzSXJpKVxuICAgICAgICAgICAgICAgID09PSAtMSAmJiAoY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSAhPT0gdW5kZWZpbmVkICYmIGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgdmFsdWUgY2xhc3MsIGJ1dCBhIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5wdXNoKGNsYXNzSXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzSXJpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2d5XG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogS25vcmEgYXV0b21hdGljYWxseSBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gaW4gdGhlIGNhcmRpbmFsaXRpZXMgb2YgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKiBJZiB0aGV5IGFyZSBkZWZpbmVkIGluIGFub3RoZXIgb250b2xvZ3ksIHRoYXQgb250b2xvZ3kgaXMgcmVxdWVzdGVkIGZyb20gS25vcmEgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9udG9sb2d5IHRoZSBvbnRvbG9neSB0byBiZSBjYWNoZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpcyB0aGUgb250b2xvZ2llcyBmb3Igd2hpY2ggZGVmaW5pdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zIHRoZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlDbGFzc0RlZmluaXRpb25zIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShyZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4sIHByb3BlcnR5Q2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzIG9mIHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucykge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0lyaSA9IHJlc0NsYXNzWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gcmVwcmVzZW50cyBhbGwgY2FyZGluYWxpdGllcyBvZiB0aGlzIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0aWVzOiBDYXJkaW5hbGl0eVtdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNsYXNzT2ZDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBzaW5nbGUgb2JqZWN0IG9yIGEgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gW3Jlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNhcmRpbmFsaXRpZXMgZm9yIHRoZSBwcm9wZXJ0aWVzIG9mIGEgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGN1ckNhcmQgb2Ygc3ViY2xhc3NPZkNvbGxlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXQgaXMgYSBjYXJkaW5hbGl0eSAoaXQgY291bGQgYWxzbyBiZSBhbiBJcmkgb2YgYSBzdXBlcmNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBjdXJDYXJkWydAdHlwZSddICE9PSB1bmRlZmluZWQgJiYgY3VyQ2FyZFsnQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuT3dsUmVzdHJpY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NhcmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBvY2N1cnJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1pbkNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5jYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWF4Q2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8ga25vd24gb2NjdXJyZW5jZSBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGNhcmRpbmFsaXR5IHR5cGUgaW52YWxpZCBmb3IgJHtyZXNDbGFzc1snQGlkJ119ICR7Y3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGd1aSBvcmRlclxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdGllcy5wdXNoKG5ld0NhcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NPYmogPSBuZXcgUmVzb3VyY2VDbGFzcyhcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZXNvdXJjZUljb25dLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHdyaXRlIHRoaXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbiB0byB0aGUgY2FjaGUgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9IHJlc0NsYXNzT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGUgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqIFRoZSBhbnN3ZXIgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGJ5IHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc0NsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZUNsYXNzZXN9IGFuIFtbT250b2xvZ3lDYWNoZV1dIHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuICAgICAgICAvLyBjb2xsZWN0IHRoZSBkZWZpbml0aW9ucyBmb3IgZWFjaCByZXNvdXJjZSBjbGFzcyBmcm9tIHRoZSBjYWNoZVxuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBwcm9wZXJ0aWVzIGZyb20gdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgY29uc3QgcHJvcGVydHlJcmlzID0gW107XG5cbiAgICAgICAgcmVzQ2xhc3NJcmlzLmZvckVhY2goXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzW3Jlc0NsYXNzSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0uY2FyZGluYWxpdGllcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICBjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBlYWNoIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUlyaXMucHVzaChjYXJkLnByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICBwcm9wRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCByZXNDbGFzc0RlZnMsIHByb3BEZWZzLmdldFByb3BlcnRpZXMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3Igb250b2xvZ3kgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllc1xuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYTogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BEZWYgb2YgcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wSXJpID0gcHJvcERlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIGxldCBpc0VkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1Byb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1ZhbHVlUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3ViUHJvcGVydHlPZiA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0pKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZiA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0ubWFwKChzdXBlclByb3A6IE9iamVjdCkgPT4gc3VwZXJQcm9wWydAaWQnXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YucHVzaChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdWydAaWQnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvYmplY3RUeXBlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdWydAaWQnXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGUgcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPSBuZXcgUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUsXG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHByb3BlcnR5IGRlZmluaXRpb25zIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmludGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBuZXcgUHJvcGVydGllcygpO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGU6IHByb3BlcnR5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtwcm9wSXJpfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb3BlcnR5RGVmc1twcm9wSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCBuZXcgUmVzb3VyY2VDbGFzc2VzKCksIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcmVxdWVzdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICAgICAgLy8gYXJyYXkgdG8gYmUgcG9wdWxhdGVkIHdpdGggT2JzZXJ2YWJsZXNcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgICAgICAvLyBkbyBhIHJlcXVlc3QgZm9yIGVhY2ggb250b2xvZ3lcbiAgICAgICAgb250b2xvZ3lJcmlzLmZvckVhY2gob250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgLy8gcHVzaCBhbiBPYnNlcnZhYmxlIG9udG8gYG9ic2VydmFibGVzYFxuICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAob250b2xvZ3k6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgcmVzcG9uc2UgdG8gY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZvcmtKb2luIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBvZiBhbiBhcnJheSBvZiByZXN1bHRzXG4gICAgICAgIC8vIHJldHVybmVkIGJ5IGVhY2ggT2JzZXJ2YWJsZSBjb250YWluZWQgaW4gYG9ic2VydmFibGVzYFxuICAgICAgICAvLyBhIHN1YnNjcmlwdGlvbiB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBmb3JrSm9pbiBpcyBleGVjdXRlZFxuICAgICAgICAvLyBvbmNlIGFsbCBPYnNlcnZhYmxlcyBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihvYnNlcnZhYmxlcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5SXJpc1RvUXVlcnkgPSBvbnRvbG9neUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgb250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb250b2xvZ3kgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBvbnRvbG9naWVzIHRoYXQgYXJlIG1vdCBjYWNoZWQgeWV0XG4gICAgICAgIGlmIChvbnRvbG9neUlyaXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpc1RvUXVlcnkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZWQgb25jZSBhbGwgb250b2xvZ2llcyBoYXZlIGJlZW4gY2FjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIFByb3BlcnRpZXMgY29udGFpbmVkIGluIHRoZSBjYXJkaW5hbGl0aWVzIHdpbGwgYmUgcmV0dXJuZWQgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzIChpbmNsdWRpbmcgcHJvcGVydGllcykuXG4gICAgICovXG4gICAgcHVibGljIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yOiBzdHJpbmdbXSA9IHJlc291cmNlQ2xhc3NJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5tYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHJlc0NsYXNzSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZCAuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllc1RvUXVlcnk6IHN0cmluZ1tdID0gcHJvcGVydHlJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcHJvcGVydGllc1RvUXVlcnkubWFwKFxuICAgICAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHByb3BJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSB3aXRoOiByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKGFscmVhZHkgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG5cbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0lSSSBmcm9tIHJlc291cmNlIHNlcnZpY2U6ICcsIGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIC8vIFRPRE86IHdlIHNob3VsZCB1c2UgdGhlIEFwaVNlcnZpY2UgY29ycmVjdGx5LiBCdXQgcmlnaHQgbm93IGl0IGRvZXNuJ3Qgd29ya1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFJlYWRSZXNvdXJjZSkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG4gICAgKi9cblxuICAgIC8vIFRPRE86IHBvc3QsIHB1dCwgZGVsZXRlXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdWxsdGV4dCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaChzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSArICc/b2Zmc2V0PScgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNwYXJxbFN0cmluZyB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChzcGFycWxTdHJpbmc6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzcGFycWxTdHJpbmcgPT09IHVuZGVmaW5lZCB8fCBzcGFycWxTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkLycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBzcGFycWxTdHJpbmcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnkoc3BhcnFsU3RyaW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc3BhcnFsU3RyaW5nID09PSB1bmRlZmluZWQgfHwgc3BhcnFsU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQvJyArIGVuY29kZVVSSUNvbXBvbmVudChzcGFycWxTdHJpbmcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIHNwYXJxbFN0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJUkkgcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBwcm9qZWN0SXJpIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXNbJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJ10gPSByZXNvdXJjZUNsYXNzSVJJO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zWydsaW1pdFRvUHJvamVjdCddID0gcHJvamVjdElyaTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBHZXQoKSBleHBlY3RzIG9ubHkgb25lIGFyZ3VtZW50LCBub3QgMlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBwYXJhbXMpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBCb29sZWFuIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRSZXNvdXJjZV1dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUpTT05MRCBhbiBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcyBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRSZXNvdXJjZV1dLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnRpZXNdXS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFByb3BlcnRpZXMge1xuXG4gICAgICAgIC8vIEpTT04tTEQgcmVwcmVzZW50aW5nIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIC8vIHRleHQgdmFsdWVzIG1heSBjb250YWluIHN0YW5kb2ZmIGxpbmtzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRDogT2JqZWN0ID0gcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZV07XG5cbiAgICAgICAgLy8gdG8gYmUgcG9wdWxhdGVkIHdpdGggc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10gPSBbXTtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RhbmRvZmYgbGluayB2YWx1ZSBKU09OLUxEIG9iamVjdCB0byBhIFJlYWRMaW5rVmFsdWVcbiAgICAgICAgLy8gaW4gb3JkZXIgcG9wdWxhdGUgdGhlIGNvbGxlY3Rpb24gd2l0aCBhbGwgdGhlIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rSlNPTkxEIG9mIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsOiBSZWFkTGlua1ZhbHVlID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZXM6IEFycmF5PFJlYWRQcm9wZXJ0eUl0ZW0+ID0gW107XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiB2YWx1ZXMgb3IganVzdCBvbmUgdmFsdWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHByb3BlcnR5IG5hbWUsIGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBpcyBnaXZlbiwgaXRlcmF0ZSBvdmVyIGl0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wVmFsdWUgb2YgcmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChwcm9wVmFsdWUsIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0sIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICAgICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wVmFsdWVzO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhbiBBUEkgcmVzcG9uc2UgaW4gSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMgaW50byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSByZXNvdXJjZSBvciBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gYW4gQXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyAoaW5jbHVkaW5nIGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICAvLyBzZXZlcmFsIHZhbHVlcyBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcF0pKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlZmVycmVkUmVzIG9mIHJlc291cmNlSlNPTkxEW3Byb3BdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXNvdXJjZSB0eXBlcyAoY2xhc3NlcykgZnJvbSBhIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEluY29taW5nU2VydmljZSBleHRlbmRzIFNlYXJjaFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyByZWdpb25zIGZvciBhIHBhcnRpY3VsYXIgcmVzb3VyY2UuXG4gICAgICAgKi9cbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMocmVzb3VyY2VJUkk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9yZWdpb24ga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxufSBXSEVSRSB7XG4/cmVnaW9uIGEga25vcmEtYXBpOlJlZ2lvbiAuXG4/cmVnaW9uIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlSSX0+IC5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSVJJfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5rbm9yYS1hcGk6aGFzR2VvbWV0cnkga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkdlb20gLlxuXG4/Z2VvbSBhIGtub3JhLWFwaTpHZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5rbm9yYS1hcGk6aGFzQ29tbWVudCBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6c3RyaW5nIC5cblxuP2NvbW1lbnQgYSB4c2Q6c3RyaW5nIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbmtub3JhLWFwaTpoYXNDb2xvciBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6Q29sb3IgLlxuXG4/Y29sb3IgYSBrbm9yYS1hcGk6Q29sb3IgLlxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3BhcnFsUXVlcnlTdHIgJywgc3BhcnFsUXVlcnlTdHIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlLCBpZiBhbnkuXG4gICAgICogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBsaW5rIHRvIHRoZSBnaXZlbiByZXNvdXJjZSB2aWEga25vcmEtYmFzZTppc1BhcnRPZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9wYWdlIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbn0gV0hFUkUge1xuXG4/cGFnZSBhIGtub3JhLWFwaTpTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gLlxuP3BhZ2UgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5rbm9yYS1hcGk6c2VxbnVtIGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDppbnRlZ2VyIC5cblxuP3NlcW51bSBhIHhzZDppbnRlZ2VyIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbmtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6RmlsZSAuXG5cbj9maWxlIGEga25vcmEtYXBpOkZpbGUgLlxuXG59IE9SREVSIEJZID9zZXFudW1cbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBJcmlcbiAgICAgKiBidXQgaW5jb21pbmcgcmVnaW9ucyBhbmQgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIGluY29taW5nIGxpbmtzIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBHcmF2c2VhcmNoIHF1ZXJ5IHN0cmluZy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgZmFsc2UgaWYgbm90IHNldCBjb3JyZWN0bHkgKGluaXQgc3RhdGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgYm9vbGVhbikge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2N1cnJlbnRTZWFyY2hQYXJhbXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGZhbHNlXG4gICAgICAgIC8vIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyByZWxvYWRlZCwgdGhpcyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICovXG4gICAgY2hhbmdlU2VhcmNoUGFyYW1zTXNnKHNlYXJjaFBhcmFtczogRXh0ZW5kZWRTZWFyY2hQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5uZXh0KHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VhcmNoIHBhcmFtcyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RXh0ZW5kZWRTZWFyY2hQYXJhbXN9XG4gICAgICovXG4gICAgZ2V0U2VhcmNoUGFyYW1zKCk6IEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBTZWFyY2hQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgd2hlbiBnZW5lcmF0aW5nIEtuYXJRTC5cbiAqL1xuY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSB7XG5cbiAgICAvLyBtYXAgb2YgY29tcGxleCBrbm9yYS1hcGkgdmFsdWUgdHlwZXMgdG8gc2ltcGxlIG9uZXNcbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlciwgLy8gdXNlIGNvbXB1dGVkIHByb3BlcnR5IG5hbWU6IGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QtaW5pdGlhbGl6ZXJcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkgZnJvbSB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFpblJlc291cmNlQ2xhc3NPcHRpb24gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAobnRoIHBhZ2Ugb2YgcmVzdWx0cykuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXM6IFByb3BlcnR5V2l0aFZhbHVlW10sIG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uPzogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgcmVzb3VyY2Ugc2VhcmNoZWQgZm9yXG4gICAgICAgIGxldCBtYWluUmVzb3VyY2VDbGFzcyA9ICcnO1xuXG4gICAgICAgIC8vIGlmIGdpdmVuLCBjcmVhdGUgdGhlIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgbWFpbiByZXNvdXJjZVxuICAgICAgICBpZiAobWFpblJlc291cmNlQ2xhc3NPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFpblJlc291cmNlQ2xhc3MgPSBgP21haW5SZXMgYSA8JHtVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUobWFpblJlc291cmNlQ2xhc3NPcHRpb24pfT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgRmlsdGVycyBhbmQgdHlwZSBhbm5vdGF0aW9ucyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wSXJpU2ltcGxlID0gVXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKHByb3BXaXRoVmFsLnByb3BlcnR5LmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaW1wbGVUeXBlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IHRoaXMuY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKHByb3BXaXRoVmFsLnByb3BlcnR5Lm9iamVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5yZXNvdXJjZVNpbXBsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50OiBzdHJpbmcgPSBgP21haW5SZXMgPCR7cHJvcElyaVNpbXBsZX0+ICR7cHJvcFZhbHVlfSAuYDtcblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVHlwZUFubm90YXRpb24gPSBgPCR7cHJvcElyaVNpbXBsZX0+IGtub3JhLWFwaTpvYmplY3RUeXBlIDwke3NpbXBsZVR5cGV9PiAuYDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVBbm5vdGF0aW9uID0gYCR7cHJvcFZhbHVlfSBhIDwke3NpbXBsZVR5cGV9PiAuYDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSB0aGF0IGhhcyB0byBiZSB3cmFwcGVkIGluIGEgRklMVEVSIE5PVCBFWElTVFMgKGNvbXBhcmlzb24gb3BlcmF0b3IgTk9UX0VRVUFMUykgdG8gbmVnYXRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNsdWRlIHN0YXRlbWVudCBpbiByZXN1bHRzLCBiZWNhdXNlIHRoZSBxdWVyeSBjaGVja3MgZm9yIHRoZSBhYnNlbmNlIG9mIHRoaXMgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBGSUxURVIgTk9UIEVYSVNUUyB7XG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxufWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgc3RhdGVtZW50IHNob3VsZCBiZSByZXR1cm5lZCByZXR1cm5lZCBpbiByZXN1bHRzIChCb29sZWFuIGZsYWcgZnJvbSBjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RhdGVtZW50cy5wdXNoKHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGZpbHRlciBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSBhIEZJTFRFUiBpZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRVhJU1RTIGFuZCBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTGlrZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSByZWdleCBmdW5jdGlvbiBmb3IgTElLRVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiByZWdleCgke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9LCBcImlcIilgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdNYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjb250YWlucyBmdW5jdGlvbiBmb3IgTUFUQ0hcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgPCR7S25vcmFDb25zdGFudHMubWF0Y2hGdW5jdGlvbn0+KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIoJHtwcm9wVmFsdWV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCB2YWx1ZSBpcyBhIHNvcnQgY3JpdGVyaW9uXG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLmlzU29ydENyaXRlcmlvbikgb3JkZXJCeUNyaXRlcmlhLnB1c2gocHJvcFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnR9XG4ke2ZpbHRlcn1cbmA7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5U3RhdGVtZW50ID0gJyc7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlDcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckJ5U3RhdGVtZW50ID0gYFxuT1JERVIgQlkgJHtvcmRlckJ5Q3JpdGVyaWEuam9pbignICcpfVxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRlbXBsYXRlIG9mIHRoZSBLbmFyUUwgcXVlcnkgd2l0aCBkeW5hbWljIGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaFRlbXBsYXRlID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuQ09OU1RSVUNUIHtcblxuP21haW5SZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4ke3JldHVyblN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbn0gV0hFUkUge1xuXG4/bWFpblJlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbiR7bWFpblJlc291cmNlQ2xhc3N9XG5cbiR7cHJvcHMuam9pbignJyl9XG5cbn1cbiR7b3JkZXJCeVN0YXRlbWVudH1gO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEtuYXJRTCBxdWVyeVxuICAgICAgICBjb25zdCBvZmZzZXRUZW1wbGF0ZSA9IGBcbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIHNhbWUgS25hclFMIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQgPSAobG9jYWxPZmZzZXQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbk9GRlNFVCAke2xvY2FsT2Zmc2V0fVxuYDtcblxuICAgICAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEtuYXJRTCBxdWVyeSBjYW4gYmUgY3JlYXRlZCB3aXRoIGFuIGluY3JlYXNlZCBvZmZzZXRcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuY2hhbmdlU2VhcmNoUGFyYW1zTXNnKG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcyhnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGtuYXJxbFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcsIFJkZkRhdGFPYmplY3QsIFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7IH1cblxuICAvKipcbiAgICAgKiByZXNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIHRyaXBsZXN0b3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmRmRGF0YU9iamVjdHNcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxzdHJpbmc+fVxuICAgICAqL1xuICByZXNldFRyaXBsZXN0b3JlQ29udGVudChyZGZEYXRhT2JqZWN0czogUmRmRGF0YU9iamVjdFtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlPih0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3N0b3JlL1Jlc2V0VHJpcGxlc3RvcmVDb250ZW50JywgcmRmRGF0YU9iamVjdHMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gQ2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gU2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApKTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2ljT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogcmV0dXJucyBvdXIgbGlzdCBvZiBhIGJhc2ljIG9udG9sb2d5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAvLyBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgICBsZXQgdXJsID0gZW52aXJvbm1lbnQudXJsO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICAvLyB9XG4gIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcHA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nKTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VUeXBlc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiBHZXQgYWxsIHJlc291cmNlIHR5cGVzIGRlZmluZWQgYnkgdGhlIHZvY2FidWxhcnlcbiAgICAgKiBAcGFyYW0gaXJpIChWb2NhYnVsYXJ5IGlyaSlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICBnZXRSZXNvdXJjZVR5cGVzQnlWb2MoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzP3ZvY2FidWxhcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyByZXNvdXJjZSB0eXBlXG4gICAqIEBwYXJhbSBpcmkgICAocmVzb3VyY2UgdHlwZSBpcmkpXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAqL1xuICBnZXRSZXNvdXJjZVR5cGUoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuXG4gIC8vIHB1dFJlc291cmNlVHlwZShpcmkpXG5cbn1cbiIsIi8qKlxuICogbWFpbiBhcGkgc2VydmljZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIGFkbWluIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2dyb3Vwcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGlzdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3Byb2plY3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi91c2Vycy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGFuZ3VhZ2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3N0YXR1cy1tc2cuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIHYyIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvY29udmVydC1qc29ubGQnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9pbmNvbWluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvZ3Jhdi1zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3N0b3JlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZSc7XG4iLCJpbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEgfSBmcm9tICcuL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsIFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIGNvbXBhcmlzb24gb3BlcmF0b3IuXG4gKiBUaGlzIGludGVyZmFjZSBpcyBpbXBsZW1lbnRlZCBmb3IgdGhlIHN1cHBvcnRlZCBjb21wYXJpc29uIG9wZXJhdG9ycy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgLy8gdHlwZSBvZiBjb21wYXJpc29uIG9wZXJhdG9yXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLy8gdGhlIGxhYmVsIG9mIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIHRvIGJlIHByZXNlbnRlZCB0byB0aGUgdXNlci5cbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLy8gcmV0dXJucyB0aGUgY2xhc3MgbmFtZSB3aGVuIGNhbGxlZCBvbiBhbiBpbnN0YW5jZVxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTm90RXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTm90RXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4aXN0cyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0V4aXN0cyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlrZSBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGlrZSc7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNYXRjaCBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdNYXRjaCc7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgYSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCBhIHZhbHVlIGxpdGVyYWwgb3IgYW4gSVJJLlxuICogSW4gY2FzZSB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyAnRXhpc3RzJywgbm8gdmFsdWUgaXMgZ2l2ZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb21wYXJpc29uT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvciwgcmVhZG9ubHkgdmFsdWU/OiBWYWx1ZSkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgdmFsdWU6IGFuIElSSSBvciBhIGxpdGVyYWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHZhbHVlIGludG8gYSBTUEFSUUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZztcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSdzIHZhbHVlIGFzIGEgbGl0ZXJhbCB3aXRoIHRoZSBpbmRpY2F0aW9uIG9mIGl0cyB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgVmFsdWVMaXRlcmFsIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtWYWx1ZUxpdGVyYWxdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIHRoZSBsaXRlcmFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgKG1ha2luZyB1c2Ugb2YgeHNkKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcpIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0eXBlIGFubm90YXRlZCB2YWx1ZSBsaXRlcmFsIHRvIGJlIHVzZWQgaW4gYSBTUEFSUUwgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IGxpdGVyYWxUeXBlOiBzdHJpbmc7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBLbm9yYSBzY2hlbWEgY29udmVyc2lvbiBpcyBuZWNlc3NhcnksIGUuZy4sIGtub3JhLWFwaTpkYXRlVmFsdWUgKGNvbXBsZXgpIHRvIGtub3JhLWFwaTpkYXRlIChzaW1wbGUpLlxuICAgICAgICAvLyB4c2QgdHlwZXMgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gICAgICAgIGlmIChzY2hlbWEgPT09IEtub3JhU2NoZW1hLnNpbXBsZSAmJiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIHNpbXBsZSBzY2hlbWFcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkbyBub3QgY29udmVydFxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiXl48JHtsaXRlcmFsVHlwZX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIElSSS5cbiAqL1xuZXhwb3J0IGNsYXNzIElSSSBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYW4gW0lSSV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHRoZSBJUkkgb2YgYSByZXNvdXJjZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpcmk6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIElSSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBpbnN0YW5jZSBJcmkgYW5kIGRvZXMgbm90IGhhdmUgdG8gYmUgY29udmVydGVkLlxuICAgICAgICByZXR1cm4gYDwke3RoaXMuaXJpfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSB2YWx1ZS5cbiAqIFRoaXMgaW50ZXJmYWNlIGhhcyB0byBiZSBpbXBsZW1lbnRlZCBmb3IgYWxsIHZhbHVlIHR5cGVzICh2YWx1ZSBjb21wb25lbnQgY2xhc3NlcykuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZX0uXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogVmFsdWU7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHksIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciwgYW5kIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXaXRoVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtQcm9wZXJ0eVdpdGhWYWx1ZV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eSB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWV9IHZhbHVlTGl0ZXJhbCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpc1NvcnRDcml0ZXJpb24gaW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBpcyB1c2VkIGFzIGEgc29ydCBjcml0ZXJpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBQcm9wZXJ0eSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWVMaXRlcmFsOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICAgICAgcmVhZG9ubHkgaXNTb3J0Q3JpdGVyaW9uOiBCb29sZWFuKSB7XG4gICAgfVxuXG59XG5cbi8qKlxuICogYSBsaXN0LCB3aGljaCBpcyB1c2VkIGluIHRoZSBtYXQtYXV0b2NvbXBsZXRlIGZvcm0gZmllbGRcbiAqIGNvbnRhaW5zIG9iamVjdHMgd2l0aCBpZCBhbmQgbmFtZS4gdGhlIGlkIGlzIHVzdWFsIHRoZSBpcmlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRvY29tcGxldGVJdGVtIHtcbiAgICBpcmk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy8nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtLdWlDb3JlQ29uZmlnIGFzIMOJwrVhfSBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMnO1xuZXhwb3J0IHtQcm9wZXJ0eSBhcyDDicK1Yn0gZnJvbSAnLi9saWIvc2VydmljZXMnOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZGVjb3JhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7SUFPYSxhQUFhO0lBRDFCOzs7OztRQVFXLFNBQUksR0FBVyxTQUFTLENBQUM7Ozs7O1FBT3pCLFFBQUcsR0FBVyxTQUFTLENBQUM7Ozs7O1FBT3hCLFVBQUssR0FBVyxTQUFTLENBQUM7Ozs7O1FBTzFCLFFBQUcsR0FBVyxTQUFTLENBQUM7S0FDbEM7Q0FBQSxDQUFBO0FBdEJHQTtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzsyQ0FDRztBQU9oQ0E7SUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7MENBQ0c7QUFPL0JBO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7OzRDQUNHO0FBT2pDQTtJQURDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxD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