import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class IncomingService extends SearchService {
    /**
    * Returns all incoming regions for a particular resource.
    *
    * @param {string} resourceIRI the Iri of the resource whose Incoming regions should be returned.
    * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
    * @returns Observable of any
    */
    getIncomingRegions(resourceIRI, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?region knora-api:isMainResource true .

?region knora-api:hasGeometry ?geom .

?region knora-api:hasComment ?comment .

?region knora-api:hasColor ?color .
} WHERE {
?region a knora-api:Region .
?region a knora-api:Resource .

?region knora-api:isRegionOf <${resourceIRI}> .
knora-api:isRegionOf knora-api:objectType knora-api:Resource .

<${resourceIRI}> a knora-api:Resource .

?region knora-api:hasGeometry ?geom .
knora-api:hasGeometry knora-api:objectType knora-api:Geom .

?geom a knora-api:Geom .

?region knora-api:hasComment ?comment .
knora-api:hasComment knora-api:objectType xsd:string .

?comment a xsd:string .

?region knora-api:hasColor ?color .
knora-api:hasColor knora-api:objectType knora-api:Color .

?color a knora-api:Color .
} OFFSET ${offset}
`;
        // console.log('sparqlQueryStr ', sparqlQueryStr);
        return this.doExtendedSearch(sparqlQueryStr);
    }
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param {string} resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns Observable of any
     */
    getStillImageRepresentationsForCompoundResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?page knora-api:isMainResource true .

?page knora-api:seqnum ?seqnum .

?page knora-api:hasStillImageFile ?file .
} WHERE {

?page a knora-api:StillImageRepresentation .
?page a knora-api:Resource .

?page knora-api:isPartOf <${resourceIri}> .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

<${resourceIri}> a knora-api:Resource .

?page knora-api:seqnum ?seqnum .
knora-api:seqnum knora-api:objectType xsd:integer .

?seqnum a xsd:integer .

?page knora-api:hasStillImageFile ?file .
knora-api:hasStillImageFile knora-api:objectType knora-api:File .

?file a knora-api:File .

} ORDER BY ?seqnum
OFFSET ${offset}
`;
        return this.doExtendedSearch(sparqlQueryStr);
    }
    /**
     *
     * Returns all incoming links for the given resource Iri
     * but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns Observable of any
     */
    getIncomingLinksForResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?incomingRes knora-api:isMainResource true .

?incomingRes ?incomingProp <${resourceIri}> .

} WHERE {

?incomingRes a knora-api:Resource .

?incomingRes ?incomingProp <${resourceIri}> .

<${resourceIri}> a knora-api:Resource .

?incomingProp knora-api:objectType knora-api:Resource .

knora-api:isRegionOf knora-api:objectType knora-api:Resource .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isRegionOf <${resourceIri}> .
}

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isPartOf <${resourceIri}> .
}

} OFFSET ${offset}
`;
        return this.doExtendedSearch(sparqlQueryStr);
    }
}
IncomingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] },
];
IncomingService.ngInjectableDef = i0.defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: IncomingService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jb21pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2luY29taW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQUtqRCxNQUFNLHNCQUF1QixTQUFRLGFBQWE7SUFFOUM7Ozs7OztNQU1FO0lBQ0Ysa0JBQWtCLENBQUMsV0FBbUIsRUFBRSxNQUFjO1FBQ2xELE1BQU0sY0FBYyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Z0NBZUMsV0FBVzs7O0dBR3hDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkgsTUFBTTtDQUNoQixDQUFDO1FBQ00sa0RBQWtEO1FBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCwrQ0FBK0MsQ0FBQyxXQUFtQixFQUFFLE1BQWM7UUFDL0UsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7OzRCQWNILFdBQVc7OztHQUdwQyxXQUFXOzs7Ozs7Ozs7Ozs7O1NBYUwsTUFBTTtDQUNkLENBQUM7UUFFTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFHRDs7Ozs7Ozs7T0FRRztJQUNILDJCQUEyQixDQUFDLFdBQW1CLEVBQUUsTUFBYztRQUMzRCxNQUFNLGNBQWMsR0FBRzs7Ozs7OzhCQU1ELFdBQVc7Ozs7Ozs4QkFNWCxXQUFXOztHQUV0QyxXQUFXOzs7Ozs7Ozt1Q0FReUIsV0FBVzs7OztxQ0FJYixXQUFXOzs7V0FHckMsTUFBTTtDQUNoQixDQUFDO1FBRU0sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUEvSUosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbmNvbWluZ1NlcnZpY2UgZXh0ZW5kcyBTZWFyY2hTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgcmVnaW9ucyBmb3IgYSBwYXJ0aWN1bGFyIHJlc291cmNlLlxuICAgICpcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlSSSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBJbmNvbWluZyByZWdpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICovXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKHJlc291cmNlSVJJOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cmVnaW9uIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbn0gV0hFUkUge1xuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZWdpb24gLlxuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJUkl9PiAuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlSSX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxua25vcmEtYXBpOmhhc0dlb21ldHJ5IGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpHZW9tIC5cblxuP2dlb20gYSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxua25vcmEtYXBpOmhhc0NvbW1lbnQga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOnN0cmluZyAuXG5cbj9jb21tZW50IGEgeHNkOnN0cmluZyAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG5rbm9yYS1hcGk6aGFzQ29sb3Iga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkNvbG9yIC5cblxuP2NvbG9yIGEga25vcmEtYXBpOkNvbG9yIC5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NwYXJxbFF1ZXJ5U3RyICcsIHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSwgaWYgYW55LlxuICAgICAqIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgbGluayB0byB0aGUgZ2l2ZW4gcmVzb3VyY2UgdmlhIGtub3JhLWJhc2U6aXNQYXJ0T2YuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVzb3VyY2Ugd2hvc2UgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGdldFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNGb3JDb21wb3VuZFJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cGFnZSBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG59IFdIRVJFIHtcblxuP3BhZ2UgYSBrbm9yYS1hcGk6U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIC5cbj9wYWdlIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSXJpfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxua25vcmEtYXBpOnNlcW51bSBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6aW50ZWdlciAuXG5cbj9zZXFudW0gYSB4c2Q6aW50ZWdlciAuXG5cbj9wYWdlIGtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSA/ZmlsZSAuXG5rbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkZpbGUgLlxuXG4/ZmlsZSBhIGtub3JhLWFwaTpGaWxlIC5cblxufSBPUkRFUiBCWSA/c2VxbnVtXG5PRkZTRVQgJHtvZmZzZXR9XG5gO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRvRXh0ZW5kZWRTZWFyY2goc3BhcnFsUXVlcnlTdHIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgYWxsIGluY29taW5nIGxpbmtzIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgSXJpXG4gICAgICogYnV0IGluY29taW5nIHJlZ2lvbnMgYW5kIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBpbmNvbWluZyBsaW5rcyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaChzcGFycWxRdWVyeVN0cik7XG4gICAgfVxuXG59XG4iXX0=