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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1qc29ubGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9jb252ZXJ0LWpzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixhQUFhLEVBR2IsWUFBWSxFQUNaLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLFlBQVksRUFFWixLQUFLLEVBQ1IsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qjs7O0dBR0c7QUFDSCxNQUFNLEtBQVEsYUFBYSxDQThnQjFCO0FBOWdCRCxXQUFjLGFBQWE7SUFFdkI7Ozs7Ozs7O09BUUc7SUFDSCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsUUFBUTtRQUM5QixPQUFPLFFBQVEsS0FBSyxLQUFLO2VBQ2xCLFFBQVEsS0FBSyxPQUFPO2VBQ3BCLFFBQVEsS0FBSyxjQUFjLENBQUMsU0FBUztlQUNyQyxRQUFRLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtlQUM3QyxRQUFRLEtBQUssY0FBYyxDQUFDLGNBQWM7ZUFDMUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxZQUFZO2VBQ3hDLFFBQVEsS0FBSyxjQUFjLENBQUMsb0JBQW9CO2VBQ2hELFFBQVEsS0FBSyxjQUFjLENBQUMsY0FBYztlQUMxQyxRQUFRLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUM5QyxDQUFDLENBQUM7SUFHRjs7Ozs7O09BTUc7SUFDSCwrQkFBK0IsY0FBc0I7UUFFakQsSUFBTSxVQUFVLEdBQW1CLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTNFLE9BQU8s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RywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFFM0UsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFFckU7Ozs7Ozs7OztTQUVKO2FBQU07WUFDSCxvQkFBb0I7WUFFcEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbkQsT0FBTyxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxlQUFlLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRXZELHdDQUF3QztnQkFDeEMsSUFBTSx1QkFBdUIsR0FBRywwQkFBMEIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUVwRixlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQ3JFO1NBQ0o7UUFFRCx3QkFBd0I7UUFDeEIsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELENBQUM7SUF0Q2UsMENBQTRCLCtCQXNDM0MsQ0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNILGdDQUF1QyxnQkFBd0I7UUFDM0QsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUZlLG9DQUFzQix5QkFFckMsQ0FBQTtBQUNMLENBQUMsRUE5Z0JhLGFBQWEsS0FBYixhQUFhLFFBOGdCMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvdW50UXVlcnlSZXN1bHQsXG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBib29sZWFuIC0gaW5kaWNhdGluZyBpZiB0aGUgbmFtZSByZWZlcnMgdG8gYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBjb25zdCBnZXRQcm9wZXJ0eU5hbWVzID0gKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9wTmFtZSAhPT0gJ0BpZCdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSAnQHR5cGUnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1Byb2plY3RcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvVXNlclxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmNyZWF0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmxhc3RNb2RpZmljYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuaGFzUGVybWlzc2lvbnNcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5BcmtVcmw7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFJlc291cmNlXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIGEgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZSB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2UoXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQGlkJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFsnQHR5cGUnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBbXSwgLy8gdG8gYmUgdXBkYXRlZCBvbmNlIGFub3RoZXIgcmVxdWVzdCBoYXMgYmVlbiBtYWRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIGZyb20gSlNPTi1MRCxcbiAgICAgKiB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGUuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcFZhbHVlIHRoZSB2YWx1ZSBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BJcmkgdGhlIElyaSBvZiB0aGUgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtSZWFkTGlua1ZhbHVlW119IHN0YW5kb2ZmTGlua1ZhbHVlcyBzdGFuZG9mZkxpbmtWYWx1ZXMgb2YgdGhlIHJlc291cmNlLiBUZXh0IHZhbHVlcyBtYXkgY29udGFpbiBsaW5rcyB0byBvdGhlciByZXNvdXJjZXMuXG4gICAgICogQHJldHVybnMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBvciBgdW5kZWZpbmVkYCBpbiBjYXNlIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkIGNvcnJlY3RseS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgcHJvcFZhbHVlOiBPYmplY3QsIHByb3BJcmk6IHN0cmluZywgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10pOiBSZWFkUHJvcGVydHlJdGVtIHwgdW5kZWZpbmVkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuXG4gICAgICAgIGxldCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZVxuICAgICAgICBzd2l0Y2ggKHByb3BWYWx1ZVsnQHR5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gYSB0ZXh0IHZhbHVlIG1pZ2h0IGJlIGdpdmVuIGFzIHBsYWluIHN0cmluZywgaHRtbCBvciB4bWwuXG4gICAgICAgICAgICAgICAgbGV0IHRleHRWYWx1ZTogUmVhZFByb3BlcnR5SXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzU3RyaW5nKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3RhbmRvZmYgbGlua3MgYW5kIGluY2x1ZGUgcmVmZXJyZWQgcmVzb3VyY2VzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCBhIHN0YW5kb2ZmIGxpbmssIGZ1cnRoZXIgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlIGNhbiBiZSBzaG93blxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGluayBvZiBzdGFuZG9mZkxpbmtWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzOiBSZWFkUmVzb3VyY2UgPSBzdGFuZG9mZkxpbmsucmVmZXJyZWRSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VzW3JlZmVycmVkUmVzLmlkXSA9IHJlZmVycmVkUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc0h0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNIdG1sXSwgcmVmZXJyZWRSZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdICE9PSB1bmRlZmluZWQgJiYgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNYbWwoXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlQXNYbWxdLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhwZWN0ZWQgdGV4dCB2YWx1ZSBtZW1iZXJzIG5vdCBkZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBJbnZhbGlkIHRleHQgdmFsdWU6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU6XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gbmV3IFJlYWREYXRlVmFsdWUocHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0NhbGVuZGFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0WWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZE1vbnRoXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0RGF5XSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZERheV0pO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkYXRlVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlua1ZhbHVlOlxuXG4gICAgICAgICAgICAgICAgbGV0IGxpbmtWYWx1ZTogUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSByZWZlcnJlZCByZXNvdXJjZSBpcyBnaXZlbiBhcyBhbiBvYmplY3Qgb3IganVzdCBhcyBhbiBJUklcbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXQgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZS5pZCwgcmVmZXJyZWRSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldElyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2UgY29udGFpbnMgdGhlIG9iamVjdFxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZS5pZCwgaW5jb21pbmdSZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZUlyaSBjb250YWlucyB0aGUgcmVzb3VyY2UncyBJcmlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlSXJpID0gcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV1bJ0BpZCddO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2VJcmkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlua1ZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50VmFsdWUgPSBuZXcgUmVhZEludGVnZXJWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZWdlclZhbHVlQXNJbnRlZ2VyXSk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIGEgZGVjaW1hbCB2YWx1ZSBpcyByZXByZXNlbnRlZCBhcyBhIHN0cmluZyBpbiBvcmRlciB0byBwcmVzZXJ2ZSBpdHMgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjVmFsOiBudW1iZXIgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWxdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsVmFsdWUgPSBuZXcgUmVhZERlY2ltYWxWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBkZWNWYWwpO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGVjaW1hbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlID0gbmV3IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gc3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0RmlsZVZhbHVlID0gbmV3IFJlYWRUZXh0RmlsZVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlSGFzRmlsZW5hbWVdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHRleHRGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZENvbG9yVmFsdWU6IFJlYWRDb2xvclZhbHVlID0gbmV3IFJlYWRDb2xvclZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuY29sb3JWYWx1ZUFzQ29sb3JdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZENvbG9yVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkR2VvbVZhbHVlOiBSZWFkR2VvbVZhbHVlID0gbmV3IFJlYWRHZW9tVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5nZW9tZXRyeVZhbHVlQXNHZW9tZXRyeV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkR2VvbVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmlWYWx1ZTogUmVhZFVyaVZhbHVlID0gbmV3IFJlYWRVcmlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnVyaVZhbHVlQXNVcmldWydAdmFsdWUnXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHVyaVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbFZhbHVlOiBSZWFkQm9vbGVhblZhbHVlID0gbmV3IFJlYWRCb29sZWFuVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5ib29sZWFuVmFsdWVBc0Jvb2xlYW5dXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gYm9vbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50ZWQgYXMgc3RyaW5ncyB0byBwcmVzZXJ2ZSBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRTdGFydCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNTdGFydF1bJ0B2YWx1ZSddKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRFbmQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzRW5kXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWxWYWx1ZTogUmVhZEludGVydmFsVmFsdWUgPSBuZXcgUmVhZEludGVydmFsVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIGludFN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBpbnRFbmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBpbnRlcnZhbFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFZhbHVlOiBSZWFkTGlzdFZhbHVlID0gbmV3IFJlYWRMaXN0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlXVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saXN0VmFsdWVBc0xpc3ROb2RlTGFiZWxdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gbGlzdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdW5zdXBwb3J0ZWQgdmFsdWUgdHlwZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB2YWx1ZSB0eXBlIG5vdCBpbXBsZW1lbnRlZCB5ZXQ6ICcgKyBwcm9wVmFsdWVbJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlU3BlY2lmaWNQcm9wO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBbW1JlYWRQcm9wZXJ0aWVzXV0gZnJvbSBKU09OLUxELlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMuXG4gICAgICogQHJldHVybnMgUmVhZFByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RSZWFkUHJvcGVydGllcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFByb3BlcnRpZXMge1xuXG4gICAgICAgIC8vIEpTT04tTEQgcmVwcmVzZW50aW5nIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIC8vIHRleHQgdmFsdWVzIG1heSBjb250YWluIHN0YW5kb2ZmIGxpbmtzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRDogT2JqZWN0ID0gcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZV07XG5cbiAgICAgICAgLy8gdG8gYmUgcG9wdWxhdGVkIHdpdGggc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzOiBSZWFkTGlua1ZhbHVlW10gPSBbXTtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RhbmRvZmYgbGluayB2YWx1ZSBKU09OLUxEIG9iamVjdCB0byBhIFJlYWRMaW5rVmFsdWVcbiAgICAgICAgLy8gaW4gb3JkZXIgcG9wdWxhdGUgdGhlIGNvbGxlY3Rpb24gd2l0aCBhbGwgdGhlIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rSlNPTkxEIG9mIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsOiBSZWFkTGlua1ZhbHVlID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YW5kb2ZmVmFsID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXMucHVzaChzdGFuZG9mZlZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZXM6IEFycmF5PFJlYWRQcm9wZXJ0eUl0ZW0+ID0gW107XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiB2YWx1ZXMgb3IganVzdCBvbmUgdmFsdWUgaXMgZ2l2ZW5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiB2YWx1ZXNcblxuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHByb3BlcnR5IG5hbWUsIGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBpcyBnaXZlbiwgaXRlcmF0ZSBvdmVyIGl0XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wVmFsdWUgb2YgcmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChwcm9wVmFsdWUsIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW0gPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0sIHByb3BOYW1lLCBzdGFuZG9mZkxpbmtWYWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNwZWNpZmljUHJvcCAhPT0gdW5kZWZpbmVkKSBwcm9wVmFsdWVzLnB1c2godmFsdWVTcGVjaWZpY1Byb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHRvIHRoZSBwcm9wZXJ0aWVzIG9iamVjdFxuICAgICAgICAgICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wVmFsdWVzO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhbiBBUEkgcmVzcG9uc2UgaW4gSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMgaW50byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0uXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSByZXNvdXJjZSBvciBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgLSBzZXF1ZW5jZSBvZiByZWFkIHJlc291cmNlc1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiA9IFtdO1xuICAgICAgICBsZXQgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcjtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG4gICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IHJlc291cmNlc0dyYXBoLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGFuc3dlciwgbm8gcmVzb3VyY2VzIGdpdmVuXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSAxO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2U6IFJlYWRSZXNvdXJjZSA9IGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHJlc291cmNlIHRvIHRoZSByZXNvdXJjZXMgYXJyYXlcbiAgICAgICAgICAgICAgICByZXNvdXJjZXMucHVzaChyZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZShyZXNvdXJjZXMsIG51bWJlck9mUmVzb3VyY2VzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3RzIGFsbCB0aGUgdHlwZXMgKGNsYXNzZXMpIG9mIHJlZmVycmVkIHJlc291cmNlcyBmcm9tIGEgZ2l2ZW4gcmVzb3VyY2UgKGZyb20gaXRzIGxpbmtpbmcgcHJvcGVydGllcykuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgSlNPTi1MRCBkZXNjcmliaW5nIG9uZSByZXNvdXJjZS5cbiAgICAgKiBAcmV0dXJuIHN0cmluZ1tdIC0gYW4gQXJyYXkgb2YgcmVzb3VyY2UgY2xhc3MgSXJpcyAoaW5jbHVkaW5nIGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICAvLyBzZXZlcmFsIHZhbHVlcyBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcF0pKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlZmVycmVkUmVzIG9mIHJlc291cmNlSlNPTkxEW3Byb3BdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc1snQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cmNlIHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByZXNvdXJjZSB0eXBlcyAoY2xhc3NlcykgZnJvbSBhIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gdGhlIHJlc291cmNlIGNsYXNzIElyaXMgKHdpdGhvdXQgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcbiAgICAgICAgbGV0IHJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNsYXNzIG9mIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzZXMuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBKU09OLUxEIHJlc3BvbnNlIHRvIGEgY291bnQgcXVlcnkgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb3VudFF1ZXJ5SlNPTkxEXG4gICAgICogQHJldHVybnMge0NvdW50UXVlcnlSZXN1bHR9XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvdW50UXVlcnlSZXN1bHQoY291bnRRdWVyeUpTT05MRDogb2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEW0tub3JhQ29uc3RhbnRzLnNjaGVtYU51bWJlck9mSXRlbXNdKTtcbiAgICB9XG59XG4iXX0=