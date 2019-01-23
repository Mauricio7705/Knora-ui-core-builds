import * as tslib_1 from "tslib";
import { CountQueryResult, KnoraConstants, ReadBooleanValue, ReadColorValue, ReadDateValue, ReadDecimalValue, ReadGeomValue, ReadIntegerValue, ReadIntervalValue, ReadLinkValue, ReadListValue, ReadResource, ReadResourcesSequence, ReadStillImageFileValue, ReadTextFileValue, ReadTextValueAsHtml, ReadTextValueAsString, ReadTextValueAsXml, ReadUriValue, Utils } from '../../declarations';
/**
 * Contains methods to convert JSON-LD representing resources and properties to classes.
 * These methods works only for instances of resources and properties, not for ontologies (data model).
 */
export var ConvertJSONLD;
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
                        for (var standoffLinkValues_1 = tslib_1.__values(standoffLinkValues), standoffLinkValues_1_1 = standoffLinkValues_1.next(); !standoffLinkValues_1_1.done; standoffLinkValues_1_1 = standoffLinkValues_1.next()) {
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
                for (var standoffLinkValuesJSONLD_1 = tslib_1.__values(standoffLinkValuesJSONLD), standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next(); !standoffLinkValuesJSONLD_1_1.done; standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next()) {
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
            for (var propNames_1 = tslib_1.__values(propNames), propNames_1_1 = propNames_1.next(); !propNames_1_1.done; propNames_1_1 = propNames_1.next()) {
                var propName = propNames_1_1.value;
                var propValues = [];
                // either an array of values or just one value is given
                if (Array.isArray(resourceJSONLD[propName])) {
                    try {
                        // array of values
                        // for each property name, an array of property values is given, iterate over it
                        for (var _d = tslib_1.__values(resourceJSONLD[propName]), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                for (var resourcesGraph_1 = tslib_1.__values(resourcesGraph), resourcesGraph_1_1 = resourcesGraph_1.next(); !resourcesGraph_1_1.done; resourcesGraph_1_1 = resourcesGraph_1.next()) {
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
            for (var propNames_2 = tslib_1.__values(propNames), propNames_2_1 = propNames_2.next(); !propNames_2_1.done; propNames_2_1 = propNames_2.next()) {
                var prop = propNames_2_1.value;
                // several values given for this property
                if (Array.isArray(resourceJSONLD[prop])) {
                    try {
                        for (var _c = tslib_1.__values(resourceJSONLD[prop]), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                for (var resourcesGraph_2 = tslib_1.__values(resourcesGraph), resourcesGraph_2_1 = resourcesGraph_2.next(); !resourcesGraph_2_1.done; resourcesGraph_2_1 = resourcesGraph_2.next()) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1qc29ubGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9jb252ZXJ0LWpzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBR2IsWUFBWSxFQUNaLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLFlBQVksRUFFWixLQUFLLEVBQ1IsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qjs7O0dBR0c7QUFDSCxNQUFNLEtBQVEsYUFBYSxDQTZnQjFCO0FBN2dCRCxXQUFjLGFBQWE7SUFFdkI7Ozs7Ozs7O09BUUc7SUFDSCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsUUFBUTtRQUM5QixPQUFPLFFBQVEsS0FBSyxLQUFLO2VBQ2xCLFFBQVEsS0FBSyxPQUFPO2VBQ3BCLFFBQVEsS0FBSyxjQUFjLENBQUMsU0FBUztlQUNyQyxRQUFRLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtlQUM3QyxRQUFRLEtBQUssY0FBYyxDQUFDLGNBQWM7ZUFDMUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxZQUFZO2VBQ3hDLFFBQVEsS0FBSyxjQUFjLENBQUMsb0JBQW9CO2VBQ2hELFFBQVEsS0FBSyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUdGOzs7Ozs7T0FNRztJQUNILCtCQUErQixjQUFzQjtRQUVqRCxJQUFNLFVBQVUsR0FBbUIsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFM0UsT0FBTyxJQUFJLFlBQVksQ0FDbkIsY0FBYyxDQUFDLEtBQUss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QUUzRSxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUVyRTs7Ozs7Ozs7O1NBRUo7YUFBTTtZQUNILG9CQUFvQjtZQUVwQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQzthQUNiO2lCQUFNO2dCQUNILGVBQWUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsd0NBQXdDO2dCQUN4QyxJQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBRXBGLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDckU7U0FDSjtRQUVELHdCQUF3QjtRQUN4QixPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFN0QsQ0FBQztJQXRDZSwwQ0FBNEIsK0JBc0MzQyxDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZ0NBQXVDLGdCQUF3QjtRQUMzRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRmUsb0NBQXNCLHlCQUVyQyxDQUFBO0FBQ0wsQ0FBQyxFQTdnQmEsYUFBYSxLQUFiLGFBQWEsUUE2Z0IxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ291bnRRdWVyeVJlc3VsdCxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBSZWFkQm9vbGVhblZhbHVlLFxuICAgIFJlYWRDb2xvclZhbHVlLFxuICAgIFJlYWREYXRlVmFsdWUsXG4gICAgUmVhZERlY2ltYWxWYWx1ZSxcbiAgICBSZWFkR2VvbVZhbHVlLFxuICAgIFJlYWRJbnRlZ2VyVmFsdWUsXG4gICAgUmVhZEludGVydmFsVmFsdWUsXG4gICAgUmVhZExpbmtWYWx1ZSxcbiAgICBSZWFkTGlzdFZhbHVlLFxuICAgIFJlYWRQcm9wZXJ0aWVzLFxuICAgIFJlYWRQcm9wZXJ0eUl0ZW0sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dEZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dFZhbHVlQXNIdG1sLFxuICAgIFJlYWRUZXh0VmFsdWVBc1N0cmluZyxcbiAgICBSZWFkVGV4dFZhbHVlQXNYbWwsXG4gICAgUmVhZFVyaVZhbHVlLFxuICAgIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmssXG4gICAgVXRpbHNcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIGNvbnZlcnQgSlNPTi1MRCByZXByZXNlbnRpbmcgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzIHRvIGNsYXNzZXMuXG4gKiBUaGVzZSBtZXRob2RzIHdvcmtzIG9ubHkgZm9yIGluc3RhbmNlcyBvZiByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMsIG5vdCBmb3Igb250b2xvZ2llcyAoZGF0YSBtb2RlbCkuXG4gKi9cbmV4cG9ydCBtb2R1bGUgQ29udmVydEpTT05MRCB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gYSBmaWx0ZXIgdXNlZCBvbiBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lc1xuICAgICAqIHNvcnRpbmcgb3V0IGFsbCBub24gdmFsdWUgcHJvcGVydHkgbmFtZXMuXG4gICAgICpcbiAgICAgKiBHZXRzIGFsbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHJlZmVyIHRvIHZhbHVlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcE5hbWUgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gLSBpbmRpY2F0aW5nIGlmIHRoZSBuYW1lIHJlZmVycyB0byBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbnN0IGdldFByb3BlcnR5TmFtZXMgPSAocHJvcE5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BOYW1lICE9PSAnQGlkJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09ICdAdHlwZSdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvUHJvamVjdFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Vc2VyXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuY3JlYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMubGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5oYXNQZXJtaXNzaW9ucztcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBSZWFkUHJvcGVydGllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUHJvcGVydGllcyB7XG5cbiAgICAgICAgLy8gSlNPTi1MRCByZXByZXNlbnRpbmcgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgLy8gdGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gc3RhbmRvZmYgbGlua3NcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEOiBPYmplY3QgPSByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlXTtcblxuICAgICAgICAvLyB0byBiZSBwb3B1bGF0ZWQgd2l0aCBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSA9IFtdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZWFjaCBzdGFuZG9mZiBsaW5rIHZhbHVlIEpTT04tTEQgb2JqZWN0IHRvIGEgUmVhZExpbmtWYWx1ZVxuICAgICAgICAvLyBpbiBvcmRlciBwb3B1bGF0ZSB0aGUgY29sbGVjdGlvbiB3aXRoIGFsbCB0aGUgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmtKU09OTEQgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWw6IFJlYWRMaW5rVmFsdWUgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWwgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZ2l2ZW4gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlczogQXJyYXk8UmVhZFByb3BlcnR5SXRlbT4gPSBbXTtcblxuICAgICAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHZhbHVlcyBvciBqdXN0IG9uZSB2YWx1ZSBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIHZhbHVlc1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgYW4gYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzIGlzIGdpdmVuLCBpdGVyYXRlIG92ZXIgaXRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BWYWx1ZSBvZiByZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3BWYWx1ZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFuIEFQSSByZXNwb25zZSBpbiBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcyBpbnRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHJlc291cmNlIG9yIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSAtIHNlcXVlbmNlIG9mIHJlYWQgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gc3RyaW5nW10gLSBhbiBBcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIChpbmNsdWRpbmcgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIC8vIHNldmVyYWwgdmFsdWVzIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVmZXJyZWRSZXMgb2YgcmVzb3VyY2VKU09OTERbcHJvcF0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWUgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZlcnJlZFJlc291cmNlQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc291cmNlIHR5cGVzIChjbGFzc2VzKSBmcm9tIGEgSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhIEpTT04tTEQgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeSBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50UXVlcnlKU09OTERcbiAgICAgKiBAcmV0dXJucyB7Q291bnRRdWVyeVJlc3VsdH1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEOiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTERbS25vcmFDb25zdGFudHMuc2NoZW1hTnVtYmVyT2ZJdGVtc10pO1xuICAgIH1cbn1cbiJdfQ==