import { __decorate, __metadata, __extends, __values } from 'tslib';
import { JsonObject, JsonProperty, JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Inject, Injectable, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { from, Observable, forkJoin, of, Subject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    KnoraConstants.ArkUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'arkUrl';
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
    KnoraConstants.RdfsSchema = 'http://www.w3.org/2000/01/rdf-schema' + KnoraConstants.PathSeparator;
    KnoraConstants.RdfsLabel = KnoraConstants.RdfsSchema + 'label';
    KnoraConstants.RdfsComment = KnoraConstants.RdfsSchema + 'comment';
    KnoraConstants.RdfsSubclassOf = KnoraConstants.RdfsSchema + 'subClassOf';
    KnoraConstants.subPropertyOf = KnoraConstants.RdfsSchema + 'subPropertyOf';
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

var jsonld = require('jsonld');
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
     * @param {string} path the URL for the GET request.
     * @param {HttpParams} params the parameters for the GET request.
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
     * Processes JSON-LD returned by Knora.
     * Expands Iris and creates an empty context object.
     *
     * @param {ApiServiceResult} resourceResponse
     */
    ApiService.prototype.processJSONLD = function (resourceResponse) {
        var resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        var resPromise = resPromises.compact(resourceResponse.body, {});
        // convert promise to Observable and return it
        // https://www.learnrxjs.io/operators/creation/frompromise.html
        return from(resPromise);
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
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient), inject("config")); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());

/**
 * Requests ontology information from Knora.
 */
var OntologyService = /** @class */ (function (_super) {
    __extends(OntologyService, _super);
    function OntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET list of ontologies
    // ------------------------------------------------------------------------
    /**
     * DEPRECATED: You should use getAllOntologies()
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getAllOntologies = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the ontologies of a specific project
     *
     * @param projectIri
     * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
     */
    OntologyService.prototype.getProjectOntologies = function (projectIri) {
        return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
    };
    // ------------------------------------------------------------------------
    // GET ontology
    // ------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new ontology.
     *
     * @param {NewOntology} data Data contains: projectIri, name, label
     * @returns Observable<ApiServiceResult>
     */
    OntologyService.prototype.createOntology = function (data) {
        var path = '/v2/ontologies';
        var ontology = {
            'knora-api:ontologyName': data.name,
            'knora-api:attachedToProject': {
                '@id': data.projectIri,
            },
            'rdfs:label': data.label,
            '@context': {
                'rdfs': KnoraConstants.RdfsSchema,
                'knora-api': KnoraConstants.KnoraApiV2WithValueObjectPath
            }
        };
        return this.httpPost(path, ontology).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    OntologyService.ngInjectableDef = defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(inject(HttpClient), inject("config")); }, token: OntologyService, providedIn: "root" });
    return OntologyService;
}(ApiService));

var jsonld$1 = require('jsonld');
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
     * Sorts an array of `ResourceClass` or `Property` by label.
     *
     * @param a first element
     * @param b second element
     * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
     */
    OntologyInformation.sortFunc = function (a, b) {
        // dealing with 'undefined' labels
        if (a.label === undefined) {
            return 1;
        }
        else if (b.label === undefined) {
            return -1;
        }
        var labelA = a.label.toLowerCase();
        var labelB = b.label.toLowerCase();
        if (labelA < labelB) {
            return -1;
        }
        else if (labelA > labelB) {
            return 1;
        }
        else {
            return 0;
        }
    };
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
     * @param {boolean} sortAsc sort resource classes by label in ascending order by default
     * @returns ResourceClass[]
     */
    OntologyInformation.prototype.getResourceClassesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var resClasses = [];
        // tslint:disable-next-line:forin
        for (var resClassIri in this.resourceClasses) {
            var resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        // resourceClasses order by label in ascending order
        resClasses.sort(OntologyInformation.sortFunc);
        // resourceClasses order by label in descending order
        if (!sortAsc) {
            resClasses.reverse();
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
                console.log("cannot get label for " + resClass);
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
     * @param {boolean} sortAsc sort properties by label in ascending order by default
     * @returns Property[] - all properties as an array.
     */
    OntologyInformation.prototype.getPropertiesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var properties = [];
        // tslint:disable-next-line:forin
        for (var propIri in this.properties) {
            var prop = this.properties[propIri];
            properties.push(prop);
        }
        // properties order by label in ascending order
        properties.sort(OntologyInformation.sortFunc);
        // properties order by label in descending order
        if (!sortAsc) {
            properties.reverse();
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
                console.log("cannot get label for " + property);
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
            var ontPromises = jsonld$1.promises;
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
            var ontPromises = jsonld$1.promises;
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
    OntologyCacheService.ctorParameters = function () { return [
        { type: OntologyService }
    ]; };
    OntologyCacheService.ngInjectableDef = defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
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
        /**
         * Information about the entities used in the given collection of `ReadResource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
    return ReadResourcesSequence;
}());

/**
 * Represents the result of a count query.
 */
var CountQueryResult = /** @class */ (function () {
    /**
     *
     * @param numberOfResults total number of results for a query.
     */
    function CountQueryResult(numberOfResults) {
        this.numberOfResults = numberOfResults;
    }
    return CountQueryResult;
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
    StatusMsgService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StatusMsgService.ngInjectableDef = defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(inject(HttpClient), inject("config")); }, token: StatusMsgService, providedIn: "root" });
    return StatusMsgService;
}());

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
            && propName !== KnoraConstants.hasPermissions
            && propName !== KnoraConstants.ArkUrl;
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
    /**
     * Turns a JSON-LD response to a count query into a `CountQueryResult`.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param countQueryJSONLD
     * @returns {CountQueryResult}
     */
    function createCountQueryResult(countQueryJSONLD) {
        return new CountQueryResult(countQueryJSONLD[KnoraConstants.schemaNumberOfItems]);
    }
    ConvertJSONLD.createCountQueryResult = createCountQueryResult;
})(ConvertJSONLD || (ConvertJSONLD = {}));

/**
 * Requests representation of resources from Knora.
 */
var ResourceService = /** @class */ (function (_super) {
    __extends(ResourceService, _super);
    function ResourceService(http, config, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._ontologyCacheService = _ontologyCacheService;
        return _this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    ResourceService.prototype.getResource = function (iri) {
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    };
    /**
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns {Observable<ReadResourcesSequence>}
     */
    ResourceService.prototype.getReadResource = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        // TODO: handle case of an ApiServiceError
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    };
    ResourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
        { type: OntologyCacheService }
    ]; };
    ResourceService.ngInjectableDef = defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
    return ResourceService;
}(ApiService));

/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService(http, config, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._ontologyCacheService = _ontologyCacheService;
        /**
         * Converts a JSON-LD object to a `ReadResorceSequence`.
         * To be passed as a function pointer (arrow notation required).
         *
         * @param {Object} resourceResponse
         * @returns {Observable<ReadResourcesSequence>}
         */
        _this.convertJSONLDToReadResourceSequence = function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        };
        return _this;
    }
    /**
     * Performs a fulltext search.
     * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
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
        var httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        return this.httpGet('/v2/search/' + searchTerm, httpParams);
    };
    /**
     * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFullTextSearchReadResourceSequence = function (searchTerm, offset) {
        if (offset === void 0) { offset = 0; }
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        var res = this.httpGet('/v2/search/' + searchTerm, httpParams);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        this.convertJSONLDToReadResourceSequence));
    };
    /**
     * Performs a fulltext search count query.
     * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
     *
     * @param searchTerm the term to search for.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFulltextSearchCountQuery = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    };
    /**
     * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
     *
     * @param {string} searchTerm the term to search for.
     * @returns Observable<CountQueryResult>
     */
    SearchService.prototype.doFullTextSearchCountQueryCountQueryResult = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        var res = this.httpGet('/v2/search/count/' + searchTerm);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    };
    /**
     * Performs an extended search.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearch = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        return this.httpPost('/v2/searchextended', gravsearchQuery);
    };
    /**
     * Performs an extended search and turns the result into a `ReadResourceSequence`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchReadResourceSequence = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        var res = this.httpPost('/v2/searchextended', gravsearchQuery);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    };
    /**
     * Performs an extended search count query.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchCountQuery = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        return this.httpPost('/v2/searchextended/count', gravsearchQuery);
    };
    /**
     * Performs an extended search count query and turns the result into a `CountQueryResult`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchCountQueryCountQueryResult = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        var res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    };
    /**
     * Perform a search by a resource's rdfs:label.
     * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
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
        var httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
    };
    /**
     * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.searchByLabelReadResourceSequence = function (searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        var res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    };
    SearchService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    SearchService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
        { type: OntologyCacheService }
    ]; };
    SearchService.ngInjectableDef = defineInjectable({ factory: function SearchService_Factory() { return new SearchService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: SearchService, providedIn: "root" });
    return SearchService;
}(ApiService));

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
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
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
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
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
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    };
    IncomingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    IncomingService.ngInjectableDef = defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: IncomingService, providedIn: "root" });
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

export { KuiCoreConfig as ɵa, Property as ɵb, KuiCoreModule, ɵ0, KuiCoreConfig, ApiServiceResult, ApiServiceError, Utils, KnoraConstants, KnoraSchema, StringLiteral, Precision, DateSalsah, DateRangeSalsah, AuthenticationResponse, Group, GroupResponse, GroupsResponse, List, ListInfo, ListInfoResponse, ListNode, ListNodeInfo, ListNodeInfoResponse, ListResponse, ListsResponse, OntologyInfoShort, PermissionData, Project, ProjectMembersResponse, ProjectResponse, ProjectsResponse, CurrentUser, UsersResponse, UserResponse, User, ReadTextValue, ReadTextValueAsString, ReferredResourcesByStandoffLink, ReadTextValueAsHtml, ReadTextValueAsXml, ReadDateValue, ReadLinkValue, ReadIntegerValue, ReadDecimalValue, ReadStillImageFileValue, ReadTextFileValue, ReadColorValue, Point2D, RegionGeometry, ReadGeomValue, ReadUriValue, ReadBooleanValue, ReadIntervalValue, ReadListValue, ReadResource, ReadResourcesSequence, CountQueryResult, StillImageRepresentation, ImageRegion, Equals, NotEquals, GreaterThanEquals, GreaterThan, LessThan, LessThanEquals, Exists, Like, Match, ComparisonOperatorAndValue, ValueLiteral, IRI, PropertyWithValue, ApiService, GroupsService, ListsService, ProjectsService, UsersService, LanguageService, StatusMsgService, OntologyService, OntologyMetadata, CardinalityOccurrence, Cardinality, ResourceClass, ResourceClasses, Property, Properties, ResourceClassIrisForOntology, OntologyInformation, OntologyCacheService, ResourceService, SearchService, ConvertJSONLD, IncomingService, ExtendedSearchParams, SearchParamsService, GravsearchGenerationService, StoreService, BasicOntologyService, ResourceTypesService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9yZXNvdXJjZXMvcmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2NvdW50LXF1ZXJ5L2NvdW50LXF1ZXJ5LXJlc3VsdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vZ3JvdXBzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9saXN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vcHJvamVjdHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvY29udmVydC1qc29ubGQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9pbmNvbWluZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvZ3Jhdi1zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2luZGV4LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiLCJuZzovL0Brbm9yYS9jb3JlL3B1YmxpY19hcGkudHMiLCJuZzovL0Brbm9yYS9jb3JlL2tub3JhLWNvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBLbm9yYS11aSBjb3JlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgc2VydmVyIGRlZmluaXRpb25zIG9mOlxuICogIC0gYXBpOiBVUkwgb2YgZGF0YSBzZXJ2aWNlIGUuZy4ga25vcmE6IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzM1xuICogIC0gbWVkaWE6IFVSTCBvZiBtZWRpYSBzZXJ2ZXIgc2VydmljZSBlLmcuIHNpcGk6IGh0dHA6Ly9sb2NhbGhvc3Q6MTAyNFxuICogIC0gYXBwOiBVUkwgb2YgdGhlIGFwcCBlLmcuIHNhbHNhaDogaHR0cDovL2xvY2FsaG9zdDo0MjAwXG4gKi9cbkBKc29uT2JqZWN0KCdLdWlDb3JlQ29uZmlnJylcbmV4cG9ydCBjbGFzcyBLdWlDb3JlQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIG5hbWUgb2YgdGhlIGFwcCBlLmcuICdTQUxTQUgnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwcCBlLmcuICdodHRwczovL3NhbHNhaC5vcmcnXG4gICAgICogQHR5cGUge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcHAnLCBTdHJpbmcpXG4gICAgcHVibGljIGFwcDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBhcGkgZS5nLiAnaHR0cHM6Ly9hcGkua25vcmEub3JnJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcGk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiBtZWRpYS9maWxlIHNlcnZlciBlLmcuICdodHRwczovL2lpaWYuc2lwaS5pbydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ21lZGlhJywgU3RyaW5nKVxuICAgIHB1YmxpYyBtZWRpYTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJcbmltcG9ydCB7IEpzb25Db252ZXJ0LCBPcGVyYXRpb25Nb2RlLCBWYWx1ZUNoZWNraW5nTW9kZSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogUmVzdWx0IGNsYXNzIHVzZWQgYXMgQVBJIHVybCByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVzdWx0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGpzb25Db252ZXJ0OiBKc29uQ29udmVydCA9IG5ldyBKc29uQ29udmVydChPcGVyYXRpb25Nb2RlLkVOQUJMRSwgVmFsdWVDaGVja2luZ01vZGUuQUxMT1dfTlVMTCk7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBhcyBKU09OXG4gICAgICovXG4gICAgYm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzdWx0IGJvZHkgYXMgaW5zdGFuY2Ugb2YgY2xhc3NPYmplY3QuXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAdGhyb3dzXG4gICAgICovXG5cbiAgICBnZXRCb2R5KGNsYXNzT2JqZWN0PzogeyBuZXcoKTogYW55IH0pOiBhbnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJvZHkpO1xuICAgICAgICByZXR1cm4gQXBpU2VydmljZVJlc3VsdC5qc29uQ29udmVydC5kZXNlcmlhbGl6ZSh0aGlzLmJvZHksIGNsYXNzT2JqZWN0KTtcbiAgICB9XG5cblxufVxuIiwiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBlcnJvciBpbmZvXG4gICAgICovXG4gICAgZXJyb3JJbmZvID0gJyc7XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBLbm9yYUNvbnN0YW50cyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpOiBzdHJpbmcgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpJztcbiAgICBwdWJsaWMgc3RhdGljIFBhdGhTZXBhcmF0b3I6IHN0cmluZyA9ICcjJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFPbnRvbG9neVBhdGg6IHN0cmluZyA9ICdodHRwOi8vd3d3Lmtub3JhLm9yZy9vbnRvbG9neSc7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUJhc2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhT250b2xvZ3lQYXRoICsgJy9rbm9yYS1iYXNlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtUHJvamVjdElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1Qcm9qZWN0JztcbiAgICBwdWJsaWMgc3RhdGljIFN5c3RlbUFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjU3lzdGVtQWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdEFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjUHJvamVjdEFkbWluJztcbiAgICBwdWJsaWMgc3RhdGljIFByb2plY3RNZW1iZXJHcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0TWVtYmVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMlNpbXBsZVBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy9zaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT250b2xvZ3k6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT3JkZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5ICsgJyNndWlPcmRlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN0YW5kb2ZmT250b2xvZ3k6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zdGFuZG9mZi92Mic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBUZXh0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQm9vbGVhblZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVXJpVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1VyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERlY2ltYWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERhdGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIENvbG9yVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0NvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgR2VvbVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlzdFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaW5rVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9uYW1lVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb25hbWVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBBdWRpb0ZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQXVkaW9GaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRERERmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdERERGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRG9jdW1lbnRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RvY3VtZW50RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTW92aW5nSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ01vdmluZ0ltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNSZXNvdXJjZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1Jlc291cmNlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNWYWx1ZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1ZhbHVlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgRm9yYmlkZGVuUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZvcmJpZGRlblJlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFhNTFRvU3RhbmRvZmZNYXBwaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdYTUxUb1N0YW5kb2ZmTWFwcGluZyc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0Tm9kZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlzdE5vZGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBBcmtVcmw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2Fya1VybCc7XG4gICAgcHVibGljIHN0YXRpYyBPYmplY3RUeXBlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnb2JqZWN0VHlwZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlSWNvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAncmVzb3VyY2VJY29uJztcbiAgICBwdWJsaWMgc3RhdGljIGlzRWRpdGFibGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzRWRpdGFibGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1ZhbHVlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1ZhbHVlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2VvbWV0cnk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc0dlb21ldHJ5JztcblxuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTmFtZTogc3RyaW5nID0gJ2h0dHA6Ly9zY2hlbWEub3JnL25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTnVtYmVyT2ZJdGVtczogc3RyaW5nID0gJ2h0dHA6Ly9zY2hlbWEub3JnL251bWJlck9mSXRlbXMnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hSXRlbUxpc3RFbGVtZW50OiBzdHJpbmcgPSAnaHR0cDovL3NjaGVtYS5vcmcvaXRlbUxpc3RFbGVtZW50JztcblxuXG4gICAgcHVibGljIHN0YXRpYyBSZGZQcm9wZXJ0eTogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyNQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU2NoZW1hOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzTGFiZWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnbGFiZWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0NvbW1lbnQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnY29tbWVudCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU3ViY2xhc3NPZjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSArICdzdWJDbGFzc09mJztcbiAgICBwdWJsaWMgc3RhdGljIHN1YlByb3BlcnR5T2Y6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnc3ViUHJvcGVydHlPZic7XG5cbiAgICBwdWJsaWMgc3RhdGljIG93bDogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT2JqZWN0UHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjT2JqZWN0UHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsRGF0YXR5cGVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNEYXRhdHlwZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bEFubm90YXRpb25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNBbm5vdGF0aW9uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1heENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21heENhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1pbkNhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21pbkNhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI2NhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bFJlc3RyaWN0aW9uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI1Jlc3RyaWN0aW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRpb25EYXRlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjcmVhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdE1vZGlmaWNhdGlvbkRhdGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xhc3RNb2RpZmljYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGhhc1Blcm1pc3Npb25zOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNQZXJtaXNzaW9ucyc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvUHJvamVjdDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1Byb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1VzZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Vc2VyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVnaW9uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZWdpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNTdHJpbmc6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNTdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREYXRlVmFsdWU6IHN0cmluZyA9ICdSZWFkRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaW5rVmFsdWU6IHN0cmluZyA9ICdSZWFkTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlZ2VyVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZWdlclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREZWNpbWFsVmFsdWU6IHN0cmluZyA9ICdSZWFkRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkR2VvbVZhbHVlOiBzdHJpbmcgPSAnUmVhZEdlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQ29sb3JWYWx1ZTogc3RyaW5nID0gJ1JlYWRDb2xvclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRVcmlWYWx1ZTogc3RyaW5nID0gJ1JlYWRVcmlWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQm9vbGVhblZhbHVlOiBzdHJpbmcgPSAnUmVhZEJvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaXN0VmFsdWU6IHN0cmluZyA9ICdSZWFkTGlzdFZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdmFsdWVBc1N0cmluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndmFsdWVBc1N0cmluZyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVIYXNNYXBwaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVIYXNNYXBwaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0WWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0TW9udGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0TW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kTW9udGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0RGF5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmREYXk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNDYWxlbmRhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzQ2FsZW5kYXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldCc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2VJcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZUlyaSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXRJcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldElyaSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVnZXJWYWx1ZUFzSW50ZWdlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50VmFsdWVBc0ludCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlY2ltYWxWYWx1ZUFzRGVjaW1hbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGVjaW1hbFZhbHVlQXNEZWNpbWFsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlQXNVcmw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUFzVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUlzUHJldmlldzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSXNQcmV2aWV3JztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUhhc0ZpbGVuYW1lOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVIYXNGaWxlbmFtZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1N0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVgnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JWYWx1ZUFzQ29sb3I6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NvbG9yVmFsdWVBc0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSc7XG4gICAgcHVibGljIHN0YXRpYyB1cmlWYWx1ZUFzVXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd1cmlWYWx1ZUFzVXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGJvb2xlYW5WYWx1ZUFzQm9vbGVhbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYm9vbGVhblZhbHVlQXNCb29sZWFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzU3RhcnQnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc0VuZDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc0VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlTGFiZWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBYc2Q6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnO1xuXG4gICAgcHVibGljIHN0YXRpYyB4c2RTdHJpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdzdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkQm9vbGVhbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2Jvb2xlYW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkSW50ZWdlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2ludGVnZXInO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkRGVjaW1hbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2RlY2ltYWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkVXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYW55VVJJJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzb3VyY2VTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0RhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0ludGVydmFsJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21TaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb20nO1xuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb25hbWVTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRmlsZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoRnVuY3Rpb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ21hdGNoJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPSc7XG4gICAgcHVibGljIHN0YXRpYyBFcXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJyE9JztcbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIG5vdCBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPic7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGdyZWF0ZXIgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPj0nO1xuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBncmVhdGVyIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc8JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbGVzcyB0aGFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc8PSc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbGVzcyB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJ0UnO1xuICAgIHB1YmxpYyBzdGF0aWMgRXhpc3RzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnZXhpc3RzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJ3JlZ2V4JztcbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBsaWtlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICdjb250YWlucyc7XG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ21hdGNoZXMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhMaW5rOiBzdHJpbmcgPSAnc2Fsc2FoLWxpbmsnOyAvLyBjbGFzcyBvbiBhbiBIVE1MIDxhPiBlbGVtZW50IHRoYXQgaW5kaWNhdGVzIGEgbGluayB0byBhIEtub3JhIHJlc291cmNlXG4gICAgcHVibGljIHN0YXRpYyBSZWZNYXJrZXI6IHN0cmluZyA9ICdyZWYtbWFya2VyJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCBlbGVtZW50IHRoYXQgcmVmZXJzIHRvIGFub3RoZXIgZWxlbWVudCBpbiB0aGUgc2FtZSBkb2N1bWVudFxuXG4gICAgcHVibGljIHN0YXRpYyBHTkRQcmVmaXg6IHN0cmluZyA9ICcoREUtNTg4KSc7XG4gICAgcHVibGljIHN0YXRpYyBHTkRSZXNvbHZlcjogc3RyaW5nID0gJ2h0dHA6Ly9kLW5iLmluZm8vZ25kLyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFZJQUZQcmVmaXg6IHN0cmluZyA9ICcoVklBRiknO1xuICAgIHB1YmxpYyBzdGF0aWMgVklBRlJlc29sdmVyOiBzdHJpbmcgPSAnaHR0cHM6Ly92aWFmLm9yZy92aWFmLyc7XG5cbn1cblxuXG5leHBvcnQgZW51bSBLbm9yYVNjaGVtYSB7XG4gICAgY29tcGxleCA9IDAsXG4gICAgc2ltcGxlID0gMVxufVxuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIEVtYWlsIGFkZHJlc3MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhFbWFpbCA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVzZXJuYW1lLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXNlcm5hbWUgPSAvXlthLXpBLVowLTldKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVUkxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXJsID0gL14oaHR0cDpcXC9cXC93d3dcXC58aHR0cHM6XFwvXFwvd3d3XFwufGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcLyk/W2EtejAtOV0rKFtcXC1cXC5dezF9W2EtejAtOV0rKSpcXC5bYS16XXsyLDZ9KDpbMC05XXsxLDV9KT8oXFwvLiopPyQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgUGFzc3dvcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhQYXNzd29yZCA9IC9eKD89LipcXGQpKD89LipbYS16QS1aXSkuezgsfSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgSGV4YWRlY2ltYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhIZXggPSAvXlswLTlBLUZhLWZdKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBzaG9ydG5hbWUgaW4gcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFNob3J0bmFtZSA9IC9eW2EtekEtWl0rXFxTKiQvO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYW1iZGEgZnVuY3Rpb24gZWxpbWluYXRpbmcgZHVwbGljYXRlcyBpbiBhIGNvbGxlY3Rpb24gdG8gYmUgcGFzc2VkIHRvIFtbZmlsdGVyXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbSBlbGVtZW50IG9mIGFuIEFycmF5IHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGxvb2tlZCBhdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggY3VycmVudCBlbGVtZW50cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gc2VsZiByZWZlcmVuY2UgdG8gdGhlIHdob2xlIEFycmF5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzYW1lIGVsZW1lbnQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBpbiB0aGUgQXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJPdXREdXBsaWNhdGVzID0gKGVsZW0sIGluZGV4OiBudW1iZXIsIHNlbGYpID0+IHtcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc0Nzc5OC9kZWxldGUtZHVwbGljYXRlLWVsZW1lbnRzLWZyb20tYW4tYXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyP3Y9ZXhhbXBsZVxuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCdzIGluZGV4IGVxdWFscyB0aGUgaW5kZXggb2YgdGhlIGxlZnRtb3N0IGVsZW1lbnRcbiAgICAgICAgLy8gLT4gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIG5vIGlkZW50aWNhbCBlbGVtZW50IGJlZm9yZSB0aGlzIGluZGV4LCBoZW5jZSBpdCBpcyBub3QgYSBkdXBsaWNhdGVcbiAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBlbGVtZW50cywgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIEtub3JhIGVudGl0eSBJUkksIGdldHMgdGhlIG9udG9sb2d5IElyaS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRpdHlJcmkgYW4gZW50aXR5IElyaS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBvbnRvbG9neSBJUklcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShlbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGNsYXNzIElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBlbnRpdHlJcmkuc3BsaXQoS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7ZW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgY29tcGxleCBrbm9yYS1hcGkgZW50aXR5IElyaSB0byBhIGtub3JhLWFwaSBzaW1wbGUgZW50aXR5IElyaS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4RW50aXR5SXJpXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShjb21wbGV4RW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBlbnRpdHkgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGNvbXBsZXhFbnRpdHlJcmkuc3BsaXQoJ3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2NvbXBsZXhFbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgLy8gYWRkICdzaW1wbGUnIHRvIGJhc2UgcGF0aFxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF0gKyAnc2ltcGxlL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IgKyBzZWdtZW50c1sxXTtcblxuICAgIH1cblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnU3RyaW5nTGl0ZXJhbCcpXG5leHBvcnQgY2xhc3MgU3RyaW5nTGl0ZXJhbCB7XG5cbiAgICBASnNvblByb3BlcnR5KCd2YWx1ZScsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5ndWFnZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xufVxuIiwiLyoqXG4gKiBQcmVjaXNpb24gZm9yIERhdGVTYWxzYWguXG4gKi9cbmV4cG9ydCBlbnVtIFByZWNpc2lvbiB7XG4gICAgeWVhclByZWNpc2lvbixcbiAgICBtb250aFByZWNpc2lvbixcbiAgICBkYXlQcmVjaXNpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgU2Fsc2FoIGRhdGUgb2JqZWN0IHdpdGggYSBwcmVjaXNpb24gaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlU2Fsc2FoIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHNlcGFyYXRvciA9ICctJztcblxuICAgIHJlYWRvbmx5IHByZWNpc2lvbjogUHJlY2lzaW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSB5ZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IG1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkYXk/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMubW9udGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8geWVhciBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLnllYXJQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gbW9udGggcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5tb250aFByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRheSBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLmRheVByZWNpc2lvbjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSB3aXRob3V0IHRoZSBjYWxlbmRhci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCkge1xuXG4gICAgICAgIGxldCBkYXRlU3RyaW5nID0gJygnICsgdGhpcy5lcmEgKyAnKSAnO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVjaXNpb24pIHtcblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLmRheVByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLmRheTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlICh3aXRoIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCk6IHN0cmluZyB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXIgKyAnOicgKyB0aGlzLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwZXJpb2QgKHdpdGggc3RhcnQgZGF0ZSBhbmQgZW5kIGRhdGUpLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlU2Fsc2FoIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBzdGFydDogRGF0ZVNhbHNhaCxcbiAgICAgICAgcmVhZG9ubHkgZW5kOiBEYXRlU2Fsc2FoXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSByYW5nZSAod2l0aCBwcmVjZWRpbmcgY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0LmdldERhdGVBc1N0cmluZygpICsgJzonICsgdGhpcy5lbmQuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0F1dGhlbnRpY2F0aW9uUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdCcpXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0bmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgc2hvcnRuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydGNvZGUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNob3J0Y29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9uZ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvbmduYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdkZXNjcmlwdGlvbicsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IFN0cmluZ0xpdGVyYWxbXSA9IFtuZXcgU3RyaW5nTGl0ZXJhbCgpXTtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tleXdvcmRzJywgW1N0cmluZ10sIHRydWUpXG4gICAgcHVibGljIGtleXdvcmRzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvZ28nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvZ286IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2luc3RpdHV0aW9uJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBpbnN0aXR1dGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ2llcycsIFtTdHJpbmddKVxuICAgIHB1YmxpYyBvbnRvbG9naWVzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3NlbGZqb2luJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc2VsZmpvaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cCcpXG5leHBvcnQgY2xhc3MgR3JvdXAge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdkZXNjcmlwdGlvbicsIFN0cmluZylcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3QnLCBQcm9qZWN0LCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3NlbGZqb2luJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc2VsZmpvaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXBSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cCcsIEdyb3VwKVxuICAgIHB1YmxpYyBncm91cDogR3JvdXAgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXBzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwcycsIFtHcm91cF0pXG4gICAgcHVibGljIGdyb3VwczogR3JvdXBbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdEluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGUge1xuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVsJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCB0cnVlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xldmVsJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBsZXZlbDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncG9zaXRpb24nLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIHBvc2l0aW9uOiBudW1iZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5pbXBvcnQgeyBMaXN0Tm9kZSB9IGZyb20gJy4vbGlzdC1ub2RlJztcblxuQEpzb25PYmplY3QoJ0xpc3QnKVxuZXhwb3J0IGNsYXNzIExpc3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdGluZm8nLCBMaXN0SW5mbywgZmFsc2UpXG4gICAgcHVibGljIGxpc3RpbmZvOiBMaXN0SW5mbyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgZmFsc2UpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdGluZm8nLCBMaXN0SW5mbywgZmFsc2UpXG4gICAgcHVibGljIGxpc3RpbmZvOiBMaXN0SW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGVJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaXNSb290Tm9kZScsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIGlzUm9vdE5vZGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdE5vZGVJbmZvIH0gZnJvbSAnLi9saXN0LW5vZGUtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGVJbmZvUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbm9kZWluZm8nLCBMaXN0Tm9kZUluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBub2RlaW5mbzogTGlzdE5vZGVJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcblxuQEpzb25PYmplY3QoJ0xpc3RSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3QnLCBMaXN0LCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdDogTGlzdCA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdE5vZGVJbmZvIH0gZnJvbSAnLi9saXN0LW5vZGUtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0c1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0c1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RzJywgW0xpc3ROb2RlSW5mb10sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0czogTGlzdE5vZGVJbmZvW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ09udG9sb2d5SW5mb1Nob3J0JylcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9TaG9ydCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neUlyaScsIFN0cmluZylcbiAgICBwdWJsaWMgb250b2xvZ3lJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgb250b2xvZ3lOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdQZXJtaXNzaW9uRGF0YScpXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRhdGEge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgZ3JvdXBzUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGFkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9ncm91cHMvZ3JvdXAnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRhdGEgfSBmcm9tICcuLi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLWRhdGEnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnVXNlcicpXG5leHBvcnQgY2xhc3MgVXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2VtYWlsJywgU3RyaW5nKVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcm5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHVzZXJuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwYXNzd29yZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ2l2ZW5OYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBnaXZlbk5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2ZhbWlseU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGZhbWlseU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwcycsIFtHcm91cF0pXG4gICAgcHVibGljIGdyb3VwczogR3JvdXBbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2Vzc2lvbklkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzZXNzaW9uSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Blcm1pc3Npb25zJywgUGVybWlzc2lvbkRhdGEpXG4gICAgcHVibGljIHBlcm1pc3Npb25zOiBQZXJtaXNzaW9uRGF0YSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c3RlbUFkbWluJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgc3lzdGVtQWRtaW4/OiBib29sZWFuID0gZmFsc2U7XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy91c2VyJztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RNZW1iZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RNZW1iZXJzUmVzcG9uc2Uge1xuICAgIEBKc29uUHJvcGVydHkoJ21lbWJlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIG1lbWJlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0XG5leHBvcnQgY2xhc3MgQ3VycmVudFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnand0JywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBqd3Q6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c0FkbWluJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3lzQWRtaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIHVzZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlclJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXInLCBVc2VyKVxuICAgIHB1YmxpYyB1c2VyOiBVc2VyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RpbGwgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBpbWFnZUZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGltYWdlIGlzIGEganBlZywgaXQgaXMgYSBwcmV2aWV3IGltYWdlXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gaW1hZ2VGaWxlbmFtZS5lbmRzV2l0aCgnLmpwZycpO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoMTAwIC8gcmVkdWNlRmFjdG9yKTtcblxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IChwZXJjZW50YWdlID4gMCAmJiBwZXJjZW50YWdlIDw9IDEwMCkgPyBwZXJjZW50YWdlIDogNTA7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyB0aGlzLmltYWdlRmlsZW5hbWUgKyAnL2Z1bGwvcGN0OicgKyBwZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnLzAvZGVmYXVsdC5qcGcnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRTdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpc3RWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUlyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUxhYmVsOiBzdHJpbmcsICkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUxhYmVsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFByb3BlcnRpZXMsIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uLy4uLyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgcmVzb3VyY2UncyBJcmkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHJlc291cmNlJ3MgdHlwZSAoY2xhc3MpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCB0aGUgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdSZWdpb25zIHJlZ2lvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ0xpbmtzIHJlc291cmNlcyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXX0gc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSAgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHRvIGJlIGRpc3BsYXllZCBmb3IgdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7UmVhZFByb3BlcnRpZXN9IHByb3BlcnRpZXMgdGhlIHJlc291cmNlcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGluY29taW5nUmVnaW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nTGlua3M6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5OiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHByb3BlcnRpZXM/OiBSZWFkUHJvcGVydGllcykge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvcic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IgfSBmcm9tICcuLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3InO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvLyBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAvLyBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgLy8gZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCB0aGUgVVJMIGZvciB0aGUgR0VUIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtIdHRwUGFyYW1zfSBwYXJhbXMgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBHRVQgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBHZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBIdHRwUGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHtvYnNlcnZlOiAncmVzcG9uc2UnLCBwYXJhbXM6IHBhcmFtc30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIEpTT04tTEQgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogRXhwYW5kcyBJcmlzIGFuZCBjcmVhdGVzIGFuIGVtcHR5IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NKU09OTEQocmVzb3VyY2VSZXNwb25zZTogQXBpU2VydmljZVJlc3VsdCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgY29uc3QgcmVzUHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgIGNvbnN0IHJlc1Byb21pc2UgPSByZXNQcm9taXNlcy5jb21wYWN0KHJlc291cmNlUmVzcG9uc2UuYm9keSwge30pO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgIHJldHVybiBmcm9tKHJlc1Byb21pc2UpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gYm9keVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBQdXQocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBlcnJvclxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgQXBpU2VydmljZUVycm9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkva25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IE5ld09udG9sb2d5IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS92Mi9vbnRvbG9neS9uZXctb250b2xvZ3knO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUIGxpc3Qgb2Ygb250b2xvZ2llc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogREVQUkVDQVRFRDogWW91IHNob3VsZCB1c2UgZ2V0QWxsT250b2xvZ2llcygpXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRBbGxPbnRvbG9naWVzKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBvbnRvbG9naWVzIG9mIGEgc3BlY2lmaWMgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIHByb2plY3Qgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0T250b2xvZ2llcyhwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVQgb250b2xvZ3lcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmlzIG9mIHRoZSBuYW1lZCBncmFwaHMgd2hvc2UgcmVzb3VyY2UgY2xhc3NlcyBhcmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIElyaXMgb2YgdGhlIHJlc291cmNlIGNsYXNzZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IG9udG9sb2d5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZXdPbnRvbG9neX0gZGF0YSBEYXRhIGNvbnRhaW5zOiBwcm9qZWN0SXJpLCBuYW1lLCBsYWJlbFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBjcmVhdGVPbnRvbG9neShkYXRhOiBOZXdPbnRvbG9neSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzJztcblxuICAgICAgICBjb25zdCBvbnRvbG9neSA9IHtcbiAgICAgICAgICAgICdrbm9yYS1hcGk6b250b2xvZ3lOYW1lJzogZGF0YS5uYW1lLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTphdHRhY2hlZFRvUHJvamVjdCc6IHtcbiAgICAgICAgICAgICAgICAnQGlkJzogZGF0YS5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdyZGZzOmxhYmVsJzogZGF0YS5sYWJlbCxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmcyc6IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgb250b2xvZ3kpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBhIGxhYmVsIGRlc2NyaWJpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBPY2N1cnJlbmNlIG9mIGEgcHJvcGVydHkgZm9yIGEgcmVzb3VyY2UgY2xhc3MgKGl0cyBjYXJkaW5hbGl0eSkuXG4gKi9cbmV4cG9ydCBlbnVtIENhcmRpbmFsaXR5T2NjdXJyZW5jZSB7XG4gICAgbWluQ2FyZCA9IDAsXG4gICAgY2FyZCA9IDEsXG4gICAgbWF4Q2FyZCA9IDJcbn1cblxuXG4vKipcbiAqIENhcmRpbmFsaXR5IG9mIGEgcHJvcGVydHkgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhcmRpbmFsaXR5IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q2FyZGluYWxpdHlPY2N1cnJlbmNlfSBvY2N1cnJlbmNlIHR5cGUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgbnVtZXJpY2FsIHZhbHVlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0aGUgZ2l2ZW4gb2NjdXJyZW5jZSBhcHBsaWVzIHRvLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9jY3VycmVuY2U6IENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICAgICAgICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5W119IGNhcmRpbmFsaXRpZXMgdGhlIHJlc291cmNlIGNsYXNzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGljb246IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjYXJkaW5hbGl0aWVzOiBBcnJheTxDYXJkaW5hbGl0eT4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHJlc291cmNlIGNsYXNzIElyaXMgdG8gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVzb3VyY2VDbGFzcztcbn1cblxuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdFR5cGUgdGhlIHByb3BlcnR5J3Mgb2JqZWN0IGNvbnN0cmFpbnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBzdWJQcm9wZXJ0eU9mIElyaXMgb2YgcHJvcGVydGllcyB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBzdWJwcm9wZXJ0eSBvZi5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRWRpdGFibGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGNhbiBiZSBlZGl0ZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGlua1Byb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIGxpbmtpbmcgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtWYWx1ZVByb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSByZWZlcnMgdG8gYSBsaW5rIHZhbHVlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNFZGl0YWJsZTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWFkb25seSBpc0xpbmtQcm9wZXJ0eTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5TWV0YWRhdGFbXX0gb250b2xvZ2llcyBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSBsaXN0IG9mIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIG5hbWVkIGdyYXBoLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbnRvbG9naWVzID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9udG9sb2d5IGluZm9ybWF0aW9uIHJlcXVlc3RlZCBmcm9tIHRoaXMgc2VydmljZS5cbiAqXG4gKiBGb3IgZXZlcnkgcmVxdWVzdCwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBjb250YWluaW5nIHRoZSByZXF1ZXN0ZWQgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNvcnRzIGFuIGFycmF5IG9mIGBSZXNvdXJjZUNsYXNzYCBvciBgUHJvcGVydHlgIGJ5IGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGEgZmlyc3QgZWxlbWVudFxuICAgICAqIEBwYXJhbSBiIHNlY29uZCBlbGVtZW50XG4gICAgICogQHJldHVybiBuZWdhdGl2ZSAtMSBpZiB0aGUgZmlyc3QgZWxlbWVudCBpcyBjb25zaWRlcmVkIGxvd2VyIHRoYW4gdGhlIHNlY29uZCwgMSBpZiB0aGUgc2Vjb25kIGVsZW1lbnQgaXMgY29uc2lkZXJlZCBiaWdnZXIsIDAgaWYgdGhleSBhcmUgZXF1YWxcbiAgICAgKi9cbiAgICBzdGF0aWMgc29ydEZ1bmMoYTogUmVzb3VyY2VDbGFzcyB8IFByb3BlcnR5LCBiOiBSZXNvdXJjZUNsYXNzIHwgUHJvcGVydHkpIHtcbiAgICAgICAgLy8gZGVhbGluZyB3aXRoICd1bmRlZmluZWQnIGxhYmVsc1xuICAgICAgICBpZiAoYS5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChiLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhYmVsQSA9IGEubGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbGFiZWxCID0gYi5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChsYWJlbEEgPCBsYWJlbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbEEgPiBsYWJlbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUgZ2l2ZW4gW1tPbnRvbG9neUluZm9ybWF0aW9uXV0gaW50byB0aGUgY3VycmVudCBpbnN0YW5jZSxcbiAgICAgKiB1cGRhdGluZyB0aGUgZXhpc3RpbmcgaW5mb3JtYXRpb24uXG4gICAgICogVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBhIHNlcnZpY2UgbGlrZSB0aGUgc2VhcmNoIGZldGNoZXMgbmV3IHJlc3VsdHNcbiAgICAgKiB0aGF0IGhhdmUgdG8gYmUgYWRkZWQgdG8gYW4gZXhpc3RpbmcgY29sbGVjdGlvbi5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgb250b2xvZ3kgaW5mb3JtYXRpb24gbXVzdCBub3QgYmUgbG9zdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIHRoZSBnaXZlbiBkZWZpbml0aW9ucyB0aGF0IGhhdmUgdG8gYmUgaW50ZWdyYXRlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgdXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzRm9yT250b2xvZ3kgaW4gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV0gPSBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSByZXNvdXJjZUNsYXNzZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3MgaW4gbmV3UmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc10gPSBuZXdSZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdQcm9wZXJ0aWVzID0gb250b2xvZ3lJbmZvLmdldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdQcm9wIGluIG5ld1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1tuZXdQcm9wXSA9IG5ld1Byb3BlcnRpZXNbbmV3UHJvcF07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IC0gYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGdyb3VwZWQgYnkgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc2VzIC0gYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMoKTogUmVzb3VyY2VDbGFzc2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNvcnRBc2Mgc29ydCByZXNvdXJjZSBjbGFzc2VzIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlciBieSBkZWZhdWx0XG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc1tdXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheShzb3J0QXNjOiBib29sZWFuID0gdHJ1ZSk6IEFycmF5PFJlc291cmNlQ2xhc3M+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzSXJpIGluIHRoaXMucmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICBjb25zdCByZXNDbGFzczogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucHVzaChyZXNDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNvdXJjZUNsYXNzZXMgb3JkZXIgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIHJlc0NsYXNzZXMuc29ydChPbnRvbG9neUluZm9ybWF0aW9uLnNvcnRGdW5jKTtcblxuICAgICAgICAvLyByZXNvdXJjZUNsYXNzZXMgb3JkZXIgYnkgbGFiZWwgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBpZiAoIXNvcnRBc2MpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc0NsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNDbGFzcyByZXNvdXJjZSBjbGFzcyB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlc0NsYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChyZXNDbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NEZWYgIT09IHVuZGVmaW5lZCAmJiByZXNDbGFzc0RlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY2Fubm90IGdldCBsYWJlbCBmb3IgJHtyZXNDbGFzc31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzIHdpdGhvdXQgYXJndW1lbnQgcmVzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvcGVydGllcyAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKCk6IFByb3BlcnRpZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNvcnRBc2Mgc29ydCBwcm9wZXJ0aWVzIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlciBieSBkZWZhdWx0XG4gICAgICogQHJldHVybnMgUHJvcGVydHlbXSAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KHNvcnRBc2M6IGJvb2xlYW4gPSB0cnVlKTogQXJyYXk8UHJvcGVydHk+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eT4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcDogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm9wZXJ0aWVzIG9yZGVyIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgICBwcm9wZXJ0aWVzLnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgLy8gcHJvcGVydGllcyBvcmRlciBieSBsYWJlbCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGlmICghc29ydEFzYykge1xuICAgICAgICAgICAgcHJvcGVydGllcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWY6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHByb3BEZWYgIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNhbm5vdCBnZXQgbGFiZWwgZm9yICR7cHJvcGVydHl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUHJvcGVydHkgd2l0aG91dCBhcmd1bWVudCBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gKiBPdGhlciBjb21wb25lbnRzIG9yIHNlcnZpY2VzIG9idGFpbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRoaXMgc2VydmljZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUNhY2hlU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBPbnRvbG9naWVzIGluZ29yZWQgYnkgdGhpcyBzZXJ2aWNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkT250b2xvZ2llc1xuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRPbnRvbG9naWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5LCBLbm9yYUNvbnN0YW50cy5TdGFuZG9mZk9udG9sb2d5XTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGV4Y2x1ZGVkUHJvcGVydGllcyBwcm9wZXJ0aWVzIHRoYXQgS25vcmEgaXMgbm90IHJlc3BvbnNpYmxlIGZvciBhbmQgdGhhdCBoYXZlIHRvIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZXNvbHZlZCBhdCB0aGUgbW9tZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgZXhjbHVkZWRQcm9wZXJ0aWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub25SZXNvdXJjZUNsYXNzZXMgY2xhc3MgZGVmaW5pdGlvbnMgdGhhdCBhcmUgbm90IGJlIHRyZWF0ZWQgYXMgS25vcmEgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgbm9uUmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLkZvcmJpZGRlblJlc291cmNlLCBLbm9yYUNvbnN0YW50cy5YTUxUb1N0YW5kb2ZmTWFwcGluZywgS25vcmFDb25zdGFudHMuTGlzdE5vZGVdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUNhY2hlfSBjYWNoZU9udG9sb2d5IGNlbnRyYWwgaW5zdGFuY2UgdGhhdCBjYWNoZXMgYWxsIGRlZmluaXRpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWNoZU9udG9sb2d5OiBPbnRvbG9neUNhY2hlID0gbmV3IE9udG9sb2d5Q2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29udG9sb2d5U2VydmljZTogT250b2xvZ3lTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIG9udG9sb2dpZXMgYXMgSlNPTi1MRCAobm8gcHJlZml4ZXMsIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0T250b2xvZ2llc01ldGFkYXRhKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIChyZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzKSBmb3IgdGhlIGdpdmVuIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaSBvZiB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8b2JqZWN0PiAtIG1ldGFkYXRhIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYWxsIHRoZSBvbnRvbG9naWVzJyBtZXRhZGF0YSByZXR1cm5lZCBieSBLbm9yYSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBvbnRvbG9naWVzIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgYSBuZXcgT250b2xvZ3lNZXRhZGF0YSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUob250b2xvZ2llczogb2JqZWN0W10pIHtcblxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcyA9IG9udG9sb2dpZXMubWFwKFxuICAgICAgICAgICAgb250b2xvZ3kgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lNZXRhZGF0YShvbnRvbG9neVsnQGlkJ10sIG9udG9sb2d5W0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9udG9sb2dpZXMnIG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlIGFuZCByZXR1cm5zIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiAtIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogYGtub3JhLWFwaTpSZXNvdXJjZWAgd2lsbCBiZSBleGNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8b2JqZWN0Pn0gY2xhc3NEZWZpbml0aW9ucyB0aGUgY2xhc3MgZGVmaW5pdGlvbnMgaW4gYW4gb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIGdpdmVuIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzRGVmIG9mIGNsYXNzRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzSXJpID0gY2xhc3NEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGF0IGNsYXNzIG5hbWUgaXMgbm90IGxpc3RlZCBhcyBhIG5vbiByZXNvdXJjZSBjbGFzcyBhbmQgdGhhdCB0aGUgaXNSZXNvdXJjZUNsYXNzIGZsYWcgaXMgcHJlc2VudCBhbmQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjbGFzc0lyaSAhPT0gS25vcmFDb25zdGFudHMuUmVzb3VyY2UgJiYgdGhpcy5ub25SZXNvdXJjZUNsYXNzZXMuaW5kZXhPZihjbGFzc0lyaSlcbiAgICAgICAgICAgICAgICA9PT0gLTEgJiYgKGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gIT09IHVuZGVmaW5lZCAmJiBjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIHZhbHVlIGNsYXNzLCBidXQgYSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMucHVzaChjbGFzc0lyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc0lyaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9neVxuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEtub3JhIGF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGluIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICogSWYgdGhleSBhcmUgZGVmaW5lZCBpbiBhbm90aGVyIG9udG9sb2d5LCB0aGF0IG9udG9sb2d5IGlzIHJlcXVlc3RlZCBmcm9tIEtub3JhIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbnRvbG9neSB0aGUgb250b2xvZ3kgdG8gYmUgY2FjaGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5OiBvYmplY3QpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncmFwaCA9IG9udG9sb2d5WydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBnZXQgYWxsIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IGNsYXNzRGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bENsYXNzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xPYmplY3RQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xEYXRhdHlwZVByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bEFubm90YXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5SZGZQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gY2FjaGUgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50IG9udG9sb2d5XG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5WydAaWQnXV0gPSB0aGlzLmdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZzKTtcblxuICAgICAgICAvLyB3cml0ZSBjbGFzcyBhbmQgcHJvcGVydHkgZGVmaW50aW9ucyB0byBjYWNoZVxuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShjbGFzc0RlZnMsIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgdGhlIG9udG9sb2dpZXMgZm9yIHdoaWNoIGRlZmluaXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhbGwgcmVxdWVzdGVkIG5hbWVkIGdyYXBoc1xuICAgICAgICBsZXQgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9udG9sb2d5SXJpIG9mIG9udG9sb2d5SXJpcykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9naWVzRnJvbUNhY2hlOiBvbnRvbG9neSBub3QgZm91bmQgaW4gY2FjaGU6ICR7b250b2xvZ3lJcml9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIG9udG9sb2d5XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV07XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBvZiB0aGlzIG9udG9sb2d5XG4gICAgICAgICAgICBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IGFsbFJlc291cmNlQ2xhc3NJcmlzLmNvbmNhdCh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBhbGwgcmVxdWVzdGVkIG9udG9sb2dpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKGFsbFJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5LCByZXNDbGFzc0RlZnMuZ2V0UmVzb3VyY2VDbGFzc2VzKCksIHJlc0NsYXNzRGVmcy5nZXRQcm9wZXJ0aWVzKClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIG9udG9sb2d5IHJlc3BvbnNlIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyB0aGUgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcHJvcGVydHlDbGFzc0RlZmluaXRpb25zIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUocmVzb3VyY2VDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+LCBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzcyBvZiByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmkgPSByZXNDbGFzc1snQGlkJ107XG5cbiAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgYWxsIGNhcmRpbmFsaXRpZXMgb2YgdGhpcyByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdGllczogQ2FyZGluYWxpdHlbXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBzdWJjbGFzc09mQ29sbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgc2luZ2xlIG9iamVjdCBvciBhIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdKSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IFtyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCBjYXJkaW5hbGl0aWVzIGZvciB0aGUgcHJvcGVydGllcyBvZiBhIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjdXJDYXJkIG9mIHN1YmNsYXNzT2ZDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0IGlzIGEgY2FyZGluYWxpdHkgKGl0IGNvdWxkIGFsc28gYmUgYW4gSXJpIG9mIGEgc3VwZXJjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmQgaW5zdGFuY2VvZiBPYmplY3QgJiYgY3VyQ2FyZFsnQHR5cGUnXSAhPT0gdW5kZWZpbmVkICYmIGN1ckNhcmRbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLk93bFJlc3RyaWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDYXJkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb2NjdXJyZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5taW5DYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UuY2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1heENhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIGtub3duIG9jY3VycmVuY2UgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBjYXJkaW5hbGl0eSB0eXBlIGludmFsaWQgZm9yICR7cmVzQ2xhc3NbJ0BpZCddfSAke2N1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBndWkgb3JkZXJcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXMucHVzaChuZXdDYXJkKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzT2JqID0gbmV3IFJlc291cmNlQ2xhc3MoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmksXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmVzb3VyY2VJY29uXSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyB3cml0ZSB0aGlzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24gdG8gdGhlIGNhY2hlIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPSByZXNDbGFzc09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3NlcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKiBUaGUgYW5zd2VyIGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBieSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc0NsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbiBbW09udG9sb2d5Q2FjaGVdXSByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc0NsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgZGVmaW5pdGlvbnMgZm9yIGVhY2ggcmVzb3VyY2UgY2xhc3MgZnJvbSB0aGUgY2FjaGVcblxuICAgICAgICBjb25zdCByZXNDbGFzc0RlZnMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIGNvbnN0IHByb3BlcnR5SXJpcyA9IFtdO1xuXG4gICAgICAgIHJlc0NsYXNzSXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmc1tyZXNDbGFzc0lyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldLmNhcmRpbmFsaXRpZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgcHJvcGVydHkgZGVmaW5pdGlvbiBmb3IgZWFjaCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlJcmlzLnB1c2goY2FyZC5wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcHJvcERlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgcmVzQ2xhc3NEZWZzLCBwcm9wRGVmcy5nZXRQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXNcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmE6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCBwcm9wRGVmIG9mIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcElyaSA9IHByb3BEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICBsZXQgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN1YlByb3BlcnR5T2YgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdKSkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdLm1hcCgoc3VwZXJQcm9wOiBPYmplY3QpID0+IHN1cGVyUHJvcFsnQGlkJ10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLnB1c2gocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXVsnQGlkJ10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXVsnQGlkJ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID0gbmV3IFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZixcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlLFxuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT250b2xvZ3lJbmZvcm1hdGlvbiAtIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbnRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gbmV3IFByb3BlcnRpZXMoKTtcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlOiBwcm9wZXJ0eSBub3QgZm91bmQgaW4gY2FjaGU6ICR7cHJvcElyaX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eURlZnNbcHJvcElyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgbmV3IFJlc291cmNlQ2xhc3NlcygpLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IC0gbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnlbXT5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgICAgIC8vIGFycmF5IHRvIGJlIHBvcHVsYXRlZCB3aXRoIE9ic2VydmFibGVzXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gW107XG5cbiAgICAgICAgLy8gZG8gYSByZXF1ZXN0IGZvciBlYWNoIG9udG9sb2d5XG4gICAgICAgIG9udG9sb2d5SXJpcy5mb3JFYWNoKG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgIC8vIHB1c2ggYW4gT2JzZXJ2YWJsZSBvbnRvIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgICAgIG9ic2VydmFibGVzLnB1c2godGhpcy5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKG9udG9sb2d5OiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHJlc3BvbnNlIHRvIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JrSm9pbiByZXR1cm5zIGFuIE9ic2VydmFibGUgb2YgYW4gYXJyYXkgb2YgcmVzdWx0c1xuICAgICAgICAvLyByZXR1cm5lZCBieSBlYWNoIE9ic2VydmFibGUgY29udGFpbmVkIGluIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgLy8gYSBzdWJzY3JpcHRpb24gdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgZm9ya0pvaW4gaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gb25jZSBhbGwgT2JzZXJ2YWJsZXMgaGF2ZSBiZWVuIGNvbXBsZXRlZFxuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbGwgb250b2xvZ3kgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBvbnRvbG9neUlyaXNUb1F1ZXJ5ID0gb250b2xvZ3lJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9udG9sb2d5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgb250b2xvZ2llcyB0aGF0IGFyZSBtb3QgY2FjaGVkIHlldFxuICAgICAgICBpZiAob250b2xvZ3lJcmlzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXNUb1F1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGVkIG9uY2UgYWxsIG9udG9sb2dpZXMgaGF2ZSBiZWVuIGNhY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBQcm9wZXJ0aWVzIGNvbnRhaW5lZCBpbiB0aGUgY2FyZGluYWxpdGllcyB3aWxsIGJlIHJldHVybmVkIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3NlcyAoaW5jbHVkaW5nIHByb3BlcnRpZXMpLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmlzVG9RdWVyeUZvcjogc3RyaW5nW10gPSByZXNvdXJjZUNsYXNzSXJpcy5maWx0ZXIoXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPT09IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShyZXNDbGFzc0lyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWQgLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzVG9RdWVyeTogc3RyaW5nW10gPSBwcm9wZXJ0eUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzVG9RdWVyeS5tYXAoXG4gICAgICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocHJvcElyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIHdpdGg6IHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi9yZWFkLXJlc291cmNlJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBlbnRpdGllcyB1c2VkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uIG9mIGBSZWFkUmVzb3VyY2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBvbnRvbG9neUluZm9ybWF0aW9uOiBPbnRvbG9neUluZm9ybWF0aW9uID0gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oe30sIHt9LCB7fSk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gcmVzb3VyY2VzIGdpdmVuIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZXNvdXJjZXMgbnVtYmVyIG9mIGdpdmVuIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+LCBwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikge1xuICAgIH1cblxufVxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIHRoZSByZXN1bHQgb2YgYSBjb3VudCBxdWVyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvdW50UXVlcnlSZXN1bHQge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbnVtYmVyT2ZSZXN1bHRzIHRvdGFsIG51bWJlciBvZiByZXN1bHRzIGZvciBhIHF1ZXJ5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc3VsdHM6IG51bWJlcikge1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgSW1hZ2VSZWdpb24gfSBmcm9tICcuL2ltYWdlLXJlZ2lvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbWFnZSBpbmNsdWRpbmcgaXRzIHJlZ2lvbnMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWV9IHN0aWxsSW1hZ2VGaWxlVmFsdWUgYSBbW1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlXV0gcmVwcmVzZW50aW5nIGFuIGltYWdlLlxuICAgICAqIEBwYXJhbSB7SW1hZ2VSZWdpb25bXX0gcmVnaW9ucyB0aGUgcmVnaW9ucyBiZWxvbmdpbmcgdG8gdGhlIGltYWdlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLCByZWFkb25seSByZWdpb25zOiBJbWFnZVJlZ2lvbltdKSB7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRHZW9tVmFsdWUsIFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlZ2lvbi5cbiAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSByZXNvdXJjZSByZXByZXNlbnRpbmcgdGhlIHJlZ2lvbiBhbmQgaXRzIGdlb21ldHJpZXMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIEltYWdlUmVnaW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkUmVzb3VyY2V9IHJlZ2lvblJlc291cmNlIGEgcmVzb3VyY2Ugb2YgdHlwZSBSZWdpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSByZWdpb25SZXNvdXJjZTogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlb21ldHJ5IGluZm9ybWF0aW9uIGJlbG9uZ2luZyB0byB0aGlzIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtSZWFkR2VvbVZhbHVlW119XG4gICAgICovXG4gICAgZ2V0R2VvbWV0cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaW9uUmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNHZW9tZXRyeV0gYXMgUmVhZEdlb21WYWx1ZVtdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuL2RlY2xhcmF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogS3VpQ29yZUNvbmZpZ31cbiAgICBdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBLdWlDb3JlTW9kdWxlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7S3VpQ29yZUNvbmZpZ30gY29uZmlnXG4gICAgICogQHJldHVybnMge01vZHVsZVdpdGhQcm92aWRlcnN9XG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBLdWlDb3JlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIC8vIGdldCB0aGUgYXBwIGVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gaGVyZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb25maWcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEt1aUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgR3JvdXAsIEdyb3VwUmVzcG9uc2UsIEdyb3Vwc1Jlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgZ3JvdXAgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcm91cHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vZ3JvdXBzJztcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2YgYWxsIGdyb3Vwcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8R3JvdXBbXT5cbiAgICAgKi9cbiAgICBnZXRBbGxHcm91cHMoKTogT2JzZXJ2YWJsZTxHcm91cFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3Vwc1Jlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBncm91cCBvYmplY3QgKGZpbHRlciBieSBJUkkpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8R3JvdXA+XG4gICAgICovXG4gICAgZ2V0R3JvdXBCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8R3JvdXA+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3VwUmVzcG9uc2UpLmdyb3VwKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIExpc3QsXG4gICAgTGlzdENyZWF0ZVBheWxvYWQsXG4gICAgTGlzdEluZm8sXG4gICAgTGlzdEluZm9SZXNwb25zZSxcbiAgICBMaXN0SW5mb1VwZGF0ZVBheWxvYWQsXG4gICAgTGlzdE5vZGVJbmZvLFxuICAgIExpc3ROb2RlSW5mb1Jlc3BvbnNlLFxuICAgIExpc3RSZXNwb25zZSxcbiAgICBMaXN0c1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBsaXN0cyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2xpc3RzJztcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgbGlzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb2plY3RJcmldXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm9bXT5cbiAgICAgKi9cbiAgICBnZXRMaXN0cyhwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm9bXT4ge1xuICAgICAgICBpZiAocHJvamVjdElyaSkge1xuICAgICAgICAgICAgdGhpcy5wYXRoICs9ICc/cHJvamVjdElyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RzUmVzcG9uc2UpLmxpc3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdD5cbiAgICAgKi9cbiAgICBnZXRMaXN0KGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IGluZm8gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3RJbmZvPlxuICAgICAqL1xuICAgIGdldExpc3RJbmZvKGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG5vZGUgaW5mbyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPlxuICAgICAqL1xuICAgIGdldExpc3ROb2RlSW5mbyhub2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0Tm9kZUluZm9SZXNwb25zZSkubm9kZWluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdENyZWF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3Q+XG4gICAgICovXG4gICAgY3JlYXRlTGlzdChwYXlsb2FkOiBMaXN0Q3JlYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVkaXQgbGlzdCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0SW5mb1VwZGF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3RJbmZvPlxuICAgICAqL1xuICAgIHVwZGF0ZUxpc3RJbmZvKHBheWxvYWQ6IExpc3RJbmZvVXBkYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLmxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBQcm9qZWN0LCBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlLCBQcm9qZWN0UmVzcG9uc2UsIFByb2plY3RzUmVzcG9uc2UsIFVzZXIgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHByb2plY3RzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBwcm9qZWN0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdFtdPlxuICAgICAqL1xuICAgIGdldEFsbFByb2plY3RzKCk6IE9ic2VydmFibGU8UHJvamVjdFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi9wcm9qZWN0cycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdHNSZXNwb25zZSkucHJvamVjdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lIHNob3J0IG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGUgaGV4YWRlY2ltYWwgY29kZSB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IHJldHJpZXZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3QodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBwcm9qZWN0IGlkIChpcmkpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lIHNob3J0IG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzLlxuICAgICAqIFByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydGNvZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlIGhleGFkZWNpbWFsIGNvZGUgdGhhdCB1bmlxdWVseSBpZGVudGlmaWVzIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IG1lbWJlciByZXRyaWV2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3RNZW1iZXJzKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdE1lbWJlcnNSZXNwb25zZSkubWVtYmVycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgY3JlYXRlUHJvamVjdChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRWRpdCBwcm9qZWN0IGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICB1cGRhdGVQcm9qZWN0KGlyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHByb2plY3QgKGlmIGl0IHdhcyBkZWxldGVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIChzZXQgaW5hY3RpdmUpIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZGVsZXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBVc2VyLFxuICAgIFVzZXJSZXNwb25zZSxcbiAgICBVc2Vyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSB1c2VzIHRoZSBLbm9yYSBhZG1pbiBBUEkgYW5kIGhhbmRsZXMgYWxsIHVzZXIgZGF0YS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2Vyc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHVzZXJzVXJsOiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3VzZXJzJztcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdXNlcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRBbGxVc2VycygpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vdXNlcnMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJzUmVzcG9uc2UpLnVzZXJzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgYnkgdXNlcm5hbWUsIGVtYWlsIG9yIGJ5IGlyaS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyIC0gR2V0IHVzZXIgYnkgdXNlcm5hbWUsIGVtYWlsIG9yIGJ5IGlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwcmVjYXRlZCEgUGxlYXNlIHVzZSBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZykgb25seSFcbiAgICAgKiBHZXQgdXNlciBieSBlbWFpbFxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVtYWlsXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKGVtYWlsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXByZWNhdGVkISBQbGVhc2UgdXNlIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKSBvbmx5IVxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKGlyaSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgY3JlYXRlVXNlcihkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIGEgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIGFuIGFkbWluIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB1c2VyIG9mIGFuIGFkbWluIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byB0aGUgYWRtaW4gc3lzdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFjdGl2YXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgb3duIHBhc3N3b3JkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlT3duUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICAgICAgICByZXF1ZXN0ZXJQYXNzd29yZDogb2xkUGFzc3dvcmRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgcGFzc3dvcmQgb2YgYW5vdGhlciB1c2VyIChub3Qgb3duKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXJzUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCByZXF1ZXN0ZXJQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICAgICAgICByZXF1ZXN0ZXJQYXNzd29yZDogcmVxdWVzdGVyUGFzc3dvcmRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB1c2VyIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXIodXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAvIGRlYWN0aXZhdGUgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB1c2VyIGZyb20gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHNldExhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgdmFyOiBsYW5nIH0pO1xuICB9XG4gIGdldExhbmd1YWdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgfVxuXG4gIC8qKlxuICAqIHRoaXMgbWV0aG9kIGdldCB0aGUgc3RhdHVzIG1lc3NhZ2VzIGZyb20gdGhlIHN0YXR1c01zZy5qc29uIGZpbGVcbiAgKiB3aGljaCBhcmUgZGVmaW5lZCBoZXJlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzXG4gICogYW5kIGhlcmU6IGh0dHA6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9odHRwbWVzc2FnZXMuYXNwXG4gICpcbiAgKi9cbiAgZ2V0U3RhdHVzTXNnKCk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBwICsgJy9hc3NldHMvaTE4bi9zdGF0dXNNc2cuanNvbicpXG4gICAgICAucGlwZShtYXAoXG4gICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgICApO1xuXG4gIH07XG59XG4iLCJpbXBvcnQge1xuICAgIENvdW50UXVlcnlSZXN1bHQsXG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIC0gaW5kaWNhdGluZyBpZiB0aGUgbmFtZSByZWZlcnMgdG8gYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBjb25zdCBnZXRQcm9wZXJ0eU5hbWVzID0gKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9wTmFtZSAhPT0gJ0BpZCdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSAnQHR5cGUnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1Byb2plY3RcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvVXNlclxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmNyZWF0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmxhc3RNb2RpZmljYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuaGFzUGVybWlzc2lvbnNcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5BcmtVcmw7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFJlc291cmNlXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZSB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2UoXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQGlkJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQHR5cGUnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIGZyb20gSlNPTi1MRCxcbiAgICAgKiB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGUuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFZhbHVlIHRoZSB2YWx1ZSBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BJcmkgdGhlIElyaSBvZiB0aGUgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtSZWFkTGlua1ZhbHVlW119IHN0YW5kb2ZmTGlua1ZhbHVlcyBzdGFuZG9mZkxpbmtWYWx1ZXMgb2YgdGhlIHJlc291cmNlLiBUZXh0IHZhbHVlcyBtYXkgY29udGFpbiBsaW5rcyB0byBvdGhlciByZXNvdXJjZXMuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBvciBgdW5kZWZpbmVkYCBpbiBjYXNlIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkIGNvcnJlY3RseS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgcHJvcFZhbHVlOiBPYmplY3QsIHByb3BJcmk6IHN0cmluZywgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10pOiBSZWFkUHJvcGVydHlJdGVtIHwgdW5kZWZpbmVkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuXG4gICAgICAgIGxldCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZVxuICAgICAgICBzd2l0Y2ggKHByb3BWYWx1ZVsnQHR5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gYSB0ZXh0IHZhbHVlIG1pZ2h0IGJlIGdpdmVuIGFzIHBsYWluIHN0cmluZywgaHRtbCBvciB4bWwuXG4gICAgICAgICAgICAgICAgbGV0IHRleHRWYWx1ZTogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzU3RyaW5nKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3RhbmRvZmYgbGlua3MgYW5kIGluY2x1ZGUgcmVmZXJyZWQgcmVzb3VyY2VzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBhIHN0YW5kb2ZmIGxpbmssIGZ1cnRoZXIgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlIGNhbiBiZSBzaG93blxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGluayBvZiBzdGFuZG9mZkxpbmtWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzOiBSZWFkUmVzb3VyY2UgPSBzdGFuZG9mZkxpbmsucmVmZXJyZWRSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VzW3JlZmVycmVkUmVzLmlkXSA9IHJlZmVycmVkUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc0h0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSwgcmVmZXJyZWRSZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdICE9PSB1bmRlZmluZWQgJiYgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNYbWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhwZWN0ZWQgdGV4dCB2YWx1ZSBtZW1iZXJzIG5vdCBkZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBJbnZhbGlkIHRleHQgdmFsdWU6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU6XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbmV3IFJlYWREYXRlVmFsdWUocHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0NhbGVuZGFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0WWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RGF5XSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZERheV0pO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkYXRlVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlua1ZhbHVlOlxuXG4gICAgICAgICAgICAgICAgbGV0IGxpbmtWYWx1ZTogUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSByZWZlcnJlZCByZXNvdXJjZSBpcyBnaXZlbiBhcyBhbiBvYmplY3Qgb3IganVzdCBhcyBhbiBJUklcbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXQgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZS5pZCwgcmVmZXJyZWRSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldElyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2UgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZS5pZCwgaW5jb21pbmdSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlua1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50VmFsdWUgPSBuZXcgUmVhZEludGVnZXJWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZWdlclZhbHVlQXNJbnRlZ2VyXSk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIGEgZGVjaW1hbCB2YWx1ZSBpcyByZXByZXNlbnRlZCBhcyBhIHN0cmluZyBpbiBvcmRlciB0byBwcmVzZXJ2ZSBpdHMgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjVmFsOiBudW1iZXIgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWxdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsVmFsdWUgPSBuZXcgUmVhZERlY2ltYWxWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBkZWNWYWwpO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGVjaW1hbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlU3BlY2lmaWNQcm9wO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBbW1JlYWRQcm9wZXJ0aWVzXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gICAgICogQHJldHVybnMgUmVhZFByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFByb3BlcnRpZXMge1xuXG4gICAgICAgIC8vIEpTT04tTEQgcmVwcmVzZW50aW5nIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIC8vIHRleHQgdmFsdWVzIG1heSBjb250YWluIHN0YW5kb2ZmIGxpbmtzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRDogT2JqZWN0ID0gcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZV07XG5cbiAgICAgICAgLy8gdG8gYmUgcG9wdWxhdGVkIHdpdGggc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10gPSBbXTtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RhbmRvZmYgbGluayB2YWx1ZSBKU09OLUxEIG9iamVjdCB0byBhIFJlYWRMaW5rVmFsdWVcbiAgICAgICAgLy8gaW4gb3JkZXIgcG9wdWxhdGUgdGhlIGNvbGxlY3Rpb24gd2l0aCBhbGwgdGhlIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rSlNPTkxEIG9mIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsOiBSZWFkTGlua1ZhbHVlID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZXM6IEFycmF5PFJlYWRQcm9wZXJ0eUl0ZW0+ID0gW107XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiB2YWx1ZXMgb3IganVzdCBvbmUgdmFsdWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHByb3BlcnR5IG5hbWUsIGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBpcyBnaXZlbiwgaXRlcmF0ZSBvdmVyIGl0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wVmFsdWUgb2YgcmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChwcm9wVmFsdWUsIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0sIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICAgICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wVmFsdWVzO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhbiBBUEkgcmVzcG9uc2UgaW4gSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMgaW50byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSByZXNvdXJjZSBvciBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgLSBzZXF1ZW5jZSBvZiByZWFkIHJlc291cmNlc1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiA9IFtdO1xuICAgICAgICBsZXQgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcjtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG4gICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IHJlc291cmNlc0dyYXBoLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGFuc3dlciwgbm8gcmVzb3VyY2VzIGdpdmVuXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAxO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZShyZXNvdXJjZXMsIG51bWJlck9mUmVzb3VyY2VzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIGFsbCB0aGUgdHlwZXMgKGNsYXNzZXMpIG9mIHJlZmVycmVkIHJlc291cmNlcyBmcm9tIGEgZ2l2ZW4gcmVzb3VyY2UgKGZyb20gaXRzIGxpbmtpbmcgcHJvcGVydGllcykuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgSlNPTi1MRCBkZXNjcmliaW5nIG9uZSByZXNvdXJjZS5cbiAgICAgKiBAcmV0dXJuIHN0cmluZ1tdIC0gYW4gQXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyAoaW5jbHVkaW5nIGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICAvLyBzZXZlcmFsIHZhbHVlcyBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcF0pKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlZmVycmVkUmVzIG9mIHJlc291cmNlSlNPTkxEW3Byb3BdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXNvdXJjZSB0eXBlcyAoY2xhc3NlcykgZnJvbSBhIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgKHdpdGhvdXQgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcbiAgICAgICAgbGV0IHJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNsYXNzIG9mIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzZXMuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBKU09OLUxEIHJlc3BvbnNlIHRvIGEgY291bnQgcXVlcnkgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb3VudFF1ZXJ5SlNPTkxEXG4gICAgICogQHJldHVybnMge0NvdW50UXVlcnlSZXN1bHR9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvdW50UXVlcnlSZXN1bHQoY291bnRRdWVyeUpTT05MRDogb2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEW0tub3JhQ29uc3RhbnRzLnNjaGVtYU51bWJlck9mSXRlbXNdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBLdWlDb3JlQ29uZmlnLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IE9udG9sb2d5Q2FjaGVTZXJ2aWNlLCBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0cyByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZXMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfb250b2xvZ3lDYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKG5vdCB5ZXQgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlIGFzIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBnZXRSZWFkUmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgY2FzZSBvZiBhbiBBcGlTZXJ2aWNlRXJyb3JcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIENvdW50UXVlcnlSZXN1bHQsIEt1aUNvcmVDb25maWcsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBDb252ZXJ0SlNPTkxEIH0gZnJvbSAnLi9jb252ZXJ0LWpzb25sZCc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8qKlxuICogUGVyZm9ybXMgc2VhcmNoZXMgKGZ1bGx0ZXh0IG9yIGV4dGVuZGVkKSBhbmQgc2VhcmNoIGNvdW50IHF1ZXJpZXMgaW50byBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEpTT04tTEQgb2JqZWN0IHRvIGEgYFJlYWRSZXNvcmNlU2VxdWVuY2VgLlxuICAgICAqIFRvIGJlIHBhc3NlZCBhcyBhIGZ1bmN0aW9uIHBvaW50ZXIgKGFycm93IG5vdGF0aW9uIHJlcXVpcmVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlOiAocmVzb3VyY2VSZXNwb25zZTogT2JqZWN0KSA9PiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4gPSAocmVzb3VyY2VSZXNwb25zZTogT2JqZWN0KSA9PiB7XG4gICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2guXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaChzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnb2Zmc2V0Jywgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIHNlYXJjaFRlcm0sIGh0dHBQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAoZm9yIHBhZ2luZywgZmlyc3Qgb2Zmc2V0IGlzIDApLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ29mZnNldCcsIG9mZnNldC50b1N0cmluZygpKTtcblxuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSwgaHR0cFBhcmFtcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIE9ic2VydmFibGUgb2YgUmVhZFJlc291cmNlc1NlcXVlbmNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHRgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeShzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeSBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gYSBgQ291bnRRdWVyeVJlc3VsdGBcbiAgICAgICAgICAgICAgICBDb252ZXJ0SlNPTkxELmNyZWF0ZUNvdW50UXVlcnlSZXN1bHRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIGdyYXZzZWFyY2hRdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkJywgZ3JhdnNlYXJjaFF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5KGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIGdyYXZzZWFyY2hRdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGNvdW50IHF1ZXJ5IGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIGdyYXZzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gYSBgQ291bnRRdWVyeVJlc3VsdGBcbiAgICAgICAgICAgICAgICBDb252ZXJ0SlNPTkxELmNyZWF0ZUNvdW50UXVlcnlSZXN1bHRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgc2VhcmNoIGJ5IGEgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBzZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzb3VyY2VDbGFzc0lSSV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUmVzb3VyY2VDbGFzcycsIHJlc291cmNlQ2xhc3NJUkkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHByb2plY3RJcmkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cEdldCgpIGV4cGVjdHMgb25seSBvbmUgYXJndW1lbnQsIG5vdCAyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbCBhbmQgdHVybnMgdGhlIHJlc3VsdHMgaW4gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc291cmNlQ2xhc3NJUkldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb2plY3RJcmldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJywgcmVzb3VyY2VDbGFzc0lSSSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9Qcm9qZWN0JywgcHJvamVjdElyaSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIGluY29taW5nIGluZm9ybWF0aW9uIChyZWdpb25zLCBsaW5rcywgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucykgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSW5jb21pbmdTZXJ2aWNlIGV4dGVuZHMgU2VhcmNoU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYWxsIGluY29taW5nIHJlZ2lvbnMgZm9yIGEgcGFydGljdWxhciByZXNvdXJjZS5cbiAgICAqXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJUkkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgSW5jb21pbmcgcmVnaW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAqL1xuICAgIGdldEluY29taW5nUmVnaW9ucyhyZXNvdXJjZUlSSTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3JlZ2lvbiBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG59IFdIRVJFIHtcbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVnaW9uIC5cbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSVJJfT4gLlxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJUkl9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cbmtub3JhLWFwaTpoYXNHZW9tZXRyeSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9nZW9tIGEga25vcmEtYXBpOkdlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cbmtub3JhLWFwaTpoYXNDb21tZW50IGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDpzdHJpbmcgLlxuXG4/Y29tbWVudCBhIHhzZDpzdHJpbmcgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxua25vcmEtYXBpOmhhc0NvbG9yIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpDb2xvciAuXG5cbj9jb2xvciBhIGtub3JhLWFwaTpDb2xvciAuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzcGFycWxRdWVyeVN0ciAnLCBzcGFycWxRdWVyeVN0cik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSwgaWYgYW55LlxuICAgICAqIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgbGluayB0byB0aGUgZ2l2ZW4gcmVzb3VyY2UgdmlhIGtub3JhLWJhc2U6aXNQYXJ0T2YuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNGb3JDb21wb3VuZFJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cGFnZSBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG59IFdIRVJFIHtcblxuP3BhZ2UgYSBrbm9yYS1hcGk6U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIC5cbj9wYWdlIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxua25vcmEtYXBpOnNlcW51bSBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6aW50ZWdlciAuXG5cbj9zZXFudW0gYSB4c2Q6aW50ZWdlciAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG5rbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkZpbGUgLlxuXG4/ZmlsZSBhIGtub3JhLWFwaTpGaWxlIC5cblxufSBPUkRFUiBCWSA/c2VxbnVtXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGluY29taW5nIGxpbmtzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgSXJpIGJ1dCBpbmNvbWluZyByZWdpb25zIGFuZCBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgaW5jb21pbmcgbGlua3Mgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ0xpbmtzRm9yUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9pbmNvbWluZ1JlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG59IFdIRVJFIHtcblxuP2luY29taW5nUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdQcm9wIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBHcmF2c2VhcmNoIHF1ZXJ5IHN0cmluZy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgZmFsc2UgaWYgbm90IHNldCBjb3JyZWN0bHkgKGluaXQgc3RhdGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgYm9vbGVhbikge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2N1cnJlbnRTZWFyY2hQYXJhbXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGZhbHNlXG4gICAgICAgIC8vIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyByZWxvYWRlZCwgdGhpcyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGNoYW5nZVNlYXJjaFBhcmFtc01zZyhzZWFyY2hQYXJhbXM6IEV4dGVuZGVkU2VhcmNoUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMubmV4dChzZWFyY2hQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXJjaCBwYXJhbXMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgRXh0ZW5kZWRTZWFyY2hQYXJhbXMgLSBzZWFyY2ggcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGdldFNlYXJjaFBhcmFtcygpOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLmdldFZhbHVlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSwgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgUHJvcGVydHlXaXRoVmFsdWUgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICogUmVwcmVzZW50cyBhbiBlcnJvciB0aGF0IG9jY3VycmVkIHdoZW4gZ2VuZXJhdGluZyBLbmFyUUwuXG4gKi9cbmNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgR3JhdlNlYXJjaCBxdWVyaWVzIGZyb20gcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5IGZyb20gdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttYWluUmVzb3VyY2VDbGFzc09wdGlvbl0gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZywgUmRmRGF0YU9iamVjdCwgUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHsgfVxuXG4gIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgY29udGVudCBvZiB0aGUgdHJpcGxlc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmRmRGF0YU9iamVjdHNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPHN0cmluZz5cbiAgICAgKi9cbiAgcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQocmRmRGF0YU9iamVjdHM6IFJkZkRhdGFPYmplY3RbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZT4odGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi9zdG9yZS9SZXNldFRyaXBsZXN0b3JlQ29udGVudCcsIHJkZkRhdGFPYmplY3RzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIENsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIFNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCYXNpY09udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIHJldHVybnMgb3VyIGxpc3Qgb2YgYSBiYXNpYyBvbnRvbG9neVxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgLy8gZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgICAgbGV0IHVybCA9IGVudmlyb25tZW50LnVybDtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgLy8gfVxuICBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBwO1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJyk7XG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlVHlwZXNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogR2V0IGFsbCByZXNvdXJjZSB0eXBlcyBkZWZpbmVkIGJ5IHRoZSB2b2NhYnVsYXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBWb2NhYnVsYXJ5IGlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgICAqL1xuICBnZXRSZXNvdXJjZVR5cGVzQnlWb2MoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzP3ZvY2FidWxhcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyByZXNvdXJjZSB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHJlc291cmNlIHR5cGUgaXJpXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgKi9cbiAgZ2V0UmVzb3VyY2VUeXBlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjEvcmVzb3VyY2V0eXBlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cblxuICAvLyBwdXRSZXNvdXJjZVR5cGUoaXJpKVxuXG59XG4iLCIvKipcbiAqIG1haW4gYXBpIHNlcnZpY2VzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSBhZG1pbiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9ncm91cHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xpc3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vdXNlcnMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSB2MiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2NvbnZlcnQtanNvbmxkJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvaW5jb21pbmcuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zdG9yZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UnO1xuIiwiaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hIH0gZnJvbSAnLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLCBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcblxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSBjb21wYXJpc29uIG9wZXJhdG9yLlxuICogVGhpcyBpbnRlcmZhY2UgaXMgaW1wbGVtZW50ZWQgZm9yIHRoZSBzdXBwb3J0ZWQgY29tcGFyaXNvbiBvcGVyYXRvcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIC8vIHR5cGUgb2YgY29tcGFyaXNvbiBvcGVyYXRvclxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8vIHRoZSBsYWJlbCBvZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciB0byBiZSBwcmVzZW50ZWQgdG8gdGhlIHVzZXIuXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8vIHJldHVybnMgdGhlIGNsYXNzIG5hbWUgd2hlbiBjYWxsZWQgb24gYW4gaW5zdGFuY2VcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5vdEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ05vdEVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBFeGlzdHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFeGlzdHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpa2UgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xpa2UnO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWF0Y2ggaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTWF0Y2gnO1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbWJpbmF0aW9uIG9mIGEgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgYSB2YWx1ZSBsaXRlcmFsIG9yIGFuIElSSS5cbiAqIEluIGNhc2UgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgJ0V4aXN0cycsIG5vIHZhbHVlIGlzIGdpdmVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgY29tcGFyaXNvbk9wZXJhdG9yOiBDb21wYXJpc29uT3BlcmF0b3IsIHJlYWRvbmx5IHZhbHVlPzogVmFsdWUpIHtcbiAgICB9XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIHZhbHVlOiBhbiBJUkkgb3IgYSBsaXRlcmFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB2YWx1ZSBpbnRvIGEgU1BBUlFMIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmc7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHkncyB2YWx1ZSBhcyBhIGxpdGVyYWwgd2l0aCB0aGUgaW5kaWNhdGlvbiBvZiBpdHMgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlTGl0ZXJhbCBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbVmFsdWVMaXRlcmFsXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgbGl0ZXJhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIChtYWtpbmcgdXNlIG9mIHhzZCkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nKSB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdHlwZSBhbm5vdGF0ZWQgdmFsdWUgbGl0ZXJhbCB0byBiZSB1c2VkIGluIGEgU1BBUlFMIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuXG4gICAgICAgIGxldCBsaXRlcmFsVHlwZTogc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgS25vcmEgc2NoZW1hIGNvbnZlcnNpb24gaXMgbmVjZXNzYXJ5LCBlLmcuLCBrbm9yYS1hcGk6ZGF0ZVZhbHVlIChjb21wbGV4KSB0byBrbm9yYS1hcGk6ZGF0ZSAoc2ltcGxlKS5cbiAgICAgICAgLy8geHNkIHR5cGVzIHdpbGwgcmVtYWluIHVuY2hhbmdlZFxuICAgICAgICBpZiAoc2NoZW1hID09PSBLbm9yYVNjaGVtYS5zaW1wbGUgJiYgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29udmVydCB0byBzaW1wbGUgc2NoZW1hXG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZG8gbm90IGNvbnZlcnRcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBcIiR7dGhpcy52YWx1ZX1cIl5ePCR7bGl0ZXJhbFR5cGV9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBJUkkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJUkkgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIFtJUkldLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSB0aGUgSVJJIG9mIGEgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaXJpOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBJUkkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaW5zdGFuY2UgSXJpIGFuZCBkb2VzIG5vdCBoYXZlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLmlyaX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIGEgdmFsdWUuXG4gKiBUaGlzIGludGVyZmFjZSBoYXMgdG8gYmUgaW1wbGVtZW50ZWQgZm9yIGFsbCB2YWx1ZSB0eXBlcyAodmFsdWUgY29tcG9uZW50IGNsYXNzZXMpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWV9LlxuICAgICAqL1xuICAgIGdldFZhbHVlKCk6IFZhbHVlO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5LCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IsIGFuZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5V2l0aFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbUHJvcGVydHlXaXRoVmFsdWVdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHkgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge0NvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlfSB2YWx1ZUxpdGVyYWwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaXNTb3J0Q3JpdGVyaW9uIGluZGljYXRlcyBpZiB0aGUgcHJvcGVydHkgaXMgdXNlZCBhcyBhIHNvcnQgY3JpdGVyaW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogUHJvcGVydHksXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlTGl0ZXJhbDogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgICAgIHJlYWRvbmx5IGlzU29ydENyaXRlcmlvbjogQm9vbGVhbikge1xuICAgIH1cblxufVxuXG4vKipcbiAqIGEgbGlzdCwgd2hpY2ggaXMgdXNlZCBpbiB0aGUgbWF0LWF1dG9jb21wbGV0ZSBmb3JtIGZpZWxkXG4gKiBjb250YWlucyBvYmplY3RzIHdpdGggaWQgYW5kIG5hbWUuIHRoZSBpZCBpcyB1c3VhbCB0aGUgaXJpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlSXRlbSB7XG4gICAgaXJpOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xufVxuXG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvcmVcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb3JlLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzLyc7XG4iLCIvKipcbiAqIEdlbmVyYXRlZCBidW5kbGUgaW5kZXguIERvIG5vdCBlZGl0LlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vcHVibGljX2FwaSc7XG5cbmV4cG9ydCB7S3VpQ29yZUNvbmZpZyBhcyDDicK1YX0gZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zJztcbmV4cG9ydCB7UHJvcGVydHkgYXMgw4nCtWJ9IGZyb20gJy4vbGliL3NlcnZpY2VzJzsiXSwibmFtZXMiOlsidHNsaWJfMS5fX2RlY29yYXRlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwianNvbmxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU1BOzs7OztRQVFXLFNBQUksR0FBVyxTQUFTLENBQUM7Ozs7O1FBT3pCLFFBQUcsR0FBVyxTQUFTLENBQUM7Ozs7O1FBT3hCLFFBQUcsR0FBVyxTQUFTLENBQUM7Ozs7O1FBT3hCLFVBQUssR0FBVyxTQUFTLENBQUM7S0FFcEM7SUF2QkdBO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENB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