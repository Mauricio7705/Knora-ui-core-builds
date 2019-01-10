(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('json2typescript'), require('@angular/core'), require('@angular/common/http'), require('rxjs/internal/observable/throwError'), require('rxjs/operators'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@knora/core', ['exports', 'json2typescript', '@angular/core', '@angular/common/http', 'rxjs/internal/observable/throwError', 'rxjs/operators', 'rxjs', '@angular/common'], factory) :
    (factory((global.knora = global.knora || {}, global.knora.core = {}),null,global.ng.core,global.ng.common.http,global.rxjs['internal/observable/throwError'],global.rxjs.operators,global.rxjs,global.ng.common));
}(this, (function (exports,json2typescript,i0,i1,throwError,operators,rxjs,common) { 'use strict';

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
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('app', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "app", void 0);
        __decorate([
            json2typescript.JsonProperty('api', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "api", void 0);
        __decorate([
            json2typescript.JsonProperty('media', String),
            __metadata("design:type", String)
        ], KuiCoreConfig.prototype, "media", void 0);
        KuiCoreConfig = __decorate([
            json2typescript.JsonObject('KuiCoreConfig')
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
        ApiServiceResult.jsonConvert = new json2typescript.JsonConvert(json2typescript.OperationMode.ENABLE, json2typescript.ValueCheckingMode.ALLOW_NULL);
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
    (function (KnoraSchema) {
        KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
        KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
    })(exports.KnoraSchema || (exports.KnoraSchema = {}));

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
    var DateSalsah = /** @class */ (function () {
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
            json2typescript.JsonProperty('token', String),
            __metadata("design:type", String)
        ], AuthenticationResponse.prototype, "token", void 0);
        AuthenticationResponse = __decorate([
            json2typescript.JsonObject('AuthenticationResponse')
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

    var GroupResponse = /** @class */ (function () {
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

    var GroupsResponse = /** @class */ (function () {
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

    var ListInfo = /** @class */ (function () {
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
    }());

    var List = /** @class */ (function () {
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

    var ListInfoResponse = /** @class */ (function () {
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

    var ListNodeInfoResponse = /** @class */ (function () {
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

    var ListResponse = /** @class */ (function () {
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

    var ListsResponse = /** @class */ (function () {
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

    var OntologyInfoShort = /** @class */ (function () {
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

    var PermissionData = /** @class */ (function () {
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

    var ProjectMembersResponse = /** @class */ (function () {
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

    var ProjectResponse = /** @class */ (function () {
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

    var ProjectsResponse = /** @class */ (function () {
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

    var CurrentUser = /** @class */ (function () {
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

    var UsersResponse = /** @class */ (function () {
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

    var UserResponse = /** @class */ (function () {
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
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
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
            return rxjs.from(resPromise);
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
         * @param {any} body
         * @returns Observable of any
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
         * @returns Observable of any
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
         * @returns Observable of ApiServiceError
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
         * @param {any} error
         * @returns Observable of ApiServiceError
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
        ApiService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ApiService, providedIn: "root" });
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
         * @param {string[]} propertyIris the Iris of the properties to be queried.
         * @returns Observable<ApiServiceResult> - the requested properties.
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
    (function (CardinalityOccurrence) {
        CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
        CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
        CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
    })(exports.CardinalityOccurrence || (exports.CardinalityOccurrence = {}));
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
            return this._ontologyService.getOntologiesMetadata().pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld$1.promises;
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
         * @param {string} ontologyIri the Iri of the requested ontology.
         * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
         */
        OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
            return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            function (ontRes) {
                var ontPromises = jsonld$1.promises;
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
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_b = subclassOfCollection_1.return))
                                    _b.call(subclassOfCollection_1);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
                        }
                    }
                    var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                    // write this resource class definition to the cache object
                    this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
                }
            }
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_a = resourceClassDefinitions_1.return))
                        _a.call(resourceClassDefinitions_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
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
            return this.getPropertyDefinitions(propertyIris).pipe(operators.map(function (propDefs) {
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
        OntologyCacheService.ctorParameters = function () {
            return [
                { type: OntologyService }
            ];
        };
        OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
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
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(GroupsResponse).groups; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a group object (filter by IRI).
         *
         * @param {string} iri
         * @returns Observable<Group>
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
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListsResponse).lists; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list object.
         *
         * @param {string} listIri
         * @returns Observable<List>
         */
        ListsService.prototype.getList = function (listIri) {
            return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list info object.
         *
         * @param {string} listIri
         * @returns Observable<ListInfo>
         */
        ListsService.prototype.getListInfo = function (listIri) {
            this.path += '/infos/' + encodeURIComponent(listIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Return a list node info object.
         *
         * @param {string} nodeIri
         * @returns Observable<ListNodeInfo>
         */
        ListsService.prototype.getListNodeInfo = function (nodeIri) {
            this.path += '/nodes/' + encodeURIComponent(nodeIri);
            return this.httpGet(this.path).pipe(operators.map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(this.path, payload).pipe(operators.map(function (result) { return result.getBody(ListResponse).list; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet('/admin/projects').pipe(operators.map(function (result) { return result.getBody(ProjectsResponse).projects; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet(url).pipe(operators.map(function (result) { return result.getBody(ProjectMembersResponse).members; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(url, data).pipe(operators.map(function (result) { return result.getBody(ProjectResponse).project; }), operators.catchError(this.handleJsonError));
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
            return this.httpGet('/admin/users').pipe(operators.map(function (result) { return result.getBody(UsersResponse).users; }), operators.catchError(this.handleJsonError));
        };
        /**
         * Get user by username, email or by iri.
         *
         * @param {string} identifier - Get user by username, email or by iri
         * @returns Observable<User>
         */
        UsersService.prototype.getUser = function (identifier) {
            var path = '/admin/users/' + encodeURIComponent(identifier);
            return this.httpGet(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPost(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpPut(path, data).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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
            return this.httpDelete(path).pipe(operators.map(function (result) { return result.getBody(UserResponse).user; }), operators.catchError(this.handleJsonError));
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

    var LanguageService = /** @class */ (function () {
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
        StatusMsgService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        StatusMsgService.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StatusMsgService, providedIn: "root" });
        return StatusMsgService;
    }());

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
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (_e && !_e.done && (_c = _d.return))
                                    _c.call(_d);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
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
            catch (e_3_1) {
                e_3 = { error: e_3_1 };
            }
            finally {
                try {
                    if (propNames_1_1 && !propNames_1_1.done && (_b = propNames_1.return))
                        _b.call(propNames_1);
                }
                finally {
                    if (e_3)
                        throw e_3.error;
                }
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
                        catch (e_7_1) {
                            e_7 = { error: e_7_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return))
                                    _b.call(_c);
                            }
                            finally {
                                if (e_7)
                                    throw e_7.error;
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
            catch (e_6_1) {
                e_6 = { error: e_6_1 };
            }
            finally {
                try {
                    if (propNames_2_1 && !propNames_2_1.done && (_a = propNames_2.return))
                        _a.call(propNames_2);
                }
                finally {
                    if (e_6)
                        throw e_6.error;
                }
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
    })(exports.ConvertJSONLD || (exports.ConvertJSONLD = {}));

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
         * @return {Observable<ReadResourcesSequence>}
         */
        ResourceService.prototype.getReadResource = function (iri) {
            var _this = this;
            var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
            // TODO: handle case of an ApiServiceError
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.mergeMap(
            // return Observable of ReadResourcesSequence
            function (resourceResponse) {
                // convert JSON-LD into a ReadResourceSequence
                var resSeq = exports.ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
                // collect resource class Iris
                var resourceClassIris = exports.ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
                // request information about resource classes
                return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(operators.map(function (ontoInfo) {
                    // add ontology information to ReadResourceSequence
                    resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                    return resSeq;
                }));
            }));
        };
        ResourceService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        ResourceService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] },
                { type: OntologyCacheService }
            ];
        };
        ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject("config"), i0.inject(OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
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
                var resSeq = exports.ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
                // collect resource class Iris
                var resourceClassIris = exports.ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
                // request information about resource classes
                return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(operators.map(function (ontoInfo) {
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
            if (offset === void 0) {
                offset = 0;
            }
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
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
            if (offset === void 0) {
                offset = 0;
            }
            if (searchTerm === undefined || searchTerm.length === 0) {
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            httpParams = httpParams.set('offset', offset.toString());
            var res = this.httpGet('/v2/search/' + searchTerm, httpParams);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.mergeMap(
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
            }
            var res = this.httpGet('/v2/search/count/' + searchTerm);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.map(
            // convert to a `CountQueryResult`
            exports.ConvertJSONLD.createCountQueryResult));
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
            }
            var res = this.httpPost('/v2/searchextended', gravsearchQuery);
            return res.pipe(operators.mergeMap(this.processJSONLD), operators.mergeMap(this.convertJSONLDToReadResourceSequence));
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
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
                return rxjs.Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
            }
            var res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
            return res.pipe(operators.mergeMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            this.processJSONLD), operators.map(
            // convert to a `CountQueryResult`
            exports.ConvertJSONLD.createCountQueryResult));
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
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
                return rxjs.Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
            }
            var httpParams = new i1.HttpParams();
            if (resourceClassIRI !== undefined) {
                httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
            }
            if (projectIri !== undefined) {
                httpParams = httpParams.set('limitToProject', projectIri);
            }
            var res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
            return res.pipe(operators.mergeMap(this.processJSONLD), operators.mergeMap(this.convertJSONLDToReadResourceSequence));
        };
        SearchService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        SearchService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] },
                { type: OntologyCacheService }
            ];
        };
        SearchService.ngInjectableDef = i0.defineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.inject(i1.HttpClient), i0.inject("config"), i0.inject(OntologyCacheService)); }, token: SearchService, providedIn: "root" });
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root',
                    },] },
        ];
        IncomingService.ngInjectableDef = i0.defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(i0.inject(i1.HttpClient), i0.inject("config"), i0.inject(OntologyCacheService)); }, token: IncomingService, providedIn: "root" });
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
            this._currentSearchParams = new rxjs.BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        SearchParamsService.ctorParameters = function () { return []; };
        SearchParamsService.ngInjectableDef = i0.defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        GravsearchGenerationService.ctorParameters = function () {
            return [
                { type: SearchParamsService }
            ];
        };
        GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
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
        StoreService.ctorParameters = function () {
            return [
                { type: i1.HttpClient },
                { type: KuiCoreConfig, decorators: [{ type: i0.Inject, args: ['config',] }] }
            ];
        };
        StoreService.ngInjectableDef = i0.defineInjectable({ factory: function StoreService_Factory() { return new StoreService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StoreService, providedIn: "root" });
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        BasicOntologyService.ngInjectableDef = i0.defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: BasicOntologyService, providedIn: "root" });
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
    exports.CountQueryResult = CountQueryResult;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9yZXNvdXJjZXMvcmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2NvdW50LXF1ZXJ5L2NvdW50LXF1ZXJ5LXJlc3VsdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vZ3JvdXBzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9saXN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vcHJvamVjdHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvY29udmVydC1qc29ubGQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9pbmNvbWluZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvZ3Jhdi1zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2luZGV4LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiLCJuZzovL0Brbm9yYS9jb3JlL3B1YmxpY19hcGkudHMiLCJuZzovL0Brbm9yYS9jb3JlL2tub3JhLWNvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIEtub3JhLXVpIGNvcmUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgZGVmaW5pdGlvbnMgb2Y6XG4gKiAgLSBhcGk6IFVSTCBvZiBkYXRhIHNlcnZpY2UgZS5nLiBrbm9yYTogaHR0cDovL2xvY2FsaG9zdDozMzMzXG4gKiAgLSBtZWRpYTogVVJMIG9mIG1lZGlhIHNlcnZlciBzZXJ2aWNlIGUuZy4gc2lwaTogaHR0cDovL2xvY2FsaG9zdDoxMDI0XG4gKiAgLSBhcHA6IFVSTCBvZiB0aGUgYXBwIGUuZy4gc2Fsc2FoOiBodHRwOi8vbG9jYWxob3N0OjQyMDBcbiAqL1xuQEpzb25PYmplY3QoJ0t1aUNvcmVDb25maWcnKVxuZXhwb3J0IGNsYXNzIEt1aUNvcmVDb25maWcge1xuXG4gICAgLyoqXG4gICAgICogbmFtZSBvZiB0aGUgYXBwIGUuZy4gJ1NBTFNBSCdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiB0aGUgYXBwIGUuZy4gJ2h0dHBzOi8vc2Fsc2FoLm9yZydcbiAgICAgKiBAdHlwZSB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwcCcsIFN0cmluZylcbiAgICBwdWJsaWMgYXBwOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwaSBlLmcuICdodHRwczovL2FwaS5rbm9yYS5vcmcnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcGknLCBTdHJpbmcpXG4gICAgcHVibGljIGFwaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIG1lZGlhL2ZpbGUgc2VydmVyIGUuZy4gJ2h0dHBzOi8vaWlpZi5zaXBpLmlvJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVkaWEnLCBTdHJpbmcpXG4gICAgcHVibGljIG1lZGlhOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbn1cbiIsIlxuaW1wb3J0IHsgSnNvbkNvbnZlcnQsIE9wZXJhdGlvbk1vZGUsIFZhbHVlQ2hlY2tpbmdNb2RlIH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBSZXN1bHQgY2xhc3MgdXNlZCBhcyBBUEkgdXJsIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VSZXN1bHQge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMganNvbkNvbnZlcnQ6IEpzb25Db252ZXJ0ID0gbmV3IEpzb25Db252ZXJ0KE9wZXJhdGlvbk1vZGUuRU5BQkxFLCBWYWx1ZUNoZWNraW5nTW9kZS5BTExPV19OVUxMKTtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IGFzIEpTT05cbiAgICAgKi9cbiAgICBib2R5OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXN1bHQgYm9keSBhcyBpbnN0YW5jZSBvZiBjbGFzc09iamVjdC5cbiAgICAgKiBAcGFyYW0gY2xhc3NPYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqIEB0aHJvd3NcbiAgICAgKi9cblxuICAgIGdldEJvZHkoY2xhc3NPYmplY3Q/OiB7IG5ldygpOiBhbnkgfSk6IGFueSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYm9keSk7XG4gICAgICAgIHJldHVybiBBcGlTZXJ2aWNlUmVzdWx0Lmpzb25Db252ZXJ0LmRlc2VyaWFsaXplKHRoaXMuYm9keSwgY2xhc3NPYmplY3QpO1xuICAgIH1cblxuXG59XG4iLCJcbi8qKlxuICogRXJyb3IgY2xhc3MgdXNlZCBhcyBBUEkgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZUVycm9yIHtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGVycm9yIGluZm9cbiAgICAgKi9cbiAgICBlcnJvckluZm8gPSAnJztcblxufVxuIiwiZXhwb3J0IGNsYXNzIEtub3JhQ29uc3RhbnRzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGk6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGknO1xuICAgIHB1YmxpYyBzdGF0aWMgUGF0aFNlcGFyYXRvciA9ICcjJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFPbnRvbG9neVBhdGg6IHN0cmluZyA9ICdodHRwOi8vd3d3Lmtub3JhLm9yZy9vbnRvbG9neSc7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUJhc2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhT250b2xvZ3lQYXRoICsgJy9rbm9yYS1iYXNlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtUHJvamVjdElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1Qcm9qZWN0JztcbiAgICBwdWJsaWMgc3RhdGljIFN5c3RlbUFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjU3lzdGVtQWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdEFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjUHJvamVjdEFkbWluJztcbiAgICBwdWJsaWMgc3RhdGljIFByb2plY3RNZW1iZXJHcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0TWVtYmVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMlNpbXBsZVBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy9zaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT250b2xvZ3kgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kvc2Fsc2FoLWd1aS92Mic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFNhbHNhaEd1aU9yZGVyID0gS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3kgKyAnI2d1aU9yZGVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3RhbmRvZmZPbnRvbG9neSA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zdGFuZG9mZi92Mic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBUZXh0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQm9vbGVhblZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVXJpVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1VyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERlY2ltYWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERhdGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIENvbG9yVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0NvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgR2VvbVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlzdFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaW5rVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9uYW1lVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb25hbWVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBBdWRpb0ZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQXVkaW9GaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRERERmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdERERGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRG9jdW1lbnRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RvY3VtZW50RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTW92aW5nSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ01vdmluZ0ltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNSZXNvdXJjZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1Jlc291cmNlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNWYWx1ZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1ZhbHVlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgRm9yYmlkZGVuUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZvcmJpZGRlblJlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFhNTFRvU3RhbmRvZmZNYXBwaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdYTUxUb1N0YW5kb2ZmTWFwcGluZyc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0Tm9kZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlzdE5vZGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBPYmplY3RUeXBlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnb2JqZWN0VHlwZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZXNvdXJjZUljb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3Jlc291cmNlSWNvbic7XG4gICAgcHVibGljIHN0YXRpYyBpc0VkaXRhYmxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0VkaXRhYmxlJztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1Byb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0xpbmtQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBpc0xpbmtWYWx1ZVByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc0xpbmtWYWx1ZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGhhc0dlb21ldHJ5ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzR2VvbWV0cnknO1xuXG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOYW1lID0gJ2h0dHA6Ly9zY2hlbWEub3JnL25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTnVtYmVyT2ZJdGVtcyA9ICdodHRwOi8vc2NoZW1hLm9yZy9udW1iZXJPZkl0ZW1zJztcbiAgICBwdWJsaWMgc3RhdGljIHNjaGVtYUl0ZW1MaXN0RWxlbWVudCA9ICdodHRwOi8vc2NoZW1hLm9yZy9pdGVtTGlzdEVsZW1lbnQnO1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIFJkZlByb3BlcnR5OiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNMYWJlbCA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjbGFiZWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0NvbW1lbnQgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2NvbW1lbnQnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc1N1YmNsYXNzT2YgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI3N1YkNsYXNzT2YnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3ViUHJvcGVydHlPZjogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSNzdWJQcm9wZXJ0eU9mJztcblxuICAgIHB1YmxpYyBzdGF0aWMgb3dsOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wnO1xuXG4gICAgcHVibGljIHN0YXRpYyBPd2xDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xPYmplY3RQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNPYmplY3RQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xEYXRhdHlwZVByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0RhdGF0eXBlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsQW5ub3RhdGlvblByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0Fubm90YXRpb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xPblByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI29uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsTWF4Q2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjbWF4Q2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsTWluQ2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjbWluQ2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjY2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsUmVzdHJpY3Rpb24gPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI1Jlc3RyaWN0aW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRpb25EYXRlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnY3JlYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RNb2RpZmljYXRpb25EYXRlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGFzdE1vZGlmaWNhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzUGVybWlzc2lvbnMgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNQZXJtaXNzaW9ucyc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvUHJvamVjdCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Qcm9qZWN0JztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Vc2VyID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1VzZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZWdpb24gPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZWdpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNTdHJpbmc6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNTdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREYXRlVmFsdWU6IHN0cmluZyA9ICdSZWFkRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaW5rVmFsdWU6IHN0cmluZyA9ICdSZWFkTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlZ2VyVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZWdlclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREZWNpbWFsVmFsdWU6IHN0cmluZyA9ICdSZWFkRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkR2VvbVZhbHVlOiBzdHJpbmcgPSAnUmVhZEdlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQ29sb3JWYWx1ZTogc3RyaW5nID0gJ1JlYWRDb2xvclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRVcmlWYWx1ZTogc3RyaW5nID0gJ1JlYWRVcmlWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQm9vbGVhblZhbHVlOiBzdHJpbmcgPSAnUmVhZEJvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaXN0VmFsdWU6IHN0cmluZyA9ICdSZWFkTGlzdFZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdmFsdWVBc1N0cmluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndmFsdWVBc1N0cmluZyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVIYXNNYXBwaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlSGFzTWFwcGluZyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1N0YW5kb2ZmTGlua1RvVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0YW5kb2ZmTGlua1RvVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0WWVhcic7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRZZWFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0RXJhOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydEVyYSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZEVyYSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydE1vbnRoID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRNb250aCc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRNb250aCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0RGF5ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnREYXknO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kRGF5ID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRGF5JztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0NhbGVuZGFyID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzQ2FsZW5kYXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXQgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNUYXJnZXQnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlua1ZhbHVlSGFzU291cmNlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZUlyaSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXRJcmkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaW5rVmFsdWVIYXNUYXJnZXRJcmknO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnRlZ2VyVmFsdWVBc0ludGVnZXIgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRWYWx1ZUFzSW50JztcblxuICAgIHB1YmxpYyBzdGF0aWMgZGVjaW1hbFZhbHVlQXNEZWNpbWFsID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGVjaW1hbFZhbHVlQXNEZWNpbWFsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlQXNVcmwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVBc1VybCc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVJc1ByZXZpZXcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVJc1ByZXZpZXcnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlSGFzRmlsZW5hbWUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVIYXNGaWxlbmFtZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1N0aWxsSW1hZ2VGaWxlVmFsdWUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNTdGlsbEltYWdlRmlsZVZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVggPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWCc7XG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbG9yVmFsdWVBc0NvbG9yID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnY29sb3JWYWx1ZUFzQ29sb3InO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnkgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSc7XG4gICAgcHVibGljIHN0YXRpYyB1cmlWYWx1ZUFzVXJpID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndXJpVmFsdWVBc1VyaSc7XG4gICAgcHVibGljIHN0YXRpYyBib29sZWFuVmFsdWVBc0Jvb2xlYW4gPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdib29sZWFuVmFsdWVBc0Jvb2xlYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzU3RhcnQgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzU3RhcnQnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc0VuZCA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNFbmQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBsaXN0VmFsdWVBc0xpc3ROb2RlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlzdFZhbHVlQXNMaXN0Tm9kZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaXN0VmFsdWVBc0xpc3ROb2RlTGFiZWwgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlTGFiZWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBYc2QgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJztcblxuICAgIHB1YmxpYyBzdGF0aWMgeHNkU3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ3N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyB4c2RCb29sZWFuID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2Jvb2xlYW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkSW50ZWdlciA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdpbnRlZ2VyJztcbiAgICBwdWJsaWMgc3RhdGljIHhzZERlY2ltYWwgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnZGVjaW1hbCc7XG4gICAgcHVibGljIHN0YXRpYyB4c2RVcmkgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYW55VVJJJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzb3VyY2VTaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdSZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0ludGVydmFsJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21TaW1wbGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdHZW9tJztcbiAgICBwdWJsaWMgc3RhdGljIGNvbG9yU2ltcGxlID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnQ29sb3InO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbmFtZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVNpbXBsZSA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0ZpbGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBtYXRjaEZ1bmN0aW9uID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnbWF0Y2gnO1xuXG4gICAgcHVibGljIHN0YXRpYyBFcXVhbHNDb21wYXJpc29uT3BlcmF0b3IgPSAnPSc7XG4gICAgcHVibGljIHN0YXRpYyBFcXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgZXF1YWwgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBOb3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3IgPSAnIT0nO1xuICAgIHB1YmxpYyBzdGF0aWMgTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsID0gJ2lzIG5vdCBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yID0gJz4nO1xuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWwgPSAnaXMgZ3JlYXRlciB0aGFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3IgPSAnPj0nO1xuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWwgPSAnaXMgZ3JlYXRlciB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbk9wZXJhdG9yID0gJzwnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uTGFiZWwgPSAnaXMgbGVzcyB0aGFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3IgPSAnPD0nO1xuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbCA9ICdpcyBsZXNzIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yID0gJ0UnO1xuICAgIHB1YmxpYyBzdGF0aWMgRXhpc3RzQ29tcGFyaXNvbkxhYmVsID0gJ2V4aXN0cyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uT3BlcmF0b3IgPSAncmVnZXgnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25MYWJlbCA9ICdpcyBsaWtlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTWF0Y2hDb21wYXJpc29uT3BlcmF0b3IgPSAnY29udGFpbnMnO1xuICAgIHB1YmxpYyBzdGF0aWMgTWF0Y2hDb21wYXJpc29uTGFiZWwgPSAnbWF0Y2hlcyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFNhbHNhaExpbmsgPSAnc2Fsc2FoLWxpbmsnOyAvLyBjbGFzcyBvbiBhbiBIVE1MIDxhPiBlbGVtZW50IHRoYXQgaW5kaWNhdGVzIGEgbGluayB0byBhIEtub3JhIHJlc291cmNlXG4gICAgcHVibGljIHN0YXRpYyBSZWZNYXJrZXIgPSAncmVmLW1hcmtlcic7IC8vIGNsYXNzIG9uIGFuIEhUTUwgZWxlbWVudCB0aGF0IHJlZmVycyB0byBhbm90aGVyIGVsZW1lbnQgaW4gdGhlIHNhbWUgZG9jdW1lbnRcblxuICAgIHB1YmxpYyBzdGF0aWMgR05EUHJlZml4ID0gJyhERS01ODgpJztcbiAgICBwdWJsaWMgc3RhdGljIEdORFJlc29sdmVyID0gJ2h0dHA6Ly9kLW5iLmluZm8vZ25kLyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFZJQUZQcmVmaXggPSAnKFZJQUYpJztcbiAgICBwdWJsaWMgc3RhdGljIFZJQUZSZXNvbHZlciA9ICdodHRwczovL3ZpYWYub3JnL3ZpYWYvJztcblxufVxuXG5cbmV4cG9ydCBlbnVtIEtub3JhU2NoZW1hIHtcbiAgICBjb21wbGV4ID0gMCxcbiAgICBzaW1wbGUgPSAxXG59XG4iLCIvKipcbiAqIENvbGxlY3Rpb24gb2YgdXNlZnVsIHV0aWxpdHkgZnVuY3Rpb25zLlxuICovXG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgRW1haWwgYWRkcmVzcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEVtYWlsID0gL14oKFtePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXStcXC4pK1tePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl17Mix9KSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgVXNlcm5hbWUuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVc2VybmFtZSA9IC9eW2EtekEtWjAtOV0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVSTHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVcmwgPSAvXihodHRwOlxcL1xcL3d3d1xcLnxodHRwczpcXC9cXC93d3dcXC58aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvKT9bYS16MC05XSsoW1xcLVxcLl17MX1bYS16MC05XSspKlxcLlthLXpdezIsNn0oOlswLTldezEsNX0pPyhcXC8uKik/JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBQYXNzd29yZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFBhc3N3b3JkID0gL14oPz0uKlxcZCkoPz0uKlthLXpBLVpdKS57OCx9JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBIZXhhZGVjaW1hbCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEhleCA9IC9eWzAtOUEtRmEtZl0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIHNob3J0bmFtZSBpbiBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4U2hvcnRuYW1lID0gL15bYS16QS1aXStcXFMqJC87XG5cblxuICAgIC8qKlxuICAgICAqIExhbWJkYSBmdW5jdGlvbiBlbGltaW5hdGluZyBkdXBsaWNhdGVzIGluIGEgY29sbGVjdGlvbiB0byBiZSBwYXNzZWQgdG8gW1tmaWx0ZXJdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtIGVsZW1lbnQgb2YgYW4gQXJyYXkgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbG9va2VkIGF0LlxuICAgICAqIEBwYXJhbSBpbmRleCBjdXJyZW50IGVsZW1lbnRzIGluZGV4LlxuICAgICAqIEBwYXJhbSBzZWxmIHJlZmVyZW5jZSB0byB0aGUgd2hvbGUgQXJyYXkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNhbWUgZWxlbWVudCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IGluIHRoZSBBcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlck91dER1cGxpY2F0ZXMgPSAoZWxlbSwgaW5kZXg6IG51bWJlciwgc2VsZikgPT4ge1xuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzQ3Nzk4L2RlbGV0ZS1kdXBsaWNhdGUtZWxlbWVudHMtZnJvbS1hbi1hcnJheVxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXI/dj1leGFtcGxlXG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50J3MgaW5kZXggZXF1YWxzIHRoZSBpbmRleCBvZiB0aGUgbGVmdG1vc3QgZWxlbWVudFxuICAgICAgICAvLyAtPiB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgaXMgbm8gaWRlbnRpY2FsIGVsZW1lbnQgYmVmb3JlIHRoaXMgaW5kZXgsIGhlbmNlIGl0IGlzIG5vdCBhIGR1cGxpY2F0ZVxuICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGVsZW1lbnRzLCBmYWxzZSBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHNlbGYuaW5kZXhPZihlbGVtKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgS25vcmEgZW50aXR5IElSSSwgZ2V0cyB0aGUgb250b2xvZ3kgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eUlyaSBhbiBlbnRpdHkgSXJpLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIG9udG9sb2d5IElSSVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKGVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgY2xhc3MgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGVudGl0eUlyaS5zcGxpdChLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb21wbGV4IGtub3JhLWFwaSBlbnRpdHkgSXJpIHRvIGEga25vcmEtYXBpIHNpbXBsZSBlbnRpdHkgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhFbnRpdHlJcmlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKGNvbXBsZXhFbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGVudGl0eSBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gY29tcGxleEVudGl0eUlyaS5zcGxpdCgndjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7Y29tcGxleEVudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICAvLyBhZGQgJ3NpbXBsZScgdG8gYmFzZSBwYXRoXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXSArICdzaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvciArIHNlZ21lbnRzWzFdO1xuXG4gICAgfVxuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdTdHJpbmdMaXRlcmFsJylcbmV4cG9ydCBjbGFzcyBTdHJpbmdMaXRlcmFsIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3ZhbHVlJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmd1YWdlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJyc7XG59XG4iLCIvKipcbiAqIFByZWNpc2lvbiBmb3IgRGF0ZVNhbHNhaC5cbiAqL1xuZXhwb3J0IGVudW0gUHJlY2lzaW9uIHtcbiAgICB5ZWFyUHJlY2lzaW9uLFxuICAgIG1vbnRoUHJlY2lzaW9uLFxuICAgIGRheVByZWNpc2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBTYWxzYWggZGF0ZSBvYmplY3Qgd2l0aCBhIHByZWNpc2lvbiBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVTYWxzYWgge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcmVhZG9ubHkgcHJlY2lzaW9uOiBQcmVjaXNpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgbW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRheT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB5ZWFyIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBtb250aCBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF5IHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHdpdGhvdXQgdGhlIGNhbGVuZGFyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKSB7XG5cbiAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSAnKCcgKyB0aGlzLmVyYSArICcpICc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByZWNpc2lvbikge1xuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGggKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMuZGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgKHdpdGggY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhciArICc6JyArIHRoaXMuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBlcmlvZCAod2l0aCBzdGFydCBkYXRlIGFuZCBlbmQgZGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VTYWxzYWgge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0OiBEYXRlU2Fsc2FoLFxuICAgICAgICByZWFkb25seSBlbmQ6IERhdGVTYWxzYWhcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHJhbmdlICh3aXRoIHByZWNlZGluZyBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQuZ2V0RGF0ZUFzU3RyaW5nKCkgKyAnOicgKyB0aGlzLmVuZC5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnQXV0aGVudGljYXRpb25SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZylcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0JylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBzaG9ydG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0Y29kZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2hvcnRjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb25nbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9uZ25hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogU3RyaW5nTGl0ZXJhbFtdID0gW25ldyBTdHJpbmdMaXRlcmFsKCldO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna2V5d29yZHMnLCBbU3RyaW5nXSwgdHJ1ZSlcbiAgICBwdWJsaWMga2V5d29yZHM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9nbycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaW5zdGl0dXRpb24nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGluc3RpdHV0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9naWVzJywgW1N0cmluZ10pXG4gICAgcHVibGljIG9udG9sb2dpZXM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ0dyb3VwJylcbmV4cG9ydCBjbGFzcyBHcm91cCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgU3RyaW5nKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwJywgR3JvdXApXG4gICAgcHVibGljIGdyb3VwOiBHcm91cCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWwnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIHRydWUpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGV2ZWwnLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIGxldmVsOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwb3NpdGlvbicsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcbmltcG9ydCB7IExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LW5vZGUnO1xuXG5ASnNvbk9iamVjdCgnTGlzdCcpXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCBmYWxzZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdEluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpc1Jvb3ROb2RlJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgaXNSb290Tm9kZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdub2RlaW5mbycsIExpc3ROb2RlSW5mbywgZmFsc2UpXG4gICAgcHVibGljIG5vZGVpbmZvOiBMaXN0Tm9kZUluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuXG5ASnNvbk9iamVjdCgnTGlzdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdCcsIExpc3QsIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0OiBMaXN0ID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdHMnLCBbTGlzdE5vZGVJbmZvXSwgZmFsc2UpXG4gICAgcHVibGljIGxpc3RzOiBMaXN0Tm9kZUluZm9bXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnT250b2xvZ3lJbmZvU2hvcnQnKVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb1Nob3J0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SXJpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1Blcm1pc3Npb25EYXRhJylcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGF0YSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBncm91cHNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL2dyb3Vwcy9ncm91cCc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGF0YSB9IGZyb20gJy4uL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdVc2VyJylcbmV4cG9ydCBjbGFzcyBVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZW1haWwnLCBTdHJpbmcpXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VybmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bhc3N3b3JkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdnaXZlbk5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGdpdmVuTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZmFtaWx5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZmFtaWx5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZylcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZXNzaW9uSWQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGVybWlzc2lvbnMnLCBQZXJtaXNzaW9uRGF0YSlcbiAgICBwdWJsaWMgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzdGVtQWRtaW4nLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBzeXN0ZW1BZG1pbj86IGJvb2xlYW4gPSBmYWxzZTtcblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdE1lbWJlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdE1lbWJlcnNSZXNwb25zZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVtYmVycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgbWVtYmVyczogVXNlcltdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdClcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3RcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdqd3QnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGp3dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzQWRtaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzeXNBZG1pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlcnNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlclJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2VyUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcicsIFVzZXIpXG4gICAgcHVibGljIHVzZXI6IFVzZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGVSYW5nZVNhbHNhaCwgRGF0ZVNhbHNhaCB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGFueSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgSXJpLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgdHlwZS5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHZhbHVlIG9iamVjdC5cbiAgICAgKi9cbiAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhcyBhIHN0cmluZyAoY29tcGxleGl0eSBvZiB0aGUgdmFsdWUgcG9zc2libHkgcmVkdWNlZCkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggb3Igd2l0aG91dCBtYXJrdXAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWFkVGV4dFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRob3V0IG1hcmt1cCAobWVyZSBjaGFyYWN0ZXIgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1N0cmluZyBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgcmVzb3VyY2VzIHJlZmVycmVkIHRvIGJ5IHN0YW5kb2ZmIGxpbmtzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZWFkUmVzb3VyY2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIHRoYXQgaGFzIGJlZW4gdHVybmVkIGludG8gSFRNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc0h0bWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGh0bWw6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmspIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IGEgcmVzb3VyY2UgcmVmZXJyZWQgdG8gYnkgYSBzdGFuZG9mZiBsaW5rIGZyb20gYSB0ZXh0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIG9udG9sb2d5IGluZm9ybWF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSdzIGNsYXNzIGFuZCBpdHMgbGFiZWwuXG4gICAgICovXG5cblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKHJlc291cmNlSXJpOiBzdHJpbmcsIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbm8gaW5mb3JtYXRpb24gZm91bmQgYWJvdXQgcmVmZXJyZWQgcmVzb3VyY2UgKHRhcmdldCBvZiBzdGFuZG9mZiBsaW5rKSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCBhcyBYTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNYbWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHhtbDogc3RyaW5nLCByZWFkb25seSBtYXBwaW5nSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1htbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54bWw7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGF0ZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGF0ZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZW5kRXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0TW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydERheT86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kRGF5PzogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgZ2V0RGF0ZVNhbHNhaCgpOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB0aGlzLmVuZFllYXIgJiYgdGhpcy5zdGFydE1vbnRoID09PSB0aGlzLmVuZE1vbnRoICYmIHRoaXMuc3RhcnREYXkgPT09IHRoaXMuZW5kRGF5ICYmIHRoaXMuc3RhcnRFcmEgPT09IHRoaXMuZW5kRXJhKSB7XG4gICAgICAgICAgICAvLyBwcmVjaXNlIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRhdGUgcGVyaW9kXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVSYW5nZVNhbHNhaChuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KSwgbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5lbmRFcmEsIHRoaXMuZW5kWWVhciwgdGhpcy5lbmRNb250aCwgdGhpcy5lbmREYXkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVTYWxzYWgoKS5nZXREYXRlQXNTdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmsgdmFsdWUgb2JqZWN0IChyZWlmaWNhdGlvbikuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlua1ZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2U/OiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVnZXIgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVnZXJWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaW50ZWdlcjogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlci50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkZWNpbWFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREZWNpbWFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGRlY2ltYWw6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGltYWdlRmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIpIHtcblxuICAgICAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgYSBqcGVnLCBpdCBpcyBhIHByZXZpZXcgaW1hZ2VcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSBpbWFnZUZpbGVuYW1lLmVuZHNXaXRoKCcuanBnJyk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIG1ha2VJSUlGVXJsKHJlZHVjZUZhY3RvcjogbnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5mbG9vcigxMDAgLyByZWR1Y2VGYWN0b3IpO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gKHBlcmNlbnRhZ2UgPiAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwKSA/IHBlcmNlbnRhZ2UgOiA1MDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIHRoaXMuaW1hZ2VGaWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCByZXByZXNlbnRhdGlvbiB2YWx1ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0RmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB0ZXh0RmlsZW5hbWU6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVVUkw6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0RmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRGaWxlVVJMO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xvciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQ29sb3JWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY29sb3JIZXg6IHN0cmluZykge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQ29sb3JWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvckhleDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBvaW50IGluIGEgMkQtY29vcmRpbmF0ZSBzeXN0ZW0gKGZvciBnZW9tZXRyeSB2YWx1ZXMpLlxuICovXG5leHBvcnQgY2xhc3MgUG9pbnQyRCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgcGFyc2VkIGZyb20gSlNPTi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lvbkdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lQ29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludDJEW10sXG4gICAgICAgIHB1YmxpYyB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByYWRpdXM/OiBQb2ludDJEXG4gICAgKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkR2VvbVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGdlb21ldHJ5U3RyaW5nOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBnZW9tZXRyeUpTT04gPSBKU09OLnBhcnNlKGdlb21ldHJ5U3RyaW5nKTtcblxuICAgICAgICBjb25zdCBwb2ludHM6IFBvaW50MkRbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGdlb21ldHJ5SlNPTi5wb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludDJEKHBvaW50LngsIHBvaW50LnkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYWRpdXM7XG4gICAgICAgIGlmIChnZW9tZXRyeUpTT04ucmFkaXVzKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBuZXcgUG9pbnQyRChnZW9tZXRyeUpTT04ucmFkaXVzLngsIGdlb21ldHJ5SlNPTi5yYWRpdXMueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFJlZ2lvbkdlb21ldHJ5KFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnN0YXR1cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lQ29sb3IsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZVdpZHRoLFxuICAgICAgICAgICAgcG9pbnRzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnR5cGUsXG4gICAgICAgICAgICByYWRpdXNcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeTtcblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRHZW9tVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlTdHJpbmc7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBVUkkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFVyaVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHVyaTogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVXJpVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRVcmlWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIEJvb2xlYW4gdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEJvb2xlYW5WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBib29sOiBib29sZWFuKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2wudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlcnZhbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVydmFsU3RhcnQ6IG51bWJlciwgcmVhZG9ubHkgaW50ZXJ2YWxFbmQ6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlcnZhbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVydmFsU3RhcnQudG9TdHJpbmcoKSArICctJyArIHRoaXMuaW50ZXJ2YWxFbmQ7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlzdFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlTGFiZWw6IHN0cmluZywgKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlzdFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlzdFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlTGFiZWw7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkUHJvcGVydGllcywgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSByZXNvdXJjZSdzIElyaS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgcmVzb3VyY2UncyB0eXBlIChjbGFzcykuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIHRoZSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1JlZ2lvbnMgcmVnaW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nTGlua3MgcmVzb3VyY2VzIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdfSBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ICBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgdG8gYmUgZGlzcGxheWVkIGZvciB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtSZWFkUHJvcGVydGllc30gcHJvcGVydGllcyB0aGUgcmVzb3VyY2VzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdSZWdpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdMaW5rczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXk6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVydGllcz86IFJlYWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zLCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCwgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvLyBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAvLyBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgLy8gZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCB0aGUgVVJMIGZvciB0aGUgR0VUIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtIdHRwUGFyYW1zfSBwYXJhbXMgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBHRVQgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBHZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBIdHRwUGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHtvYnNlcnZlOiAncmVzcG9uc2UnLCBwYXJhbXM6IHBhcmFtc30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIEpTT04tTEQgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogRXhwYW5kcyBJcmlzIGFuZCBjcmVhdGVzIGFuIGVtcHR5IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NKU09OTEQocmVzb3VyY2VSZXNwb25zZTogQXBpU2VydmljZVJlc3VsdCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgY29uc3QgcmVzUHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgIGNvbnN0IHJlc1Byb21pc2UgPSByZXNQcm9taXNlcy5jb21wYWN0KHJlc291cmNlUmVzcG9uc2UuYm9keSwge30pO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgIHJldHVybiBmcm9tKHJlc1Byb21pc2UpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gYm9keVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBQdXQocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBlcnJvclxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgQXBpU2VydmljZUVycm9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2FsbGVudGl0aWVzLycgKyBlbmNvZGVVUklDb21wb25lbnQob250b2xvZ3lJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3NlcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKHJlc291cmNlQ2xhc3NJcmlzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc2VzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzVXJpRW5jID0gcmVzQ2xhc3NVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnICsgcmVzQ2xhc3NVcmlFbmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHByb3BlcnRpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBwcm9wZXJ0eSBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRQcm9wZXJ0aWVzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnRpZXNVcmlFbmMgPSAnJztcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNVcmlFbmMgPSBwcm9wZXJ0aWVzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJyArIHByb3BlcnRpZXNVcmlFbmMpO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgS25vcmFDb25zdGFudHMsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IE9udG9sb2d5U2VydmljZSB9IGZyb20gJy4vb250b2xvZ3kuc2VydmljZSc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIG9jY3VycmVkIGluIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBvbnRvbG9neSdzIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lNZXRhZGF0YSB7XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZWNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgYSBsYWJlbCBkZXNjcmliaW5nIHRoZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIE9jY3VycmVuY2Ugb2YgYSBwcm9wZXJ0eSBmb3IgYSByZXNvdXJjZSBjbGFzcyAoaXRzIGNhcmRpbmFsaXR5KS5cbiAqL1xuZXhwb3J0IGVudW0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlIHtcbiAgICBtaW5DYXJkID0gMCxcbiAgICBjYXJkID0gMSxcbiAgICBtYXhDYXJkID0gMlxufVxuXG5cbi8qKlxuICogQ2FyZGluYWxpdHkgb2YgYSBwcm9wZXJ0eSBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FyZGluYWxpdHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eU9jY3VycmVuY2V9IG9jY3VycmVuY2UgdHlwZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBudW1lcmljYWwgdmFsdWUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRoZSBnaXZlbiBvY2N1cnJlbmNlIGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb2NjdXJyZW5jZTogQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgICAgICByZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiBwYXRoIHRvIGFuIGljb24gcmVwcmVzZW50aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eVtdfSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaWNvbjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhcmRpbmFsaXRpZXM6IEFycmF5PENhcmRpbmFsaXR5Pikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyB0byByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NlcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZXNvdXJjZUNsYXNzO1xufVxuXG5cbi8qKlxuICogQSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0VHlwZSB0aGUgcHJvcGVydHkncyBvYmplY3QgY29uc3RyYWludC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHN1YlByb3BlcnR5T2YgSXJpcyBvZiBwcm9wZXJ0aWVzIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIHN1YnByb3BlcnR5IG9mLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFZGl0YWJsZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgY2FuIGJlIGVkaXRlZCBieSB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgbGlua2luZyBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGlua1ZhbHVlUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IHJlZmVycyB0byBhIGxpbmsgdmFsdWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgb2JqZWN0VHlwZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN1YlByb3BlcnR5T2Y6IEFycmF5PHN0cmluZz4sXG4gICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1Byb3BlcnR5OiBCb29sZWFuLFxuICAgICAgICByZWFkb25seSBpc0xpbmtWYWx1ZVByb3BlcnR5OiBCb29sZWFuKSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiBwcm9wZXJ0eSBJcmlzIHRvIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydGllcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQcm9wZXJ0eTtcbn1cblxuXG4vKipcbiAqIEdyb3VwcyByZXNvdXJjZSBjbGFzc2VzIGJ5IHRoZSBvbnRvbG9neSB0aGV5IGFyZSBkZWZpbmVkIGluLlxuICpcbiAqIEEgbWFwIG9mIG9udG9sb2d5IElyaXMgdG8gYW4gYXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgIFtpbmRleDogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgY2FjaGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIChvbmx5IHVzZWQgYnkgdGhpcyBzZXJ2aWNlIGludGVybmFsbHkpLlxuICogVGhpcyBjYWNoZSBpcyB1cGRhdGVkIHdoZW5ldmVyIG5ldyBkZWZpbml0aW9ucyBhcmUgcmVxdWVzdGVkIGZyb20gS25vcmEuXG4gKlxuICogUmVxdWVzdGVkIG9udG9sb2d5IGluZm9ybWF0aW9uIGJ5IGEgc2VydmljZSBpcyByZXByZXNlbnRlZCBieSBbW09udG9sb2d5SW5mb3JtYXRpb25dXS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5TWV0YWRhdGFbXX0gb250b2xvZ2llcyBBbiBhcnJheSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSBsaXN0IG9mIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIG5hbWVkIGdyYXBoLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3k7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vbnRvbG9naWVzID0gW107XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NlcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIG9udG9sb2d5IGluZm9ybWF0aW9uIHJlcXVlc3RlZCBmcm9tIHRoaXMgc2VydmljZS5cbiAqXG4gKiBGb3IgZXZlcnkgcmVxdWVzdCwgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBpcyByZXR1cm5lZCBjb250YWluaW5nIHRoZSByZXF1ZXN0ZWQgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neX0gcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgZ2l2ZW4gb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3ksXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXMsXG4gICAgICAgIHByaXZhdGUgcHJvcGVydGllczogUHJvcGVydGllcykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGEgc2VydmljZSBsaWtlIHRoZSBzZWFyY2ggZmV0Y2hlcyBuZXcgcmVzdWx0c1xuICAgICAqIHRoYXQgaGF2ZSB0byBiZSBhZGRlZCB0byBhbiBleGlzdGluZyBjb2xsZWN0aW9uLlxuICAgICAqIFRoZSBleGlzdGluZyBvbnRvbG9neSBpbmZvcm1hdGlvbiBtdXN0IG5vdCBiZSBsb3N0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gdGhlIGdpdmVuIGRlZmluaXRpb25zIHRoYXQgaGF2ZSB0byBiZSBpbnRlZ3JhdGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzZXMgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NbXVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZiA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc0NsYXNzRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3Mgd2l0aG91dCBhcmd1bWVudCByZXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBQcm9wZXJ0aWVzIC0gYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMoKTogUHJvcGVydGllcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFByb3BlcnR5W10gLSBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzQXNBcnJheSgpOiBBcnJheTxQcm9wZXJ0eT4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BJcmkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUHJvcGVydHkocHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChwcm9wRGVmICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclByb3BlcnR5IHdpdGhvdXQgYXJndW1lbnQgcHJvcGVydHknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICogT3RoZXIgY29tcG9uZW50cyBvciBzZXJ2aWNlcyBvYnRhaW4gb250b2xvZ3kgaW5mb3JtYXRpb24gdGhyb3VnaCB0aGlzIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lDYWNoZVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogT250b2xvZ2llcyBpbmdvcmVkIGJ5IHRoaXMgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZE9udG9sb2dpZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZFByb3BlcnRpZXMgcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kIHRoYXQgaGF2ZSB0byBiZSBpZ25vcmVkIGJlY2F1c2UgdGhleSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm9uUmVzb3VyY2VDbGFzc2VzIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lDYWNoZX0gY2FjaGVPbnRvbG9neSBjZW50cmFsIGluc3RhbmNlIHRoYXQgY2FjaGVzIGFsbCBkZWZpbml0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2FjaGVPbnRvbG9neTogT250b2xvZ3lDYWNoZSA9IG5ldyBPbnRvbG9neUNhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vbnRvbG9neVNlcnZpY2U6IE9udG9sb2d5U2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcyBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBvbnRvbG9naWVzIGFzIEpTT04tTEQgKG5vIHByZWZpeGVzLCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyAocmVzb3VyY2UgY2xhc3NlcyBhbmQgcHJvcGVydGllcykgZm9yIHRoZSBnaXZlbiBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmkgb2YgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3Igb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGFsbCB0aGUgb250b2xvZ2llcycgbWV0YWRhdGEgcmV0dXJuZWQgYnkgS25vcmEgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gb250b2xvZ2llcyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIGEgbmV3IE9udG9sb2d5TWV0YWRhdGEgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4gLSBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PG9iamVjdD59IGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3ViY2xhc3NPZkNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIHNpbmdsZSBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSBbcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc1N1YmNsYXNzT2ZdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJjbGFzc09mQ29sbGVjdGlvbiA9IHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY2FyZGluYWxpdGllcyBmb3IgdGhlIHByb3BlcnRpZXMgb2YgYSByZXNvdXJjZSBjbGFzc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY3VyQ2FyZCBvZiBzdWJjbGFzc09mQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgZ3VpIG9yZGVyXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0aWVzLnB1c2gobmV3Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZSBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9IG5ldyBQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUsXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzQ29tbWVudF0sXG4gICAgICAgICAgICAgICAgcHJvcERlZltLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgaXNFZGl0YWJsZSxcbiAgICAgICAgICAgICAgICBpc0xpbmtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc0xpbmtWYWx1ZVByb3BlcnR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcHJvcGVydHkgZGVmaW5pdGlvbnMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9udG9sb2d5SW5mb3JtYXRpb24gLSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW50aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgbm9uIEtub3JhIHByb3BzOiBpZiBwcm9wSXJpIGlzIGNvbnRhaW5lZCBpbiBleGNsdWRlZFByb3BlcnRpZXMsIHNraXAgdGhpcyBwcm9wSXJpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhjbHVkZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcElyaSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZTogcHJvcGVydHkgbm90IGZvdW5kIGluIGNhY2hlOiAke3Byb3BJcml9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvcGVydHlEZWZzW3Byb3BJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIG5ldyBSZXNvdXJjZUNsYXNzZXMoKSwgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiAtIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgaW4gY2FjaGUgeWV0LCBnZXQgbWV0YWRhdGEgZnJvbSBLbm9yYVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShtZXRhZGF0YVsnQGdyYXBoJ10uZmlsdGVyKChvbnRvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIGV4Y2x1ZGVkIG9udG9sb2dpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leGNsdWRlZE9udG9sb2dpZXMuaW5kZXhPZihvbnRvWydAaWQnXSkgPT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcmV0dXJuIG1ldGFkYXRhIGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMgZnJvbSBLbm9yYSwgYWRkaW5nIHRoZW0gdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcmVxdWVzdGVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55W10+XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8YW55W10+IHtcblxuICAgICAgICAvLyBhcnJheSB0byBiZSBwb3B1bGF0ZWQgd2l0aCBPYnNlcnZhYmxlc1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IFtdO1xuXG4gICAgICAgIC8vIGRvIGEgcmVxdWVzdCBmb3IgZWFjaCBvbnRvbG9neVxuICAgICAgICBvbnRvbG9neUlyaXMuZm9yRWFjaChvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAvLyBwdXNoIGFuIE9ic2VydmFibGUgb250byBgb2JzZXJ2YWJsZXNgXG4gICAgICAgICAgICBvYnNlcnZhYmxlcy5wdXNoKHRoaXMuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neUZyb21Lbm9yYShvbnRvbG9neUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChvbnRvbG9neTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3cml0ZSByZXNwb25zZSB0byBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9ya0pvaW4gcmV0dXJucyBhbiBPYnNlcnZhYmxlIG9mIGFuIGFycmF5IG9mIHJlc3VsdHNcbiAgICAgICAgLy8gcmV0dXJuZWQgYnkgZWFjaCBPYnNlcnZhYmxlIGNvbnRhaW5lZCBpbiBgb2JzZXJ2YWJsZXNgXG4gICAgICAgIC8vIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5IGZvcmtKb2luIGlzIGV4ZWN1dGVkXG4gICAgICAgIC8vIG9uY2UgYWxsIE9ic2VydmFibGVzIGhhdmUgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9ic2VydmFibGVzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIElyaXMgb2YgdGhlIG9udG9sb2dpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYWxsIG9udG9sb2d5IG1ldGFkYXRhIGZyb20gdGhlIGNhY2hlXG4gICAgICovXG4gICAgcHVibGljIGdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzVG9RdWVyeSA9IG9udG9sb2d5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBvbnRvbG9neUlyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBvbnRvbG9neSBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IG9udG9sb2dpZXMgdGhhdCBhcmUgbW90IGNhY2hlZCB5ZXRcbiAgICAgICAgaWYgKG9udG9sb2d5SXJpc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRDYWNoZU9udG9sb2dpZXMob250b2xvZ3lJcmlzVG9RdWVyeSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNvdXJjZUNsYXNzSXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHJldHVybmVkIC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlEZWZpbml0aW9ucyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllc1RvUXVlcnk6IHN0cmluZ1tdID0gcHJvcGVydHlJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcHJvcGVydGllc1RvUXVlcnkubWFwKFxuICAgICAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHByb3BJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSB3aXRoOiByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpcyk7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgZW50aXRpZXMgdXNlZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvbiBvZiBgUmVhZFJlc291cmNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgb250b2xvZ3lJbmZvcm1hdGlvbjogT250b2xvZ3lJbmZvcm1hdGlvbiA9IG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKHt9LCB7fSwge30pO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyB0aGUgcmVzdWx0IG9mIGEgY291bnQgcXVlcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudFF1ZXJ5UmVzdWx0IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG51bWJlck9mUmVzdWx0cyB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyBmb3IgYSBxdWVyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXN1bHRzOiBudW1iZXIpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEltYWdlUmVnaW9uIH0gZnJvbSAnLi9pbWFnZS1yZWdpb24nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW1hZ2UgaW5jbHVkaW5nIGl0cyByZWdpb25zLlxuICovXG5cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRTdGlsbEltYWdlRmlsZVZhbHVlfSBzdGlsbEltYWdlRmlsZVZhbHVlIGEgW1tSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZV1dIHJlcHJlc2VudGluZyBhbiBpbWFnZS5cbiAgICAgKiBAcGFyYW0ge0ltYWdlUmVnaW9uW119IHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgcmVhZG9ubHkgcmVnaW9uczogSW1hZ2VSZWdpb25bXSkge1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkR2VvbVZhbHVlLCBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9rbm9yYS1jb25zdGFudHMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWdpb24uXG4gKiBDb250YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgcmVzb3VyY2UgcmVwcmVzZW50aW5nIHRoZSByZWdpb24gYW5kIGl0cyBnZW9tZXRyaWVzLlxuICovXG5cbmV4cG9ydCBjbGFzcyBJbWFnZVJlZ2lvbiB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFJlc291cmNlfSByZWdpb25SZXNvdXJjZSBhIHJlc291cmNlIG9mIHR5cGUgUmVnaW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UmVhZEdlb21WYWx1ZVtdfVxuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi9kZWNsYXJhdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IEt1aUNvcmVDb25maWd9XG4gICAgXVxufSlcblxuXG5leHBvcnQgY2xhc3MgS3VpQ29yZU1vZHVsZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0t1aUNvcmVDb25maWd9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgICAqL1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogS3VpQ29yZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICAvLyBnZXQgdGhlIGFwcCBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGhlcmVcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBLdWlDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIEdyb3VwLCBHcm91cFJlc3BvbnNlLCBHcm91cHNSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IGdyb3VwIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2dyb3Vwcyc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCBncm91cHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwW10+XG4gICAgICovXG4gICAgZ2V0QWxsR3JvdXBzKCk6IE9ic2VydmFibGU8R3JvdXBbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgZ3JvdXAgb2JqZWN0IChmaWx0ZXIgYnkgSVJJKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwPlxuICAgICAqL1xuICAgIGdldEdyb3VwQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEdyb3VwPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cFJlc3BvbnNlKS5ncm91cCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBMaXN0LFxuICAgIExpc3RDcmVhdGVQYXlsb2FkLFxuICAgIExpc3RJbmZvLFxuICAgIExpc3RJbmZvUmVzcG9uc2UsXG4gICAgTGlzdEluZm9VcGRhdGVQYXlsb2FkLFxuICAgIExpc3ROb2RlSW5mbyxcbiAgICBMaXN0Tm9kZUluZm9SZXNwb25zZSxcbiAgICBMaXN0UmVzcG9uc2UsXG4gICAgTGlzdHNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgbGlzdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGxpc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+XG4gICAgICovXG4gICAgZ2V0TGlzdHMocHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+IHtcbiAgICAgICAgaWYgKHByb2plY3RJcmkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCArPSAnP3Byb2plY3RJcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0c1Jlc3BvbnNlKS5saXN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3Q+XG4gICAgICovXG4gICAgZ2V0TGlzdChsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGggKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBub2RlIGluZm8gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZUluZm8obm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdE5vZGVJbmZvUmVzcG9uc2UpLm5vZGVpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGNyZWF0ZUxpc3QocGF5bG9hZDogTGlzdENyZWF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFZGl0IGxpc3QgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdEluZm9VcGRhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICB1cGRhdGVMaXN0SW5mbyhwYXlsb2FkOiBMaXN0SW5mb1VwZGF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQocGF5bG9hZC5saXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgUHJvamVjdCwgUHJvamVjdE1lbWJlcnNSZXNwb25zZSwgUHJvamVjdFJlc3BvbnNlLCBQcm9qZWN0c1Jlc3BvbnNlLCBVc2VyIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBwcm9qZWN0cyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgcHJvamVjdHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3RbXT5cbiAgICAgKi9cbiAgICBnZXRBbGxQcm9qZWN0cygpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvYWRtaW4vcHJvamVjdHMnKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RzUmVzcG9uc2UpLnByb2plY3RzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeUlyaShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZSBzaG9ydCBuYW1lIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRuYW1lICsgJz9pZGVudGlmaWVyPXNob3J0bmFtZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvamVjdCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnRjb2RlIGhleGFkZWNpbWFsIGNvZGUgdGhhdCB1bmlxdWVseSBpZGVudGlmaWVzIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGdldFByb2plY3RCeVNob3J0Y29kZShzaG9ydGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCByZXRyaWV2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgcHJvamVjdCBpZCAoaXJpKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0bmFtZSBzaG9ydCBuYW1lIHRoYXQgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydG5hbWUoc2hvcnRuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb2plY3QgbWVtYmVycy5cbiAgICAgKiBQcm9qZWN0IGlkZW50aWZpZXIgaXMgc2hvcnRjb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldFByb2plY3RNZW1iZXJzQnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSAnL2FkbWluL3Byb2plY3RzL21lbWJlcnMvJyArIHNob3J0Y29kZSArICc/aWRlbnRpZmllcj1zaG9ydGNvZGUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0TWVtYmVycyh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogSGVscGVyIG1ldGhvZCBjb21iaW5pbmcgcHJvamVjdCBtZW1iZXIgcmV0cmlldmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRQcm9qZWN0TWVtYmVycyh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RNZW1iZXJzUmVzcG9uc2UpLm1lbWJlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGNyZWF0ZVByb2plY3QoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHVybCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVkaXQgcHJvamVjdCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgdXBkYXRlUHJvamVjdChpcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSBwcm9qZWN0IChpZiBpdCB3YXMgZGVsZXRlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgYWN0aXZhdGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAoc2V0IGluYWN0aXZlKSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGRlbGV0ZVByb2plY3QoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgVXNlcixcbiAgICBVc2VyUmVzcG9uc2UsXG4gICAgVXNlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgdXNlcyB0aGUgS25vcmEgYWRtaW4gQVBJIGFuZCBoYW5kbGVzIGFsbCB1c2VyIGRhdGEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICB1c2Vyc1VybDogc3RyaW5nID0gdGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi91c2Vycyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHVzZXJzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyW10+XG4gICAgICovXG4gICAgZ2V0QWxsVXNlcnMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3VzZXJzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2Vyc1Jlc3BvbnNlKS51c2VycyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIEdldCB1c2VyIGJ5IHVzZXJuYW1lLCBlbWFpbCBvciBieSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQhIFBsZWFzZSB1c2UgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpIG9ubHkhXG4gICAgICogR2V0IHVzZXIgYnkgZW1haWxcbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbFxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFVzZXI+fVxuICAgICAqL1xuICAgIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihlbWFpbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwcmVjYXRlZCEgUGxlYXNlIHVzZSBnZXRVc2VyKGlkZW50aWZpZXI6IHN0cmluZykgb25seSFcbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlcihpcmkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGNyZWF0ZVVzZXIoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1Byb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdXNlciBvZiBhbiBhZG1pbiBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3RBZG1pbih1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy1hZG1pbi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQVVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gdGhlIGFkbWluIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvU3lzdGVtQWRtaW4odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG93biBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFBhc3N3b3JkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1Bhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHVwZGF0ZU93blBhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgb2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHBhc3N3b3JkIG9mIGFub3RoZXIgdXNlciAobm90IG93bikuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2Vyc1Bhc3N3b3JkKHVzZXJJcmk6IHN0cmluZywgcmVxdWVzdGVyUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVzZXIodXNlcklyaSwgZGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdXNlciBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgLyBkZWFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBkZWxldGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlcnZpY2Uge1xuXG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBzZXRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh7IHZhcjogbGFuZyB9KTtcbiAgfVxuICBnZXRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTXNnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gIH1cblxuICAvKipcbiAgKiB0aGlzIG1ldGhvZCBnZXQgdGhlIHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBzdGF0dXNNc2cuanNvbiBmaWxlXG4gICogd2hpY2ggYXJlIGRlZmluZWQgaGVyZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2Rlc1xuICAqIGFuZCBoZXJlOiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcFxuICAqXG4gICovXG4gIGdldFN0YXR1c01zZygpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwcCArICcvYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nKVxuICAgICAgLnBpcGUobWFwKFxuICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgKTtcblxuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgICBDb3VudFF1ZXJ5UmVzdWx0LFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIFJlYWRCb29sZWFuVmFsdWUsXG4gICAgUmVhZENvbG9yVmFsdWUsXG4gICAgUmVhZERhdGVWYWx1ZSxcbiAgICBSZWFkRGVjaW1hbFZhbHVlLFxuICAgIFJlYWRHZW9tVmFsdWUsXG4gICAgUmVhZEludGVnZXJWYWx1ZSxcbiAgICBSZWFkSW50ZXJ2YWxWYWx1ZSxcbiAgICBSZWFkTGlua1ZhbHVlLFxuICAgIFJlYWRMaXN0VmFsdWUsXG4gICAgUmVhZFByb3BlcnRpZXMsXG4gICAgUmVhZFByb3BlcnR5SXRlbSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0RmlsZVZhbHVlLFxuICAgIFJlYWRUZXh0VmFsdWVBc0h0bWwsXG4gICAgUmVhZFRleHRWYWx1ZUFzU3RyaW5nLFxuICAgIFJlYWRUZXh0VmFsdWVBc1htbCxcbiAgICBSZWFkVXJpVmFsdWUsXG4gICAgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayxcbiAgICBVdGlsc1xufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIENvbnRhaW5zIG1ldGhvZHMgdG8gY29udmVydCBKU09OLUxEIHJlcHJlc2VudGluZyByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMgdG8gY2xhc3Nlcy5cbiAqIFRoZXNlIG1ldGhvZHMgd29ya3Mgb25seSBmb3IgaW5zdGFuY2VzIG9mIHJlc291cmNlcyBhbmQgcHJvcGVydGllcywgbm90IGZvciBvbnRvbG9naWVzIChkYXRhIG1vZGVsKS5cbiAqL1xuZXhwb3J0IG1vZHVsZSBDb252ZXJ0SlNPTkxEIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byBhIGZpbHRlciB1c2VkIG9uIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICogc29ydGluZyBvdXQgYWxsIG5vbiB2YWx1ZSBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgKlxuICAgICAqIEdldHMgYWxsIHByb3BlcnR5IG5hbWVzIHRoYXQgcmVmZXIgdG8gdmFsdWUgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wTmFtZSB0aGUgbmFtZSBvZiBhIHByb3BlcnR5IHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnMgYm9vbGVhbiAtIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRSZXNvdXJjZV1dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcyBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2Uge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlKFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0BpZCddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0B0eXBlJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgcHJvcGVydGllc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBmcm9tIEpTT04tTEQsXG4gICAgICogdGFraW5nIGludG8gYWNjb3VudCB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BWYWx1ZSB0aGUgdmFsdWUgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wSXJpIHRoZSBJcmkgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7UmVhZExpbmtWYWx1ZVtdfSBzdGFuZG9mZkxpbmtWYWx1ZXMgc3RhbmRvZmZMaW5rVmFsdWVzIG9mIHRoZSByZXNvdXJjZS4gVGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gbGlua3MgdG8gb3RoZXIgcmVzb3VyY2VzLlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gb3IgYHVuZGVmaW5lZGAgaW4gY2FzZSB0aGUgdmFsdWUgY291bGQgbm90IGJlIHByb2Nlc3NlZCBjb3JyZWN0bHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgIHByb3BWYWx1ZTogT2JqZWN0LCBwcm9wSXJpOiBzdHJpbmcsIHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdKTogUmVhZFByb3BlcnR5SXRlbSB8IHVuZGVmaW5lZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcblxuICAgICAgICBsZXQgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGVcbiAgICAgICAgc3dpdGNoIChwcm9wVmFsdWVbJ0B0eXBlJ10pIHtcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dFZhbHVlOlxuICAgICAgICAgICAgICAgIC8vIGEgdGV4dCB2YWx1ZSBtaWdodCBiZSBnaXZlbiBhcyBwbGFpbiBzdHJpbmcsIGh0bWwgb3IgeG1sLlxuICAgICAgICAgICAgICAgIGxldCB0ZXh0VmFsdWU6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1N0cmluZyhwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHN0YW5kb2ZmIGxpbmtzIGFuZCBpbmNsdWRlIHJlZmVycmVkIHJlc291cmNlcywgaWYgYW55XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggYSBzdGFuZG9mZiBsaW5rLCBmdXJ0aGVyIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSBjYW4gYmUgc2hvd25cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmsgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlczogUmVhZFJlc291cmNlID0gc3RhbmRvZmZMaW5rLnJlZmVycmVkUmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlc1tyZWZlcnJlZFJlcy5pZF0gPSByZWZlcnJlZFJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNIdG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0sIHJlZmVycmVkUmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSAhPT0gdW5kZWZpbmVkICYmIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzWG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4cGVjdGVkIHRleHQgdmFsdWUgbWVtYmVycyBub3QgZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogSW52YWxpZCB0ZXh0IHZhbHVlOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlOlxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG5ldyBSZWFkRGF0ZVZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNDYWxlbmRhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kWWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydERheV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmREYXldKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGF0ZVZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGxldCBsaW5rVmFsdWU6IFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgaXMgZ2l2ZW4gYXMgYW4gb2JqZWN0IG9yIGp1c3QgYXMgYW4gSVJJXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0IGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2UuaWQsIHJlZmVycmVkUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXRJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlIGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2UuaWQsIGluY29taW5nUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2VJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpbmtWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFZhbHVlID0gbmV3IFJlYWRJbnRlZ2VyVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVnZXJWYWx1ZUFzSW50ZWdlcl0pO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyBhIGRlY2ltYWwgdmFsdWUgaXMgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmcgaW4gb3JkZXIgdG8gcHJlc2VydmUgaXRzIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY1ZhbDogbnVtYmVyID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGVjaW1hbFZhbHVlQXNEZWNpbWFsXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjaW1hbFZhbHVlID0gbmV3IFJlYWREZWNpbWFsVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgZGVjVmFsKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRlY2ltYWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IG5ldyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEZpbGVWYWx1ZSA9IG5ldyBSZWFkVGV4dEZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0RmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRDb2xvclZhbHVlOiBSZWFkQ29sb3JWYWx1ZSA9IG5ldyBSZWFkQ29sb3JWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmNvbG9yVmFsdWVBc0NvbG9yXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRDb2xvclZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuR2VvbVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZEdlb21WYWx1ZTogUmVhZEdlb21WYWx1ZSA9IG5ldyBSZWFkR2VvbVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZEdlb21WYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdXJpVmFsdWU6IFJlYWRVcmlWYWx1ZSA9IG5ldyBSZWFkVXJpVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy51cmlWYWx1ZUFzVXJpXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB1cmlWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xWYWx1ZTogUmVhZEJvb2xlYW5WYWx1ZSA9IG5ldyBSZWFkQm9vbGVhblZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuYm9vbGVhblZhbHVlQXNCb29sZWFuXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGJvb2xWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudGVkIGFzIHN0cmluZ3MgdG8gcHJlc2VydmUgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgaW50U3RhcnQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzU3RhcnRdWydAdmFsdWUnXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW50RW5kID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc0VuZF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludGVydmFsVmFsdWU6IFJlYWRJbnRlcnZhbFZhbHVlID0gbmV3IFJlYWRJbnRlcnZhbFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBpbnRTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgaW50RW5kXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50ZXJ2YWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RWYWx1ZTogUmVhZExpc3RWYWx1ZSA9IG5ldyBSZWFkTGlzdFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZV1bJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpc3RWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIHVuc3VwcG9ydGVkIHZhbHVlIHR5cGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogdmFsdWUgdHlwZSBub3QgaW1wbGVtZW50ZWQgeWV0OiAnICsgcHJvcFZhbHVlWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVNwZWNpZmljUHJvcDtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgW1tSZWFkUHJvcGVydGllc11dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIFJlYWRQcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRQcm9wZXJ0aWVzIHtcblxuICAgICAgICAvLyBKU09OLUxEIHJlcHJlc2VudGluZyBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICAvLyB0ZXh0IHZhbHVlcyBtYXkgY29udGFpbiBzdGFuZG9mZiBsaW5rc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQ6IE9iamVjdCA9IHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWVdO1xuXG4gICAgICAgIC8vIHRvIGJlIHBvcHVsYXRlZCB3aXRoIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdID0gW107XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0YW5kb2ZmIGxpbmsgdmFsdWUgSlNPTi1MRCBvYmplY3QgdG8gYSBSZWFkTGlua1ZhbHVlXG4gICAgICAgIC8vIGluIG9yZGVyIHBvcHVsYXRlIHRoZSBjb2xsZWN0aW9uIHdpdGggYWxsIHRoZSBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGlua0pTT05MRCBvZiBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbDogUmVhZExpbmtWYWx1ZSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbCA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIHRoZSBnaXZlbiBwcm9wZXJ0eSBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVzOiBBcnJheTxSZWFkUHJvcGVydHlJdGVtPiA9IFtdO1xuXG4gICAgICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgdmFsdWVzIG9yIGp1c3Qgb25lIHZhbHVlIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBhbiBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMgaXMgZ2l2ZW4sIGl0ZXJhdGUgb3ZlciBpdFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcFZhbHVlIG9mIHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocHJvcFZhbHVlLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgcHJvcGVydGllcyBvYmplY3RcbiAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcFZhbHVlcztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYW4gQVBJIHJlc3BvbnNlIGluIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzIGludG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgcmVzb3VyY2Ugb3IgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlc1NlcXVlbmNlIC0gc2VxdWVuY2Ugb2YgcmVhZCByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4gPSBbXTtcbiAgICAgICAgbGV0IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSByZXNvdXJjZXNHcmFwaC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBhbnN3ZXIsIG5vIHJlc291cmNlcyBnaXZlblxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UocmVzb3VyY2VzLCBudW1iZXJPZlJlc291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyBhbGwgdGhlIHR5cGVzIChjbGFzc2VzKSBvZiByZWZlcnJlZCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIHJlc291cmNlIChmcm9tIGl0cyBsaW5raW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIEpTT04tTEQgZGVzY3JpYmluZyBvbmUgcmVzb3VyY2UuXG4gICAgICogQHJldHVybiBzdHJpbmdbXSAtIGFuIEFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMgKGluY2x1ZGluZyBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgLy8gc2V2ZXJhbCB2YWx1ZXMgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZWZlcnJlZFJlcyBvZiByZXNvdXJjZUpTT05MRFtwcm9wXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZSBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzb3VyY2UgdHlwZXMgKGNsYXNzZXMpIGZyb20gYSBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzICh3aXRob3V0IGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG4gICAgICAgIGxldCByZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCBjbGFzcyBvZiB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc2VzLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGEgSlNPTi1MRCByZXNwb25zZSB0byBhIGNvdW50IHF1ZXJ5IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY291bnRRdWVyeUpTT05MRFxuICAgICAqIEByZXR1cm5zIHtDb3VudFF1ZXJ5UmVzdWx0fVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTEQ6IG9iamVjdCkge1xuICAgICAgICByZXR1cm4gbmV3IENvdW50UXVlcnlSZXN1bHQoY291bnRRdWVyeUpTT05MRFtLbm9yYUNvbnN0YW50cy5zY2hlbWFOdW1iZXJPZkl0ZW1zXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCwgS3VpQ29yZUNvbmZpZywgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDb252ZXJ0SlNPTkxEIH0gZnJvbSAnLi9jb252ZXJ0LWpzb25sZCc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX29udG9sb2d5Q2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2UoaXJpKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZSBhcyBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKG5vdCB5ZXQgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBnZXRSZWFkUmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgY2FzZSBvZiBhbiBBcGlTZXJ2aWNlRXJyb3JcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIENvdW50UXVlcnlSZXN1bHQsIEt1aUNvcmVDb25maWcsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBDb252ZXJ0SlNPTkxEIH0gZnJvbSAnLi9jb252ZXJ0LWpzb25sZCc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8qKlxuICogUGVyZm9ybXMgc2VhcmNoZXMgKGZ1bGx0ZXh0IG9yIGV4dGVuZGVkKSBhbmQgc2VhcmNoIGNvdW50IHF1ZXJpZXMgaW50byBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEpTT04tTEQgb2JqZWN0IHRvIGEgYFJlYWRSZXNvcmNlU2VxdWVuY2VgLlxuICAgICAqIFRvIGJlIHBhc3NlZCBhcyBhIGZ1bmN0aW9uIHBvaW50ZXIgKGFycm93IG5vdGF0aW9uIHJlcXVpcmVkKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlOiAocmVzb3VyY2VSZXNwb25zZTogT2JqZWN0KSA9PiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4gPSAocmVzb3VyY2VSZXNwb25zZTogT2JqZWN0KSA9PiB7XG4gICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2guXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaChzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnb2Zmc2V0Jywgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIHNlYXJjaFRlcm0sIGh0dHBQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAoZm9yIHBhZ2luZywgZmlyc3Qgb2Zmc2V0IGlzIDApLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ29mZnNldCcsIG9mZnNldC50b1N0cmluZygpKTtcblxuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSwgaHR0cFBhcmFtcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIE9ic2VydmFibGUgb2YgUmVhZFJlc291cmNlc1NlcXVlbmNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHRgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeShzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeSBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gYSBgQ291bnRRdWVyeVJlc3VsdGBcbiAgICAgICAgICAgICAgICBDb252ZXJ0SlNPTkxELmNyZWF0ZUNvdW50UXVlcnlSZXN1bHRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaChncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIGdyYXZzZWFyY2hRdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkJywgZ3JhdnNlYXJjaFF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGNvdW50IHF1ZXJ5LlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5KGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIGdyYXZzZWFyY2hRdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoIGNvdW50IHF1ZXJ5IGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZC9jb3VudCcsIGdyYXZzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gYSBgQ291bnRRdWVyeVJlc3VsdGBcbiAgICAgICAgICAgICAgICBDb252ZXJ0SlNPTkxELmNyZWF0ZUNvdW50UXVlcnlSZXN1bHRcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgc2VhcmNoIGJ5IGEgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBzZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzb3VyY2VDbGFzc0lSSV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUmVzb3VyY2VDbGFzcycsIHJlc291cmNlQ2xhc3NJUkkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHByb2plY3RJcmkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cEdldCgpIGV4cGVjdHMgb25seSBvbmUgYXJndW1lbnQsIG5vdCAyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbCBhbmQgdHVybnMgdGhlIHJlc3VsdHMgaW4gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc291cmNlQ2xhc3NJUkldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb2plY3RJcmldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCByZXNvdXJjZUNsYXNzSVJJPzogc3RyaW5nLCBwcm9qZWN0SXJpPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJywgcmVzb3VyY2VDbGFzc0lSSSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9Qcm9qZWN0JywgcHJvamVjdElyaSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG4vKipcbiAqIFJlcXVlc3RzIGluY29taW5nIGluZm9ybWF0aW9uIChyZWdpb25zLCBsaW5rcywgc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucykgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSW5jb21pbmdTZXJ2aWNlIGV4dGVuZHMgU2VhcmNoU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAqIFJldHVybnMgYWxsIGluY29taW5nIHJlZ2lvbnMgZm9yIGEgcGFydGljdWxhciByZXNvdXJjZS5cbiAgICAqXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJUkkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgSW5jb21pbmcgcmVnaW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAqL1xuICAgIGdldEluY29taW5nUmVnaW9ucyhyZXNvdXJjZUlSSTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3JlZ2lvbiBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG59IFdIRVJFIHtcbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVnaW9uIC5cbj9yZWdpb24gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSVJJfT4gLlxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJUkl9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0dlb21ldHJ5ID9nZW9tIC5cbmtub3JhLWFwaTpoYXNHZW9tZXRyeSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9nZW9tIGEga25vcmEtYXBpOkdlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cbmtub3JhLWFwaTpoYXNDb21tZW50IGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDpzdHJpbmcgLlxuXG4/Y29tbWVudCBhIHhzZDpzdHJpbmcgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxua25vcmEtYXBpOmhhc0NvbG9yIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpDb2xvciAuXG5cbj9jb2xvciBhIGtub3JhLWFwaTpDb2xvciAuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzcGFycWxRdWVyeVN0ciAnLCBzcGFycWxRdWVyeVN0cik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSwgaWYgYW55LlxuICAgICAqIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgbGluayB0byB0aGUgZ2l2ZW4gcmVzb3VyY2UgdmlhIGtub3JhLWJhc2U6aXNQYXJ0T2YuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNGb3JDb21wb3VuZFJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cGFnZSBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG59IFdIRVJFIHtcblxuP3BhZ2UgYSBrbm9yYS1hcGk6U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIC5cbj9wYWdlIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxua25vcmEtYXBpOnNlcW51bSBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6aW50ZWdlciAuXG5cbj9zZXFudW0gYSB4c2Q6aW50ZWdlciAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG5rbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkZpbGUgLlxuXG4/ZmlsZSBhIGtub3JhLWFwaTpGaWxlIC5cblxufSBPUkRFUiBCWSA/c2VxbnVtXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGluY29taW5nIGxpbmtzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgSXJpIGJ1dCBpbmNvbWluZyByZWdpb25zIGFuZCBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgaW5jb21pbmcgbGlua3Mgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ0xpbmtzRm9yUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9pbmNvbWluZ1JlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG59IFdIRVJFIHtcblxuP2luY29taW5nUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdQcm9wIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdGVHcmF2c2VhcmNoIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5LlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdGFrZXMgdGhlIG9mZnNldFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgYSBwYXJhbWV0ZXIgYW5kIHJldHVybnMgYSBHcmF2c2VhcmNoIHF1ZXJ5IHN0cmluZy5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgZmFsc2UgaWYgbm90IHNldCBjb3JyZWN0bHkgKGluaXQgc3RhdGUpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZW5lcmF0ZUdyYXZzZWFyY2g6IChvZmZzZXQ6IG51bWJlcikgPT4gc3RyaW5nIHwgYm9vbGVhbikge1xuXG4gICAgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRlbXBvcmFyaWx5IHN0b3JlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hQYXJhbXNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2N1cnJlbnRTZWFyY2hQYXJhbXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gaW5pdCB3aXRoIGEgZHVtbXkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGZhbHNlXG4gICAgICAgIC8vIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyByZWxvYWRlZCwgdGhpcyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEV4dGVuZGVkU2VhcmNoUGFyYW1zPihuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoKG9mZnNldDogbnVtYmVyKSA9PiBmYWxzZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbmRlZFNlYXJjaFBhcmFtc30gc2VhcmNoUGFyYW1zXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGNoYW5nZVNlYXJjaFBhcmFtc01zZyhzZWFyY2hQYXJhbXM6IEV4dGVuZGVkU2VhcmNoUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMubmV4dChzZWFyY2hQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlYXJjaCBwYXJhbXMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgRXh0ZW5kZWRTZWFyY2hQYXJhbXMgLSBzZWFyY2ggcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGdldFNlYXJjaFBhcmFtcygpOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLmdldFZhbHVlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSwgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgUHJvcGVydHlXaXRoVmFsdWUgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICogUmVwcmVzZW50cyBhbiBlcnJvciB0aGF0IG9jY3VycmVkIHdoZW4gZ2VuZXJhdGluZyBLbmFyUUwuXG4gKi9cbmNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgR3JhdlNlYXJjaCBxdWVyaWVzIGZyb20gcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UpIHsgfVxuXG4gICAgLyoqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQ29udmVydHMgYSBjb21wbGV4IHR5cGUgSXJpIHRvIGEgc2ltcGxlIHR5cGUgSXJpLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4VHlwZSB0aGUgSXJpIG9mIGEgdmFsdWUgdHlwZSAoa25vcmEtYXBpIGNvbXBsZXgpLlxuICAgICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIGNvcnJlc3BvbmRpbmcgSXJpIG9mIHRoZSBzaW1wbGUgdHlwZSAoa25vcmEtYXBpIHNpbXBsZSkuXG4gICAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShjb21wbGV4VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBjb25zdCBzaW1wbGVUeXBlOiBzdHJpbmcgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbY29tcGxleFR5cGVdO1xuXG4gICAgICAgIGlmIChzaW1wbGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVUeXBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdyYXZzZWFyY2hHZW5lcmF0aW9uRXJyb3IoYGNvbXBsZXggdHlwZSAke2NvbXBsZXhUeXBlfSBjb3VsZCBub3QgYmUgY29udmVydGVkIHRvIHNpbXBsZSB0eXBlLmApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5IGZyb20gdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttYWluUmVzb3VyY2VDbGFzc09wdGlvbl0gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke1V0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShtYWluUmVzb3VyY2VDbGFzc09wdGlvbil9PiAuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyaXRlcmlhIGZvciB0aGUgb3JkZXIgYnkgc3RhdGVtZW50XG4gICAgICAgIGNvbnN0IG9yZGVyQnlDcml0ZXJpYSA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRlbWVudHMgdG8gYmUgcmV0dXJuZWQgaW4gcXVlcnkgcmVzdWx0c1xuICAgICAgICBjb25zdCByZXR1cm5TdGF0ZW1lbnRzID0gW107XG5cbiAgICAgICAgLy8gbG9vcCBvdmVyIGdpdmVuIHByb3BlcnRpZXMgYW5kIGNyZWF0ZSBzdGF0ZW1lbnRzIGFuZCBGaWx0ZXJzIGFuZCB0eXBlIGFubm90YXRpb25zIGZyb20gdGhlbVxuICAgICAgICBjb25zdCBwcm9wczogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLm1hcChcbiAgICAgICAgICAgIChwcm9wV2l0aFZhbDogUHJvcGVydHlXaXRoVmFsdWUsIGluZGV4OiBudW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJcmlTaW1wbGUgPSBVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUocHJvcFdpdGhWYWwucHJvcGVydHkuaWQpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNpbXBsZVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gdGhpcy5jb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUocHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IEtub3JhQ29uc3RhbnRzLnJlc291cmNlU2ltcGxlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudHMgdGhlIG9iamVjdCBvZiBhIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSB8fCBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5LCBjcmVhdGUgYSB2YXJpYWJsZSBmb3IgdGhlIHZhbHVlICh0byBiZSB1c2VkIGJ5IGEgc3Vic2VxdWVudCBGSUxURVIpXG4gICAgICAgICAgICAgICAgICAgIC8vIE9SIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIEV4aXN0cyBpcyB1c2VkIGluIHdoaWNoIGNhc2Ugd2UgZG8gbm90IG5lZWQgdG8gc3BlY2lmeSB0aGUgb2JqZWN0IGFueSBmdXJ0aGVyXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IGA/cHJvcFZhbCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgYW5kIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHMsIHVzZSBpdHMgSVJJXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSA9IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZW1lbnQ6IHN0cmluZyA9IGA/bWFpblJlcyA8JHtwcm9wSXJpU2ltcGxlfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gdHlwZSBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BUeXBlQW5ub3RhdGlvbiA9IGA8JHtwcm9wSXJpU2ltcGxlfT4ga25vcmEtYXBpOm9iamVjdFR5cGUgPCR7c2ltcGxlVHlwZX0+IC5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUFubm90YXRpb24gPSBgJHtwcm9wVmFsdWV9IGEgPCR7c2ltcGxlVHlwZX0+IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG59YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBzdGF0ZW1lbnQgc2hvdWxkIGJlIHJldHVybmVkIHJldHVybmVkIGluIHJlc3VsdHMgKEJvb2xlYW4gZmxhZyBmcm9tIGNoZWNrYm94KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdGF0ZW1lbnRzLnB1c2goc3RhdGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYFxuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbmA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGlmIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0sIFwiaVwiKWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ01hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGNvbnRhaW5zIGZ1bmN0aW9uIGZvciBNQVRDSFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiA8JHtLbm9yYUNvbnN0YW50cy5tYXRjaEZ1bmN0aW9ufT4oJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUigke3Byb3BWYWx1ZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLnR5cGV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7ZmlsdGVyfVxuYDtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9yZGVyQnlTdGF0ZW1lbnQgPSAnJztcblxuICAgICAgICBpZiAob3JkZXJCeUNyaXRlcmlhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyQnlTdGF0ZW1lbnQgPSBgXG5PUkRFUiBCWSAke29yZGVyQnlDcml0ZXJpYS5qb2luKCcgJyl9XG5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVtcGxhdGUgb2YgdGhlIEtuYXJRTCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5DT05TVFJVQ1Qge1xuXG4/bWFpblJlcyBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbiR7cmV0dXJuU3RhdGVtZW50cy5qb2luKCdcXG4nKX1cblxufSBXSEVSRSB7XG5cbj9tYWluUmVzIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuJHttYWluUmVzb3VyY2VDbGFzc31cblxuJHtwcm9wcy5qb2luKCcnKX1cblxufVxuJHtvcmRlckJ5U3RhdGVtZW50fWA7XG5cbiAgICAgICAgLy8gb2Zmc2V0IGNvbXBvbmVudCBvZiB0aGUgS25hclFMIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coa25hcnFsVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlO1xuXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZywgUmRmRGF0YU9iamVjdCwgUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHsgfVxuXG4gIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgY29udGVudCBvZiB0aGUgdHJpcGxlc3RvcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmRmRGF0YU9iamVjdHNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPHN0cmluZz5cbiAgICAgKi9cbiAgcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQocmRmRGF0YU9iamVjdHM6IFJkZkRhdGFPYmplY3RbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZT4odGhpcy5jb25maWcuYXBpICsgJy9hZG1pbi9zdG9yZS9SZXNldFRyaXBsZXN0b3JlQ29udGVudCcsIHJkZkRhdGFPYmplY3RzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIENsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZVNlcnZpY2UgLSByZXNldFRyaXBsZXN0b3JlQ29udGVudCAtIFNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkLicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBCYXNpY09udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIHJldHVybnMgb3VyIGxpc3Qgb2YgYSBiYXNpYyBvbnRvbG9neVxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgLy8gZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAvLyAgICAgbGV0IHVybCA9IGVudmlyb25tZW50LnVybDtcbiAgLy8gICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgLy8gfVxuICBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBwO1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJyk7XG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlVHlwZXNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogR2V0IGFsbCByZXNvdXJjZSB0eXBlcyBkZWZpbmVkIGJ5IHRoZSB2b2NhYnVsYXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBWb2NhYnVsYXJ5IGlyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgICAqL1xuICBnZXRSZXNvdXJjZVR5cGVzQnlWb2MoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzP3ZvY2FidWxhcnk9JyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzcGVjaWZpYyByZXNvdXJjZSB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHJlc291cmNlIHR5cGUgaXJpXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgKi9cbiAgZ2V0UmVzb3VyY2VUeXBlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjEvcmVzb3VyY2V0eXBlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cblxuICAvLyBwdXRSZXNvdXJjZVR5cGUoaXJpKVxuXG59XG4iLCIvKipcbiAqIG1haW4gYXBpIHNlcnZpY2VzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSBhZG1pbiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9ncm91cHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xpc3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9wcm9qZWN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vdXNlcnMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2xhbmd1YWdlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9zdGF0dXMtbXNnLnNlcnZpY2UnO1xuXG4vKipcbiAqIHNwZWNpZmljIHNlcnZpY2VzIGZvciBrbm9yYSB2MiBhcGlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2NvbnZlcnQtanNvbmxkJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvaW5jb21pbmcuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zdG9yZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvYmFzaWMtb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3Jlc291cmNlLXR5cGVzLnNlcnZpY2UnO1xuIiwiaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hIH0gZnJvbSAnLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLCBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcblxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSBjb21wYXJpc29uIG9wZXJhdG9yLlxuICogVGhpcyBpbnRlcmZhY2UgaXMgaW1wbGVtZW50ZWQgZm9yIHRoZSBzdXBwb3J0ZWQgY29tcGFyaXNvbiBvcGVyYXRvcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIC8vIHR5cGUgb2YgY29tcGFyaXNvbiBvcGVyYXRvclxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8vIHRoZSBsYWJlbCBvZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciB0byBiZSBwcmVzZW50ZWQgdG8gdGhlIHVzZXIuXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8vIHJldHVybnMgdGhlIGNsYXNzIG5hbWUgd2hlbiBjYWxsZWQgb24gYW4gaW5zdGFuY2VcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5vdEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ05vdEVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBFeGlzdHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFeGlzdHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpa2UgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xpa2UnO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWF0Y2ggaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTWF0Y2gnO1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbWJpbmF0aW9uIG9mIGEgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgYSB2YWx1ZSBsaXRlcmFsIG9yIGFuIElSSS5cbiAqIEluIGNhc2UgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgJ0V4aXN0cycsIG5vIHZhbHVlIGlzIGdpdmVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgY29tcGFyaXNvbk9wZXJhdG9yOiBDb21wYXJpc29uT3BlcmF0b3IsIHJlYWRvbmx5IHZhbHVlPzogVmFsdWUpIHtcbiAgICB9XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIHZhbHVlOiBhbiBJUkkgb3IgYSBsaXRlcmFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB2YWx1ZSBpbnRvIGEgU1BBUlFMIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmc7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHkncyB2YWx1ZSBhcyBhIGxpdGVyYWwgd2l0aCB0aGUgaW5kaWNhdGlvbiBvZiBpdHMgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlTGl0ZXJhbCBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbVmFsdWVMaXRlcmFsXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgbGl0ZXJhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIChtYWtpbmcgdXNlIG9mIHhzZCkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nKSB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdHlwZSBhbm5vdGF0ZWQgdmFsdWUgbGl0ZXJhbCB0byBiZSB1c2VkIGluIGEgU1BBUlFMIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuXG4gICAgICAgIGxldCBsaXRlcmFsVHlwZTogc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgS25vcmEgc2NoZW1hIGNvbnZlcnNpb24gaXMgbmVjZXNzYXJ5LCBlLmcuLCBrbm9yYS1hcGk6ZGF0ZVZhbHVlIChjb21wbGV4KSB0byBrbm9yYS1hcGk6ZGF0ZSAoc2ltcGxlKS5cbiAgICAgICAgLy8geHNkIHR5cGVzIHdpbGwgcmVtYWluIHVuY2hhbmdlZFxuICAgICAgICBpZiAoc2NoZW1hID09PSBLbm9yYVNjaGVtYS5zaW1wbGUgJiYgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29udmVydCB0byBzaW1wbGUgc2NoZW1hXG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZG8gbm90IGNvbnZlcnRcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBcIiR7dGhpcy52YWx1ZX1cIl5ePCR7bGl0ZXJhbFR5cGV9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBJUkkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJUkkgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIFtJUkldLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSB0aGUgSVJJIG9mIGEgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaXJpOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBJUkkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaW5zdGFuY2UgSXJpIGFuZCBkb2VzIG5vdCBoYXZlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLmlyaX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIGEgdmFsdWUuXG4gKiBUaGlzIGludGVyZmFjZSBoYXMgdG8gYmUgaW1wbGVtZW50ZWQgZm9yIGFsbCB2YWx1ZSB0eXBlcyAodmFsdWUgY29tcG9uZW50IGNsYXNzZXMpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWV9LlxuICAgICAqL1xuICAgIGdldFZhbHVlKCk6IFZhbHVlO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5LCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IsIGFuZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5V2l0aFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbUHJvcGVydHlXaXRoVmFsdWVdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHkgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge0NvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlfSB2YWx1ZUxpdGVyYWwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaXNTb3J0Q3JpdGVyaW9uIGluZGljYXRlcyBpZiB0aGUgcHJvcGVydHkgaXMgdXNlZCBhcyBhIHNvcnQgY3JpdGVyaW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogUHJvcGVydHksXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlTGl0ZXJhbDogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgICAgIHJlYWRvbmx5IGlzU29ydENyaXRlcmlvbjogQm9vbGVhbikge1xuICAgIH1cblxufVxuXG4vKipcbiAqIGEgbGlzdCwgd2hpY2ggaXMgdXNlZCBpbiB0aGUgbWF0LWF1dG9jb21wbGV0ZSBmb3JtIGZpZWxkXG4gKiBjb250YWlucyBvYmplY3RzIHdpdGggaWQgYW5kIG5hbWUuIHRoZSBpZCBpcyB1c3VhbCB0aGUgaXJpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlSXRlbSB7XG4gICAgaXJpOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xufVxuXG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvcmVcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb3JlLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzLyc7XG4iLCIvKipcbiAqIEdlbmVyYXRlZCBidW5kbGUgaW5kZXguIERvIG5vdCBlZGl0LlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vcHVibGljX2FwaSc7XG5cbmV4cG9ydCB7S3VpQ29yZUNvbmZpZyBhcyDDicK1YX0gZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zJztcbmV4cG9ydCB7UHJvcGVydHkgYXMgw4nCtWJ9IGZyb20gJy4vbGliL3NlcnZpY2VzJzsiXSwibmFtZXMiOlsidHNsaWJfMS5fX2RlY29yYXRlIiwiSnNvblByb3BlcnR5IiwiSnNvbk9iamVjdCIsIkpzb25Db252ZXJ0IiwiT3BlcmF0aW9uTW9kZSIsIlZhbHVlQ2hlY2tpbmdNb2RlIiwiS25vcmFTY2hlbWEiLCJQcmVjaXNpb24iLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsInRzbGliXzEuX192YWx1ZXMiLCJtYXAiLCJjYXRjaEVycm9yIiwiZnJvbSIsInRocm93RXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkluamVjdCIsIk9ic2VydmFibGUiLCJqc29ubGQiLCJDYXJkaW5hbGl0eU9jY3VycmVuY2UiLCJtZXJnZU1hcCIsIm9mIiwiZm9ya0pvaW4iLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJTdWJqZWN0IiwiQ29udmVydEpTT05MRCIsIkh0dHBQYXJhbXMiLCJCZWhhdmlvclN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztJQWNBO0lBRUEsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7YUFDaEMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJ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TCxZQUFDO0lBQUQsQ0FBQyxJQUFBO0lBRUQ7Ozs7QUFJQTtRQUVJLG9DQUFxQixrQkFBc0MsRUFBVyxLQUFhO1lBQTlELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7WUFBVyxVQUFLLEdBQUwsS0FBSyxDQUFRO1NBQ2xGO1FBQ0wsaUNBQUM7SUFBRCxDQUFDLElBQUE7SUFpQkQ7OztBQUdBOzs7Ozs7O1FBUUksc0JBQ29CLEtBQWEsRUFDYixJQUFZO1lBRFosVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUNiLFNBQUksR0FBSixJQUFJLENBQVE7U0FDL0I7Ozs7Ozs7UUFTTSwrQkFBUSxHQUFmLFVBQWdCLE1BQW1CO1lBRS9CLElBQUksV0FBbUIsQ0FBQzs7O1lBSXhCLElBQUksTUFBTSxLQUFLUixtQkFBVyxDQUFDLE1BQU0sSUFBSSwyQkFBMkIsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFOztnQkFFckgsV0FBVyxHQUFHLDJCQUEyQixDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0RjtpQkFBTTs7Z0JBRUgsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDM0I7WUFFRCxPQUFPLE9BQUksSUFBSSxDQUFDLEtBQUssYUFBTyxXQUFXLE1BQUcsQ0FBQztTQUM5QztRQUVMLG1CQUFDO0lBQUQsQ0FBQyxJQUFBO0lBRUQ7OztBQUdBOzs7Ozs7UUFPSSxhQUFxQixHQUFXO1lBQVgsUUFBRyxHQUFILEdBQUcsQ0FBUTtTQUMvQjs7Ozs7OztRQVFNLHNCQUFRLEdBQWYsVUFBZ0IsTUFBbUI7O1lBRS9CLE9BQU8sTUFBSSxJQUFJLENBQUMsR0FBRyxNQUFHLENBQUM7U0FDMUI7UUFFTCxVQUFDO0lBQUQsQ0FBQyxJQUFBO0lBc0JEOzs7QUFHQTs7Ozs7Ozs7UUFTSSwyQkFDYSxRQUFrQixFQUNsQixZQUF3QyxFQUN4QyxlQUF3QjtZQUZ4QixhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtZQUN4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBUztTQUNwQztRQUVMLHdCQUFDO0lBQUQsQ0FBQzs7SUNoUkQ7O09BRUc7O0lDRkg7O09BRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==