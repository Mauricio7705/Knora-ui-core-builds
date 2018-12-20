import * as tslib_1 from "tslib";
var ListNode_1;
import { JsonObject, JsonProperty } from 'json2typescript';
let ListNode = ListNode_1 = class ListNode {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.label = undefined;
        this.children = undefined;
        this.level = undefined;
        this.position = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('id', String, false),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('name', String, true),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('label', String, true),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "label", void 0);
tslib_1.__decorate([
    JsonProperty('children', [ListNode_1], true),
    tslib_1.__metadata("design:type", Array)
], ListNode.prototype, "children", void 0);
tslib_1.__decorate([
    JsonProperty('level', Number, true),
    tslib_1.__metadata("design:type", Number)
], ListNode.prototype, "level", void 0);
tslib_1.__decorate([
    JsonProperty('position', Number, true),
    tslib_1.__metadata("design:type", Number)
], ListNode.prototype, "position", void 0);
ListNode = ListNode_1 = tslib_1.__decorate([
    JsonObject('ListNode')
], ListNode);
export { ListNode };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBRzlDLFFBQVE7SUFEckI7UUFHVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBR3ZCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUcxQixhQUFRLEdBQWUsU0FBUyxDQUFDO1FBR2pDLFVBQUssR0FBVyxTQUFTLENBQUM7UUFHMUIsYUFBUSxHQUFXLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0NBQUEsQ0FBQTtBQWhCRztJQURDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7b0NBQ0o7QUFHOUI7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3NDQUNIO0FBR2hDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzt1Q0FDSDtBQUdqQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7OzBDQUNIO0FBR3hDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzt1Q0FDSDtBQUdqQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7MENBQ0g7QUFqQjNCLFFBQVE7SUFEcEIsVUFBVSxDQUFDLFVBQVUsQ0FBQztHQUNWLFFBQVEsQ0FrQnBCO1NBbEJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsZXZlbCcsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIl19