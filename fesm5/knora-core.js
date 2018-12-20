import { __decorate, __metadata, __extends, __values } from 'tslib';
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
var KuiCoreConfig = /** @class */ (function () {
    function KuiCoreConfig() {
        /**
         * name of the app e.g. 'SALSAH'
         * @type {string}
         */
        this.name = undefined;
        /**
         * url of the app e.g. 'https://salsah.org'
         * @type {undefined}
         */
        this.app = undefined;
        /**
         * url of the api e.g. 'https://api.knora.org'
         * @type {string}
         */
        this.api = undefined;
        /**
         * url of media/file server e.g. 'https://iiif.sipi.io'
         * @type {string}
         */
        this.media = undefined;
    }
    __decorate([
        JsonProperty('name', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "name", void 0);
    __decorate([
        JsonProperty('app', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "app", void 0);
    __decorate([
        JsonProperty('api', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "api", void 0);
    __decorate([
        JsonProperty('media', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "media", void 0);
    KuiCoreConfig = __decorate([
        JsonObject('KuiCoreConfig')
    ], KuiCoreConfig);
    return KuiCoreConfig;
}());

/**
 * Result class used as API url response in ApiService
 */
var ApiServiceResult = /** @class */ (function () {
    function ApiServiceResult() {
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
    ApiServiceResult.prototype.getBody = function (classObject) {
        // console.log(this.body);
        return ApiServiceResult.jsonConvert.deserialize(this.body, classObject);
    };
    ApiServiceResult.jsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);
    return ApiServiceResult;
}());

/**
 * Error class used as API response in ApiService
 */
var ApiServiceError = /** @class */ (function () {
    function ApiServiceError() {
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
    return ApiServiceError;
}());

var KnoraConstants = /** @class */ (function () {
    function KnoraConstants() {
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
    return KnoraConstants;
}());
var KnoraSchema;
(function (KnoraSchema) {
    KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
    KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
})(KnoraSchema || (KnoraSchema = {}));

/**
 * Collection of useful utility functions.
 */
// @dynamic
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    Utils.getOntologyIriFromEntityIri = function (entityIri) {
        // split class Iri on "#"
        var segments = entityIri.split(KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error("Error: " + entityIri + " is not a valid entity IRI.");
        return segments[0];
    };
    /**
     * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
     *
     * @param {string} complexEntityIri
     * @returns {string}
     */
    Utils.convertComplexKnoraApiEntityIritoSimple = function (complexEntityIri) {
        // split entity Iri on "#"
        var segments = complexEntityIri.split('v2' + KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error("Error: " + complexEntityIri + " is not a valid entity IRI.");
        // add 'simple' to base path
        return segments[0] + 'simple/v2' + KnoraConstants.PathSeparator + segments[1];
    };
    /**
     * A regex to validate Email address.
     *
     * @type {RegExp}
     */
    Utils.RegexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    /**
     * A regex to validate Username.
     *
     * @type {RegExp}
     */
    Utils.RegexUsername = /^[a-zA-Z0-9]+$/;
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
    Utils.filterOutDuplicates = function (elem, index, self) {
        // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example
        // returns true if the element's index equals the index of the leftmost element
        // -> this means that there is no identical element before this index, hence it is not a duplicate
        // for all other elements, false is returned
        return index === self.indexOf(elem);
    };
    return Utils;
}());

var StringLiteral = /** @class */ (function () {
    function StringLiteral() {
        this.value = undefined;
        this.language = '';
    }
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
    return StringLiteral;
}());

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
var DateSalsah = /** @class */ (function () {
    function DateSalsah(calendar, era, year, month, day) {
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
    DateSalsah.prototype.getDateAsStringWithoutCalendar = function () {
        var dateString = '(' + this.era + ') ';
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
    };
    /**
     * Returns a string representation of the date (with calendar).
     *
     * @returns {string}
     */
    DateSalsah.prototype.getDateAsString = function () {
        return this.calendar + ':' + this.getDateAsStringWithoutCalendar();
    };
    DateSalsah.separator = '-';
    return DateSalsah;
}());
/**
 * Represents a period (with start date and end date).
 */
var DateRangeSalsah = /** @class */ (function () {
    function DateRangeSalsah(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns a string representation of the date range (with preceding calendar).
     *
     * @returns {string}
     */
    DateRangeSalsah.prototype.getDateAsString = function () {
        return this.start.getDateAsString() + ':' + this.end.getDateAsStringWithoutCalendar();
    };
    return DateRangeSalsah;
}());

var AuthenticationResponse = /** @class */ (function () {
    function AuthenticationResponse() {
        this.token = undefined;
    }
    __decorate([
        JsonProperty('token', String),
        __metadata("design:type", String)
    ], AuthenticationResponse.prototype, "token", void 0);
    AuthenticationResponse = __decorate([
        JsonObject('AuthenticationResponse')
    ], AuthenticationResponse);
    return AuthenticationResponse;
}());

var Project = /** @class */ (function () {
    function Project() {
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
    return Project;
}());

var Group = /** @class */ (function () {
    function Group() {
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.project = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
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
    return Group;
}());

var GroupResponse = /** @class */ (function () {
    function GroupResponse() {
        this.group = undefined;
    }
    __decorate([
        JsonProperty('group', Group),
        __metadata("design:type", Group)
    ], GroupResponse.prototype, "group", void 0);
    GroupResponse = __decorate([
        JsonObject('GroupResponse')
    ], GroupResponse);
    return GroupResponse;
}());

var GroupsResponse = /** @class */ (function () {
    function GroupsResponse() {
        this.groups = undefined;
    }
    __decorate([
        JsonProperty('groups', [Group]),
        __metadata("design:type", Array)
    ], GroupsResponse.prototype, "groups", void 0);
    GroupsResponse = __decorate([
        JsonObject('GroupsResponse')
    ], GroupsResponse);
    return GroupsResponse;
}());

var ListInfo = /** @class */ (function () {
    function ListInfo() {
        this.id = undefined;
        this.projectIri = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
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
    return ListInfo;
}());

var ListNode = /** @class */ (function () {
    function ListNode() {
        this.id = undefined;
        this.name = undefined;
        this.label = undefined;
        this.children = undefined;
        this.level = undefined;
        this.position = undefined;
    }
    ListNode_1 = ListNode;
    var ListNode_1;
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
    return ListNode;
}());

var List = /** @class */ (function () {
    function List() {
        this.listinfo = undefined;
        this.children = undefined;
    }
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
    return List;
}());

var ListInfoResponse = /** @class */ (function () {
    function ListInfoResponse() {
        this.listinfo = undefined;
    }
    __decorate([
        JsonProperty('listinfo', ListInfo, false),
        __metadata("design:type", ListInfo)
    ], ListInfoResponse.prototype, "listinfo", void 0);
    ListInfoResponse = __decorate([
        JsonObject('ListInfoResponse')
    ], ListInfoResponse);
    return ListInfoResponse;
}());

var ListNodeInfo = /** @class */ (function () {
    function ListNodeInfo() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
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
    return ListNodeInfo;
}());

var ListNodeInfoResponse = /** @class */ (function () {
    function ListNodeInfoResponse() {
        this.nodeinfo = undefined;
    }
    __decorate([
        JsonProperty('nodeinfo', ListNodeInfo, false),
        __metadata("design:type", ListNodeInfo)
    ], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
    ListNodeInfoResponse = __decorate([
        JsonObject('ListNodeInfoResponse')
    ], ListNodeInfoResponse);
    return ListNodeInfoResponse;
}());

var ListResponse = /** @class */ (function () {
    function ListResponse() {
        this.list = undefined;
    }
    __decorate([
        JsonProperty('list', List, false),
        __metadata("design:type", List)
    ], ListResponse.prototype, "list", void 0);
    ListResponse = __decorate([
        JsonObject('ListResponse')
    ], ListResponse);
    return ListResponse;
}());

var ListsResponse = /** @class */ (function () {
    function ListsResponse() {
        this.lists = undefined;
    }
    __decorate([
        JsonProperty('lists', [ListNodeInfo], false),
        __metadata("design:type", Array)
    ], ListsResponse.prototype, "lists", void 0);
    ListsResponse = __decorate([
        JsonObject('ListsResponse')
    ], ListsResponse);
    return ListsResponse;
}());

var OntologyInfoShort = /** @class */ (function () {
    function OntologyInfoShort() {
        this.ontologyIri = undefined;
        this.ontologyName = undefined;
    }
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
    return OntologyInfoShort;
}());

var PermissionData = /** @class */ (function () {
    function PermissionData() {
        this.groupsPerProject = undefined;
        this.administrativePermissionsPerProject = undefined;
    }
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
    return PermissionData;
}());

var User = /** @class */ (function () {
    function User() {
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
    return User;
}());

var ProjectMembersResponse = /** @class */ (function () {
    function ProjectMembersResponse() {
        this.members = undefined;
    }
    __decorate([
        JsonProperty('members', [User]),
        __metadata("design:type", Array)
    ], ProjectMembersResponse.prototype, "members", void 0);
    ProjectMembersResponse = __decorate([
        JsonObject('ProjectMembersResponse')
    ], ProjectMembersResponse);
    return ProjectMembersResponse;
}());

var ProjectResponse = /** @class */ (function () {
    function ProjectResponse() {
        this.project = undefined;
    }
    __decorate([
        JsonProperty('project', Project),
        __metadata("design:type", Project)
    ], ProjectResponse.prototype, "project", void 0);
    ProjectResponse = __decorate([
        JsonObject('ProjectResponse')
    ], ProjectResponse);
    return ProjectResponse;
}());

var ProjectsResponse = /** @class */ (function () {
    function ProjectsResponse() {
        this.projects = undefined;
    }
    __decorate([
        JsonProperty('projects', [Project]),
        __metadata("design:type", Array)
    ], ProjectsResponse.prototype, "projects", void 0);
    ProjectsResponse = __decorate([
        JsonObject('ProjectsResponse')
    ], ProjectsResponse);
    return ProjectsResponse;
}());

var CurrentUser = /** @class */ (function () {
    function CurrentUser() {
        this.name = undefined;
        this.jwt = undefined;
        this.lang = undefined;
        this.sysAdmin = undefined;
    }
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
    return CurrentUser;
}());

var UsersResponse = /** @class */ (function () {
    function UsersResponse() {
        this.users = undefined;
    }
    __decorate([
        JsonProperty('users', [User]),
        __metadata("design:type", Array)
    ], UsersResponse.prototype, "users", void 0);
    UsersResponse = __decorate([
        JsonObject('UsersResponse')
    ], UsersResponse);
    return UsersResponse;
}());

var UserResponse = /** @class */ (function () {
    function UserResponse() {
        this.user = undefined;
    }
    __decorate([
        JsonProperty('user', User),
        __metadata("design:type", User)
    ], UserResponse.prototype, "user", void 0);
    UserResponse = __decorate([
        JsonObject('UserResponse')
    ], UserResponse);
    return UserResponse;
}());

/**
 * Abstract class representing a text value object with or without markup.
 */
var ReadTextValue = /** @class */ (function () {
    function ReadTextValue() {
        this.type = KnoraConstants.TextValue;
    }
    return ReadTextValue;
}());
/**
 * Represents a text value object without markup (mere character string).
 */
var ReadTextValueAsString = /** @class */ (function (_super) {
    __extends(ReadTextValueAsString, _super);
    function ReadTextValueAsString(id, propIri, str) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.str = str;
        return _this;
    }
    ReadTextValueAsString.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsString;
    };
    ReadTextValueAsString.prototype.getContent = function () {
        return this.str;
    };
    return ReadTextValueAsString;
}(ReadTextValue));
/**
 * Represents resources referred to by standoff links.
 */
var ReferredResourcesByStandoffLink = /** @class */ (function () {
    function ReferredResourcesByStandoffLink() {
    }
    return ReferredResourcesByStandoffLink;
}());
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
var ReadTextValueAsHtml = /** @class */ (function (_super) {
    __extends(ReadTextValueAsHtml, _super);
    function ReadTextValueAsHtml(id, propIri, html, referredResources) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.html = html;
        _this.referredResources = referredResources;
        return _this;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    ReadTextValueAsHtml.prototype.getReferredResourceInfo = function (resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + (" (" + resClassLabel + ")");
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    };
    ReadTextValueAsHtml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsHtml;
    };
    ReadTextValueAsHtml.prototype.getContent = function () {
        return this.html;
    };
    return ReadTextValueAsHtml;
}(ReadTextValue));
/**
 * Represents a text value object with markup as XML.
 */
var ReadTextValueAsXml = /** @class */ (function (_super) {
    __extends(ReadTextValueAsXml, _super);
    function ReadTextValueAsXml(id, propIri, xml, mappingIri) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.xml = xml;
        _this.mappingIri = mappingIri;
        return _this;
    }
    ReadTextValueAsXml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsXml;
    };
    ReadTextValueAsXml.prototype.getContent = function () {
        return this.xml;
    };
    return ReadTextValueAsXml;
}(ReadTextValue));
/**
 * Represents a date value object.
 */
var ReadDateValue = /** @class */ (function () {
    function ReadDateValue(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
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
    ReadDateValue.prototype.getDateSalsah = function () {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    };
    ReadDateValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDateValue;
    };
    ReadDateValue.prototype.getContent = function () {
        return this.getDateSalsah().getDateAsString();
    };
    return ReadDateValue;
}());
/**
 * Represents a link value object (reification).
 */
var ReadLinkValue = /** @class */ (function () {
    function ReadLinkValue(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    ReadLinkValue.prototype.getReferredResourceInfo = function (ontologyInfo) {
        if (this.referredResource !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + (" (" + resClassLabel + ")");
        }
        else {
            return this.referredResourceIri;
        }
    };
    ReadLinkValue.prototype.getClassName = function () {
        return KnoraConstants.ReadLinkValue;
    };
    ReadLinkValue.prototype.getContent = function () {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    };
    return ReadLinkValue;
}());
/**
 * Represents an integer value object.
 */
var ReadIntegerValue = /** @class */ (function () {
    function ReadIntegerValue(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    ReadIntegerValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntegerValue;
    };
    ReadIntegerValue.prototype.getContent = function () {
        return this.integer.toString();
    };
    return ReadIntegerValue;
}());
/**
 * Represents a decimal value object.
 */
var ReadDecimalValue = /** @class */ (function () {
    function ReadDecimalValue(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    ReadDecimalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDecimalValue;
    };
    ReadDecimalValue.prototype.getContent = function () {
        return this.decimal.toString();
    };
    return ReadDecimalValue;
}());
/**
 * Represents a still image value object.
 */
var ReadStillImageFileValue = /** @class */ (function () {
    function ReadStillImageFileValue(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
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
    ReadStillImageFileValue.prototype.makeIIIFUrl = function (reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            var percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    };
    ReadStillImageFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadStillImageFileValue;
    };
    ReadStillImageFileValue.prototype.getContent = function () {
        return this.imagePath;
    };
    return ReadStillImageFileValue;
}());
/**
 * Represents a text representation value object
 */
var ReadTextFileValue = /** @class */ (function () {
    function ReadTextFileValue(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    ReadTextFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadTextFileValue;
    };
    ReadTextFileValue.prototype.getContent = function () {
        return this.textFileURL;
    };
    return ReadTextFileValue;
}());
/**
 * Represents a color value object.
 */
var ReadColorValue = /** @class */ (function () {
    function ReadColorValue(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    ReadColorValue.prototype.getClassName = function () {
        return KnoraConstants.ReadColorValue;
    };
    ReadColorValue.prototype.getContent = function () {
        return this.colorHex;
    };
    return ReadColorValue;
}());
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());
/**
 * Represents a geometry value parsed from JSON.
 */
var RegionGeometry = /** @class */ (function () {
    function RegionGeometry(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
    return RegionGeometry;
}());
/**
 * Represents a geometry value object.
 */
var ReadGeomValue = /** @class */ (function () {
    function ReadGeomValue(id, propIri, geometryString) {
        var e_1, _a;
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        var geometryJSON = JSON.parse(geometryString);
        var points = [];
        try {
            for (var _b = __values(geometryJSON.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                points.push(new Point2D(point.x, point.y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    ReadGeomValue.prototype.getClassName = function () {
        return KnoraConstants.ReadGeomValue;
    };
    ReadGeomValue.prototype.getContent = function () {
        return this.geometryString;
    };
    return ReadGeomValue;
}());
/**
 * Represents a URI value object.
 */
var ReadUriValue = /** @class */ (function () {
    function ReadUriValue(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    ReadUriValue.prototype.getClassName = function () {
        return KnoraConstants.ReadUriValue;
    };
    ReadUriValue.prototype.getContent = function () {
        return this.uri;
    };
    return ReadUriValue;
}());
/**
 * Represents a Boolean value object.
 */
var ReadBooleanValue = /** @class */ (function () {
    function ReadBooleanValue(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    ReadBooleanValue.prototype.getClassName = function () {
        return KnoraConstants.ReadBooleanValue;
    };
    ReadBooleanValue.prototype.getContent = function () {
        return this.bool.toString();
    };
    return ReadBooleanValue;
}());
/**
 * Represents an interval value object.
 */
var ReadIntervalValue = /** @class */ (function () {
    function ReadIntervalValue(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    ReadIntervalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntervalValue;
    };
    ReadIntervalValue.prototype.getContent = function () {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    };
    return ReadIntervalValue;
}());
/**
 * Represents an interval value object.
 */
var ReadListValue = /** @class */ (function () {
    function ReadListValue(id, propIri, listNodeIri, listNodeLabel) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.listNodeLabel = listNodeLabel;
        this.type = KnoraConstants.ListValue;
    }
    ReadListValue.prototype.getClassName = function () {
        return KnoraConstants.ReadListValue;
    };
    ReadListValue.prototype.getContent = function () {
        return this.listNodeLabel;
    };
    return ReadListValue;
}());

/**
 * Represents a resource and its properties.
 */
var ReadResource = /** @class */ (function () {
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
    function ReadResource(id, type, label, incomingRegions, incomingStillImageRepresentations, incomingLinks, stillImageRepresentationsToDisplay, properties) {
        this.id = id;
        this.type = type;
        this.label = label;
        this.incomingRegions = incomingRegions;
        this.incomingStillImageRepresentations = incomingStillImageRepresentations;
        this.incomingLinks = incomingLinks;
        this.stillImageRepresentationsToDisplay = stillImageRepresentationsToDisplay;
        this.properties = properties;
    }
    return ReadResource;
}());

/**
 * Represents a sequence of resources.
 */
var ReadResourcesSequence = /** @class */ (function () {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    function ReadResourcesSequence(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
    }
    return ReadResourcesSequence;
}());

/**
 * Represents an image including its regions.
 */
var StillImageRepresentation = /** @class */ (function () {
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    function StillImageRepresentation(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
    return StillImageRepresentation;
}());

/**
 * Represents a region.
 * Contains a reference to the resource representing the region and its geometries.
 */
var ImageRegion = /** @class */ (function () {
    /**
     *
     * @param {ReadResource} regionResource a resource of type Region
     */
    function ImageRegion(regionResource) {
        this.regionResource = regionResource;
    }
    /**
     * Get all geometry information belonging to this region.
     *
     * @returns {ReadGeomValue[]}
     */
    ImageRegion.prototype.getGeometries = function () {
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    };
    return ImageRegion;
}());

var ɵ0 = KuiCoreConfig;
var KuiCoreModule = /** @class */ (function () {
    function KuiCoreModule() {
    }
    /**
     *
     * @param {KuiCoreConfig} config
     * @returns {ModuleWithProviders}
     */
    KuiCoreModule.forRoot = function (config) {
        // get the app environment configuration here
        // console.log(config);
        return {
            ngModule: KuiCoreModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    };
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
    return KuiCoreModule;
}());

var ApiService = /** @class */ (function () {
    function ApiService(http, config) {
        this.http = http;
        this.config = config;
        // if is loading, set it true;
        // it can be used in components
        // for progress loader element
        this.loading = false;
    }
    /**
     * GET
     *
     * @param {string} path
     * @returns Observable of any
     */
    ApiService.prototype.httpGet = function (path, params) {
        var _this = this;
        this.loading = true;
        return this.http.get(this.config.api + path, { observe: 'response', params: params }).pipe(map(function (response) {
            _this.loading = false;
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            return _this.handleRequestError(error);
        }));
    };
    /**
     * POST
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    ApiService.prototype.httpPost = function (path, body) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.post(this.config.api + path, body, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * PUT
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    ApiService.prototype.httpPut = function (path, body) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.put(this.config.api + path, body, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            // console.log(response);
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * DELETE
     *
     * @param {string} path
     * @returns Observable of any
     */
    ApiService.prototype.httpDelete = function (path) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.delete(this.config.api + path, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            // console.log(response);
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * handle request error in case of server error
     *
     * @param {HttpErrorResponse} error
     * @returns Observable of ApiServiceError
     */
    ApiService.prototype.handleRequestError = function (error) {
        // console.error(error);
        var serviceError = new ApiServiceError();
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    };
    /**
     * handle json error in case of type error in json response (json2typescript)
     *
     * @param {any} error
     * @returns Observable of ApiServiceError
     */
    ApiService.prototype.handleJsonError = function (error) {
        if (error instanceof ApiServiceError)
            return throwError(error);
        var serviceError = new ApiServiceError();
        serviceError.status = -1;
        serviceError.statusText = 'Invalid JSON';
        serviceError.errorInfo = error;
        serviceError.url = '';
        return throwError(serviceError);
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient), inject("config")); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());

/**
 * Request information about group from Knora.
 */
var GroupsService = /** @class */ (function (_super) {
    __extends(GroupsService, _super);
    function GroupsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/groups';
        return _this;
    }
    /**
     * Return a list of all groups.
     *
     * @returns Observable<Group[]>
     */
    GroupsService.prototype.getAllGroups = function () {
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupsResponse).groups; }), catchError(this.handleJsonError));
    };
    /**
     * Return a group object (filter by IRI).
     *
     * @param {string} iri
     * @returns Observable<Group>
     */
    GroupsService.prototype.getGroupByIri = function (iri) {
        this.path += '/' + encodeURIComponent(iri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupResponse).group; }), catchError(this.handleJsonError));
    };
    GroupsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    GroupsService.ngInjectableDef = defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(inject(HttpClient), inject("config")); }, token: GroupsService, providedIn: "root" });
    return GroupsService;
}(ApiService));

/**
 * Request information about lists from Knora.
 */
var ListsService = /** @class */ (function (_super) {
    __extends(ListsService, _super);
    function ListsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/lists';
        return _this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all lists.
     *
     * @param {string} [projectIri]
     * @returns Observable<ListNodeInfo[]>
     */
    ListsService.prototype.getLists = function (projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListsResponse).lists; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list object.
     *
     * @param {string} listIri
     * @returns Observable<List>
     */
    ListsService.prototype.getList = function (listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list info object.
     *
     * @param {string} listIri
     * @returns Observable<ListInfo>
     */
    ListsService.prototype.getListInfo = function (listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list node info object.
     *
     * @param {string} nodeIri
     * @returns Observable<ListNodeInfo>
     */
    ListsService.prototype.getListNodeInfo = function (nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new list.
     *
     * @param {ListCreatePayload} payload
     * @returns Observable<List>
     */
    ListsService.prototype.createList = function (payload) {
        return this.httpPost(this.path, payload).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Edit list data.
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable<ListInfo>
     */
    ListsService.prototype.updateListInfo = function (payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    ListsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ListsService.ngInjectableDef = defineInjectable({ factory: function ListsService_Factory() { return new ListsService(inject(HttpClient), inject("config")); }, token: ListsService, providedIn: "root" });
    return ListsService;
}(ApiService));

/**
 * Request information about projects from Knora.
 */
var ProjectsService = /** @class */ (function (_super) {
    __extends(ProjectsService, _super);
    function ProjectsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all projects.
     *
     * @returns Observable<Project[]>
     */
    ProjectsService.prototype.getAllProjects = function () {
        return this.httpGet('/admin/projects').pipe(map(function (result) { return result.getBody(ProjectsResponse).projects; }), catchError(this.handleJsonError));
    };
    /**
     * Returns a project object.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByIri = function (iri) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    };
    /**
     * Returns a project object.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByShortname = function (shortname) {
        var url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    };
    /**
     * Returns a project object.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByShortcode = function (shortcode) {
        var url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    };
    /**
     * @private
     * Helper method combining project retrieval.
     *
     * @param {string} url
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProject = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * Returns all project members.
     * Project identifier is project id (iri).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByIri = function (iri) {
        var url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    };
    /**
     * Returns all project members.
     * Project identifier is shortname.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByShortname = function (shortname) {
        var url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    };
    /**
     * Returns all project members.
     * Project identifier is shortcode.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByShortcode = function (shortcode) {
        var url = '/admin/projects/members/' + shortcode + '?identifier=shortcode';
        return this.getProjectMembers(url);
    };
    /**
     * @private
     * Helper method combining project member retrieval.
     *
     * @param {string} url
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembers = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectMembersResponse).members; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new project.
     *
     * @param {any} data
     * @returns Observable<Project>
     */
    ProjectsService.prototype.createProject = function (data) {
        var url = '/admin/projects';
        return this.httpPost(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
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
    ProjectsService.prototype.updateProject = function (iri, data) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * Activate project (if it was deleted).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.activateProject = function (iri) {
        var data = {
            status: true
        };
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete (set inactive) project.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.deleteProject = function (iri) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpDelete(url).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    ProjectsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ProjectsService.ngInjectableDef = defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(inject(HttpClient), inject("config")); }, token: ProjectsService, providedIn: "root" });
    return ProjectsService;
}(ApiService));

/**
 * This service uses the Knora admin API and handles all user data.
 */
var UsersService = /** @class */ (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.usersUrl = _this.config.api + '/admin/users';
        return _this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    UsersService.prototype.getAllUsers = function () {
        return this.httpGet('/admin/users').pipe(map(function (result) { return result.getBody(UsersResponse).users; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by username, email or by iri.
     *
     * @param {string} identifier - Get user by username, email or by iri
     * @returns Observable<User>
     */
    UsersService.prototype.getUser = function (identifier) {
        var path = '/admin/users/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Deprecated! Please use getUser(identifier: string) only!
     * Get user by email
     *
     * @ignore
     *
     * @param {string} email
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByEmail = function (email) {
        return this.getUser(email);
    };
    /**
     * Deprecated! Please use getUser(identifier: string) only!
     *
     * @ignore
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByIri = function (iri) {
        return this.getUser(iri);
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.createUser = function (data) {
        var path = '/admin/users';
        return this.httpPost(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProject = function (userIri, projectIri) {
        var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Delete user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
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
    UsersService.prototype.addUserToSystemAdmin = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.activateUser = function (userIri) {
        var data = {
            status: true
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update user data.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.updateUser = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.deleteUser = function (userIri) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
        var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    UsersService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    UsersService.ngInjectableDef = defineInjectable({ factory: function UsersService_Factory() { return new UsersService(inject(HttpClient), inject("config")); }, token: UsersService, providedIn: "root" });
    return UsersService;
}(ApiService));

var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.subject = new Subject();
    }
    LanguageService.prototype.setLanguage = function (lang) {
        this.subject.next({ var: lang });
    };
    LanguageService.prototype.getLanguage = function () {
        return this.subject.asObservable();
    };
    LanguageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    LanguageService.ngInjectableDef = defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(); }, token: LanguageService, providedIn: "root" });
    return LanguageService;
}());

var StatusMsgService = /** @class */ (function () {
    function StatusMsgService(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    StatusMsgService.prototype.getStatusMsg = function () {
        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map(function (res) {
            return res;
        }, function (err) {
            console.error(err);
        }));
    };
    StatusMsgService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    StatusMsgService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StatusMsgService.ngInjectableDef = defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(inject(HttpClient), inject("config")); }, token: StatusMsgService, providedIn: "root" });
    return StatusMsgService;
}());

/**
 * Requests ontology information from Knora.
 */
var OntologyService = /** @class */ (function (_super) {
    __extends(OntologyService, _super);
    function OntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    };
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
     */
    OntologyService.prototype.getResourceClasses = function (resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
        }
        var resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    };
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
     */
    OntologyService.prototype.getProperties = function (propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
        }
        var propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    };
    OntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    OntologyService.ngInjectableDef = defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(inject(HttpClient), inject("config")); }, token: OntologyService, providedIn: "root" });
    return OntologyService;
}(ApiService));

var jsonld = require('jsonld');
/**
 * Represents an error occurred in OntologyCacheService.
 */
var OntologyCacheError = /** @class */ (function (_super) {
    __extends(OntologyCacheError, _super);
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
     * @hideconstructor
     *
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    function OntologyMetadata(id, label) {
        this.id = id;
        this.label = label;
    }
    return OntologyMetadata;
}());
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
var Cardinality = /** @class */ (function () {
    /**
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    function Cardinality(occurrence, value, property) {
        this.occurrence = occurrence;
        this.value = value;
        this.property = property;
    }
    return Cardinality;
}());
/**
 * A resource class definition.
 */
var ResourceClass = /** @class */ (function () {
    /**
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label describing the resource class.
     * @param {Cardinality[]} cardinalities the resource class's properties.
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
/**
 * A map of resource class Iris to resource class definitions.
 */
var ResourceClasses = /** @class */ (function () {
    function ResourceClasses() {
    }
    return ResourceClasses;
}());
/**
 * A property definition.
 */
var Property = /** @class */ (function () {
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
/**
 * A map of property Iris to property definitions.
 */
var Properties = /** @class */ (function () {
    function Properties() {
    }
    return Properties;
}());
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
     * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
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
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @param {OntologyInformation} ontologyInfo the given definitions that have to be integrated.
     * @returns void
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
     * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
     */
    OntologyInformation.prototype.getResourceClassForOntology = function () {
        return this.resourceClassesForOntology;
    };
    /**
     * Returns all resource classes as an object.
     *
     * @returns ResourceClasses - all resource class definitions as an object.
     */
    OntologyInformation.prototype.getResourceClasses = function () {
        return this.resourceClasses;
    };
    /**
     * Returns all resource classes as an array.
     *
     * @returns ResourceClass[]
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
     * @param {string} resClass resource class to query for.
     * @returns string - the resource class's label.
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
     * @returns Properties - all properties as an object.
     */
    OntologyInformation.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     * Returns all properties as an array.
     *
     * @returns Property[] - all properties as an array.
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
     * @param {string} property to query for.
     * @returns string - the property's label.
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
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
var OntologyCacheService = /** @class */ (function () {
    function OntologyCacheService(_ontologyService) {
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
     * @param {string} ontologyIri the Iri of the requested ontology.
     * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
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
     * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
     * @returns a new OntologyMetadata object
     */
    OntologyCacheService.prototype.convertAndWriteOntologiesMetadataToCache = function (ontologies) {
        this.cacheOntology.ontologies = ontologies.map(function (ontology) {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    };
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
     */
    OntologyCacheService.prototype.getAllOntologiesMetadataFromCache = function () {
        return this.cacheOntology.ontologies;
    };
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Array<object>} classDefinitions the class definitions in an ontology response.
     * @returns string[] - resource class Iris from the given class definitions.
     */
    OntologyCacheService.prototype.getResourceClassIrisFromOntologyResponse = function (classDefinitions) {
        var e_1, _a;
        var resourceClassIris = [];
        try {
            for (var classDefinitions_1 = __values(classDefinitions), classDefinitions_1_1 = classDefinitions_1.next(); !classDefinitions_1_1.done; classDefinitions_1_1 = classDefinitions_1.next()) {
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
    };
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
     * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
     * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
     */
    OntologyCacheService.prototype.getOntologyInformationFromCache = function (ontologyIris) {
        var e_2, _a;
        var resourceClassesForOntology = new ResourceClassIrisForOntology();
        // collect resource class Iris for all requested named graphs
        var allResourceClassIris = [];
        try {
            for (var ontologyIris_1 = __values(ontologyIris), ontologyIris_1_1 = ontologyIris_1.next(); !ontologyIris_1_1.done; ontologyIris_1_1 = ontologyIris_1.next()) {
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
    };
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteEntityDefinitionsToCache = function (resourceClassDefinitions, propertyClassDefinitions) {
        var e_3, _a, e_4, _b;
        try {
            // convert and cache each given resource class definition
            for (var resourceClassDefinitions_1 = __values(resourceClassDefinitions), resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next(); !resourceClassDefinitions_1_1.done; resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next()) {
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
                        for (var subclassOfCollection_1 = __values(subclassOfCollection), subclassOfCollection_1_1 = subclassOfCollection_1.next(); !subclassOfCollection_1_1.done; subclassOfCollection_1_1 = subclassOfCollection_1.next()) {
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
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_b = subclassOfCollection_1.return)) _b.call(subclassOfCollection_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                // write this resource class definition to the cache object
                this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_a = resourceClassDefinitions_1.return)) _a.call(resourceClassDefinitions_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // cache the property definitions
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
    };
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param {string[]} resClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
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
     * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteKnoraPropertyDefinitionsToOntologyCache = function (propertyDefinitionsFromKnora) {
        var e_5, _a;
        try {
            // convert and cache each given property definition
            for (var propertyDefinitionsFromKnora_1 = __values(propertyDefinitionsFromKnora), propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next(); !propertyDefinitionsFromKnora_1_1.done; propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next()) {
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
    };
    /**
     * Returns property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns OntologyInformation - requested property defintions.
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
     * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
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
     * @param {string[]} ontologyIris Iris of the ontologies to be requested.
     * @returns Observable<any[]>
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
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     * @returns Observable<OntologyInformation> - all ontology metadata from the cache
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
     * @param {string[]} resourceClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
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
     * @returns Observable<OntologyInformation> - the requested property definitions.
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
    OntologyCacheService.ngInjectableDef = defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
}());

/**
 * Requests representation of resources from Knora.
 */
var ResourceService = /** @class */ (function (_super) {
    __extends(ResourceService, _super);
    function ResourceService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (already URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    ResourceService.prototype.getResource = function (iri) {
        // console.log('IRI from resource service: ', iri);
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    };
    ResourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceService.ngInjectableDef = defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(inject(HttpClient), inject("config")); }, token: ResourceService, providedIn: "root" });
    return ResourceService;
}(ApiService));

/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Perform a fulltext search.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFulltextSearch = function (searchTerm, offset) {
        if (offset === void 0) { offset = 0; }
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        return this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);
    };
    /**
     * Perform a fulltext search count query.
     *
     * @param {string} searchTerm the term to search for.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFulltextSearchCountQuery = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    };
    /**
     * Perform an extended search.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearch = function (sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        // return this.httpGet('/v2/searchextended/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended', sparqlString);
    };
    /**
     * Perform an extended search count query.
     *
     * @param {string} sparqlString the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchCountQuery = function (sparqlString) {
        if (sparqlString === undefined || sparqlString.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        // return this.httpGet('/v2/searchextended/count/' + encodeURIComponent(sparqlString));
        return this.httpPost('/v2/searchextended/count', sparqlString);
    };
    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.searchByLabel = function (searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var params = {};
        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }
        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), params);
        // return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm));
    };
    SearchService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    SearchService.ngInjectableDef = defineInjectable({ factory: function SearchService_Factory() { return new SearchService(inject(HttpClient), inject("config")); }, token: SearchService, providedIn: "root" });
    return SearchService;
}(ApiService));

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
     * @returns boolean - indicating if the name refers to a value property.
     */
    var getPropertyNames = function (propName) {
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
     * @param {object} resourceJSONLD an a resource and its properties serialized as JSON-LD.
     * @returns ReadResource
     */
    function constructReadResource(resourceJSONLD) {
        var properties = constructReadProperties(resourceJSONLD);
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
     * @param {Object} propValue the value serialized as JSON-LD.
     * @param {string} propIri the Iri of the property.
     * @param {ReadLinkValue[]} standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue, propIri, standoffLinkValues) {
        // convert a JSON-LD property value to a `ReadPropertyItem`
        var e_1, _a;
        var valueSpecificProp;
        // check for the property's value type
        switch (propValue['@type']) {
            case KnoraConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                var textValue = void 0;
                if (propValue[KnoraConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                }
                else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                    var referredResources = {};
                    try {
                        // check for standoff links and include referred resources, if any
                        // when the user interacts with a standoff link, further information about the referred resource can be shown
                        for (var standoffLinkValues_1 = __values(standoffLinkValues), standoffLinkValues_1_1 = standoffLinkValues_1.next(); !standoffLinkValues_1_1.done; standoffLinkValues_1_1 = standoffLinkValues_1.next()) {
                            var standoffLink = standoffLinkValues_1_1.value;
                            var referredRes = standoffLink.referredResource;
                            referredResources[referredRes.id] = referredRes;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (standoffLinkValues_1_1 && !standoffLinkValues_1_1.done && (_a = standoffLinkValues_1.return)) _a.call(standoffLinkValues_1);
                        }
                        finally { if (e_1) throw e_1.error; }
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
                var dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                valueSpecificProp = dateValue;
                break;
            case KnoraConstants.LinkValue:
                var linkValue = void 0;
                // check if the referred resource is given as an object or just as an IRI
                if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object
                    var referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                }
                else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri
                    var referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                }
                else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object
                    var incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                }
                else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri
                    var incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }
                valueSpecificProp = linkValue;
                break;
            case KnoraConstants.IntValue:
                var intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;
                break;
            case KnoraConstants.DecimalValue:
                // a decimal value is represented as a string in order to preserve its precision
                var decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                var decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;
                break;
            case KnoraConstants.StillImageFileValue:
                var stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                valueSpecificProp = stillImageFileValue;
                break;
            case KnoraConstants.TextFileValue:
                var textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                valueSpecificProp = textFileValue;
                break;
            case KnoraConstants.ColorValue:
                var readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                valueSpecificProp = readColorValue;
                break;
            case KnoraConstants.GeomValue:
                var readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                valueSpecificProp = readGeomValue;
                break;
            case KnoraConstants.UriValue:
                var uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                valueSpecificProp = uriValue;
                break;
            case KnoraConstants.BooleanValue:
                var boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                valueSpecificProp = boolValue;
                break;
            case KnoraConstants.IntervalValue:
                // represented as strings to preserve precision
                var intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                var intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                var intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                valueSpecificProp = intervalValue;
                break;
            case KnoraConstants.ListValue:
                var listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
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
     * @param {object} resourceJSONLD an object describing the resource and its properties.
     * @returns ReadProperties
     */
    function constructReadProperties(resourceJSONLD) {
        var e_2, _a, e_3, _b, e_4, _c;
        // JSON-LD representing standoff link values
        // text values may contain standoff links
        var standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
        // to be populated with standoff link values
        var standoffLinkValues = [];
        // convert each standoff link value JSON-LD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            try {
                for (var standoffLinkValuesJSONLD_1 = __values(standoffLinkValuesJSONLD), standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next(); !standoffLinkValuesJSONLD_1_1.done; standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next()) {
                    var standoffLinkJSONLD = standoffLinkValuesJSONLD_1_1.value;
                    var standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                    standoffLinkValues.push(standoffVal);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (standoffLinkValuesJSONLD_1_1 && !standoffLinkValuesJSONLD_1_1.done && (_a = standoffLinkValuesJSONLD_1.return)) _a.call(standoffLinkValuesJSONLD_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (standoffLinkValuesJSONLD !== undefined) {
            var standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
            standoffLinkValues.push(standoffVal);
        }
        var propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        var properties = {};
        try {
            // iterate over all the given property names
            for (var propNames_1 = __values(propNames), propNames_1_1 = propNames_1.next(); !propNames_1_1.done; propNames_1_1 = propNames_1.next()) {
                var propName = propNames_1_1.value;
                var propValues = [];
                // either an array of values or just one value is given
                if (Array.isArray(resourceJSONLD[propName])) {
                    try {
                        // array of values
                        // for each property name, an array of property values is given, iterate over it
                        for (var _d = __values(resourceJSONLD[propName]), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var propValue = _e.value;
                            // convert a JSON-LD property value to a `ReadPropertyItem`
                            var valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                            // if it is undefined, the value could not be constructed correctly
                            // add the property value to the array of property values
                            if (valueSpecificProp !== undefined)
                                propValues.push(valueSpecificProp);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                else {
                    // only one value
                    var valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined)
                        propValues.push(valueSpecificProp);
                }
                // add the property to the properties object
                properties[propName] = propValues;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (propNames_1_1 && !propNames_1_1.done && (_b = propNames_1.return)) _b.call(propNames_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return properties;
    }
    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns ReadResourcesSequence - sequence of read resources
     */
    function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD) {
        var e_5, _a;
        var resources = [];
        var numberOfResources;
        var resourcesGraph = resourcesResponseJSONLD['@graph'];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;
            try {
                for (var resourcesGraph_1 = __values(resourcesGraph), resourcesGraph_1_1 = resourcesGraph_1.next(); !resourcesGraph_1_1.done; resourcesGraph_1_1 = resourcesGraph_1.next()) {
                    var resourceJSONLD = resourcesGraph_1_1.value;
                    var resource = constructReadResource(resourceJSONLD);
                    // add the resource to the resources array
                    resources.push(resource);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (resourcesGraph_1_1 && !resourcesGraph_1_1.done && (_a = resourcesGraph_1.return)) _a.call(resourcesGraph_1);
                }
                finally { if (e_5) throw e_5.error; }
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
                var resource = constructReadResource(resourcesResponseJSONLD);
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
     * @param {object} resourceJSONLD JSON-LD describing one resource.
     * @return string[] - an Array of resource class Iris (including duplicates).
     */
    function getReferredResourceClasses(resourceJSONLD) {
        var e_6, _a, e_7, _b;
        var propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        var referredResourceClasses = [];
        try {
            for (var propNames_2 = __values(propNames), propNames_2_1 = propNames_2.next(); !propNames_2_1.done; propNames_2_1 = propNames_2.next()) {
                var prop = propNames_2_1.value;
                // several values given for this property
                if (Array.isArray(resourceJSONLD[prop])) {
                    try {
                        for (var _c = __values(resourceJSONLD[prop]), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var referredRes = _d.value;
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
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_7) throw e_7.error; }
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
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (propNames_2_1 && !propNames_2_1.done && (_a = propNames_2.return)) _a.call(propNames_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return referredResourceClasses;
    }
    /**
     * Gets the resource types (classes) from a JSON-LD representing a sequence of resources.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns string[] - the resource class Iris (without duplicates).
     */
    function getResourceClassesFromJsonLD(resourcesResponseJSONLD) {
        var e_8, _a;
        var resourcesGraph = resourcesResponseJSONLD['@graph'];
        var resourceClasses = [];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            try {
                // an array of resources
                for (var resourcesGraph_2 = __values(resourcesGraph), resourcesGraph_2_1 = resourcesGraph_2.next(); !resourcesGraph_2_1.done; resourcesGraph_2_1 = resourcesGraph_2.next()) {
                    var resourceJSONLD = resourcesGraph_2_1.value;
                    // get class of the current resource
                    resourceClasses.push(resourceJSONLD['@type']);
                    // get the classes of referred resources
                    var referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                    resourceClasses = resourceClasses.concat(referredResourceClasses);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (resourcesGraph_2_1 && !resourcesGraph_2_1.done && (_a = resourcesGraph_2.return)) _a.call(resourcesGraph_2);
                }
                finally { if (e_8) throw e_8.error; }
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
                var referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
})(ConvertJSONLD || (ConvertJSONLD = {}));

/**
 * Requests incoming information (regions, links, stillImageRepresentations) from Knora.
 */
var IncomingService = /** @class */ (function (_super) {
    __extends(IncomingService, _super);
    function IncomingService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Returns all incoming regions for a particular resource.
    *
    * @param {string} resourceIRI the Iri of the resource whose Incoming regions should be returned.
    * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
    * @returns {Observable<any>}
    */
    IncomingService.prototype.getIncomingRegions = function (resourceIRI, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?region knora-api:isMainResource true .\n\n?region knora-api:hasGeometry ?geom .\n\n?region knora-api:hasComment ?comment .\n\n?region knora-api:hasColor ?color .\n} WHERE {\n?region a knora-api:Region .\n?region a knora-api:Resource .\n\n?region knora-api:isRegionOf <" + resourceIRI + "> .\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIRI + "> a knora-api:Resource .\n\n?region knora-api:hasGeometry ?geom .\nknora-api:hasGeometry knora-api:objectType knora-api:Geom .\n\n?geom a knora-api:Geom .\n\n?region knora-api:hasComment ?comment .\nknora-api:hasComment knora-api:objectType xsd:string .\n\n?comment a xsd:string .\n\n?region knora-api:hasColor ?color .\nknora-api:hasColor knora-api:objectType knora-api:Color .\n\n?color a knora-api:Color .\n} OFFSET " + offset + "\n";
        // console.log('sparqlQueryStr ', sparqlQueryStr);
        return this.doExtendedSearch(sparqlQueryStr);
    };
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param {string} resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    IncomingService.prototype.getStillImageRepresentationsForCompoundResource = function (resourceIri, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?page knora-api:isMainResource true .\n\n?page knora-api:seqnum ?seqnum .\n\n?page knora-api:hasStillImageFile ?file .\n} WHERE {\n\n?page a knora-api:StillImageRepresentation .\n?page a knora-api:Resource .\n\n?page knora-api:isPartOf <" + resourceIri + "> .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?page knora-api:seqnum ?seqnum .\nknora-api:seqnum knora-api:objectType xsd:integer .\n\n?seqnum a xsd:integer .\n\n?page knora-api:hasStillImageFile ?file .\nknora-api:hasStillImageFile knora-api:objectType knora-api:File .\n\n?file a knora-api:File .\n\n} ORDER BY ?seqnum\nOFFSET " + offset + "\n";
        return this.doExtendedSearch(sparqlQueryStr);
    };
    /**
     * Returns all incoming links for the given resource Iri but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    IncomingService.prototype.getIncomingLinksForResource = function (resourceIri, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?incomingRes knora-api:isMainResource true .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n} WHERE {\n\n?incomingRes a knora-api:Resource .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?incomingProp knora-api:objectType knora-api:Resource .\n\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isRegionOf <" + resourceIri + "> .\n}\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isPartOf <" + resourceIri + "> .\n}\n\n} OFFSET " + offset + "\n";
        return this.doExtendedSearch(sparqlQueryStr);
    };
    IncomingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    IncomingService.ngInjectableDef = defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(inject(HttpClient), inject("config")); }, token: IncomingService, providedIn: "root" });
    return IncomingService;
}(SearchService));

/**
 * Represents the parameters of an extended search.
 */
var ExtendedSearchParams = /** @class */ (function () {
    /**
     *
     * @param generateGravsearch a function that generates a Gravsearch query.
     *
     *                           The function takes the offset
     *                           as a parameter and returns a Gravsearch query string.
     *                           Returns false if not set correctly (init state).
     */
    function ExtendedSearchParams(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
    return ExtendedSearchParams;
}());
var SearchParamsService = /** @class */ (function () {
    function SearchParamsService() {
        // init with a dummy function that returns false
        // if the application is reloaded, this will be returned
        this._currentSearchParams = new BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
    }
    /**
     * Updates the parameters of an extended search.
     *
     * @param {ExtendedSearchParams} searchParams
     * @returns void
     */
    SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
        this._currentSearchParams.next(searchParams);
    };
    /**
     * Gets the search params of an extended search.
     *
     * @returns ExtendedSearchParams - search parameters
     */
    SearchParamsService.prototype.getSearchParams = function () {
        return this._currentSearchParams.getValue();
    };
    SearchParamsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    SearchParamsService.ctorParameters = function () { return []; };
    SearchParamsService.ngInjectableDef = defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
    return SearchParamsService;
}());

/**
 * @ignore
 * Represents an error that occurred when generating KnarQL.
 */
var GravsearchGenerationError = /** @class */ (function (_super) {
    __extends(GravsearchGenerationError, _super);
    function GravsearchGenerationError(msg) {
        return _super.call(this, msg) || this;
    }
    return GravsearchGenerationError;
}(Error));
/**
 * Create GravSearch queries from provided parameters.
 */
var GravsearchGenerationService = /** @class */ (function () {
    function GravsearchGenerationService(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * @private
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns string - the corresponding Iri of the simple type (knora-api simple).
       */
    GravsearchGenerationService.prototype.convertComplexTypeToSimpleType = function (complexType) {
        var simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
        if (simpleType !== undefined) {
            return simpleType;
        }
        else {
            throw new GravsearchGenerationError("complex type " + complexType + " could not be converted to simple type.");
        }
    };
    /**
     * Generates a Gravsearch query from the provided arguments.
     *
     * @param {PropertyWithValue[]} properties the properties specified by the user.
     * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
     * @param {number} offset the offset to be used (nth page of results).
     * @returns string - a KnarQL query string.
     */
    GravsearchGenerationService.prototype.createGravsearchQuery = function (properties, mainResourceClassOption, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        // class restriction for the resource searched for
        var mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = "?mainRes a <" + Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption) + "> .";
        }
        // criteria for the order by statement
        var orderByCriteria = [];
        // statements to be returned in query results
        var returnStatements = [];
        // loop over given properties and create statements and Filters and type annotations from them
        var props = properties.map(function (propWithVal, index) {
            var propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
            var simpleType;
            if (!propWithVal.property.isLinkProperty) {
                simpleType = _this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
            }
            else {
                simpleType = KnoraConstants.resourceSimple;
            }
            // represents the object of a statement
            var propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = "?propVal" + index;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple);
            }
            // generate statement
            var statement = "?mainRes <" + propIriSimple + "> " + propValue + " .";
            // type annotations
            var propTypeAnnotation = "<" + propIriSimple + "> knora-api:objectType <" + simpleType + "> .";
            var propValueAnnotation = propValue + " a <" + simpleType + "> .";
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = "FILTER NOT EXISTS {\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n}";
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = "\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n";
            }
            // generate filter if comparison operator is not Exists
            var filter = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // use regex function for LIKE
                    filter = "FILTER regex(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ", \"i\")";
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // use contains function for MATCH
                    filter = "FILTER <" + KnoraConstants.matchFunction + ">(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
                else {
                    filter = "FILTER(" + propValue + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return statement + "\n" + filter + "\n";
        });
        var orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = "\nORDER BY " + orderByCriteria.join(' ') + "\n";
        }
        // template of the KnarQL query with dynamic components
        var gravsearchTemplate = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\nCONSTRUCT {\n\n?mainRes knora-api:isMainResource true .\n\n" + returnStatements.join('\n') + "\n\n} WHERE {\n\n?mainRes a knora-api:Resource .\n\n" + mainResourceClass + "\n\n" + props.join('') + "\n\n}\n" + orderByStatement;
        // offset component of the KnarQL query
        var offsetTemplate = "\nOFFSET " + offset + "\n";
        // function that generates the same KnarQL query with the given offset
        var generateGravsearchQueryWithCustomOffset = function (localOffset) {
            var offsetCustomTemplate = "\nOFFSET " + localOffset + "\n";
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        // console.log(knarqlTemplate + offsetTemplate);
        return gravsearchTemplate + offsetTemplate;
    };
    /**
     * @ignore
     *
     * Map of complex knora-api value types to simple ones.
     * Use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer.
     */
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
    GravsearchGenerationService.ctorParameters = function () { return [
        { type: SearchParamsService }
    ]; };
    GravsearchGenerationService.ngInjectableDef = defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
    return GravsearchGenerationService;
}());

var StoreService = /** @class */ (function () {
    function StoreService(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
       * Resets the content of the triplestore.
       *
       * @param rdfDataObjects
       * @returns Observable<string>
       */
    StoreService.prototype.resetTriplestoreContent = function (rdfDataObjects) {
        return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(map(function (data) {
            var result = data;
            // console.log('StoreService - resetTriplestoreContent: ', result);
            return result.message;
        }, function (error) {
            if (error.error instanceof Error) {
                console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
            }
            else {
                console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
            }
            throw error;
        }));
    };
    StoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StoreService.ngInjectableDef = defineInjectable({ factory: function StoreService_Factory() { return new StoreService(inject(HttpClient), inject("config")); }, token: StoreService, providedIn: "root" });
    return StoreService;
}());

var BasicOntologyService = /** @class */ (function (_super) {
    __extends(BasicOntologyService, _super);
    function BasicOntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * returns our list of a basic ontology
       *
       * @returns {Observable<any>}
       */
    // getBasicOntology(): Observable<any> {
    //     let url = environment.url;
    //     return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    // }
    BasicOntologyService.prototype.getBasicOntology = function () {
        var url = this.config.app;
        return this.httpGet(url + '/data/base-data/basic-ontology.json');
        // return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    };
    BasicOntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    BasicOntologyService.ngInjectableDef = defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(inject(HttpClient), inject("config")); }, token: BasicOntologyService, providedIn: "root" });
    return BasicOntologyService;
}(ApiService));

var ResourceTypesService = /** @class */ (function (_super) {
    __extends(ResourceTypesService, _super);
    function ResourceTypesService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * Get all resource types defined by the vocabulary.
       *
       * @param {string} iri Vocabulary iri
       * @returns Observable<any>
       */
    ResourceTypesService.prototype.getResourceTypesByVoc = function (iri) {
        return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
    };
    /**
     * Get a specific resource type.
     *
     * @param {string} iri resource type iri
     * @returns Observable<any>
     */
    ResourceTypesService.prototype.getResourceType = function (iri) {
        return this.httpGet('/v1/resourcetypes/' + encodeURIComponent(iri));
    };
    ResourceTypesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceTypesService.ngInjectableDef = defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(inject(HttpClient), inject("config")); }, token: ResourceTypesService, providedIn: "root" });
    return ResourceTypesService;
}(ApiService));

/**
 * main api services
 */

var Equals = /** @class */ (function () {
    function Equals() {
        this.type = KnoraConstants.EqualsComparisonOperator;
        this.label = KnoraConstants.EqualsComparisonLabel;
    }
    Equals.prototype.getClassName = function () {
        return 'Equals';
    };
    return Equals;
}());
var NotEquals = /** @class */ (function () {
    function NotEquals() {
        this.type = KnoraConstants.NotEqualsComparisonOperator;
        this.label = KnoraConstants.NotEqualsComparisonLabel;
    }
    NotEquals.prototype.getClassName = function () {
        return 'NotEquals';
    };
    return NotEquals;
}());
var GreaterThanEquals = /** @class */ (function () {
    function GreaterThanEquals() {
        this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
        this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
    }
    GreaterThanEquals.prototype.getClassName = function () {
        return 'GreaterThanEquals';
    };
    return GreaterThanEquals;
}());
var GreaterThan = /** @class */ (function () {
    function GreaterThan() {
        this.type = KnoraConstants.GreaterThanComparisonOperator;
        this.label = KnoraConstants.GreaterThanComparisonLabel;
    }
    GreaterThan.prototype.getClassName = function () {
        return 'GreaterThan';
    };
    return GreaterThan;
}());
var LessThan = /** @class */ (function () {
    function LessThan() {
        this.type = KnoraConstants.LessThanComparisonOperator;
        this.label = KnoraConstants.LessThanComparisonLabel;
    }
    LessThan.prototype.getClassName = function () {
        return 'LessThan';
    };
    return LessThan;
}());
var LessThanEquals = /** @class */ (function () {
    function LessThanEquals() {
        this.type = KnoraConstants.LessThanEqualsComparisonOperator;
        this.label = KnoraConstants.LessThanQualsComparisonLabel;
    }
    LessThanEquals.prototype.getClassName = function () {
        return 'LessThanEquals';
    };
    return LessThanEquals;
}());
var Exists = /** @class */ (function () {
    function Exists() {
        this.type = KnoraConstants.ExistsComparisonOperator;
        this.label = KnoraConstants.ExistsComparisonLabel;
    }
    Exists.prototype.getClassName = function () {
        return 'Exists';
    };
    return Exists;
}());
var Like = /** @class */ (function () {
    function Like() {
        this.type = KnoraConstants.LikeComparisonOperator;
        this.label = KnoraConstants.LikeComparisonLabel;
    }
    Like.prototype.getClassName = function () {
        return 'Like';
    };
    return Like;
}());
var Match = /** @class */ (function () {
    function Match() {
        this.type = KnoraConstants.MatchComparisonOperator;
        this.label = KnoraConstants.MatchComparisonLabel;
    }
    Match.prototype.getClassName = function () {
        return 'Match';
    };
    return Match;
}());
/**
 * Combination of a comparison operator and a value literal or an IRI.
 * In case the comparison operator is 'Exists', no value is given.
 */
var ComparisonOperatorAndValue = /** @class */ (function () {
    function ComparisonOperatorAndValue(comparisonOperator, value) {
        this.comparisonOperator = comparisonOperator;
        this.value = value;
    }
    return ComparisonOperatorAndValue;
}());
/**
 * Represents a property's value as a literal with the indication of its type.
 */
var ValueLiteral = /** @class */ (function () {
    /**
     * Constructs a [ValueLiteral].
     *
     * @param {string} value the literal representation of the value.
     * @param {string} type the type of the value (making use of xsd).
     */
    function ValueLiteral(value, type) {
        this.value = value;
        this.type = type;
    }
    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    ValueLiteral.prototype.toSparql = function (schema) {
        var literalType;
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
        return "\"" + this.value + "\"^^<" + literalType + ">";
    };
    return ValueLiteral;
}());
/**
 * Represents an IRI.
 */
var IRI = /** @class */ (function () {
    /**
     * Constructs an [IRI].
     *
     * @param {string} iri the IRI of a resource instance.
     */
    function IRI(iri) {
        this.iri = iri;
    }
    /**
     * Creates a SPARQL representation of the IRI.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    IRI.prototype.toSparql = function (schema) {
        // this is an instance Iri and does not have to be converted.
        return "<" + this.iri + ">";
    };
    return IRI;
}());
/**
 * Represents a property, the specified comparison operator, and value.
 */
var PropertyWithValue = /** @class */ (function () {
    /**
     * Constructs a [PropertyWithValue].
     *
     * @param {Property} property the specified property.
     * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
     * @param isSortCriterion indicates if the property is used as a sort criterion.
     */
    function PropertyWithValue(property, valueLiteral, isSortCriterion) {
        this.property = property;
        this.valueLiteral = valueLiteral;
        this.isSortCriterion = isSortCriterion;
    }
    return PropertyWithValue;
}());

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KuiCoreConfig as ɵa, Property as ɵb, KuiCoreModule, ɵ0, KuiCoreConfig, ApiServiceResult, ApiServiceError, Utils, KnoraConstants, KnoraSchema, StringLiteral, Precision, DateSalsah, DateRangeSalsah, AuthenticationResponse, Group, GroupResponse, GroupsResponse, List, ListInfo, ListInfoResponse, ListNode, ListNodeInfo, ListNodeInfoResponse, ListResponse, ListsResponse, OntologyInfoShort, PermissionData, Project, ProjectMembersResponse, ProjectResponse, ProjectsResponse, CurrentUser, UsersResponse, UserResponse, User, ReadTextValue, ReadTextValueAsString, ReferredResourcesByStandoffLink, ReadTextValueAsHtml, ReadTextValueAsXml, ReadDateValue, ReadLinkValue, ReadIntegerValue, ReadDecimalValue, ReadStillImageFileValue, ReadTextFileValue, ReadColorValue, Point2D, RegionGeometry, ReadGeomValue, ReadUriValue, ReadBooleanValue, ReadIntervalValue, ReadListValue, ReadResource, ReadResourcesSequence, StillImageRepresentation, ImageRegion, Equals, NotEquals, GreaterThanEquals, GreaterThan, LessThan, LessThanEquals, Exists, Like, Match, ComparisonOperatorAndValue, ValueLiteral, IRI, PropertyWithValue, ApiService, GroupsService, ListsService, ProjectsService, UsersService, LanguageService, StatusMsgService, OntologyService, OntologyMetadata, CardinalityOccurrence, Cardinality, ResourceClass, ResourceClasses, Property, Properties, ResourceClassIrisForOntology, OntologyInformation, OntologyCacheService, ResourceService, SearchService, ConvertJSONLD, IncomingService, ExtendedSearchParams, SearchParamsService, GravsearchGenerationService, StoreService, BasicOntologyService, ResourceTypesService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vdXNlcnMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2NvbnZlcnQtanNvbmxkLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvaW5jb21pbmcuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9pbmRleC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9rbm9yYS1jb3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogS25vcmEtdWkgY29yZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIHNlcnZlciBkZWZpbml0aW9ucyBvZjpcbiAqICAtIGFwaTogVVJMIG9mIGRhdGEgc2VydmljZSBlLmcuIGtub3JhOiBodHRwOi8vbG9jYWxob3N0OjMzMzNcbiAqICAtIG1lZGlhOiBVUkwgb2YgbWVkaWEgc2VydmVyIHNlcnZpY2UgZS5nLiBzaXBpOiBodHRwOi8vbG9jYWxob3N0OjEwMjRcbiAqICAtIGFwcDogVVJMIG9mIHRoZSBhcHAgZS5nLiBzYWxzYWg6IGh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFxuICovXG5ASnNvbk9iamVjdCgnS3VpQ29yZUNvbmZpZycpXG5leHBvcnQgY2xhc3MgS3VpQ29yZUNvbmZpZyB7XG5cbiAgICAvKipcbiAgICAgKiBuYW1lIG9mIHRoZSBhcHAgZS5nLiAnU0FMU0FIJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBhcHAgZS5nLiAnaHR0cHM6Ly9zYWxzYWgub3JnJ1xuICAgICAqIEB0eXBlIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBwJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcHA6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiB0aGUgYXBpIGUuZy4gJ2h0dHBzOi8vYXBpLmtub3JhLm9yZydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwaScsIFN0cmluZylcbiAgICBwdWJsaWMgYXBpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgbWVkaWEvZmlsZSBzZXJ2ZXIgZS5nLiAnaHR0cHM6Ly9paWlmLnNpcGkuaW8nXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdtZWRpYScsIFN0cmluZylcbiAgICBwdWJsaWMgbWVkaWE6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIiwiXG5pbXBvcnQgeyBKc29uQ29udmVydCwgT3BlcmF0aW9uTW9kZSwgVmFsdWVDaGVja2luZ01vZGUgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFJlc3VsdCBjbGFzcyB1c2VkIGFzIEFQSSB1cmwgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZVJlc3VsdCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBqc29uQ29udmVydDogSnNvbkNvbnZlcnQgPSBuZXcgSnNvbkNvbnZlcnQoT3BlcmF0aW9uTW9kZS5FTkFCTEUsIFZhbHVlQ2hlY2tpbmdNb2RlLkFMTE9XX05VTEwpO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgYXMgSlNPTlxuICAgICAqL1xuICAgIGJvZHk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc3VsdCBib2R5IGFzIGluc3RhbmNlIG9mIGNsYXNzT2JqZWN0LlxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICogQHRocm93c1xuICAgICAqL1xuXG4gICAgZ2V0Qm9keShjbGFzc09iamVjdD86IHsgbmV3KCk6IGFueSB9KTogYW55IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ib2R5KTtcbiAgICAgICAgcmV0dXJuIEFwaVNlcnZpY2VSZXN1bHQuanNvbkNvbnZlcnQuZGVzZXJpYWxpemUodGhpcy5ib2R5LCBjbGFzc09iamVjdCk7XG4gICAgfVxuXG5cbn1cbiIsIlxuLyoqXG4gKiBFcnJvciBjbGFzcyB1c2VkIGFzIEFQSSByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlRXJyb3Ige1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZXJyb3IgaW5mb1xuICAgICAqL1xuICAgIGVycm9ySW5mbyA9ICcnO1xuXG59XG4iLCJleHBvcnQgY2xhc3MgS25vcmFDb25zdGFudHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaSc7XG4gICAgcHVibGljIHN0YXRpYyBQYXRoU2VwYXJhdG9yID0gJyMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYU9udG9sb2d5UGF0aDogc3RyaW5nID0gJ2h0dHA6Ly93d3cua25vcmEub3JnL29udG9sb2d5JztcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQmFzZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFPbnRvbG9neVBhdGggKyAnL2tub3JhLWJhc2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1Qcm9qZWN0SVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbVByb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtQWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1BZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0QWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0QWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdE1lbWJlckdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RNZW1iZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyU2ltcGxlUGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPbnRvbG9neSA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT3JkZXIgPSBLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSArICcjZ3VpT3JkZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTdGFuZG9mZk9udG9sb2d5ID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3N0YW5kb2ZmL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBCb29sZWFuVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0Jvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBVcmlWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQ29sb3JWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9tVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3RWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpbmtWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb25hbWVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbmFtZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEF1ZGlvRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdBdWRpb0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBERERGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0REREZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEb2N1bWVudEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRG9jdW1lbnRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBNb3ZpbmdJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTW92aW5nSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJc1Jlc291cmNlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzUmVzb3VyY2VDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbHVlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzVmFsdWVDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBGb3JiaWRkZW5SZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRm9yYmlkZGVuUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgWE1MVG9TdGFuZG9mZk1hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1hNTFRvU3RhbmRvZmZNYXBwaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0Tm9kZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE9iamVjdFR5cGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdvYmplY3RUeXBlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlSWNvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAncmVzb3VyY2VJY29uJztcbiAgICBwdWJsaWMgc3RhdGljIGlzRWRpdGFibGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzRWRpdGFibGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1ZhbHVlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1ZhbHVlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2VvbWV0cnkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNHZW9tZXRyeSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU5hbWUgPSAnaHR0cDovL3NjaGVtYS5vcmcvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOdW1iZXJPZkl0ZW1zID0gJ2h0dHA6Ly9zY2hlbWEub3JnL251bWJlck9mSXRlbXMnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hSXRlbUxpc3RFbGVtZW50ID0gJ2h0dHA6Ly9zY2hlbWEub3JnL2l0ZW1MaXN0RWxlbWVudCc7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgUmRmUHJvcGVydHk6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0xhYmVsID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNsYWJlbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzQ29tbWVudCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjY29tbWVudCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU3ViY2xhc3NPZiA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjc3ViQ2xhc3NPZic7XG4gICAgcHVibGljIHN0YXRpYyBzdWJQcm9wZXJ0eU9mOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI3N1YlByb3BlcnR5T2YnO1xuXG4gICAgcHVibGljIHN0YXRpYyBvd2w6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE93bENsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0NsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9iamVjdFByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI09iamVjdFByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bERhdGF0eXBlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjRGF0YXR5cGVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xBbm5vdGF0aW9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQW5ub3RhdGlvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNYXhDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtYXhDYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNaW5DYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtaW5DYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNjYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xSZXN0cmljdGlvbiA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjUmVzdHJpY3Rpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjcmVhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdE1vZGlmaWNhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsYXN0TW9kaWZpY2F0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNQZXJtaXNzaW9ucyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1Blcm1pc3Npb25zJztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Qcm9qZWN0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1Byb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1VzZXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvVXNlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lvbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1JlZ2lvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1N0cmluZzogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERhdGVWYWx1ZTogc3RyaW5nID0gJ1JlYWREYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpbmtWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVnZXJWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlZ2VyVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERlY2ltYWxWYWx1ZTogc3RyaW5nID0gJ1JlYWREZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRHZW9tVmFsdWU6IHN0cmluZyA9ICdSZWFkR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRDb2xvclZhbHVlOiBzdHJpbmcgPSAnUmVhZENvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFVyaVZhbHVlOiBzdHJpbmcgPSAnUmVhZFVyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRCb29sZWFuVmFsdWU6IHN0cmluZyA9ICdSZWFkQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpc3RWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaXN0VmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd2YWx1ZUFzU3RyaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUhhc01hcHBpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVIYXNNYXBwaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0WWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0TW9udGggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZE1vbnRoID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kTW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzQ2FsZW5kYXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNDYWxlbmRhcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldCc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2UgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlSXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlSXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldElyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldElyaSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVnZXJWYWx1ZUFzSW50ZWdlciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludFZhbHVlQXNJbnQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWNpbWFsVmFsdWVBc0RlY2ltYWwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkZWNpbWFsVmFsdWVBc0RlY2ltYWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVBc1VybCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUFzVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUlzUHJldmlldyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUlzUHJldmlldyc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVIYXNGaWxlbmFtZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUhhc0ZpbGVuYW1lJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVknO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JWYWx1ZUFzQ29sb3IgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjb2xvclZhbHVlQXNDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2dlb21ldHJ5VmFsdWVBc0dlb21ldHJ5JztcbiAgICBwdWJsaWMgc3RhdGljIHVyaVZhbHVlQXNVcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd1cmlWYWx1ZUFzVXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGJvb2xlYW5WYWx1ZUFzQm9vbGVhbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2Jvb2xlYW5WYWx1ZUFzQm9vbGVhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNTdGFydCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNTdGFydCc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzRW5kID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc0VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFhzZCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnO1xuXG4gICAgcHVibGljIHN0YXRpYyB4c2RTdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnc3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEJvb2xlYW4gPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYm9vbGVhbic7XG4gICAgcHVibGljIHN0YXRpYyB4c2RJbnRlZ2VyID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2ludGVnZXInO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkRGVjaW1hbCA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdkZWNpbWFsJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZFVyaSA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdhbnlVUkknO1xuXG4gICAgcHVibGljIHN0YXRpYyByZXNvdXJjZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdEYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnSW50ZXJ2YWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb20nO1xuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9uYW1lU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRmlsZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoRnVuY3Rpb24gPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdtYXRjaCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc9JztcbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICchPSc7XG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgbm90IGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPic7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc+PSc7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPCc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBsZXNzIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc8PSc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxlc3MgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uT3BlcmF0b3IgPSAnRSc7XG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uTGFiZWwgPSAnZXhpc3RzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25PcGVyYXRvciA9ICdyZWdleCc7XG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxpa2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25PcGVyYXRvciA9ICdjb250YWlucyc7XG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25MYWJlbCA9ICdtYXRjaGVzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoTGluayA9ICdzYWxzYWgtbGluayc7IC8vIGNsYXNzIG9uIGFuIEhUTUwgPGE+IGVsZW1lbnQgdGhhdCBpbmRpY2F0ZXMgYSBsaW5rIHRvIGEgS25vcmEgcmVzb3VyY2VcbiAgICBwdWJsaWMgc3RhdGljIFJlZk1hcmtlciA9ICdyZWYtbWFya2VyJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCBlbGVtZW50IHRoYXQgcmVmZXJzIHRvIGFub3RoZXIgZWxlbWVudCBpbiB0aGUgc2FtZSBkb2N1bWVudFxuXG4gICAgcHVibGljIHN0YXRpYyBHTkRQcmVmaXggPSAnKERFLTU4OCknO1xuICAgIHB1YmxpYyBzdGF0aWMgR05EUmVzb2x2ZXIgPSAnaHR0cDovL2QtbmIuaW5mby9nbmQvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgVklBRlByZWZpeCA9ICcoVklBRiknO1xuICAgIHB1YmxpYyBzdGF0aWMgVklBRlJlc29sdmVyID0gJ2h0dHBzOi8vdmlhZi5vcmcvdmlhZi8nO1xuXG59XG5cblxuZXhwb3J0IGVudW0gS25vcmFTY2hlbWEge1xuICAgIGNvbXBsZXggPSAwLFxuICAgIHNpbXBsZSA9IDFcbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgdXRpbGl0eSBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi9hcGkva25vcmEtY29uc3RhbnRzJztcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBFbWFpbCBhZGRyZXNzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4RW1haWwgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVc2VybmFtZS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFVzZXJuYW1lID0gL15bYS16QS1aMC05XSskLztcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgVVJMcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFVybCA9IC9eKGh0dHA6XFwvXFwvd3d3XFwufGh0dHBzOlxcL1xcL3d3d1xcLnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC8pP1thLXowLTldKyhbXFwtXFwuXXsxfVthLXowLTldKykqXFwuW2Etel17Miw2fSg6WzAtOV17MSw1fSk/KFxcLy4qKT8kL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFBhc3N3b3Jkc1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4UGFzc3dvcmQgPSAvXig/PS4qXFxkKSg/PS4qW2EtekEtWl0pLns4LH0kL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIEhleGFkZWNpbWFsIHZhbHVlc1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4SGV4ID0gL15bMC05QS1GYS1mXSskLztcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgc2hvcnRuYW1lIGluIHByb2plY3RzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhTaG9ydG5hbWUgPSAvXlthLXpBLVpdK1xcUyokLztcblxuXG4gICAgLyoqXG4gICAgICogTGFtYmRhIGZ1bmN0aW9uIGVsaW1pbmF0aW5nIGR1cGxpY2F0ZXMgaW4gYSBjb2xsZWN0aW9uIHRvIGJlIHBhc3NlZCB0byBbW2ZpbHRlcl1dLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW0gZWxlbWVudCBvZiBhbiBBcnJheSB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyBsb29rZWQgYXQuXG4gICAgICogQHBhcmFtIGluZGV4IGN1cnJlbnQgZWxlbWVudHMgaW5kZXguXG4gICAgICogQHBhcmFtIHNlbGYgcmVmZXJlbmNlIHRvIHRoZSB3aG9sZSBBcnJheS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc2FtZSBlbGVtZW50IGRvZXMgbm90IGFscmVhZHkgZXhpc3QgaW4gdGhlIEFycmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsdGVyT3V0RHVwbGljYXRlcyA9IChlbGVtLCBpbmRleDogbnVtYmVyLCBzZWxmKSA9PiB7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY3NDc3OTgvZGVsZXRlLWR1cGxpY2F0ZS1lbGVtZW50cy1mcm9tLWFuLWFycmF5XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlcj92PWV4YW1wbGVcblxuICAgICAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQncyBpbmRleCBlcXVhbHMgdGhlIGluZGV4IG9mIHRoZSBsZWZ0bW9zdCBlbGVtZW50XG4gICAgICAgIC8vIC0+IHRoaXMgbWVhbnMgdGhhdCB0aGVyZSBpcyBubyBpZGVudGljYWwgZWxlbWVudCBiZWZvcmUgdGhpcyBpbmRleCwgaGVuY2UgaXQgaXMgbm90IGEgZHVwbGljYXRlXG4gICAgICAgIC8vIGZvciBhbGwgb3RoZXIgZWxlbWVudHMsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gc2VsZi5pbmRleE9mKGVsZW0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBLbm9yYSBlbnRpdHkgSVJJLCBnZXRzIHRoZSBvbnRvbG9neSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50aXR5SXJpIGFuIGVudGl0eSBJcmkuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgb250b2xvZ3kgSVJJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkoZW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBjbGFzcyBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gZW50aXR5SXJpLnNwbGl0KEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2VudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXgga25vcmEtYXBpIGVudGl0eSBJcmkgdG8gYSBrbm9yYS1hcGkgc2ltcGxlIGVudGl0eSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleEVudGl0eUlyaVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUoY29tcGxleEVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgZW50aXR5IElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBjb21wbGV4RW50aXR5SXJpLnNwbGl0KCd2MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtjb21wbGV4RW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIC8vIGFkZCAnc2ltcGxlJyB0byBiYXNlIHBhdGhcbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdICsgJ3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yICsgc2VnbWVudHNbMV07XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1N0cmluZ0xpdGVyYWwnKVxuZXhwb3J0IGNsYXNzIFN0cmluZ0xpdGVyYWwge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndmFsdWUnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZ3VhZ2UnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmd1YWdlOiBzdHJpbmcgPSAnJztcbn1cbiIsIi8qKlxuICogUHJlY2lzaW9uIGZvciBEYXRlU2Fsc2FoLlxuICovXG5leHBvcnQgZW51bSBQcmVjaXNpb24ge1xuICAgIHllYXJQcmVjaXNpb24sXG4gICAgbW9udGhQcmVjaXNpb24sXG4gICAgZGF5UHJlY2lzaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFNhbHNhaCBkYXRlIG9iamVjdCB3aXRoIGEgcHJlY2lzaW9uIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVNhbHNhaCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXBhcmF0b3IgPSAnLSc7XG5cbiAgICByZWFkb25seSBwcmVjaXNpb246IFByZWNpc2lvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgeWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBtb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGF5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHllYXIgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG1vbnRoIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXkgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5kYXlQcmVjaXNpb247XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgd2l0aG91dCB0aGUgY2FsZW5kYXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpIHtcblxuICAgICAgICBsZXQgZGF0ZVN0cmluZyA9ICcoJyArIHRoaXMuZXJhICsgJykgJztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlY2lzaW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLnllYXJQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5tb250aFByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5kYXlQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aCArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5kYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSAod2l0aCBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyICsgJzonICsgdGhpcy5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGVyaW9kICh3aXRoIHN0YXJ0IGRhdGUgYW5kIGVuZCBkYXRlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVSYW5nZVNhbHNhaCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgc3RhcnQ6IERhdGVTYWxzYWgsXG4gICAgICAgIHJlYWRvbmx5IGVuZDogRGF0ZVNhbHNhaFxuICAgICkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgcmFuZ2UgKHdpdGggcHJlY2VkaW5nIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydC5nZXREYXRlQXNTdHJpbmcoKSArICc6JyArIHRoaXMuZW5kLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdBdXRoZW50aWNhdGlvblJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3QnKVxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydG5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHNob3J0bmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRjb2RlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzaG9ydGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvbmduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb25nbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBTdHJpbmdMaXRlcmFsW10gPSBbbmV3IFN0cmluZ0xpdGVyYWwoKV07XG5cbiAgICBASnNvblByb3BlcnR5KCdrZXl3b3JkcycsIFtTdHJpbmddLCB0cnVlKVxuICAgIHB1YmxpYyBrZXl3b3Jkczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb2dvJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpbnN0aXR1dGlvbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgaW5zdGl0dXRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2dpZXMnLCBbU3RyaW5nXSlcbiAgICBwdWJsaWMgb250b2xvZ2llczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXAnKVxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBTdHJpbmcpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdCwgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3VwUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3VwUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXAnLCBHcm91cClcbiAgICBwdWJsaWMgZ3JvdXA6IEdyb3VwID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3Vwc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsZXZlbCcsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuaW1wb3J0IHsgTGlzdE5vZGUgfSBmcm9tICcuL2xpc3Qtbm9kZSc7XG5cbkBKc29uT2JqZWN0KCdMaXN0JylcbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIGZhbHNlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25vZGVpbmZvJywgTGlzdE5vZGVJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbm9kZWluZm86IExpc3ROb2RlSW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0JywgTGlzdCwgZmFsc2UpXG4gICAgcHVibGljIGxpc3Q6IExpc3QgPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0cycsIFtMaXN0Tm9kZUluZm9dLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdHM6IExpc3ROb2RlSW5mb1tdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdPbnRvbG9neUluZm9TaG9ydCcpXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvU2hvcnQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lJcmknLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnUGVybWlzc2lvbkRhdGEnKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EYXRhIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3Vwc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGdyb3Vwc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2FkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vZ3JvdXBzL2dyb3VwJztcbmltcG9ydCB7IFBlcm1pc3Npb25EYXRhIH0gZnJvbSAnLi4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1VzZXInKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdlbWFpbCcsIFN0cmluZylcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGFzc3dvcmQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dpdmVuTmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZ2l2ZW5OYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdmYW1pbHlOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBmYW1pbHlOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nlc3Npb25JZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2Vzc2lvbklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwZXJtaXNzaW9ucycsIFBlcm1pc3Npb25EYXRhKVxuICAgIHB1YmxpYyBwZXJtaXNzaW9uczogUGVybWlzc2lvbkRhdGEgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXN0ZW1BZG1pbicsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIHN5c3RlbUFkbWluPzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcnMvdXNlcic7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlIHtcbiAgICBASnNvblByb3BlcnR5KCdtZW1iZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyBtZW1iZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3RSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3QnLCBQcm9qZWN0KVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0c1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdFxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2p3dCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgand0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXNBZG1pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHN5c0FkbWluOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2Vyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2Vyc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyB1c2VyczogVXNlcltdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2VyUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VyJywgVXNlcilcbiAgICBwdWJsaWMgdXNlcjogVXNlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5cbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RpbGwgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBpbWFnZUZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGltYWdlIGlzIGEganBlZywgaXQgaXMgYSBwcmV2aWV3IGltYWdlXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gaW1hZ2VGaWxlbmFtZS5lbmRzV2l0aCgnLmpwZycpO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoMTAwIC8gcmVkdWNlRmFjdG9yKTtcblxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IChwZXJjZW50YWdlID4gMCAmJiBwZXJjZW50YWdlIDw9IDEwMCkgPyBwZXJjZW50YWdlIDogNTA7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyB0aGlzLmltYWdlRmlsZW5hbWUgKyAnL2Z1bGwvcGN0OicgKyBwZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnLzAvZGVmYXVsdC5qcGcnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRTdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpc3RWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUlyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUxhYmVsOiBzdHJpbmcsICkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUxhYmVsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFByb3BlcnRpZXMgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2Uge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgdGhlIHJlc291cmNlJ3MgSXJpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSByZXNvdXJjZSdzIHR5cGUgKGNsYXNzKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgdGhlIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nUmVnaW9ucyByZWdpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdMaW5rcyByZXNvdXJjZXMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW119IHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyB0byBiZSBkaXNwbGF5ZWQgZm9yIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1JlYWRQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHRoZSByZXNvdXJjZXMncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1JlZ2lvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ0xpbmtzOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheTogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBwcm9wZXJ0aWVzPzogUmVhZFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gcmVzb3VyY2VzIGdpdmVuIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZXNvdXJjZXMgbnVtYmVyIG9mIGdpdmVuIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+LCBwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgSW1hZ2VSZWdpb24gfSBmcm9tICcuL2ltYWdlLXJlZ2lvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbWFnZSBpbmNsdWRpbmcgaXRzIHJlZ2lvbnMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWV9IHN0aWxsSW1hZ2VGaWxlVmFsdWUgYSBbW1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlXV0gcmVwcmVzZW50aW5nIGFuIGltYWdlLlxuICAgICAqIEBwYXJhbSB7SW1hZ2VSZWdpb25bXX0gcmVnaW9ucyB0aGUgcmVnaW9ucyBiZWxvbmdpbmcgdG8gdGhlIGltYWdlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLCByZWFkb25seSByZWdpb25zOiBJbWFnZVJlZ2lvbltdKSB7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRHZW9tVmFsdWUsIFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlZ2lvbi5cbiAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSByZXNvdXJjZSByZXByZXNlbnRpbmcgdGhlIHJlZ2lvbiBhbmQgaXRzIGdlb21ldHJpZXMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIEltYWdlUmVnaW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkUmVzb3VyY2V9IHJlZ2lvblJlc291cmNlIGEgcmVzb3VyY2Ugb2YgdHlwZSBSZWdpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSByZWdpb25SZXNvdXJjZTogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlb21ldHJ5IGluZm9ybWF0aW9uIGJlbG9uZ2luZyB0byB0aGlzIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtSZWFkR2VvbVZhbHVlW119XG4gICAgICovXG4gICAgZ2V0R2VvbWV0cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaW9uUmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNHZW9tZXRyeV0gYXMgUmVhZEdlb21WYWx1ZVtdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuL2RlY2xhcmF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogS3VpQ29yZUNvbmZpZ31cbiAgICBdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBLdWlDb3JlTW9kdWxlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7S3VpQ29yZUNvbmZpZ30gY29uZmlnXG4gICAgICogQHJldHVybnMge01vZHVsZVdpdGhQcm92aWRlcnN9XG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBLdWlDb3JlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIC8vIGdldCB0aGUgYXBwIGVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gaGVyZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb25maWcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEt1aUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3InO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIGlmIGlzIGxvYWRpbmcsIHNldCBpdCB0cnVlO1xuICAgIC8vIGl0IGNhbiBiZSB1c2VkIGluIGNvbXBvbmVudHNcbiAgICAvLyBmb3IgcHJvZ3Jlc3MgbG9hZGVyIGVsZW1lbnRcbiAgICBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJywgcGFyYW1zOiBwYXJhbXMgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7YW55fSBib2R5XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwUG9zdChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUFVUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7YW55fSBib2R5XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwUHV0KHBhdGg6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgcmVxdWVzdCBlcnJvciBpbiBjYXNlIG9mIHNlcnZlciBlcnJvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtIdHRwRXJyb3JSZXNwb25zZX0gZXJyb3JcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIEFwaVNlcnZpY2VFcnJvclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9IGVycm9yLnVybDtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUganNvbiBlcnJvciBpbiBjYXNlIG9mIHR5cGUgZXJyb3IgaW4ganNvbiByZXNwb25zZSAoanNvbjJ0eXBlc2NyaXB0KVxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlSnNvbkVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaVNlcnZpY2VFcnJvcikgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuXG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IC0xO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzVGV4dCA9ICdJbnZhbGlkIEpTT04nO1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3I7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcblxuICAgIH1cblxuICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kIGlzIHJlcGxhY2VkIGJ5IHRoZSBKd3RJbnRlcmNlcHRvclxuICAgIC8qXG4gICAgcHJvdGVjdGVkIHNldEhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xuICAgICAgICBsZXQgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAgICAgLy8gZ2V0IGtleSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgY29uc3Qga2V5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25faWQnKTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5fYWNzLmdldChrZXkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXNlciA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcGkgc2VydmljZSAtLSBzZXRIZWFkZXJzIC0tIGN1cnJlbnRVc2VyIGZyb20gYWNzJywgY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIG9wdGlvbnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0h0dHBIZWFkZXJzfSBvcHRpb25zXG4gICAgICogQHJldHVybnMge0h0dHBIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kVG9PcHRpb25zKG9wdGlvbnM6IGFueSk6IGFueSB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuXG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgaGVhZGVycyA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzJhKSAnLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYikgJywgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhdmUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zWydoZWFkZXJzJ10pIHtcbiAgICAgICAgICAgICAgICAvLyBubyBoZWFkZXJzIHNldFxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCczOiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBoZWFkZXJzLCBuZWVkIHRvIGFwcGVuZCB0byB0aG9zZVxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihvcHRpb25zWydoZWFkZXJzJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc0OiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4qL1xuICAgIC8qXG4gICAgLyEqKlxuICAgICAqIEFwcGVuZHMgdG8gZXhpc3RpbmcgaGVhZGVycyBpZiB0aGV5IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7SGVhZGVyc30gaGVhZGVyc1xuICAgICAqIEByZXR1cm5zIHtIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XG5cblxuICAgICAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKSkge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbjtcblxuLy8gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcblxuICAgICAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke0pTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnRva2VufWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuKi9cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIEdyb3VwLCBHcm91cFJlc3BvbnNlLCBHcm91cHNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IGdyb3VwIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2dyb3Vwcyc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCBncm91cHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwW10+XG4gICAgICovXG4gICAgZ2V0QWxsR3JvdXBzKCk6IE9ic2VydmFibGU8R3JvdXBbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgZ3JvdXAgb2JqZWN0IChmaWx0ZXIgYnkgSVJJKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwPlxuICAgICAqL1xuICAgIGdldEdyb3VwQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEdyb3VwPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cFJlc3BvbnNlKS5ncm91cCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBMaXN0LFxuICAgIExpc3RDcmVhdGVQYXlsb2FkLFxuICAgIExpc3RJbmZvLFxuICAgIExpc3RJbmZvUmVzcG9uc2UsXG4gICAgTGlzdEluZm9VcGRhdGVQYXlsb2FkLFxuICAgIExpc3ROb2RlSW5mbyxcbiAgICBMaXN0Tm9kZUluZm9SZXNwb25zZSxcbiAgICBMaXN0UmVzcG9uc2UsXG4gICAgTGlzdHNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgbGlzdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGxpc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+XG4gICAgICovXG4gICAgZ2V0TGlzdHMocHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+IHtcbiAgICAgICAgaWYgKHByb2plY3RJcmkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCArPSAnP3Byb2plY3RJcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0c1Jlc3BvbnNlKS5saXN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3Q+XG4gICAgICovXG4gICAgZ2V0TGlzdChsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGggKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBub2RlIGluZm8gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZUluZm8obm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdE5vZGVJbmZvUmVzcG9uc2UpLm5vZGVpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGNyZWF0ZUxpc3QocGF5bG9hZDogTGlzdENyZWF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFZGl0IGxpc3QgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdEluZm9VcGRhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICB1cGRhdGVMaXN0SW5mbyhwYXlsb2FkOiBMaXN0SW5mb1VwZGF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQocGF5bG9hZC5saXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgUHJvamVjdCwgUHJvamVjdE1lbWJlcnNSZXNwb25zZSwgUHJvamVjdFJlc3BvbnNlLCBQcm9qZWN0c1Jlc3BvbnNlLCBVc2VyIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBwcm9qZWN0cyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgcHJvamVjdHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3RbXT5cbiAgICAgKi9cbiAgICBnZXRBbGxQcm9qZWN0cygpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vcHJvamVjdHMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RzUmVzcG9uc2UpLnByb2plY3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZSBzaG9ydCBuYW1lIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlIGhleGFkZWNpbWFsIGNvZGUgdGhhdCB1bmlxdWVseSBpZGVudGlmaWVzIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCByZXRyaWV2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgcHJvamVjdCBpZCAoaXJpKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZSBzaG9ydCBuYW1lIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRjb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCBtZW1iZXIgcmV0cmlldmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0TWVtYmVycyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RNZW1iZXJzUmVzcG9uc2UpLm1lbWJlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGNyZWF0ZVByb2plY3QoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVkaXQgcHJvamVjdCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgdXBkYXRlUHJvamVjdChpcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSBwcm9qZWN0IChpZiBpdCB3YXMgZGVsZXRlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgYWN0aXZhdGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAoc2V0IGluYWN0aXZlKSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGRlbGV0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgVXNlcixcbiAgICBVc2VyUmVzcG9uc2UsXG4gICAgVXNlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgdXNlcyB0aGUgS25vcmEgYWRtaW4gQVBJIGFuZCBoYW5kbGVzIGFsbCB1c2VyIGRhdGEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICB1c2Vyc1VybDogc3RyaW5nID0gdGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi91c2Vycyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0QWxsVXNlcnMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3VzZXJzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2Vyc1Jlc3BvbnNlKS51c2VycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQhIFBsZWFzZSB1c2UgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpIG9ubHkhXG4gICAgICogR2V0IHVzZXIgYnkgZW1haWxcbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihlbWFpbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwcmVjYXRlZCEgUGxlYXNlIHVzZSBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZykgb25seSFcbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihpcmkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdXNlciBvZiBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gdGhlIGFkbWluIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG93biBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZU93blBhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgb2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHBhc3N3b3JkIG9mIGFub3RoZXIgdXNlciAobm90IG93bikuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2Vyc1Bhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgcmVxdWVzdGVyUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdXNlciBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgLyBkZWFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBkZWxldGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBzZXRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh7IHZhcjogbGFuZyB9KTtcbiAgfVxuICBnZXRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTXNnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gIH1cblxuICAvKipcbiAgKiB0aGlzIG1ldGhvZCBnZXQgdGhlIHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBzdGF0dXNNc2cuanNvbiBmaWxlXG4gICogd2hpY2ggYXJlIGRlZmluZWQgaGVyZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2Rlc1xuICAqIGFuZCBoZXJlOiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcFxuICAqXG4gICovXG4gIGdldFN0YXR1c01zZygpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwcCArICcvYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nKVxuICAgICAgLnBpcGUobWFwKFxuICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgKTtcblxuICB9O1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFVzZXJzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmlzIG9mIHRoZSBuYW1lZCBncmFwaHMgd2hvc2UgcmVzb3VyY2UgY2xhc3NlcyBhcmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIElyaXMgb2YgdGhlIHJlc291cmNlIGNsYXNzZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBLbm9yYUNvbnN0YW50cywgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBhIGxhYmVsIGRlc2NyaWJpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICogT2NjdXJyZW5jZSBvZiBhIHByb3BlcnR5IGZvciBhIHJlc291cmNlIGNsYXNzIChpdHMgY2FyZGluYWxpdHkpLlxuICovXG5leHBvcnQgZW51bSBDYXJkaW5hbGl0eU9jY3VycmVuY2Uge1xuICAgIG1pbkNhcmQgPSAwLFxuICAgIGNhcmQgPSAxLFxuICAgIG1heENhcmQgPSAyXG59XG5cblxuLyoqXG4gKiBDYXJkaW5hbGl0eSBvZiBhIHByb3BlcnR5IGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJkaW5hbGl0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5T2NjdXJyZW5jZX0gb2NjdXJyZW5jZSB0eXBlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIG51bWVyaWNhbCB2YWx1ZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdGhlIGdpdmVuIG9jY3VycmVuY2UgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvY2N1cnJlbmNlOiBDYXJkaW5hbGl0eU9jY3VycmVuY2UsXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5W119IGNhcmRpbmFsaXRpZXMgdGhlIHJlc291cmNlIGNsYXNzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpY29uOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY2FyZGluYWxpdGllczogQXJyYXk8Q2FyZGluYWxpdHk+KSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIHRvIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc2VzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlc291cmNlQ2xhc3M7XG59XG5cblxuLyoqXG4gKiBBIHByb3BlcnR5IGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3ViUHJvcGVydHlPZiBJcmlzIG9mIHByb3BlcnRpZXMgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgc3VicHJvcGVydHkgb2YuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rVmFsdWVQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgcmVmZXJzIHRvIGEgbGluayB2YWx1ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBvYmplY3RUeXBlOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3ViUHJvcGVydHlPZjogQXJyYXk8c3RyaW5nPixcbiAgICAgICAgcmVhZG9ubHkgaXNFZGl0YWJsZTogQm9vbGVhbixcbiAgICAgICAgcmVhZG9ubHkgaXNMaW5rUHJvcGVydHk6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1ZhbHVlUHJvcGVydHk6IEJvb2xlYW4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHByb3BlcnR5IElyaXMgdG8gcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFByb3BlcnR5O1xufVxuXG5cbi8qKlxuICogR3JvdXBzIHJlc291cmNlIGNsYXNzZXMgYnkgdGhlIG9udG9sb2d5IHRoZXkgYXJlIGRlZmluZWQgaW4uXG4gKlxuICogQSBtYXAgb2Ygb250b2xvZ3kgSXJpcyB0byBhbiBhcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBjYWNoZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gKG9ubHkgdXNlZCBieSB0aGlzIHNlcnZpY2UgaW50ZXJuYWxseSkuXG4gKiBUaGlzIGNhY2hlIGlzIHVwZGF0ZWQgd2hlbmV2ZXIgbmV3IGRlZmluaXRpb25zIGFyZSByZXF1ZXN0ZWQgZnJvbSBLbm9yYS5cbiAqXG4gKiBSZXF1ZXN0ZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gYnkgYSBzZXJ2aWNlIGlzIHJlcHJlc2VudGVkIGJ5IFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lNZXRhZGF0YVtdfSBvbnRvbG9naWVzIEFuIGFycmF5IG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIG9udG9sb2dpZXM6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IGxpc3Qgb2YgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgbmFtZWQgZ3JhcGguXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb250b2xvZ3kgaW5mb3JtYXRpb24gcmVxdWVzdGVkIGZyb20gdGhpcyBzZXJ2aWNlLlxuICpcbiAqIEZvciBldmVyeSByZXF1ZXN0LCBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHJldHVybmVkIGNvbnRhaW5pbmcgdGhlIHJlcXVlc3RlZCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBnaXZlbiBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSxcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcyxcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGdpdmVuIFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dIGludG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UsXG4gICAgICogdXBkYXRpbmcgdGhlIGV4aXN0aW5nIGluZm9ybWF0aW9uLlxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gYSBzZXJ2aWNlIGxpa2UgdGhlIHNlYXJjaCBmZXRjaGVzIG5ldyByZXN1bHRzXG4gICAgICogdGhhdCBoYXZlIHRvIGJlIGFkZGVkIHRvIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGV4aXN0aW5nIG9udG9sb2d5IGluZm9ybWF0aW9uIG11c3Qgbm90IGJlIGxvc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgdGhhdCBoYXZlIHRvIGJlIGludGVncmF0ZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzc0Zvck9udG9sb2d5IGluIG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldID0gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3NlcyA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcmVzb3VyY2VDbGFzc2VzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzIGluIG5ld1Jlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdID0gbmV3UmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UHJvcGVydGllcyA9IG9udG9sb2d5SW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UHJvcCBpbiBuZXdQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmV3UHJvcF0gPSBuZXdQcm9wZXJ0aWVzW25ld1Byb3BdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBncm91cGVkIGJ5IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NlcyAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKCk6IFJlc291cmNlQ2xhc3NlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc1tdXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheSgpOiBBcnJheTxSZXNvdXJjZUNsYXNzPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NlczogQXJyYXk8UmVzb3VyY2VDbGFzcz4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzc0lyaSBpbiB0aGlzLnJlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3M6IFJlc291cmNlQ2xhc3MgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG4gICAgICAgICAgICByZXNDbGFzc2VzLnB1c2gocmVzQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc0NsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNDbGFzcyByZXNvdXJjZSBjbGFzcyB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlc0NsYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChyZXNDbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NEZWYgIT09IHVuZGVmaW5lZCAmJiByZXNDbGFzc0RlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyB3aXRob3V0IGFyZ3VtZW50IHJlc0NsYXNzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFByb3BlcnRpZXMgLSBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcygpOiBQcm9wZXJ0aWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvcGVydHlbXSAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KCk6IEFycmF5PFByb3BlcnR5PiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3A6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHByb3BEZWYgIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUHJvcGVydHkgd2l0aG91dCBhcmd1bWVudCBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gKiBPdGhlciBjb21wb25lbnRzIG9yIHNlcnZpY2VzIG9idGFpbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRoaXMgc2VydmljZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUNhY2hlU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBPbnRvbG9naWVzIGluZ29yZWQgYnkgdGhpcyBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkT250b2xvZ2llc1xuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRPbnRvbG9naWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5LCBLbm9yYUNvbnN0YW50cy5TdGFuZG9mZk9udG9sb2d5XTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkUHJvcGVydGllcyBwcm9wZXJ0aWVzIHRoYXQgS25vcmEgaXMgbm90IHJlc3BvbnNpYmxlIGZvciBhbmQgdGhhdCBoYXZlIHRvIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZXNvbHZlZCBhdCB0aGUgbW9tZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRQcm9wZXJ0aWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub25SZXNvdXJjZUNsYXNzZXMgY2xhc3MgZGVmaW5pdGlvbnMgdGhhdCBhcmUgbm90IGJlIHRyZWF0ZWQgYXMgS25vcmEgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgbm9uUmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLkZvcmJpZGRlblJlc291cmNlLCBLbm9yYUNvbnN0YW50cy5YTUxUb1N0YW5kb2ZmTWFwcGluZywgS25vcmFDb25zdGFudHMuTGlzdE5vZGVdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUNhY2hlfSBjYWNoZU9udG9sb2d5IGNlbnRyYWwgaW5zdGFuY2UgdGhhdCBjYWNoZXMgYWxsIGRlZmluaXRpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWNoZU9udG9sb2d5OiBPbnRvbG9neUNhY2hlID0gbmV3IE9udG9sb2d5Q2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29udG9sb2d5U2VydmljZTogT250b2xvZ3lTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIG9udG9sb2dpZXMgYXMgSlNPTi1MRCAobm8gcHJlZml4ZXMsIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0T250b2xvZ2llc01ldGFkYXRhKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIChyZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzKSBmb3IgdGhlIGdpdmVuIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaSBvZiB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8b2JqZWN0PiAtIG1ldGFkYXRhIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYWxsIHRoZSBvbnRvbG9naWVzJyBtZXRhZGF0YSByZXR1cm5lZCBieSBLbm9yYSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBvbnRvbG9naWVzIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgYSBuZXcgT250b2xvZ3lNZXRhZGF0YSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUob250b2xvZ2llczogb2JqZWN0W10pIHtcblxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcyA9IG9udG9sb2dpZXMubWFwKFxuICAgICAgICAgICAgb250b2xvZ3kgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lNZXRhZGF0YShvbnRvbG9neVsnQGlkJ10sIG9udG9sb2d5W0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9udG9sb2dpZXMnIG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlIGFuZCByZXR1cm5zIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiAtIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogYGtub3JhLWFwaTpSZXNvdXJjZWAgd2lsbCBiZSBleGNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gY2xhc3NEZWZpbml0aW9ucyB0aGUgY2xhc3MgZGVmaW5pdGlvbnMgaW4gYW4gb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIGdpdmVuIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzRGVmIG9mIGNsYXNzRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzSXJpID0gY2xhc3NEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGF0IGNsYXNzIG5hbWUgaXMgbm90IGxpc3RlZCBhcyBhIG5vbiByZXNvdXJjZSBjbGFzcyBhbmQgdGhhdCB0aGUgaXNSZXNvdXJjZUNsYXNzIGZsYWcgaXMgcHJlc2VudCBhbmQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjbGFzc0lyaSAhPT0gS25vcmFDb25zdGFudHMuUmVzb3VyY2UgJiYgdGhpcy5ub25SZXNvdXJjZUNsYXNzZXMuaW5kZXhPZihjbGFzc0lyaSlcbiAgICAgICAgICAgICAgICA9PT0gLTEgJiYgKGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gIT09IHVuZGVmaW5lZCAmJiBjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIHZhbHVlIGNsYXNzLCBidXQgYSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMucHVzaChjbGFzc0lyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc0lyaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9neVxuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEtub3JhIGF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGluIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICogSWYgdGhleSBhcmUgZGVmaW5lZCBpbiBhbm90aGVyIG9udG9sb2d5LCB0aGF0IG9udG9sb2d5IGlzIHJlcXVlc3RlZCBmcm9tIEtub3JhIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbnRvbG9neSB0aGUgb250b2xvZ3kgdG8gYmUgY2FjaGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5OiBvYmplY3QpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncmFwaCA9IG9udG9sb2d5WydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBnZXQgYWxsIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IGNsYXNzRGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bENsYXNzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xPYmplY3RQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xEYXRhdHlwZVByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bEFubm90YXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5SZGZQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gY2FjaGUgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50IG9udG9sb2d5XG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5WydAaWQnXV0gPSB0aGlzLmdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZzKTtcblxuICAgICAgICAvLyB3cml0ZSBjbGFzcyBhbmQgcHJvcGVydHkgZGVmaW50aW9ucyB0byBjYWNoZVxuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShjbGFzc0RlZnMsIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgdGhlIG9udG9sb2dpZXMgZm9yIHdoaWNoIGRlZmluaXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhbGwgcmVxdWVzdGVkIG5hbWVkIGdyYXBoc1xuICAgICAgICBsZXQgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9udG9sb2d5SXJpIG9mIG9udG9sb2d5SXJpcykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9naWVzRnJvbUNhY2hlOiBvbnRvbG9neSBub3QgZm91bmQgaW4gY2FjaGU6ICR7b250b2xvZ3lJcml9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIG9udG9sb2d5XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV07XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBvZiB0aGlzIG9udG9sb2d5XG4gICAgICAgICAgICBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IGFsbFJlc291cmNlQ2xhc3NJcmlzLmNvbmNhdCh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBhbGwgcmVxdWVzdGVkIG9udG9sb2dpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKGFsbFJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5LCByZXNDbGFzc0RlZnMuZ2V0UmVzb3VyY2VDbGFzc2VzKCksIHJlc0NsYXNzRGVmcy5nZXRQcm9wZXJ0aWVzKClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIG9udG9sb2d5IHJlc3BvbnNlIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyB0aGUgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcHJvcGVydHlDbGFzc0RlZmluaXRpb25zIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUocmVzb3VyY2VDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+LCBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzcyBvZiByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmkgPSByZXNDbGFzc1snQGlkJ107XG5cbiAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgYWxsIGNhcmRpbmFsaXRpZXMgb2YgdGhpcyByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdGllczogQ2FyZGluYWxpdHlbXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBzdWJjbGFzc09mQ29sbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgc2luZ2xlIG9iamVjdCBvciBhIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdKSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IFtyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCBjYXJkaW5hbGl0aWVzIGZvciB0aGUgcHJvcGVydGllcyBvZiBhIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjdXJDYXJkIG9mIHN1YmNsYXNzT2ZDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0IGlzIGEgY2FyZGluYWxpdHkgKGl0IGNvdWxkIGFsc28gYmUgYW4gSXJpIG9mIGEgc3VwZXJjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmQgaW5zdGFuY2VvZiBPYmplY3QgJiYgY3VyQ2FyZFsnQHR5cGUnXSAhPT0gdW5kZWZpbmVkICYmIGN1ckNhcmRbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLk93bFJlc3RyaWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDYXJkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb2NjdXJyZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5taW5DYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UuY2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1heENhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIGtub3duIG9jY3VycmVuY2UgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBjYXJkaW5hbGl0eSB0eXBlIGludmFsaWQgZm9yICR7cmVzQ2xhc3NbJ0BpZCddfSAke2N1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBndWkgb3JkZXJcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXMucHVzaChuZXdDYXJkKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzT2JqID0gbmV3IFJlc291cmNlQ2xhc3MoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmksXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmVzb3VyY2VJY29uXSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyB3cml0ZSB0aGlzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24gdG8gdGhlIGNhY2hlIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPSByZXNDbGFzc09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3NlcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKiBUaGUgYW5zd2VyIGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBieSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc0NsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbiBbW09udG9sb2d5Q2FjaGVdXSByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc0NsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgZGVmaW5pdGlvbnMgZm9yIGVhY2ggcmVzb3VyY2UgY2xhc3MgZnJvbSB0aGUgY2FjaGVcblxuICAgICAgICBjb25zdCByZXNDbGFzc0RlZnMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIGNvbnN0IHByb3BlcnR5SXJpcyA9IFtdO1xuXG4gICAgICAgIHJlc0NsYXNzSXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmc1tyZXNDbGFzc0lyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldLmNhcmRpbmFsaXRpZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgcHJvcGVydHkgZGVmaW5pdGlvbiBmb3IgZWFjaCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlJcmlzLnB1c2goY2FyZC5wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcHJvcERlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgcmVzQ2xhc3NEZWZzLCBwcm9wRGVmcy5nZXRQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXNcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmE6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCBwcm9wRGVmIG9mIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcElyaSA9IHByb3BEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICBsZXQgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN1YlByb3BlcnR5T2YgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdKSkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdLm1hcCgoc3VwZXJQcm9wOiBPYmplY3QpID0+IHN1cGVyUHJvcFsnQGlkJ10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLnB1c2gocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXVsnQGlkJ10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXVsnQGlkJ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID0gbmV3IFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZixcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlLFxuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT250b2xvZ3lJbmZvcm1hdGlvbiAtIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbnRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gbmV3IFByb3BlcnRpZXMoKTtcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlOiBwcm9wZXJ0eSBub3QgZm91bmQgaW4gY2FjaGU6ICR7cHJvcElyaX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eURlZnNbcHJvcElyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgbmV3IFJlc291cmNlQ2xhc3NlcygpLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IC0gbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnlbXT5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgICAgIC8vIGFycmF5IHRvIGJlIHBvcHVsYXRlZCB3aXRoIE9ic2VydmFibGVzXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gW107XG5cbiAgICAgICAgLy8gZG8gYSByZXF1ZXN0IGZvciBlYWNoIG9udG9sb2d5XG4gICAgICAgIG9udG9sb2d5SXJpcy5mb3JFYWNoKG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgIC8vIHB1c2ggYW4gT2JzZXJ2YWJsZSBvbnRvIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgICAgIG9ic2VydmFibGVzLnB1c2godGhpcy5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKG9udG9sb2d5OiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHJlc3BvbnNlIHRvIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JrSm9pbiByZXR1cm5zIGFuIE9ic2VydmFibGUgb2YgYW4gYXJyYXkgb2YgcmVzdWx0c1xuICAgICAgICAvLyByZXR1cm5lZCBieSBlYWNoIE9ic2VydmFibGUgY29udGFpbmVkIGluIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgLy8gYSBzdWJzY3JpcHRpb24gdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgZm9ya0pvaW4gaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gb25jZSBhbGwgT2JzZXJ2YWJsZXMgaGF2ZSBiZWVuIGNvbXBsZXRlZFxuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbGwgb250b2xvZ3kgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBvbnRvbG9neUlyaXNUb1F1ZXJ5ID0gb250b2xvZ3lJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9udG9sb2d5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgb250b2xvZ2llcyB0aGF0IGFyZSBtb3QgY2FjaGVkIHlldFxuICAgICAgICBpZiAob250b2xvZ3lJcmlzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXNUb1F1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGVkIG9uY2UgYWxsIG9udG9sb2dpZXMgaGF2ZSBiZWVuIGNhY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBQcm9wZXJ0aWVzIGNvbnRhaW5lZCBpbiB0aGUgY2FyZGluYWxpdGllcyB3aWxsIGJlIHJldHVybmVkIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3NlcyAoaW5jbHVkaW5nIHByb3BlcnRpZXMpLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmlzVG9RdWVyeUZvcjogc3RyaW5nW10gPSByZXNvdXJjZUNsYXNzSXJpcy5maWx0ZXIoXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPT09IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShyZXNDbGFzc0lyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWQgLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzVG9RdWVyeTogc3RyaW5nW10gPSBwcm9wZXJ0eUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzVG9RdWVyeS5tYXAoXG4gICAgICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocHJvcElyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIHdpdGg6IHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogUmVxdWVzdHMgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAoYWxyZWFkeSBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuXG4gICAgZ2V0UmVzb3VyY2UoaXJpKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJUkkgZnJvbSByZXNvdXJjZSBzZXJ2aWNlOiAnLCBpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gICAgfVxuXG5cbiAgICAvLyBUT0RPOiB3ZSBzaG91bGQgdXNlIHRoZSBBcGlTZXJ2aWNlIGNvcnJlY3RseS4gQnV0IHJpZ2h0IG5vdyBpdCBkb2Vzbid0IHdvcmtcbiAgICAvLyBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZT4ge1xuICAgIC8vICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKS5waXBlKFxuICAgIC8vICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUmVhZFJlc291cmNlKSksXG4gICAgLy8gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgLy8gICAgKTtcbiAgICAvLyB9XG5cblxuICAgIC8vIFRPRE86IHBvc3QsIHB1dCwgZGVsZXRlXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogUGVyZm9ybXMgc2VhcmNoZXMgKGZ1bGx0ZXh0IG9yIGV4dGVuZGVkKSBhbmQgc2VhcmNoIGNvdW50IHF1ZXJpZXMgaW50byBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bGx0ZXh0IHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaChzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSArICc/b2Zmc2V0PScgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeShzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcGFycWxTdHJpbmcgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChzcGFycWxTdHJpbmc6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzcGFycWxTdHJpbmcgPT09IHVuZGVmaW5lZCB8fCBzcGFycWxTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkLycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBzcGFycWxTdHJpbmcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5KHNwYXJxbFN0cmluZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNwYXJxbFN0cmluZyA9PT0gdW5kZWZpbmVkIHx8IHNwYXJxbFN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50LycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBzcGFycWxTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzb3VyY2VDbGFzc0lSSV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXNbJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJ10gPSByZXNvdXJjZUNsYXNzSVJJO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zWydsaW1pdFRvUHJvamVjdCddID0gcHJvamVjdElyaTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBHZXQoKSBleHBlY3RzIG9ubHkgb25lIGFyZ3VtZW50LCBub3QgMlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBwYXJhbXMpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIC0gaW5kaWNhdGluZyBpZiB0aGUgbmFtZSByZWZlcnMgdG8gYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBjb25zdCBnZXRQcm9wZXJ0eU5hbWVzID0gKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9wTmFtZSAhPT0gJ0BpZCdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSAnQHR5cGUnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1Byb2plY3RcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvVXNlclxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmNyZWF0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmxhc3RNb2RpZmljYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuaGFzUGVybWlzc2lvbnM7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFJlc291cmNlXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZSB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2UoXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQGlkJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQHR5cGUnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIGZyb20gSlNPTi1MRCxcbiAgICAgKiB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGUuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFZhbHVlIHRoZSB2YWx1ZSBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BJcmkgdGhlIElyaSBvZiB0aGUgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtSZWFkTGlua1ZhbHVlW119IHN0YW5kb2ZmTGlua1ZhbHVlcyBzdGFuZG9mZkxpbmtWYWx1ZXMgb2YgdGhlIHJlc291cmNlLiBUZXh0IHZhbHVlcyBtYXkgY29udGFpbiBsaW5rcyB0byBvdGhlciByZXNvdXJjZXMuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBvciBgdW5kZWZpbmVkYCBpbiBjYXNlIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkIGNvcnJlY3RseS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgcHJvcFZhbHVlOiBPYmplY3QsIHByb3BJcmk6IHN0cmluZywgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10pOiBSZWFkUHJvcGVydHlJdGVtIHwgdW5kZWZpbmVkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuXG4gICAgICAgIGxldCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZVxuICAgICAgICBzd2l0Y2ggKHByb3BWYWx1ZVsnQHR5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gYSB0ZXh0IHZhbHVlIG1pZ2h0IGJlIGdpdmVuIGFzIHBsYWluIHN0cmluZywgaHRtbCBvciB4bWwuXG4gICAgICAgICAgICAgICAgbGV0IHRleHRWYWx1ZTogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzU3RyaW5nKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3RhbmRvZmYgbGlua3MgYW5kIGluY2x1ZGUgcmVmZXJyZWQgcmVzb3VyY2VzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBhIHN0YW5kb2ZmIGxpbmssIGZ1cnRoZXIgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlIGNhbiBiZSBzaG93blxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGluayBvZiBzdGFuZG9mZkxpbmtWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzOiBSZWFkUmVzb3VyY2UgPSBzdGFuZG9mZkxpbmsucmVmZXJyZWRSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VzW3JlZmVycmVkUmVzLmlkXSA9IHJlZmVycmVkUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc0h0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSwgcmVmZXJyZWRSZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdICE9PSB1bmRlZmluZWQgJiYgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNYbWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhwZWN0ZWQgdGV4dCB2YWx1ZSBtZW1iZXJzIG5vdCBkZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBJbnZhbGlkIHRleHQgdmFsdWU6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU6XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbmV3IFJlYWREYXRlVmFsdWUocHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0NhbGVuZGFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0WWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RGF5XSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZERheV0pO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkYXRlVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlua1ZhbHVlOlxuXG4gICAgICAgICAgICAgICAgbGV0IGxpbmtWYWx1ZTogUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSByZWZlcnJlZCByZXNvdXJjZSBpcyBnaXZlbiBhcyBhbiBvYmplY3Qgb3IganVzdCBhcyBhbiBJUklcbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXQgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZS5pZCwgcmVmZXJyZWRSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldElyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2UgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZS5pZCwgaW5jb21pbmdSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlua1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50VmFsdWUgPSBuZXcgUmVhZEludGVnZXJWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZWdlclZhbHVlQXNJbnRlZ2VyXSk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIGEgZGVjaW1hbCB2YWx1ZSBpcyByZXByZXNlbnRlZCBhcyBhIHN0cmluZyBpbiBvcmRlciB0byBwcmVzZXJ2ZSBpdHMgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjVmFsOiBudW1iZXIgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWxdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsVmFsdWUgPSBuZXcgUmVhZERlY2ltYWxWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBkZWNWYWwpO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGVjaW1hbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlU3BlY2lmaWNQcm9wO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBbW1JlYWRQcm9wZXJ0aWVzXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gICAgICogQHJldHVybnMgUmVhZFByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFByb3BlcnRpZXMge1xuXG4gICAgICAgIC8vIEpTT04tTEQgcmVwcmVzZW50aW5nIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIC8vIHRleHQgdmFsdWVzIG1heSBjb250YWluIHN0YW5kb2ZmIGxpbmtzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRDogT2JqZWN0ID0gcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZV07XG5cbiAgICAgICAgLy8gdG8gYmUgcG9wdWxhdGVkIHdpdGggc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10gPSBbXTtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RhbmRvZmYgbGluayB2YWx1ZSBKU09OLUxEIG9iamVjdCB0byBhIFJlYWRMaW5rVmFsdWVcbiAgICAgICAgLy8gaW4gb3JkZXIgcG9wdWxhdGUgdGhlIGNvbGxlY3Rpb24gd2l0aCBhbGwgdGhlIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rSlNPTkxEIG9mIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsOiBSZWFkTGlua1ZhbHVlID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZXM6IEFycmF5PFJlYWRQcm9wZXJ0eUl0ZW0+ID0gW107XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiB2YWx1ZXMgb3IganVzdCBvbmUgdmFsdWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHByb3BlcnR5IG5hbWUsIGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBpcyBnaXZlbiwgaXRlcmF0ZSBvdmVyIGl0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wVmFsdWUgb2YgcmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChwcm9wVmFsdWUsIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0sIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICAgICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wVmFsdWVzO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhbiBBUEkgcmVzcG9uc2UgaW4gSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMgaW50byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSByZXNvdXJjZSBvciBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgLSBzZXF1ZW5jZSBvZiByZWFkIHJlc291cmNlc1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiA9IFtdO1xuICAgICAgICBsZXQgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcjtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG4gICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IHJlc291cmNlc0dyYXBoLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGFuc3dlciwgbm8gcmVzb3VyY2VzIGdpdmVuXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAxO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZShyZXNvdXJjZXMsIG51bWJlck9mUmVzb3VyY2VzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIGFsbCB0aGUgdHlwZXMgKGNsYXNzZXMpIG9mIHJlZmVycmVkIHJlc291cmNlcyBmcm9tIGEgZ2l2ZW4gcmVzb3VyY2UgKGZyb20gaXRzIGxpbmtpbmcgcHJvcGVydGllcykuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgSlNPTi1MRCBkZXNjcmliaW5nIG9uZSByZXNvdXJjZS5cbiAgICAgKiBAcmV0dXJuIHN0cmluZ1tdIC0gYW4gQXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyAoaW5jbHVkaW5nIGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICAvLyBzZXZlcmFsIHZhbHVlcyBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcF0pKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlZmVycmVkUmVzIG9mIHJlc291cmNlSlNPTkxEW3Byb3BdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXNvdXJjZSB0eXBlcyAoY2xhc3NlcykgZnJvbSBhIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgKHdpdGhvdXQgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcbiAgICAgICAgbGV0IHJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNsYXNzIG9mIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzZXMuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3RzIGluY29taW5nIGluZm9ybWF0aW9uIChyZWdpb25zLCBsaW5rcywgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucykgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSW5jb21pbmdTZXJ2aWNlIGV4dGVuZHMgU2VhcmNoU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYWxsIGluY29taW5nIHJlZ2lvbnMgZm9yIGEgcGFydGljdWxhciByZXNvdXJjZS5cbiAgICAqXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJUkkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgSW5jb21pbmcgcmVnaW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAqL1xuICAgIGdldEluY29taW5nUmVnaW9ucyhyZXNvdXJjZUlSSTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3JlZ2lvbiBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG59IFdIRVJFIHtcbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVnaW9uIC5cbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSVJJfT4gLlxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJUkl9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cbmtub3JhLWFwaTpoYXNHZW9tZXRyeSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9nZW9tIGEga25vcmEtYXBpOkdlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cbmtub3JhLWFwaTpoYXNDb21tZW50IGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDpzdHJpbmcgLlxuXG4/Y29tbWVudCBhIHhzZDpzdHJpbmcgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxua25vcmEtYXBpOmhhc0NvbG9yIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpDb2xvciAuXG5cbj9jb2xvciBhIGtub3JhLWFwaTpDb2xvciAuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzcGFycWxRdWVyeVN0ciAnLCBzcGFycWxRdWVyeVN0cik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UsIGlmIGFueS5cbiAgICAgKiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGxpbmsgdG8gdGhlIGdpdmVuIHJlc291cmNlIHZpYSBrbm9yYS1iYXNlOmlzUGFydE9mLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zRm9yQ29tcG91bmRSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3BhZ2Uga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxufSBXSEVSRSB7XG5cbj9wYWdlIGEga25vcmEtYXBpOlN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiAuXG4/cGFnZSBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cbmtub3JhLWFwaTpzZXFudW0ga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOmludGVnZXIgLlxuXG4/c2VxbnVtIGEgeHNkOmludGVnZXIgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxua25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpGaWxlIC5cblxuP2ZpbGUgYSBrbm9yYS1hcGk6RmlsZSAuXG5cbn0gT1JERVIgQlkgP3NlcW51bVxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFF1ZXJ5U3RyKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBJcmkgYnV0IGluY29taW5nIHJlZ2lvbnMgYW5kIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBpbmNvbWluZyBsaW5rcyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBHcmF2c2VhcmNoIHF1ZXJ5IHN0cmluZy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgZmFsc2UgaWYgbm90IHNldCBjb3JyZWN0bHkgKGluaXQgc3RhdGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgYm9vbGVhbikge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2N1cnJlbnRTZWFyY2hQYXJhbXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGZhbHNlXG4gICAgICAgIC8vIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyByZWxvYWRlZCwgdGhpcyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGNoYW5nZVNlYXJjaFBhcmFtc01zZyhzZWFyY2hQYXJhbXM6IEV4dGVuZGVkU2VhcmNoUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMubmV4dChzZWFyY2hQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXJjaCBwYXJhbXMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgRXh0ZW5kZWRTZWFyY2hQYXJhbXMgLSBzZWFyY2ggcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGdldFNlYXJjaFBhcmFtcygpOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLmdldFZhbHVlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSwgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgUHJvcGVydHlXaXRoVmFsdWUgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICogUmVwcmVzZW50cyBhbiBlcnJvciB0aGF0IG9jY3VycmVkIHdoZW4gZ2VuZXJhdGluZyBLbmFyUUwuXG4gKi9cbmNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgR3JhdlNlYXJjaCBxdWVyaWVzIGZyb20gcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5IGZyb20gdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttYWluUmVzb3VyY2VDbGFzc09wdGlvbl0gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZywgUmRmRGF0YU9iamVjdCwgUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHsgfVxuXG4gIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgY29udGVudCBvZiB0aGUgdHJpcGxlc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmRmRGF0YU9iamVjdHNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPHN0cmluZz5cbiAgICAgKi9cbiAgcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQocmRmRGF0YU9iamVjdHM6IFJkZkRhdGFPYmplY3RbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZT4odGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi9zdG9yZS9SZXNldFRyaXBsZXN0b3JlQ29udGVudCcsIHJkZkRhdGFPYmplY3RzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIENsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIFNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCYXNpY09udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIHJldHVybnMgb3VyIGxpc3Qgb2YgYSBiYXNpYyBvbnRvbG9neVxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgLy8gZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgICAgbGV0IHVybCA9IGVudmlyb25tZW50LnVybDtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgLy8gfVxuICBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBwO1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJyk7XG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlVHlwZXNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogR2V0IGFsbCByZXNvdXJjZSB0eXBlcyBkZWZpbmVkIGJ5IHRoZSB2b2NhYnVsYXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBWb2NhYnVsYXJ5IGlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgICAqL1xuICBnZXRSZXNvdXJjZVR5cGVzQnlWb2MoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzP3ZvY2FidWxhcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyByZXNvdXJjZSB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHJlc291cmNlIHR5cGUgaXJpXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgKi9cbiAgZ2V0UmVzb3VyY2VUeXBlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjEvcmVzb3VyY2V0eXBlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cblxuICAvLyBwdXRSZXNvdXJjZVR5cGUoaXJpKVxuXG59XG4iLCIvKipcbiAqIG1haW4gYXBpIHNlcnZpY2VzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSBhZG1pbiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9ncm91cHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xpc3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vdXNlcnMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSB2MiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2NvbnZlcnQtanNvbmxkJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvaW5jb21pbmcuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zdG9yZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UnO1xuIiwiaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hIH0gZnJvbSAnLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLCBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcblxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSBjb21wYXJpc29uIG9wZXJhdG9yLlxuICogVGhpcyBpbnRlcmZhY2UgaXMgaW1wbGVtZW50ZWQgZm9yIHRoZSBzdXBwb3J0ZWQgY29tcGFyaXNvbiBvcGVyYXRvcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIC8vIHR5cGUgb2YgY29tcGFyaXNvbiBvcGVyYXRvclxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8vIHRoZSBsYWJlbCBvZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciB0byBiZSBwcmVzZW50ZWQgdG8gdGhlIHVzZXIuXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8vIHJldHVybnMgdGhlIGNsYXNzIG5hbWUgd2hlbiBjYWxsZWQgb24gYW4gaW5zdGFuY2VcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5vdEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ05vdEVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBFeGlzdHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFeGlzdHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpa2UgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xpa2UnO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWF0Y2ggaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTWF0Y2gnO1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbWJpbmF0aW9uIG9mIGEgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgYSB2YWx1ZSBsaXRlcmFsIG9yIGFuIElSSS5cbiAqIEluIGNhc2UgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgJ0V4aXN0cycsIG5vIHZhbHVlIGlzIGdpdmVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgY29tcGFyaXNvbk9wZXJhdG9yOiBDb21wYXJpc29uT3BlcmF0b3IsIHJlYWRvbmx5IHZhbHVlPzogVmFsdWUpIHtcbiAgICB9XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIHZhbHVlOiBhbiBJUkkgb3IgYSBsaXRlcmFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB2YWx1ZSBpbnRvIGEgU1BBUlFMIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmc7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHkncyB2YWx1ZSBhcyBhIGxpdGVyYWwgd2l0aCB0aGUgaW5kaWNhdGlvbiBvZiBpdHMgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlTGl0ZXJhbCBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbVmFsdWVMaXRlcmFsXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgbGl0ZXJhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIChtYWtpbmcgdXNlIG9mIHhzZCkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nKSB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdHlwZSBhbm5vdGF0ZWQgdmFsdWUgbGl0ZXJhbCB0byBiZSB1c2VkIGluIGEgU1BBUlFMIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuXG4gICAgICAgIGxldCBsaXRlcmFsVHlwZTogc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgS25vcmEgc2NoZW1hIGNvbnZlcnNpb24gaXMgbmVjZXNzYXJ5LCBlLmcuLCBrbm9yYS1hcGk6ZGF0ZVZhbHVlIChjb21wbGV4KSB0byBrbm9yYS1hcGk6ZGF0ZSAoc2ltcGxlKS5cbiAgICAgICAgLy8geHNkIHR5cGVzIHdpbGwgcmVtYWluIHVuY2hhbmdlZFxuICAgICAgICBpZiAoc2NoZW1hID09PSBLbm9yYVNjaGVtYS5zaW1wbGUgJiYgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29udmVydCB0byBzaW1wbGUgc2NoZW1hXG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZG8gbm90IGNvbnZlcnRcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBcIiR7dGhpcy52YWx1ZX1cIl5ePCR7bGl0ZXJhbFR5cGV9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBJUkkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJUkkgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIFtJUkldLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSB0aGUgSVJJIG9mIGEgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaXJpOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBJUkkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaW5zdGFuY2UgSXJpIGFuZCBkb2VzIG5vdCBoYXZlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLmlyaX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIGEgdmFsdWUuXG4gKiBUaGlzIGludGVyZmFjZSBoYXMgdG8gYmUgaW1wbGVtZW50ZWQgZm9yIGFsbCB2YWx1ZSB0eXBlcyAodmFsdWUgY29tcG9uZW50IGNsYXNzZXMpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWV9LlxuICAgICAqL1xuICAgIGdldFZhbHVlKCk6IFZhbHVlO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5LCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IsIGFuZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5V2l0aFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbUHJvcGVydHlXaXRoVmFsdWVdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHkgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge0NvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlfSB2YWx1ZUxpdGVyYWwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaXNTb3J0Q3JpdGVyaW9uIGluZGljYXRlcyBpZiB0aGUgcHJvcGVydHkgaXMgdXNlZCBhcyBhIHNvcnQgY3JpdGVyaW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogUHJvcGVydHksXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlTGl0ZXJhbDogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgICAgIHJlYWRvbmx5IGlzU29ydENyaXRlcmlvbjogQm9vbGVhbikge1xuICAgIH1cblxufVxuXG4vKipcbiAqIGEgbGlzdCwgd2hpY2ggaXMgdXNlZCBpbiB0aGUgbWF0LWF1dG9jb21wbGV0ZSBmb3JtIGZpZWxkXG4gKiBjb250YWlucyBvYmplY3RzIHdpdGggaWQgYW5kIG5hbWUuIHRoZSBpZCBpcyB1c3VhbCB0aGUgaXJpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlSXRlbSB7XG4gICAgaXJpOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xufVxuXG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvcmVcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb3JlLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzLyc7XG4iLCIvKipcbiAqIEdlbmVyYXRlZCBidW5kbGUgaW5kZXguIERvIG5vdCBlZGl0LlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vcHVibGljX2FwaSc7XG5cbmV4cG9ydCB7S3VpQ29yZUNvbmZpZyBhcyDDicK1YX0gZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zJztcbmV4cG9ydCB7UHJvcGVydHkgYXMgw4nCtWJ9IGZyb20gJy4vbGliL3NlcnZpY2VzJzsiXSwibmFtZXMiOlsidHNsaWJfMS5fX2RlY29yYXRlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU1BOzs7OztRQVFXLFNBQUksR0FBVyxTQUFTLENBQUM7Ozs7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