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
    const getPropertyNames = (propName) => {
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
     * @param {Object} propValue the value serialized as JSON-LD.
     * @param {string} propIri the Iri of the property.
     * @param {ReadLinkValue[]} standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
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
     * @param {object} resourceJSONLD an object describing the resource and its properties.
     * @returns ReadProperties
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
     * @param {object} resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns ReadResourcesSequence - sequence of read resources
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
     * @param {object} resourceJSONLD JSON-LD describing one resource.
     * @return string[] - an Array of resource class Iris (including duplicates).
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
     * @returns string[] - the resource class Iris (without duplicates).
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1qc29ubGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9jb252ZXJ0LWpzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGFBQWEsRUFHYixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsWUFBWSxFQUVaLEtBQUssRUFDUixNQUFNLG9CQUFvQixDQUFDO0FBRTVCOzs7R0FHRztBQUNILE1BQU0sS0FBUSxhQUFhLENBOGdCMUI7QUE5Z0JELFdBQWMsYUFBYTtJQUV2Qjs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNsQyxPQUFPLFFBQVEsS0FBSyxLQUFLO2VBQ2xCLFFBQVEsS0FBSyxPQUFPO2VBQ3BCLFFBQVEsS0FBSyxjQUFjLENBQUMsU0FBUztlQUNyQyxRQUFRLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtlQUM3QyxRQUFRLEtBQUssY0FBYyxDQUFDLGNBQWM7ZUFDMUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxZQUFZO2VBQ3hDLFFBQVEsS0FBSyxjQUFjLENBQUMsb0JBQW9CO2VBQ2hELFFBQVEsS0FBSyxjQUFjLENBQUMsY0FBYztlQUMxQyxRQUFRLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUM5QyxDQUFDLENBQUM7SUFHRjs7Ozs7O09BTUc7SUFDSCwrQkFBK0IsY0FBc0I7UUFFakQsTUFBTSxVQUFVLEdBQW1CLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FB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QUFDLENBQUM7YUFDckU7U0FDSjtRQUVELHdCQUF3QjtRQUN4QixPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFN0QsQ0FBQztJQXRDZSwwQ0FBNEIsK0JBc0MzQyxDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZ0NBQXVDLGdCQUF3QjtRQUMzRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRmUsb0NBQXNCLHlCQUVyQyxDQUFBO0FBQ0wsQ0FBQyxFQTlnQmEsYUFBYSxLQUFiLGFBQWEsUUE4Z0IxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ291bnRRdWVyeVJlc3VsdCxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBSZWFkQm9vbGVhblZhbHVlLFxuICAgIFJlYWRDb2xvclZhbHVlLFxuICAgIFJlYWREYXRlVmFsdWUsXG4gICAgUmVhZERlY2ltYWxWYWx1ZSxcbiAgICBSZWFkR2VvbVZhbHVlLFxuICAgIFJlYWRJbnRlZ2VyVmFsdWUsXG4gICAgUmVhZEludGVydmFsVmFsdWUsXG4gICAgUmVhZExpbmtWYWx1ZSxcbiAgICBSZWFkTGlzdFZhbHVlLFxuICAgIFJlYWRQcm9wZXJ0aWVzLFxuICAgIFJlYWRQcm9wZXJ0eUl0ZW0sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dEZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dFZhbHVlQXNIdG1sLFxuICAgIFJlYWRUZXh0VmFsdWVBc1N0cmluZyxcbiAgICBSZWFkVGV4dFZhbHVlQXNYbWwsXG4gICAgUmVhZFVyaVZhbHVlLFxuICAgIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmssXG4gICAgVXRpbHNcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIGNvbnZlcnQgSlNPTi1MRCByZXByZXNlbnRpbmcgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzIHRvIGNsYXNzZXMuXG4gKiBUaGVzZSBtZXRob2RzIHdvcmtzIG9ubHkgZm9yIGluc3RhbmNlcyBvZiByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMsIG5vdCBmb3Igb250b2xvZ2llcyAoZGF0YSBtb2RlbCkuXG4gKi9cbmV4cG9ydCBtb2R1bGUgQ29udmVydEpTT05MRCB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gYSBmaWx0ZXIgdXNlZCBvbiBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lc1xuICAgICAqIHNvcnRpbmcgb3V0IGFsbCBub24gdmFsdWUgcHJvcGVydHkgbmFtZXMuXG4gICAgICpcbiAgICAgKiBHZXRzIGFsbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHJlZmVyIHRvIHZhbHVlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcE5hbWUgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gLSBpbmRpY2F0aW5nIGlmIHRoZSBuYW1lIHJlZmVycyB0byBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbnN0IGdldFByb3BlcnR5TmFtZXMgPSAocHJvcE5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BOYW1lICE9PSAnQGlkJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09ICdAdHlwZSdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvUHJvamVjdFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Vc2VyXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuY3JlYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMubGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5oYXNQZXJtaXNzaW9uc1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLkFya1VybDtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBSZWFkUHJvcGVydGllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUHJvcGVydGllcyB7XG5cbiAgICAgICAgLy8gSlNPTi1MRCByZXByZXNlbnRpbmcgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgLy8gdGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gc3RhbmRvZmYgbGlua3NcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEOiBPYmplY3QgPSByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlXTtcblxuICAgICAgICAvLyB0byBiZSBwb3B1bGF0ZWQgd2l0aCBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSA9IFtdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZWFjaCBzdGFuZG9mZiBsaW5rIHZhbHVlIEpTT04tTEQgb2JqZWN0IHRvIGEgUmVhZExpbmtWYWx1ZVxuICAgICAgICAvLyBpbiBvcmRlciBwb3B1bGF0ZSB0aGUgY29sbGVjdGlvbiB3aXRoIGFsbCB0aGUgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmtKU09OTEQgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWw6IFJlYWRMaW5rVmFsdWUgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWwgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZ2l2ZW4gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlczogQXJyYXk8UmVhZFByb3BlcnR5SXRlbT4gPSBbXTtcblxuICAgICAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHZhbHVlcyBvciBqdXN0IG9uZSB2YWx1ZSBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIHZhbHVlc1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgYW4gYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzIGlzIGdpdmVuLCBpdGVyYXRlIG92ZXIgaXRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BWYWx1ZSBvZiByZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3BWYWx1ZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFuIEFQSSByZXNwb25zZSBpbiBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcyBpbnRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHJlc291cmNlIG9yIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSAtIHNlcXVlbmNlIG9mIHJlYWQgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gc3RyaW5nW10gLSBhbiBBcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIChpbmNsdWRpbmcgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIC8vIHNldmVyYWwgdmFsdWVzIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVmZXJyZWRSZXMgb2YgcmVzb3VyY2VKU09OTERbcHJvcF0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWUgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZlcnJlZFJlc291cmNlQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc291cmNlIHR5cGVzIChjbGFzc2VzKSBmcm9tIGEgSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhIEpTT04tTEQgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeSBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50UXVlcnlKU09OTERcbiAgICAgKiBAcmV0dXJucyB7Q291bnRRdWVyeVJlc3VsdH1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEOiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTERbS25vcmFDb25zdGFudHMuc2NoZW1hTnVtYmVyT2ZJdGVtc10pO1xuICAgIH1cbn1cbiJdfQ==