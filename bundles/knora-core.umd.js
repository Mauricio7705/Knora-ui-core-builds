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
            json2typescript.JsonProperty('id', String),
            __metadata("design:type", String)
        ], User.prototype, "id", void 0);
        __decorate([
            json2typescript.JsonProperty('email', String),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            json2typescript.JsonProperty('username', String),
            __metadata("design:type", String)
        ], User.prototype, "username", void 0);
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
         * Get user by username, email or by iri
         *
         * @param {string} identifier
         * @returns {Observable<User>}
         */
        UsersService.prototype.getUser = function (identifier) {
            var path = '/admin/users/' + encodeURIComponent(identifier);
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
     * Represents the parameters of an extended search.
     */
    var ExtendedSearchParams = (function () {
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
    var SearchParamsService = (function () {
        function SearchParamsService() {
            // init with a dummy function that returns false
            // if the application is reloaded, this will be returned
            this._currentSearchParams = new rxjs.BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
        }
        /**
         * Updates the parameters of an extended search.
         *
         * @param {ExtendedSearchParams} searchParams
         */
        SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
            this._currentSearchParams.next(searchParams);
        };
        /**
         * Gets the search params of an extended search.
         *
         * @returns {ExtendedSearchParams}
         */
        SearchParamsService.prototype.getSearchParams = function () {
            return this._currentSearchParams.getValue();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vdXNlcnMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2NvbnZlcnQtanNvbmxkLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvaW5jb21pbmcuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9zdG9yZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9pbmRleC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9rbm9yYS1jb3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBLbm9yYS11aSBjb3JlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgc2VydmVyIGRlZmluaXRpb25zIG9mOlxuICogIC0gYXBpOiBVUkwgb2YgZGF0YSBzZXJ2aWNlIGUuZy4ga25vcmE6IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzM1xuICogIC0gbWVkaWE6IFVSTCBvZiBtZWRpYSBzZXJ2ZXIgc2VydmljZSBlLmcuIHNpcGk6IGh0dHA6Ly9sb2NhbGhvc3Q6MTAyNFxuICogIC0gYXBwOiBVUkwgb2YgdGhlIGFwcCBlLmcuIHNhbHNhaDogaHR0cDovL2xvY2FsaG9zdDo0MjAwXG4gKi9cbkBKc29uT2JqZWN0KCdLdWlDb3JlQ29uZmlnJylcbmV4cG9ydCBjbGFzcyBLdWlDb3JlQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIChTYWxzYWgpIG5hbWUgb2YgdGhlIGFwcFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogKGtub3JhKSB1cmwgb2YgdGhlIGFwaVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcGk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIChzaXBpKSB1cmwgb2YgbWVkaWEvZmlsZSBzZXJ2ZXJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ21lZGlhJywgU3RyaW5nKVxuICAgIHB1YmxpYyBtZWRpYTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogKHNhbHNhaCkgdXJsIG9mIHRoZSBhcHBcbiAgICAgKiBAdHlwZSB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwcCcsIFN0cmluZylcbiAgICBwdWJsaWMgYXBwOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG59XG4iLCJcbmltcG9ydCB7IEpzb25Db252ZXJ0LCBPcGVyYXRpb25Nb2RlLCBWYWx1ZUNoZWNraW5nTW9kZSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogUmVzdWx0IGNsYXNzIHVzZWQgYXMgQVBJIHVybCByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVzdWx0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGpzb25Db252ZXJ0OiBKc29uQ29udmVydCA9IG5ldyBKc29uQ29udmVydChPcGVyYXRpb25Nb2RlLkVOQUJMRSwgVmFsdWVDaGVja2luZ01vZGUuQUxMT1dfTlVMTCk7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBhcyBKU09OXG4gICAgICovXG4gICAgYm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzdWx0IGJvZHkgYXMgaW5zdGFuY2Ugb2YgY2xhc3NPYmplY3QuXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAdGhyb3dzXG4gICAgICovXG5cbiAgICBnZXRCb2R5KGNsYXNzT2JqZWN0PzogeyBuZXcoKTogYW55IH0pOiBhbnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJvZHkpO1xuICAgICAgICByZXR1cm4gQXBpU2VydmljZVJlc3VsdC5qc29uQ29udmVydC5kZXNlcmlhbGl6ZSh0aGlzLmJvZHksIGNsYXNzT2JqZWN0KTtcbiAgICB9XG5cblxufVxuIiwiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBlcnJvciBpbmZvXG4gICAgICovXG4gICAgZXJyb3JJbmZvID0gJyc7XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBLbm9yYUNvbnN0YW50cyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpOiBzdHJpbmcgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpJztcbiAgICBwdWJsaWMgc3RhdGljIFBhdGhTZXBhcmF0b3IgPSAnIyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhT250b2xvZ3lQYXRoOiBzdHJpbmcgPSAnaHR0cDovL3d3dy5rbm9yYS5vcmcvb250b2xvZ3knO1xuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFCYXNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYU9udG9sb2d5UGF0aCArICcva25vcmEtYmFzZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN5c3RlbVByb2plY3RJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjU3lzdGVtUHJvamVjdCc7XG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1BZG1pbkdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbUFkbWluJztcbiAgICBwdWJsaWMgc3RhdGljIFByb2plY3RBZG1pbkdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RBZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0TWVtYmVyR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjUHJvamVjdE1lbWJlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaSArICcvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpVjJTaW1wbGVQYXRoOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaSArICcvc2ltcGxlL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG5cbiAgICBwdWJsaWMgc3RhdGljIFNhbHNhaEd1aU9udG9sb2d5ID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3NhbHNhaC1ndWkvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPcmRlciA9IEtub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5ICsgJyNndWlPcmRlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN0YW5kb2ZmT250b2xvZ3kgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kvc3RhbmRvZmYvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdUZXh0VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSW50VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ludFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEJvb2xlYW5WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFVyaVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdVcmlWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEZWNpbWFsVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RlY2ltYWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEYXRlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RhdGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBDb2xvclZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdDb2xvclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb21WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3RWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlzdFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludGVydmFsVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlua1ZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgR2VvbmFtZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdHZW9uYW1lVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQXVkaW9GaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0F1ZGlvRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEREREZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRERERmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERvY3VtZW50RmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEb2N1bWVudEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdTdGlsbEltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIE1vdmluZ0ltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBUZXh0RmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIElzUmVzb3VyY2VDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNSZXNvdXJjZUNsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIElzVmFsdWVDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNWYWx1ZUNsYXNzJztcbiAgICBwdWJsaWMgc3RhdGljIEZvcmJpZGRlblJlc291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdGb3JiaWRkZW5SZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBYTUxUb1N0YW5kb2ZmTWFwcGluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnWE1MVG9TdGFuZG9mZk1hcHBpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlzdE5vZGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3ROb2RlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0VHlwZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ29iamVjdFR5cGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2VJY29uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdyZXNvdXJjZUljb24nO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNFZGl0YWJsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNFZGl0YWJsZSc7XG4gICAgcHVibGljIHN0YXRpYyBpc0xpbmtQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rVmFsdWVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rVmFsdWVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNHZW9tZXRyeSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc0dlb21ldHJ5JztcblxuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTmFtZSA9ICdodHRwOi8vc2NoZW1hLm9yZy9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYU51bWJlck9mSXRlbXMgPSAnaHR0cDovL3NjaGVtYS5vcmcvbnVtYmVyT2ZJdGVtcyc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFJdGVtTGlzdEVsZW1lbnQgPSAnaHR0cDovL3NjaGVtYS5vcmcvaXRlbUxpc3RFbGVtZW50JztcblxuXG4gICAgcHVibGljIHN0YXRpYyBSZGZQcm9wZXJ0eTogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyNQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzTGFiZWwgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2xhYmVsJztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNDb21tZW50ID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNjb21tZW50JztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNTdWJjbGFzc09mID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNzdWJDbGFzc09mJztcbiAgICBwdWJsaWMgc3RhdGljIHN1YlByb3BlcnR5T2Y6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjc3ViUHJvcGVydHlPZic7XG5cbiAgICBwdWJsaWMgc3RhdGljIG93bDogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT2JqZWN0UHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjT2JqZWN0UHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsRGF0YXR5cGVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNEYXRhdHlwZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bEFubm90YXRpb25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNBbm5vdGF0aW9uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1heENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21heENhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1pbkNhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21pbkNhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI2NhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bFJlc3RyaWN0aW9uID0gS25vcmFDb25zdGFudHMub3dsICsgJyNSZXN0cmljdGlvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0aW9uRGF0ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NyZWF0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBsYXN0TW9kaWZpY2F0aW9uRGF0ZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xhc3RNb2RpZmljYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGhhc1Blcm1pc3Npb25zID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzUGVybWlzc2lvbnMnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1Byb2plY3QgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvUHJvamVjdCc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvVXNlciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Vc2VyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVnaW9uID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnUmVnaW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzU3RyaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1htbDogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGF0ZVZhbHVlOiBzdHJpbmcgPSAnUmVhZERhdGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlua1ZhbHVlOiBzdHJpbmcgPSAnUmVhZExpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZWdlclZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVnZXJWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSAnUmVhZERlY2ltYWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0RmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFRleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEdlb21WYWx1ZTogc3RyaW5nID0gJ1JlYWRHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZENvbG9yVmFsdWU6IHN0cmluZyA9ICdSZWFkQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVXJpVmFsdWU6IHN0cmluZyA9ICdSZWFkVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEJvb2xlYW5WYWx1ZTogc3RyaW5nID0gJ1JlYWRCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVydmFsVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkTGlzdFZhbHVlOiBzdHJpbmcgPSAnUmVhZExpc3RWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlQXNTdHJpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3ZhbHVlQXNTdHJpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVBc1htbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlSGFzTWFwcGluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUhhc01hcHBpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRZZWFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kWWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kWWVhcic7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kRXJhOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRNb250aCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0TW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kTW9udGggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRNb250aCc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydERheSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RGF5JztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZERheSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNDYWxlbmRhciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0NhbGVuZGFyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0JztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1NvdXJjZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2VJcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNTb3VyY2VJcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzVGFyZ2V0SXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0SXJpJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZWdlclZhbHVlQXNJbnRlZ2VyID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50VmFsdWVBc0ludCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlY2ltYWxWYWx1ZUFzRGVjaW1hbCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RlY2ltYWxWYWx1ZUFzRGVjaW1hbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUFzVXJsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlQXNVcmwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlSXNQcmV2aWV3ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSXNQcmV2aWV3JztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUhhc0ZpbGVuYW1lID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSGFzRmlsZW5hbWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGlsbEltYWdlRmlsZVZhbHVlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVgnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWSc7XG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb2xvclZhbHVlQXNDb2xvciA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NvbG9yVmFsdWVBc0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnknO1xuICAgIHB1YmxpYyBzdGF0aWMgdXJpVmFsdWVBc1VyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3VyaVZhbHVlQXNVcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgYm9vbGVhblZhbHVlQXNCb29sZWFuID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYm9vbGVhblZhbHVlQXNCb29sZWFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0JztcbiAgICBwdWJsaWMgc3RhdGljIGludGVydmFsVmFsdWVIYXNFbmQgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzRW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgWHNkID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHhzZFN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdzdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkQm9vbGVhbiA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdib29sZWFuJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZEludGVnZXIgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnaW50ZWdlcic7XG4gICAgcHVibGljIHN0YXRpYyB4c2REZWNpbWFsID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2RlY2ltYWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkVXJpID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2FueVVSSSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlc291cmNlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0RhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdJbnRlcnZhbCc7XG4gICAgcHVibGljIHN0YXRpYyBnZW9tU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbSc7XG4gICAgcHVibGljIHN0YXRpYyBjb2xvclNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb25hbWVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdHZW9uYW1lJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdGaWxlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbWF0Y2hGdW5jdGlvbiA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ21hdGNoJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJz0nO1xuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJyE9JztcbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBub3QgZXF1YWwgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvciA9ICc+JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGdyZWF0ZXIgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJz49JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGdyZWF0ZXIgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvciA9ICc8JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbkxhYmVsID0gJ2lzIGxlc3MgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yID0gJzw9JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgbGVzcyB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25PcGVyYXRvciA9ICdFJztcbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25MYWJlbCA9ICdleGlzdHMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbk9wZXJhdG9yID0gJ3JlZ2V4JztcbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uTGFiZWwgPSAnaXMgbGlrZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yID0gJ2NvbnRhaW5zJztcbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbkxhYmVsID0gJ21hdGNoZXMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhMaW5rID0gJ3NhbHNhaC1saW5rJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCA8YT4gZWxlbWVudCB0aGF0IGluZGljYXRlcyBhIGxpbmsgdG8gYSBLbm9yYSByZXNvdXJjZVxuICAgIHB1YmxpYyBzdGF0aWMgUmVmTWFya2VyID0gJ3JlZi1tYXJrZXInOyAvLyBjbGFzcyBvbiBhbiBIVE1MIGVsZW1lbnQgdGhhdCByZWZlcnMgdG8gYW5vdGhlciBlbGVtZW50IGluIHRoZSBzYW1lIGRvY3VtZW50XG5cbiAgICBwdWJsaWMgc3RhdGljIEdORFByZWZpeCA9ICcoREUtNTg4KSc7XG4gICAgcHVibGljIHN0YXRpYyBHTkRSZXNvbHZlciA9ICdodHRwOi8vZC1uYi5pbmZvL2duZC8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBWSUFGUHJlZml4ID0gJyhWSUFGKSc7XG4gICAgcHVibGljIHN0YXRpYyBWSUFGUmVzb2x2ZXIgPSAnaHR0cHM6Ly92aWFmLm9yZy92aWFmLyc7XG5cbn1cblxuXG5leHBvcnQgZW51bSBLbm9yYVNjaGVtYSB7XG4gICAgY29tcGxleCA9IDAsXG4gICAgc2ltcGxlID0gMVxufVxuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHtLbm9yYUNvbnN0YW50c30gZnJvbSAnLi9hcGkva25vcmEtY29uc3RhbnRzJztcblxuLy8gQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBFbWFpbHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhFbWFpbCA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVSTHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVcmwgPSAvXihodHRwOlxcL1xcL3d3d1xcLnxodHRwczpcXC9cXC93d3dcXC58aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvKT9bYS16MC05XSsoW1xcLVxcLl17MX1bYS16MC05XSspKlxcLlthLXpdezIsNn0oOlswLTldezEsNX0pPyhcXC8uKik/JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBQYXNzd29yZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFBhc3N3b3JkID0gL14oPz0uKlxcZCkoPz0uKlthLXpBLVpdKS57OCx9JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBIZXhhZGVjaW1hbCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEhleCA9IC9eWzAtOUEtRmEtZl0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIHNob3J0bmFtZSBpbiBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4U2hvcnRuYW1lID0gL15bYS16QS1aXStcXFMqJC87XG5cblxuICAgIC8qKlxuICAgICAqIExhbWJkYSBmdW5jdGlvbiBlbGltaW5hdGluZyBkdXBsaWNhdGVzIGluIGEgY29sbGVjdGlvbiB0byBiZSBwYXNzZWQgdG8gW1tmaWx0ZXJdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtIGVsZW1lbnQgb2YgYW4gQXJyYXkgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbG9va2VkIGF0LlxuICAgICAqIEBwYXJhbSBpbmRleCBjdXJyZW50IGVsZW1lbnRzIGluZGV4LlxuICAgICAqIEBwYXJhbSBzZWxmIHJlZmVyZW5jZSB0byB0aGUgd2hvbGUgQXJyYXkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNhbWUgZWxlbWVudCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IGluIHRoZSBBcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlck91dER1cGxpY2F0ZXMgPSAoZWxlbSwgaW5kZXg6IG51bWJlciwgc2VsZikgPT4ge1xuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzQ3Nzk4L2RlbGV0ZS1kdXBsaWNhdGUtZWxlbWVudHMtZnJvbS1hbi1hcnJheVxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXI/dj1leGFtcGxlXG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50J3MgaW5kZXggZXF1YWxzIHRoZSBpbmRleCBvZiB0aGUgbGVmdG1vc3QgZWxlbWVudFxuICAgICAgICAvLyAtPiB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgaXMgbm8gaWRlbnRpY2FsIGVsZW1lbnQgYmVmb3JlIHRoaXMgaW5kZXgsIGhlbmNlIGl0IGlzIG5vdCBhIGR1cGxpY2F0ZVxuICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGVsZW1lbnRzLCBmYWxzZSBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHNlbGYuaW5kZXhPZihlbGVtKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBLbm9yYSBlbnRpdHkgSVJJLCBnZXRzIHRoZSBvbnRvbG9neSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50aXR5SXJpIGFuIGVudGl0eSBJcmkuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgb250b2xvZ3kgSVJJXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkoZW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBjbGFzcyBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gZW50aXR5SXJpLnNwbGl0KEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2VudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXgga25vcmEtYXBpIGVudGl0eSBJcmkgdG8gYSBrbm9yYS1hcGkgc2ltcGxlIGVudGl0eSBJcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleEVudGl0eUlyaVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUoY29tcGxleEVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgZW50aXR5IElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBjb21wbGV4RW50aXR5SXJpLnNwbGl0KCd2MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtjb21wbGV4RW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIC8vIGFkZCAnc2ltcGxlJyB0byBiYXNlIHBhdGhcbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdICsgJ3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yICsgc2VnbWVudHNbMV07XG5cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1N0cmluZ0xpdGVyYWwnKVxuZXhwb3J0IGNsYXNzIFN0cmluZ0xpdGVyYWwge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndmFsdWUnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZ3VhZ2UnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmd1YWdlOiBzdHJpbmcgPSAnJztcbn1cbiIsIi8qKlxuICogUHJlY2lzaW9uIGZvciBEYXRlU2Fsc2FoLlxuICovXG5leHBvcnQgZW51bSBQcmVjaXNpb24ge1xuICAgIHllYXJQcmVjaXNpb24sXG4gICAgbW9udGhQcmVjaXNpb24sXG4gICAgZGF5UHJlY2lzaW9uXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFNhbHNhaCBkYXRlIG9iamVjdCB3aXRoIGEgcHJlY2lzaW9uIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVNhbHNhaCB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXBhcmF0b3IgPSAnLSc7XG5cbiAgICByZWFkb25seSBwcmVjaXNpb246IFByZWNpc2lvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgeWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBtb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGF5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHllYXIgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG1vbnRoIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXkgcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5kYXlQcmVjaXNpb247XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgd2l0aG91dCB0aGUgY2FsZW5kYXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpIHtcblxuICAgICAgICBsZXQgZGF0ZVN0cmluZyA9ICcoJyArIHRoaXMuZXJhICsgJykgJztcblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJlY2lzaW9uKSB7XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLnllYXJQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5tb250aFByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi5kYXlQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aCArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5kYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSAod2l0aCBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyICsgJzonICsgdGhpcy5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGVyaW9kICh3aXRoIHN0YXJ0IGRhdGUgYW5kIGVuZCBkYXRlKS5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVSYW5nZVNhbHNhaCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgc3RhcnQ6IERhdGVTYWxzYWgsXG4gICAgICAgIHJlYWRvbmx5IGVuZDogRGF0ZVNhbHNhaFxuICAgICkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgcmFuZ2UgKHdpdGggcHJlY2VkaW5nIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydC5nZXREYXRlQXNTdHJpbmcoKSArICc6JyArIHRoaXMuZW5kLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdBdXRoZW50aWNhdGlvblJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3QnKVxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydG5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHNob3J0bmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRjb2RlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzaG9ydGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvbmduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb25nbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBTdHJpbmdMaXRlcmFsW10gPSBbbmV3IFN0cmluZ0xpdGVyYWwoKV07XG5cbiAgICBASnNvblByb3BlcnR5KCdrZXl3b3JkcycsIFtTdHJpbmddLCB0cnVlKVxuICAgIHB1YmxpYyBrZXl3b3Jkczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb2dvJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpbnN0aXR1dGlvbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgaW5zdGl0dXRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2dpZXMnLCBbU3RyaW5nXSlcbiAgICBwdWJsaWMgb250b2xvZ2llczogc3RyaW5nW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXAnKVxuZXhwb3J0IGNsYXNzIEdyb3VwIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZGVzY3JpcHRpb24nLCBTdHJpbmcpXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdCwgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZWxmam9pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHNlbGZqb2luOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3VwUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3VwUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXAnLCBHcm91cClcbiAgICBwdWJsaWMgZ3JvdXA6IEdyb3VwID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3Vwc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsZXZlbCcsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuaW1wb3J0IHsgTGlzdE5vZGUgfSBmcm9tICcuL2xpc3Qtbm9kZSc7XG5cbkBKc29uT2JqZWN0KCdMaXN0JylcbmV4cG9ydCBjbGFzcyBMaXN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIGZhbHNlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25vZGVpbmZvJywgTGlzdE5vZGVJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbm9kZWluZm86IExpc3ROb2RlSW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0JywgTGlzdCwgZmFsc2UpXG4gICAgcHVibGljIGxpc3Q6IExpc3QgPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlSW5mbyB9IGZyb20gJy4vbGlzdC1ub2RlLWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0cycsIFtMaXN0Tm9kZUluZm9dLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdHM6IExpc3ROb2RlSW5mb1tdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdPbnRvbG9neUluZm9TaG9ydCcpXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvU2hvcnQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lJcmknLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG9udG9sb2d5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnUGVybWlzc2lvbkRhdGEnKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EYXRhIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3Vwc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGdyb3Vwc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2FkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vZ3JvdXBzL2dyb3VwJztcbmltcG9ydCB7IFBlcm1pc3Npb25EYXRhIH0gZnJvbSAnLi4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1VzZXInKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdlbWFpbCcsIFN0cmluZylcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyB1c2VybmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGFzc3dvcmQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dpdmVuTmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZ2l2ZW5OYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdmYW1pbHlOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBmYW1pbHlOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzdGF0dXMnLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nlc3Npb25JZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2Vzc2lvbklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwZXJtaXNzaW9ucycsIFBlcm1pc3Npb25EYXRhKVxuICAgIHB1YmxpYyBwZXJtaXNzaW9uczogUGVybWlzc2lvbkRhdGEgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXN0ZW1BZG1pbicsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIHN5c3RlbUFkbWluPzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcnMvdXNlcic7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlIHtcbiAgICBASnNvblByb3BlcnR5KCdtZW1iZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyBtZW1iZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cblxuQEpzb25PYmplY3QoJ1Byb2plY3RSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3QnLCBQcm9qZWN0KVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0c1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdFxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2p3dCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgand0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzeXNBZG1pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHN5c0FkbWluOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2Vyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2Vyc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyB1c2VyczogVXNlcltdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2VyUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VyJywgVXNlcilcbiAgICBwdWJsaWMgdXNlcjogVXNlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5cbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RpbGwgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBpbWFnZUZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGltYWdlIGlzIGEganBlZywgaXQgaXMgYSBwcmV2aWV3IGltYWdlXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gaW1hZ2VGaWxlbmFtZS5lbmRzV2l0aCgnLmpwZycpO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoMTAwIC8gcmVkdWNlRmFjdG9yKTtcblxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IChwZXJjZW50YWdlID4gMCAmJiBwZXJjZW50YWdlIDw9IDEwMCkgPyBwZXJjZW50YWdlIDogNTA7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyB0aGlzLmltYWdlRmlsZW5hbWUgKyAnL2Z1bGwvcGN0OicgKyBwZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnLzAvZGVmYXVsdC5qcGcnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRTdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpc3RWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUlyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUxhYmVsOiBzdHJpbmcsICkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUxhYmVsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFByb3BlcnRpZXMgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2Uge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgdGhlIHJlc291cmNlJ3MgSXJpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSByZXNvdXJjZSdzIHR5cGUgKGNsYXNzKS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgdGhlIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nUmVnaW9ucyByZWdpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdMaW5rcyByZXNvdXJjZXMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW119IHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyB0byBiZSBkaXNwbGF5ZWQgZm9yIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1JlYWRQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHRoZSByZXNvdXJjZXMncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1JlZ2lvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnM6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBpbmNvbWluZ0xpbmtzOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheTogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBwcm9wZXJ0aWVzPzogUmVhZFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gcmVzb3VyY2VzIGdpdmVuIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZXNvdXJjZXMgbnVtYmVyIG9mIGdpdmVuIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+LCBwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgSW1hZ2VSZWdpb24gfSBmcm9tICcuL2ltYWdlLXJlZ2lvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbWFnZSBpbmNsdWRpbmcgaXRzIHJlZ2lvbnMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWV9IHN0aWxsSW1hZ2VGaWxlVmFsdWUgYSBbW1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlXV0gcmVwcmVzZW50aW5nIGFuIGltYWdlLlxuICAgICAqIEBwYXJhbSB7SW1hZ2VSZWdpb25bXX0gcmVnaW9ucyB0aGUgcmVnaW9ucyBiZWxvbmdpbmcgdG8gdGhlIGltYWdlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLCByZWFkb25seSByZWdpb25zOiBJbWFnZVJlZ2lvbltdKSB7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IFJlYWRHZW9tVmFsdWUsIFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlZ2lvbi5cbiAqIENvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSByZXNvdXJjZSByZXByZXNlbnRpbmcgdGhlIHJlZ2lvbiBhbmQgaXRzIGdlb21ldHJpZXMuXG4gKi9cblxuZXhwb3J0IGNsYXNzIEltYWdlUmVnaW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkUmVzb3VyY2V9IHJlZ2lvblJlc291cmNlIGEgcmVzb3VyY2Ugb2YgdHlwZSBSZWdpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSByZWdpb25SZXNvdXJjZTogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlb21ldHJ5IGluZm9ybWF0aW9uIGJlbG9uZ2luZyB0byB0aGlzIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtSZWFkR2VvbVZhbHVlW119XG4gICAgICovXG4gICAgZ2V0R2VvbWV0cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaW9uUmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNHZW9tZXRyeV0gYXMgUmVhZEdlb21WYWx1ZVtdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuL2RlY2xhcmF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogS3VpQ29yZUNvbmZpZ31cbiAgICBdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBLdWlDb3JlTW9kdWxlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7S3VpQ29yZUNvbmZpZ30gY29uZmlnXG4gICAgICogQHJldHVybnMge01vZHVsZVdpdGhQcm92aWRlcnN9XG4gICAgICovXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBLdWlDb3JlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIC8vIGdldCB0aGUgYXBwIGVudmlyb25tZW50IGNvbmZpZ3VyYXRpb24gaGVyZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb25maWcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEt1aUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3InO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqICBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAgKiAgaXQgY2FuIGJlIHVzZWQgaW4gY29tcG9uZW50c1xuICAgICAqICBmb3IgcHJvZ3Jlc3MgbG9hZGVyIGVsZW1lbnRcbiAgICAgKi9cbiAgICBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBodHRwR2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJywgcGFyYW1zOiBwYXJhbXMgfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSBib2R5XG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBodHRwUG9zdChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUFVUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSBib2R5XG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBodHRwUHV0KHBhdGg6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gdGhpcy5zZXRIZWFkZXJzKCk7IC0tPiB0aGlzIGlzIG5vdyBkb25lIGJ5IHRoZSBpbnRlcmNlcHRvciBmcm9tIEBrbm9yYS9hdXRoZW50aWNhdGlvblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgcmVxdWVzdCBlcnJvciBpbiBjYXNlIG9mIHNlcnZlciBlcnJvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtIdHRwRXJyb3JSZXNwb25zZX0gZXJyb3JcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+fVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9IGVycm9yLnVybDtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUganNvbiBlcnJvciBpbiBjYXNlIG9mIHR5cGUgZXJyb3IgaW4ganNvbiByZXNwb25zZSAoanNvbjJ0eXBlc2NyaXB0KVxuICAgICAqXG4gICAgICogQHBhcmFtIGVycm9yXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZUVycm9yPn1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlSnNvbkVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaVNlcnZpY2VFcnJvcikgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuXG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IC0xO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzVGV4dCA9ICdJbnZhbGlkIEpTT04nO1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3I7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcblxuICAgIH1cblxuICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kIGlzIHJlcGxhY2VkIGJ5IHRoZSBKd3RJbnRlcmNlcHRvclxuICAgIC8qXG4gICAgcHJvdGVjdGVkIHNldEhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xuICAgICAgICBsZXQgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAgICAgLy8gZ2V0IGtleSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgY29uc3Qga2V5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25faWQnKTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5fYWNzLmdldChrZXkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXNlciA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcGkgc2VydmljZSAtLSBzZXRIZWFkZXJzIC0tIGN1cnJlbnRVc2VyIGZyb20gYWNzJywgY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIG9wdGlvbnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0h0dHBIZWFkZXJzfSBvcHRpb25zXG4gICAgICogQHJldHVybnMge0h0dHBIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kVG9PcHRpb25zKG9wdGlvbnM6IGFueSk6IGFueSB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuXG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgaGVhZGVycyA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzJhKSAnLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYikgJywgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhdmUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zWydoZWFkZXJzJ10pIHtcbiAgICAgICAgICAgICAgICAvLyBubyBoZWFkZXJzIHNldFxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCczOiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBoZWFkZXJzLCBuZWVkIHRvIGFwcGVuZCB0byB0aG9zZVxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihvcHRpb25zWydoZWFkZXJzJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc0OiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4qL1xuICAgIC8qXG4gICAgLyEqKlxuICAgICAqIEFwcGVuZHMgdG8gZXhpc3RpbmcgaGVhZGVycyBpZiB0aGV5IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7SGVhZGVyc30gaGVhZGVyc1xuICAgICAqIEByZXR1cm5zIHtIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XG5cblxuICAgICAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKSkge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbjtcblxuLy8gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcblxuICAgICAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke0pTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnRva2VufWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuKi9cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIEdyb3VwLCBHcm91cFJlc3BvbnNlLCBHcm91cHNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcm91cHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vZ3JvdXBzJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8R3JvdXBbXT59XG4gICAgICovXG4gICAgZ2V0QWxsR3JvdXBzKCk6IE9ic2VydmFibGU8R3JvdXBbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8R3JvdXA+fVxuICAgICAqL1xuICAgIGdldEdyb3VwQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEdyb3VwPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cFJlc3BvbnNlKS5ncm91cCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBMaXN0LFxuICAgIExpc3RDcmVhdGVQYXlsb2FkLFxuICAgIExpc3RJbmZvLFxuICAgIExpc3RJbmZvUmVzcG9uc2UsXG4gICAgTGlzdEluZm9VcGRhdGVQYXlsb2FkLFxuICAgIExpc3ROb2RlSW5mbyxcbiAgICBMaXN0Tm9kZUluZm9SZXNwb25zZSxcbiAgICBMaXN0UmVzcG9uc2UsXG4gICAgTGlzdHNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2xpc3RzJztcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpIChvcHRpb25hbClcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm9bXT59XG4gICAgICovXG4gICAgZ2V0TGlzdHMocHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+IHtcbiAgICAgICAgaWYgKHByb2plY3RJcmkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCArPSAnP3Byb2plY3RJcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0c1Jlc3BvbnNlKS5saXN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0Pn1cbiAgICAgKi9cbiAgICBnZXRMaXN0KGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdEluZm8+fVxuICAgICAqL1xuICAgIGdldExpc3RJbmZvKGxpc3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdEluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvaW5mb3MvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8TGlzdE5vZGVJbmZvPn1cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZUluZm8obm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdE5vZGVJbmZvUmVzcG9uc2UpLm5vZGVpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdENyZWF0ZVBheWxvYWR9IHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxMaXN0Pn1cbiAgICAgKi9cbiAgICBjcmVhdGVMaXN0KHBheWxvYWQ6IExpc3RDcmVhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RJbmZvVXBkYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPExpc3RJbmZvPn1cbiAgICAgKi9cbiAgICB1cGRhdGVMaXN0SW5mbyhwYXlsb2FkOiBMaXN0SW5mb1VwZGF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQocGF5bG9hZC5saXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgUHJvamVjdCwgUHJvamVjdE1lbWJlcnNSZXNwb25zZSwgUHJvamVjdFJlc3BvbnNlLCBQcm9qZWN0c1Jlc3BvbnNlLCBVc2VyIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhIGxpc3Qgb2YgYWxsIHByb2plY3RzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0W10+fVxuICAgICAqL1xuICAgIGdldEFsbFByb2plY3RzKCk6IE9ic2VydmFibGU8UHJvamVjdFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi9wcm9qZWN0cycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdHNSZXNwb25zZSkucHJvamVjdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcHJvamVjdCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBwcm9qZWN0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0bmFtZShzaG9ydG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBwcm9qZWN0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgcmV0cmlldmFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UHJvamVjdD59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3QodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbGwgcHJvamVjdCBtZW1iZXJzXG4gICAgICogcHJvamVjdCBpZGVudGlmaWVyIGlzIHByb2plY3QgaWQgKGlyaSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYWxsIHByb2plY3QgbWVtYmVyc1xuICAgICAqIHByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgYWxsIHByb2plY3QgbWVtYmVyc1xuICAgICAqIHByb2plY3QgaWRlbnRpZmllciBpcyBzaG9ydGNvZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGVcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyW10+fVxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgbWVtYmVyIHJldHJpZXZhbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXJbXT59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFByb2plY3RNZW1iZXJzKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdE1lbWJlcnNSZXNwb25zZSkubWVtYmVycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogY3JlYXRlIG5ldyBwcm9qZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGNyZWF0ZVByb2plY3QoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIGVkaXQgcHJvamVjdCBkYXRhXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxQcm9qZWN0Pn1cbiAgICAgKi9cbiAgICB1cGRhdGVQcm9qZWN0KGlyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGFjdGl2YXRlIHByb2plY3QgKGlmIGl0IHdhcyBkZWxldGVkKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGFjdGl2YXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgKHNldCBpbmFjdGl2ZSkgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2plY3Q+fVxuICAgICAqL1xuICAgIGRlbGV0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgVXNlcixcbiAgICBVc2VyUmVzcG9uc2UsXG4gICAgVXNlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2Vyc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHVzZXJzVXJsOiBzdHJpbmcgPSB0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3VzZXJzJztcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgbGlzdCBvZiBhbGwgdXNlcnNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXJbXT59XG4gICAgICovXG4gICAgZ2V0QWxsVXNlcnMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3VzZXJzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2Vyc1Jlc3BvbnNlKS51c2VycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGFkZFVzZXJUb1N5c3RlbUFkbWluKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgYWN0aXZhdGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBvd24gcGFzc3dvcmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgdXBkYXRlT3duUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCBvbGRQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICAgICAgICByZXF1ZXN0ZXJQYXNzd29yZDogb2xkUGFzc3dvcmRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZVVzZXJzUGFzc3dvcmQodXNlcklyaTogc3RyaW5nLCByZXF1ZXN0ZXJQYXNzd29yZDogc3RyaW5nLCBuZXdQYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBuZXdQYXNzd29yZDogbmV3UGFzc3dvcmQsXG4gICAgICAgICAgICByZXF1ZXN0ZXJQYXNzd29yZDogcmVxdWVzdGVyUGFzc3dvcmRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXIodXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBkZWxldGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIHtcblxuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQoeyB2YXI6IGxhbmcgfSk7XG4gIH1cbiAgZ2V0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c01zZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykge1xuICB9XG5cbiAgLyoqXG4gICogdGhpcyBtZXRob2QgZ2V0IHRoZSBzdGF0dXMgbWVzc2FnZXMgZnJvbSB0aGUgc3RhdHVzTXNnLmpzb24gZmlsZVxuICAqIHdoaWNoIGFyZSBkZWZpbmVkIGhlcmU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfSFRUUF9zdGF0dXNfY29kZXNcbiAgKiBhbmQgaGVyZTogaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvcmVmX2h0dHBtZXNzYWdlcy5hc3BcbiAgKlxuICAqL1xuICBnZXRTdGF0dXNNc2coKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcHAgKyAnL2Fzc2V0cy9pMThuL3N0YXR1c01zZy5qc29uJylcbiAgICAgIC5waXBlKG1hcChcbiAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICk7XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBVc2Vyc1Jlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpIHRoZSBJcmlzIG9mIHRoZSBuYW1lZCBncmFwaHMgd2hvc2UgcmVzb3VyY2UgY2xhc3NlcyBhcmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9hbGxlbnRpdGllcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9udG9sb2d5SXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIElyaXMgb2YgdGhlIHJlc291cmNlIGNsYXNzZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUNsYXNzSXJpczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHJlc291cmNlIGNsYXNzIElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NlcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNDbGFzc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICByZXNDbGFzc1VyaUVuYyA9IHJlc0NsYXNzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9jbGFzc2VzJyArIHJlc0NsYXNzVXJpRW5jKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBwcm9wZXJ0aWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXF1ZXN0ZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocHJvcGVydHlJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcHJvcGVydHkgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UHJvcGVydGllcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzVXJpRW5jID0gcHJvcGVydGllc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvcHJvcGVydGllcycgKyBwcm9wZXJ0aWVzVXJpRW5jKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIEtub3JhQ29uc3RhbnRzLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBPbnRvbG9neVNlcnZpY2UgfSBmcm9tICcuL29udG9sb2d5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ3MzAwMTAvYW5ndWxhcjItNS1taW51dGUtaW5zdGFsbC1idWctcmVxdWlyZS1pcy1ub3QtZGVmaW5lZFxuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlcnJvciBvY2N1cnJlZCBpbiBPbnRvbG9neUNhY2hlU2VydmljZS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gb250b2xvZ3kncyBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5TWV0YWRhdGEge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0gbGFiZWwgYSBsYWJlbCBkZXNjcmliaW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIE9jY3VycmVuY2Ugb2YgYSBwcm9wZXJ0eSBmb3IgYSByZXNvdXJjZSBjbGFzcyAoaXRzIGNhcmRpbmFsaXR5KS5cbiAqL1xuZXhwb3J0IGVudW0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlIHtcbiAgICBtaW5DYXJkID0gMCxcbiAgICBjYXJkID0gMSxcbiAgICBtYXhDYXJkID0gMlxufVxuXG5cbi8qKlxuICogQ2FyZGluYWxpdHkgb2YgYSBwcm9wZXJ0eSBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FyZGluYWxpdHkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2NjdXJyZW5jZSB0eXBlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHZhbHVlIG51bWVyaWNhbCB2YWx1ZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdGhlIGdpdmVuIG9jY3VycmVuY2UgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvY2N1cnJlbmNlOiBDYXJkaW5hbGl0eU9jY3VycmVuY2UsXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIElyaSBpZGVudGlmeWluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGljb24gcGF0aCB0byBhbiBpY29uIHJlcHJlc2VudGluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaWNvbjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhcmRpbmFsaXRpZXM6IEFycmF5PENhcmRpbmFsaXR5Pikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyB0byByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NlcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZXNvdXJjZUNsYXNzO1xufVxuXG5cbi8qKlxuICogQSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHN1YlByb3BlcnR5T2YgSXJpcyBvZiBwcm9wZXJ0aWVzIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIHN1YnByb3BlcnR5IG9mLlxuICAgICAqIEBwYXJhbSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIGlzTGlua1Byb3BlcnR5IGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIGxpbmtpbmcgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIGlzTGlua1ZhbHVlUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IHJlZmVycyB0byBhIGxpbmsgdmFsdWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1Byb3BlcnR5OiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEEgbGlzdCBvZiBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBuYW1lZCBncmFwaC5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5O1xuXG4gICAgLyoqXG4gICAgICogUmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub250b2xvZ2llcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IFByb3BlcnRpZXMoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbnRvbG9neSBpbmZvcm1hdGlvbiByZXF1ZXN0ZWQgZnJvbSB0aGlzIHNlcnZpY2UuXG4gKlxuICogRm9yIGV2ZXJ5IHJlcXVlc3QsIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcmV0dXJuZWQgY29udGFpbmluZyB0aGUgcmVxdWVzdGVkIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBnaXZlbiBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSxcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcyxcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGdpdmVuIFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dIGludG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UsXG4gICAgICogdXBkYXRpbmcgdGhlIGV4aXN0aW5nIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBhIHNlcnZpY2UgbGlrZSB0aGUgc2VhcmNoIGZldGNoZXMgbmV3IHJlc3VsdHNcbiAgICAgKiB0aGF0IGhhdmUgdG8gYmUgYWRkZWQgdG8gYW4gZXhpc3RpbmcgY29sbGVjdGlvbi5cbiAgICAgKiBUaGUgZXhpc3Rpbmcgb250b2xvZ3kgaW5mb3JtYXRpb24gbXVzdCBub3QgYmUgbG9zdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbXMgb250b2xvZ3lJbmZvIHRoZSBnaXZlbiBkZWZpbml0aW9ucyB0aGF0IGhhdmUgdG8gYmUgaW50ZWdyYXRlZC5cbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBncm91cGVkIGJ5IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKCk6IFJlc291cmNlQ2xhc3NlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMge0FycmF5PFJlc291cmNlQ2xhc3M+fVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZiA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3Mgd2l0aG91dCBhcmd1bWVudCByZXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcygpOiBQcm9wZXJ0aWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0FzQXJyYXkoKTogQXJyYXk8UHJvcGVydHk+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eT4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcDogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BlcnR5IHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyB0aGUgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWYgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldO1xuXG4gICAgICAgICAgICBpZiAocHJvcERlZiAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JQcm9wZXJ0eSB3aXRob3V0IGFyZ3VtZW50IHByb3BlcnR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEgYW5kIGNhY2hlcyBpdC5cbiAqIE90aGVyIGNvbXBvbmVudHMgb3Igc2VydmljZXMgb2J0YWluIG9udG9sb2d5IGluZm9ybWF0aW9uIHRocm91Z2ggdGhpcyBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5Q2FjaGVTZXJ2aWNlIHtcblxuICAgIC8vIG9udG9sb2dpZXMgaW5nb3JlZCBieSB0aGlzIHNlcnZpY2VcbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvLyBwcm9wZXJ0aWVzIHRoYXQgS25vcmEgaXMgbm90IHJlc3BvbnNpYmxlIGZvciBhbmRcbiAgICAvLyB0aGF0IGhhdmUgdG8gYmUgaWdub3JlZCBiZWNhdXNlIHRoZXkgY2Fubm90IGJlIHJlc29sdmVkIGF0IHRoZSBtb21lbnRcbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLy8gY2xhc3MgZGVmaW5pdGlvbnMgdGhhdCBhcmUgbm90IGJlIHRyZWF0ZWQgYXMgS25vcmEgcmVzb3VyY2UgY2xhc3Nlc1xuICAgIHByaXZhdGUgbm9uUmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW0tub3JhQ29uc3RhbnRzLkZvcmJpZGRlblJlc291cmNlLCBLbm9yYUNvbnN0YW50cy5YTUxUb1N0YW5kb2ZmTWFwcGluZywgS25vcmFDb25zdGFudHMuTGlzdE5vZGVdO1xuXG4gICAgLy8gY2VudHJhbCBpbnN0YW5jZSB0aGF0IGNhY2hlcyBhbGwgZGVmaW5pdGlvbnNcbiAgICBwcml2YXRlIGNhY2hlT250b2xvZ3k6IE9udG9sb2d5Q2FjaGUgPSBuZXcgT250b2xvZ3lDYWNoZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb250b2xvZ3lTZXJ2aWNlOiBPbnRvbG9neVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIG1ldGFkYXRhIGZvciBhbGwgb250b2xvZ2llcyBhcyBKU09OLUxEIChubyBwcmVmaXhlcywgYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQpLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgKHJlc291cmNlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMpIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaSB0aGUgSXJpIG9mIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhbGwgdGhlIG9udG9sb2dpZXMnIG1ldGFkYXRhIHJldHVybmVkIGJ5IEtub3JhIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2dpZXMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgYXMgSlNPTi1MRC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUob250b2xvZ2llczogb2JqZWN0W10pIHtcblxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcyA9IG9udG9sb2dpZXMubWFwKFxuICAgICAgICAgICAgb250b2xvZ3kgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lNZXRhZGF0YShvbnRvbG9neVsnQGlkJ10sIG9udG9sb2d5W0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9udG9sb2dpZXMnIG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlIGFuZCByZXR1cm5zIHRoZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NEZWZpbml0aW9ucyB0aGUgY2xhc3MgZGVmaW5pdGlvbnMgaW4gYW4gb250b2xvZ3kgcmVzcG9uc2UuXG4gICAgICogQHJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5OiBvYmplY3QpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncmFwaCA9IG9udG9sb2d5WydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBnZXQgYWxsIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IGNsYXNzRGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bENsYXNzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xPYmplY3RQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xEYXRhdHlwZVByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bEFubm90YXRpb25Qcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5SZGZQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gY2FjaGUgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgYmVsb25naW5nIHRvIHRoZSBjdXJyZW50IG9udG9sb2d5XG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5WydAaWQnXV0gPSB0aGlzLmdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZzKTtcblxuICAgICAgICAvLyB3cml0ZSBjbGFzcyBhbmQgcHJvcGVydHkgZGVmaW50aW9ucyB0byBjYWNoZVxuICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShjbGFzc0RlZnMsIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhbGwgcmVxdWVzdGVkIG5hbWVkIGdyYXBoc1xuICAgICAgICBsZXQgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG9udG9sb2d5SXJpIG9mIG9udG9sb2d5SXJpcykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9naWVzRnJvbUNhY2hlOiBvbnRvbG9neSBub3QgZm91bmQgaW4gY2FjaGU6ICR7b250b2xvZ3lJcml9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIG9udG9sb2d5XG4gICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV07XG5cbiAgICAgICAgICAgIC8vIGFkZCBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBvZiB0aGlzIG9udG9sb2d5XG4gICAgICAgICAgICBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IGFsbFJlc291cmNlQ2xhc3NJcmlzLmNvbmNhdCh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBhbGwgcmVxdWVzdGVkIG9udG9sb2dpZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKGFsbFJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5LCByZXNDbGFzc0RlZnMuZ2V0UmVzb3VyY2VDbGFzc2VzKCksIHJlc0NsYXNzRGVmcy5nZXRQcm9wZXJ0aWVzKClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIG9udG9sb2d5IHJlc3BvbnNlIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3ViY2xhc3NPZkNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIHNpbmdsZSBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSBbcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY2FyZGluYWxpdGllcyBmb3IgdGhlIHByb3BlcnRpZXMgb2YgYSByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VyQ2FyZCBvZiBzdWJjbGFzc09mQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgZ3VpIG9yZGVyXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMge1Jlc291cmNlQ2xhc3Nlc30gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmFcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZSBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9IG5ldyBQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSxcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcHJvcGVydHkgZGVmaW5pdGlvbnMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcGVydHlJcmlzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW50aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZTogcHJvcGVydHkgbm90IGZvdW5kIGluIGNhY2hlOiAke3Byb3BJcml9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvcGVydHlEZWZzW3Byb3BJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIG5ldyBSZXNvdXJjZUNsYXNzZXMoKSwgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IHtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIGluIGNhY2hlIHlldCwgZ2V0IG1ldGFkYXRhIGZyb20gS25vcmFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUobWV0YWRhdGFbJ0BncmFwaCddLmZpbHRlcigob250bykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBleGNsdWRlZCBvbnRvbG9naWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZWRPbnRvbG9naWVzLmluZGV4T2Yob250b1snQGlkJ10pID09PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBtZXRhZGF0YSBmcm9tIGNhY2hlXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gS25vcmEsIGFkZGluZyB0aGVtIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgICAgICAvLyBhcnJheSB0byBiZSBwb3B1bGF0ZWQgd2l0aCBPYnNlcnZhYmxlc1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgICAgIC8vIGRvIGEgcmVxdWVzdCBmb3IgZWFjaCBvbnRvbG9neVxuICAgICAgICBvbnRvbG9neUlyaXMuZm9yRWFjaChvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAvLyBwdXNoIGFuIE9ic2VydmFibGUgb250byBgb2JzZXJ2YWJsZXNgXG4gICAgICAgICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChvbnRvbG9neTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9ya0pvaW4gcmV0dXJucyBhbiBPYnNlcnZhYmxlIG9mIGFuIGFycmF5IG9mIHJlc3VsdHNcbiAgICAgICAgLy8gcmV0dXJuZWQgYnkgZWFjaCBPYnNlcnZhYmxlIGNvbnRhaW5lZCBpbiBgb2JzZXJ2YWJsZXNgXG4gICAgICAgIC8vIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGZvcmtKb2luIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIG9uY2UgYWxsIE9ic2VydmFibGVzIGhhdmUgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICovXG4gICAgcHVibGljIGdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzVG9RdWVyeSA9IG9udG9sb2d5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbnRvbG9neSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IG9udG9sb2dpZXMgdGhhdCBhcmUgbW90IGNhY2hlZCB5ZXRcbiAgICAgICAgaWYgKG9udG9sb2d5SXJpc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzVG9RdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkIC5cbiAgICAgKiBAcmV0dXJucyB0aGUgcmVxdWVzdGVkIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzVG9RdWVyeTogc3RyaW5nW10gPSBwcm9wZXJ0eUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzVG9RdWVyeS5tYXAoXG4gICAgICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocHJvcElyaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICAgICAgICAgIC8vIG9idGFpbiBtaXNzaW5nIHJlc291cmNlIGNsYXNzIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIHdpdGg6IHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKTsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAoYWxyZWFkeSBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cblxuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSVJJIGZyb20gcmVzb3VyY2Ugc2VydmljZTogJywgaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgLy8gVE9ETzogd2Ugc2hvdWxkIHVzZSB0aGUgQXBpU2VydmljZSBjb3JyZWN0bHkuIEJ1dCByaWdodCBub3cgaXQgZG9lc24ndCB3b3JrXG4gICAgZ2V0UmVzb3VyY2UoaXJpKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUmVhZFJlc291cmNlKSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cbiAgICAqL1xuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bGx0ZXh0IHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtICsgJz9vZmZzZXQ9JyArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnkoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3BhcnFsU3RyaW5nIHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFN0cmluZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNwYXJxbFN0cmluZyA9PT0gdW5kZWZpbmVkIHx8IHNwYXJxbFN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvJyArIGVuY29kZVVSSUNvbXBvbmVudChzcGFycWxTdHJpbmcpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIHNwYXJxbFN0cmluZyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzcGFycWxTdHJpbmcgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0Pn1cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeShzcGFycWxTdHJpbmc6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzcGFycWxTdHJpbmcgPT09IHVuZGVmaW5lZCB8fCBzcGFycWxTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNwYXJxbFN0cmluZykpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50Jywgc3BhcnFsU3RyaW5nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgc2VhcmNoIGJ5IGEgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VDbGFzc0lSSSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHByb2plY3RJcmkgcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD59XG4gICAgICovXG4gICAgc2VhcmNoQnlMYWJlbChzZWFyY2hUZXJtOiBzdHJpbmcsIHJlc291cmNlQ2xhc3NJUkk/OiBzdHJpbmcsIHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSVJJICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtc1snbGltaXRUb1Jlc291cmNlQ2xhc3MnXSA9IHJlc291cmNlQ2xhc3NJUkk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXNbJ2xpbWl0VG9Qcm9qZWN0J10gPSBwcm9qZWN0SXJpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cEdldCgpIGV4cGVjdHMgb25seSBvbmUgYXJndW1lbnQsIG5vdCAyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIHBhcmFtcyk7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSkpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBSZWFkQm9vbGVhblZhbHVlLFxuICAgIFJlYWRDb2xvclZhbHVlLFxuICAgIFJlYWREYXRlVmFsdWUsXG4gICAgUmVhZERlY2ltYWxWYWx1ZSxcbiAgICBSZWFkR2VvbVZhbHVlLFxuICAgIFJlYWRJbnRlZ2VyVmFsdWUsXG4gICAgUmVhZEludGVydmFsVmFsdWUsXG4gICAgUmVhZExpbmtWYWx1ZSxcbiAgICBSZWFkTGlzdFZhbHVlLFxuICAgIFJlYWRQcm9wZXJ0aWVzLFxuICAgIFJlYWRQcm9wZXJ0eUl0ZW0sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dEZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dFZhbHVlQXNIdG1sLFxuICAgIFJlYWRUZXh0VmFsdWVBc1N0cmluZyxcbiAgICBSZWFkVGV4dFZhbHVlQXNYbWwsXG4gICAgUmVhZFVyaVZhbHVlLFxuICAgIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmssXG4gICAgVXRpbHNcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIGNvbnZlcnQgSlNPTi1MRCByZXByZXNlbnRpbmcgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzIHRvIGNsYXNzZXMuXG4gKiBUaGVzZSBtZXRob2RzIHdvcmtzIG9ubHkgZm9yIGluc3RhbmNlcyBvZiByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMsIG5vdCBmb3Igb250b2xvZ2llcyAoZGF0YSBtb2RlbCkuXG4gKi9cbmV4cG9ydCBtb2R1bGUgQ29udmVydEpTT05MRCB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gYSBmaWx0ZXIgdXNlZCBvbiBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lc1xuICAgICAqIHNvcnRpbmcgb3V0IGFsbCBub24gdmFsdWUgcHJvcGVydHkgbmFtZXMuXG4gICAgICpcbiAgICAgKiBHZXRzIGFsbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHJlZmVyIHRvIHZhbHVlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcE5hbWUgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIEJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgbmFtZSByZWZlcnMgdG8gYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBjb25zdCBnZXRQcm9wZXJ0eU5hbWVzID0gKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9wTmFtZSAhPT0gJ0BpZCdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSAnQHR5cGUnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1Byb2plY3RcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvVXNlclxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmNyZWF0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmxhc3RNb2RpZmljYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuaGFzUGVybWlzc2lvbnM7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFJlc291cmNlXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlSlNPTkxEIGFuIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFJlc291cmNlXV0uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2Uge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlKFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0BpZCddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0B0eXBlJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgcHJvcGVydGllc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBmcm9tIEpTT04tTEQsXG4gICAgICogdGFraW5nIGludG8gYWNjb3VudCB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BWYWx1ZSB0aGUgdmFsdWUgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEBwYXJhbSBwcm9wSXJpIHRoZSBJcmkgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSBzdGFuZG9mZkxpbmtWYWx1ZXMgc3RhbmRvZmZMaW5rVmFsdWVzIG9mIHRoZSByZXNvdXJjZS4gVGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gbGlua3MgdG8gb3RoZXIgcmVzb3VyY2VzLlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gb3IgYHVuZGVmaW5lZGAgaW4gY2FzZSB0aGUgdmFsdWUgY291bGQgbm90IGJlIHByb2Nlc3NlZCBjb3JyZWN0bHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgIHByb3BWYWx1ZTogT2JqZWN0LCBwcm9wSXJpOiBzdHJpbmcsIHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdKTogUmVhZFByb3BlcnR5SXRlbSB8IHVuZGVmaW5lZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcblxuICAgICAgICBsZXQgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGVcbiAgICAgICAgc3dpdGNoIChwcm9wVmFsdWVbJ0B0eXBlJ10pIHtcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dFZhbHVlOlxuICAgICAgICAgICAgICAgIC8vIGEgdGV4dCB2YWx1ZSBtaWdodCBiZSBnaXZlbiBhcyBwbGFpbiBzdHJpbmcsIGh0bWwgb3IgeG1sLlxuICAgICAgICAgICAgICAgIGxldCB0ZXh0VmFsdWU6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1N0cmluZyhwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHN0YW5kb2ZmIGxpbmtzIGFuZCBpbmNsdWRlIHJlZmVycmVkIHJlc291cmNlcywgaWYgYW55XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggYSBzdGFuZG9mZiBsaW5rLCBmdXJ0aGVyIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSBjYW4gYmUgc2hvd25cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmsgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlczogUmVhZFJlc291cmNlID0gc3RhbmRvZmZMaW5rLnJlZmVycmVkUmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlc1tyZWZlcnJlZFJlcy5pZF0gPSByZWZlcnJlZFJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNIdG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0sIHJlZmVycmVkUmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSAhPT0gdW5kZWZpbmVkICYmIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzWG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4cGVjdGVkIHRleHQgdmFsdWUgbWVtYmVycyBub3QgZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogSW52YWxpZCB0ZXh0IHZhbHVlOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlOlxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG5ldyBSZWFkRGF0ZVZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNDYWxlbmRhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kWWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydERheV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmREYXldKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGF0ZVZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGxldCBsaW5rVmFsdWU6IFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgaXMgZ2l2ZW4gYXMgYW4gb2JqZWN0IG9yIGp1c3QgYXMgYW4gSVJJXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0IGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2UuaWQsIHJlZmVycmVkUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXRJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlIGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2UuaWQsIGluY29taW5nUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2VJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpbmtWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFZhbHVlID0gbmV3IFJlYWRJbnRlZ2VyVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVnZXJWYWx1ZUFzSW50ZWdlcl0pO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyBhIGRlY2ltYWwgdmFsdWUgaXMgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmcgaW4gb3JkZXIgdG8gcHJlc2VydmUgaXRzIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY1ZhbDogbnVtYmVyID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGVjaW1hbFZhbHVlQXNEZWNpbWFsXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjaW1hbFZhbHVlID0gbmV3IFJlYWREZWNpbWFsVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgZGVjVmFsKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRlY2ltYWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IG5ldyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEZpbGVWYWx1ZSA9IG5ldyBSZWFkVGV4dEZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0RmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRDb2xvclZhbHVlOiBSZWFkQ29sb3JWYWx1ZSA9IG5ldyBSZWFkQ29sb3JWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmNvbG9yVmFsdWVBc0NvbG9yXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRDb2xvclZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuR2VvbVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZEdlb21WYWx1ZTogUmVhZEdlb21WYWx1ZSA9IG5ldyBSZWFkR2VvbVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZEdlb21WYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdXJpVmFsdWU6IFJlYWRVcmlWYWx1ZSA9IG5ldyBSZWFkVXJpVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy51cmlWYWx1ZUFzVXJpXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB1cmlWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xWYWx1ZTogUmVhZEJvb2xlYW5WYWx1ZSA9IG5ldyBSZWFkQm9vbGVhblZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuYm9vbGVhblZhbHVlQXNCb29sZWFuXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGJvb2xWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudGVkIGFzIHN0cmluZ3MgdG8gcHJlc2VydmUgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgaW50U3RhcnQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzU3RhcnRdWydAdmFsdWUnXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW50RW5kID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc0VuZF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludGVydmFsVmFsdWU6IFJlYWRJbnRlcnZhbFZhbHVlID0gbmV3IFJlYWRJbnRlcnZhbFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBpbnRTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgaW50RW5kXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50ZXJ2YWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RWYWx1ZTogUmVhZExpc3RWYWx1ZSA9IG5ldyBSZWFkTGlzdFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZV1bJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpc3RWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIHVuc3VwcG9ydGVkIHZhbHVlIHR5cGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogdmFsdWUgdHlwZSBub3QgaW1wbGVtZW50ZWQgeWV0OiAnICsgcHJvcFZhbHVlWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVNwZWNpZmljUHJvcDtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgW1tSZWFkUHJvcGVydGllc11dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZUpTT05MRCBhbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUHJvcGVydGllc11dLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUHJvcGVydGllcyB7XG5cbiAgICAgICAgLy8gSlNPTi1MRCByZXByZXNlbnRpbmcgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgLy8gdGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gc3RhbmRvZmYgbGlua3NcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEOiBPYmplY3QgPSByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlXTtcblxuICAgICAgICAvLyB0byBiZSBwb3B1bGF0ZWQgd2l0aCBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSA9IFtdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZWFjaCBzdGFuZG9mZiBsaW5rIHZhbHVlIEpTT04tTEQgb2JqZWN0IHRvIGEgUmVhZExpbmtWYWx1ZVxuICAgICAgICAvLyBpbiBvcmRlciBwb3B1bGF0ZSB0aGUgY29sbGVjdGlvbiB3aXRoIGFsbCB0aGUgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmtKU09OTEQgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWw6IFJlYWRMaW5rVmFsdWUgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWwgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZ2l2ZW4gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlczogQXJyYXk8UmVhZFByb3BlcnR5SXRlbT4gPSBbXTtcblxuICAgICAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHZhbHVlcyBvciBqdXN0IG9uZSB2YWx1ZSBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIHZhbHVlc1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgYW4gYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzIGlzIGdpdmVuLCBpdGVyYXRlIG92ZXIgaXRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BWYWx1ZSBvZiByZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3BWYWx1ZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFuIEFQSSByZXNwb25zZSBpbiBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcyBpbnRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHJlc291cmNlIG9yIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4gPSBbXTtcbiAgICAgICAgbGV0IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSByZXNvdXJjZXNHcmFwaC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBhbnN3ZXIsIG5vIHJlc291cmNlcyBnaXZlblxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UocmVzb3VyY2VzLCBudW1iZXJPZlJlc291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyBhbGwgdGhlIHR5cGVzIChjbGFzc2VzKSBvZiByZWZlcnJlZCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIHJlc291cmNlIChmcm9tIGl0cyBsaW5raW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlSlNPTkxEIEpTT04tTEQgZGVzY3JpYmluZyBvbmUgcmVzb3VyY2UuXG4gICAgICogQHJldHVybiBhbiBBcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIChpbmNsdWRpbmcgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIC8vIHNldmVyYWwgdmFsdWVzIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVmZXJyZWRSZXMgb2YgcmVzb3VyY2VKU09OTERbcHJvcF0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWUgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZlcnJlZFJlc291cmNlQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc291cmNlIHR5cGVzIChjbGFzc2VzKSBmcm9tIGEgSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzICh3aXRob3V0IGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG4gICAgICAgIGxldCByZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCBjbGFzcyBvZiB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc2VzLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSW5jb21pbmdTZXJ2aWNlIGV4dGVuZHMgU2VhcmNoU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgICAqIFJldHVybnMgYWxsIGluY29taW5nIHJlZ2lvbnMgZm9yIGEgcGFydGljdWxhciByZXNvdXJjZS5cbiAgICAgICAqL1xuICAgIGdldEluY29taW5nUmVnaW9ucyhyZXNvdXJjZUlSSTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3JlZ2lvbiBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG59IFdIRVJFIHtcbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVnaW9uIC5cbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSVJJfT4gLlxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJUkl9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cbmtub3JhLWFwaTpoYXNHZW9tZXRyeSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9nZW9tIGEga25vcmEtYXBpOkdlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cbmtub3JhLWFwaTpoYXNDb21tZW50IGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDpzdHJpbmcgLlxuXG4/Y29tbWVudCBhIHhzZDpzdHJpbmcgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxua25vcmEtYXBpOmhhc0NvbG9yIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpDb2xvciAuXG5cbj9jb2xvciBhIGtub3JhLWFwaTpDb2xvciAuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzcGFycWxRdWVyeVN0ciAnLCBzcGFycWxRdWVyeVN0cik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UsIGlmIGFueS5cbiAgICAgKiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGxpbmsgdG8gdGhlIGdpdmVuIHJlc291cmNlIHZpYSBrbm9yYS1iYXNlOmlzUGFydE9mLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zRm9yQ29tcG91bmRSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3BhZ2Uga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxufSBXSEVSRSB7XG5cbj9wYWdlIGEga25vcmEtYXBpOlN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiAuXG4/cGFnZSBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cbmtub3JhLWFwaTpzZXFudW0ga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOmludGVnZXIgLlxuXG4/c2VxbnVtIGEgeHNkOmludGVnZXIgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxua25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpGaWxlIC5cblxuP2ZpbGUgYSBrbm9yYS1hcGk6RmlsZSAuXG5cbn0gT1JERVIgQlkgP3NlcW51bVxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFF1ZXJ5U3RyKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIElyaVxuICAgICAqIGJ1dCBpbmNvbWluZyByZWdpb25zIGFuZCBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgaW5jb21pbmcgbGlua3Mgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rc0ZvclJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/aW5jb21pbmdSZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxufSBXSEVSRSB7XG5cbj9pbmNvbWluZ1JlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUHJvcCBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW5lcmF0ZUdyYXZzZWFyY2ggYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgb2Zmc2V0XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBhIEdyYXZzZWFyY2ggcXVlcnkgc3RyaW5nLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJucyBmYWxzZSBpZiBub3Qgc2V0IGNvcnJlY3RseSAoaW5pdCBzdGF0ZSkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdlbmVyYXRlR3JhdnNlYXJjaDogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcgfCBib29sZWFuKSB7XG5cbiAgICB9XG5cbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGVtcG9yYXJpbHkgc3RvcmVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlYXJjaFBhcmFtc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudFNlYXJjaFBhcmFtcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBpbml0IHdpdGggYSBkdW1teSBmdW5jdGlvbiB0aGF0IHJldHVybnMgZmFsc2VcbiAgICAgICAgLy8gaWYgdGhlIGFwcGxpY2F0aW9uIGlzIHJlbG9hZGVkLCB0aGlzIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXh0ZW5kZWRTZWFyY2hQYXJhbXM+KG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcygob2Zmc2V0OiBudW1iZXIpID0+IGZhbHNlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGVkU2VhcmNoUGFyYW1zfSBzZWFyY2hQYXJhbXNcbiAgICAgKi9cbiAgICBjaGFuZ2VTZWFyY2hQYXJhbXNNc2coc2VhcmNoUGFyYW1zOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLm5leHQoc2VhcmNoUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWFyY2ggcGFyYW1zIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFeHRlbmRlZFNlYXJjaFBhcmFtc31cbiAgICAgKi9cbiAgICBnZXRTZWFyY2hQYXJhbXMoKTogRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5nZXRWYWx1ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8vIG1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lc1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLCAvLyB1c2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplclxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXggdHlwZSBJcmkgdG8gYSBzaW1wbGUgdHlwZSBJcmkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhUeXBlIHRoZSBJcmkgb2YgYSB2YWx1ZSB0eXBlIChrbm9yYS1hcGkgY29tcGxleCkuXG4gICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgY29ycmVzcG9uZGluZyBJcmkgb2YgdGhlIHNpbXBsZSB0eXBlIChrbm9yYS1hcGkgc2ltcGxlKS5cbiAgICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKGNvbXBsZXhUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVR5cGU6IHN0cmluZyA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVtjb21wbGV4VHlwZV07XG5cbiAgICAgICAgaWYgKHNpbXBsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvcihgY29tcGxleCB0eXBlICR7Y29tcGxleFR5cGV9IGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gc2ltcGxlIHR5cGUuYCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtQcm9wZXJ0eVdpdGhWYWx1ZVtdfSBwcm9wZXJ0aWVzIHRoZSBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYWluUmVzb3VyY2VDbGFzc09wdGlvbiB0aGUgY2xhc3Mgb2YgdGhlIG1haW4gcmVzb3VyY2UsIGlmIHNwZWNpZmllZC5cbiAgICAgICAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZywgUmRmRGF0YU9iamVjdCwgUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHsgfVxuXG4gIC8qKlxuICAgICAqIHJlc2V0cyB0aGUgY29udGVudCBvZiB0aGUgdHJpcGxlc3RvcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZGZEYXRhT2JqZWN0c1xuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHN0cmluZz59XG4gICAgICovXG4gIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50KHJkZkRhdGFPYmplY3RzOiBSZGZEYXRhT2JqZWN0W10pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2U+KHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vc3RvcmUvUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQnLCByZGZEYXRhT2JqZWN0cylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQ6ICcsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBDbGllbnQtc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBTZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQmFzaWNPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiByZXR1cm5zIG91ciBsaXN0IG9mIGEgYmFzaWMgb250b2xvZ3lcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gIC8vIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICAgIGxldCB1cmwgPSBlbnZpcm9ubWVudC51cmw7XG4gIC8vICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIC8vIH1cbiAgZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwcDtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicpO1xuICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVR5cGVzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIEdldCBhbGwgcmVzb3VyY2UgdHlwZXMgZGVmaW5lZCBieSB0aGUgdm9jYWJ1bGFyeVxuICAgICAqIEBwYXJhbSBpcmkgKFZvY2FidWxhcnkgaXJpKVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gIGdldFJlc291cmNlVHlwZXNCeVZvYyhpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXM/dm9jYWJ1bGFyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHJlc291cmNlIHR5cGVcbiAgICogQHBhcmFtIGlyaSAgIChyZXNvdXJjZSB0eXBlIGlyaSlcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIGdldFJlc291cmNlVHlwZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG5cbiAgLy8gcHV0UmVzb3VyY2VUeXBlKGlyaSlcblxufVxuIiwiLyoqXG4gKiBtYWluIGFwaSBzZXJ2aWNlc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgYWRtaW4gYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vZ3JvdXBzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9saXN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vcHJvamVjdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3VzZXJzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgdjIgYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9jb252ZXJ0LWpzb25sZCc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2luY29taW5nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9ncmF2LXNlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc3RvcmUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2Jhc2ljLW9udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS10eXBlcy5zZXJ2aWNlJztcbiIsImltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSB9IGZyb20gJy4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSwgUHJvcGVydHkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG5cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgY29tcGFyaXNvbiBvcGVyYXRvci5cbiAqIFRoaXMgaW50ZXJmYWNlIGlzIGltcGxlbWVudGVkIGZvciB0aGUgc3VwcG9ydGVkIGNvbXBhcmlzb24gb3BlcmF0b3JzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICAvLyB0eXBlIG9mIGNvbXBhcmlzb24gb3BlcmF0b3JcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvLyB0aGUgbGFiZWwgb2YgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgdG8gYmUgcHJlc2VudGVkIHRvIHRoZSB1c2VyLlxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjbGFzcyBuYW1lIHdoZW4gY2FsbGVkIG9uIGFuIGluc3RhbmNlXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0VxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOb3RFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdOb3RFcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRXhpc3RzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXhpc3RzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaWtlIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMaWtlJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1hdGNoIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ01hdGNoJztcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBDb21iaW5hdGlvbiBvZiBhIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIGEgdmFsdWUgbGl0ZXJhbCBvciBhbiBJUkkuXG4gKiBJbiBjYXNlIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzICdFeGlzdHMnLCBubyB2YWx1ZSBpcyBnaXZlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbXBhcmlzb25PcGVyYXRvcjogQ29tcGFyaXNvbk9wZXJhdG9yLCByZWFkb25seSB2YWx1ZT86IFZhbHVlKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSB2YWx1ZTogYW4gSVJJIG9yIGEgbGl0ZXJhbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdmFsdWUgaW50byBhIFNQQVJRTCBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5J3MgdmFsdWUgYXMgYSBsaXRlcmFsIHdpdGggdGhlIGluZGljYXRpb24gb2YgaXRzIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWx1ZUxpdGVyYWwgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1ZhbHVlTGl0ZXJhbF0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdGhlIGxpdGVyYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZSAobWFraW5nIHVzZSBvZiB4c2QpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZykge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHR5cGUgYW5ub3RhdGVkIHZhbHVlIGxpdGVyYWwgdG8gYmUgdXNlZCBpbiBhIFNQQVJRTCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgbGl0ZXJhbFR5cGU6IHN0cmluZztcblxuICAgICAgICAvLyBjaGVjayBpZiBhIEtub3JhIHNjaGVtYSBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeSwgZS5nLiwga25vcmEtYXBpOmRhdGVWYWx1ZSAoY29tcGxleCkgdG8ga25vcmEtYXBpOmRhdGUgKHNpbXBsZSkuXG4gICAgICAgIC8vIHhzZCB0eXBlcyB3aWxsIHJlbWFpbiB1bmNoYW5nZWRcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gS25vcmFTY2hlbWEuc2ltcGxlICYmIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gc2ltcGxlIHNjaGVtYVxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBjb252ZXJ0XG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgXCIke3RoaXMudmFsdWV9XCJeXjwke2xpdGVyYWxUeXBlfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gSVJJLlxuICovXG5leHBvcnQgY2xhc3MgSVJJIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBbSVJJXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgdGhlIElSSSBvZiBhIHJlc291cmNlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlyaTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSVJJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuICAgICAgICAvLyB0aGlzIGlzIGFuIGluc3RhbmNlIElyaSBhbmQgZG9lcyBub3QgaGF2ZSB0byBiZSBjb252ZXJ0ZWQuXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy5pcml9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyBhIHZhbHVlLlxuICogVGhpcyBpbnRlcmZhY2UgaGFzIHRvIGJlIGltcGxlbWVudGVkIGZvciBhbGwgdmFsdWUgdHlwZXMgKHZhbHVlIGNvbXBvbmVudCBjbGFzc2VzKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlfS5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZTtcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yLCBhbmQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVdpdGhWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1Byb3BlcnR5V2l0aFZhbHVlXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHl9IHByb3BlcnR5IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZX0gdmFsdWVMaXRlcmFsIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUuXG4gICAgICogQHBhcmFtIGlzU29ydENyaXRlcmlvbiBpbmRpY2F0ZXMgaWYgdGhlIHByb3BlcnR5IGlzIHVzZWQgYXMgYSBzb3J0IGNyaXRlcmlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IFByb3BlcnR5LFxuICAgICAgICByZWFkb25seSB2YWx1ZUxpdGVyYWw6IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlLFxuICAgICAgICByZWFkb25seSBpc1NvcnRDcml0ZXJpb246IEJvb2xlYW4pIHtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBhIGxpc3QsIHdoaWNoIGlzIHVzZWQgaW4gdGhlIG1hdC1hdXRvY29tcGxldGUgZm9ybSBmaWVsZFxuICogY29udGFpbnMgb2JqZWN0cyB3aXRoIGlkIGFuZCBuYW1lLiB0aGUgaWQgaXMgdXN1YWwgdGhlIGlyaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9jb21wbGV0ZUl0ZW0ge1xuICAgIGlyaTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbD86IHN0cmluZztcbn1cblxuIiwiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBjb3JlXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29yZS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zLyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy8nO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3B1YmxpY19hcGknO1xuXG5leHBvcnQge0t1aUNvcmVDb25maWcgYXMgw4nCtWF9IGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucyc7XG5leHBvcnQge1Byb3BlcnR5IGFzIMOJwrVifSBmcm9tICcuL2xpYi9zZXJ2aWNlcyc7Il0sIm5hbWVzIjpbInRzbGliXzEuX19kZWNvcmF0ZSIsIkpzb25Qcm9wZXJ0eSIsIkpzb25PYmplY3QiLCJKc29uQ29udmVydCIsIk9wZXJhdGlvbk1vZGUiLCJWYWx1ZUNoZWNraW5nTW9kZSIsIktub3JhU2NoZW1hIiwiUHJlY2lzaW9uIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIiwibWFwIiwiY2F0Y2hFcnJvciIsInRocm93RXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkluamVjdCIsIlN1YmplY3QiLCJPYnNlcnZhYmxlIiwiQ2FyZGluYWxpdHlPY2N1cnJlbmNlIiwibWVyZ2VNYXAiLCJmcm9tIiwib2YiLCJmb3JrSm9pbiIsIkNvbnZlcnRKU09OTEQiLCJCZWhhdmlvclN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9FLE9BQU8sYUFB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