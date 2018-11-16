import { ReadPropertyItem } from '../../../';
import { RegionGeometry } from './region-geometry';
/**
 * Represents a geometry value object.
 */
export declare class ReadGeomValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly geometryString: string;
    constructor(id: string, propIri: string, geometryString: string);
    readonly geometry: RegionGeometry;
    readonly type: string;
    getContent(): string;
    getClassName(): string;
}
