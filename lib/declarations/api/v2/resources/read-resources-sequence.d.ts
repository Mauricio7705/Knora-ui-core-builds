import { ReadResource } from './read-resource';
/**
 * Represents a sequence of resources.
 */
export declare class ReadResourcesSequence {
    readonly resources: Array<ReadResource>;
    readonly numberOfResources: number;
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources: Array<ReadResource>, numberOfResources: number);
}
