import * as tslib_1 from "tslib";
import { KnoraConstants } from '../../knora-constants';
import { Point2D } from './point-2d';
import { RegionGeometry } from './region-geometry';
/**
 * Represents a geometry value object.
 */
var ReadGeomValue = /** @class */ (function () {
    function ReadGeomValue(id, propIri, geometryString) {
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        var geometryJSON = JSON.parse(geometryString);
        var points = [];
        try {
            for (var _a = tslib_1.__values(geometryJSON.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                var point = _b.value;
                points.push(new Point2D(point.x, point.y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
        var e_1, _c;
    }
    ReadGeomValue.prototype.getContent = function () {
        return this.geometryString;
    };
    ReadGeomValue.prototype.getClassName = function () {
        return KnoraConstants.ReadGeomValue;
    };
    return ReadGeomValue;
}());
export { ReadGeomValue };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1nZW9tLXZhbHVlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9zdGlsbC1pbWFnZS9yZWFkLWdlb20tdmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRDs7R0FFRztBQUNIO0lBRUksdUJBQXFCLEVBQVUsRUFBVyxPQUFlLEVBQVcsY0FBc0I7UUFBckUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQTJCakYsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUF6QnJDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFaEQsSUFBTSxNQUFNLEdBQWMsRUFBRSxDQUFDOztZQUM3QixHQUFHLENBQUMsQ0FBZ0IsSUFBQSxLQUFBLGlCQUFBLFlBQVksQ0FBQyxNQUFNLENBQUEsZ0JBQUE7Z0JBQWxDLElBQU0sS0FBSyxXQUFBO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5Qzs7Ozs7Ozs7O1FBRUQsSUFBSSxNQUFNLENBQUM7UUFDWCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FDOUIsWUFBWSxDQUFDLE1BQU0sRUFDbkIsWUFBWSxDQUFDLFNBQVMsRUFDdEIsWUFBWSxDQUFDLFNBQVMsRUFDdEIsTUFBTSxFQUNOLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLE1BQU0sQ0FDVCxDQUFDOztJQUVOLENBQUM7SUFNRCxrQ0FBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtLbm9yYUNvbnN0YW50c30gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSAnLi9wb2ludC0yZCc7XG5pbXBvcnQge1JlYWRQcm9wZXJ0eUl0ZW19IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQge1JlZ2lvbkdlb21ldHJ5fSBmcm9tICcuL3JlZ2lvbi1nZW9tZXRyeSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENvbnRlbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cbn1cbiJdfQ==