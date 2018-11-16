import { Point2D } from './point-2d';
/**
 * Represents a geometry value parsed from JSON.
 */
export declare class RegionGeometry {
    status: string;
    lineColor: string;
    lineWidth: number;
    points: Point2D[];
    type: string;
    radius: Point2D;
    constructor(status: string, lineColor: string, lineWidth: number, points: Point2D[], type: string, radius?: Point2D);
}
