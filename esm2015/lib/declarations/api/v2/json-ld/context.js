import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let Context = class Context {
    constructor() {
        this['knora-api'] = undefined;
        this.rdfs = undefined;
        this.owl = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('knora-api', String),
    tslib_1.__metadata("design:type", String)
], Context.prototype, "knora-api", void 0);
tslib_1.__decorate([
    JsonProperty('rdfs', String),
    tslib_1.__metadata("design:type", String)
], Context.prototype, "rdfs", void 0);
tslib_1.__decorate([
    JsonProperty('owl', String),
    tslib_1.__metadata("design:type", String)
], Context.prototype, "owl", void 0);
Context = tslib_1.__decorate([
    JsonObject('Context')
], Context);
export { Context };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvanNvbi1sZC9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBSTlDLE9BQU87SUFEcEI7UUFJVyxpQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUdoQyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLFFBQUcsR0FBVyxTQUFTLENBQUM7SUFDbkMsQ0FBQztDQUFBLENBQUE7QUFQRztJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDOzswQ0FDSztBQUd2QztJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOztxQ0FDRztBQUdoQztJQURDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztvQ0FDRztBQVR0QixPQUFPO0lBRG5CLFVBQVUsQ0FBQyxTQUFTLENBQUM7R0FDVCxPQUFPLENBVW5CO1NBVlksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cblxuQEpzb25PYmplY3QoJ0NvbnRleHQnKVxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna25vcmEtYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyAna25vcmEtYXBpJzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncmRmcycsIFN0cmluZylcbiAgICBwdWJsaWMgcmRmczogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb3dsJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvd2w6IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==