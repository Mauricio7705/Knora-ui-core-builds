import { OntologyInformation } from '../../../../services/v2/ontology-cache.service';
/**
 * Represents a sequence of resources.
 */
export class ReadResourcesSequence {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `ReadResource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVyRjs7R0FFRztBQUNILE1BQU07SUFPRjs7OztPQUlHO0lBQ0gsWUFBNEIsU0FBOEIsRUFBa0IsaUJBQXlCO1FBQXpFLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQWtCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQVZyRzs7V0FFRztRQUNhLHdCQUFtQixHQUF3QixJQUFJLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFRL0YsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi9yZWFkLXJlc291cmNlJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBlbnRpdGllcyB1c2VkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uIG9mIGBSZWFkUmVzb3VyY2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBvbnRvbG9neUluZm9ybWF0aW9uOiBPbnRvbG9neUluZm9ybWF0aW9uID0gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oe30sIHt9LCB7fSk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gcmVzb3VyY2VzIGdpdmVuIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZXNvdXJjZXMgbnVtYmVyIG9mIGdpdmVuIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+LCBwdWJsaWMgcmVhZG9ubHkgbnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikge1xuICAgIH1cblxufVxuIl19