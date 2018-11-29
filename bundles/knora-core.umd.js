(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('json2typescript'), require('@angular/common'), require('@angular/common/http'), require('@angular/core'), require('rxjs/internal/observable/throwError'), require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@knora/core', ['exports', 'json2typescript', '@angular/common', '@angular/common/http', '@angular/core', 'rxjs/internal/observable/throwError', 'rxjs/operators', 'rxjs'], factory) :
    (factory((global.knora = global.knora || {}, global.knora.core = {}),null,global.ng.common,global.ng.common.http,global.ng.core,global.rxjs['internal/observable/throwError'],global.rxjs.operators,global.rxjs));
}(this, (function (exports,json2typescript,common,i1,i0,throwError,operators,rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * Knora-ui core configuration with the server definitions of:
     *  - api: URL of data service e.g. knora: http://localhost:3333
     *  - media: URL of media server service e.g. sipi: http://localhost:1024
     *  - app: URL of the app e.g. salsah: http://localhost:4200
     */
    var KuiCoreConfig = (function () {
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
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('api', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "api", void 0);
        __decorate([
            json2typescript.JsonProperty('media', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "media", void 0);
        __decorate([
            json2typescript.JsonProperty('app', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "app", void 0);
        KuiCoreConfig = __decorate([
            json2typescript.JsonObject('KuiCoreConfig')
        ], KuiCoreConfig);
        return KuiCoreConfig;
    }());

    /**
     * Result class used as API url response in ApiService
     */
    var ApiServiceResult = (function () {
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
        ApiServiceResult.jsonConvert = new json2typescript.JsonConvert(json2typescript.OperationMode.ENABLE, json2typescript.ValueCheckingMode.ALLOW_NULL);
        return ApiServiceResult;
    }());

    /**
     * Error class used as API response in ApiService
     */
    var ApiServiceError = (function () {
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

    var KnoraConstants = (function () {
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
    (function (KnoraSchema) {
        KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
        KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
    })(exports.KnoraSchema || (exports.KnoraSchema = {}));

    /**
     * Collection of useful utility functions.
     */
    // @dynamic
    var Utils = (function () {
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

    var StringLiteral = (function () {
        function StringLiteral() {
            this.value = undefined;
            this.language = '';
        }
        __decorate([
            json2typescript.JsonProperty('value', String, false),
            __metadata("design:type", String)
        ], StringLiteral.prototype, "value", void 0);
        __decorate([
            json2typescript.JsonProperty('language', String, true),
            __metadata("design:type", String)
        ], StringLiteral.prototype, "language", void 0);
        StringLiteral = __decorate([
            json2typescript.JsonObject('StringLiteral')
        ], StringLiteral);
        return StringLiteral;
    }());

    /**
     * Precision for DateSalsah.
     */
    (function (Precision) {
        Precision[Precision["yearPrecision"] = 0] = "yearPrecision";
        Precision[Precision["monthPrecision"] = 1] = "monthPrecision";
        Precision[Precision["dayPrecision"] = 2] = "dayPrecision";
    })(exports.Precision || (exports.Precision = {}));
    /**
     * Represents a Salsah date object with a precision information.
     */
    var DateSalsah = (function () {
        function DateSalsah(calendar, era, year, month, day) {
            this.calendar = calendar;
            this.era = era;
            this.year = year;
            this.month = month;
            this.day = day;
            if (this.month === undefined) {
                // year precision
                this.precision = exports.Precision.yearPrecision;
            }
            else if (this.day === undefined) {
                // month precision
                this.precision = exports.Precision.monthPrecision;
            }
            else {
                // day precision
                this.precision = exports.Precision.dayPrecision;
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
                case exports.Precision.yearPrecision: {
                    dateString += this.year.toString();
                    break;
                }
                case exports.Precision.monthPrecision: {
                    dateString += this.year + DateSalsah.separator + this.month;
                    break;
                }
                case exports.Precision.dayPrecision: {
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
    var DateRangeSalsah = (function () {
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

    var AuthenticationResponse = (function () {
        function AuthenticationResponse() {
            this.token = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('token', String),
            __metadata("design:type", String)
        ], AuthenticationResponse.prototype, "token", void 0);
        AuthenticationResponse = __decorate([
            json2typescript.JsonObject('AuthenticationResponse')
        ], AuthenticationResponse);
        return AuthenticationResponse;
    }());

    var Project = (function () {
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
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], Project.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('shortname', String),
            __metadata("design:type", String)
        ], Project.prototype, "shortname", void 0);
        __decorate([
            json2typescript.JsonProperty('shortcode', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "shortcode", void 0);
        __decorate([
            json2typescript.JsonProperty('longname', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "longname", void 0);
        __decorate([
            json2typescript.JsonProperty('description', [StringLiteral], true),
            __metadata("design:type", Array)
        ], Project.prototype, "description", void 0);
        __decorate([
            json2typescript.JsonProperty('keywords', [String], true),
            __metadata("design:type", Array)
        ], Project.prototype, "keywords", void 0);
        __decorate([
            json2typescript.JsonProperty('logo', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "logo", void 0);
        __decorate([
            json2typescript.JsonProperty('institution', String, true),
            __metadata("design:type", String)
        ], Project.prototype, "institution", void 0);
        __decorate([
            json2typescript.JsonProperty('ontologies', [String]),
            __metadata("design:type", Array)
        ], Project.prototype, "ontologies", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], Project.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('selfjoin', Boolean),
            __metadata("design:type", Boolean)
        ], Project.prototype, "selfjoin", void 0);
        Project = __decorate([
            json2typescript.JsonObject('Project')
        ], Project);
        return Project;
    }());

    var Group = (function () {
        function Group() {
            this.id = undefined;
            this.name = undefined;
            this.description = undefined;
            this.project = undefined;
            this.status = undefined;
            this.selfjoin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], Group.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], Group.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('description', String),
            __metadata("design:type", String)
        ], Group.prototype, "description", void 0);
        __decorate([
            json2typescript.JsonProperty('project', Project, false),
            __metadata("design:type", Project)
        ], Group.prototype, "project", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], Group.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('selfjoin', Boolean),
            __metadata("design:type", Boolean)
        ], Group.prototype, "selfjoin", void 0);
        Group = __decorate([
            json2typescript.JsonObject('Group')
        ], Group);
        return Group;
    }());

    var GroupResponse = (function () {
        function GroupResponse() {
            this.group = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('group', Group),
            __metadata("design:type", Group)
        ], GroupResponse.prototype, "group", void 0);
        GroupResponse = __decorate([
            json2typescript.JsonObject('GroupResponse')
        ], GroupResponse);
        return GroupResponse;
    }());

    var GroupsResponse = (function () {
        function GroupsResponse() {
            this.groups = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('groups', [Group]),
            __metadata("design:type", Array)
        ], GroupsResponse.prototype, "groups", void 0);
        GroupsResponse = __decorate([
            json2typescript.JsonObject('GroupsResponse')
        ], GroupsResponse);
        return GroupsResponse;
    }());

    var ListInfo = (function () {
        function ListInfo() {
            this.id = undefined;
            this.projectIri = undefined;
            this.labels = undefined;
            this.comments = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String, false),
            __metadata("design:type", String)
        ], ListInfo.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('projectIri', String, false),
            __metadata("design:type", String)
        ], ListInfo.prototype, "projectIri", void 0);
        __decorate([
            json2typescript.JsonProperty('labels', [StringLiteral], true),
            __metadata("design:type", Array)
        ], ListInfo.prototype, "labels", void 0);
        __decorate([
            json2typescript.JsonProperty('comments', [StringLiteral], true),
            __metadata("design:type", Array)
        ], ListInfo.prototype, "comments", void 0);
        ListInfo = __decorate([
            json2typescript.JsonObject('ListInfo')
        ], ListInfo);
        return ListInfo;
    }());

    var ListNode = (function () {
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
            json2typescript.JsonProperty('id', String, false),
            __metadata("design:type", String)
        ], ListNode.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String, true),
            __metadata("design:type", String)
        ], ListNode.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('label', String, true),
            __metadata("design:type", String)
        ], ListNode.prototype, "label", void 0);
        __decorate([
            json2typescript.JsonProperty('children', [ListNode_1], true),
            __metadata("design:type", Array)
        ], ListNode.prototype, "children", void 0);
        __decorate([
            json2typescript.JsonProperty('level', Number, true),
            __metadata("design:type", Number)
        ], ListNode.prototype, "level", void 0);
        __decorate([
            json2typescript.JsonProperty('position', Number, true),
            __metadata("design:type", Number)
        ], ListNode.prototype, "position", void 0);
        ListNode = ListNode_1 = __decorate([
            json2typescript.JsonObject('ListNode')
        ], ListNode);
        return ListNode;
        var ListNode_1;
    }());

    var List = (function () {
        function List() {
            this.listinfo = undefined;
            this.children = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('listinfo', ListInfo, false),
            __metadata("design:type", ListInfo)
        ], List.prototype, "listinfo", void 0);
        __decorate([
            json2typescript.JsonProperty('children', [ListNode], false),
            __metadata("design:type", Array)
        ], List.prototype, "children", void 0);
        List = __decorate([
            json2typescript.JsonObject('List')
        ], List);
        return List;
    }());

    var ListInfoResponse = (function () {
        function ListInfoResponse() {
            this.listinfo = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('listinfo', ListInfo, false),
            __metadata("design:type", ListInfo)
        ], ListInfoResponse.prototype, "listinfo", void 0);
        ListInfoResponse = __decorate([
            json2typescript.JsonObject('ListInfoResponse')
        ], ListInfoResponse);
        return ListInfoResponse;
    }());

    var ListNodeInfo = (function () {
        function ListNodeInfo() {
            this.id = undefined;
            this.name = undefined;
            this.projectIri = undefined;
            this.isRootNode = undefined;
            this.labels = undefined;
            this.comments = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('name', String, true),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('projectIri', String, true),
            __metadata("design:type", String)
        ], ListNodeInfo.prototype, "projectIri", void 0);
        __decorate([
            json2typescript.JsonProperty('isRootNode', Boolean, true),
            __metadata("design:type", Boolean)
        ], ListNodeInfo.prototype, "isRootNode", void 0);
        __decorate([
            json2typescript.JsonProperty('labels', [StringLiteral]),
            __metadata("design:type", Array)
        ], ListNodeInfo.prototype, "labels", void 0);
        __decorate([
            json2typescript.JsonProperty('comments', [StringLiteral]),
            __metadata("design:type", Array)
        ], ListNodeInfo.prototype, "comments", void 0);
        ListNodeInfo = __decorate([
            json2typescript.JsonObject('ListNodeInfo')
        ], ListNodeInfo);
        return ListNodeInfo;
    }());

    var ListNodeInfoResponse = (function () {
        function ListNodeInfoResponse() {
            this.nodeinfo = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('nodeinfo', ListNodeInfo, false),
            __metadata("design:type", ListNodeInfo)
        ], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
        ListNodeInfoResponse = __decorate([
            json2typescript.JsonObject('ListNodeInfoResponse')
        ], ListNodeInfoResponse);
        return ListNodeInfoResponse;
    }());

    var ListResponse = (function () {
        function ListResponse() {
            this.list = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('list', List, false),
            __metadata("design:type", List)
        ], ListResponse.prototype, "list", void 0);
        ListResponse = __decorate([
            json2typescript.JsonObject('ListResponse')
        ], ListResponse);
        return ListResponse;
    }());

    var ListsResponse = (function () {
        function ListsResponse() {
            this.lists = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('lists', [ListNodeInfo], false),
            __metadata("design:type", Array)
        ], ListsResponse.prototype, "lists", void 0);
        ListsResponse = __decorate([
            json2typescript.JsonObject('ListsResponse')
        ], ListsResponse);
        return ListsResponse;
    }());

    var OntologyInfoShort = (function () {
        function OntologyInfoShort() {
            this.ontologyIri = undefined;
            this.ontologyName = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('ontologyIri', String),
            __metadata("design:type", String)
        ], OntologyInfoShort.prototype, "ontologyIri", void 0);
        __decorate([
            json2typescript.JsonProperty('ontologyName', String),
            __metadata("design:type", String)
        ], OntologyInfoShort.prototype, "ontologyName", void 0);
        OntologyInfoShort = __decorate([
            json2typescript.JsonObject('OntologyInfoShort')
        ], OntologyInfoShort);
        return OntologyInfoShort;
    }());

    var PermissionData = (function () {
        function PermissionData() {
            this.groupsPerProject = undefined;
            this.administrativePermissionsPerProject = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('groupsPerProject', Object),
            __metadata("design:type", Object)
        ], PermissionData.prototype, "groupsPerProject", void 0);
        __decorate([
            json2typescript.JsonProperty('administrativePermissionsPerProject', Object),
            __metadata("design:type", Object)
        ], PermissionData.prototype, "administrativePermissionsPerProject", void 0);
        PermissionData = __decorate([
            json2typescript.JsonObject('PermissionData')
        ], PermissionData);
        return PermissionData;
    }());

    var User = (function () {
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
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], User.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('email', String),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            json2typescript.JsonProperty('password', String, true),
            __metadata("design:type", String)
        ], User.prototype, "password", void 0);
        __decorate([
            json2typescript.JsonProperty('token', String, true),
            __metadata("design:type", String)
        ], User.prototype, "token", void 0);
        __decorate([
            json2typescript.JsonProperty('givenName', String),
            __metadata("design:type", String)
        ], User.prototype, "givenName", void 0);
        __decorate([
            json2typescript.JsonProperty('familyName', String),
            __metadata("design:type", String)
        ], User.prototype, "familyName", void 0);
        __decorate([
            json2typescript.JsonProperty('status', Boolean),
            __metadata("design:type", Boolean)
        ], User.prototype, "status", void 0);
        __decorate([
            json2typescript.JsonProperty('lang', String),
            __metadata("design:type", String)
        ], User.prototype, "lang", void 0);
        __decorate([
            json2typescript.JsonProperty('groups', [Group]),
            __metadata("design:type", Array)
        ], User.prototype, "groups", void 0);
        __decorate([
            json2typescript.JsonProperty('projects', [Project]),
            __metadata("design:type", Array)
        ], User.prototype, "projects", void 0);
        __decorate([
            json2typescript.JsonProperty('sessionId', String, true),
            __metadata("design:type", String)
        ], User.prototype, "sessionId", void 0);
        __decorate([
            json2typescript.JsonProperty('permissions', PermissionData),
            __metadata("design:type", PermissionData)
        ], User.prototype, "permissions", void 0);
        __decorate([
            json2typescript.JsonProperty('systemAdmin', Boolean, true),
            __metadata("design:type", Boolean)
        ], User.prototype, "systemAdmin", void 0);
        User = __decorate([
            json2typescript.JsonObject('User')
        ], User);
        return User;
    }());

    var ProjectMembersResponse = (function () {
        function ProjectMembersResponse() {
            this.members = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('members', [User]),
            __metadata("design:type", Array)
        ], ProjectMembersResponse.prototype, "members", void 0);
        ProjectMembersResponse = __decorate([
            json2typescript.JsonObject('ProjectMembersResponse')
        ], ProjectMembersResponse);
        return ProjectMembersResponse;
    }());

    var ProjectResponse = (function () {
        function ProjectResponse() {
            this.project = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('project', Project),
            __metadata("design:type", Project)
        ], ProjectResponse.prototype, "project", void 0);
        ProjectResponse = __decorate([
            json2typescript.JsonObject('ProjectResponse')
        ], ProjectResponse);
        return ProjectResponse;
    }());

    var ProjectsResponse = (function () {
        function ProjectsResponse() {
            this.projects = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('projects', [Project]),
            __metadata("design:type", Array)
        ], ProjectsResponse.prototype, "projects", void 0);
        ProjectsResponse = __decorate([
            json2typescript.JsonObject('ProjectsResponse')
        ], ProjectsResponse);
        return ProjectsResponse;
    }());

    var CurrentUser = (function () {
        function CurrentUser() {
            this.name = undefined;
            this.jwt = undefined;
            this.lang = undefined;
            this.sysAdmin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('jwt', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "jwt", void 0);
        __decorate([
            json2typescript.JsonProperty('lang', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "lang", void 0);
        __decorate([
            json2typescript.JsonProperty('sysAdmin', Boolean),
            __metadata("design:type", Boolean)
        ], CurrentUser.prototype, "sysAdmin", void 0);
        CurrentUser = __decorate([
            json2typescript.JsonObject
        ], CurrentUser);
        return CurrentUser;
    }());

    var UsersResponse = (function () {
        function UsersResponse() {
            this.users = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('users', [User]),
            __metadata("design:type", Array)
        ], UsersResponse.prototype, "users", void 0);
        UsersResponse = __decorate([
            json2typescript.JsonObject('UsersResponse')
        ], UsersResponse);
        return UsersResponse;
    }());

    var UserResponse = (function () {
        function UserResponse() {
            this.user = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('user', User),
            __metadata("design:type", User)
        ], UserResponse.prototype, "user", void 0);
        UserResponse = __decorate([
            json2typescript.JsonObject('UserResponse')
        ], UserResponse);
        return UserResponse;
    }());

    /**
     * Abstract class representing a text value object with or without markup.
     */
    var ReadTextValue = (function () {
        function ReadTextValue() {
            this.type = KnoraConstants.TextValue;
        }
        return ReadTextValue;
    }());
    /**
     * Represents a text value object without markup (mere character string).
     */
    var ReadTextValueAsString = (function (_super) {
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
    var ReferredResourcesByStandoffLink = (function () {
        function ReferredResourcesByStandoffLink() {
        }
        return ReferredResourcesByStandoffLink;
    }());
    /**
     * Represents a text value object with markup that has been turned into HTML.
     */
    var ReadTextValueAsHtml = (function (_super) {
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
    var ReadTextValueAsXml = (function (_super) {
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
    var ReadDateValue = (function () {
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
    var ReadLinkValue = (function () {
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
    var ReadIntegerValue = (function () {
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
    var ReadDecimalValue = (function () {
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
    var ReadStillImageFileValue = (function () {
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
    var ReadTextFileValue = (function () {
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
    var ReadColorValue = (function () {
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
    var Point2D = (function () {
        function Point2D(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point2D;
    }());
    /**
     * Represents a geometry value parsed from JSON.
     */
    var RegionGeometry = (function () {
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
    var ReadGeomValue = (function () {
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
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return))
                        _c.call(_a);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
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
    var ReadUriValue = (function () {
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
    var ReadBooleanValue = (function () {
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
    var ReadIntervalValue = (function () {
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
    var ReadListValue = (function () {
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
    var ReadResource = (function () {
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
    var ReadResourcesSequence = (function () {
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
    var StillImageRepresentation = (function () {
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
    var ImageRegion = (function () {
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
    var KuiCoreModule = (function () {
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i1.HttpClientModule
                        ],
                        declarations: [],
                        exports: [
                            i1.HttpClientModule
                        ],
                        providers: [
                            { provide: 'config', useValue: ɵ0 }
                        ]
                    },] },
        ];
        return KuiCoreModule;
    }());

    var ApiService = (function () {
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
            return this.http.get(this.config.api + path, { observe: 'response', params: params }).pipe(operators.map(function (response) {
                _this.loading = false;
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
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
            return this.http.post(this.config.api + path, body, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
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
            return this.http.put(this.config.api + path, body, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                // console.log(response);
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
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
            return this.http.delete(this.config.api + path, { observe: 'response' }).pipe(operators.map(function (response) {
                _this.loading = false;
                // console.log(response);
                var result = new ApiServiceResult();
                result.status = response.status;
                result.statusText = response.statusText;
                result.url = path;
                result.body = response.body;
                return result;
            }), operators.catchError(function (error) {
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
            return throwError.throwError(serviceError);
        };
        /**
         * handle json error in case of type error in json response (json2typescript)
         *
         * @param error
         * @returns {Observable<ApiServiceError>}
         */
        ApiService.prototype.handleJsonError = function (error) {
            if (error instanceof ApiServiceError)
                return throwError.throwError(error);
            var serviceError = new ApiServiceError();
            serviceError.status = -1;
            serviceError.statusText = 'Invalid JSON';
            serviceError.errorInfo = error;
            serviceError.url = '';
            return throwError.throwError(serviceError);
        };
        ApiService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        /** @nocollapse */
        ApiService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ApiService, providedIn: "root" });
        return ApiService;
    }());

    var GroupsService = (function (_super) {
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
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(GroupsResponse).groups; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} iri
         * @returns {Observable<Group>}
         */
        GroupsService.prototype.getGroupByIri = function (iri) {
            this.path += '/' + encodeURIComponent(iri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(GroupResponse).group; }), operators.catchError(this.handleJsonError));
        };
        GroupsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        GroupsService.ngInjectableDef = i0.defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: GroupsService, providedIn: "root" });
        return GroupsService;
    }(ApiService));

    var ListsService = (function (_super) {
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
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListsResponse).lists; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} listIri
         * @returns {Observable<List>}
         */
        ListsService.prototype.getList = function (listIri) {
            return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} listIri
         * @returns {Observable<ListInfo>}
         */
        ListsService.prototype.getListInfo = function (listIri) {
            this.path += '/infos/' + encodeURIComponent(listIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} nodeIri
         * @returns {Observable<ListNodeInfo>}
         */
        ListsService.prototype.getListNodeInfo = function (nodeIri) {
            this.path += '/nodes/' + encodeURIComponent(nodeIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(this.path, payload).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(this.path, payload).pipe(operators.map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), operators.catchError(this.handleJsonError));
        };
        ListsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ListsService.ngInjectableDef = i0.defineInjectable({ factory: function ListsService_Factory() { return new ListsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ListsService, providedIn: "root" });
        return ListsService;
    }(ApiService));

    var ProjectsService = (function (_super) {
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
            return this.httpGet('/admin/projects').pipe(operators.map(function (result) { return result.getBody(ProjectsResponse).projects; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectMembersResponse).members; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpDelete(url).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
        };
        ProjectsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ProjectsService.ngInjectableDef = i0.defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ProjectsService, providedIn: "root" });
        return ProjectsService;
    }(ApiService));

    var UsersService = (function (_super) {
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
            return this.httpGet('/admin/users').pipe(operators.map(function (result) { return result.getBody(UsersResponse).users; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns {Observable<User>}
         */
        UsersService.prototype.addUserToProject = function (userIri, projectIri) {
            var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns {Observable<User>}
         */
        UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
            var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns {Observable<User>}
         */
        UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
            var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        /**
         *
         * @param {string} userIri
         * @param {string} projectIri
         * @returns {Observable<User>}
         */
        UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
            var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
        };
        UsersService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        UsersService.ngInjectableDef = i0.defineInjectable({ factory: function UsersService_Factory() { return new UsersService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: UsersService, providedIn: "root" });
        return UsersService;
    }(ApiService));

    var LanguageService = (function () {
        function LanguageService() {
            this.subject = new rxjs.Subject();
        }
        LanguageService.prototype.setLanguage = function (lang) {
            this.subject.next({ var: lang });
        };
        LanguageService.prototype.getLanguage = function () {
            return this.subject.asObservable();
        };
        LanguageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(); }, token: LanguageService, providedIn: "root" });
        return LanguageService;
    }());

    var StatusMsgService = (function () {
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
                .pipe(operators.map(function (res) {
                return res;
            }, function (err) {
                console.error(err);
            }));
        };
        StatusMsgService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        StatusMsgService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        StatusMsgService.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StatusMsgService, providedIn: "root" });
        return StatusMsgService;
    }());

    /**
     * Requests ontology information from Knora.
     */
    var OntologyService = (function (_super) {
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
                return rxjs.Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
            }
            var propertiesUriEnc = '';
            propertyIris.forEach(function (resClassIri) {
                propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
            });
            return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
        };
        OntologyService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: OntologyService, providedIn: "root" });
        return OntologyService;
    }(ApiService));

    var jsonld = require('jsonld');
    /**
     * Represents an error occurred in OntologyCacheService.
     */
    var OntologyCacheError = (function (_super) {
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
    var OntologyMetadata = (function () {
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
    (function (CardinalityOccurrence) {
        CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
        CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
        CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
    })(exports.CardinalityOccurrence || (exports.CardinalityOccurrence = {}));
    /**
     * Cardinality of a property for the given resource class.
     */
    var Cardinality = (function () {
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
    var ResourceClass = (function () {
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
    var ResourceClasses = (function () {
        function ResourceClasses() {
        }
        return ResourceClasses;
    }());
    /**
     * A property definition.
     */
    var Property = (function () {
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
    var Properties = (function () {
        function Properties() {
        }
        return Properties;
    }());
    /**
     * Groups resource classes by the ontology they are defined in.
     *
     * A map of ontology Iris to an array of resource class Iris.
     */
    var ResourceClassIrisForOntology = (function () {
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
    var OntologyCache = (function () {
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
    var OntologyInformation = (function () {
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
    var OntologyCacheService = (function () {
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
            return this._ontologyService.getOntologiesMetadata().pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                var ontPromise = ontPromises.compact(ontRes.body, {});
                // convert promise to Observable and return it
                // https://www.learnrxjs.io/operators/creation/frompromise.html
                return rxjs.from(ontPromise);
            }));
        };
        /**
         * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
         *
         * @param ontologyIri the Iri of the requested ontology.
         */
        OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
            return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld.promises;
                // compact JSON-LD using an empty context: expands all Iris
                var ontPromise = ontPromises.compact(ontRes.body, {});
                // convert promise to Observable and return it
                // https://www.learnrxjs.io/operators/creation/frompromise.html
                return rxjs.from(ontPromise);
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
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (classDefinitions_1_1 && !classDefinitions_1_1.done && (_a = classDefinitions_1.return))
                        _a.call(classDefinitions_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
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
            catch (e_2_1) {
                e_2 = { error: e_2_1 };
            }
            finally {
                try {
                    if (ontologyIris_1_1 && !ontologyIris_1_1.done && (_a = ontologyIris_1.return))
                        _a.call(ontologyIris_1);
                }
                finally {
                    if (e_2)
                        throw e_2.error;
                }
            }
            // get resource class definitions for all requested ontologies
            return this.getResourceClassDefinitions(allResourceClassIris).pipe(operators.map(function (resClassDefs) {
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
                                        newCard = new Cardinality(exports.CardinalityOccurrence.minCard, curCard[KnoraConstants.OwlMinCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    }
                                    else if (curCard[KnoraConstants.OwlCardinality] !== undefined) {
                                        newCard = new Cardinality(exports.CardinalityOccurrence.card, curCard[KnoraConstants.OwlCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    }
                                    else if (curCard[KnoraConstants.OwlMaxCardinality] !== undefined) {
                                        newCard = new Cardinality(exports.CardinalityOccurrence.maxCard, curCard[KnoraConstants.OwlMaxCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
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
                        catch (e_3_1) {
                            e_3 = { error: e_3_1 };
                        }
                        finally {
                            try {
                                if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_a = subclassOfCollection_1.return))
                                    _a.call(subclassOfCollection_1);
                            }
                            finally {
                                if (e_3)
                                    throw e_3.error;
                            }
                        }
                    }
                    var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                    // write this resource class definition to the cache object
                    this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
                }
            }
            catch (e_4_1) {
                e_4 = { error: e_4_1 };
            }
            finally {
                try {
                    if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_b = resourceClassDefinitions_1.return))
                        _b.call(resourceClassDefinitions_1);
                }
                finally {
                    if (e_4)
                        throw e_4.error;
                }
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
            return this.getPropertyDefinitions(propertyIris).pipe(operators.map(function (propDefs) {
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
            catch (e_5_1) {
                e_5 = { error: e_5_1 };
            }
            finally {
                try {
                    if (propertyDefinitionsFromKnora_1_1 && !propertyDefinitionsFromKnora_1_1.done && (_a = propertyDefinitionsFromKnora_1.return))
                        _a.call(propertyDefinitionsFromKnora_1);
                }
                finally {
                    if (e_5)
                        throw e_5.error;
                }
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
                return this.getOntologiesMetadataFromKnora().pipe(operators.map(function (metadata) {
                    _this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter(function (onto) {
                        // ignore excluded ontologies
                        return _this.excludedOntologies.indexOf(onto['@id']) === -1;
                    }));
                    return _this.getAllOntologiesMetadataFromCache();
                }));
            }
            else {
                // return metadata from cache
                return rxjs.of(this.getAllOntologiesMetadataFromCache());
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
                observables.push(_this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(operators.map(function (ontology) {
                    // write response to cache
                    _this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
                })));
            });
            // forkJoin returns an Observable of an array of results
            // returned by each Observable contained in `observables`
            // a subscription to the Observable returned by forkJoin is executed
            // once all Observables have been completed
            return rxjs.forkJoin(observables);
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
                return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(operators.mergeMap(function (results) {
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
                return this.getAndCacheOntologies(ontologyIris).pipe(operators.mergeMap(function (results) {
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
                return this.getAndCacheOntologies(ontologyIris).pipe(operators.map(function (results) {
                    if (results) {
                        return _this.getPropertyDefinitionsFromCache(propertyIris);
                    }
                    else {
                        throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                    }
                }));
            }
            else {
                return rxjs.of(this.getPropertyDefinitionsFromCache(propertyIris));
            }
        };
        OntologyCacheService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        OntologyCacheService.ctorParameters = function () {
            return [
                { type: OntologyService }
            ];
        };
        OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
        return OntologyCacheService;
    }());

    var ResourceService = (function (_super) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ResourceService, providedIn: "root" });
        return ResourceService;
    }(ApiService));

    var SearchService = (function (_super) {
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
            if (offset === void 0) {
                offset = 0;
            }
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: SearchService, providedIn: "root" });
        return SearchService;
    }(ApiService));

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
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (standoffLinkValues_1_1 && !standoffLinkValues_1_1.done && (_a = standoffLinkValues_1.return))
                                    _a.call(standoffLinkValues_1);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (standoffLinkValuesJSONLD_1_1 && !standoffLinkValuesJSONLD_1_1.done && (_a = standoffLinkValuesJSONLD_1.return))
                            _a.call(standoffLinkValuesJSONLD_1);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                        catch (e_3_1) {
                            e_3 = { error: e_3_1 };
                        }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return))
                                    _d.call(_b);
                            }
                            finally {
                                if (e_3)
                                    throw e_3.error;
                            }
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
            catch (e_4_1) {
                e_4 = { error: e_4_1 };
            }
            finally {
                try {
                    if (propNames_1_1 && !propNames_1_1.done && (_e = propNames_1.return))
                        _e.call(propNames_1);
                }
                finally {
                    if (e_4)
                        throw e_4.error;
                }
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
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (resourcesGraph_1_1 && !resourcesGraph_1_1.done && (_a = resourcesGraph_1.return))
                            _a.call(resourcesGraph_1);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
                        catch (e_6_1) {
                            e_6 = { error: e_6_1 };
                        }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return))
                                    _c.call(_a);
                            }
                            finally {
                                if (e_6)
                                    throw e_6.error;
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
            }
            catch (e_7_1) {
                e_7 = { error: e_7_1 };
            }
            finally {
                try {
                    if (propNames_2_1 && !propNames_2_1.done && (_d = propNames_2.return))
                        _d.call(propNames_2);
                }
                finally {
                    if (e_7)
                        throw e_7.error;
                }
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
                catch (e_8_1) {
                    e_8 = { error: e_8_1 };
                }
                finally {
                    try {
                        if (resourcesGraph_2_1 && !resourcesGraph_2_1.done && (_a = resourcesGraph_2.return))
                            _a.call(resourcesGraph_2);
                    }
                    finally {
                        if (e_8)
                            throw e_8.error;
                    }
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
    })(exports.ConvertJSONLD || (exports.ConvertJSONLD = {}));

    var IncomingService = (function (_super) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        IncomingService.ngInjectableDef = i0.defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: IncomingService, providedIn: "root" });
        return IncomingService;
    }(SearchService));

    /**
     * Represents teh parameters of an extended search.
     */
    var ExtendedSearchParams = (function () {
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
    var SearchParamsService = (function () {
        function SearchParamsService() {
            // init with a dummy function
            this.searchParamsMessage = new rxjs.BehaviorSubject(new ExtendedSearchParams(function (offset) { return ''; }));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        SearchParamsService.ctorParameters = function () { return []; };
        SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
        return SearchParamsService;
    }());

    /**
     * Represents an error that occurred when generating KnarQL.
     */
    var GravsearchGenerationError = (function (_super) {
        __extends(GravsearchGenerationError, _super);
        function GravsearchGenerationError(msg) {
            return _super.call(this, msg) || this;
        }
        return GravsearchGenerationError;
    }(Error));
    var GravsearchGenerationService = (function () {
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
            if (offset === void 0) {
                offset = 0;
            }
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
                    propValue = propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple);
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
                        filter = "FILTER regex(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ", \"i\")";
                    }
                    else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                        // use contains function for MATCH
                        filter = "FILTER <" + KnoraConstants.matchFunction + ">(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ")";
                    }
                    else {
                        filter = "FILTER(" + propValue + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(exports.KnoraSchema.simple) + ")";
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        GravsearchGenerationService.ctorParameters = function () {
            return [
                { type: SearchParamsService }
            ];
        };
        GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
        return GravsearchGenerationService;
    }());

    var StoreService = (function () {
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
                .pipe(operators.map(function (data) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        StoreService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StoreService, providedIn: "root" });
        return StoreService;
    }());

    var BasicOntologyService = (function (_super) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        BasicOntologyService.ngInjectableDef = i0.defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: BasicOntologyService, providedIn: "root" });
        return BasicOntologyService;
    }(ApiService));

    var ResourceTypesService = (function (_super) {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ResourceTypesService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ResourceTypesService, providedIn: "root" });
        return ResourceTypesService;
    }(ApiService));

    /**
     * main api services
     */

    var Equals = (function () {
        function Equals() {
            this.type = KnoraConstants.EqualsComparisonOperator;
            this.label = KnoraConstants.EqualsComparisonLabel;
        }
        Equals.prototype.getClassName = function () {
            return 'Equals';
        };
        return Equals;
    }());
    var NotEquals = (function () {
        function NotEquals() {
            this.type = KnoraConstants.NotEqualsComparisonOperator;
            this.label = KnoraConstants.NotEqualsComparisonLabel;
        }
        NotEquals.prototype.getClassName = function () {
            return 'NotEquals';
        };
        return NotEquals;
    }());
    var GreaterThanEquals = (function () {
        function GreaterThanEquals() {
            this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
            this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
        }
        GreaterThanEquals.prototype.getClassName = function () {
            return 'GreaterThanEquals';
        };
        return GreaterThanEquals;
    }());
    var GreaterThan = (function () {
        function GreaterThan() {
            this.type = KnoraConstants.GreaterThanComparisonOperator;
            this.label = KnoraConstants.GreaterThanComparisonLabel;
        }
        GreaterThan.prototype.getClassName = function () {
            return 'GreaterThan';
        };
        return GreaterThan;
    }());
    var LessThan = (function () {
        function LessThan() {
            this.type = KnoraConstants.LessThanComparisonOperator;
            this.label = KnoraConstants.LessThanComparisonLabel;
        }
        LessThan.prototype.getClassName = function () {
            return 'LessThan';
        };
        return LessThan;
    }());
    var LessThanEquals = (function () {
        function LessThanEquals() {
            this.type = KnoraConstants.LessThanEqualsComparisonOperator;
            this.label = KnoraConstants.LessThanQualsComparisonLabel;
        }
        LessThanEquals.prototype.getClassName = function () {
            return 'LessThanEquals';
        };
        return LessThanEquals;
    }());
    var Exists = (function () {
        function Exists() {
            this.type = KnoraConstants.ExistsComparisonOperator;
            this.label = KnoraConstants.ExistsComparisonLabel;
        }
        Exists.prototype.getClassName = function () {
            return 'Exists';
        };
        return Exists;
    }());
    var Like = (function () {
        function Like() {
            this.type = KnoraConstants.LikeComparisonOperator;
            this.label = KnoraConstants.LikeComparisonLabel;
        }
        Like.prototype.getClassName = function () {
            return 'Like';
        };
        return Like;
    }());
    var Match = (function () {
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
    var ComparisonOperatorAndValue = (function () {
        function ComparisonOperatorAndValue(comparisonOperator, value) {
            this.comparisonOperator = comparisonOperator;
            this.value = value;
        }
        return ComparisonOperatorAndValue;
    }());
    /**
     * Represents a property's value as a literal with the indication of its type.
     */
    var ValueLiteral = (function () {
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
            if (schema === exports.KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
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
    var IRI = (function () {
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
    var PropertyWithValue = (function () {
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

    exports.ɵa = KuiCoreConfig;
    exports.ɵb = Property;
    exports.KuiCoreModule = KuiCoreModule;
    exports.ɵ0 = ɵ0;
    exports.KuiCoreConfig = KuiCoreConfig;
    exports.ApiServiceResult = ApiServiceResult;
    exports.ApiServiceError = ApiServiceError;
    exports.Utils = Utils;
    exports.KnoraConstants = KnoraConstants;
    exports.StringLiteral = StringLiteral;
    exports.DateSalsah = DateSalsah;
    exports.DateRangeSalsah = DateRangeSalsah;
    exports.AuthenticationResponse = AuthenticationResponse;
    exports.Group = Group;
    exports.GroupResponse = GroupResponse;
    exports.GroupsResponse = GroupsResponse;
    exports.List = List;
    exports.ListInfo = ListInfo;
    exports.ListInfoResponse = ListInfoResponse;
    exports.ListNode = ListNode;
    exports.ListNodeInfo = ListNodeInfo;
    exports.ListNodeInfoResponse = ListNodeInfoResponse;
    exports.ListResponse = ListResponse;
    exports.ListsResponse = ListsResponse;
    exports.OntologyInfoShort = OntologyInfoShort;
    exports.PermissionData = PermissionData;
    exports.Project = Project;
    exports.ProjectMembersResponse = ProjectMembersResponse;
    exports.ProjectResponse = ProjectResponse;
    exports.ProjectsResponse = ProjectsResponse;
    exports.CurrentUser = CurrentUser;
    exports.UsersResponse = UsersResponse;
    exports.UserResponse = UserResponse;
    exports.User = User;
    exports.ReadTextValue = ReadTextValue;
    exports.ReadTextValueAsString = ReadTextValueAsString;
    exports.ReferredResourcesByStandoffLink = ReferredResourcesByStandoffLink;
    exports.ReadTextValueAsHtml = ReadTextValueAsHtml;
    exports.ReadTextValueAsXml = ReadTextValueAsXml;
    exports.ReadDateValue = ReadDateValue;
    exports.ReadLinkValue = ReadLinkValue;
    exports.ReadIntegerValue = ReadIntegerValue;
    exports.ReadDecimalValue = ReadDecimalValue;
    exports.ReadStillImageFileValue = ReadStillImageFileValue;
    exports.ReadTextFileValue = ReadTextFileValue;
    exports.ReadColorValue = ReadColorValue;
    exports.Point2D = Point2D;
    exports.RegionGeometry = RegionGeometry;
    exports.ReadGeomValue = ReadGeomValue;
    exports.ReadUriValue = ReadUriValue;
    exports.ReadBooleanValue = ReadBooleanValue;
    exports.ReadIntervalValue = ReadIntervalValue;
    exports.ReadListValue = ReadListValue;
    exports.ReadResource = ReadResource;
    exports.ReadResourcesSequence = ReadResourcesSequence;
    exports.StillImageRepresentation = StillImageRepresentation;
    exports.ImageRegion = ImageRegion;
    exports.Equals = Equals;
    exports.NotEquals = NotEquals;
    exports.GreaterThanEquals = GreaterThanEquals;
    exports.GreaterThan = GreaterThan;
    exports.LessThan = LessThan;
    exports.LessThanEquals = LessThanEquals;
    exports.Exists = Exists;
    exports.Like = Like;
    exports.Match = Match;
    exports.ComparisonOperatorAndValue = ComparisonOperatorAndValue;
    exports.ValueLiteral = ValueLiteral;
    exports.IRI = IRI;
    exports.PropertyWithValue = PropertyWithValue;
    exports.ApiService = ApiService;
    exports.GroupsService = GroupsService;
    exports.ListsService = ListsService;
    exports.ProjectsService = ProjectsService;
    exports.UsersService = UsersService;
    exports.LanguageService = LanguageService;
    exports.StatusMsgService = StatusMsgService;
    exports.OntologyService = OntologyService;
    exports.OntologyMetadata = OntologyMetadata;
    exports.Cardinality = Cardinality;
    exports.ResourceClass = ResourceClass;
    exports.ResourceClasses = ResourceClasses;
    exports.Property = Property;
    exports.Properties = Properties;
    exports.ResourceClassIrisForOntology = ResourceClassIrisForOntology;
    exports.OntologyInformation = OntologyInformation;
    exports.OntologyCacheService = OntologyCacheService;
    exports.ResourceService = ResourceService;
    exports.SearchService = SearchService;
    exports.IncomingService = IncomingService;
    exports.ExtendedSearchParams = ExtendedSearchParams;
    exports.SearchParamsService = SearchParamsService;
    exports.GravsearchGenerationService = GravsearchGenerationService;
    exports.StoreService = StoreService;
    exports.BasicOntologyService = BasicOntologyService;
    exports.ResourceTypesService = ResourceTypesService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vdXNlcnMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2NvbnZlcnQtanNvbmxkLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvaW5jb21pbmcuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9pbmRleC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9rbm9yYS1jb3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBLbm9yYS11aSBjb3JlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgc2VydmVyIGRlZmluaXRpb25zIG9mOlxuICogIC0gYXBpOiBVUkwgb2YgZGF0YSBzZXJ2aWNlIGUuZy4ga25vcmE6IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzM1xuICogIC0gbWVkaWE6IFVSTCBvZiBtZWRpYSBzZXJ2ZXIgc2VydmljZSBlLmcuIHNpcGk6IGh0dHA6Ly9sb2NhbGhvc3Q6MTAyNFxuICogIC0gYXBwOiBVUkwgb2YgdGhlIGFwcCBlLmcuIHNhbHNhaDogaHR0cDovL2xvY2FsaG9zdDo0MjAwXG4gKi9cbkBKc29uT2JqZWN0KCdLdWlDb3JlQ29uZmlnJylcbmV4cG9ydCBjbGFzcyBLdWlDb3JlQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIChTYWxzYWgpIG5hbWUgb2YgdGhlIGFwcFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogKGtub3JhKSB1cmwgb2YgdGhlIGFwaVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcGk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChzaXBpKSB1cmwgb2YgbWVkaWEvZmlsZSBzZXJ2ZXJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ21lZGlhJywgU3RyaW5nKVxuICAgIHB1YmxpYyBtZWRpYTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogKHNhbHNhaCkgdXJsIG9mIHRoZSBhcHBcbiAgICAgKiBAdHlwZSB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwcCcsIFN0cmluZylcbiAgICBwdWJsaWMgYXBwOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG59XG4iLCJcbmltcG9ydCB7IEpzb25Db252ZXJ0LCBPcGVyYXRpb25Nb2RlLCBWYWx1ZUNoZWNraW5nTW9kZSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogUmVzdWx0IGNsYXNzIHVzZWQgYXMgQVBJIHVybCByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVzdWx0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGpzb25Db252ZXJ0OiBKc29uQ29udmVydCA9IG5ldyBKc29uQ29udmVydChPcGVyYXRpb25Nb2RlLkVOQUJMRSwgVmFsdWVDaGVja2luZ01vZGUuQUxMT1dfTlVMTCk7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBhcyBKU09OXG4gICAgICovXG4gICAgYm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzdWx0IGJvZHkgYXMgaW5zdGFuY2Ugb2YgY2xhc3NPYmplY3QuXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAdGhyb3dzXG4gICAgICovXG5cbiAgICBnZXRCb2R5KGNsYXNzT2JqZWN0PzogeyBuZXcoKTogYW55IH0pOiBhbnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJvZHkpO1xuICAgICAgICByZXR1cm4gQXBpU2VydmljZVJlc3VsdC5qc29uQ29udmVydC5kZXNlcmlhbGl6ZSh0aGlzLmJvZHksIGNsYXNzT2JqZWN0KTtcbiAgICB9XG5cblxufVxuIiwiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBlcnJvciBpbmZvXG4gICAgICovXG4gICAgZXJyb3JJbmZvID0gJyc7XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBLbm9yYUNvbnN0YW50cyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpOiBzdHJpbmcgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpJztcbiAgICBwdWJsaWMgc3RhdGljIFBhdGhTZXBhcmF0b3IgPSAnIyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhT250b2xvZ3lQYXRoOiBzdHJpbmcgPSAnaHR0cDovL3d3dy5rbm9yYS5vcmcvb250b2xvZ3knO1xuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFCYXNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYU9udG9sb2d5UGF0aCArICcva25vcmEtYmFzZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN5c3RlbVByb2plY3RJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjU3lzdGVtUHJvamVjdCc7XG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1BZG1pbkdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbUFkbWluJztcbiAgICBwdWJsaWMgc3RhdGljIFByb2plY3RBZG1pbkdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RBZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0TWVtYmVyR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjUHJvamVjdE1lbWJlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaSArICcvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpVjJTaW1wbGVQYXRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaSArICcvc2ltcGxlL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG5cbiAgICBwdWJsaWMgc3RhdGljIFNhbHNhaEd1aU9udG9sb2d5ID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3NhbHNhaC1ndWkvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPcmRlciA9IEtub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5ICsgJyNndWlPcmRlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN0YW5kb2ZmT250b2xvZ3kgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kvc3RhbmRvZmYvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdUZXh0VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSW50VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ludFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEJvb2xlYW5WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFVyaVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdVcmlWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEZWNpbWFsVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RlY2ltYWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEYXRlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RhdGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBDb2xvclZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdDb2xvclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb21WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3RWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlzdFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludGVydmFsVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlua1ZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgR2VvbmFtZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdHZW9uYW1lVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQXVkaW9GaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0F1ZGlvRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEREREZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRERERmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERvY3VtZW50RmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEb2N1bWVudEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdTdGlsbEltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIE1vdmluZ0ltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBUZXh0RmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIElzUmVzb3VyY2VDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNSZXNvdXJjZUNsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIElzVmFsdWVDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNWYWx1ZUNsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIEZvcmJpZGRlblJlc291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdGb3JiaWRkZW5SZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBYTUxUb1N0YW5kb2ZmTWFwcGluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnWE1MVG9TdGFuZG9mZk1hcHBpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlzdE5vZGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3ROb2RlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0VHlwZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ29iamVjdFR5cGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2VJY29uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdyZXNvdXJjZUljb24nO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNFZGl0YWJsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNFZGl0YWJsZSc7XG4gICAgcHVibGljIHN0YXRpYyBpc0xpbmtQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rVmFsdWVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rVmFsdWVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNHZW9tZXRyeSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc0dlb21ldHJ5JztcblxuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTmFtZSA9ICdodHRwOi8vc2NoZW1hLm9yZy9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU51bWJlck9mSXRlbXMgPSAnaHR0cDovL3NjaGVtYS5vcmcvbnVtYmVyT2ZJdGVtcyc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFJdGVtTGlzdEVsZW1lbnQgPSAnaHR0cDovL3NjaGVtYS5vcmcvaXRlbUxpc3RFbGVtZW50JztcblxuXG4gICAgcHVibGljIHN0YXRpYyBSZGZQcm9wZXJ0eTogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyNQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzTGFiZWwgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2xhYmVsJztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNDb21tZW50ID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNjb21tZW50JztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNTdWJjbGFzc09mID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNzdWJDbGFzc09mJztcbiAgICBwdWJsaWMgc3RhdGljIHN1YlByb3BlcnR5T2Y6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjc3ViUHJvcGVydHlPZic7XG5cbiAgICBwdWJsaWMgc3RhdGljIG93bDogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT2JqZWN0UHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjT2JqZWN0UHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsRGF0YXR5cGVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNEYXRhdHlwZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bEFubm90YXRpb25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNBbm5vdGF0aW9uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1heENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21heENhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1pbkNhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21pbkNhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI2NhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bFJlc3RyaWN0aW9uID0gS25vcmFDb25zdGFudHMub3dsICsgJyNSZXN0cmljdGlvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0aW9uRGF0ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NyZWF0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBsYXN0TW9kaWZpY2F0aW9uRGF0ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xhc3RNb2RpZmljYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGhhc1Blcm1pc3Npb25zID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzUGVybWlzc2lvbnMnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1Byb2plY3QgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvUHJvamVjdCc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvVXNlciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Vc2VyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVnaW9uID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnUmVnaW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzU3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1htbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGF0ZVZhbHVlOiBzdHJpbmcgPSAnUmVhZERhdGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlua1ZhbHVlOiBzdHJpbmcgPSAnUmVhZExpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZWdlclZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVnZXJWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSAnUmVhZERlY2ltYWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0RmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFRleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEdlb21WYWx1ZTogc3RyaW5nID0gJ1JlYWRHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZENvbG9yVmFsdWU6IHN0cmluZyA9ICdSZWFkQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVXJpVmFsdWU6IHN0cmluZyA9ICdSZWFkVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEJvb2xlYW5WYWx1ZTogc3RyaW5nID0gJ1JlYWRCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVydmFsVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlzdFZhbHVlOiBzdHJpbmcgPSAnUmVhZExpc3RWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlQXNTdHJpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3ZhbHVlQXNTdHJpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc1htbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlSGFzTWFwcGluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUhhc01hcHBpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRZZWFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kWWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kWWVhcic7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kRXJhOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRNb250aCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0TW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kTW9udGggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRNb250aCc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydERheSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RGF5JztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZERheSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNDYWxlbmRhciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0NhbGVuZGFyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0JztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1NvdXJjZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2VJcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2VJcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0SXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0SXJpJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZWdlclZhbHVlQXNJbnRlZ2VyID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50VmFsdWVBc0ludCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlY2ltYWxWYWx1ZUFzRGVjaW1hbCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RlY2ltYWxWYWx1ZUFzRGVjaW1hbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUFzVXJsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlQXNVcmwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlSXNQcmV2aWV3ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSXNQcmV2aWV3JztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUhhc0ZpbGVuYW1lID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSGFzRmlsZW5hbWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGlsbEltYWdlRmlsZVZhbHVlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVgnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWSc7XG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb2xvclZhbHVlQXNDb2xvciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NvbG9yVmFsdWVBc0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnknO1xuICAgIHB1YmxpYyBzdGF0aWMgdXJpVmFsdWVBc1VyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3VyaVZhbHVlQXNVcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgYm9vbGVhblZhbHVlQXNCb29sZWFuID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYm9vbGVhblZhbHVlQXNCb29sZWFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0JztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNFbmQgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzRW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgWHNkID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHhzZFN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdzdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkQm9vbGVhbiA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdib29sZWFuJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEludGVnZXIgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnaW50ZWdlcic7XG4gICAgcHVibGljIHN0YXRpYyB4c2REZWNpbWFsID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2RlY2ltYWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkVXJpID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2FueVVSSSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlc291cmNlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0RhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdJbnRlcnZhbCc7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbSc7XG4gICAgcHVibGljIHN0YXRpYyBjb2xvclNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb25hbWVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdHZW9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdGaWxlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbWF0Y2hGdW5jdGlvbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ21hdGNoJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJz0nO1xuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJyE9JztcbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBub3QgZXF1YWwgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvciA9ICc+JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGdyZWF0ZXIgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJz49JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGdyZWF0ZXIgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvciA9ICc8JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxlc3MgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJzw9JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgbGVzcyB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25PcGVyYXRvciA9ICdFJztcbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25MYWJlbCA9ICdleGlzdHMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbk9wZXJhdG9yID0gJ3JlZ2V4JztcbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uTGFiZWwgPSAnaXMgbGlrZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yID0gJ2NvbnRhaW5zJztcbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbkxhYmVsID0gJ21hdGNoZXMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhMaW5rID0gJ3NhbHNhaC1saW5rJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCA8YT4gZWxlbWVudCB0aGF0IGluZGljYXRlcyBhIGxpbmsgdG8gYSBLbm9yYSByZXNvdXJjZVxuICAgIHB1YmxpYyBzdGF0aWMgUmVmTWFya2VyID0gJ3JlZi1tYXJrZXInOyAvLyBjbGFzcyBvbiBhbiBIVE1MIGVsZW1lbnQgdGhhdCByZWZlcnMgdG8gYW5vdGhlciBlbGVtZW50IGluIHRoZSBzYW1lIGRvY3VtZW50XG5cbiAgICBwdWJsaWMgc3RhdGljIEdORFByZWZpeCA9ICcoREUtNTg4KSc7XG4gICAgcHVibGljIHN0YXRpYyBHTkRSZXNvbHZlciA9ICdodHRwOi8vZC1uYi5pbmZvL2duZC8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBWSUFGUHJlZml4ID0gJyhWSUFGKSc7XG4gICAgcHVibGljIHN0YXRpYyBWSUFGUmVzb2x2ZXIgPSAnaHR0cHM6Ly92aWFmLm9yZy92aWFmLyc7XG5cbn1cblxuXG5leHBvcnQgZW51bSBLbm9yYVNjaGVtYSB7XG4gICAgY29tcGxleCA9IDAsXG4gICAgc2ltcGxlID0gMVxufVxuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHtLbm9yYUNvbnN0YW50c30gZnJvbSAnLi9hcGkva25vcmEtY29uc3RhbnRzJztcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBFbWFpbHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhFbWFpbCA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVSTHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVcmwgPSAvXihodHRwOlxcL1xcL3d3d1xcLnxodHRwczpcXC9cXC93d3dcXC58aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvKT9bYS16MC05XSsoW1xcLVxcLl17MX1bYS16MC05XSspKlxcLlthLXpdezIsNn0oOlswLTldezEsNX0pPyhcXC8uKik/JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBQYXNzd29yZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFBhc3N3b3JkID0gL14oPz0uKlxcZCkoPz0uKlthLXpBLVpdKS57OCx9JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBIZXhhZGVjaW1hbCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEhleCA9IC9eWzAtOUEtRmEtZl0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIHNob3J0bmFtZSBpbiBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4U2hvcnRuYW1lID0gL15bYS16QS1aXStcXFMqJC87XG5cblxuICAgIC8qKlxuICAgICAqIExhbWJkYSBmdW5jdGlvbiBlbGltaW5hdGluZyBkdXBsaWNhdGVzIGluIGEgY29sbGVjdGlvbiB0byBiZSBwYXNzZWQgdG8gW1tmaWx0ZXJdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtIGVsZW1lbnQgb2YgYW4gQXJyYXkgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbG9va2VkIGF0LlxuICAgICAqIEBwYXJhbSBpbmRleCBjdXJyZW50IGVsZW1lbnRzIGluZGV4LlxuICAgICAqIEBwYXJhbSBzZWxmIHJlZmVyZW5jZSB0byB0aGUgd2hvbGUgQXJyYXkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNhbWUgZWxlbWVudCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IGluIHRoZSBBcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlck91dER1cGxpY2F0ZXMgPSAoZWxlbSwgaW5kZXg6IG51bWJlciwgc2VsZikgPT4ge1xuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzQ3Nzk4L2RlbGV0ZS1kdXBsaWNhdGUtZWxlbWVudHMtZnJvbS1hbi1hcnJheVxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXI/dj1leGFtcGxlXG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50J3MgaW5kZXggZXF1YWxzIHRoZSBpbmRleCBvZiB0aGUgbGVmdG1vc3QgZWxlbWVudFxuICAgICAgICAvLyAtPiB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgaXMgbm8gaWRlbnRpY2FsIGVsZW1lbnQgYmVmb3JlIHRoaXMgaW5kZXgsIGhlbmNlIGl0IGlzIG5vdCBhIGR1cGxpY2F0ZVxuICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGVsZW1lbnRzLCBmYWxzZSBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHNlbGYuaW5kZXhPZihlbGVtKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBLbm9yYSBlbnRpdHkgSVJJLCBnZXRzIHRoZSBvbnRvbG9neSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50aXR5SXJpIGFuIGVudGl0eSBJcmkuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgb250b2xvZ3kgSVJJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkoZW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBjbGFzcyBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gZW50aXR5SXJpLnNwbGl0KEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2VudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXgga25vcmEtYXBpIGVudGl0eSBJcmkgdG8gYSBrbm9yYS1hcGkgc2ltcGxlIGVudGl0eSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleEVudGl0eUlyaVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUoY29tcGxleEVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgZW50aXR5IElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBjb21wbGV4RW50aXR5SXJpLnNwbGl0KCd2MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtjb21wbGV4RW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIC8vIGFkZCAnc2ltcGxlJyB0byBiYXNlIHBhdGhcbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdICsgJ3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yICsgc2VnbWVudHNbMV07XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1N0cmluZ0xpdGVyYWwnKVxuZXhwb3J0IGNsYXNzIFN0cmluZ0xpdGVyYWwge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndmFsdWUnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZ3VhZ2UnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmd1YWdlOiBzdHJpbmcgPSAnJztcbn1cbiIsIi8qKlxuICogUHJlY2lzaW9uIGZvciBEYXRlU2Fsc2FoLlxuICovXG5leHBvcnQgZW51bSBQcmVjaXNpb24ge1xuICAgIHllYXJQcmVjaXNpb24sXG4gICAgbW9udGhQcmVjaXNpb24sXG4gICAgZGF5UHJlY2lzaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFNhbHNhaCBkYXRlIG9iamVjdCB3aXRoIGEgcHJlY2lzaW9uIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVNhbHNhaCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXBhcmF0b3IgPSAnLSc7XG5cbiAgICByZWFkb25seSBwcmVjaXNpb246IFByZWNpc2lvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgeWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBtb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGF5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHllYXIgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG1vbnRoIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXkgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5kYXlQcmVjaXNpb247XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgd2l0aG91dCB0aGUgY2FsZW5kYXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpIHtcblxuICAgICAgICBsZXQgZGF0ZVN0cmluZyA9ICcoJyArIHRoaXMuZXJhICsgJykgJztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlY2lzaW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLnllYXJQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5tb250aFByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5kYXlQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aCArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5kYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSAod2l0aCBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyICsgJzonICsgdGhpcy5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGVyaW9kICh3aXRoIHN0YXJ0IGRhdGUgYW5kIGVuZCBkYXRlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVSYW5nZVNhbHNhaCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgc3RhcnQ6IERhdGVTYWxzYWgsXG4gICAgICAgIHJlYWRvbmx5IGVuZDogRGF0ZVNhbHNhaFxuICAgICkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgcmFuZ2UgKHdpdGggcHJlY2VkaW5nIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydC5nZXREYXRlQXNTdHJpbmcoKSArICc6JyArIHRoaXMuZW5kLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdBdXRoZW50aWNhdGlvblJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3QnKVxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydG5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHNob3J0bmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRjb2RlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzaG9ydGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvbmduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb25nbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBTdHJpbmdMaXRlcmFsW10gPSBbbmV3IFN0cmluZ0xpdGVyYWwoKV07XG5cbiAgICBASnNvblByb3BlcnR5KCdrZXl3b3JkcycsIFtTdHJpbmddLCB0cnVlKVxuICAgIHB1YmxpYyBrZXl3b3Jkczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb2dvJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpbnN0aXR1dGlvbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgaW5zdGl0dXRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2dpZXMnLCBbU3RyaW5nXSlcbiAgICBwdWJsaWMgb250b2xvZ2llczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXAnKVxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBTdHJpbmcpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdCwgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3VwUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3VwUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXAnLCBHcm91cClcbiAgICBwdWJsaWMgZ3JvdXA6IEdyb3VwID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3Vwc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsZXZlbCcsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuaW1wb3J0IHsgTGlzdE5vZGUgfSBmcm9tICcuL2xpc3Qtbm9kZSc7XG5cbkBKc29uT2JqZWN0KCdMaXN0JylcbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIGZhbHNlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25vZGVpbmZvJywgTGlzdE5vZGVJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbm9kZWluZm86IExpc3ROb2RlSW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0JywgTGlzdCwgZmFsc2UpXG4gICAgcHVibGljIGxpc3Q6IExpc3QgPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0cycsIFtMaXN0Tm9kZUluZm9dLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdHM6IExpc3ROb2RlSW5mb1tdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdPbnRvbG9neUluZm9TaG9ydCcpXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvU2hvcnQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lJcmknLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnUGVybWlzc2lvbkRhdGEnKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EYXRhIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3Vwc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGdyb3Vwc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2FkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vZ3JvdXBzL2dyb3VwJztcbmltcG9ydCB7IFBlcm1pc3Npb25EYXRhIH0gZnJvbSAnLi4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1VzZXInKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdlbWFpbCcsIFN0cmluZylcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bhc3N3b3JkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdnaXZlbk5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGdpdmVuTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZmFtaWx5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZmFtaWx5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZylcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZXNzaW9uSWQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGVybWlzc2lvbnMnLCBQZXJtaXNzaW9uRGF0YSlcbiAgICBwdWJsaWMgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzdGVtQWRtaW4nLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBzeXN0ZW1BZG1pbj86IGJvb2xlYW4gPSBmYWxzZTtcblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdE1lbWJlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdE1lbWJlcnNSZXNwb25zZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVtYmVycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgbWVtYmVyczogVXNlcltdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdClcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3RcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdqd3QnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGp3dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzQWRtaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzeXNBZG1pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlcnNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlclJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2VyUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcicsIFVzZXIpXG4gICAgcHVibGljIHVzZXI6IFVzZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVJhbmdlU2Fsc2FoLCBEYXRlU2Fsc2FoIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RhdGUnO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYW55IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyBJcmkuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvYmplY3QncyB0eXBlLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBwb2ludGluZyB0byB0aGUgdmFsdWUgb2JqZWN0LlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGlzIGludGVyZmFjZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIGFzIGEgc3RyaW5nIChjb21wbGV4aXR5IG9mIHRoZSB2YWx1ZSBwb3NzaWJseSByZWR1Y2VkKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50aW5nIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBvciB3aXRob3V0IG1hcmt1cC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlYWRUZXh0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGhvdXQgbWFya3VwIChtZXJlIGNoYXJhY3RlciBzdHJpbmcpLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBzdHI6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyByZXNvdXJjZXMgcmVmZXJyZWQgdG8gYnkgc3RhbmRvZmYgbGlua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlYWRSZXNvdXJjZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgdGhhdCBoYXMgYmVlbiB0dXJuZWQgaW50byBIVE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzSHRtbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaHRtbDogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluaykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgYSByZXNvdXJjZSByZWZlcnJlZCB0byBieSBhIHN0YW5kb2ZmIGxpbmsgZnJvbSBhIHRleHQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UuXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gb250b2xvZ3kgaW5mb3JtYXRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlJ3MgY2xhc3MgYW5kIGl0cyBsYWJlbC5cbiAgICAgKi9cblxuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ocmVzb3VyY2VJcmk6IHN0cmluZywgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2VzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdubyBpbmZvcm1hdGlvbiBmb3VuZCBhYm91dCByZWZlcnJlZCByZXNvdXJjZSAodGFyZ2V0IG9mIHN0YW5kb2ZmIGxpbmspJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIGFzIFhNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1htbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgeG1sOiBzdHJpbmcsIHJlYWRvbmx5IG1hcHBpbmdJcmk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhtbDtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREYXRlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kWWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlbmRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kTW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RGF5PzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmREYXk/OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICBnZXREYXRlU2Fsc2FoKCk6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWgge1xuICAgICAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHRoaXMuZW5kWWVhciAmJiB0aGlzLnN0YXJ0TW9udGggPT09IHRoaXMuZW5kTW9udGggJiYgdGhpcy5zdGFydERheSA9PT0gdGhpcy5lbmREYXkgJiYgdGhpcy5zdGFydEVyYSA9PT0gdGhpcy5lbmRFcmEpIHtcbiAgICAgICAgICAgIC8vIHByZWNpc2UgZGF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF0ZSBwZXJpb2RcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlU2Fsc2FoKG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpLCBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLmVuZEVyYSwgdGhpcy5lbmRZZWFyLCB0aGlzLmVuZE1vbnRoLCB0aGlzLmVuZERheSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVNhbHNhaCgpLmdldERhdGVBc1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluayB2YWx1ZSBvYmplY3QgKHJlaWZpY2F0aW9uKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaW5rVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZT86IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTtcblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpbmtWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZWdlclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBpbnRlZ2VyOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVnZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRlY2ltYWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERlY2ltYWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgZGVjaW1hbDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0aWxsIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHJlcHJlc2VudGF0aW9uIHZhbHVlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHRleHRGaWxlbmFtZTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZVVSTDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEZpbGVVUkw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbG9yIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRDb2xvclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBjb2xvckhleDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ySGV4O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gYSAyRC1jb29yZGluYXRlIHN5c3RlbSAoZm9yIGdlb21ldHJ5IHZhbHVlcykuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludDJEIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0dXM6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVDb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50MkRbXSxcbiAgICAgICAgcHVibGljIHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJhZGl1cz86IFBvaW50MkRcbiAgICApIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEdlb21WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9tZXRyeVN0cmluZztcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVSSSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVXJpVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGJvb2w6IGJvb2xlYW4pIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbC50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVydmFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZXJ2YWxTdGFydDogbnVtYmVyLCByZWFkb25seSBpbnRlcnZhbEVuZDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxTdGFydC50b1N0cmluZygpICsgJy0nICsgdGhpcy5pbnRlcnZhbEVuZDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVMYWJlbDogc3RyaW5nLCApIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVMYWJlbDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uL3N0aWxsLWltYWdlL3N0aWxsLWltYWdlLXJlcHJlc2VudGF0aW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSByZXNvdXJjZSdzIElyaS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgcmVzb3VyY2UncyB0eXBlIChjbGFzcykuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIHRoZSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1JlZ2lvbnMgcmVnaW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nTGlua3MgcmVzb3VyY2VzIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdfSBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ICBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgdG8gYmUgZGlzcGxheWVkIGZvciB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtSZWFkUHJvcGVydGllc30gcHJvcGVydGllcyB0aGUgcmVzb3VyY2VzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdSZWdpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdMaW5rczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXk6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVydGllcz86IFJlYWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuL3JlYWQtcmVzb3VyY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEltYWdlUmVnaW9uIH0gZnJvbSAnLi9pbWFnZS1yZWdpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW1hZ2UgaW5jbHVkaW5nIGl0cyByZWdpb25zLlxuICovXG5cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlfSBzdGlsbEltYWdlRmlsZVZhbHVlIGEgW1tSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZV1dIHJlcHJlc2VudGluZyBhbiBpbWFnZS5cbiAgICAgKiBAcGFyYW0ge0ltYWdlUmVnaW9uW119IHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgcmVhZG9ubHkgcmVnaW9uczogSW1hZ2VSZWdpb25bXSkge1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkR2VvbVZhbHVlLCBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWdpb24uXG4gKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgcmVzb3VyY2UgcmVwcmVzZW50aW5nIHRoZSByZWdpb24gYW5kIGl0cyBnZW9tZXRyaWVzLlxuICovXG5cbmV4cG9ydCBjbGFzcyBJbWFnZVJlZ2lvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFJlc291cmNlfSByZWdpb25SZXNvdXJjZSBhIHJlc291cmNlIG9mIHR5cGUgUmVnaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UmVhZEdlb21WYWx1ZVtdfVxuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi9kZWNsYXJhdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IEt1aUNvcmVDb25maWd9XG4gICAgXVxufSlcblxuXG5leHBvcnQgY2xhc3MgS3VpQ29yZU1vZHVsZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0t1aUNvcmVDb25maWd9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgICAqL1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogS3VpQ29yZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICAvLyBnZXQgdGhlIGFwcCBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGhlcmVcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBLdWlDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCwgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiAgaWYgaXMgbG9hZGluZywgc2V0IGl0IHRydWU7XG4gICAgICogIGl0IGNhbiBiZSB1c2VkIGluIGNvbXBvbmVudHNcbiAgICAgKiAgZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgICovXG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cEdldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCB7IG9ic2VydmU6ICdyZXNwb25zZScsIHBhcmFtczogcGFyYW1zIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0gYm9keVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBVVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0gYm9keVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgaHR0cFB1dChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCBib2R5LCB7IG9ic2VydmU6ICdyZXNwb25zZScgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBERUxFVEVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBodHRwRGVsZXRlKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZUVycm9yPn1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2dyb3Vwcyc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEdyb3VwW10+fVxuICAgICAqL1xuICAgIGdldEFsbEdyb3VwcygpOiBPYnNlcnZhYmxlPEdyb3VwW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEdyb3VwPn1cbiAgICAgKi9cbiAgICBnZXRHcm91cEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cD4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBSZXNwb25zZSkuZ3JvdXApLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaSAob3B0aW9uYWwpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+fVxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdD59XG4gICAgICovXG4gICAgZ2V0TGlzdChsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGggKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3RJbmZvPn1cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbm9kZUlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz59XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdD59XG4gICAgICovXG4gICAgY3JlYXRlTGlzdChwYXlsb2FkOiBMaXN0Q3JlYXRlUGF5bG9hZCk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0SW5mb1VwZGF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0SW5mbz59XG4gICAgICovXG4gICAgdXBkYXRlTGlzdEluZm8ocGF5bG9hZDogTGlzdEluZm9VcGRhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWQubGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFByb2plY3QsIFByb2plY3RNZW1iZXJzUmVzcG9uc2UsIFByb2plY3RSZXNwb25zZSwgUHJvamVjdHNSZXNwb25zZSwgVXNlciB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBsaXN0IG9mIGFsbCBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdFtdPn1cbiAgICAgKi9cbiAgICBnZXRBbGxQcm9qZWN0cygpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vcHJvamVjdHMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RzUmVzcG9uc2UpLnByb2plY3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIHByb2plY3Qgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcHJvamVjdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcHJvamVjdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IHJldHJpZXZhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYWxsIHByb2plY3QgbWVtYmVyc1xuICAgICAqIHByb2plY3QgaWRlbnRpZmllciBpcyBwcm9qZWN0IGlkIChpcmkpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnNcbiAgICAgKiBwcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRuYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRuYW1lXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnNcbiAgICAgKiBwcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRjb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcltdPn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgbWV0aG9kIGNvbWJpbmluZyBwcm9qZWN0IG1lbWJlciByZXRyaWV2YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0TWVtYmVycyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RNZW1iZXJzUmVzcG9uc2UpLm1lbWJlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZSBuZXcgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBjcmVhdGVQcm9qZWN0KGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBlZGl0IHByb2plY3QgZGF0YVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgdXBkYXRlUHJvamVjdChpcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZSBwcm9qZWN0IChpZiBpdCB3YXMgZGVsZXRlZClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIChzZXQgaW5hY3RpdmUpIHByb2plY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZSh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICB1c2Vyc1VybDogc3RyaW5nID0gdGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi91c2Vycyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChlbWFpbCkgKyAnP2lkZW50aWZpZXI9ZW1haWwnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKHBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIocGF0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgdXNlciByZXRyaWV2YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFVzZXIocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyKGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFjdGl2YXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgb3duIHBhc3N3b3JkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHVwZGF0ZU93blBhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgb2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVVc2Vyc1Bhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgcmVxdWVzdGVyUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZGVsZXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExhbmd1YWdlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHNldExhbmd1YWdlKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgdmFyOiBsYW5nIH0pO1xuICB9XG4gIGdldExhbmd1YWdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgfVxuXG4gIC8qKlxuICAqIHRoaXMgbWV0aG9kIGdldCB0aGUgc3RhdHVzIG1lc3NhZ2VzIGZyb20gdGhlIHN0YXR1c01zZy5qc29uIGZpbGVcbiAgKiB3aGljaCBhcmUgZGVmaW5lZCBoZXJlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzXG4gICogYW5kIGhlcmU6IGh0dHA6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9odHRwbWVzc2FnZXMuYXNwXG4gICpcbiAgKi9cbiAgZ2V0U3RhdHVzTXNnKCk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBwICsgJy9hc3NldHMvaTE4bi9zdGF0dXNNc2cuanNvbicpXG4gICAgICAucGlwZShtYXAoXG4gICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgICApO1xuXG4gIH07XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgVXNlcnNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBLbm9yYUNvbnN0YW50cywgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgb250b2xvZ3kuXG4gICAgICogQHBhcmFtIGxhYmVsIGEgbGFiZWwgZGVzY3JpYmluZyB0aGUgb250b2xvZ3kuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBPY2N1cnJlbmNlIG9mIGEgcHJvcGVydHkgZm9yIGEgcmVzb3VyY2UgY2xhc3MgKGl0cyBjYXJkaW5hbGl0eSkuXG4gKi9cbmV4cG9ydCBlbnVtIENhcmRpbmFsaXR5T2NjdXJyZW5jZSB7XG4gICAgbWluQ2FyZCA9IDAsXG4gICAgY2FyZCA9IDEsXG4gICAgbWF4Q2FyZCA9IDJcbn1cblxuXG4vKipcbiAqIENhcmRpbmFsaXR5IG9mIGEgcHJvcGVydHkgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhcmRpbmFsaXR5IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG9jY3VycmVuY2UgdHlwZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBudW1lcmljYWwgdmFsdWUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRoZSBnaXZlbiBvY2N1cnJlbmNlIGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb2NjdXJyZW5jZTogQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gY2FyZGluYWxpdGllcyB0aGUgcmVzb3VyY2UgY2xhc3MncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGljb246IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjYXJkaW5hbGl0aWVzOiBBcnJheTxDYXJkaW5hbGl0eT4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHJlc291cmNlIGNsYXNzIElyaXMgdG8gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVzb3VyY2VDbGFzcztcbn1cblxuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gb2JqZWN0VHlwZSB0aGUgcHJvcGVydHkncyBvYmplY3QgY29uc3RyYWludC5cbiAgICAgKiBAcGFyYW0gY29tbWVudCBjb21tZW50IG9uIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBzdWJQcm9wZXJ0eU9mIElyaXMgb2YgcHJvcGVydGllcyB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBzdWJwcm9wZXJ0eSBvZi5cbiAgICAgKiBAcGFyYW0gaXNFZGl0YWJsZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgY2FuIGJlIGVkaXRlZCBieSB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSBpc0xpbmtWYWx1ZVByb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSByZWZlcnMgdG8gYSBsaW5rIHZhbHVlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IG9iamVjdFR5cGU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdWJQcm9wZXJ0eU9mOiBBcnJheTxzdHJpbmc+LFxuICAgICAgICByZWFkb25seSBpc0VkaXRhYmxlOiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtQcm9wZXJ0eTogQm9vbGVhbixcbiAgICAgICAgcmVhZG9ubHkgaXNMaW5rVmFsdWVQcm9wZXJ0eTogQm9vbGVhbikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcHJvcGVydHkgSXJpcyB0byBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUHJvcGVydHk7XG59XG5cblxuLyoqXG4gKiBHcm91cHMgcmVzb3VyY2UgY2xhc3NlcyBieSB0aGUgb250b2xvZ3kgdGhleSBhcmUgZGVmaW5lZCBpbi5cbiAqXG4gKiBBIG1hcCBvZiBvbnRvbG9neSBJcmlzIHRvIGFuIGFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IEFycmF5PHN0cmluZz47XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGNhY2hlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiAob25seSB1c2VkIGJ5IHRoaXMgc2VydmljZSBpbnRlcm5hbGx5KS5cbiAqIFRoaXMgY2FjaGUgaXMgdXBkYXRlZCB3aGVuZXZlciBuZXcgZGVmaW5pdGlvbnMgYXJlIHJlcXVlc3RlZCBmcm9tIEtub3JhLlxuICpcbiAqIFJlcXVlc3RlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiBieSBhIHNlcnZpY2UgaXMgcmVwcmVzZW50ZWQgYnkgW1tPbnRvbG9neUluZm9ybWF0aW9uXV0uXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGUge1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgb250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT47XG5cbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgbmFtZWQgZ3JhcGguXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTtcblxuICAgIC8qKlxuICAgICAqIFJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb250b2xvZ3kgaW5mb3JtYXRpb24gcmVxdWVzdGVkIGZyb20gdGhpcyBzZXJ2aWNlLlxuICpcbiAqIEZvciBldmVyeSByZXF1ZXN0LCBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHJldHVybmVkIGNvbnRhaW5pbmcgdGhlIHJlcXVlc3RlZCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gYSBzZXJ2aWNlIGxpa2UgdGhlIHNlYXJjaCBmZXRjaGVzIG5ldyByZXN1bHRzXG4gICAgICogdGhhdCBoYXZlIHRvIGJlIGFkZGVkIHRvIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGV4aXN0aW5nIG9udG9sb2d5IGluZm9ybWF0aW9uIG11c3Qgbm90IGJlIGxvc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW1zIG9udG9sb2d5SW5mbyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgdGhhdCBoYXZlIHRvIGJlIGludGVncmF0ZWQuXG4gICAgICovXG4gICAgdXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzRm9yT250b2xvZ3kgaW4gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV0gPSBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UmVzb3VyY2VDbGFzc2VzID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSByZXNvdXJjZUNsYXNzZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3MgaW4gbmV3UmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc10gPSBuZXdSZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdQcm9wZXJ0aWVzID0gb250b2xvZ3lJbmZvLmdldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdQcm9wIGluIG5ld1Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1tuZXdQcm9wXSA9IG5ld1Byb3BlcnRpZXNbbmV3UHJvcF07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtBcnJheTxSZXNvdXJjZUNsYXNzPn1cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBc0FycmF5KCk6IEFycmF5PFJlc291cmNlQ2xhc3M+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzSXJpIGluIHRoaXMucmVzb3VyY2VDbGFzc2VzKSB7XG4gICAgICAgICAgICBjb25zdCByZXNDbGFzczogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXTtcbiAgICAgICAgICAgIHJlc0NsYXNzZXMucHVzaChyZXNDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc0NsYXNzIHJlc291cmNlIGNsYXNzIHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzQ2xhc3M6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWYgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc0RlZiAhPT0gdW5kZWZpbmVkICYmIHJlc0NsYXNzRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzIHdpdGhvdXQgYXJndW1lbnQgcmVzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMoKTogUHJvcGVydGllcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KCk6IEFycmF5PFByb3BlcnR5PiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3A6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgdGhlIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHByb3BEZWYgIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUHJvcGVydHkgd2l0aG91dCBhcmd1bWVudCBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gKiBPdGhlciBjb21wb25lbnRzIG9yIHNlcnZpY2VzIG9idGFpbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0aHJvdWdoIHRoaXMgc2VydmljZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUNhY2hlU2VydmljZSB7XG5cbiAgICAvLyBvbnRvbG9naWVzIGluZ29yZWQgYnkgdGhpcyBzZXJ2aWNlXG4gICAgcHJpdmF0ZSBleGNsdWRlZE9udG9sb2dpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3ksIEtub3JhQ29uc3RhbnRzLlN0YW5kb2ZmT250b2xvZ3ldO1xuXG4gICAgLy8gcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kXG4gICAgLy8gdGhhdCBoYXZlIHRvIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZXNvbHZlZCBhdCB0aGUgbW9tZW50XG4gICAgcHJpdmF0ZSBleGNsdWRlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXTtcblxuICAgIC8vIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8vIGNlbnRyYWwgaW5zdGFuY2UgdGhhdCBjYWNoZXMgYWxsIGRlZmluaXRpb25zXG4gICAgcHJpdmF0ZSBjYWNoZU9udG9sb2d5OiBPbnRvbG9neUNhY2hlID0gbmV3IE9udG9sb2d5Q2FjaGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX29udG9sb2d5U2VydmljZTogT250b2xvZ3lTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBmb3IgYWxsIG9udG9sb2dpZXMgYXMgSlNPTi1MRCAobm8gcHJlZml4ZXMsIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0T250b2xvZ2llc01ldGFkYXRhKCkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIChyZXNvdXJjZSBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzKSBmb3IgdGhlIGdpdmVuIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmkgdGhlIElyaSBvZiB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vZG9jdW1lbnRhdGlvbi9vcGVyYXRvcnMvZmxhdG1hcC5odG1sXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9yeGpzL2NsYXNzL2VzNi9PYnNlcnZhYmxlLmpzfk9ic2VydmFibGUuaHRtbCNpbnN0YW5jZS1tZXRob2QtbWVyZ2VNYXBcbiAgICAgICAgICAgICAgICAob250UmVzOiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2VzID0ganNvbmxkLnByb21pc2VzO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYWN0IEpTT04tTEQgdXNpbmcgYW4gZW1wdHkgY29udGV4dDogZXhwYW5kcyBhbGwgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlID0gb250UHJvbWlzZXMuY29tcGFjdChvbnRSZXMuYm9keSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKG9udFByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYWxsIHRoZSBvbnRvbG9naWVzJyBtZXRhZGF0YSByZXR1cm5lZCBieSBLbm9yYSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9naWVzIG1ldGFkYXRhIG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGFzIEpTT04tTEQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBga25vcmEtYXBpOlJlc291cmNlYCB3aWxsIGJlIGV4Y2x1ZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgZ2l2ZW4gY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgY2xhc3NEZWYgb2YgY2xhc3NEZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NJcmkgPSBjbGFzc0RlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgY2xhc3MgbmFtZSBpcyBub3QgbGlzdGVkIGFzIGEgbm9uIHJlc291cmNlIGNsYXNzIGFuZCB0aGF0IHRoZSBpc1Jlc291cmNlQ2xhc3MgZmxhZyBpcyBwcmVzZW50IGFuZCBzZXQgdG8gdHJ1ZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNsYXNzSXJpICE9PSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZSAmJiB0aGlzLm5vblJlc291cmNlQ2xhc3Nlcy5pbmRleE9mKGNsYXNzSXJpKVxuICAgICAgICAgICAgICAgID09PSAtMSAmJiAoY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSAhPT0gdW5kZWZpbmVkICYmIGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgdmFsdWUgY2xhc3MsIGJ1dCBhIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5wdXNoKGNsYXNzSXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzSXJpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2d5XG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogS25vcmEgYXV0b21hdGljYWxseSBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gaW4gdGhlIGNhcmRpbmFsaXRpZXMgb2YgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKiBJZiB0aGV5IGFyZSBkZWZpbmVkIGluIGFub3RoZXIgb250b2xvZ3ksIHRoYXQgb250b2xvZ3kgaXMgcmVxdWVzdGVkIGZyb20gS25vcmEgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9udG9sb2d5IHRoZSBvbnRvbG9neSB0byBiZSBjYWNoZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpcyB0aGUgb250b2xvZ2llcyBmb3Igd2hpY2ggZGVmaW5pdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zIHRoZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlDbGFzc0RlZmluaXRpb25zIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShyZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4sIHByb3BlcnR5Q2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzIG9mIHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucykge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0lyaSA9IHJlc0NsYXNzWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gcmVwcmVzZW50cyBhbGwgY2FyZGluYWxpdGllcyBvZiB0aGlzIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0aWVzOiBDYXJkaW5hbGl0eVtdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNsYXNzT2ZDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBzaW5nbGUgb2JqZWN0IG9yIGEgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gW3Jlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNhcmRpbmFsaXRpZXMgZm9yIHRoZSBwcm9wZXJ0aWVzIG9mIGEgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGN1ckNhcmQgb2Ygc3ViY2xhc3NPZkNvbGxlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXQgaXMgYSBjYXJkaW5hbGl0eSAoaXQgY291bGQgYWxzbyBiZSBhbiBJcmkgb2YgYSBzdXBlcmNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBjdXJDYXJkWydAdHlwZSddICE9PSB1bmRlZmluZWQgJiYgY3VyQ2FyZFsnQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuT3dsUmVzdHJpY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NhcmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBvY2N1cnJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1pbkNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5jYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWF4Q2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8ga25vd24gb2NjdXJyZW5jZSBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGNhcmRpbmFsaXR5IHR5cGUgaW52YWxpZCBmb3IgJHtyZXNDbGFzc1snQGlkJ119ICR7Y3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGd1aSBvcmRlclxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdGllcy5wdXNoKG5ld0NhcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NPYmogPSBuZXcgUmVzb3VyY2VDbGFzcyhcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZXNvdXJjZUljb25dLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHdyaXRlIHRoaXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbiB0byB0aGUgY2FjaGUgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9IHJlc0NsYXNzT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGUgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqIFRoZSBhbnN3ZXIgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGJ5IHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc0NsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIHtSZXNvdXJjZUNsYXNzZXN9IGFuIFtbT250b2xvZ3lDYWNoZV1dIHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuICAgICAgICAvLyBjb2xsZWN0IHRoZSBkZWZpbml0aW9ucyBmb3IgZWFjaCByZXNvdXJjZSBjbGFzcyBmcm9tIHRoZSBjYWNoZVxuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBwcm9wZXJ0aWVzIGZyb20gdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgY29uc3QgcHJvcGVydHlJcmlzID0gW107XG5cbiAgICAgICAgcmVzQ2xhc3NJcmlzLmZvckVhY2goXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzW3Jlc0NsYXNzSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0uY2FyZGluYWxpdGllcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICBjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBlYWNoIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUlyaXMucHVzaChjYXJkLnByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICBwcm9wRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCByZXNDbGFzc0RlZnMsIHByb3BEZWZzLmdldFByb3BlcnRpZXMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3Igb250b2xvZ3kgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllc1xuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5RGVmaW5pdGlvbnNGcm9tS25vcmEgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYTogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BEZWYgb2YgcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wSXJpID0gcHJvcERlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIGxldCBpc0VkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1Byb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1ZhbHVlUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3ViUHJvcGVydHlPZiA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0pKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZiA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0ubWFwKChzdXBlclByb3A6IE9iamVjdCkgPT4gc3VwZXJQcm9wWydAaWQnXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YucHVzaChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdWydAaWQnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvYmplY3RUeXBlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdWydAaWQnXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGUgcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPSBuZXcgUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUsXG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHByb3BlcnR5IGRlZmluaXRpb25zIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmludGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBuZXcgUHJvcGVydGllcygpO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGU6IHByb3BlcnR5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtwcm9wSXJpfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb3BlcnR5RGVmc1twcm9wSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCBuZXcgUmVzb3VyY2VDbGFzc2VzKCksIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcmVxdWVzdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICAgICAgLy8gYXJyYXkgdG8gYmUgcG9wdWxhdGVkIHdpdGggT2JzZXJ2YWJsZXNcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgICAgICAvLyBkbyBhIHJlcXVlc3QgZm9yIGVhY2ggb250b2xvZ3lcbiAgICAgICAgb250b2xvZ3lJcmlzLmZvckVhY2gob250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgLy8gcHVzaCBhbiBPYnNlcnZhYmxlIG9udG8gYG9ic2VydmFibGVzYFxuICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAob250b2xvZ3k6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgcmVzcG9uc2UgdG8gY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZvcmtKb2luIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBvZiBhbiBhcnJheSBvZiByZXN1bHRzXG4gICAgICAgIC8vIHJldHVybmVkIGJ5IGVhY2ggT2JzZXJ2YWJsZSBjb250YWluZWQgaW4gYG9ic2VydmFibGVzYFxuICAgICAgICAvLyBhIHN1YnNjcmlwdGlvbiB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBmb3JrSm9pbiBpcyBleGVjdXRlZFxuICAgICAgICAvLyBvbmNlIGFsbCBPYnNlcnZhYmxlcyBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihvYnNlcnZhYmxlcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5SXJpc1RvUXVlcnkgPSBvbnRvbG9neUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgb250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb250b2xvZ3kgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBvbnRvbG9naWVzIHRoYXQgYXJlIG1vdCBjYWNoZWQgeWV0XG4gICAgICAgIGlmIChvbnRvbG9neUlyaXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpc1RvUXVlcnkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZWQgb25jZSBhbGwgb250b2xvZ2llcyBoYXZlIGJlZW4gY2FjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIFByb3BlcnRpZXMgY29udGFpbmVkIGluIHRoZSBjYXJkaW5hbGl0aWVzIHdpbGwgYmUgcmV0dXJuZWQgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzIChpbmNsdWRpbmcgcHJvcGVydGllcykuXG4gICAgICovXG4gICAgcHVibGljIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yOiBzdHJpbmdbXSA9IHJlc291cmNlQ2xhc3NJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5tYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHJlc0NsYXNzSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZCAuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllc1RvUXVlcnk6IHN0cmluZ1tdID0gcHJvcGVydHlJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcHJvcGVydGllc1RvUXVlcnkubWFwKFxuICAgICAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHByb3BJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSB3aXRoOiByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKGFscmVhZHkgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG5cbiAgICBnZXRSZXNvdXJjZShpcmkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0lSSSBmcm9tIHJlc291cmNlIHNlcnZpY2U6ICcsIGlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIC8vIFRPRE86IHdlIHNob3VsZCB1c2UgdGhlIEFwaVNlcnZpY2UgY29ycmVjdGx5LiBCdXQgcmlnaHQgbm93IGl0IGRvZXNuJ3Qgd29ya1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFJlYWRSZXNvdXJjZSkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG4gICAgKi9cblxuICAgIC8vIFRPRE86IHBvc3QsIHB1dCwgZGVsZXRlXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdWxsdGV4dCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaChzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSArICc/b2Zmc2V0PScgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNwYXJxbFN0cmluZyB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChzcGFycWxTdHJpbmc6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzcGFycWxTdHJpbmcgPT09IHVuZGVmaW5lZCB8fCBzcGFycWxTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGV4dGVuZGVkLycgKyBlbmNvZGVVUklDb21wb25lbnQoc3BhcnFsU3RyaW5nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBzcGFycWxTdHJpbmcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnkoc3BhcnFsU3RyaW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc3BhcnFsU3RyaW5nID09PSB1bmRlZmluZWQgfHwgc3BhcnFsU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQvJyArIGVuY29kZVVSSUNvbXBvbmVudChzcGFycWxTdHJpbmcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIHNwYXJxbFN0cmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJUkkgcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBwcm9qZWN0SXJpIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+fVxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXNbJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJ10gPSByZXNvdXJjZUNsYXNzSVJJO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zWydsaW1pdFRvUHJvamVjdCddID0gcHJvamVjdElyaTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBHZXQoKSBleHBlY3RzIG9ubHkgb25lIGFyZ3VtZW50LCBub3QgMlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBwYXJhbXMpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBCb29sZWFuIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRSZXNvdXJjZV1dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUpTT05MRCBhbiBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcyBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRSZXNvdXJjZV1dLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnRpZXNdXS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFByb3BlcnRpZXMge1xuXG4gICAgICAgIC8vIEpTT04tTEQgcmVwcmVzZW50aW5nIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIC8vIHRleHQgdmFsdWVzIG1heSBjb250YWluIHN0YW5kb2ZmIGxpbmtzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRDogT2JqZWN0ID0gcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZV07XG5cbiAgICAgICAgLy8gdG8gYmUgcG9wdWxhdGVkIHdpdGggc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10gPSBbXTtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RhbmRvZmYgbGluayB2YWx1ZSBKU09OLUxEIG9iamVjdCB0byBhIFJlYWRMaW5rVmFsdWVcbiAgICAgICAgLy8gaW4gb3JkZXIgcG9wdWxhdGUgdGhlIGNvbGxlY3Rpb24gd2l0aCBhbGwgdGhlIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rSlNPTkxEIG9mIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsOiBSZWFkTGlua1ZhbHVlID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZXM6IEFycmF5PFJlYWRQcm9wZXJ0eUl0ZW0+ID0gW107XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiB2YWx1ZXMgb3IganVzdCBvbmUgdmFsdWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHByb3BlcnR5IG5hbWUsIGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBpcyBnaXZlbiwgaXRlcmF0ZSBvdmVyIGl0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wVmFsdWUgb2YgcmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChwcm9wVmFsdWUsIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0sIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICAgICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wVmFsdWVzO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhbiBBUEkgcmVzcG9uc2UgaW4gSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMgaW50byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSByZXNvdXJjZSBvciBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gYW4gQXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyAoaW5jbHVkaW5nIGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICAvLyBzZXZlcmFsIHZhbHVlcyBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcF0pKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlZmVycmVkUmVzIG9mIHJlc291cmNlSlNPTkxEW3Byb3BdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXNvdXJjZSB0eXBlcyAoY2xhc3NlcykgZnJvbSBhIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEluY29taW5nU2VydmljZSBleHRlbmRzIFNlYXJjaFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyByZWdpb25zIGZvciBhIHBhcnRpY3VsYXIgcmVzb3VyY2UuXG4gICAgICAgKi9cbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMocmVzb3VyY2VJUkk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9yZWdpb24ga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxufSBXSEVSRSB7XG4/cmVnaW9uIGEga25vcmEtYXBpOlJlZ2lvbiAuXG4/cmVnaW9uIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlSSX0+IC5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSVJJfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5rbm9yYS1hcGk6aGFzR2VvbWV0cnkga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkdlb20gLlxuXG4/Z2VvbSBhIGtub3JhLWFwaTpHZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5rbm9yYS1hcGk6aGFzQ29tbWVudCBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6c3RyaW5nIC5cblxuP2NvbW1lbnQgYSB4c2Q6c3RyaW5nIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbmtub3JhLWFwaTpoYXNDb2xvciBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6Q29sb3IgLlxuXG4/Y29sb3IgYSBrbm9yYS1hcGk6Q29sb3IgLlxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3BhcnFsUXVlcnlTdHIgJywgc3BhcnFsUXVlcnlTdHIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlLCBpZiBhbnkuXG4gICAgICogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBsaW5rIHRvIHRoZSBnaXZlbiByZXNvdXJjZSB2aWEga25vcmEtYmFzZTppc1BhcnRPZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9wYWdlIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbn0gV0hFUkUge1xuXG4/cGFnZSBhIGtub3JhLWFwaTpTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gLlxuP3BhZ2UgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5rbm9yYS1hcGk6c2VxbnVtIGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDppbnRlZ2VyIC5cblxuP3NlcW51bSBhIHhzZDppbnRlZ2VyIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbmtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6RmlsZSAuXG5cbj9maWxlIGEga25vcmEtYXBpOkZpbGUgLlxuXG59IE9SREVSIEJZID9zZXFudW1cbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBJcmlcbiAgICAgKiBidXQgaW5jb21pbmcgcmVnaW9ucyBhbmQgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIGluY29taW5nIGxpbmtzIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGVoIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhlIGdlbmVyYXRlcyBLbmFyUUwuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiBpcyBleHBlY3RlZCB0byB0YWtlIHRoZSBvZmZzZXRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybiBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdlbmVyYXRlR3JhdnNlYXJjaDogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUZW1wb3JhcmlseSBzdG9yZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFyYW1zU2VydmljZSB7XG5cbiAgICAvLyBpbml0IHdpdGggYSBkdW1teSBmdW5jdGlvblxuICAgIHByaXZhdGUgc2VhcmNoUGFyYW1zTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXh0ZW5kZWRTZWFyY2hQYXJhbXM+KG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcygob2Zmc2V0OiBudW1iZXIpID0+ICcnKSk7XG4gICAgY3VycmVudFNlYXJjaFBhcmFtcyA9IHRoaXMuc2VhcmNoUGFyYW1zTWVzc2FnZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFjcmguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGVkU2VhcmNoUGFyYW1zfSBzZWFyY2hQYXJhbXNcbiAgICAgKi9cbiAgICBjaGFuZ2VTZWFyY2hQYXJhbXNNc2coc2VhcmNoUGFyYW1zOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtc01lc3NhZ2UubmV4dChzZWFyY2hQYXJhbXMpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8vIG1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lc1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLCAvLyB1c2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplclxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXggdHlwZSBJcmkgdG8gYSBzaW1wbGUgdHlwZSBJcmkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhUeXBlIHRoZSBJcmkgb2YgYSB2YWx1ZSB0eXBlIChrbm9yYS1hcGkgY29tcGxleCkuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgY29ycmVzcG9uZGluZyBJcmkgb2YgdGhlIHNpbXBsZSB0eXBlIChrbm9yYS1hcGkgc2ltcGxlKS5cbiAgICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKGNvbXBsZXhUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVR5cGU6IHN0cmluZyA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVtjb21wbGV4VHlwZV07XG5cbiAgICAgICAgaWYgKHNpbXBsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvcihgY29tcGxleCB0eXBlICR7Y29tcGxleFR5cGV9IGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gc2ltcGxlIHR5cGUuYCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtQcm9wZXJ0eVdpdGhWYWx1ZVtdfSBwcm9wZXJ0aWVzIHRoZSBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYWluUmVzb3VyY2VDbGFzc09wdGlvbiB0aGUgY2xhc3Mgb2YgdGhlIG1haW4gcmVzb3VyY2UsIGlmIHNwZWNpZmllZC5cbiAgICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZywgUmRmRGF0YU9iamVjdCwgUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHsgfVxuXG4gIC8qKlxuICAgICAqIHJlc2V0cyB0aGUgY29udGVudCBvZiB0aGUgdHJpcGxlc3RvcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZGZEYXRhT2JqZWN0c1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHN0cmluZz59XG4gICAgICovXG4gIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50KHJkZkRhdGFPYmplY3RzOiBSZGZEYXRhT2JqZWN0W10pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2U+KHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vc3RvcmUvUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQnLCByZGZEYXRhT2JqZWN0cylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQ6ICcsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBDbGllbnQtc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBTZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQmFzaWNPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiByZXR1cm5zIG91ciBsaXN0IG9mIGEgYmFzaWMgb250b2xvZ3lcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gIC8vIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICAgIGxldCB1cmwgPSBlbnZpcm9ubWVudC51cmw7XG4gIC8vICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIC8vIH1cbiAgZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwcDtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicpO1xuICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVR5cGVzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIEdldCBhbGwgcmVzb3VyY2UgdHlwZXMgZGVmaW5lZCBieSB0aGUgdm9jYWJ1bGFyeVxuICAgICAqIEBwYXJhbSBpcmkgKFZvY2FidWxhcnkgaXJpKVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gIGdldFJlc291cmNlVHlwZXNCeVZvYyhpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXM/dm9jYWJ1bGFyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHJlc291cmNlIHR5cGVcbiAgICogQHBhcmFtIGlyaSAgIChyZXNvdXJjZSB0eXBlIGlyaSlcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIGdldFJlc291cmNlVHlwZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG5cbiAgLy8gcHV0UmVzb3VyY2VUeXBlKGlyaSlcblxufVxuIiwiLyoqXG4gKiBtYWluIGFwaSBzZXJ2aWNlc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgYWRtaW4gYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vZ3JvdXBzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9saXN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vcHJvamVjdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3VzZXJzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgdjIgYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9jb252ZXJ0LWpzb25sZCc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2luY29taW5nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9ncmF2LXNlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc3RvcmUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2Jhc2ljLW9udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS10eXBlcy5zZXJ2aWNlJztcbiIsImltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSB9IGZyb20gJy4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSwgUHJvcGVydHkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG5cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgY29tcGFyaXNvbiBvcGVyYXRvci5cbiAqIFRoaXMgaW50ZXJmYWNlIGlzIGltcGxlbWVudGVkIGZvciB0aGUgc3VwcG9ydGVkIGNvbXBhcmlzb24gb3BlcmF0b3JzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICAvLyB0eXBlIG9mIGNvbXBhcmlzb24gb3BlcmF0b3JcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvLyB0aGUgbGFiZWwgb2YgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgdG8gYmUgcHJlc2VudGVkIHRvIHRoZSB1c2VyLlxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjbGFzcyBuYW1lIHdoZW4gY2FsbGVkIG9uIGFuIGluc3RhbmNlXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0VxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOb3RFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdOb3RFcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRXhpc3RzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXhpc3RzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaWtlIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMaWtlJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1hdGNoIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ01hdGNoJztcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBDb21iaW5hdGlvbiBvZiBhIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIGEgdmFsdWUgbGl0ZXJhbCBvciBhbiBJUkkuXG4gKiBJbiBjYXNlIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzICdFeGlzdHMnLCBubyB2YWx1ZSBpcyBnaXZlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbXBhcmlzb25PcGVyYXRvcjogQ29tcGFyaXNvbk9wZXJhdG9yLCByZWFkb25seSB2YWx1ZT86IFZhbHVlKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSB2YWx1ZTogYW4gSVJJIG9yIGEgbGl0ZXJhbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdmFsdWUgaW50byBhIFNQQVJRTCBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5J3MgdmFsdWUgYXMgYSBsaXRlcmFsIHdpdGggdGhlIGluZGljYXRpb24gb2YgaXRzIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWx1ZUxpdGVyYWwgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1ZhbHVlTGl0ZXJhbF0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdGhlIGxpdGVyYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZSAobWFraW5nIHVzZSBvZiB4c2QpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZykge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHR5cGUgYW5ub3RhdGVkIHZhbHVlIGxpdGVyYWwgdG8gYmUgdXNlZCBpbiBhIFNQQVJRTCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgbGl0ZXJhbFR5cGU6IHN0cmluZztcblxuICAgICAgICAvLyBjaGVjayBpZiBhIEtub3JhIHNjaGVtYSBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeSwgZS5nLiwga25vcmEtYXBpOmRhdGVWYWx1ZSAoY29tcGxleCkgdG8ga25vcmEtYXBpOmRhdGUgKHNpbXBsZSkuXG4gICAgICAgIC8vIHhzZCB0eXBlcyB3aWxsIHJlbWFpbiB1bmNoYW5nZWRcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gS25vcmFTY2hlbWEuc2ltcGxlICYmIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gc2ltcGxlIHNjaGVtYVxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBjb252ZXJ0XG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgXCIke3RoaXMudmFsdWV9XCJeXjwke2xpdGVyYWxUeXBlfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gSVJJLlxuICovXG5leHBvcnQgY2xhc3MgSVJJIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBbSVJJXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgdGhlIElSSSBvZiBhIHJlc291cmNlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlyaTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSVJJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuICAgICAgICAvLyB0aGlzIGlzIGFuIGluc3RhbmNlIElyaSBhbmQgZG9lcyBub3QgaGF2ZSB0byBiZSBjb252ZXJ0ZWQuXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy5pcml9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyBhIHZhbHVlLlxuICogVGhpcyBpbnRlcmZhY2UgaGFzIHRvIGJlIGltcGxlbWVudGVkIGZvciBhbGwgdmFsdWUgdHlwZXMgKHZhbHVlIGNvbXBvbmVudCBjbGFzc2VzKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlfS5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZTtcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yLCBhbmQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVdpdGhWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1Byb3BlcnR5V2l0aFZhbHVlXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHl9IHByb3BlcnR5IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZX0gdmFsdWVMaXRlcmFsIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUuXG4gICAgICogQHBhcmFtIGlzU29ydENyaXRlcmlvbiBpbmRpY2F0ZXMgaWYgdGhlIHByb3BlcnR5IGlzIHVzZWQgYXMgYSBzb3J0IGNyaXRlcmlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IFByb3BlcnR5LFxuICAgICAgICByZWFkb25seSB2YWx1ZUxpdGVyYWw6IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlLFxuICAgICAgICByZWFkb25seSBpc1NvcnRDcml0ZXJpb246IEJvb2xlYW4pIHtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBhIGxpc3QsIHdoaWNoIGlzIHVzZWQgaW4gdGhlIG1hdC1hdXRvY29tcGxldGUgZm9ybSBmaWVsZFxuICogY29udGFpbnMgb2JqZWN0cyB3aXRoIGlkIGFuZCBuYW1lLiB0aGUgaWQgaXMgdXN1YWwgdGhlIGlyaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9jb21wbGV0ZUl0ZW0ge1xuICAgIGlyaTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbD86IHN0cmluZztcbn1cblxuIiwiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBjb3JlXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29yZS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zLyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy8nO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3B1YmxpY19hcGknO1xuXG5leHBvcnQge0t1aUNvcmVDb25maWcgYXMgw4nCtWF9IGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucyc7XG5leHBvcnQge1Byb3BlcnR5IGFzIMOJwrVifSBmcm9tICcuL2xpYi9zZXJ2aWNlcyc7Il0sIm5hbWVzIjpbInRzbGliXzEuX19kZWNvcmF0ZSIsIkpzb25Qcm9wZXJ0eSIsIkpzb25PYmplY3QiLCJKc29uQ29udmVydCIsIk9wZXJhdGlvbk1vZGUiLCJWYWx1ZUNoZWNraW5nTW9kZSIsIktub3JhU2NoZW1hIiwiUHJlY2lzaW9uIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwibWFwIiwiY2F0Y2hFcnJvciIsInRocm93RXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkluamVjdCIsIlN1YmplY3QiLCJPYnNlcnZhYmxlIiwiQ2FyZGluYWxpdHlPY2N1cnJlbmNlIiwibWVyZ2VNYXAiLCJmcm9tIiwib2YiLCJmb3JrSm9pbiIsIkNvbnZlcnRKU09OTEQiLCJCZWhhdmlvclN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FB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