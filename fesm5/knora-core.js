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
    var ListNode_1;
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
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        var geometryJSON = JSON.parse(geometryString);
        var points = [];
        try {
            for (var _a = __values(geometryJSON.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                var point = _b.value;
                points.push(new Point2D(point.x, point.y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
        var e_1, _c;
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
     * @param body
     * @returns {Observable<any>}
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
     * @param body
     * @returns {Observable<any>}
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
     * @returns {Observable<any>}
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
     * @returns {Observable<ApiServiceError>}
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
     * @param error
     * @returns {Observable<ApiServiceError>}
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

var GroupsService = /** @class */ (function (_super) {
    __extends(GroupsService, _super);
    function GroupsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/groups';
        return _this;
    }
    /**
     *
     * @returns {Observable<Group[]>}
     */
    GroupsService.prototype.getAllGroups = function () {
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupsResponse).groups; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} iri
     * @returns {Observable<Group>}
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
     *
     * @param {string} projectIri (optional)
     * @returns {Observable<ListNodeInfo[]>}
     */
    ListsService.prototype.getLists = function (projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListsResponse).lists; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} listIri
     * @returns {Observable<List>}
     */
    ListsService.prototype.getList = function (listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} listIri
     * @returns {Observable<ListInfo>}
     */
    ListsService.prototype.getListInfo = function (listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} nodeIri
     * @returns {Observable<ListNodeInfo>}
     */
    ListsService.prototype.getListNodeInfo = function (nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     *
     * @param {ListCreatePayload} payload
     * @returns {Observable<List>}
     */
    ListsService.prototype.createList = function (payload) {
        return this.httpPost(this.path, payload).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns {Observable<ListInfo>}
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

var ProjectsService = /** @class */ (function (_super) {
    __extends(ProjectsService, _super);
    function ProjectsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * returns a list of all projects
     *
     * @returns {Observable<Project[]>}
     */
    ProjectsService.prototype.getAllProjects = function () {
        return this.httpGet('/admin/projects').pipe(map(function (result) { return result.getBody(ProjectsResponse).projects; }), catchError(this.handleJsonError));
    };
    /**
     * returns a project object
     *
     * @param {string} iri
     * @returns {Observable<Project>}
     */
    ProjectsService.prototype.getProjectByIri = function (iri) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    };
    /**
     * returns a project object
     *
     * @param {string} shortname
     * @returns {Observable<Project>}
     */
    ProjectsService.prototype.getProjectByShortname = function (shortname) {
        var url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    };
    /**
     * returns a project object
     *
     * @param {string} shortcode
     * @returns {Observable<Project>}
     */
    ProjectsService.prototype.getProjectByShortcode = function (shortcode) {
        var url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    };
    /**
     * Helper method combining project retrieval
     *
     * @param {string} url
     * @returns {Observable<Project>}
     */
    ProjectsService.prototype.getProject = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * returns all project members
     * project identifier is project id (iri)
     *
     * @param {string} iri
     * @returns {Observable<User[]>}
     */
    ProjectsService.prototype.getProjectMembersByIri = function (iri) {
        var url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    };
    /**
     * returns all project members
     * project identifier is shortname
     *
     * @param {string} shortname
     * @returns {Observable<User[]>}
     */
    ProjectsService.prototype.getProjectMembersByShortname = function (shortname) {
        var url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    };
    /**
     * returns all project members
     * project identifier is shortcode
     *
     * @param {string} shortcode
     * @returns {Observable<User[]>}
     */
    ProjectsService.prototype.getProjectMembersByShortcode = function (shortcode) {
        var url = '/admin/projects/members/' + shortcode + '?identifier=shortcode';
        return this.getProjectMembers(url);
    };
    /**
     * Helper method combining project member retrieval
     *
     * @param {string} url
     * @returns {Observable<User[]>}
     */
    ProjectsService.prototype.getProjectMembers = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectMembersResponse).members; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * create new project
     *
     * @param data
     * @returns {Observable<Project>}
     */
    ProjectsService.prototype.createProject = function (data) {
        var url = '/admin/projects';
        return this.httpPost(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
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
    ProjectsService.prototype.updateProject = function (iri, data) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * activate project (if it was deleted)
     *
     * @param {string} iri
     * @returns {Observable<Project>}
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
     * Delete (set inactive) project
     *
     * @param {string} iri
     * @returns {Observable<Project>}
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
     * returns a list of all users
     *
     * @returns {Observable<User[]>}
     */
    UsersService.prototype.getAllUsers = function () {
        return this.httpGet('/admin/users').pipe(map(function (result) { return result.getBody(UsersResponse).users; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} email
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByEmail = function (email) {
        var path = '/admin/users/' + encodeURIComponent(email) + '?identifier=email';
        return this.getUser(path);
    };
    /**
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByIri = function (iri) {
        var path = '/admin/users/' + encodeURIComponent(iri);
        return this.getUser(path);
    };
    /**
     * Helper method combining user retrieval
     *
     * @param {string} path
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUser = function (path) {
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     *
     * @param data
     * @returns {Observable<User>}
     */
    UsersService.prototype.createUser = function (data) {
        var path = '/admin/users';
        return this.httpPost(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    UsersService.prototype.addUserToProject = function (userIri, projectIri) {
        var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
     */
    UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    UsersService.prototype.addUserToSystemAdmin = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    UsersService.prototype.activateUser = function (userIri) {
        var data = {
            status: true
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update own password
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Observable<User>}
     */
    UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.updateUser(userIri, data);
    };
    UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    };
    /**
     *
     * @param {string} userIri
     * @param data
     * @returns {Observable<User>}
     */
    UsersService.prototype.updateUser = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     *
     * @param {string} userIri
     * @returns {Observable<User>}
     */
    UsersService.prototype.deleteUser = function (userIri) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns {Observable<User>}
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
     * @returns the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns the requested ontology.
     */
    OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    };
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns the requested resource class definitions.
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
     * @param propertyIris the Iris of the properties to be queried.
     * @returns the requested properties.
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
    OntologyCacheService.ngInjectableDef = defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
}());

var ResourceService = /** @class */ (function (_super) {
    __extends(ResourceService, _super);
    function ResourceService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param iri Iri of the resource (already URL encoded).
     * @returns {Observable<any>}
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

var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Perform a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
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
     * @param searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
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
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<any>}
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
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
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
     * @param resourceClassIRI restrict search to given resource class.
     * @param projectIri restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
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
     * @returns Boolean indicating if the name refers to a value property.
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
     * @param resourceJSONLD an a resource and its properties serialized as JSON-LD.
     * @returns a [[ReadResource]].
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
     * @param propValue the value serialized as JSON-LD.
     * @param propIri the Iri of the property.
     * @param standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue, propIri, standoffLinkValues) {
        // convert a JSON-LD property value to a `ReadPropertyItem`
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
        var e_1, _a;
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
                        for (var _b = __values(resourceJSONLD[propName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var propValue = _c.value;
                            // convert a JSON-LD property value to a `ReadPropertyItem`
                            var valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                            // if it is undefined, the value could not be constructed correctly
                            // add the property value to the array of property values
                            if (valueSpecificProp !== undefined)
                                propValues.push(valueSpecificProp);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
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
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (propNames_1_1 && !propNames_1_1.done && (_e = propNames_1.return)) _e.call(propNames_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return properties;
        var e_2, _a, e_4, _e, e_3, _d;
    }
    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns a [[ReadResourcesSequence]].
     */
    function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD) {
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
        var e_5, _a;
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
                        for (var _a = __values(resourceJSONLD[prop]), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var referredRes = _b.value;
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
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_6) throw e_6.error; }
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (propNames_2_1 && !propNames_2_1.done && (_d = propNames_2.return)) _d.call(propNames_2);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return referredResourceClasses;
        var e_7, _d, e_6, _c;
    }
    /**
     * Gets the resource types (classes) from a JSON-LD representing a sequence of resources.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns {Array<String>} the resource class Iris (without duplicates).
     */
    function getResourceClassesFromJsonLD(resourcesResponseJSONLD) {
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
        var e_8, _a;
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
})(ConvertJSONLD || (ConvertJSONLD = {}));

var IncomingService = /** @class */ (function (_super) {
    __extends(IncomingService, _super);
    function IncomingService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * Returns all incoming regions for a particular resource.
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
     * @param resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    IncomingService.prototype.getStillImageRepresentationsForCompoundResource = function (resourceIri, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?page knora-api:isMainResource true .\n\n?page knora-api:seqnum ?seqnum .\n\n?page knora-api:hasStillImageFile ?file .\n} WHERE {\n\n?page a knora-api:StillImageRepresentation .\n?page a knora-api:Resource .\n\n?page knora-api:isPartOf <" + resourceIri + "> .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?page knora-api:seqnum ?seqnum .\nknora-api:seqnum knora-api:objectType xsd:integer .\n\n?seqnum a xsd:integer .\n\n?page knora-api:hasStillImageFile ?file .\nknora-api:hasStillImageFile knora-api:objectType knora-api:File .\n\n?file a knora-api:File .\n\n} ORDER BY ?seqnum\nOFFSET " + offset + "\n";
        return this.doExtendedSearch(sparqlQueryStr);
    };
    /**
     *
     * Returns all incoming links for the given resource Iri
     * but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
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
 * Represents teh parameters of an extended search.
 */
var ExtendedSearchParams = /** @class */ (function () {
    /**
     *
     * @param generateGravsearch a function the generates KnarQL.
     *                       The function is expected to take the offset
     *                       as a parameter and return a KnarQL query string.
     */
    function ExtendedSearchParams(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
    return ExtendedSearchParams;
}());
var SearchParamsService = /** @class */ (function () {
    function SearchParamsService() {
        // init with a dummy function
        this.searchParamsMessage = new BehaviorSubject(new ExtendedSearchParams(function (offset) { return ''; }));
        this.currentSearchParams = this.searchParamsMessage.asObservable();
    }
    /**
     * Update the parameters of an extended seacrh.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
        this.searchParamsMessage.next(searchParams);
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
 * Represents an error that occurred when generating KnarQL.
 */
var GravsearchGenerationError = /** @class */ (function (_super) {
    __extends(GravsearchGenerationError, _super);
    function GravsearchGenerationError(msg) {
        return _super.call(this, msg) || this;
    }
    return GravsearchGenerationError;
}(Error));
var GravsearchGenerationService = /** @class */ (function () {
    function GravsearchGenerationService(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns {string} the corresponding Iri of the simple type (knora-api simple).
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
       * @param {string} mainResourceClassOption the class of the main resource, if specified.
       * @param offset the offset to be used (nth page of results).
       * @returns {string} a KnarQL query string.
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
       * resets the content of the triplestore
       *
       * @param rdfDataObjects
       * @returns {Observable<string>}
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
       * Get all resource types defined by the vocabulary
       * @param iri (Vocabulary iri)
       * @returns {Observable<any>}
       */
    ResourceTypesService.prototype.getResourceTypesByVoc = function (iri) {
        return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
    };
    /**
     * Get a specific resource type
     * @param iri   (resource type iri)
     * @returns {Observable<any>}
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vdXNlcnMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2NvbnZlcnQtanNvbmxkLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvaW5jb21pbmcuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9pbmRleC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9rbm9yYS1jb3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogS25vcmEtdWkgY29yZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIHNlcnZlciBkZWZpbml0aW9ucyBvZjpcbiAqICAtIGFwaTogVVJMIG9mIGRhdGEgc2VydmljZSBlLmcuIGtub3JhOiBodHRwOi8vbG9jYWxob3N0OjMzMzNcbiAqICAtIG1lZGlhOiBVUkwgb2YgbWVkaWEgc2VydmVyIHNlcnZpY2UgZS5nLiBzaXBpOiBodHRwOi8vbG9jYWxob3N0OjEwMjRcbiAqICAtIGFwcDogVVJMIG9mIHRoZSBhcHAgZS5nLiBzYWxzYWg6IGh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFxuICovXG5ASnNvbk9iamVjdCgnS3VpQ29yZUNvbmZpZycpXG5leHBvcnQgY2xhc3MgS3VpQ29yZUNvbmZpZyB7XG5cbiAgICAvKipcbiAgICAgKiAoU2Fsc2FoKSBuYW1lIG9mIHRoZSBhcHBcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChrbm9yYSkgdXJsIG9mIHRoZSBhcGlcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwaScsIFN0cmluZylcbiAgICBwdWJsaWMgYXBpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAoc2lwaSkgdXJsIG9mIG1lZGlhL2ZpbGUgc2VydmVyXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdtZWRpYScsIFN0cmluZylcbiAgICBwdWJsaWMgbWVkaWE6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChzYWxzYWgpIHVybCBvZiB0aGUgYXBwXG4gICAgICogQHR5cGUge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcHAnLCBTdHJpbmcpXG4gICAgcHVibGljIGFwcDogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiXG5pbXBvcnQgeyBKc29uQ29udmVydCwgT3BlcmF0aW9uTW9kZSwgVmFsdWVDaGVja2luZ01vZGUgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFJlc3VsdCBjbGFzcyB1c2VkIGFzIEFQSSB1cmwgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZVJlc3VsdCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBqc29uQ29udmVydDogSnNvbkNvbnZlcnQgPSBuZXcgSnNvbkNvbnZlcnQoT3BlcmF0aW9uTW9kZS5FTkFCTEUsIFZhbHVlQ2hlY2tpbmdNb2RlLkFMTE9XX05VTEwpO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgYXMgSlNPTlxuICAgICAqL1xuICAgIGJvZHk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc3VsdCBib2R5IGFzIGluc3RhbmNlIG9mIGNsYXNzT2JqZWN0LlxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICogQHRocm93c1xuICAgICAqL1xuXG4gICAgZ2V0Qm9keShjbGFzc09iamVjdD86IHsgbmV3KCk6IGFueSB9KTogYW55IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ib2R5KTtcbiAgICAgICAgcmV0dXJuIEFwaVNlcnZpY2VSZXN1bHQuanNvbkNvbnZlcnQuZGVzZXJpYWxpemUodGhpcy5ib2R5LCBjbGFzc09iamVjdCk7XG4gICAgfVxuXG5cbn1cbiIsIlxuLyoqXG4gKiBFcnJvciBjbGFzcyB1c2VkIGFzIEFQSSByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlRXJyb3Ige1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIG51bWJlclxuICAgICAqL1xuICAgIHN0YXR1cyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgdGV4dFxuICAgICAqL1xuICAgIHN0YXR1c1RleHQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFQSSB1cmxcbiAgICAgKi9cbiAgICB1cmwgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgZXJyb3IgaW5mb1xuICAgICAqL1xuICAgIGVycm9ySW5mbyA9ICcnO1xuXG59XG4iLCJleHBvcnQgY2xhc3MgS25vcmFDb25zdGFudHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaSc7XG4gICAgcHVibGljIHN0YXRpYyBQYXRoU2VwYXJhdG9yID0gJyMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYU9udG9sb2d5UGF0aDogc3RyaW5nID0gJ2h0dHA6Ly93d3cua25vcmEub3JnL29udG9sb2d5JztcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQmFzZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFPbnRvbG9neVBhdGggKyAnL2tub3JhLWJhc2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1Qcm9qZWN0SVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbVByb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtQWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1BZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0QWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0QWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdE1lbWJlckdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RNZW1iZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyU2ltcGxlUGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPbnRvbG9neSA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT3JkZXIgPSBLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSArICcjZ3VpT3JkZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTdGFuZG9mZk9udG9sb2d5ID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3N0YW5kb2ZmL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBCb29sZWFuVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0Jvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBVcmlWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQ29sb3JWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9tVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3RWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpbmtWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb25hbWVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbmFtZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEF1ZGlvRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdBdWRpb0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBERERGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0REREZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEb2N1bWVudEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRG9jdW1lbnRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBNb3ZpbmdJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTW92aW5nSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJc1Jlc291cmNlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzUmVzb3VyY2VDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbHVlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzVmFsdWVDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBGb3JiaWRkZW5SZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRm9yYmlkZGVuUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgWE1MVG9TdGFuZG9mZk1hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1hNTFRvU3RhbmRvZmZNYXBwaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0Tm9kZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE9iamVjdFR5cGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdvYmplY3RUeXBlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlSWNvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAncmVzb3VyY2VJY29uJztcbiAgICBwdWJsaWMgc3RhdGljIGlzRWRpdGFibGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzRWRpdGFibGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1ZhbHVlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1ZhbHVlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2VvbWV0cnkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNHZW9tZXRyeSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU5hbWUgPSAnaHR0cDovL3NjaGVtYS5vcmcvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOdW1iZXJPZkl0ZW1zID0gJ2h0dHA6Ly9zY2hlbWEub3JnL251bWJlck9mSXRlbXMnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hSXRlbUxpc3RFbGVtZW50ID0gJ2h0dHA6Ly9zY2hlbWEub3JnL2l0ZW1MaXN0RWxlbWVudCc7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgUmRmUHJvcGVydHk6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0xhYmVsID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNsYWJlbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzQ29tbWVudCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjY29tbWVudCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU3ViY2xhc3NPZiA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjc3ViQ2xhc3NPZic7XG4gICAgcHVibGljIHN0YXRpYyBzdWJQcm9wZXJ0eU9mOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI3N1YlByb3BlcnR5T2YnO1xuXG4gICAgcHVibGljIHN0YXRpYyBvd2w6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE93bENsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0NsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9iamVjdFByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI09iamVjdFByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bERhdGF0eXBlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjRGF0YXR5cGVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xBbm5vdGF0aW9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQW5ub3RhdGlvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE9uUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNYXhDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtYXhDYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xNaW5DYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNtaW5DYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xDYXJkaW5hbGl0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNjYXJkaW5hbGl0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xSZXN0cmljdGlvbiA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjUmVzdHJpY3Rpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjcmVhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdE1vZGlmaWNhdGlvbkRhdGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsYXN0TW9kaWZpY2F0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNQZXJtaXNzaW9ucyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1Blcm1pc3Npb25zJztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Qcm9qZWN0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1Byb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1VzZXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvVXNlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lvbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1JlZ2lvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1N0cmluZzogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERhdGVWYWx1ZTogc3RyaW5nID0gJ1JlYWREYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpbmtWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVnZXJWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlZ2VyVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERlY2ltYWxWYWx1ZTogc3RyaW5nID0gJ1JlYWREZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRHZW9tVmFsdWU6IHN0cmluZyA9ICdSZWFkR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRDb2xvclZhbHVlOiBzdHJpbmcgPSAnUmVhZENvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFVyaVZhbHVlOiBzdHJpbmcgPSAnUmVhZFVyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRCb29sZWFuVmFsdWU6IHN0cmluZyA9ICdSZWFkQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpc3RWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaXN0VmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd2YWx1ZUFzU3RyaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUhhc01hcHBpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVIYXNNYXBwaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0WWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0TW9udGggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZE1vbnRoID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kTW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmREYXkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzQ2FsZW5kYXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNDYWxlbmRhcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldCc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2UgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlSXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlSXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldElyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldElyaSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVnZXJWYWx1ZUFzSW50ZWdlciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludFZhbHVlQXNJbnQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWNpbWFsVmFsdWVBc0RlY2ltYWwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkZWNpbWFsVmFsdWVBc0RlY2ltYWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVBc1VybCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUFzVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUlzUHJldmlldyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUlzUHJldmlldyc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVIYXNGaWxlbmFtZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUhhc0ZpbGVuYW1lJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVknO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JWYWx1ZUFzQ29sb3IgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjb2xvclZhbHVlQXNDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2dlb21ldHJ5VmFsdWVBc0dlb21ldHJ5JztcbiAgICBwdWJsaWMgc3RhdGljIHVyaVZhbHVlQXNVcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd1cmlWYWx1ZUFzVXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGJvb2xlYW5WYWx1ZUFzQm9vbGVhbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2Jvb2xlYW5WYWx1ZUFzQm9vbGVhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNTdGFydCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNTdGFydCc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzRW5kID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc0VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFhzZCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnO1xuXG4gICAgcHVibGljIHN0YXRpYyB4c2RTdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnc3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEJvb2xlYW4gPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYm9vbGVhbic7XG4gICAgcHVibGljIHN0YXRpYyB4c2RJbnRlZ2VyID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2ludGVnZXInO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkRGVjaW1hbCA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdkZWNpbWFsJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZFVyaSA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdhbnlVUkknO1xuXG4gICAgcHVibGljIHN0YXRpYyByZXNvdXJjZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdEYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnSW50ZXJ2YWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb20nO1xuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdDb2xvcic7XG4gICAgcHVibGljIHN0YXRpYyBnZW9uYW1lU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRmlsZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoRnVuY3Rpb24gPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdtYXRjaCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc9JztcbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICchPSc7XG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgbm90IGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPic7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc+PSc7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBncmVhdGVyIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3IgPSAnPCc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25MYWJlbCA9ICdpcyBsZXNzIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvciA9ICc8PSc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxlc3MgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uT3BlcmF0b3IgPSAnRSc7XG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uTGFiZWwgPSAnZXhpc3RzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25PcGVyYXRvciA9ICdyZWdleCc7XG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxpa2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25PcGVyYXRvciA9ICdjb250YWlucyc7XG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25MYWJlbCA9ICdtYXRjaGVzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoTGluayA9ICdzYWxzYWgtbGluayc7IC8vIGNsYXNzIG9uIGFuIEhUTUwgPGE+IGVsZW1lbnQgdGhhdCBpbmRpY2F0ZXMgYSBsaW5rIHRvIGEgS25vcmEgcmVzb3VyY2VcbiAgICBwdWJsaWMgc3RhdGljIFJlZk1hcmtlciA9ICdyZWYtbWFya2VyJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCBlbGVtZW50IHRoYXQgcmVmZXJzIHRvIGFub3RoZXIgZWxlbWVudCBpbiB0aGUgc2FtZSBkb2N1bWVudFxuXG4gICAgcHVibGljIHN0YXRpYyBHTkRQcmVmaXggPSAnKERFLTU4OCknO1xuICAgIHB1YmxpYyBzdGF0aWMgR05EUmVzb2x2ZXIgPSAnaHR0cDovL2QtbmIuaW5mby9nbmQvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgVklBRlByZWZpeCA9ICcoVklBRiknO1xuICAgIHB1YmxpYyBzdGF0aWMgVklBRlJlc29sdmVyID0gJ2h0dHBzOi8vdmlhZi5vcmcvdmlhZi8nO1xuXG59XG5cblxuZXhwb3J0IGVudW0gS25vcmFTY2hlbWEge1xuICAgIGNvbXBsZXggPSAwLFxuICAgIHNpbXBsZSA9IDFcbn1cbiIsIi8qKlxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgdXRpbGl0eSBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7S25vcmFDb25zdGFudHN9IGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgRW1haWxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4RW1haWwgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVUkxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXJsID0gL14oaHR0cDpcXC9cXC93d3dcXC58aHR0cHM6XFwvXFwvd3d3XFwufGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcLyk/W2EtejAtOV0rKFtcXC1cXC5dezF9W2EtejAtOV0rKSpcXC5bYS16XXsyLDZ9KDpbMC05XXsxLDV9KT8oXFwvLiopPyQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgUGFzc3dvcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhQYXNzd29yZCA9IC9eKD89LipcXGQpKD89LipbYS16QS1aXSkuezgsfSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgSGV4YWRlY2ltYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhIZXggPSAvXlswLTlBLUZhLWZdKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBzaG9ydG5hbWUgaW4gcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFNob3J0bmFtZSA9IC9eW2EtekEtWl0rXFxTKiQvO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYW1iZGEgZnVuY3Rpb24gZWxpbWluYXRpbmcgZHVwbGljYXRlcyBpbiBhIGNvbGxlY3Rpb24gdG8gYmUgcGFzc2VkIHRvIFtbZmlsdGVyXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbSBlbGVtZW50IG9mIGFuIEFycmF5IHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGxvb2tlZCBhdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggY3VycmVudCBlbGVtZW50cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gc2VsZiByZWZlcmVuY2UgdG8gdGhlIHdob2xlIEFycmF5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzYW1lIGVsZW1lbnQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBpbiB0aGUgQXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJPdXREdXBsaWNhdGVzID0gKGVsZW0sIGluZGV4OiBudW1iZXIsIHNlbGYpID0+IHtcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc0Nzc5OC9kZWxldGUtZHVwbGljYXRlLWVsZW1lbnRzLWZyb20tYW4tYXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyP3Y9ZXhhbXBsZVxuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCdzIGluZGV4IGVxdWFscyB0aGUgaW5kZXggb2YgdGhlIGxlZnRtb3N0IGVsZW1lbnRcbiAgICAgICAgLy8gLT4gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIG5vIGlkZW50aWNhbCBlbGVtZW50IGJlZm9yZSB0aGlzIGluZGV4LCBoZW5jZSBpdCBpcyBub3QgYSBkdXBsaWNhdGVcbiAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBlbGVtZW50cywgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgS25vcmEgZW50aXR5IElSSSwgZ2V0cyB0aGUgb250b2xvZ3kgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eUlyaSBhbiBlbnRpdHkgSXJpLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIG9udG9sb2d5IElSSVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKGVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgY2xhc3MgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGVudGl0eUlyaS5zcGxpdChLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb21wbGV4IGtub3JhLWFwaSBlbnRpdHkgSXJpIHRvIGEga25vcmEtYXBpIHNpbXBsZSBlbnRpdHkgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhFbnRpdHlJcmlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKGNvbXBsZXhFbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGVudGl0eSBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gY29tcGxleEVudGl0eUlyaS5zcGxpdCgndjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7Y29tcGxleEVudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICAvLyBhZGQgJ3NpbXBsZScgdG8gYmFzZSBwYXRoXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXSArICdzaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvciArIHNlZ21lbnRzWzFdO1xuXG4gICAgfVxuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdTdHJpbmdMaXRlcmFsJylcbmV4cG9ydCBjbGFzcyBTdHJpbmdMaXRlcmFsIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3ZhbHVlJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmd1YWdlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJyc7XG59XG4iLCIvKipcbiAqIFByZWNpc2lvbiBmb3IgRGF0ZVNhbHNhaC5cbiAqL1xuZXhwb3J0IGVudW0gUHJlY2lzaW9uIHtcbiAgICB5ZWFyUHJlY2lzaW9uLFxuICAgIG1vbnRoUHJlY2lzaW9uLFxuICAgIGRheVByZWNpc2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBTYWxzYWggZGF0ZSBvYmplY3Qgd2l0aCBhIHByZWNpc2lvbiBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVTYWxzYWgge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcmVhZG9ubHkgcHJlY2lzaW9uOiBQcmVjaXNpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgbW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRheT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB5ZWFyIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBtb250aCBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF5IHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHdpdGhvdXQgdGhlIGNhbGVuZGFyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKSB7XG5cbiAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSAnKCcgKyB0aGlzLmVyYSArICcpICc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByZWNpc2lvbikge1xuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGggKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMuZGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgKHdpdGggY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhciArICc6JyArIHRoaXMuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBlcmlvZCAod2l0aCBzdGFydCBkYXRlIGFuZCBlbmQgZGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VTYWxzYWgge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0OiBEYXRlU2Fsc2FoLFxuICAgICAgICByZWFkb25seSBlbmQ6IERhdGVTYWxzYWhcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHJhbmdlICh3aXRoIHByZWNlZGluZyBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQuZ2V0RGF0ZUFzU3RyaW5nKCkgKyAnOicgKyB0aGlzLmVuZC5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnQXV0aGVudGljYXRpb25SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZylcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0JylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBzaG9ydG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0Y29kZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2hvcnRjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb25nbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9uZ25hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogU3RyaW5nTGl0ZXJhbFtdID0gW25ldyBTdHJpbmdMaXRlcmFsKCldO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna2V5d29yZHMnLCBbU3RyaW5nXSwgdHJ1ZSlcbiAgICBwdWJsaWMga2V5d29yZHM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9nbycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaW5zdGl0dXRpb24nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGluc3RpdHV0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9naWVzJywgW1N0cmluZ10pXG4gICAgcHVibGljIG9udG9sb2dpZXM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ0dyb3VwJylcbmV4cG9ydCBjbGFzcyBHcm91cCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgU3RyaW5nKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwJywgR3JvdXApXG4gICAgcHVibGljIGdyb3VwOiBHcm91cCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWwnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIHRydWUpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGV2ZWwnLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIGxldmVsOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwb3NpdGlvbicsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcbmltcG9ydCB7IExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LW5vZGUnO1xuXG5ASnNvbk9iamVjdCgnTGlzdCcpXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCBmYWxzZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdEluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpc1Jvb3ROb2RlJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgaXNSb290Tm9kZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdub2RlaW5mbycsIExpc3ROb2RlSW5mbywgZmFsc2UpXG4gICAgcHVibGljIG5vZGVpbmZvOiBMaXN0Tm9kZUluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuXG5ASnNvbk9iamVjdCgnTGlzdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdCcsIExpc3QsIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0OiBMaXN0ID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdHMnLCBbTGlzdE5vZGVJbmZvXSwgZmFsc2UpXG4gICAgcHVibGljIGxpc3RzOiBMaXN0Tm9kZUluZm9bXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnT250b2xvZ3lJbmZvU2hvcnQnKVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb1Nob3J0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SXJpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1Blcm1pc3Npb25EYXRhJylcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGF0YSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBncm91cHNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL2dyb3Vwcy9ncm91cCc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGF0YSB9IGZyb20gJy4uL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdVc2VyJylcbmV4cG9ydCBjbGFzcyBVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZW1haWwnLCBTdHJpbmcpXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwYXNzd29yZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ2l2ZW5OYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBnaXZlbk5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2ZhbWlseU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGZhbWlseU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwcycsIFtHcm91cF0pXG4gICAgcHVibGljIGdyb3VwczogR3JvdXBbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2Vzc2lvbklkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzZXNzaW9uSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Blcm1pc3Npb25zJywgUGVybWlzc2lvbkRhdGEpXG4gICAgcHVibGljIHBlcm1pc3Npb25zOiBQZXJtaXNzaW9uRGF0YSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c3RlbUFkbWluJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgc3lzdGVtQWRtaW4/OiBib29sZWFuID0gZmFsc2U7XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy91c2VyJztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RNZW1iZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RNZW1iZXJzUmVzcG9uc2Uge1xuICAgIEBKc29uUHJvcGVydHkoJ21lbWJlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIG1lbWJlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0XG5leHBvcnQgY2xhc3MgQ3VycmVudFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnand0JywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBqd3Q6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c0FkbWluJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3lzQWRtaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIHVzZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlclJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXInLCBVc2VyKVxuICAgIHB1YmxpYyB1c2VyOiBVc2VyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcblxuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVSYW5nZVNhbHNhaCwgRGF0ZVNhbHNhaCB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGFueSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgSXJpLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgdHlwZS5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHZhbHVlIG9iamVjdC5cbiAgICAgKi9cbiAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhcyBhIHN0cmluZyAoY29tcGxleGl0eSBvZiB0aGUgdmFsdWUgcG9zc2libHkgcmVkdWNlZCkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggb3Igd2l0aG91dCBtYXJrdXAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWFkVGV4dFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRob3V0IG1hcmt1cCAobWVyZSBjaGFyYWN0ZXIgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1N0cmluZyBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgcmVzb3VyY2VzIHJlZmVycmVkIHRvIGJ5IHN0YW5kb2ZmIGxpbmtzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZWFkUmVzb3VyY2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIHRoYXQgaGFzIGJlZW4gdHVybmVkIGludG8gSFRNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc0h0bWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGh0bWw6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmspIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IGEgcmVzb3VyY2UgcmVmZXJyZWQgdG8gYnkgYSBzdGFuZG9mZiBsaW5rIGZyb20gYSB0ZXh0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIG9udG9sb2d5IGluZm9ybWF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSdzIGNsYXNzIGFuZCBpdHMgbGFiZWwuXG4gICAgICovXG5cblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKHJlc291cmNlSXJpOiBzdHJpbmcsIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbm8gaW5mb3JtYXRpb24gZm91bmQgYWJvdXQgcmVmZXJyZWQgcmVzb3VyY2UgKHRhcmdldCBvZiBzdGFuZG9mZiBsaW5rKSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCBhcyBYTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNYbWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHhtbDogc3RyaW5nLCByZWFkb25seSBtYXBwaW5nSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1htbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54bWw7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGF0ZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGF0ZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZW5kRXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0TW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydERheT86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kRGF5PzogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgZ2V0RGF0ZVNhbHNhaCgpOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB0aGlzLmVuZFllYXIgJiYgdGhpcy5zdGFydE1vbnRoID09PSB0aGlzLmVuZE1vbnRoICYmIHRoaXMuc3RhcnREYXkgPT09IHRoaXMuZW5kRGF5ICYmIHRoaXMuc3RhcnRFcmEgPT09IHRoaXMuZW5kRXJhKSB7XG4gICAgICAgICAgICAvLyBwcmVjaXNlIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRhdGUgcGVyaW9kXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVSYW5nZVNhbHNhaChuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KSwgbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5lbmRFcmEsIHRoaXMuZW5kWWVhciwgdGhpcy5lbmRNb250aCwgdGhpcy5lbmREYXkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVTYWxzYWgoKS5nZXREYXRlQXNTdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmsgdmFsdWUgb2JqZWN0IChyZWlmaWNhdGlvbikuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlua1ZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2U/OiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVnZXIgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVnZXJWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaW50ZWdlcjogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlci50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkZWNpbWFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREZWNpbWFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGRlY2ltYWw6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGltYWdlRmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIpIHtcblxuICAgICAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgYSBqcGVnLCBpdCBpcyBhIHByZXZpZXcgaW1hZ2VcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSBpbWFnZUZpbGVuYW1lLmVuZHNXaXRoKCcuanBnJyk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIG1ha2VJSUlGVXJsKHJlZHVjZUZhY3RvcjogbnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5mbG9vcigxMDAgLyByZWR1Y2VGYWN0b3IpO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gKHBlcmNlbnRhZ2UgPiAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwKSA/IHBlcmNlbnRhZ2UgOiA1MDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIHRoaXMuaW1hZ2VGaWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCByZXByZXNlbnRhdGlvbiB2YWx1ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0RmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB0ZXh0RmlsZW5hbWU6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVVUkw6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0RmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRGaWxlVVJMO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xvciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQ29sb3JWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY29sb3JIZXg6IHN0cmluZykge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQ29sb3JWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvckhleDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBvaW50IGluIGEgMkQtY29vcmRpbmF0ZSBzeXN0ZW0gKGZvciBnZW9tZXRyeSB2YWx1ZXMpLlxuICovXG5leHBvcnQgY2xhc3MgUG9pbnQyRCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgcGFyc2VkIGZyb20gSlNPTi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lvbkdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lQ29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludDJEW10sXG4gICAgICAgIHB1YmxpYyB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByYWRpdXM/OiBQb2ludDJEXG4gICAgKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkR2VvbVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGdlb21ldHJ5U3RyaW5nOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBnZW9tZXRyeUpTT04gPSBKU09OLnBhcnNlKGdlb21ldHJ5U3RyaW5nKTtcblxuICAgICAgICBjb25zdCBwb2ludHM6IFBvaW50MkRbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGdlb21ldHJ5SlNPTi5wb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludDJEKHBvaW50LngsIHBvaW50LnkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYWRpdXM7XG4gICAgICAgIGlmIChnZW9tZXRyeUpTT04ucmFkaXVzKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBuZXcgUG9pbnQyRChnZW9tZXRyeUpTT04ucmFkaXVzLngsIGdlb21ldHJ5SlNPTi5yYWRpdXMueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFJlZ2lvbkdlb21ldHJ5KFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnN0YXR1cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lQ29sb3IsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZVdpZHRoLFxuICAgICAgICAgICAgcG9pbnRzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnR5cGUsXG4gICAgICAgICAgICByYWRpdXNcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeTtcblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRHZW9tVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlTdHJpbmc7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBVUkkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFVyaVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHVyaTogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVXJpVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRVcmlWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIEJvb2xlYW4gdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEJvb2xlYW5WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBib29sOiBib29sZWFuKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2wudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlcnZhbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVydmFsU3RhcnQ6IG51bWJlciwgcmVhZG9ubHkgaW50ZXJ2YWxFbmQ6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlcnZhbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVydmFsU3RhcnQudG9TdHJpbmcoKSArICctJyArIHRoaXMuaW50ZXJ2YWxFbmQ7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlzdFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlTGFiZWw6IHN0cmluZywgKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlzdFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlzdFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlTGFiZWw7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkUHJvcGVydGllcyB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gfSBmcm9tICcuLi9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS1yZXByZXNlbnRhdGlvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgcmVzb3VyY2UncyBJcmkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHJlc291cmNlJ3MgdHlwZSAoY2xhc3MpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCB0aGUgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdSZWdpb25zIHJlZ2lvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ0xpbmtzIHJlc291cmNlcyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXX0gc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSAgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHRvIGJlIGRpc3BsYXllZCBmb3IgdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7UmVhZFByb3BlcnRpZXN9IHByb3BlcnRpZXMgdGhlIHJlc291cmNlcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGluY29taW5nUmVnaW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nTGlua3M6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5OiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHByb3BlcnRpZXM/OiBSZWFkUHJvcGVydGllcykge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi9yZWFkLXJlc291cmNlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSByZXNvdXJjZXMgZ2l2ZW4gc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlJlc291cmNlcyBudW1iZXIgb2YgZ2l2ZW4gcmVzb3VyY2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4sIHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBJbWFnZVJlZ2lvbiB9IGZyb20gJy4vaW1hZ2UtcmVnaW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGltYWdlIGluY2x1ZGluZyBpdHMgcmVnaW9ucy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZX0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHtJbWFnZVJlZ2lvbltdfSByZWdpb25zIHRoZSByZWdpb25zIGJlbG9uZ2luZyB0byB0aGUgaW1hZ2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIHJlYWRvbmx5IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10pIHtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZEdlb21WYWx1ZSwgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVnaW9uLlxuICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHJlc291cmNlIHJlcHJlc2VudGluZyB0aGUgcmVnaW9uIGFuZCBpdHMgZ2VvbWV0cmllcy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgSW1hZ2VSZWdpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZX0gcmVnaW9uUmVzb3VyY2UgYSByZXNvdXJjZSBvZiB0eXBlIFJlZ2lvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHJlZ2lvblJlc291cmNlOiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VvbWV0cnkgaW5mb3JtYXRpb24gYmVsb25naW5nIHRvIHRoaXMgcmVnaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1JlYWRHZW9tVmFsdWVbXX1cbiAgICAgKi9cbiAgICBnZXRHZW9tZXRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25SZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc0dlb21ldHJ5XSBhcyBSZWFkR2VvbVZhbHVlW107XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4vZGVjbGFyYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBLdWlDb3JlQ29uZmlnfVxuICAgIF1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIEt1aUNvcmVNb2R1bGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtLdWlDb3JlQ29uZmlnfSBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlV2l0aFByb3ZpZGVyc31cbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEt1aUNvcmVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBhcHAgZW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBoZXJlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogS3VpQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvcic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQsIEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi9kZWNsYXJhdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogIGlmIGlzIGxvYWRpbmcsIHNldCBpdCB0cnVlO1xuICAgICAqICBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgICogIGZvciBwcm9ncmVzcyBsb2FkZXIgZWxlbWVudFxuICAgICAqL1xuICAgIGxvYWRpbmcgPSBmYWxzZTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdFVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGh0dHBHZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgeyBvYnNlcnZlOiAncmVzcG9uc2UnLCBwYXJhbXM6IHBhcmFtcyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBPU1RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIGJvZHlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGh0dHBQb3N0KHBhdGg6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCBib2R5LCB7IG9ic2VydmU6ICdyZXNwb25zZScgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIGJvZHlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGh0dHBQdXQocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogREVMRVRFXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cERlbGV0ZShwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCB7IG9ic2VydmU6ICdyZXNwb25zZScgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSByZXF1ZXN0IGVycm9yIGluIGNhc2Ugb2Ygc2VydmVyIGVycm9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0h0dHBFcnJvclJlc3BvbnNlfSBlcnJvclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgICAgIHNlcnZpY2VFcnJvci5lcnJvckluZm8gPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gZXJyb3IudXJsO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzZXJ2aWNlRXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSBqc29uIGVycm9yIGluIGNhc2Ugb2YgdHlwZSBlcnJvciBpbiBqc29uIHJlc3BvbnNlIChqc29uMnR5cGVzY3JpcHQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyb3JcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVKc29uRXJyb3IoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG5cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpU2VydmljZUVycm9yKSByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG5cbiAgICAgICAgY29uc3Qgc2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzID0gLTE7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gJ0ludmFsaWQgSlNPTic7XG4gICAgICAgIHNlcnZpY2VFcnJvci5lcnJvckluZm8gPSBlcnJvcjtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9ICcnO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzZXJ2aWNlRXJyb3IpO1xuXG4gICAgfVxuXG4gICAgLy8gdGhlIGZvbGxvd2luZyBtZXRob2QgaXMgcmVwbGFjZWQgYnkgdGhlIEp3dEludGVyY2VwdG9yXG4gICAgLypcbiAgICBwcm90ZWN0ZWQgc2V0SGVhZGVycygpOiBIdHRwSGVhZGVycyB7XG4gICAgICAgIGxldCBjdXJyZW50VXNlcjogQ3VycmVudFVzZXI7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgICAgICAvLyBnZXQga2V5IGZyb20gbG9jYWwgc3RvcmFnZVxuICAgICAgICBjb25zdCBrZXkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbl9pZCcpO1xuXG4gICAgICAgIGlmIChrZXkgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLl9hY3MuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VyID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FwaSBzZXJ2aWNlIC0tIHNldEhlYWRlcnMgLS0gY3VycmVudFVzZXIgZnJvbSBhY3MnLCBjdXJyZW50VXNlcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtjdXJyZW50VXNlci50b2tlbn1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAqL1xuICAgIC8qXG4gICAgLyEqKlxuICAgICAqIEFwcGVuZHMgdG8gZXhpc3Rpbmcgb3B0aW9ucyBpZiB0aGV5IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7SHR0cEhlYWRlcnN9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7SHR0cEhlYWRlcnN9XG4gICAgICohL1xuICAgIHByb3RlY3RlZCBhcHBlbmRUb09wdGlvbnMob3B0aW9uczogYW55KTogYW55IHtcblxuICAgICAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnM7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gdGhpcy5hcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmEpICcsIGhlYWRlcnMpO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzJiKSAnLCBvcHRpb25zKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaGF2ZSBvcHRpb25zXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNbJ2hlYWRlcnMnXSkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGhlYWRlcnMgc2V0XG4gICAgICAgICAgICAgICAgb3B0aW9uc1snaGVhZGVycyddID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzM6ICcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGhlYWRlcnMsIG5lZWQgdG8gYXBwZW5kIHRvIHRob3NlXG4gICAgICAgICAgICAgICAgb3B0aW9uc1snaGVhZGVycyddID0gdGhpcy5hcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKG9wdGlvbnNbJ2hlYWRlcnMnXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzQ6ICcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBoZWFkZXJzIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIZWFkZXJzfSBoZWFkZXJzXG4gICAgICogQHJldHVybnMge0hlYWRlcnN9XG4gICAgICohL1xuICAgIHByb3RlY3RlZCBhcHBlbmRBdXRob3JpemF0aW9uSGVhZGVyKGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IEh0dHBIZWFkZXJzIHtcblxuXG4gICAgICAgIGlmICghaGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnRva2VuO1xuXG4vLyAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuXG4gICAgICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW59YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG4qL1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgR3JvdXAsIEdyb3VwUmVzcG9uc2UsIEdyb3Vwc1Jlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9ncm91cHMnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxHcm91cFtdPn1cbiAgICAgKi9cbiAgICBnZXRBbGxHcm91cHMoKTogT2JzZXJ2YWJsZTxHcm91cFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3Vwc1Jlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxHcm91cD59XG4gICAgICovXG4gICAgZ2V0R3JvdXBCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8R3JvdXA+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3VwUmVzcG9uc2UpLmdyb3VwKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIExpc3QsXG4gICAgTGlzdENyZWF0ZVBheWxvYWQsXG4gICAgTGlzdEluZm8sXG4gICAgTGlzdEluZm9SZXNwb25zZSxcbiAgICBMaXN0SW5mb1VwZGF0ZVBheWxvYWQsXG4gICAgTGlzdE5vZGVJbmZvLFxuICAgIExpc3ROb2RlSW5mb1Jlc3BvbnNlLFxuICAgIExpc3RSZXNwb25zZSxcbiAgICBMaXN0c1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vbGlzdHMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmkgKG9wdGlvbmFsKVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPn1cbiAgICAgKi9cbiAgICBnZXRMaXN0cyhwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm9bXT4ge1xuICAgICAgICBpZiAocHJvamVjdElyaSkge1xuICAgICAgICAgICAgdGhpcy5wYXRoICs9ICc/cHJvamVjdElyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RzUmVzcG9uc2UpLmxpc3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3Q+fVxuICAgICAqL1xuICAgIGdldExpc3QobGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0SW5mbz59XG4gICAgICovXG4gICAgZ2V0TGlzdEluZm8obGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+fVxuICAgICAqL1xuICAgIGdldExpc3ROb2RlSW5mbyhub2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9ub2Rlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5vZGVJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0Tm9kZUluZm9SZXNwb25zZSkubm9kZWluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0Q3JlYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3Q+fVxuICAgICAqL1xuICAgIGNyZWF0ZUxpc3QocGF5bG9hZDogTGlzdENyZWF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdEluZm9VcGRhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdEluZm8+fVxuICAgICAqL1xuICAgIHVwZGF0ZUxpc3RJbmZvKHBheWxvYWQ6IExpc3RJbmZvVXBkYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLmxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBQcm9qZWN0LCBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlLCBQcm9qZWN0UmVzcG9uc2UsIFByb2plY3RzUmVzcG9uc2UsIFVzZXIgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgbGlzdCBvZiBhbGwgcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3RbXT59XG4gICAgICovXG4gICAgZ2V0QWxsUHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3Byb2plY3RzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0c1Jlc3BvbnNlKS5wcm9qZWN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBwcm9qZWN0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIHByb2plY3Qgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIHByb2plY3Qgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCByZXRyaWV2YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnNcbiAgICAgKiBwcm9qZWN0IGlkZW50aWZpZXIgaXMgcHJvamVjdCBpZCAoaXJpKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXJbXT59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzXG4gICAgICogcHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0bmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXJbXT59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzXG4gICAgICogcHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0Y29kZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXJbXT59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdE1lbWJlcnNCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvbWVtYmVycy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RNZW1iZXJzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCBtZW1iZXIgcmV0cmlldmFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdE1lbWJlcnModXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlKS5tZW1iZXJzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgbmV3IHByb2plY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgY3JlYXRlUHJvamVjdChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogZWRpdCBwcm9qZWN0IGRhdGFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2plY3QoaXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogYWN0aXZhdGUgcHJvamVjdCAoaWYgaXQgd2FzIGRlbGV0ZWQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgYWN0aXZhdGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAoc2V0IGluYWN0aXZlKSBwcm9qZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgZGVsZXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBVc2VyLFxuICAgIFVzZXJSZXNwb25zZSxcbiAgICBVc2Vyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgdXNlcnNVcmw6IHN0cmluZyA9IHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vdXNlcnMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBsaXN0IG9mIGFsbCB1c2Vyc1xuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRBbGxVc2VycygpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vdXNlcnMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJzUmVzcG9uc2UpLnVzZXJzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoZW1haWwpICsgJz9pZGVudGlmaWVyPWVtYWlsJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihwYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKHBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHVzZXIgcmV0cmlldmFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRVc2VyKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgY3JlYXRlVXNlcihkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgYWRkVXNlclRvU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG93biBwYXNzd29yZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICB1cGRhdGVPd25QYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiBvbGRQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgdXBkYXRlVXNlcnNQYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIHJlcXVlc3RlclBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgdXBkYXRlVXNlcih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBzZXRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh7IHZhcjogbGFuZyB9KTtcbiAgfVxuICBnZXRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTXNnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gIH1cblxuICAvKipcbiAgKiB0aGlzIG1ldGhvZCBnZXQgdGhlIHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBzdGF0dXNNc2cuanNvbiBmaWxlXG4gICogd2hpY2ggYXJlIGRlZmluZWQgaGVyZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2Rlc1xuICAqIGFuZCBoZXJlOiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcFxuICAqXG4gICovXG4gIGdldFN0YXR1c01zZygpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwcCArICcvYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nKVxuICAgICAgLnBpcGUobWFwKFxuICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgKTtcblxuICB9O1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFVzZXJzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmkgdGhlIElyaXMgb2YgdGhlIG5hbWVkIGdyYXBocyB3aG9zZSByZXNvdXJjZSBjbGFzc2VzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2FsbGVudGl0aWVzLycgKyBlbmNvZGVVUklDb21wb25lbnQob250b2xvZ3lJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3NlcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgSXJpcyBvZiB0aGUgcmVzb3VyY2UgY2xhc3NlcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKHJlc291cmNlQ2xhc3NJcmlzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc2VzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzVXJpRW5jID0gcmVzQ2xhc3NVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnICsgcmVzQ2xhc3NVcmlFbmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHByb3BlcnRpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBwcm9wZXJ0eSBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRQcm9wZXJ0aWVzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnRpZXNVcmlFbmMgPSAnJztcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNVcmlFbmMgPSBwcm9wZXJ0aWVzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJyArIHByb3BlcnRpZXNVcmlFbmMpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgS25vcmFDb25zdGFudHMsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IE9udG9sb2d5U2VydmljZSB9IGZyb20gJy4vb250b2xvZ3kuc2VydmljZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIG9jY3VycmVkIGluIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBvbnRvbG9neSdzIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lNZXRhZGF0YSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSBsYWJlbCBhIGxhYmVsIGRlc2NyaWJpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICogT2NjdXJyZW5jZSBvZiBhIHByb3BlcnR5IGZvciBhIHJlc291cmNlIGNsYXNzIChpdHMgY2FyZGluYWxpdHkpLlxuICovXG5leHBvcnQgZW51bSBDYXJkaW5hbGl0eU9jY3VycmVuY2Uge1xuICAgIG1pbkNhcmQgPSAwLFxuICAgIGNhcmQgPSAxLFxuICAgIG1heENhcmQgPSAyXG59XG5cblxuLyoqXG4gKiBDYXJkaW5hbGl0eSBvZiBhIHByb3BlcnR5IGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJkaW5hbGl0eSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvY2N1cnJlbmNlIHR5cGUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgbnVtZXJpY2FsIHZhbHVlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0aGUgZ2l2ZW4gb2NjdXJyZW5jZSBhcHBsaWVzIHRvLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9jY3VycmVuY2U6IENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWU6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IHN0cmluZykge1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gaWNvbiBwYXRoIHRvIGFuIGljb24gcmVwcmVzZW50aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gY29tbWVudCBjb21tZW50IG9uIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGNhcmRpbmFsaXRpZXMgdGhlIHJlc291cmNlIGNsYXNzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpY29uOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY2FyZGluYWxpdGllczogQXJyYXk8Q2FyZGluYWxpdHk+KSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIHRvIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc2VzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlc291cmNlQ2xhc3M7XG59XG5cblxuLyoqXG4gKiBBIHByb3BlcnR5IGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIG9iamVjdFR5cGUgdGhlIHByb3BlcnR5J3Mgb2JqZWN0IGNvbnN0cmFpbnQuXG4gICAgICogQHBhcmFtIGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gc3ViUHJvcGVydHlPZiBJcmlzIG9mIHByb3BlcnRpZXMgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgc3VicHJvcGVydHkgb2YuXG4gICAgICogQHBhcmFtIGlzRWRpdGFibGUgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGNhbiBiZSBlZGl0ZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgKiBAcGFyYW0gaXNMaW5rUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgbGlua2luZyBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0gaXNMaW5rVmFsdWVQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgcmVmZXJzIHRvIGEgbGluayB2YWx1ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBvYmplY3RUeXBlOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3ViUHJvcGVydHlPZjogQXJyYXk8c3RyaW5nPixcbiAgICAgICAgcmVhZG9ubHkgaXNFZGl0YWJsZTogQm9vbGVhbixcbiAgICAgICAgcmVhZG9ubHkgaXNMaW5rUHJvcGVydHk6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1ZhbHVlUHJvcGVydHk6IEJvb2xlYW4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHByb3BlcnR5IElyaXMgdG8gcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFByb3BlcnR5O1xufVxuXG5cbi8qKlxuICogR3JvdXBzIHJlc291cmNlIGNsYXNzZXMgYnkgdGhlIG9udG9sb2d5IHRoZXkgYXJlIGRlZmluZWQgaW4uXG4gKlxuICogQSBtYXAgb2Ygb250b2xvZ3kgSXJpcyB0byBhbiBhcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBjYWNoZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gKG9ubHkgdXNlZCBieSB0aGlzIHNlcnZpY2UgaW50ZXJuYWxseSkuXG4gKiBUaGlzIGNhY2hlIGlzIHVwZGF0ZWQgd2hlbmV2ZXIgbmV3IGRlZmluaXRpb25zIGFyZSByZXF1ZXN0ZWQgZnJvbSBLbm9yYS5cbiAqXG4gKiBSZXF1ZXN0ZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gYnkgYSBzZXJ2aWNlIGlzIHJlcHJlc2VudGVkIGJ5IFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlIHtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIG9udG9sb2dpZXM6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+O1xuXG4gICAgLyoqXG4gICAgICogQSBsaXN0IG9mIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIG5hbWVkIGdyYXBoLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k7XG5cbiAgICAvKipcbiAgICAgKiBSZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcztcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbnRvbG9naWVzID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9udG9sb2d5IGluZm9ybWF0aW9uIHJlcXVlc3RlZCBmcm9tIHRoaXMgc2VydmljZS5cbiAqXG4gKiBGb3IgZXZlcnkgcmVxdWVzdCwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBjb250YWluaW5nIHRoZSByZXF1ZXN0ZWQgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5IGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIGdpdmVuIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5LFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzLFxuICAgICAgICBwcml2YXRlIHByb3BlcnRpZXM6IFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUgZ2l2ZW4gW1tPbnRvbG9neUluZm9ybWF0aW9uXV0gaW50byB0aGUgY3VycmVudCBpbnN0YW5jZSxcbiAgICAgKiB1cGRhdGluZyB0aGUgZXhpc3RpbmcgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGEgc2VydmljZSBsaWtlIHRoZSBzZWFyY2ggZmV0Y2hlcyBuZXcgcmVzdWx0c1xuICAgICAqIHRoYXQgaGF2ZSB0byBiZSBhZGRlZCB0byBhbiBleGlzdGluZyBjb2xsZWN0aW9uLlxuICAgICAqIFRoZSBleGlzdGluZyBvbnRvbG9neSBpbmZvcm1hdGlvbiBtdXN0IG5vdCBiZSBsb3N0LlxuICAgICAqXG4gICAgICogQHBhcmFtcyBvbnRvbG9neUluZm8gdGhlIGdpdmVuIGRlZmluaXRpb25zIHRoYXQgaGF2ZSB0byBiZSBpbnRlZ3JhdGVkLlxuICAgICAqL1xuICAgIHVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzc0Zvck9udG9sb2d5IGluIG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldID0gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3NlcyA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcmVzb3VyY2VDbGFzc2VzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzIGluIG5ld1Jlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdID0gbmV3UmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UHJvcGVydGllcyA9IG9udG9sb2d5SW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UHJvcCBpbiBuZXdQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmV3UHJvcF0gPSBuZXdQcm9wZXJ0aWVzW25ld1Byb3BdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGdyb3VwZWQgYnkgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMoKTogUmVzb3VyY2VDbGFzc2VzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHJlc291cmNlIGNsYXNzZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8UmVzb3VyY2VDbGFzcz59XG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheSgpOiBBcnJheTxSZXNvdXJjZUNsYXNzPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NlczogQXJyYXk8UmVzb3VyY2VDbGFzcz4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzc0lyaSBpbiB0aGlzLnJlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3M6IFJlc291cmNlQ2xhc3MgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG4gICAgICAgICAgICByZXNDbGFzc2VzLnB1c2gocmVzQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc0NsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNDbGFzcyByZXNvdXJjZSBjbGFzcyB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgdGhlIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHJlc0NsYXNzOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChyZXNDbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NEZWYgIT09IHVuZGVmaW5lZCAmJiByZXNDbGFzc0RlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyB3aXRob3V0IGFyZ3VtZW50IHJlc0NsYXNzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKCk6IFByb3BlcnRpZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzQXNBcnJheSgpOiBBcnJheTxQcm9wZXJ0eT4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BJcmkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHRoZSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUHJvcGVydHkocHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChwcm9wRGVmICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclByb3BlcnR5IHdpdGhvdXQgYXJndW1lbnQgcHJvcGVydHknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICogT3RoZXIgY29tcG9uZW50cyBvciBzZXJ2aWNlcyBvYnRhaW4gb250b2xvZ3kgaW5mb3JtYXRpb24gdGhyb3VnaCB0aGlzIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lDYWNoZVNlcnZpY2Uge1xuXG4gICAgLy8gb250b2xvZ2llcyBpbmdvcmVkIGJ5IHRoaXMgc2VydmljZVxuICAgIHByaXZhdGUgZXhjbHVkZWRPbnRvbG9naWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5LCBLbm9yYUNvbnN0YW50cy5TdGFuZG9mZk9udG9sb2d5XTtcblxuICAgIC8vIHByb3BlcnRpZXMgdGhhdCBLbm9yYSBpcyBub3QgcmVzcG9uc2libGUgZm9yIGFuZFxuICAgIC8vIHRoYXQgaGF2ZSB0byBiZSBpZ25vcmVkIGJlY2F1c2UgdGhleSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXQgdGhlIG1vbWVudFxuICAgIHByaXZhdGUgZXhjbHVkZWRQcm9wZXJ0aWVzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF07XG5cbiAgICAvLyBjbGFzcyBkZWZpbml0aW9ucyB0aGF0IGFyZSBub3QgYmUgdHJlYXRlZCBhcyBLbm9yYSByZXNvdXJjZSBjbGFzc2VzXG4gICAgcHJpdmF0ZSBub25SZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuRm9yYmlkZGVuUmVzb3VyY2UsIEtub3JhQ29uc3RhbnRzLlhNTFRvU3RhbmRvZmZNYXBwaW5nLCBLbm9yYUNvbnN0YW50cy5MaXN0Tm9kZV07XG5cbiAgICAvLyBjZW50cmFsIGluc3RhbmNlIHRoYXQgY2FjaGVzIGFsbCBkZWZpbml0aW9uc1xuICAgIHByaXZhdGUgY2FjaGVPbnRvbG9neTogT250b2xvZ3lDYWNoZSA9IG5ldyBPbnRvbG9neUNhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vbnRvbG9neVNlcnZpY2U6IE9udG9sb2d5U2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcyBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbWV0YWRhdGEgZm9yIGFsbCBvbnRvbG9naWVzIGFzIEpTT04tTEQgKG5vIHByZWZpeGVzLCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyAocmVzb3VyY2UgY2xhc3NlcyBhbmQgcHJvcGVydGllcykgZm9yIHRoZSBnaXZlbiBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpIHRoZSBJcmkgb2YgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGFsbCB0aGUgb250b2xvZ2llcycgbWV0YWRhdGEgcmV0dXJuZWQgYnkgS25vcmEgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ2llcyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBhcyBKU09OLUxELlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShvbnRvbG9naWVzOiBvYmplY3RbXSkge1xuXG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzID0gb250b2xvZ2llcy5tYXAoXG4gICAgICAgICAgICBvbnRvbG9neSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neU1ldGFkYXRhKG9udG9sb2d5WydAaWQnXSwgb250b2xvZ3lbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgb250b2xvZ2llcycgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGUgYW5kIHJldHVybnMgdGhlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogYGtub3JhLWFwaTpSZXNvdXJjZWAgd2lsbCBiZSBleGNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc0RlZmluaXRpb25zIHRoZSBjbGFzcyBkZWZpbml0aW9ucyBpbiBhbiBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBAcmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIGdpdmVuIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzRGVmIG9mIGNsYXNzRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzSXJpID0gY2xhc3NEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyBjaGVjayB0aGF0IGNsYXNzIG5hbWUgaXMgbm90IGxpc3RlZCBhcyBhIG5vbiByZXNvdXJjZSBjbGFzcyBhbmQgdGhhdCB0aGUgaXNSZXNvdXJjZUNsYXNzIGZsYWcgaXMgcHJlc2VudCBhbmQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjbGFzc0lyaSAhPT0gS25vcmFDb25zdGFudHMuUmVzb3VyY2UgJiYgdGhpcy5ub25SZXNvdXJjZUNsYXNzZXMuaW5kZXhPZihjbGFzc0lyaSlcbiAgICAgICAgICAgICAgICA9PT0gLTEgJiYgKGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gIT09IHVuZGVmaW5lZCAmJiBjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIHZhbHVlIGNsYXNzLCBidXQgYSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMucHVzaChjbGFzc0lyaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc0lyaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9neVxuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEtub3JhIGF1dG9tYXRpY2FsbHkgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGluIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICogSWYgdGhleSBhcmUgZGVmaW5lZCBpbiBhbm90aGVyIG9udG9sb2d5LCB0aGF0IG9udG9sb2d5IGlzIHJlcXVlc3RlZCBmcm9tIEtub3JhIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbnRvbG9neSB0aGUgb250b2xvZ3kgdG8gYmUgY2FjaGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3k6IG9iamVjdCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGdyYXBoID0gb250b2xvZ3lbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGdldCBhbGwgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgY2xhc3NEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQ2xhc3M7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgYWxsIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bE9iamVjdFByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bERhdGF0eXBlUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQW5ub3RhdGlvblByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLlJkZlByb3BlcnR5O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBjYWNoZSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgb250b2xvZ3lcbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lbJ0BpZCddXSA9IHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZnMpO1xuXG4gICAgICAgIC8vIHdyaXRlIGNsYXNzIGFuZCBwcm9wZXJ0eSBkZWZpbnRpb25zIHRvIGNhY2hlXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKGNsYXNzRGVmcywgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaXMgdGhlIG9udG9sb2dpZXMgZm9yIHdoaWNoIGRlZmluaXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGFsbCByZXF1ZXN0ZWQgbmFtZWQgZ3JhcGhzXG4gICAgICAgIGxldCBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3Qgb250b2xvZ3lJcmkgb2Ygb250b2xvZ3lJcmlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2dpZXNGcm9tQ2FjaGU6IG9udG9sb2d5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtvbnRvbG9neUlyaX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3lcbiAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXTtcblxuICAgICAgICAgICAgLy8gYWRkIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIG9mIHRoaXMgb250b2xvZ3lcbiAgICAgICAgICAgIGFsbFJlc291cmNlQ2xhc3NJcmlzID0gYWxsUmVzb3VyY2VDbGFzc0lyaXMuY29uY2F0KHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIGFsbCByZXF1ZXN0ZWQgb250b2xvZ2llc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMoYWxsUmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3ksIHJlc0NsYXNzRGVmcy5nZXRSZXNvdXJjZUNsYXNzZXMoKSwgcmVzQ2xhc3NEZWZzLmdldFByb3BlcnRpZXMoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgb250b2xvZ3kgcmVzcG9uc2UgaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyB0aGUgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHBhcmFtIHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUocmVzb3VyY2VDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+LCBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzcyBvZiByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmkgPSByZXNDbGFzc1snQGlkJ107XG5cbiAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgYWxsIGNhcmRpbmFsaXRpZXMgb2YgdGhpcyByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdGllczogQ2FyZGluYWxpdHlbXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBzdWJjbGFzc09mQ29sbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgc2luZ2xlIG9iamVjdCBvciBhIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdKSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IFtyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCBjYXJkaW5hbGl0aWVzIGZvciB0aGUgcHJvcGVydGllcyBvZiBhIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjdXJDYXJkIG9mIHN1YmNsYXNzT2ZDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0IGlzIGEgY2FyZGluYWxpdHkgKGl0IGNvdWxkIGFsc28gYmUgYW4gSXJpIG9mIGEgc3VwZXJjbGFzcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmQgaW5zdGFuY2VvZiBPYmplY3QgJiYgY3VyQ2FyZFsnQHR5cGUnXSAhPT0gdW5kZWZpbmVkICYmIGN1ckNhcmRbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLk93bFJlc3RyaWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdDYXJkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb2NjdXJyZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5taW5DYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UuY2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1heENhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vIGtub3duIG9jY3VycmVuY2UgZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBjYXJkaW5hbGl0eSB0eXBlIGludmFsaWQgZm9yICR7cmVzQ2xhc3NbJ0BpZCddfSAke2N1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBndWkgb3JkZXJcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXMucHVzaChuZXdDYXJkKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzT2JqID0gbmV3IFJlc291cmNlQ2xhc3MoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmksXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmVzb3VyY2VJY29uXSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyB3cml0ZSB0aGlzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24gdG8gdGhlIGNhY2hlIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPSByZXNDbGFzc09iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3NlcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKiBUaGUgYW5zd2VyIGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBieSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyB7UmVzb3VyY2VDbGFzc2VzfSBhbiBbW09udG9sb2d5Q2FjaGVdXSByZXByZXNlbnRpbmcgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc0NsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcbiAgICAgICAgLy8gY29sbGVjdCB0aGUgZGVmaW5pdGlvbnMgZm9yIGVhY2ggcmVzb3VyY2UgY2xhc3MgZnJvbSB0aGUgY2FjaGVcblxuICAgICAgICBjb25zdCByZXNDbGFzc0RlZnMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCB0aGUgcHJvcGVydGllcyBmcm9tIHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIGNvbnN0IHByb3BlcnR5SXJpcyA9IFtdO1xuXG4gICAgICAgIHJlc0NsYXNzSXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmc1tyZXNDbGFzc0lyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldLmNhcmRpbmFsaXRpZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgcHJvcGVydHkgZGVmaW5pdGlvbiBmb3IgZWFjaCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlJcmlzLnB1c2goY2FyZC5wcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcHJvcERlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgcmVzQ2xhc3NEZWZzLCBwcm9wRGVmcy5nZXRQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIG9udG9sb2d5IGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXNcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmE6IEFycmF5PG9iamVjdD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGFuZCBjYWNoZSBlYWNoIGdpdmVuIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgZm9yIChjb25zdCBwcm9wRGVmIG9mIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcElyaSA9IHByb3BEZWZbJ0BpZCddO1xuXG4gICAgICAgICAgICBsZXQgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHN1YlByb3BlcnR5T2YgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdKSkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdLm1hcCgoc3VwZXJQcm9wOiBPYmplY3QpID0+IHN1cGVyUHJvcFsnQGlkJ10pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLnB1c2gocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXVsnQGlkJ10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXVsnQGlkJ107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlIHByb3BlcnR5IGRlZmluaXRpb25cbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID0gbmV3IFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZixcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlLFxuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUlyaXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbnRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gbmV3IFByb3BlcnRpZXMoKTtcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlOiBwcm9wZXJ0eSBub3QgZm91bmQgaW4gY2FjaGU6ICR7cHJvcElyaX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eURlZnNbcHJvcElyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgbmV3IFJlc291cmNlQ2xhc3NlcygpLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgaW4gY2FjaGUgeWV0LCBnZXQgbWV0YWRhdGEgZnJvbSBLbm9yYVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShtZXRhZGF0YVsnQGdyYXBoJ10uZmlsdGVyKChvbnRvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIGV4Y2x1ZGVkIG9udG9sb2dpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlZE9udG9sb2dpZXMuaW5kZXhPZihvbnRvWydAaWQnXSkgPT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmV0dXJuIG1ldGFkYXRhIGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSBLbm9yYSwgYWRkaW5nIHRoZW0gdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHJlcXVlc3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgICAgIC8vIGFycmF5IHRvIGJlIHBvcHVsYXRlZCB3aXRoIE9ic2VydmFibGVzXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gW107XG5cbiAgICAgICAgLy8gZG8gYSByZXF1ZXN0IGZvciBlYWNoIG9udG9sb2d5XG4gICAgICAgIG9udG9sb2d5SXJpcy5mb3JFYWNoKG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgIC8vIHB1c2ggYW4gT2JzZXJ2YWJsZSBvbnRvIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgICAgIG9ic2VydmFibGVzLnB1c2godGhpcy5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKG9udG9sb2d5OiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHJlc3BvbnNlIHRvIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JrSm9pbiByZXR1cm5zIGFuIE9ic2VydmFibGUgb2YgYW4gYXJyYXkgb2YgcmVzdWx0c1xuICAgICAgICAvLyByZXR1cm5lZCBieSBlYWNoIE9ic2VydmFibGUgY29udGFpbmVkIGluIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgLy8gYSBzdWJzY3JpcHRpb24gdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgZm9ya0pvaW4gaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gb25jZSBhbGwgT2JzZXJ2YWJsZXMgaGF2ZSBiZWVuIGNvbXBsZXRlZFxuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBvbnRvbG9neUlyaXNUb1F1ZXJ5ID0gb250b2xvZ3lJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9udG9sb2d5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgb250b2xvZ2llcyB0aGF0IGFyZSBtb3QgY2FjaGVkIHlldFxuICAgICAgICBpZiAob250b2xvZ3lJcmlzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXNUb1F1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGVkIG9uY2UgYWxsIG9udG9sb2dpZXMgaGF2ZSBiZWVuIGNhY2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBQcm9wZXJ0aWVzIGNvbnRhaW5lZCBpbiB0aGUgY2FyZGluYWxpdGllcyB3aWxsIGJlIHJldHVybmVkIHRvby5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3NlcyAoaW5jbHVkaW5nIHByb3BlcnRpZXMpLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NJcmlzVG9RdWVyeUZvcjogc3RyaW5nW10gPSByZXNvdXJjZUNsYXNzSXJpcy5maWx0ZXIoXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0gPT09IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3IubWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShyZXNDbGFzc0lyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IElyaXMuXG4gICAgICogSWYgdGhlIGRlZmluaXRpb25zIGFyZSBub3QgYWxyZWFkeSBpbiB0aGUgY2FjaGUsIHRoZSB3aWxsIGJlIHJldHJpZXZlZCBmcm9tIEtub3JhIGFuZCBjYWNoZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcmV0dXJuZWQgLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHVibGljIGdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNUb1F1ZXJ5OiBzdHJpbmdbXSA9IHByb3BlcnR5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByb3BlcnR5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvcGVydGllc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXNUb1F1ZXJ5Lm1hcChcbiAgICAgICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShwcm9wSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gd2l0aDogcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChhbHJlYWR5IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuXG4gICAgZ2V0UmVzb3VyY2UoaXJpKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJUkkgZnJvbSByZXNvdXJjZSBzZXJ2aWNlOiAnLCBpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAvLyBUT0RPOiB3ZSBzaG91bGQgdXNlIHRoZSBBcGlTZXJ2aWNlIGNvcnJlY3RseS4gQnV0IHJpZ2h0IG5vdyBpdCBkb2Vzbid0IHdvcmtcbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShSZWFkUmVzb3VyY2UpKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuICAgICovXG5cbiAgICAvLyBUT0RPOiBwb3N0LCBwdXQsIGRlbGV0ZVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgZnVsbHRleHQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAoZm9yIHBhZ2luZywgZmlyc3Qgb2Zmc2V0IGlzIDApLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2goc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIHNlYXJjaFRlcm0gKyAnP29mZnNldD0nICsgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgZnVsbHRleHQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeShzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzcGFycWxTdHJpbmcgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsU3RyaW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc3BhcnFsU3RyaW5nID09PSB1bmRlZmluZWQgfHwgc3BhcnFsU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hleHRlbmRlZC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNwYXJxbFN0cmluZykpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkJywgc3BhcnFsU3RyaW5nKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gZXh0ZW5kZWQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNwYXJxbFN0cmluZyB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5KHNwYXJxbFN0cmluZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNwYXJxbFN0cmluZyA9PT0gdW5kZWZpbmVkIHx8IHNwYXJxbFN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50LycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBzcGFycWxTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzSVJJIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gcHJvamVjdElyaSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zWydsaW1pdFRvUmVzb3VyY2VDbGFzcyddID0gcmVzb3VyY2VDbGFzc0lSSTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtc1snbGltaXRUb1Byb2plY3QnXSA9IHByb2plY3RJcmk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwR2V0KCkgZXhwZWN0cyBvbmx5IG9uZSBhcmd1bWVudCwgbm90IDJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgcGFyYW1zKTtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIFJlYWRCb29sZWFuVmFsdWUsXG4gICAgUmVhZENvbG9yVmFsdWUsXG4gICAgUmVhZERhdGVWYWx1ZSxcbiAgICBSZWFkRGVjaW1hbFZhbHVlLFxuICAgIFJlYWRHZW9tVmFsdWUsXG4gICAgUmVhZEludGVnZXJWYWx1ZSxcbiAgICBSZWFkSW50ZXJ2YWxWYWx1ZSxcbiAgICBSZWFkTGlua1ZhbHVlLFxuICAgIFJlYWRMaXN0VmFsdWUsXG4gICAgUmVhZFByb3BlcnRpZXMsXG4gICAgUmVhZFByb3BlcnR5SXRlbSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0RmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0VmFsdWVBc0h0bWwsXG4gICAgUmVhZFRleHRWYWx1ZUFzU3RyaW5nLFxuICAgIFJlYWRUZXh0VmFsdWVBc1htbCxcbiAgICBSZWFkVXJpVmFsdWUsXG4gICAgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayxcbiAgICBVdGlsc1xufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIENvbnRhaW5zIG1ldGhvZHMgdG8gY29udmVydCBKU09OLUxEIHJlcHJlc2VudGluZyByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMgdG8gY2xhc3Nlcy5cbiAqIFRoZXNlIG1ldGhvZHMgd29ya3Mgb25seSBmb3IgaW5zdGFuY2VzIG9mIHJlc291cmNlcyBhbmQgcHJvcGVydGllcywgbm90IGZvciBvbnRvbG9naWVzIChkYXRhIG1vZGVsKS5cbiAqL1xuZXhwb3J0IG1vZHVsZSBDb252ZXJ0SlNPTkxEIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byBhIGZpbHRlciB1c2VkIG9uIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICogc29ydGluZyBvdXQgYWxsIG5vbiB2YWx1ZSBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgKlxuICAgICAqIEdldHMgYWxsIHByb3BlcnR5IG5hbWVzIHRoYXQgcmVmZXIgdG8gdmFsdWUgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wTmFtZSB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnMgQm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSBuYW1lIHJlZmVycyB0byBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbnN0IGdldFByb3BlcnR5TmFtZXMgPSAocHJvcE5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BOYW1lICE9PSAnQGlkJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09ICdAdHlwZSdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvUHJvamVjdFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Vc2VyXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuY3JlYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMubGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5oYXNQZXJtaXNzaW9ucztcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUmVzb3VyY2VdXS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZSB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2UoXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQGlkJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQHR5cGUnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIGZyb20gSlNPTi1MRCxcbiAgICAgKiB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGUuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcFZhbHVlIHRoZSB2YWx1ZSBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHBhcmFtIHByb3BJcmkgdGhlIElyaSBvZiB0aGUgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHN0YW5kb2ZmTGlua1ZhbHVlcyBzdGFuZG9mZkxpbmtWYWx1ZXMgb2YgdGhlIHJlc291cmNlLiBUZXh0IHZhbHVlcyBtYXkgY29udGFpbiBsaW5rcyB0byBvdGhlciByZXNvdXJjZXMuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBvciBgdW5kZWZpbmVkYCBpbiBjYXNlIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkIGNvcnJlY3RseS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgcHJvcFZhbHVlOiBPYmplY3QsIHByb3BJcmk6IHN0cmluZywgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10pOiBSZWFkUHJvcGVydHlJdGVtIHwgdW5kZWZpbmVkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuXG4gICAgICAgIGxldCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZVxuICAgICAgICBzd2l0Y2ggKHByb3BWYWx1ZVsnQHR5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gYSB0ZXh0IHZhbHVlIG1pZ2h0IGJlIGdpdmVuIGFzIHBsYWluIHN0cmluZywgaHRtbCBvciB4bWwuXG4gICAgICAgICAgICAgICAgbGV0IHRleHRWYWx1ZTogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzU3RyaW5nKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3RhbmRvZmYgbGlua3MgYW5kIGluY2x1ZGUgcmVmZXJyZWQgcmVzb3VyY2VzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBhIHN0YW5kb2ZmIGxpbmssIGZ1cnRoZXIgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlIGNhbiBiZSBzaG93blxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGluayBvZiBzdGFuZG9mZkxpbmtWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzOiBSZWFkUmVzb3VyY2UgPSBzdGFuZG9mZkxpbmsucmVmZXJyZWRSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VzW3JlZmVycmVkUmVzLmlkXSA9IHJlZmVycmVkUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc0h0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSwgcmVmZXJyZWRSZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdICE9PSB1bmRlZmluZWQgJiYgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNYbWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhwZWN0ZWQgdGV4dCB2YWx1ZSBtZW1iZXJzIG5vdCBkZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBJbnZhbGlkIHRleHQgdmFsdWU6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU6XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbmV3IFJlYWREYXRlVmFsdWUocHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0NhbGVuZGFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0WWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RGF5XSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZERheV0pO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkYXRlVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlua1ZhbHVlOlxuXG4gICAgICAgICAgICAgICAgbGV0IGxpbmtWYWx1ZTogUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSByZWZlcnJlZCByZXNvdXJjZSBpcyBnaXZlbiBhcyBhbiBvYmplY3Qgb3IganVzdCBhcyBhbiBJUklcbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXQgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZS5pZCwgcmVmZXJyZWRSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldElyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2UgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZS5pZCwgaW5jb21pbmdSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlua1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50VmFsdWUgPSBuZXcgUmVhZEludGVnZXJWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZWdlclZhbHVlQXNJbnRlZ2VyXSk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIGEgZGVjaW1hbCB2YWx1ZSBpcyByZXByZXNlbnRlZCBhcyBhIHN0cmluZyBpbiBvcmRlciB0byBwcmVzZXJ2ZSBpdHMgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjVmFsOiBudW1iZXIgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWxdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsVmFsdWUgPSBuZXcgUmVhZERlY2ltYWxWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBkZWNWYWwpO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGVjaW1hbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlU3BlY2lmaWNQcm9wO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBbW1JlYWRQcm9wZXJ0aWVzXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlSlNPTkxEIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRQcm9wZXJ0aWVzXV0uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRQcm9wZXJ0aWVzIHtcblxuICAgICAgICAvLyBKU09OLUxEIHJlcHJlc2VudGluZyBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICAvLyB0ZXh0IHZhbHVlcyBtYXkgY29udGFpbiBzdGFuZG9mZiBsaW5rc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQ6IE9iamVjdCA9IHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWVdO1xuXG4gICAgICAgIC8vIHRvIGJlIHBvcHVsYXRlZCB3aXRoIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdID0gW107XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0YW5kb2ZmIGxpbmsgdmFsdWUgSlNPTi1MRCBvYmplY3QgdG8gYSBSZWFkTGlua1ZhbHVlXG4gICAgICAgIC8vIGluIG9yZGVyIHBvcHVsYXRlIHRoZSBjb2xsZWN0aW9uIHdpdGggYWxsIHRoZSBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGlua0pTT05MRCBvZiBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbDogUmVhZExpbmtWYWx1ZSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbCA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIHRoZSBnaXZlbiBwcm9wZXJ0eSBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVzOiBBcnJheTxSZWFkUHJvcGVydHlJdGVtPiA9IFtdO1xuXG4gICAgICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgdmFsdWVzIG9yIGp1c3Qgb25lIHZhbHVlIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBhbiBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMgaXMgZ2l2ZW4sIGl0ZXJhdGUgb3ZlciBpdFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcFZhbHVlIG9mIHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocHJvcFZhbHVlLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgcHJvcGVydGllcyBvYmplY3RcbiAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcFZhbHVlcztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYW4gQVBJIHJlc3BvbnNlIGluIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzIGludG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgcmVzb3VyY2Ugb3IgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiA9IFtdO1xuICAgICAgICBsZXQgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcjtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG4gICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IHJlc291cmNlc0dyYXBoLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGFuc3dlciwgbm8gcmVzb3VyY2VzIGdpdmVuXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAxO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZShyZXNvdXJjZXMsIG51bWJlck9mUmVzb3VyY2VzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIGFsbCB0aGUgdHlwZXMgKGNsYXNzZXMpIG9mIHJlZmVycmVkIHJlc291cmNlcyBmcm9tIGEgZ2l2ZW4gcmVzb3VyY2UgKGZyb20gaXRzIGxpbmtpbmcgcHJvcGVydGllcykuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzb3VyY2VKU09OTEQgSlNPTi1MRCBkZXNjcmliaW5nIG9uZSByZXNvdXJjZS5cbiAgICAgKiBAcmV0dXJuIGFuIEFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMgKGluY2x1ZGluZyBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgLy8gc2V2ZXJhbCB2YWx1ZXMgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZWZlcnJlZFJlcyBvZiByZXNvdXJjZUpTT05MRFtwcm9wXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZSBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzb3VyY2UgdHlwZXMgKGNsYXNzZXMpIGZyb20gYSBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgKHdpdGhvdXQgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcbiAgICAgICAgbGV0IHJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNsYXNzIG9mIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzZXMuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbmNvbWluZ1NlcnZpY2UgZXh0ZW5kcyBTZWFyY2hTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgcmVnaW9ucyBmb3IgYSBwYXJ0aWN1bGFyIHJlc291cmNlLlxuICAgICAgICovXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKHJlc291cmNlSVJJOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cmVnaW9uIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbn0gV0hFUkUge1xuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZWdpb24gLlxuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJUkl9PiAuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlSSX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxua25vcmEtYXBpOmhhc0dlb21ldHJ5IGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpHZW9tIC5cblxuP2dlb20gYSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxua25vcmEtYXBpOmhhc0NvbW1lbnQga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOnN0cmluZyAuXG5cbj9jb21tZW50IGEgeHNkOnN0cmluZyAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG5rbm9yYS1hcGk6aGFzQ29sb3Iga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkNvbG9yIC5cblxuP2NvbG9yIGEga25vcmEtYXBpOkNvbG9yIC5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NwYXJxbFF1ZXJ5U3RyICcsIHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSwgaWYgYW55LlxuICAgICAqIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgbGluayB0byB0aGUgZ2l2ZW4gcmVzb3VyY2UgdmlhIGtub3JhLWJhc2U6aXNQYXJ0T2YuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNGb3JDb21wb3VuZFJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cGFnZSBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG59IFdIRVJFIHtcblxuP3BhZ2UgYSBrbm9yYS1hcGk6U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIC5cbj9wYWdlIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxua25vcmEtYXBpOnNlcW51bSBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6aW50ZWdlciAuXG5cbj9zZXFudW0gYSB4c2Q6aW50ZWdlciAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG5rbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkZpbGUgLlxuXG4/ZmlsZSBhIGtub3JhLWFwaTpGaWxlIC5cblxufSBPUkRFUiBCWSA/c2VxbnVtXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsUXVlcnlTdHIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgYWxsIGluY29taW5nIGxpbmtzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgSXJpXG4gICAgICogYnV0IGluY29taW5nIHJlZ2lvbnMgYW5kIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBpbmNvbWluZyBsaW5rcyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ0xpbmtzRm9yUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9pbmNvbWluZ1JlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG59IFdIRVJFIHtcblxuP2luY29taW5nUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdQcm9wIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRlaCBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGdlbmVyYXRlR3JhdnNlYXJjaCBhIGZ1bmN0aW9uIHRoZSBnZW5lcmF0ZXMgS25hclFMLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gaXMgZXhwZWN0ZWQgdG8gdGFrZSB0aGUgb2Zmc2V0XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm4gYSBLbmFyUUwgcXVlcnkgc3RyaW5nLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGVtcG9yYXJpbHkgc3RvcmVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlYXJjaFBhcmFtc1NlcnZpY2Uge1xuXG4gICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb25cbiAgICBwcml2YXRlIHNlYXJjaFBhcmFtc01lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiAnJykpO1xuICAgIGN1cnJlbnRTZWFyY2hQYXJhbXMgPSB0aGlzLnNlYXJjaFBhcmFtc01lc3NhZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhY3JoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICovXG4gICAgY2hhbmdlU2VhcmNoUGFyYW1zTXNnKHNlYXJjaFBhcmFtczogRXh0ZW5kZWRTZWFyY2hQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXNNZXNzYWdlLm5leHQoc2VhcmNoUGFyYW1zKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBTZWFyY2hQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgd2hlbiBnZW5lcmF0aW5nIEtuYXJRTC5cbiAqL1xuY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSB7XG5cbiAgICAvLyBtYXAgb2YgY29tcGxleCBrbm9yYS1hcGkgdmFsdWUgdHlwZXMgdG8gc2ltcGxlIG9uZXNcbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlciwgLy8gdXNlIGNvbXB1dGVkIHByb3BlcnR5IG5hbWU6IGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QtaW5pdGlhbGl6ZXJcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkgZnJvbSB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWFpblJlc291cmNlQ2xhc3NPcHRpb24gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAobnRoIHBhZ2Ugb2YgcmVzdWx0cykuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXM6IFByb3BlcnR5V2l0aFZhbHVlW10sIG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uPzogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgcmVzb3VyY2Ugc2VhcmNoZWQgZm9yXG4gICAgICAgIGxldCBtYWluUmVzb3VyY2VDbGFzcyA9ICcnO1xuXG4gICAgICAgIC8vIGlmIGdpdmVuLCBjcmVhdGUgdGhlIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgbWFpbiByZXNvdXJjZVxuICAgICAgICBpZiAobWFpblJlc291cmNlQ2xhc3NPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFpblJlc291cmNlQ2xhc3MgPSBgP21haW5SZXMgYSA8JHtVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUobWFpblJlc291cmNlQ2xhc3NPcHRpb24pfT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgRmlsdGVycyBhbmQgdHlwZSBhbm5vdGF0aW9ucyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wSXJpU2ltcGxlID0gVXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKHByb3BXaXRoVmFsLnByb3BlcnR5LmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaW1wbGVUeXBlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IHRoaXMuY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKHByb3BXaXRoVmFsLnByb3BlcnR5Lm9iamVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5yZXNvdXJjZVNpbXBsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50OiBzdHJpbmcgPSBgP21haW5SZXMgPCR7cHJvcElyaVNpbXBsZX0+ICR7cHJvcFZhbHVlfSAuYDtcblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVHlwZUFubm90YXRpb24gPSBgPCR7cHJvcElyaVNpbXBsZX0+IGtub3JhLWFwaTpvYmplY3RUeXBlIDwke3NpbXBsZVR5cGV9PiAuYDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVBbm5vdGF0aW9uID0gYCR7cHJvcFZhbHVlfSBhIDwke3NpbXBsZVR5cGV9PiAuYDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSB0aGF0IGhhcyB0byBiZSB3cmFwcGVkIGluIGEgRklMVEVSIE5PVCBFWElTVFMgKGNvbXBhcmlzb24gb3BlcmF0b3IgTk9UX0VRVUFMUykgdG8gbmVnYXRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNsdWRlIHN0YXRlbWVudCBpbiByZXN1bHRzLCBiZWNhdXNlIHRoZSBxdWVyeSBjaGVja3MgZm9yIHRoZSBhYnNlbmNlIG9mIHRoaXMgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBGSUxURVIgTk9UIEVYSVNUUyB7XG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxufWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgc3RhdGVtZW50IHNob3VsZCBiZSByZXR1cm5lZCByZXR1cm5lZCBpbiByZXN1bHRzIChCb29sZWFuIGZsYWcgZnJvbSBjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RhdGVtZW50cy5wdXNoKHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGZpbHRlciBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSBhIEZJTFRFUiBpZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRVhJU1RTIGFuZCBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTGlrZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSByZWdleCBmdW5jdGlvbiBmb3IgTElLRVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiByZWdleCgke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9LCBcImlcIilgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdNYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjb250YWlucyBmdW5jdGlvbiBmb3IgTUFUQ0hcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgPCR7S25vcmFDb25zdGFudHMubWF0Y2hGdW5jdGlvbn0+KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIoJHtwcm9wVmFsdWV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCB2YWx1ZSBpcyBhIHNvcnQgY3JpdGVyaW9uXG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLmlzU29ydENyaXRlcmlvbikgb3JkZXJCeUNyaXRlcmlhLnB1c2gocHJvcFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnR9XG4ke2ZpbHRlcn1cbmA7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5U3RhdGVtZW50ID0gJyc7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlDcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckJ5U3RhdGVtZW50ID0gYFxuT1JERVIgQlkgJHtvcmRlckJ5Q3JpdGVyaWEuam9pbignICcpfVxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRlbXBsYXRlIG9mIHRoZSBLbmFyUUwgcXVlcnkgd2l0aCBkeW5hbWljIGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaFRlbXBsYXRlID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuQ09OU1RSVUNUIHtcblxuP21haW5SZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4ke3JldHVyblN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbn0gV0hFUkUge1xuXG4/bWFpblJlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbiR7bWFpblJlc291cmNlQ2xhc3N9XG5cbiR7cHJvcHMuam9pbignJyl9XG5cbn1cbiR7b3JkZXJCeVN0YXRlbWVudH1gO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEtuYXJRTCBxdWVyeVxuICAgICAgICBjb25zdCBvZmZzZXRUZW1wbGF0ZSA9IGBcbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIHNhbWUgS25hclFMIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQgPSAobG9jYWxPZmZzZXQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbk9GRlNFVCAke2xvY2FsT2Zmc2V0fVxuYDtcblxuICAgICAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEtuYXJRTCBxdWVyeSBjYW4gYmUgY3JlYXRlZCB3aXRoIGFuIGluY3JlYXNlZCBvZmZzZXRcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuY2hhbmdlU2VhcmNoUGFyYW1zTXNnKG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcyhnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGtuYXJxbFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcsIFJkZkRhdGFPYmplY3QsIFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7IH1cblxuICAvKipcbiAgICAgKiByZXNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIHRyaXBsZXN0b3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmRmRGF0YU9iamVjdHNcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxzdHJpbmc+fVxuICAgICAqL1xuICByZXNldFRyaXBsZXN0b3JlQ29udGVudChyZGZEYXRhT2JqZWN0czogUmRmRGF0YU9iamVjdFtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlPih0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3N0b3JlL1Jlc2V0VHJpcGxlc3RvcmVDb250ZW50JywgcmRmRGF0YU9iamVjdHMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gQ2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gU2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApKTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2ljT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogcmV0dXJucyBvdXIgbGlzdCBvZiBhIGJhc2ljIG9udG9sb2d5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAvLyBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgICBsZXQgdXJsID0gZW52aXJvbm1lbnQudXJsO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICAvLyB9XG4gIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcHA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nKTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VUeXBlc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiBHZXQgYWxsIHJlc291cmNlIHR5cGVzIGRlZmluZWQgYnkgdGhlIHZvY2FidWxhcnlcbiAgICAgKiBAcGFyYW0gaXJpIChWb2NhYnVsYXJ5IGlyaSlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICBnZXRSZXNvdXJjZVR5cGVzQnlWb2MoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzP3ZvY2FidWxhcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyByZXNvdXJjZSB0eXBlXG4gICAqIEBwYXJhbSBpcmkgICAocmVzb3VyY2UgdHlwZSBpcmkpXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAqL1xuICBnZXRSZXNvdXJjZVR5cGUoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuXG4gIC8vIHB1dFJlc291cmNlVHlwZShpcmkpXG5cbn1cbiIsIi8qKlxuICogbWFpbiBhcGkgc2VydmljZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIGFkbWluIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2dyb3Vwcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGlzdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3Byb2plY3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi91c2Vycy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGFuZ3VhZ2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3N0YXR1cy1tc2cuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIHYyIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvY29udmVydC1qc29ubGQnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9pbmNvbWluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvZ3Jhdi1zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3N0b3JlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZSc7XG4iLCJpbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEgfSBmcm9tICcuL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsIFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIGNvbXBhcmlzb24gb3BlcmF0b3IuXG4gKiBUaGlzIGludGVyZmFjZSBpcyBpbXBsZW1lbnRlZCBmb3IgdGhlIHN1cHBvcnRlZCBjb21wYXJpc29uIG9wZXJhdG9ycy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgLy8gdHlwZSBvZiBjb21wYXJpc29uIG9wZXJhdG9yXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLy8gdGhlIGxhYmVsIG9mIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIHRvIGJlIHByZXNlbnRlZCB0byB0aGUgdXNlci5cbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLy8gcmV0dXJucyB0aGUgY2xhc3MgbmFtZSB3aGVuIGNhbGxlZCBvbiBhbiBpbnN0YW5jZVxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTm90RXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTm90RXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4aXN0cyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0V4aXN0cyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlrZSBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGlrZSc7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNYXRjaCBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdNYXRjaCc7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgYSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCBhIHZhbHVlIGxpdGVyYWwgb3IgYW4gSVJJLlxuICogSW4gY2FzZSB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyAnRXhpc3RzJywgbm8gdmFsdWUgaXMgZ2l2ZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb21wYXJpc29uT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvciwgcmVhZG9ubHkgdmFsdWU/OiBWYWx1ZSkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgdmFsdWU6IGFuIElSSSBvciBhIGxpdGVyYWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHZhbHVlIGludG8gYSBTUEFSUUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZztcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSdzIHZhbHVlIGFzIGEgbGl0ZXJhbCB3aXRoIHRoZSBpbmRpY2F0aW9uIG9mIGl0cyB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgVmFsdWVMaXRlcmFsIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtWYWx1ZUxpdGVyYWxdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIHRoZSBsaXRlcmFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgKG1ha2luZyB1c2Ugb2YgeHNkKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcpIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0eXBlIGFubm90YXRlZCB2YWx1ZSBsaXRlcmFsIHRvIGJlIHVzZWQgaW4gYSBTUEFSUUwgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IGxpdGVyYWxUeXBlOiBzdHJpbmc7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBLbm9yYSBzY2hlbWEgY29udmVyc2lvbiBpcyBuZWNlc3NhcnksIGUuZy4sIGtub3JhLWFwaTpkYXRlVmFsdWUgKGNvbXBsZXgpIHRvIGtub3JhLWFwaTpkYXRlIChzaW1wbGUpLlxuICAgICAgICAvLyB4c2QgdHlwZXMgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gICAgICAgIGlmIChzY2hlbWEgPT09IEtub3JhU2NoZW1hLnNpbXBsZSAmJiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIHNpbXBsZSBzY2hlbWFcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkbyBub3QgY29udmVydFxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiXl48JHtsaXRlcmFsVHlwZX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIElSSS5cbiAqL1xuZXhwb3J0IGNsYXNzIElSSSBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYW4gW0lSSV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHRoZSBJUkkgb2YgYSByZXNvdXJjZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpcmk6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIElSSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBpbnN0YW5jZSBJcmkgYW5kIGRvZXMgbm90IGhhdmUgdG8gYmUgY29udmVydGVkLlxuICAgICAgICByZXR1cm4gYDwke3RoaXMuaXJpfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSB2YWx1ZS5cbiAqIFRoaXMgaW50ZXJmYWNlIGhhcyB0byBiZSBpbXBsZW1lbnRlZCBmb3IgYWxsIHZhbHVlIHR5cGVzICh2YWx1ZSBjb21wb25lbnQgY2xhc3NlcykuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZX0uXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogVmFsdWU7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHksIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciwgYW5kIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXaXRoVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtQcm9wZXJ0eVdpdGhWYWx1ZV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eSB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWV9IHZhbHVlTGl0ZXJhbCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpc1NvcnRDcml0ZXJpb24gaW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBpcyB1c2VkIGFzIGEgc29ydCBjcml0ZXJpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBQcm9wZXJ0eSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWVMaXRlcmFsOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICAgICAgcmVhZG9ubHkgaXNTb3J0Q3JpdGVyaW9uOiBCb29sZWFuKSB7XG4gICAgfVxuXG59XG5cbi8qKlxuICogYSBsaXN0LCB3aGljaCBpcyB1c2VkIGluIHRoZSBtYXQtYXV0b2NvbXBsZXRlIGZvcm0gZmllbGRcbiAqIGNvbnRhaW5zIG9iamVjdHMgd2l0aCBpZCBhbmQgbmFtZS4gdGhlIGlkIGlzIHVzdWFsIHRoZSBpcmlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRvY29tcGxldGVJdGVtIHtcbiAgICBpcmk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy8nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtLdWlDb3JlQ29uZmlnIGFzIMOJwrVhfSBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMnO1xuZXhwb3J0IHtQcm9wZXJ0eSBhcyDDicK1Yn0gZnJvbSAnLi9saWIvc2VydmljZXMnOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZGVjb3JhdGUiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7O0lBTUE7Ozs7O1FBUVcsU0FBSSxHQUFXLFNBQVMsQ0FBQzs7Ozs7UUFPekIsUUFBRyxHQUFXLFNBQVMsQ0FBQzs7Ozs7UUFPeEIsVUFBSyxHQUFXLFNBQVMsQ0FBQzs7Ozs7UUFPMUIsUUFBRyxHQUFXLFNBQVMsQ0FBQztLQUNsQztJQXRCR0E7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7K0NBQ0c7SUFPaENBO1FBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzhDQUNHO0lBTy9CQTtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztnREFDRztJQU9qQ0E7UUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7OENBQ0c7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