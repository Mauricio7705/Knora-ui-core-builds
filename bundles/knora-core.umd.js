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
            return this.httpPost(path, ontology).pipe(operators.map(function (result) { return result.body; }), operators.catchError(this.handleJsonError));
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
            if (sortAsc === void 0) {
                sortAsc = true;
            }
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
            if (sortAsc === void 0) {
                sortAsc = true;
            }
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
         * @returns {Observable<ReadResourcesSequence>}
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9yZXNvdXJjZXMvcmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2NvdW50LXF1ZXJ5L2NvdW50LXF1ZXJ5LXJlc3VsdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vZ3JvdXBzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9saXN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vcHJvamVjdHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvY29udmVydC1qc29ubGQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9pbmNvbWluZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvZ3Jhdi1zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2luZGV4LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiLCJuZzovL0Brbm9yYS9jb3JlL3B1YmxpY19hcGkudHMiLCJuZzovL0Brbm9yYS9jb3JlL2tub3JhLWNvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIEtub3JhLXVpIGNvcmUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgZGVmaW5pdGlvbnMgb2Y6XG4gKiAgLSBhcGk6IFVSTCBvZiBkYXRhIHNlcnZpY2UgZS5nLiBrbm9yYTogaHR0cDovL2xvY2FsaG9zdDozMzMzXG4gKiAgLSBtZWRpYTogVVJMIG9mIG1lZGlhIHNlcnZlciBzZXJ2aWNlIGUuZy4gc2lwaTogaHR0cDovL2xvY2FsaG9zdDoxMDI0XG4gKiAgLSBhcHA6IFVSTCBvZiB0aGUgYXBwIGUuZy4gc2Fsc2FoOiBodHRwOi8vbG9jYWxob3N0OjQyMDBcbiAqL1xuQEpzb25PYmplY3QoJ0t1aUNvcmVDb25maWcnKVxuZXhwb3J0IGNsYXNzIEt1aUNvcmVDb25maWcge1xuXG4gICAgLyoqXG4gICAgICogbmFtZSBvZiB0aGUgYXBwIGUuZy4gJ1NBTFNBSCdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiB0aGUgYXBwIGUuZy4gJ2h0dHBzOi8vc2Fsc2FoLm9yZydcbiAgICAgKiBAdHlwZSB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwcCcsIFN0cmluZylcbiAgICBwdWJsaWMgYXBwOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwaSBlLmcuICdodHRwczovL2FwaS5rbm9yYS5vcmcnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcGknLCBTdHJpbmcpXG4gICAgcHVibGljIGFwaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIG1lZGlhL2ZpbGUgc2VydmVyIGUuZy4gJ2h0dHBzOi8vaWlpZi5zaXBpLmlvJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVkaWEnLCBTdHJpbmcpXG4gICAgcHVibGljIG1lZGlhOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbn1cbiIsIlxuaW1wb3J0IHsgSnNvbkNvbnZlcnQsIE9wZXJhdGlvbk1vZGUsIFZhbHVlQ2hlY2tpbmdNb2RlIH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBSZXN1bHQgY2xhc3MgdXNlZCBhcyBBUEkgdXJsIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VSZXN1bHQge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMganNvbkNvbnZlcnQ6IEpzb25Db252ZXJ0ID0gbmV3IEpzb25Db252ZXJ0KE9wZXJhdGlvbk1vZGUuRU5BQkxFLCBWYWx1ZUNoZWNraW5nTW9kZS5BTExPV19OVUxMKTtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IGFzIEpTT05cbiAgICAgKi9cbiAgICBib2R5OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXN1bHQgYm9keSBhcyBpbnN0YW5jZSBvZiBjbGFzc09iamVjdC5cbiAgICAgKiBAcGFyYW0gY2xhc3NPYmplY3RcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqIEB0aHJvd3NcbiAgICAgKi9cblxuICAgIGdldEJvZHkoY2xhc3NPYmplY3Q/OiB7IG5ldygpOiBhbnkgfSk6IGFueSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYm9keSk7XG4gICAgICAgIHJldHVybiBBcGlTZXJ2aWNlUmVzdWx0Lmpzb25Db252ZXJ0LmRlc2VyaWFsaXplKHRoaXMuYm9keSwgY2xhc3NPYmplY3QpO1xuICAgIH1cblxuXG59XG4iLCJcbi8qKlxuICogRXJyb3IgY2xhc3MgdXNlZCBhcyBBUEkgcmVzcG9uc2UgaW4gQXBpU2VydmljZVxuICovXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZUVycm9yIHtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGVycm9yIGluZm9cbiAgICAgKi9cbiAgICBlcnJvckluZm8gPSAnJztcblxufVxuIiwiZXhwb3J0IGNsYXNzIEtub3JhQ29uc3RhbnRzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGk6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGknO1xuICAgIHB1YmxpYyBzdGF0aWMgUGF0aFNlcGFyYXRvcjogc3RyaW5nID0gJyMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYU9udG9sb2d5UGF0aDogc3RyaW5nID0gJ2h0dHA6Ly93d3cua25vcmEub3JnL29udG9sb2d5JztcbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQmFzZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFPbnRvbG9neVBhdGggKyAnL2tub3JhLWJhc2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTeXN0ZW1Qcm9qZWN0SVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1N5c3RlbVByb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtQWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1BZG1pbic7XG4gICAgcHVibGljIHN0YXRpYyBQcm9qZWN0QWRtaW5Hcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0QWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdE1lbWJlckdyb3VwSVJJOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUJhc2UgKyAnI1Byb2plY3RNZW1iZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUFwaVYyU2ltcGxlUGF0aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGkgKyAnL3NpbXBsZS92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPbnRvbG9neTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3NhbHNhaC1ndWkvdjInO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhHdWlPcmRlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3kgKyAnI2d1aU9yZGVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3RhbmRvZmZPbnRvbG9neTogc3RyaW5nID0gJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3N0YW5kb2ZmL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEludFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBCb29sZWFuVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0Jvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBVcmlWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVXJpVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGVjaW1hbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRGF0ZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdEYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQ29sb3JWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQ29sb3JWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9tVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpc3RWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIExpbmtWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEdlb25hbWVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnR2VvbmFtZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIEF1ZGlvRmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdBdWRpb0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBERERGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0REREZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBEb2N1bWVudEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRG9jdW1lbnRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBNb3ZpbmdJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTW92aW5nSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJc1Jlc291cmNlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzUmVzb3VyY2VDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbHVlQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzVmFsdWVDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBGb3JiaWRkZW5SZXNvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRm9yYmlkZGVuUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgWE1MVG9TdGFuZG9mZk1hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1hNTFRvU3RhbmRvZmZNYXBwaW5nJztcbiAgICBwdWJsaWMgc3RhdGljIExpc3ROb2RlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0Tm9kZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEFya1VybDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXJrVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIE9iamVjdFR5cGUgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdvYmplY3RUeXBlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVzb3VyY2VJY29uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdyZXNvdXJjZUljb24nO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNFZGl0YWJsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNFZGl0YWJsZSc7XG4gICAgcHVibGljIHN0YXRpYyBpc0xpbmtQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rVmFsdWVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaXNMaW5rVmFsdWVQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBoYXNHZW9tZXRyeTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzR2VvbWV0cnknO1xuXG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOYW1lOiBzdHJpbmcgPSAnaHR0cDovL3NjaGVtYS5vcmcvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFOdW1iZXJPZkl0ZW1zOiBzdHJpbmcgPSAnaHR0cDovL3NjaGVtYS5vcmcvbnVtYmVyT2ZJdGVtcyc7XG4gICAgcHVibGljIHN0YXRpYyBzY2hlbWFJdGVtTGlzdEVsZW1lbnQ6IHN0cmluZyA9ICdodHRwOi8vc2NoZW1hLm9yZy9pdGVtTGlzdEVsZW1lbnQnO1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIFJkZlByb3BlcnR5OiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNTY2hlbWE6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEnICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNMYWJlbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSArICdsYWJlbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzQ29tbWVudDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSArICdjb21tZW50JztcbiAgICBwdWJsaWMgc3RhdGljIFJkZnNTdWJjbGFzc09mOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hICsgJ3N1YkNsYXNzT2YnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3ViUHJvcGVydHlPZjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSArICdzdWJQcm9wZXJ0eU9mJztcblxuICAgIHB1YmxpYyBzdGF0aWMgb3dsOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wnO1xuXG4gICAgcHVibGljIHN0YXRpYyBPd2xDbGFzczogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNDbGFzcyc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xPYmplY3RQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNPYmplY3RQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xEYXRhdHlwZVByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0RhdGF0eXBlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsQW5ub3RhdGlvblByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI0Fubm90YXRpb25Qcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBPd2xPblByb3BlcnR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI29uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsTWF4Q2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjbWF4Q2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsTWluQ2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjbWluQ2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2FyZGluYWxpdHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjY2FyZGluYWxpdHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsUmVzdHJpY3Rpb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjUmVzdHJpY3Rpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGlvbkRhdGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NyZWF0aW9uRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBsYXN0TW9kaWZpY2F0aW9uRGF0ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGFzdE1vZGlmaWNhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzUGVybWlzc2lvbnM6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1Blcm1pc3Npb25zJztcbiAgICBwdWJsaWMgc3RhdGljIGF0dGFjaGVkVG9Qcm9qZWN0OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdhdHRhY2hlZFRvUHJvamVjdCc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvVXNlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1VzZXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZWdpb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1JlZ2lvbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc0h0bWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRUZXh0VmFsdWVBc1N0cmluZzogc3RyaW5nID0gJ1JlYWRUZXh0VmFsdWVBc1N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNYbWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERhdGVWYWx1ZTogc3RyaW5nID0gJ1JlYWREYXRlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpbmtWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaW5rVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZEludGVnZXJWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlZ2VyVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZERlY2ltYWxWYWx1ZTogc3RyaW5nID0gJ1JlYWREZWNpbWFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dEZpbGVWYWx1ZTogc3RyaW5nID0gJ1JlYWRUZXh0RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRHZW9tVmFsdWU6IHN0cmluZyA9ICdSZWFkR2VvbVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRDb2xvclZhbHVlOiBzdHJpbmcgPSAnUmVhZENvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFVyaVZhbHVlOiBzdHJpbmcgPSAnUmVhZFVyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRCb29sZWFuVmFsdWU6IHN0cmluZyA9ICdSZWFkQm9vbGVhblZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlcnZhbFZhbHVlOiBzdHJpbmcgPSAnUmVhZEludGVydmFsVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZExpc3RWYWx1ZTogc3RyaW5nID0gJ1JlYWRMaXN0VmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZUFzU3RyaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd2YWx1ZUFzU3RyaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc0h0bWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgdGV4dFZhbHVlQXNYbWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUhhc01hcHBpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3RleHRWYWx1ZUhhc01hcHBpbmcnO1xuXG4gICAgcHVibGljIHN0YXRpYyBoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNTdGFuZG9mZkxpbmtUb1ZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRZZWFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kWWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kWWVhcic7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNTdGFydEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kRXJhOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNFbmRFcmEnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRNb250aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRNb250aCc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmRNb250aDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kTW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnREYXk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RGF5JztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZERheTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRGF5JztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0NhbGVuZGFyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNDYWxlbmRhcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0JztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1NvdXJjZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzU291cmNlSXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGxpbmtWYWx1ZUhhc1RhcmdldElyaTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlua1ZhbHVlSGFzVGFyZ2V0SXJpJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZWdlclZhbHVlQXNJbnRlZ2VyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRWYWx1ZUFzSW50JztcblxuICAgIHB1YmxpYyBzdGF0aWMgZGVjaW1hbFZhbHVlQXNEZWNpbWFsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkZWNpbWFsVmFsdWVBc0RlY2ltYWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWxlVmFsdWVBc1VybDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlQXNVcmwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlSXNQcmV2aWV3OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVJc1ByZXZpZXcnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlSGFzRmlsZW5hbWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUhhc0ZpbGVuYW1lJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWCc7XG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVknO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdzdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb2xvclZhbHVlQXNDb2xvcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnY29sb3JWYWx1ZUFzQ29sb3InO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2dlb21ldHJ5VmFsdWVBc0dlb21ldHJ5JztcbiAgICBwdWJsaWMgc3RhdGljIHVyaVZhbHVlQXNVcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3VyaVZhbHVlQXNVcmknO1xuICAgIHB1YmxpYyBzdGF0aWMgYm9vbGVhblZhbHVlQXNCb29sZWFuOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdib29sZWFuVmFsdWVBc0Jvb2xlYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzU3RhcnQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ludGVydmFsVmFsdWVIYXNTdGFydCc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFZhbHVlSGFzRW5kOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzRW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnbGlzdFZhbHVlQXNMaXN0Tm9kZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaXN0VmFsdWVBc0xpc3ROb2RlTGFiZWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFhzZDogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHhzZFN0cmluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ3N0cmluZyc7XG4gICAgcHVibGljIHN0YXRpYyB4c2RCb29sZWFuOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYm9vbGVhbic7XG4gICAgcHVibGljIHN0YXRpYyB4c2RJbnRlZ2VyOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnaW50ZWdlcic7XG4gICAgcHVibGljIHN0YXRpYyB4c2REZWNpbWFsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnZGVjaW1hbCc7XG4gICAgcHVibGljIHN0YXRpYyB4c2RVcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdhbnlVUkknO1xuXG4gICAgcHVibGljIHN0YXRpYyByZXNvdXJjZVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnUmVzb3VyY2UnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRGF0ZSc7XG4gICAgcHVibGljIHN0YXRpYyBpbnRlcnZhbFNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnSW50ZXJ2YWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbSc7XG4gICAgcHVibGljIHN0YXRpYyBjb2xvclNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnQ29sb3InO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2VvbmFtZVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnR2VvbmFtZSc7XG4gICAgcHVibGljIHN0YXRpYyBmaWxlU2ltcGxlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyU2ltcGxlUGF0aCArICdGaWxlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgbWF0Y2hGdW5jdGlvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnbWF0Y2gnO1xuXG4gICAgcHVibGljIHN0YXRpYyBFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc9JztcbiAgICBwdWJsaWMgc3RhdGljIEVxdWFsc0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnIT0nO1xuICAgIHB1YmxpYyBzdGF0aWMgTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbm90IGVxdWFsIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc+JztcbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgZ3JlYXRlciB0aGFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc+PSc7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGdyZWF0ZXIgdGhhbiBlcXVhbHMgdG8nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJzwnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBsZXNzIHRoYW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJzw9JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBsZXNzIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnRSc7XG4gICAgcHVibGljIHN0YXRpYyBFeGlzdHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdleGlzdHMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBMaWtlQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAncmVnZXgnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGxpa2UnO1xuXG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJ2NvbnRhaW5zJztcbiAgICBwdWJsaWMgc3RhdGljIE1hdGNoQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnbWF0Y2hlcyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFNhbHNhaExpbms6IHN0cmluZyA9ICdzYWxzYWgtbGluayc7IC8vIGNsYXNzIG9uIGFuIEhUTUwgPGE+IGVsZW1lbnQgdGhhdCBpbmRpY2F0ZXMgYSBsaW5rIHRvIGEgS25vcmEgcmVzb3VyY2VcbiAgICBwdWJsaWMgc3RhdGljIFJlZk1hcmtlcjogc3RyaW5nID0gJ3JlZi1tYXJrZXInOyAvLyBjbGFzcyBvbiBhbiBIVE1MIGVsZW1lbnQgdGhhdCByZWZlcnMgdG8gYW5vdGhlciBlbGVtZW50IGluIHRoZSBzYW1lIGRvY3VtZW50XG5cbiAgICBwdWJsaWMgc3RhdGljIEdORFByZWZpeDogc3RyaW5nID0gJyhERS01ODgpJztcbiAgICBwdWJsaWMgc3RhdGljIEdORFJlc29sdmVyOiBzdHJpbmcgPSAnaHR0cDovL2QtbmIuaW5mby9nbmQvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgVklBRlByZWZpeDogc3RyaW5nID0gJyhWSUFGKSc7XG4gICAgcHVibGljIHN0YXRpYyBWSUFGUmVzb2x2ZXI6IHN0cmluZyA9ICdodHRwczovL3ZpYWYub3JnL3ZpYWYvJztcblxufVxuXG5cbmV4cG9ydCBlbnVtIEtub3JhU2NoZW1hIHtcbiAgICBjb21wbGV4ID0gMCxcbiAgICBzaW1wbGUgPSAxXG59XG4iLCIvKipcbiAqIENvbGxlY3Rpb24gb2YgdXNlZnVsIHV0aWxpdHkgZnVuY3Rpb25zLlxuICovXG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgRW1haWwgYWRkcmVzcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEVtYWlsID0gL14oKFtePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXStcXC4pK1tePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl17Mix9KSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgVXNlcm5hbWUuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVc2VybmFtZSA9IC9eW2EtekEtWjAtOV0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVSTHMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhVcmwgPSAvXihodHRwOlxcL1xcL3d3d1xcLnxodHRwczpcXC9cXC93d3dcXC58aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvKT9bYS16MC05XSsoW1xcLVxcLl17MX1bYS16MC05XSspKlxcLlthLXpdezIsNn0oOlswLTldezEsNX0pPyhcXC8uKik/JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBQYXNzd29yZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFBhc3N3b3JkID0gL14oPz0uKlxcZCkoPz0uKlthLXpBLVpdKS57OCx9JC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBIZXhhZGVjaW1hbCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleEhleCA9IC9eWzAtOUEtRmEtZl0rJC87XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIHNob3J0bmFtZSBpbiBwcm9qZWN0c1xuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4U2hvcnRuYW1lID0gL15bYS16QS1aXStcXFMqJC87XG5cblxuICAgIC8qKlxuICAgICAqIExhbWJkYSBmdW5jdGlvbiBlbGltaW5hdGluZyBkdXBsaWNhdGVzIGluIGEgY29sbGVjdGlvbiB0byBiZSBwYXNzZWQgdG8gW1tmaWx0ZXJdXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtIGVsZW1lbnQgb2YgYW4gQXJyYXkgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbG9va2VkIGF0LlxuICAgICAqIEBwYXJhbSBpbmRleCBjdXJyZW50IGVsZW1lbnRzIGluZGV4LlxuICAgICAqIEBwYXJhbSBzZWxmIHJlZmVyZW5jZSB0byB0aGUgd2hvbGUgQXJyYXkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNhbWUgZWxlbWVudCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IGluIHRoZSBBcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpbHRlck91dER1cGxpY2F0ZXMgPSAoZWxlbSwgaW5kZXg6IG51bWJlciwgc2VsZikgPT4ge1xuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2NzQ3Nzk4L2RlbGV0ZS1kdXBsaWNhdGUtZWxlbWVudHMtZnJvbS1hbi1hcnJheVxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXI/dj1leGFtcGxlXG5cbiAgICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50J3MgaW5kZXggZXF1YWxzIHRoZSBpbmRleCBvZiB0aGUgbGVmdG1vc3QgZWxlbWVudFxuICAgICAgICAvLyAtPiB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgaXMgbm8gaWRlbnRpY2FsIGVsZW1lbnQgYmVmb3JlIHRoaXMgaW5kZXgsIGhlbmNlIGl0IGlzIG5vdCBhIGR1cGxpY2F0ZVxuICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGVsZW1lbnRzLCBmYWxzZSBpcyByZXR1cm5lZFxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHNlbGYuaW5kZXhPZihlbGVtKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgS25vcmEgZW50aXR5IElSSSwgZ2V0cyB0aGUgb250b2xvZ3kgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eUlyaSBhbiBlbnRpdHkgSXJpLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIG9udG9sb2d5IElSSVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKGVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgY2xhc3MgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGVudGl0eUlyaS5zcGxpdChLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb21wbGV4IGtub3JhLWFwaSBlbnRpdHkgSXJpIHRvIGEga25vcmEtYXBpIHNpbXBsZSBlbnRpdHkgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhFbnRpdHlJcmlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKGNvbXBsZXhFbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGVudGl0eSBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gY29tcGxleEVudGl0eUlyaS5zcGxpdCgndjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7Y29tcGxleEVudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICAvLyBhZGQgJ3NpbXBsZScgdG8gYmFzZSBwYXRoXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXSArICdzaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvciArIHNlZ21lbnRzWzFdO1xuXG4gICAgfVxuXG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdTdHJpbmdMaXRlcmFsJylcbmV4cG9ydCBjbGFzcyBTdHJpbmdMaXRlcmFsIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3ZhbHVlJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgdmFsdWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmd1YWdlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJyc7XG59XG4iLCIvKipcbiAqIFByZWNpc2lvbiBmb3IgRGF0ZVNhbHNhaC5cbiAqL1xuZXhwb3J0IGVudW0gUHJlY2lzaW9uIHtcbiAgICB5ZWFyUHJlY2lzaW9uLFxuICAgIG1vbnRoUHJlY2lzaW9uLFxuICAgIGRheVByZWNpc2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBTYWxzYWggZGF0ZSBvYmplY3Qgd2l0aCBhIHByZWNpc2lvbiBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVTYWxzYWgge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcmVhZG9ubHkgcHJlY2lzaW9uOiBQcmVjaXNpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgbW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRheT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB5ZWFyIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBtb250aCBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF5IHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHdpdGhvdXQgdGhlIGNhbGVuZGFyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKSB7XG5cbiAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSAnKCcgKyB0aGlzLmVyYSArICcpICc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByZWNpc2lvbikge1xuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGggKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMuZGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgKHdpdGggY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhciArICc6JyArIHRoaXMuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBlcmlvZCAod2l0aCBzdGFydCBkYXRlIGFuZCBlbmQgZGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VTYWxzYWgge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0OiBEYXRlU2Fsc2FoLFxuICAgICAgICByZWFkb25seSBlbmQ6IERhdGVTYWxzYWhcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHJhbmdlICh3aXRoIHByZWNlZGluZyBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQuZ2V0RGF0ZUFzU3RyaW5nKCkgKyAnOicgKyB0aGlzLmVuZC5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnQXV0aGVudGljYXRpb25SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd0b2tlbicsIFN0cmluZylcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0JylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2hvcnRuYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBzaG9ydG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0Y29kZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgc2hvcnRjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsb25nbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9uZ25hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogU3RyaW5nTGl0ZXJhbFtdID0gW25ldyBTdHJpbmdMaXRlcmFsKCldO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna2V5d29yZHMnLCBbU3RyaW5nXSwgdHJ1ZSlcbiAgICBwdWJsaWMga2V5d29yZHM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9nbycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaW5zdGl0dXRpb24nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGluc3RpdHV0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9naWVzJywgW1N0cmluZ10pXG4gICAgcHVibGljIG9udG9sb2dpZXM6IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ0dyb3VwJylcbmV4cG9ydCBjbGFzcyBHcm91cCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgU3RyaW5nKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwJywgR3JvdXApXG4gICAgcHVibGljIGdyb3VwOiBHcm91cCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWwnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIHRydWUpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGV2ZWwnLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIGxldmVsOiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwb3NpdGlvbicsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcbmltcG9ydCB7IExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LW5vZGUnO1xuXG5ASnNvbk9iamVjdCgnTGlzdCcpXG5leHBvcnQgY2xhc3MgTGlzdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCBmYWxzZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3RJbmZvIH0gZnJvbSAnLi9saXN0LWluZm8nO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdEluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0aW5mbycsIExpc3RJbmZvLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdGluZm86IExpc3RJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0SXJpJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdpc1Jvb3ROb2RlJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgaXNSb290Tm9kZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdub2RlaW5mbycsIExpc3ROb2RlSW5mbywgZmFsc2UpXG4gICAgcHVibGljIG5vZGVpbmZvOiBMaXN0Tm9kZUluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuXG5ASnNvbk9iamVjdCgnTGlzdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdCcsIExpc3QsIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0OiBMaXN0ID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZUluZm8gfSBmcm9tICcuL2xpc3Qtbm9kZS1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdHMnLCBbTGlzdE5vZGVJbmZvXSwgZmFsc2UpXG4gICAgcHVibGljIGxpc3RzOiBMaXN0Tm9kZUluZm9bXSA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnT250b2xvZ3lJbmZvU2hvcnQnKVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb1Nob3J0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SXJpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1Blcm1pc3Npb25EYXRhJylcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGF0YSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBncm91cHNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL2dyb3Vwcy9ncm91cCc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uRGF0YSB9IGZyb20gJy4uL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdVc2VyJylcbmV4cG9ydCBjbGFzcyBVc2VyIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZW1haWwnLCBTdHJpbmcpXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VybmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bhc3N3b3JkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdnaXZlbk5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGdpdmVuTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZmFtaWx5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZmFtaWx5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZylcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZXNzaW9uSWQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGVybWlzc2lvbnMnLCBQZXJtaXNzaW9uRGF0YSlcbiAgICBwdWJsaWMgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzdGVtQWRtaW4nLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBzeXN0ZW1BZG1pbj86IGJvb2xlYW4gPSBmYWxzZTtcblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdE1lbWJlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdE1lbWJlcnNSZXNwb25zZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVtYmVycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgbWVtYmVyczogVXNlcltdID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0JywgUHJvamVjdClcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdHNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0cycsIFtQcm9qZWN0XSlcbiAgICBwdWJsaWMgcHJvamVjdHM6IFByb2plY3RbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3RcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdqd3QnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGp3dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzQWRtaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzeXNBZG1pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlcnNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCd1c2VycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgdXNlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlclJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2VyUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcicsIFVzZXIpXG4gICAgcHVibGljIHVzZXI6IFVzZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuLi8uLi8uLi8nO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGVSYW5nZVNhbHNhaCwgRGF0ZVNhbHNhaCB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGFueSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgSXJpLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgdHlwZS5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHZhbHVlIG9iamVjdC5cbiAgICAgKi9cbiAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhcyBhIHN0cmluZyAoY29tcGxleGl0eSBvZiB0aGUgdmFsdWUgcG9zc2libHkgcmVkdWNlZCkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggb3Igd2l0aG91dCBtYXJrdXAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWFkVGV4dFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRob3V0IG1hcmt1cCAobWVyZSBjaGFyYWN0ZXIgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1N0cmluZyBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgcmVzb3VyY2VzIHJlZmVycmVkIHRvIGJ5IHN0YW5kb2ZmIGxpbmtzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZWFkUmVzb3VyY2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIHRoYXQgaGFzIGJlZW4gdHVybmVkIGludG8gSFRNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc0h0bWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGh0bWw6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmspIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IGEgcmVzb3VyY2UgcmVmZXJyZWQgdG8gYnkgYSBzdGFuZG9mZiBsaW5rIGZyb20gYSB0ZXh0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIG9udG9sb2d5IGluZm9ybWF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSdzIGNsYXNzIGFuZCBpdHMgbGFiZWwuXG4gICAgICovXG5cblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKHJlc291cmNlSXJpOiBzdHJpbmcsIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbm8gaW5mb3JtYXRpb24gZm91bmQgYWJvdXQgcmVmZXJyZWQgcmVzb3VyY2UgKHRhcmdldCBvZiBzdGFuZG9mZiBsaW5rKSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCBhcyBYTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNYbWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHhtbDogc3RyaW5nLCByZWFkb25seSBtYXBwaW5nSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1htbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54bWw7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGF0ZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGF0ZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZW5kRXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0TW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydERheT86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kRGF5PzogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgZ2V0RGF0ZVNhbHNhaCgpOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB0aGlzLmVuZFllYXIgJiYgdGhpcy5zdGFydE1vbnRoID09PSB0aGlzLmVuZE1vbnRoICYmIHRoaXMuc3RhcnREYXkgPT09IHRoaXMuZW5kRGF5ICYmIHRoaXMuc3RhcnRFcmEgPT09IHRoaXMuZW5kRXJhKSB7XG4gICAgICAgICAgICAvLyBwcmVjaXNlIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRhdGUgcGVyaW9kXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVSYW5nZVNhbHNhaChuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KSwgbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5lbmRFcmEsIHRoaXMuZW5kWWVhciwgdGhpcy5lbmRNb250aCwgdGhpcy5lbmREYXkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVTYWxzYWgoKS5nZXREYXRlQXNTdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmsgdmFsdWUgb2JqZWN0IChyZWlmaWNhdGlvbikuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlua1ZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2U/OiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVnZXIgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVnZXJWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaW50ZWdlcjogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlci50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkZWNpbWFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREZWNpbWFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGRlY2ltYWw6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGltYWdlRmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIpIHtcblxuICAgICAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgYSBqcGVnLCBpdCBpcyBhIHByZXZpZXcgaW1hZ2VcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSBpbWFnZUZpbGVuYW1lLmVuZHNXaXRoKCcuanBnJyk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIG1ha2VJSUlGVXJsKHJlZHVjZUZhY3RvcjogbnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5mbG9vcigxMDAgLyByZWR1Y2VGYWN0b3IpO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gKHBlcmNlbnRhZ2UgPiAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwKSA/IHBlcmNlbnRhZ2UgOiA1MDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIHRoaXMuaW1hZ2VGaWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCByZXByZXNlbnRhdGlvbiB2YWx1ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0RmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB0ZXh0RmlsZW5hbWU6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVVUkw6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0RmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRGaWxlVVJMO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xvciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQ29sb3JWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY29sb3JIZXg6IHN0cmluZykge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQ29sb3JWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvckhleDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBvaW50IGluIGEgMkQtY29vcmRpbmF0ZSBzeXN0ZW0gKGZvciBnZW9tZXRyeSB2YWx1ZXMpLlxuICovXG5leHBvcnQgY2xhc3MgUG9pbnQyRCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgcGFyc2VkIGZyb20gSlNPTi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lvbkdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lQ29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludDJEW10sXG4gICAgICAgIHB1YmxpYyB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByYWRpdXM/OiBQb2ludDJEXG4gICAgKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkR2VvbVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGdlb21ldHJ5U3RyaW5nOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBnZW9tZXRyeUpTT04gPSBKU09OLnBhcnNlKGdlb21ldHJ5U3RyaW5nKTtcblxuICAgICAgICBjb25zdCBwb2ludHM6IFBvaW50MkRbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGdlb21ldHJ5SlNPTi5wb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludDJEKHBvaW50LngsIHBvaW50LnkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYWRpdXM7XG4gICAgICAgIGlmIChnZW9tZXRyeUpTT04ucmFkaXVzKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBuZXcgUG9pbnQyRChnZW9tZXRyeUpTT04ucmFkaXVzLngsIGdlb21ldHJ5SlNPTi5yYWRpdXMueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFJlZ2lvbkdlb21ldHJ5KFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnN0YXR1cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lQ29sb3IsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZVdpZHRoLFxuICAgICAgICAgICAgcG9pbnRzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnR5cGUsXG4gICAgICAgICAgICByYWRpdXNcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeTtcblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRHZW9tVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlTdHJpbmc7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBVUkkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFVyaVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHVyaTogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVXJpVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRVcmlWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIEJvb2xlYW4gdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEJvb2xlYW5WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBib29sOiBib29sZWFuKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2wudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlcnZhbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVydmFsU3RhcnQ6IG51bWJlciwgcmVhZG9ubHkgaW50ZXJ2YWxFbmQ6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlcnZhbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVydmFsU3RhcnQudG9TdHJpbmcoKSArICctJyArIHRoaXMuaW50ZXJ2YWxFbmQ7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlzdFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlTGFiZWw6IHN0cmluZywgKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlzdFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlzdFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlTGFiZWw7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBSZWFkUHJvcGVydGllcywgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSByZXNvdXJjZSdzIElyaS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgcmVzb3VyY2UncyB0eXBlIChjbGFzcykuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIHRoZSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1JlZ2lvbnMgcmVnaW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IGluY29taW5nTGlua3MgcmVzb3VyY2VzIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UsIGlmIGFueSAocG9zc2libHkgdG8gYmUgcXVlcmllZCBieSBhZGRpdGlvbmFsIHJlcXVlc3RzKS5cbiAgICAgKiBAcGFyYW0ge1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdfSBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ICBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMgdG8gYmUgZGlzcGxheWVkIGZvciB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtSZWFkUHJvcGVydGllc30gcHJvcGVydGllcyB0aGUgcmVzb3VyY2VzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdSZWdpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zOiBBcnJheTxSZWFkUmVzb3VyY2U+LFxuICAgICAgICBwdWJsaWMgaW5jb21pbmdMaW5rczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXk6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVydGllcz86IFJlYWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zLCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL2ludGVybmFsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1lcnJvcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdCc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnIH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zL2NvcmUuY29uZmlnJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIGlmIGlzIGxvYWRpbmcsIHNldCBpdCB0cnVlO1xuICAgIC8vIGl0IGNhbiBiZSB1c2VkIGluIGNvbXBvbmVudHNcbiAgICAvLyBmb3IgcHJvZ3Jlc3MgbG9hZGVyIGVsZW1lbnRcbiAgICBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHRVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIHRoZSBVUkwgZm9yIHRoZSBHRVQgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0ge0h0dHBQYXJhbXN9IHBhcmFtcyB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIEdFVCByZXF1ZXN0LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cEdldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IEh0dHBQYXJhbXMpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwge29ic2VydmU6ICdyZXNwb25zZScsIHBhcmFtczogcGFyYW1zfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgSlNPTi1MRCByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBFeHBhbmRzIElyaXMgYW5kIGNyZWF0ZXMgYW4gZW1wdHkgY29udGV4dCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FwaVNlcnZpY2VSZXN1bHR9IHJlc291cmNlUmVzcG9uc2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0pTT05MRChyZXNvdXJjZVJlc3BvbnNlOiBBcGlTZXJ2aWNlUmVzdWx0KTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICBjb25zdCByZXNQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgY29uc3QgcmVzUHJvbWlzZSA9IHJlc1Byb21pc2VzLmNvbXBhY3QocmVzb3VyY2VSZXNwb25zZS5ib2R5LCB7fSk7XG5cbiAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgcmV0dXJuIGZyb20ocmVzUHJvbWlzZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQT1NUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7YW55fSBib2R5XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBhbnlcbiAgICAgKi9cbiAgICBodHRwUG9zdChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBVVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gYm9keVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cFB1dChwYXRoOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCBib2R5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogREVMRVRFXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cERlbGV0ZShwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY29uc3QgaGVhZGVycyA9IHRoaXMuc2V0SGVhZGVycygpOyAtLT4gdGhpcyBpcyBub3cgZG9uZSBieSB0aGUgaW50ZXJjZXB0b3IgZnJvbSBAa25vcmEvYXV0aGVudGljYXRpb25cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmNvbmZpZy5hcGkgKyBwYXRoLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUgcmVxdWVzdCBlcnJvciBpbiBjYXNlIG9mIHNlcnZlciBlcnJvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtIdHRwRXJyb3JSZXNwb25zZX0gZXJyb3JcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIEFwaVNlcnZpY2VFcnJvclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9IGVycm9yLnVybDtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGUganNvbiBlcnJvciBpbiBjYXNlIG9mIHR5cGUgZXJyb3IgaW4ganNvbiByZXNwb25zZSAoanNvbjJ0eXBlc2NyaXB0KVxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlSnNvbkVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaVNlcnZpY2VFcnJvcikgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuXG4gICAgICAgIGNvbnN0IHNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IC0xO1xuICAgICAgICBzZXJ2aWNlRXJyb3Iuc3RhdHVzVGV4dCA9ICdJbnZhbGlkIEpTT04nO1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3I7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcblxuICAgIH1cblxuICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kIGlzIHJlcGxhY2VkIGJ5IHRoZSBKd3RJbnRlcmNlcHRvclxuICAgIC8qXG4gICAgcHJvdGVjdGVkIHNldEhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xuICAgICAgICBsZXQgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAgICAgLy8gZ2V0IGtleSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgY29uc3Qga2V5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25faWQnKTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5fYWNzLmdldChrZXkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXNlciA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhcGkgc2VydmljZSAtLSBzZXRIZWFkZXJzIC0tIGN1cnJlbnRVc2VyIGZyb20gYWNzJywgY3VycmVudFVzZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIG9wdGlvbnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0h0dHBIZWFkZXJzfSBvcHRpb25zXG4gICAgICogQHJldHVybnMge0h0dHBIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kVG9PcHRpb25zKG9wdGlvbnM6IGFueSk6IGFueSB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuXG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgaGVhZGVycyA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzJhKSAnLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYikgJywgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhdmUgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zWydoZWFkZXJzJ10pIHtcbiAgICAgICAgICAgICAgICAvLyBubyBoZWFkZXJzIHNldFxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCczOiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBoZWFkZXJzLCBuZWVkIHRvIGFwcGVuZCB0byB0aG9zZVxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2hlYWRlcnMnXSA9IHRoaXMuYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihvcHRpb25zWydoZWFkZXJzJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCc0OiAnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4qL1xuICAgIC8qXG4gICAgLyEqKlxuICAgICAqIEFwcGVuZHMgdG8gZXhpc3RpbmcgaGVhZGVycyBpZiB0aGV5IGV4aXN0LlxuICAgICAqIEBwYXJhbSB7SGVhZGVyc30gaGVhZGVyc1xuICAgICAqIEByZXR1cm5zIHtIZWFkZXJzfVxuICAgICAqIS9cbiAgICBwcm90ZWN0ZWQgYXBwZW5kQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XG5cblxuICAgICAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKSkge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbjtcblxuLy8gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcblxuICAgICAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke0pTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnRva2VufWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxuKi9cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgTmV3T250b2xvZ3kgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL3YyL29udG9sb2d5L25ldy1vbnRvbG9neSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVQgbGlzdCBvZiBvbnRvbG9naWVzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBERVBSRUNBVEVEOiBZb3Ugc2hvdWxkIHVzZSBnZXRBbGxPbnRvbG9naWVzKClcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldEFsbE9udG9sb2dpZXMoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG9udG9sb2dpZXMgb2YgYSBzcGVjaWZpYyBwcm9qZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgcHJvamVjdCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFByb2plY3RPbnRvbG9naWVzKHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVCBvbnRvbG9neVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaXMgb2YgdGhlIG5hbWVkIGdyYXBocyB3aG9zZSByZXNvdXJjZSBjbGFzc2VzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9hbGxlbnRpdGllcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9udG9sb2d5SXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgSXJpcyBvZiB0aGUgcmVzb3VyY2UgY2xhc3NlcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUNsYXNzSXJpczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHJlc291cmNlIGNsYXNzIElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NlcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNDbGFzc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICByZXNDbGFzc1VyaUVuYyA9IHJlc0NsYXNzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9jbGFzc2VzJyArIHJlc0NsYXNzVXJpRW5jKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBwcm9wZXJ0aWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocHJvcGVydHlJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcHJvcGVydHkgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UHJvcGVydGllcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzVXJpRW5jID0gcHJvcGVydGllc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvcHJvcGVydGllcycgKyBwcm9wZXJ0aWVzVXJpRW5jKTtcblxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgb250b2xvZ3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05ld09udG9sb2d5fSBkYXRhIERhdGEgY29udGFpbnM6IHByb2plY3RJcmksIG5hbWUsIGxhYmVsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGNyZWF0ZU9udG9sb2d5KGRhdGE6IE5ld09udG9sb2d5KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL3YyL29udG9sb2dpZXMnO1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5ID0ge1xuICAgICAgICAgICAgJ2tub3JhLWFwaTpvbnRvbG9neU5hbWUnOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICAna25vcmEtYXBpOmF0dGFjaGVkVG9Qcm9qZWN0Jzoge1xuICAgICAgICAgICAgICAgICdAaWQnOiBkYXRhLnByb2plY3RJcmksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3JkZnM6bGFiZWwnOiBkYXRhLmxhYmVsLFxuICAgICAgICAgICAgJ0Bjb250ZXh0Jzoge1xuICAgICAgICAgICAgICAgICdyZGZzJzogS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSxcbiAgICAgICAgICAgICAgICAna25vcmEtYXBpJzogS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBvbnRvbG9neSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuYm9keSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy91dGlscyc7XG5pbXBvcnQgeyBPbnRvbG9neVNlcnZpY2UgfSBmcm9tICcuL29udG9sb2d5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ3MzAwMTAvYW5ndWxhcjItNS1taW51dGUtaW5zdGFsbC1idWctcmVxdWlyZS1pcy1ub3QtZGVmaW5lZFxuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlcnJvciBvY2N1cnJlZCBpbiBPbnRvbG9neUNhY2hlU2VydmljZS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gb250b2xvZ3kncyBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5TWV0YWRhdGEge1xuXG4gICAgLyoqXG4gICAgICogQGhpZGVjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGEgbGFiZWwgZGVzY3JpYmluZyB0aGUgb250b2xvZ3kuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIE9jY3VycmVuY2Ugb2YgYSBwcm9wZXJ0eSBmb3IgYSByZXNvdXJjZSBjbGFzcyAoaXRzIGNhcmRpbmFsaXR5KS5cbiAqL1xuZXhwb3J0IGVudW0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlIHtcbiAgICBtaW5DYXJkID0gMCxcbiAgICBjYXJkID0gMSxcbiAgICBtYXhDYXJkID0gMlxufVxuXG5cbi8qKlxuICogQ2FyZGluYWxpdHkgb2YgYSBwcm9wZXJ0eSBmb3IgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgQ2FyZGluYWxpdHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eU9jY3VycmVuY2V9IG9jY3VycmVuY2UgdHlwZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBudW1lcmljYWwgdmFsdWUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRoZSBnaXZlbiBvY2N1cnJlbmNlIGFwcGxpZXMgdG8uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgb2NjdXJyZW5jZTogQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IHN0cmluZykge1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb24gcGF0aCB0byBhbiBpY29uIHJlcHJlc2VudGluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnQgY29tbWVudCBvbiB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7Q2FyZGluYWxpdHlbXX0gY2FyZGluYWxpdGllcyB0aGUgcmVzb3VyY2UgY2xhc3MncyBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaWNvbjogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBsYWJlbDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGNhcmRpbmFsaXRpZXM6IEFycmF5PENhcmRpbmFsaXR5Pikge1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyB0byByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc291cmNlQ2xhc3NlcyB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZXNvdXJjZUNsYXNzO1xufVxuXG5cbi8qKlxuICogQSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0VHlwZSB0aGUgcHJvcGVydHkncyBvYmplY3QgY29uc3RyYWludC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHN1YlByb3BlcnR5T2YgSXJpcyBvZiBwcm9wZXJ0aWVzIHRoZSBnaXZlbiBwcm9wZXJ0eSBpcyBhIHN1YnByb3BlcnR5IG9mLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFZGl0YWJsZSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgY2FuIGJlIGVkaXRlZCBieSB0aGUgY2xpZW50LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgbGlua2luZyBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGlua1ZhbHVlUHJvcGVydHkgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHByb3BlcnR5IHJlZmVycyB0byBhIGxpbmsgdmFsdWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBvYmplY3RUeXBlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgY29tbWVudDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgc3ViUHJvcGVydHlPZjogQXJyYXk8c3RyaW5nPixcbiAgICAgICAgICAgICAgICByZWFkb25seSBpc0VkaXRhYmxlOiBCb29sZWFuLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGlzTGlua1Byb3BlcnR5OiBCb29sZWFuLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGlzTGlua1ZhbHVlUHJvcGVydHk6IEJvb2xlYW4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHByb3BlcnR5IElyaXMgdG8gcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFByb3BlcnR5O1xufVxuXG5cbi8qKlxuICogR3JvdXBzIHJlc291cmNlIGNsYXNzZXMgYnkgdGhlIG9udG9sb2d5IHRoZXkgYXJlIGRlZmluZWQgaW4uXG4gKlxuICogQSBtYXAgb2Ygb250b2xvZ3kgSXJpcyB0byBhbiBhcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBjYWNoZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gKG9ubHkgdXNlZCBieSB0aGlzIHNlcnZpY2UgaW50ZXJuYWxseSkuXG4gKiBUaGlzIGNhY2hlIGlzIHVwZGF0ZWQgd2hlbmV2ZXIgbmV3IGRlZmluaXRpb25zIGFyZSByZXF1ZXN0ZWQgZnJvbSBLbm9yYS5cbiAqXG4gKiBSZXF1ZXN0ZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gYnkgYSBzZXJ2aWNlIGlzIHJlcHJlc2VudGVkIGJ5IFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lNZXRhZGF0YVtdfSBvbnRvbG9naWVzIEFuIGFycmF5IG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIG9udG9sb2dpZXM6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IGxpc3Qgb2YgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgbmFtZWQgZ3JhcGguXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb250b2xvZ3kgaW5mb3JtYXRpb24gcmVxdWVzdGVkIGZyb20gdGhpcyBzZXJ2aWNlLlxuICpcbiAqIEZvciBldmVyeSByZXF1ZXN0LCBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHJldHVybmVkIGNvbnRhaW5pbmcgdGhlIHJlcXVlc3RlZCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBnaXZlbiBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSxcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcyxcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU29ydHMgYW4gYXJyYXkgb2YgYFJlc291cmNlQ2xhc3NgIG9yIGBQcm9wZXJ0eWAgYnkgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBmaXJzdCBlbGVtZW50XG4gICAgICogQHBhcmFtIGIgc2Vjb25kIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIG5lZ2F0aXZlIC0xIGlmIHRoZSBmaXJzdCBlbGVtZW50IGlzIGNvbnNpZGVyZWQgbG93ZXIgdGhhbiB0aGUgc2Vjb25kLCAxIGlmIHRoZSBzZWNvbmQgZWxlbWVudCBpcyBjb25zaWRlcmVkIGJpZ2dlciwgMCBpZiB0aGV5IGFyZSBlcXVhbFxuICAgICAqL1xuICAgIHN0YXRpYyBzb3J0RnVuYyhhOiBSZXNvdXJjZUNsYXNzIHwgUHJvcGVydHksIGI6IFJlc291cmNlQ2xhc3MgfCBQcm9wZXJ0eSkge1xuICAgICAgICAvLyBkZWFsaW5nIHdpdGggJ3VuZGVmaW5lZCcgbGFiZWxzXG4gICAgICAgIGlmIChhLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGIubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGFiZWxBID0gYS5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsYWJlbEIgPSBiLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGxhYmVsQSA8IGxhYmVsQikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsQSA+IGxhYmVsQikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGEgc2VydmljZSBsaWtlIHRoZSBzZWFyY2ggZmV0Y2hlcyBuZXcgcmVzdWx0c1xuICAgICAqIHRoYXQgaGF2ZSB0byBiZSBhZGRlZCB0byBhbiBleGlzdGluZyBjb2xsZWN0aW9uLlxuICAgICAqIFRoZSBleGlzdGluZyBvbnRvbG9neSBpbmZvcm1hdGlvbiBtdXN0IG5vdCBiZSBsb3N0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gdGhlIGdpdmVuIGRlZmluaXRpb25zIHRoYXQgaGF2ZSB0byBiZSBpbnRlZ3JhdGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzZXMgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc29ydEFzYyBzb3J0IHJlc291cmNlIGNsYXNzZXMgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGRlZmF1bHRcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzW11cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBc0FycmF5KHNvcnRBc2M6IGJvb2xlYW4gPSB0cnVlKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc291cmNlQ2xhc3NlcyBvcmRlciBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgcmVzQ2xhc3Nlcy5zb3J0KE9udG9sb2d5SW5mb3JtYXRpb24uc29ydEZ1bmMpO1xuXG4gICAgICAgIC8vIHJlc291cmNlQ2xhc3NlcyBvcmRlciBieSBsYWJlbCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGlmICghc29ydEFzYykge1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc0NsYXNzIHJlc291cmNlIGNsYXNzIHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzQ2xhc3M6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWY6IFJlc291cmNlQ2xhc3MgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc0RlZiAhPT0gdW5kZWZpbmVkICYmIHJlc0NsYXNzRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjYW5ub3QgZ2V0IGxhYmVsIGZvciAke3Jlc0NsYXNzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3Mgd2l0aG91dCBhcmd1bWVudCByZXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBQcm9wZXJ0aWVzIC0gYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMoKTogUHJvcGVydGllcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc29ydEFzYyBzb3J0IHByb3BlcnRpZXMgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGRlZmF1bHRcbiAgICAgKiBAcmV0dXJucyBQcm9wZXJ0eVtdIC0gYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0FzQXJyYXkoc29ydEFzYzogYm9vbGVhbiA9IHRydWUpOiBBcnJheTxQcm9wZXJ0eT4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IEFycmF5PFByb3BlcnR5PiA9IFtdO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BJcmkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb3BlcnRpZXMgb3JkZXIgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIHByb3BlcnRpZXMuc29ydChPbnRvbG9neUluZm9ybWF0aW9uLnNvcnRGdW5jKTtcblxuICAgICAgICAvLyBwcm9wZXJ0aWVzIG9yZGVyIGJ5IGxhYmVsIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgaWYgKCFzb3J0QXNjKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUHJvcGVydHkocHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcERlZjogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldO1xuXG4gICAgICAgICAgICBpZiAocHJvcERlZiAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgY2Fubm90IGdldCBsYWJlbCBmb3IgJHtwcm9wZXJ0eX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JQcm9wZXJ0eSB3aXRob3V0IGFyZ3VtZW50IHByb3BlcnR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEgYW5kIGNhY2hlcyBpdC5cbiAqIE90aGVyIGNvbXBvbmVudHMgb3Igc2VydmljZXMgb2J0YWluIG9udG9sb2d5IGluZm9ybWF0aW9uIHRocm91Z2ggdGhpcyBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5Q2FjaGVTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIE9udG9sb2dpZXMgaW5nb3JlZCBieSB0aGlzIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZWRPbnRvbG9naWVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGNsdWRlZE9udG9sb2dpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3ksIEtub3JhQ29uc3RhbnRzLlN0YW5kb2ZmT250b2xvZ3ldO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZWRQcm9wZXJ0aWVzIHByb3BlcnRpZXMgdGhhdCBLbm9yYSBpcyBub3QgcmVzcG9uc2libGUgZm9yIGFuZCB0aGF0IGhhdmUgdG8gYmUgaWdub3JlZCBiZWNhdXNlIHRoZXkgY2Fubm90IGJlIHJlc29sdmVkIGF0IHRoZSBtb21lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGNsdWRlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG5vblJlc291cmNlQ2xhc3NlcyBjbGFzcyBkZWZpbml0aW9ucyB0aGF0IGFyZSBub3QgYmUgdHJlYXRlZCBhcyBLbm9yYSByZXNvdXJjZSBjbGFzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBub25SZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuRm9yYmlkZGVuUmVzb3VyY2UsIEtub3JhQ29uc3RhbnRzLlhNTFRvU3RhbmRvZmZNYXBwaW5nLCBLbm9yYUNvbnN0YW50cy5MaXN0Tm9kZV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5Q2FjaGV9IGNhY2hlT250b2xvZ3kgY2VudHJhbCBpbnN0YW5jZSB0aGF0IGNhY2hlcyBhbGwgZGVmaW5pdGlvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhY2hlT250b2xvZ3k6IE9udG9sb2d5Q2FjaGUgPSBuZXcgT250b2xvZ3lDYWNoZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb250b2xvZ3lTZXJ2aWNlOiBPbnRvbG9neVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8b2JqZWN0PiAtIG1ldGFkYXRhIGZvciBhbGwgb250b2xvZ2llcyBhcyBKU09OLUxEIChubyBwcmVmaXhlcywgYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQpLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgKHJlc291cmNlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMpIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbnRvbG9neUlyaSB0aGUgSXJpIG9mIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhbGwgdGhlIG9udG9sb2dpZXMnIG1ldGFkYXRhIHJldHVybmVkIGJ5IEtub3JhIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IG9udG9sb2dpZXMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBhIG5ldyBPbnRvbG9neU1ldGFkYXRhIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShvbnRvbG9naWVzOiBvYmplY3RbXSkge1xuXG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzID0gb250b2xvZ2llcy5tYXAoXG4gICAgICAgICAgICBvbnRvbG9neSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neU1ldGFkYXRhKG9udG9sb2d5WydAaWQnXSwgb250b2xvZ3lbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgb250b2xvZ2llcycgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGUgYW5kIHJldHVybnMgdGhlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IC0gbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBga25vcmEtYXBpOlJlc291cmNlYCB3aWxsIGJlIGV4Y2x1ZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxvYmplY3Q+fSBjbGFzc0RlZmluaXRpb25zIHRoZSBjbGFzcyBkZWZpbml0aW9ucyBpbiBhbiBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgZ2l2ZW4gY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgY2xhc3NEZWYgb2YgY2xhc3NEZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NJcmkgPSBjbGFzc0RlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgY2xhc3MgbmFtZSBpcyBub3QgbGlzdGVkIGFzIGEgbm9uIHJlc291cmNlIGNsYXNzIGFuZCB0aGF0IHRoZSBpc1Jlc291cmNlQ2xhc3MgZmxhZyBpcyBwcmVzZW50IGFuZCBzZXQgdG8gdHJ1ZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNsYXNzSXJpICE9PSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZSAmJiB0aGlzLm5vblJlc291cmNlQ2xhc3Nlcy5pbmRleE9mKGNsYXNzSXJpKVxuICAgICAgICAgICAgICAgID09PSAtMSAmJiAoY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSAhPT0gdW5kZWZpbmVkICYmIGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgdmFsdWUgY2xhc3MsIGJ1dCBhIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5wdXNoKGNsYXNzSXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzSXJpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2d5XG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogS25vcmEgYXV0b21hdGljYWxseSBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gaW4gdGhlIGNhcmRpbmFsaXRpZXMgb2YgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKiBJZiB0aGV5IGFyZSBkZWZpbmVkIGluIGFub3RoZXIgb250b2xvZ3ksIHRoYXQgb250b2xvZ3kgaXMgcmVxdWVzdGVkIGZyb20gS25vcmEgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9udG9sb2d5IHRoZSBvbnRvbG9neSB0byBiZSBjYWNoZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3k6IG9iamVjdCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGdyYXBoID0gb250b2xvZ3lbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGdldCBhbGwgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgY2xhc3NEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQ2xhc3M7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgYWxsIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bE9iamVjdFByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bERhdGF0eXBlUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQW5ub3RhdGlvblByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLlJkZlByb3BlcnR5O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBjYWNoZSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgb250b2xvZ3lcbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lbJ0BpZCddXSA9IHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZnMpO1xuXG4gICAgICAgIC8vIHdyaXRlIGNsYXNzIGFuZCBwcm9wZXJ0eSBkZWZpbnRpb25zIHRvIGNhY2hlXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKGNsYXNzRGVmcywgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyB0aGUgb250b2xvZ2llcyBmb3Igd2hpY2ggZGVmaW5pdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGFsbCByZXF1ZXN0ZWQgbmFtZWQgZ3JhcGhzXG4gICAgICAgIGxldCBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3Qgb250b2xvZ3lJcmkgb2Ygb250b2xvZ3lJcmlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2dpZXNGcm9tQ2FjaGU6IG9udG9sb2d5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtvbnRvbG9neUlyaX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3lcbiAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXTtcblxuICAgICAgICAgICAgLy8gYWRkIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIG9mIHRoaXMgb250b2xvZ3lcbiAgICAgICAgICAgIGFsbFJlc291cmNlQ2xhc3NJcmlzID0gYWxsUmVzb3VyY2VDbGFzc0lyaXMuY29uY2F0KHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIGFsbCByZXF1ZXN0ZWQgb250b2xvZ2llc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMoYWxsUmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3ksIHJlc0NsYXNzRGVmcy5nZXRSZXNvdXJjZUNsYXNzZXMoKSwgcmVzQ2xhc3NEZWZzLmdldFByb3BlcnRpZXMoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgb250b2xvZ3kgcmVzcG9uc2UgaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zIHRoZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShyZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4sIHByb3BlcnR5Q2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzIG9mIHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucykge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0lyaSA9IHJlc0NsYXNzWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gcmVwcmVzZW50cyBhbGwgY2FyZGluYWxpdGllcyBvZiB0aGlzIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0aWVzOiBDYXJkaW5hbGl0eVtdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNsYXNzT2ZDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBzaW5nbGUgb2JqZWN0IG9yIGEgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gW3Jlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNhcmRpbmFsaXRpZXMgZm9yIHRoZSBwcm9wZXJ0aWVzIG9mIGEgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGN1ckNhcmQgb2Ygc3ViY2xhc3NPZkNvbGxlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXQgaXMgYSBjYXJkaW5hbGl0eSAoaXQgY291bGQgYWxzbyBiZSBhbiBJcmkgb2YgYSBzdXBlcmNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBjdXJDYXJkWydAdHlwZSddICE9PSB1bmRlZmluZWQgJiYgY3VyQ2FyZFsnQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuT3dsUmVzdHJpY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NhcmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBvY2N1cnJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1pbkNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5jYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWF4Q2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8ga25vd24gb2NjdXJyZW5jZSBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGNhcmRpbmFsaXR5IHR5cGUgaW52YWxpZCBmb3IgJHtyZXNDbGFzc1snQGlkJ119ICR7Y3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGd1aSBvcmRlclxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdGllcy5wdXNoKG5ld0NhcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NPYmogPSBuZXcgUmVzb3VyY2VDbGFzcyhcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZXNvdXJjZUljb25dLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHdyaXRlIHRoaXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbiB0byB0aGUgY2FjaGUgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9IHJlc0NsYXNzT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGUgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqIFRoZSBhbnN3ZXIgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGJ5IHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIGFuIFtbT250b2xvZ3lDYWNoZV1dIHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuICAgICAgICAvLyBjb2xsZWN0IHRoZSBkZWZpbml0aW9ucyBmb3IgZWFjaCByZXNvdXJjZSBjbGFzcyBmcm9tIHRoZSBjYWNoZVxuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBwcm9wZXJ0aWVzIGZyb20gdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgY29uc3QgcHJvcGVydHlJcmlzID0gW107XG5cbiAgICAgICAgcmVzQ2xhc3NJcmlzLmZvckVhY2goXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzW3Jlc0NsYXNzSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0uY2FyZGluYWxpdGllcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICBjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBlYWNoIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUlyaXMucHVzaChjYXJkLnByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICBwcm9wRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCByZXNDbGFzc0RlZnMsIHByb3BEZWZzLmdldFByb3BlcnRpZXMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3Igb250b2xvZ3kgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllc1xuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmFcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYTogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BEZWYgb2YgcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wSXJpID0gcHJvcERlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIGxldCBpc0VkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1Byb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1ZhbHVlUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3ViUHJvcGVydHlPZiA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0pKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZiA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0ubWFwKChzdXBlclByb3A6IE9iamVjdCkgPT4gc3VwZXJQcm9wWydAaWQnXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YucHVzaChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdWydAaWQnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvYmplY3RUeXBlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdWydAaWQnXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGUgcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPSBuZXcgUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUsXG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHByb3BlcnR5IGRlZmluaXRpb25zIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPbnRvbG9neUluZm9ybWF0aW9uIC0gcmVxdWVzdGVkIHByb3BlcnR5IGRlZmludGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBuZXcgUHJvcGVydGllcygpO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGU6IHByb3BlcnR5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtwcm9wSXJpfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb3BlcnR5RGVmc1twcm9wSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCBuZXcgUmVzb3VyY2VDbGFzc2VzKCksIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4gLSBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IHtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIGluIGNhY2hlIHlldCwgZ2V0IG1ldGFkYXRhIGZyb20gS25vcmFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUobWV0YWRhdGFbJ0BncmFwaCddLmZpbHRlcigob250bykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBleGNsdWRlZCBvbnRvbG9naWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZWRPbnRvbG9naWVzLmluZGV4T2Yob250b1snQGlkJ10pID09PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBtZXRhZGF0YSBmcm9tIGNhY2hlXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gS25vcmEsIGFkZGluZyB0aGVtIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHJlcXVlc3RlZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueVtdPlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICAgICAgLy8gYXJyYXkgdG8gYmUgcG9wdWxhdGVkIHdpdGggT2JzZXJ2YWJsZXNcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgICAgICAvLyBkbyBhIHJlcXVlc3QgZm9yIGVhY2ggb250b2xvZ3lcbiAgICAgICAgb250b2xvZ3lJcmlzLmZvckVhY2gob250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgLy8gcHVzaCBhbiBPYnNlcnZhYmxlIG9udG8gYG9ic2VydmFibGVzYFxuICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAob250b2xvZ3k6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgcmVzcG9uc2UgdG8gY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZvcmtKb2luIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBvZiBhbiBhcnJheSBvZiByZXN1bHRzXG4gICAgICAgIC8vIHJldHVybmVkIGJ5IGVhY2ggT2JzZXJ2YWJsZSBjb250YWluZWQgaW4gYG9ic2VydmFibGVzYFxuICAgICAgICAvLyBhIHN1YnNjcmlwdGlvbiB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBmb3JrSm9pbiBpcyBleGVjdXRlZFxuICAgICAgICAvLyBvbmNlIGFsbCBPYnNlcnZhYmxlcyBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihvYnNlcnZhYmxlcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIGFsbCBvbnRvbG9neSBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5SXJpc1RvUXVlcnkgPSBvbnRvbG9neUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgb250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb250b2xvZ3kgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBvbnRvbG9naWVzIHRoYXQgYXJlIG1vdCBjYWNoZWQgeWV0XG4gICAgICAgIGlmIChvbnRvbG9neUlyaXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpc1RvUXVlcnkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZWQgb25jZSBhbGwgb250b2xvZ2llcyBoYXZlIGJlZW4gY2FjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIFByb3BlcnRpZXMgY29udGFpbmVkIGluIHRoZSBjYXJkaW5hbGl0aWVzIHdpbGwgYmUgcmV0dXJuZWQgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzIChpbmNsdWRpbmcgcHJvcGVydGllcykuXG4gICAgICovXG4gICAgcHVibGljIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yOiBzdHJpbmdbXSA9IHJlc291cmNlQ2xhc3NJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5tYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHJlc0NsYXNzSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZCAuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHVibGljIGdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNUb1F1ZXJ5OiBzdHJpbmdbXSA9IHByb3BlcnR5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByb3BlcnR5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvcGVydGllc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXNUb1F1ZXJ5Lm1hcChcbiAgICAgICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShwcm9wSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gd2l0aDogcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuL3JlYWQtcmVzb3VyY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGVudGl0aWVzIHVzZWQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb24gb2YgYFJlYWRSZXNvdXJjZWAuXG4gICAgICovXG4gICAgcHVibGljIHJlYWRvbmx5IG9udG9sb2d5SW5mb3JtYXRpb246IE9udG9sb2d5SW5mb3JtYXRpb24gPSBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbih7fSwge30sIHt9KTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSByZXNvdXJjZXMgZ2l2ZW4gc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlJlc291cmNlcyBudW1iZXIgb2YgZ2l2ZW4gcmVzb3VyY2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4sIHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSB7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiBhIGNvdW50IHF1ZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgQ291bnRRdWVyeVJlc3VsdCB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBudW1iZXJPZlJlc3VsdHMgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgZm9yIGEgcXVlcnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzdWx0czogbnVtYmVyKSB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBJbWFnZVJlZ2lvbiB9IGZyb20gJy4vaW1hZ2UtcmVnaW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGltYWdlIGluY2x1ZGluZyBpdHMgcmVnaW9ucy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZX0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHtJbWFnZVJlZ2lvbltdfSByZWdpb25zIHRoZSByZWdpb25zIGJlbG9uZ2luZyB0byB0aGUgaW1hZ2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIHJlYWRvbmx5IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10pIHtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZEdlb21WYWx1ZSwgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVnaW9uLlxuICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHJlc291cmNlIHJlcHJlc2VudGluZyB0aGUgcmVnaW9uIGFuZCBpdHMgZ2VvbWV0cmllcy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgSW1hZ2VSZWdpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZX0gcmVnaW9uUmVzb3VyY2UgYSByZXNvdXJjZSBvZiB0eXBlIFJlZ2lvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHJlZ2lvblJlc291cmNlOiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VvbWV0cnkgaW5mb3JtYXRpb24gYmVsb25naW5nIHRvIHRoaXMgcmVnaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1JlYWRHZW9tVmFsdWVbXX1cbiAgICAgKi9cbiAgICBnZXRHZW9tZXRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25SZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc0dlb21ldHJ5XSBhcyBSZWFkR2VvbVZhbHVlW107XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4vZGVjbGFyYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBLdWlDb3JlQ29uZmlnfVxuICAgIF1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIEt1aUNvcmVNb2R1bGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtLdWlDb3JlQ29uZmlnfSBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlV2l0aFByb3ZpZGVyc31cbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEt1aUNvcmVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBhcHAgZW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBoZXJlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogS3VpQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBncm91cCBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9ncm91cHMnO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBhbGwgZ3JvdXBzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cFtdPlxuICAgICAqL1xuICAgIGdldEFsbEdyb3VwcygpOiBPYnNlcnZhYmxlPEdyb3VwW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGdyb3VwIG9iamVjdCAoZmlsdGVyIGJ5IElSSSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cD5cbiAgICAgKi9cbiAgICBnZXRHcm91cEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cD4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBSZXNwb25zZSkuZ3JvdXApLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IGxpc3RzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vbGlzdHMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV1cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPlxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGdldExpc3QobGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3QgaW5mbyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdEluZm8obGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgbm9kZSBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0Q3JlYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdD5cbiAgICAgKi9cbiAgICBjcmVhdGVMaXN0KHBheWxvYWQ6IExpc3RDcmVhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRWRpdCBsaXN0IGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RJbmZvVXBkYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgdXBkYXRlTGlzdEluZm8ocGF5bG9hZDogTGlzdEluZm9VcGRhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWQubGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFByb2plY3QsIFByb2plY3RNZW1iZXJzUmVzcG9uc2UsIFByb2plY3RSZXNwb25zZSwgUHJvamVjdHNSZXNwb25zZSwgVXNlciB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcHJvamVjdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHByb2plY3RzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0W10+XG4gICAgICovXG4gICAgZ2V0QWxsUHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3Byb2plY3RzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0c1Jlc3BvbnNlKS5wcm9qZWN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWUgc2hvcnQgbmFtZSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgcmV0cmlldmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHByb2plY3QgaWQgKGlyaSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0bmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWUgc2hvcnQgbmFtZSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0Y29kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGUgaGV4YWRlY2ltYWwgY29kZSB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgbWVtYmVyIHJldHJpZXZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdE1lbWJlcnModXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlKS5tZW1iZXJzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBjcmVhdGVQcm9qZWN0KGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFZGl0IHByb2plY3QgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2plY3QoaXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgcHJvamVjdCAoaWYgaXQgd2FzIGRlbGV0ZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGFjdGl2YXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgKHNldCBpbmFjdGl2ZSkgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZSh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHVzZXMgdGhlIEtub3JhIGFkbWluIEFQSSBhbmQgaGFuZGxlcyBhbGwgdXNlciBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgdXNlcnNVcmw6IHN0cmluZyA9IHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vdXNlcnMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB1c2Vycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgLSBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXByZWNhdGVkISBQbGVhc2UgdXNlIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKSBvbmx5IVxuICAgICAqIEdldCB1c2VyIGJ5IGVtYWlsXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIoZW1haWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQhIFBsZWFzZSB1c2UgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpIG9ubHkhXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlckJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIoaXJpKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyKGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHVzZXIgb2YgYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1N5c3RlbUFkbWluKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWN0aXZhdGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBvd24gcGFzc3dvcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVPd25QYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiBvbGRQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBwYXNzd29yZCBvZiBhbm90aGVyIHVzZXIgKG5vdCBvd24pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVyUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlVXNlcnNQYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIHJlcXVlc3RlclBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHVzZXIgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlVXNlcih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIC8gZGVhY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZGVsZXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHVzZXIgZnJvbSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIHtcblxuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQoeyB2YXI6IGxhbmcgfSk7XG4gIH1cbiAgZ2V0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c01zZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykge1xuICB9XG5cbiAgLyoqXG4gICogdGhpcyBtZXRob2QgZ2V0IHRoZSBzdGF0dXMgbWVzc2FnZXMgZnJvbSB0aGUgc3RhdHVzTXNnLmpzb24gZmlsZVxuICAqIHdoaWNoIGFyZSBkZWZpbmVkIGhlcmU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfSFRUUF9zdGF0dXNfY29kZXNcbiAgKiBhbmQgaGVyZTogaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvcmVmX2h0dHBtZXNzYWdlcy5hc3BcbiAgKlxuICAqL1xuICBnZXRTdGF0dXNNc2coKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcHAgKyAnL2Fzc2V0cy9pMThuL3N0YXR1c01zZy5qc29uJylcbiAgICAgIC5waXBlKG1hcChcbiAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICk7XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7XG4gICAgQ291bnRRdWVyeVJlc3VsdCxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBSZWFkQm9vbGVhblZhbHVlLFxuICAgIFJlYWRDb2xvclZhbHVlLFxuICAgIFJlYWREYXRlVmFsdWUsXG4gICAgUmVhZERlY2ltYWxWYWx1ZSxcbiAgICBSZWFkR2VvbVZhbHVlLFxuICAgIFJlYWRJbnRlZ2VyVmFsdWUsXG4gICAgUmVhZEludGVydmFsVmFsdWUsXG4gICAgUmVhZExpbmtWYWx1ZSxcbiAgICBSZWFkTGlzdFZhbHVlLFxuICAgIFJlYWRQcm9wZXJ0aWVzLFxuICAgIFJlYWRQcm9wZXJ0eUl0ZW0sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dEZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dFZhbHVlQXNIdG1sLFxuICAgIFJlYWRUZXh0VmFsdWVBc1N0cmluZyxcbiAgICBSZWFkVGV4dFZhbHVlQXNYbWwsXG4gICAgUmVhZFVyaVZhbHVlLFxuICAgIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmssXG4gICAgVXRpbHNcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIGNvbnZlcnQgSlNPTi1MRCByZXByZXNlbnRpbmcgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzIHRvIGNsYXNzZXMuXG4gKiBUaGVzZSBtZXRob2RzIHdvcmtzIG9ubHkgZm9yIGluc3RhbmNlcyBvZiByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMsIG5vdCBmb3Igb250b2xvZ2llcyAoZGF0YSBtb2RlbCkuXG4gKi9cbmV4cG9ydCBtb2R1bGUgQ29udmVydEpTT05MRCB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gYSBmaWx0ZXIgdXNlZCBvbiBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lc1xuICAgICAqIHNvcnRpbmcgb3V0IGFsbCBub24gdmFsdWUgcHJvcGVydHkgbmFtZXMuXG4gICAgICpcbiAgICAgKiBHZXRzIGFsbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHJlZmVyIHRvIHZhbHVlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcE5hbWUgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gLSBpbmRpY2F0aW5nIGlmIHRoZSBuYW1lIHJlZmVycyB0byBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbnN0IGdldFByb3BlcnR5TmFtZXMgPSAocHJvcE5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BOYW1lICE9PSAnQGlkJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09ICdAdHlwZSdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvUHJvamVjdFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Vc2VyXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuY3JlYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMubGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5oYXNQZXJtaXNzaW9uc1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLkFya1VybDtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBSZWFkUHJvcGVydGllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUHJvcGVydGllcyB7XG5cbiAgICAgICAgLy8gSlNPTi1MRCByZXByZXNlbnRpbmcgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgLy8gdGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gc3RhbmRvZmYgbGlua3NcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEOiBPYmplY3QgPSByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlXTtcblxuICAgICAgICAvLyB0byBiZSBwb3B1bGF0ZWQgd2l0aCBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSA9IFtdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZWFjaCBzdGFuZG9mZiBsaW5rIHZhbHVlIEpTT04tTEQgb2JqZWN0IHRvIGEgUmVhZExpbmtWYWx1ZVxuICAgICAgICAvLyBpbiBvcmRlciBwb3B1bGF0ZSB0aGUgY29sbGVjdGlvbiB3aXRoIGFsbCB0aGUgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmtKU09OTEQgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWw6IFJlYWRMaW5rVmFsdWUgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWwgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZ2l2ZW4gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlczogQXJyYXk8UmVhZFByb3BlcnR5SXRlbT4gPSBbXTtcblxuICAgICAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHZhbHVlcyBvciBqdXN0IG9uZSB2YWx1ZSBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIHZhbHVlc1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgYW4gYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzIGlzIGdpdmVuLCBpdGVyYXRlIG92ZXIgaXRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BWYWx1ZSBvZiByZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3BWYWx1ZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFuIEFQSSByZXNwb25zZSBpbiBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcyBpbnRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHJlc291cmNlIG9yIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSAtIHNlcXVlbmNlIG9mIHJlYWQgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gc3RyaW5nW10gLSBhbiBBcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIChpbmNsdWRpbmcgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIC8vIHNldmVyYWwgdmFsdWVzIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVmZXJyZWRSZXMgb2YgcmVzb3VyY2VKU09OTERbcHJvcF0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWUgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZlcnJlZFJlc291cmNlQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc291cmNlIHR5cGVzIChjbGFzc2VzKSBmcm9tIGEgSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhIEpTT04tTEQgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeSBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50UXVlcnlKU09OTERcbiAgICAgKiBAcmV0dXJucyB7Q291bnRRdWVyeVJlc3VsdH1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEOiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTERbS25vcmFDb25zdGFudHMuc2NoZW1hTnVtYmVyT2ZJdGVtc10pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQsIEt1aUNvcmVDb25maWcsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3RzIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlcyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UgYXMgYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIGdldFJlYWRSZXNvdXJjZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIG9mIGFuIEFwaVNlcnZpY2VFcnJvclxuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBwb3N0LCBwdXQsIGRlbGV0ZVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCwgQ291bnRRdWVyeVJlc3VsdCwgS3VpQ29yZUNvbmZpZywgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLyoqXG4gKiBQZXJmb3JtcyBzZWFyY2hlcyAoZnVsbHRleHQgb3IgZXh0ZW5kZWQpIGFuZCBzZWFyY2ggY291bnQgcXVlcmllcyBpbnRvIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX29udG9sb2d5Q2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgSlNPTi1MRCBvYmplY3QgdG8gYSBgUmVhZFJlc29yY2VTZXF1ZW5jZWAuXG4gICAgICogVG8gYmUgcGFzc2VkIGFzIGEgZnVuY3Rpb24gcG9pbnRlciAoYXJyb3cgbm90YXRpb24gcmVxdWlyZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlc291cmNlUmVzcG9uc2VcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2U6IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiA9IChyZXNvdXJjZVJlc3BvbnNlOiBPYmplY3QpID0+IHtcbiAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAoZm9yIHBhZ2luZywgZmlyc3Qgb2Zmc2V0IGlzIDApLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGx0ZXh0U2VhcmNoKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC8nICsgc2VhcmNoVGVybSwgaHR0cFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnb2Zmc2V0Jywgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtLCBodHRwUGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdGAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5KHNlYXJjaFRlcm06IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoIGNvdW50IHF1ZXJ5IGFuZCB0dXJucyB0aGUgcmVzdWx0IGludG8gYSBgQ291bnRRdWVyeVJlc3VsdGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBzZWFyY2hUZXJtKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0byBhIGBDb3VudFF1ZXJ5UmVzdWx0YFxuICAgICAgICAgICAgICAgIENvbnZlcnRKU09OTEQuY3JlYXRlQ291bnRRdWVyeVJlc3VsdFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoKGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkJywgZ3JhdnNlYXJjaFF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBncmF2c2VhcmNoUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnkoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50JywgZ3JhdnNlYXJjaFF1ZXJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBleHRlbmRlZCBzZWFyY2ggY291bnQgcXVlcnkgYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKGdyYXZzZWFyY2hRdWVyeSA9PT0gdW5kZWZpbmVkIHx8IGdyYXZzZWFyY2hRdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gU3BhcnFsIHN0cmluZyBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwUG9zdCgnL3YyL3NlYXJjaGV4dGVuZGVkL2NvdW50JywgZ3JhdnNlYXJjaFF1ZXJ5KTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0byBhIGBDb3VudFF1ZXJ5UmVzdWx0YFxuICAgICAgICAgICAgICAgIENvbnZlcnRKU09OTEQuY3JlYXRlQ291bnRRdWVyeVJlc3VsdFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwuXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYHNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNvdXJjZUNsYXNzSVJJXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgc2VhcmNoQnlMYWJlbChzZWFyY2hUZXJtOiBzdHJpbmcsIHJlc291cmNlQ2xhc3NJUkk/OiBzdHJpbmcsIHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lSSSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJywgcmVzb3VyY2VDbGFzc0lSSSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ2xpbWl0VG9Qcm9qZWN0JywgcHJvamVjdElyaSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwR2V0KCkgZXhwZWN0cyBvbmx5IG9uZSBhcmd1bWVudCwgbm90IDJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgc2VhcmNoIGJ5IGEgcmVzb3VyY2UncyByZGZzOmxhYmVsIGFuZCB0dXJucyB0aGUgcmVzdWx0cyBpbiBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzb3VyY2VDbGFzc0lSSV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV0gcmVzdHJpY3Qgc2VhcmNoIHRvIGdpdmVuIHByb2plY3QuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtOiBzdHJpbmcsIHJlc291cmNlQ2xhc3NJUkk/OiBzdHJpbmcsIHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSVJJICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Jlc291cmNlQ2xhc3MnLCByZXNvdXJjZUNsYXNzSVJJKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Byb2plY3QnLCBwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogUmVxdWVzdHMgaW5jb21pbmcgaW5mb3JtYXRpb24gKHJlZ2lvbnMsIGxpbmtzLCBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKSBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbmNvbWluZ1NlcnZpY2UgZXh0ZW5kcyBTZWFyY2hTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgcmVnaW9ucyBmb3IgYSBwYXJ0aWN1bGFyIHJlc291cmNlLlxuICAgICpcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlSSSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBJbmNvbWluZyByZWdpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICovXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKHJlc291cmNlSVJJOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cmVnaW9uIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbn0gV0hFUkUge1xuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZWdpb24gLlxuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJUkl9PiAuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlSSX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxua25vcmEtYXBpOmhhc0dlb21ldHJ5IGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpHZW9tIC5cblxuP2dlb20gYSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxua25vcmEtYXBpOmhhc0NvbW1lbnQga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOnN0cmluZyAuXG5cbj9jb21tZW50IGEgeHNkOnN0cmluZyAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG5rbm9yYS1hcGk6aGFzQ29sb3Iga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkNvbG9yIC5cblxuP2NvbG9yIGEga25vcmEtYXBpOkNvbG9yIC5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NwYXJxbFF1ZXJ5U3RyICcsIHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlLCBpZiBhbnkuXG4gICAgICogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBsaW5rIHRvIHRoZSBnaXZlbiByZXNvdXJjZSB2aWEga25vcmEtYmFzZTppc1BhcnRPZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9wYWdlIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbn0gV0hFUkUge1xuXG4/cGFnZSBhIGtub3JhLWFwaTpTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gLlxuP3BhZ2UgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5rbm9yYS1hcGk6c2VxbnVtIGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDppbnRlZ2VyIC5cblxuP3NlcW51bSBhIHhzZDppbnRlZ2VyIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbmtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6RmlsZSAuXG5cbj9maWxlIGEga25vcmEtYXBpOkZpbGUgLlxuXG59IE9SREVSIEJZID9zZXFudW1cbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBJcmkgYnV0IGluY29taW5nIHJlZ2lvbnMgYW5kIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBpbmNvbWluZyBsaW5rcyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaFBhcmFtcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW5lcmF0ZUdyYXZzZWFyY2ggYSBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgb2Zmc2V0XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHBhcmFtZXRlciBhbmQgcmV0dXJucyBhIEdyYXZzZWFyY2ggcXVlcnkgc3RyaW5nLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJucyBmYWxzZSBpZiBub3Qgc2V0IGNvcnJlY3RseSAoaW5pdCBzdGF0ZSkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdlbmVyYXRlR3JhdnNlYXJjaDogKG9mZnNldDogbnVtYmVyKSA9PiBzdHJpbmcgfCBib29sZWFuKSB7XG5cbiAgICB9XG5cbn1cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGVtcG9yYXJpbHkgc3RvcmVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlYXJjaFBhcmFtc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudFNlYXJjaFBhcmFtcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBpbml0IHdpdGggYSBkdW1teSBmdW5jdGlvbiB0aGF0IHJldHVybnMgZmFsc2VcbiAgICAgICAgLy8gaWYgdGhlIGFwcGxpY2F0aW9uIGlzIHJlbG9hZGVkLCB0aGlzIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RXh0ZW5kZWRTZWFyY2hQYXJhbXM+KG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcygob2Zmc2V0OiBudW1iZXIpID0+IGZhbHNlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuZGVkU2VhcmNoUGFyYW1zfSBzZWFyY2hQYXJhbXNcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgY2hhbmdlU2VhcmNoUGFyYW1zTXNnKHNlYXJjaFBhcmFtczogRXh0ZW5kZWRTZWFyY2hQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5uZXh0KHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2VhcmNoIHBhcmFtcyBvZiBhbiBleHRlbmRlZCBzZWFyY2guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBFeHRlbmRlZFNlYXJjaFBhcmFtcyAtIHNlYXJjaCBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgZ2V0U2VhcmNoUGFyYW1zKCk6IEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTZWFyY2hQYXJhbXMuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBTZWFyY2hQYXJhbXNTZXJ2aWNlIH0gZnJvbSAnLi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIEtub3JhU2NoZW1hLCBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKiBSZXByZXNlbnRzIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgd2hlbiBnZW5lcmF0aW5nIEtuYXJRTC5cbiAqL1xuY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBHcmF2U2VhcmNoIHF1ZXJpZXMgZnJvbSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBNYXAgb2YgY29tcGxleCBrbm9yYS1hcGkgdmFsdWUgdHlwZXMgdG8gc2ltcGxlIG9uZXMuXG4gICAgICogVXNlIGNvbXB1dGVkIHByb3BlcnR5IG5hbWU6IGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QtaW5pdGlhbGl6ZXIuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZSA9IHtcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEludGVnZXIsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGVjaW1hbFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkRGVjaW1hbCxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNCb29sZWFuVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RCb29sZWFuLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZyxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEYXRlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5kYXRlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludGVydmFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNHZW9tVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5nZW9tU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0NvbG9yVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5jb2xvclNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNHZW9uYW1lVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5nZW9uYW1lU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1VyaVZhbHVlJzogS25vcmFDb25zdGFudHMueHNkVXJpLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1N0aWxsSW1hZ2VGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTW92aW5nSW1hZ2VGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0REREZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQXVkaW9GaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RvY3VtZW50RmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0RmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNMaXN0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmdcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSkgeyB9XG5cbiAgICAvKipcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBDb252ZXJ0cyBhIGNvbXBsZXggdHlwZSBJcmkgdG8gYSBzaW1wbGUgdHlwZSBJcmkuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhUeXBlIHRoZSBJcmkgb2YgYSB2YWx1ZSB0eXBlIChrbm9yYS1hcGkgY29tcGxleCkuXG4gICAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgY29ycmVzcG9uZGluZyBJcmkgb2YgdGhlIHNpbXBsZSB0eXBlIChrbm9yYS1hcGkgc2ltcGxlKS5cbiAgICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKGNvbXBsZXhUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IHNpbXBsZVR5cGU6IHN0cmluZyA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVtjb21wbGV4VHlwZV07XG5cbiAgICAgICAgaWYgKHNpbXBsZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZVR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR3JhdnNlYXJjaEdlbmVyYXRpb25FcnJvcihgY29tcGxleCB0eXBlICR7Y29tcGxleFR5cGV9IGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgdG8gc2ltcGxlIHR5cGUuYCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIEdyYXZzZWFyY2ggcXVlcnkgZnJvbSB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eVdpdGhWYWx1ZVtdfSBwcm9wZXJ0aWVzIHRoZSBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW21haW5SZXNvdXJjZUNsYXNzT3B0aW9uXSB0aGUgY2xhc3Mgb2YgdGhlIG1haW4gcmVzb3VyY2UsIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCAobnRoIHBhZ2Ugb2YgcmVzdWx0cykuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gYSBLbmFyUUwgcXVlcnkgc3RyaW5nLlxuICAgICAqL1xuICAgIGNyZWF0ZUdyYXZzZWFyY2hRdWVyeShwcm9wZXJ0aWVzOiBQcm9wZXJ0eVdpdGhWYWx1ZVtdLCBtYWluUmVzb3VyY2VDbGFzc09wdGlvbj86IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcblxuICAgICAgICAvLyBjbGFzcyByZXN0cmljdGlvbiBmb3IgdGhlIHJlc291cmNlIHNlYXJjaGVkIGZvclxuICAgICAgICBsZXQgbWFpblJlc291cmNlQ2xhc3MgPSAnJztcblxuICAgICAgICAvLyBpZiBnaXZlbiwgY3JlYXRlIHRoZSBjbGFzcyByZXN0cmljdGlvbiBmb3IgdGhlIG1haW4gcmVzb3VyY2VcbiAgICAgICAgaWYgKG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1haW5SZXNvdXJjZUNsYXNzID0gYD9tYWluUmVzIGEgPCR7VXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uKX0+IC5gO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JpdGVyaWEgZm9yIHRoZSBvcmRlciBieSBzdGF0ZW1lbnRcbiAgICAgICAgY29uc3Qgb3JkZXJCeUNyaXRlcmlhID0gW107XG5cbiAgICAgICAgLy8gc3RhdGVtZW50cyB0byBiZSByZXR1cm5lZCBpbiBxdWVyeSByZXN1bHRzXG4gICAgICAgIGNvbnN0IHJldHVyblN0YXRlbWVudHMgPSBbXTtcblxuICAgICAgICAvLyBsb29wIG92ZXIgZ2l2ZW4gcHJvcGVydGllcyBhbmQgY3JlYXRlIHN0YXRlbWVudHMgYW5kIEZpbHRlcnMgYW5kIHR5cGUgYW5ub3RhdGlvbnMgZnJvbSB0aGVtXG4gICAgICAgIGNvbnN0IHByb3BzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXMubWFwKFxuICAgICAgICAgICAgKHByb3BXaXRoVmFsOiBQcm9wZXJ0eVdpdGhWYWx1ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcElyaVNpbXBsZSA9IFV0aWxzLmNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pZCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2ltcGxlVHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSB0aGlzLmNvbnZlcnRDb21wbGV4VHlwZVRvU2ltcGxlVHlwZShwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaW1wbGVUeXBlID0gS25vcmFDb25zdGFudHMucmVzb3VyY2VTaW1wbGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50cyB0aGUgb2JqZWN0IG9mIGEgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHByb3BWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5IHx8IHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdFeGlzdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHksIGNyZWF0ZSBhIHZhcmlhYmxlIGZvciB0aGUgdmFsdWUgKHRvIGJlIHVzZWQgYnkgYSBzdWJzZXF1ZW50IEZJTFRFUilcbiAgICAgICAgICAgICAgICAgICAgLy8gT1IgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgRXhpc3RzIGlzIHVzZWQgaW4gd2hpY2ggY2FzZSB3ZSBkbyBub3QgbmVlZCB0byBzcGVjaWZ5IHRoZSBvYmplY3QgYW55IGZ1cnRoZXJcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gYD9wcm9wVmFsJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSBhbmQgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEV4aXN0cywgdXNlIGl0cyBJUklcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlID0gcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlbWVudDogc3RyaW5nID0gYD9tYWluUmVzIDwke3Byb3BJcmlTaW1wbGV9PiAke3Byb3BWYWx1ZX0gLmA7XG5cbiAgICAgICAgICAgICAgICAvLyB0eXBlIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFR5cGVBbm5vdGF0aW9uID0gYDwke3Byb3BJcmlTaW1wbGV9PiBrbm9yYS1hcGk6b2JqZWN0VHlwZSA8JHtzaW1wbGVUeXBlfT4gLmA7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlQW5ub3RhdGlvbiA9IGAke3Byb3BWYWx1ZX0gYSA8JHtzaW1wbGVUeXBlfT4gLmA7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBpdCBpcyBhIGxpbmtpbmcgcHJvcGVydHkgdGhhdCBoYXMgdG8gYmUgd3JhcHBlZCBpbiBhIEZJTFRFUiBOT1QgRVhJU1RTIChjb21wYXJpc29uIG9wZXJhdG9yIE5PVF9FUVVBTFMpIHRvIG5lZ2F0ZSBpdFxuICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTm90RXF1YWxzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgaW5jbHVkZSBzdGF0ZW1lbnQgaW4gcmVzdWx0cywgYmVjYXVzZSB0aGUgcXVlcnkgY2hlY2tzIGZvciB0aGUgYWJzZW5jZSBvZiB0aGlzIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgRklMVEVSIE5PVCBFWElTVFMge1xuJHtzdGF0ZW1lbnR9XG4ke3Byb3BUeXBlQW5ub3RhdGlvbn1cbiR7cHJvcFZhbHVlQW5ub3RhdGlvbn1cbn1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHN0YXRlbWVudCBzaG91bGQgYmUgcmV0dXJuZWQgcmV0dXJuZWQgaW4gcmVzdWx0cyAoQm9vbGVhbiBmbGFnIGZyb20gY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgXG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxuYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBmaWx0ZXIgaWYgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjogc3RyaW5nID0gJyc7XG4gICAgICAgICAgICAgICAgLy8gb25seSBjcmVhdGUgYSBGSUxURVIgaWYgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgbm90IEVYSVNUUyBhbmQgaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSAhPT0gJ0V4aXN0cycpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0xpa2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgcmVnZXggZnVuY3Rpb24gZm9yIExJS0VcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgcmVnZXgoJHtwcm9wVmFsdWV9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSwgXCJpXCIpYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgY29udGFpbnMgZnVuY3Rpb24gZm9yIE1BVENIXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSIDwke0tub3JhQ29uc3RhbnRzLm1hdGNoRnVuY3Rpb259Pigke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBgRklMVEVSKCR7cHJvcFZhbHVlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IudHlwZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgdmFsdWUgaXMgYSBzb3J0IGNyaXRlcmlvblxuICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC5pc1NvcnRDcml0ZXJpb24pIG9yZGVyQnlDcml0ZXJpYS5wdXNoKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7c3RhdGVtZW50fVxuJHtmaWx0ZXJ9XG5gO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3JkZXJCeVN0YXRlbWVudCA9ICcnO1xuXG4gICAgICAgIGlmIChvcmRlckJ5Q3JpdGVyaWEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3JkZXJCeVN0YXRlbWVudCA9IGBcbk9SREVSIEJZICR7b3JkZXJCeUNyaXRlcmlhLmpvaW4oJyAnKX1cbmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0ZW1wbGF0ZSBvZiB0aGUgS25hclFMIHF1ZXJ5IHdpdGggZHluYW1pYyBjb21wb25lbnRzXG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2hUZW1wbGF0ZSA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cbkNPTlNUUlVDVCB7XG5cbj9tYWluUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuJHtyZXR1cm5TdGF0ZW1lbnRzLmpvaW4oJ1xcbicpfVxuXG59IFdIRVJFIHtcblxuP21haW5SZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4ke21haW5SZXNvdXJjZUNsYXNzfVxuXG4ke3Byb3BzLmpvaW4oJycpfVxuXG59XG4ke29yZGVyQnlTdGF0ZW1lbnR9YDtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBLbmFyUUwgcXVlcnlcbiAgICAgICAgY29uc3Qgb2Zmc2V0VGVtcGxhdGUgPSBgXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRoZSBzYW1lIEtuYXJRTCBxdWVyeSB3aXRoIHRoZSBnaXZlbiBvZmZzZXRcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnlXaXRoQ3VzdG9tT2Zmc2V0ID0gKGxvY2FsT2Zmc2V0OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Q3VzdG9tVGVtcGxhdGUgPSBgXG5PRkZTRVQgJHtsb2NhbE9mZnNldH1cbmA7XG5cbiAgICAgICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRDdXN0b21UZW1wbGF0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgZnVuY3Rpb24gc28gYW5vdGhlciBLbmFyUUwgcXVlcnkgY2FuIGJlIGNyZWF0ZWQgd2l0aCBhbiBpbmNyZWFzZWQgb2Zmc2V0XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmNoYW5nZVNlYXJjaFBhcmFtc01zZyhuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnlXaXRoQ3VzdG9tT2Zmc2V0KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhrbmFycWxUZW1wbGF0ZSArIG9mZnNldFRlbXBsYXRlKTtcblxuICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG5cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnLCBSZGZEYXRhT2JqZWN0LCBSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdG9yZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykgeyB9XG5cbiAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBjb250ZW50IG9mIHRoZSB0cmlwbGVzdG9yZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZGZEYXRhT2JqZWN0c1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8c3RyaW5nPlxuICAgICAqL1xuICByZXNldFRyaXBsZXN0b3JlQ29udGVudChyZGZEYXRhT2JqZWN0czogUmRmRGF0YU9iamVjdFtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXNldFRyaXBsZXN0b3JlQ29udGVudFJlc3BvbnNlPih0aGlzLmNvbmZpZy5hcGkgKyAnL2FkbWluL3N0b3JlL1Jlc2V0VHJpcGxlc3RvcmVDb250ZW50JywgcmRmRGF0YU9iamVjdHMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6IFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gQ2xpZW50LXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0b3JlU2VydmljZSAtIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50IC0gU2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICApKTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJhc2ljT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgLyoqXG4gICAgICogcmV0dXJucyBvdXIgbGlzdCBvZiBhIGJhc2ljIG9udG9sb2d5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAvLyBnZXRCYXNpY09udG9sb2d5KCk6IE9ic2VydmFibGU8YW55PiB7XG4gIC8vICAgICBsZXQgdXJsID0gZW52aXJvbm1lbnQudXJsO1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nLCB7d2l0aENyZWRlbnRpYWxzOiBmYWxzZX0pO1xuICAvLyB9XG4gIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcHA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCh1cmwgKyAnL2RhdGEvYmFzZS1kYXRhL2Jhc2ljLW9udG9sb2d5Lmpzb24nKTtcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VUeXBlc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiBHZXQgYWxsIHJlc291cmNlIHR5cGVzIGRlZmluZWQgYnkgdGhlIHZvY2FidWxhcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIFZvY2FidWxhcnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAgICovXG4gIGdldFJlc291cmNlVHlwZXNCeVZvYyhpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXM/dm9jYWJ1bGFyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNwZWNpZmljIHJlc291cmNlIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgcmVzb3VyY2UgdHlwZSBpcmlcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAqL1xuICBnZXRSZXNvdXJjZVR5cGUoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92MS9yZXNvdXJjZXR5cGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuXG4gIC8vIHB1dFJlc291cmNlVHlwZShpcmkpXG5cbn1cbiIsIi8qKlxuICogbWFpbiBhcGkgc2VydmljZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIGFkbWluIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL2FkbWluL2dyb3Vwcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGlzdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3Byb2plY3RzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi91c2Vycy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vbGFuZ3VhZ2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3N0YXR1cy1tc2cuc2VydmljZSc7XG5cbi8qKlxuICogc3BlY2lmaWMgc2VydmljZXMgZm9yIGtub3JhIHYyIGFwaVxuICovXG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2Uuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3NlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvY29udmVydC1qc29ubGQnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9pbmNvbWluZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvZ3Jhdi1zZWFyY2guc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL3N0b3JlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZSc7XG4iLCJpbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEgfSBmcm9tICcuL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsIFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIGNvbXBhcmlzb24gb3BlcmF0b3IuXG4gKiBUaGlzIGludGVyZmFjZSBpcyBpbXBsZW1lbnRlZCBmb3IgdGhlIHN1cHBvcnRlZCBjb21wYXJpc29uIG9wZXJhdG9ycy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgLy8gdHlwZSBvZiBjb21wYXJpc29uIG9wZXJhdG9yXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLy8gdGhlIGxhYmVsIG9mIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIHRvIGJlIHByZXNlbnRlZCB0byB0aGUgdXNlci5cbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLy8gcmV0dXJucyB0aGUgY2xhc3MgbmFtZSB3aGVuIGNhbGxlZCBvbiBhbiBpbnN0YW5jZVxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTm90RXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5Ob3RFcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTm90RXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbkVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xlc3NUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEV4aXN0cyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXhpc3RzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0V4aXN0cyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlrZSBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGlrZSc7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNYXRjaCBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdNYXRjaCc7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgYSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCBhIHZhbHVlIGxpdGVyYWwgb3IgYW4gSVJJLlxuICogSW4gY2FzZSB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyAnRXhpc3RzJywgbm8gdmFsdWUgaXMgZ2l2ZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBjb21wYXJpc29uT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvciwgcmVhZG9ubHkgdmFsdWU/OiBWYWx1ZSkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgdmFsdWU6IGFuIElSSSBvciBhIGxpdGVyYWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHZhbHVlIGludG8gYSBTUEFSUUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZztcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSdzIHZhbHVlIGFzIGEgbGl0ZXJhbCB3aXRoIHRoZSBpbmRpY2F0aW9uIG9mIGl0cyB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgVmFsdWVMaXRlcmFsIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtWYWx1ZUxpdGVyYWxdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIHRoZSBsaXRlcmFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgdmFsdWUgKG1ha2luZyB1c2Ugb2YgeHNkKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmcpIHtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0eXBlIGFubm90YXRlZCB2YWx1ZSBsaXRlcmFsIHRvIGJlIHVzZWQgaW4gYSBTUEFSUUwgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IGxpdGVyYWxUeXBlOiBzdHJpbmc7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYSBLbm9yYSBzY2hlbWEgY29udmVyc2lvbiBpcyBuZWNlc3NhcnksIGUuZy4sIGtub3JhLWFwaTpkYXRlVmFsdWUgKGNvbXBsZXgpIHRvIGtub3JhLWFwaTpkYXRlIChzaW1wbGUpLlxuICAgICAgICAvLyB4c2QgdHlwZXMgd2lsbCByZW1haW4gdW5jaGFuZ2VkXG4gICAgICAgIGlmIChzY2hlbWEgPT09IEtub3JhU2NoZW1hLnNpbXBsZSAmJiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIHNpbXBsZSBzY2hlbWFcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkbyBub3QgY29udmVydFxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYFwiJHt0aGlzLnZhbHVlfVwiXl48JHtsaXRlcmFsVHlwZX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIElSSS5cbiAqL1xuZXhwb3J0IGNsYXNzIElSSSBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYW4gW0lSSV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIHRoZSBJUkkgb2YgYSByZXNvdXJjZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpcmk6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIElSSS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBpbnN0YW5jZSBJcmkgYW5kIGRvZXMgbm90IGhhdmUgdG8gYmUgY29udmVydGVkLlxuICAgICAgICByZXR1cm4gYDwke3RoaXMuaXJpfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSB0aGF0IHJlcHJlc2VudHMgYSB2YWx1ZS5cbiAqIFRoaXMgaW50ZXJmYWNlIGhhcyB0byBiZSBpbXBsZW1lbnRlZCBmb3IgYWxsIHZhbHVlIHR5cGVzICh2YWx1ZSBjb21wb25lbnQgY2xhc3NlcykuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZX0uXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogVmFsdWU7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHksIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciwgYW5kIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlXaXRoVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtQcm9wZXJ0eVdpdGhWYWx1ZV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eSB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWV9IHZhbHVlTGl0ZXJhbCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpc1NvcnRDcml0ZXJpb24gaW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBpcyB1c2VkIGFzIGEgc29ydCBjcml0ZXJpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBQcm9wZXJ0eSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWVMaXRlcmFsOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICAgICAgcmVhZG9ubHkgaXNTb3J0Q3JpdGVyaW9uOiBCb29sZWFuKSB7XG4gICAgfVxuXG59XG5cbi8qKlxuICogYSBsaXN0LCB3aGljaCBpcyB1c2VkIGluIHRoZSBtYXQtYXV0b2NvbXBsZXRlIGZvcm0gZmllbGRcbiAqIGNvbnRhaW5zIG9iamVjdHMgd2l0aCBpZCBhbmQgbmFtZS4gdGhlIGlkIGlzIHVzdWFsIHRoZSBpcmlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRvY29tcGxldGVJdGVtIHtcbiAgICBpcmk6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucy8nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtLdWlDb3JlQ29uZmlnIGFzIMOJwrVhfSBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMnO1xuZXhwb3J0IHtQcm9wZXJ0eSBhcyDDicK1Yn0gZnJvbSAnLi9saWIvc2VydmljZXMnOyJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZGVjb3JhdGUiLCJKc29uUHJvcGVydHkiLCJKc29uT2JqZWN0IiwiSnNvbkNvbnZlcnQiLCJPcGVyYXRpb25Nb2RlIiwiVmFsdWVDaGVja2luZ01vZGUiLCJLbm9yYVNjaGVtYSIsIlByZWNpc2lvbiIsInRzbGliXzEuX19leHRlbmRzIiwidHNsaWJfMS5fX3ZhbHVlcyIsIm1hcCIsImNhdGNoRXJyb3IiLCJmcm9tIiwidGhyb3dFcnJvciIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiSW5qZWN0IiwiT2JzZXJ2YWJsZSIsImpzb25sZCIsIkNhcmRpbmFsaXR5T2NjdXJyZW5jZSIsIm1lcmdlTWFwIiwib2YiLCJmb3JrSm9pbiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSIsIlN1YmplY3QiLCJDb252ZXJ0SlNPTkxEIiwiSHR0cFBhcmFtcyIsIkJlaGF2aW9yU3ViamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJ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