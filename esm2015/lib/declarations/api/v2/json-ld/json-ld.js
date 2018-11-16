import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Graph } from './graph';
import { Context } from './context';
let JsonLd = class JsonLd {
    constructor() {
        this['@graph'] = undefined;
        this['@context'] = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('@graph', Graph, true),
    tslib_1.__metadata("design:type", Graph)
], JsonLd.prototype, "@graph", void 0);
tslib_1.__decorate([
    JsonProperty('@context', Context, true),
    tslib_1.__metadata("design:type", Context)
], JsonLd.prototype, "@context", void 0);
JsonLd = tslib_1.__decorate([
    JsonObject('JsonLd')
], JsonLd);
export { JsonLd };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvanNvbi1sZC9qc29uLWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztJQUl2QixNQUFNO0lBRG5CO1FBSVcsY0FBUSxHQUFVLFNBQVMsQ0FBQztRQUk1QixnQkFBVSxHQUFZLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0NBQUEsQ0FBQTtBQUxHO0lBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO3NDQUNuQixLQUFLO3NDQUFhO0FBSW5DO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO3NDQUNyQixPQUFPO3dDQUFhO0FBUDlCLE1BQU07SUFEbEIsVUFBVSxDQUFDLFFBQVEsQ0FBQztHQUNSLE1BQU0sQ0FRbEI7U0FSWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyYXBoIH0gZnJvbSAnLi9ncmFwaCc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcblxuXG5ASnNvbk9iamVjdCgnSnNvbkxkJylcbmV4cG9ydCBjbGFzcyBKc29uTGQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnQGdyYXBoJywgR3JhcGgsIHRydWUpXG4gICAgcHVibGljICdAZ3JhcGgnOiBHcmFwaCA9IHVuZGVmaW5lZDtcblxuXG4gICAgQEpzb25Qcm9wZXJ0eSgnQGNvbnRleHQnLCBDb250ZXh0LCB0cnVlKVxuICAgIHB1YmxpYyAnQGNvbnRleHQnOiBDb250ZXh0ID0gdW5kZWZpbmVkO1xufVxuIl19