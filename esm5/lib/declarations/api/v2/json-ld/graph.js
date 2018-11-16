import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
var Graph = /** @class */ (function () {
    function Graph() {
        this['@id'] = undefined;
        this['@type'] = undefined;
        this['rdfs:label'] = undefined;
        this['rdfs:comment'] = undefined;
        this['rdfs:subClassOf'] = undefined;
        this['rdfs:subPropertyOf'] = undefined;
        this['knora-api:attachedToProject'] = undefined;
        this['knora-api:objectType'] = undefined;
        this['knora-api:subjectType'] = undefined;
        this['knora-api:isEditable'] = undefined;
        this['knora-api:isResourceProperty'] = undefined;
        this['knora-api:canBeInstantiated'] = undefined;
    }
    Graph_1 = Graph;
    tslib_1.__decorate([
        JsonProperty('@id', String),
        tslib_1.__metadata("design:type", String)
    ], Graph.prototype, "@id", void 0);
    tslib_1.__decorate([
        JsonProperty('@type', String, true),
        tslib_1.__metadata("design:type", String)
    ], Graph.prototype, "@type", void 0);
    tslib_1.__decorate([
        JsonProperty('rdfs:label', String, true),
        tslib_1.__metadata("design:type", String)
    ], Graph.prototype, "rdfs:label", void 0);
    tslib_1.__decorate([
        JsonProperty('rdfs:comment', String, true),
        tslib_1.__metadata("design:type", String)
    ], Graph.prototype, "rdfs:comment", void 0);
    tslib_1.__decorate([
        JsonProperty('rdfs:subClassOf', Graph_1, true),
        tslib_1.__metadata("design:type", Graph)
    ], Graph.prototype, "rdfs:subClassOf", void 0);
    tslib_1.__decorate([
        JsonProperty('rdfs:subPropertyOf', Graph_1, true),
        tslib_1.__metadata("design:type", Graph)
    ], Graph.prototype, "rdfs:subPropertyOf", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:attachedToProject', Graph_1, true),
        tslib_1.__metadata("design:type", Graph)
    ], Graph.prototype, "knora-api:attachedToProject", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:objectType', Graph_1, true),
        tslib_1.__metadata("design:type", Graph)
    ], Graph.prototype, "knora-api:objectType", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:subjectType', Graph_1, true),
        tslib_1.__metadata("design:type", Graph)
    ], Graph.prototype, "knora-api:subjectType", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:isEditable', Boolean, true),
        tslib_1.__metadata("design:type", Boolean)
    ], Graph.prototype, "knora-api:isEditable", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:isResourceProperty', Boolean, true),
        tslib_1.__metadata("design:type", Boolean)
    ], Graph.prototype, "knora-api:isResourceProperty", void 0);
    tslib_1.__decorate([
        JsonProperty('knora-api:canBeInstantiated', Boolean, true),
        tslib_1.__metadata("design:type", Boolean)
    ], Graph.prototype, "knora-api:canBeInstantiated", void 0);
    Graph = Graph_1 = tslib_1.__decorate([
        JsonObject('Graph')
    ], Graph);
    return Graph;
    var Graph_1;
}());
export { Graph };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2pzb24tbGQvZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBRzNEO1FBSVcsV0FBSyxHQUFXLFNBQVMsQ0FBQztRQUcxQixhQUFPLEdBQVcsU0FBUyxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsU0FBUyxDQUFDO1FBR2pDLG9CQUFjLEdBQVcsU0FBUyxDQUFDO1FBR25DLHVCQUFpQixHQUFVLFNBQVMsQ0FBQztRQUdyQywwQkFBb0IsR0FBVSxTQUFTLENBQUM7UUFHeEMsbUNBQTZCLEdBQVUsU0FBUyxDQUFDO1FBR2pELDRCQUFzQixHQUFVLFNBQVMsQ0FBQztRQUcxQyw2QkFBdUIsR0FBVSxTQUFTLENBQUM7UUFHM0MsNEJBQXNCLEdBQVksU0FBUyxDQUFDO1FBRzVDLG9DQUE4QixHQUFZLFNBQVMsQ0FBQztRQUdwRCxtQ0FBNkIsR0FBWSxTQUFTLENBQUM7SUFJOUQsQ0FBQztjQXhDWSxLQUFLO0lBR2Q7UUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7c0NBQ0s7SUFHakM7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3dDQUNEO0lBR25DO1FBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs2Q0FDRDtJQUd4QztRQURDLFlBQVksQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7K0NBQ0Q7SUFHMUM7UUFEQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsT0FBSyxFQUFFLElBQUksQ0FBQzswQ0FDbkIsS0FBSztrREFBYTtJQUc1QztRQURDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxPQUFLLEVBQUUsSUFBSSxDQUFDOzBDQUNuQixLQUFLO3FEQUFhO0lBRy9DO1FBREMsWUFBWSxDQUFDLDZCQUE2QixFQUFFLE9BQUssRUFBRSxJQUFJLENBQUM7MENBQ25CLEtBQUs7OERBQWE7SUFHeEQ7UUFEQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsT0FBSyxFQUFFLElBQUksQ0FBQzswQ0FDbkIsS0FBSzt1REFBYTtJQUdqRDtRQURDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxPQUFLLEVBQUUsSUFBSSxDQUFDOzBDQUNuQixLQUFLO3dEQUFhO0lBR2xEO1FBREMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7O3VEQUNEO0lBR25EO1FBREMsWUFBWSxDQUFDLDhCQUE4QixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7OytEQUNEO0lBRzNEO1FBREMsWUFBWSxDQUFDLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7OzhEQUNEO0lBcENqRCxLQUFLO1FBRGpCLFVBQVUsQ0FBQyxPQUFPLENBQUM7T0FDUCxLQUFLLENBd0NqQjtJQUFELFlBQUM7O0NBQUEsSUFBQTtTQXhDWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuXG5ASnNvbk9iamVjdCgnR3JhcGgnKVxuZXhwb3J0IGNsYXNzIEdyYXBoIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ0BpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgJ0BpZCc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ0B0eXBlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyAnQHR5cGUnOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdyZGZzOmxhYmVsJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyAncmRmczpsYWJlbCc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3JkZnM6Y29tbWVudCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgJ3JkZnM6Y29tbWVudCc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3JkZnM6c3ViQ2xhc3NPZicsIEdyYXBoLCB0cnVlKVxuICAgIHB1YmxpYyAncmRmczpzdWJDbGFzc09mJzogR3JhcGggPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdyZGZzOnN1YlByb3BlcnR5T2YnLCBHcmFwaCwgdHJ1ZSlcbiAgICBwdWJsaWMgJ3JkZnM6c3ViUHJvcGVydHlPZic6IEdyYXBoID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna25vcmEtYXBpOmF0dGFjaGVkVG9Qcm9qZWN0JywgR3JhcGgsIHRydWUpXG4gICAgcHVibGljICdrbm9yYS1hcGk6YXR0YWNoZWRUb1Byb2plY3QnOiBHcmFwaCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tub3JhLWFwaTpvYmplY3RUeXBlJywgR3JhcGgsIHRydWUpXG4gICAgcHVibGljICdrbm9yYS1hcGk6b2JqZWN0VHlwZSc6IEdyYXBoID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna25vcmEtYXBpOnN1YmplY3RUeXBlJywgR3JhcGgsIHRydWUpXG4gICAgcHVibGljICdrbm9yYS1hcGk6c3ViamVjdFR5cGUnOiBHcmFwaCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tub3JhLWFwaTppc0VkaXRhYmxlJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgJ2tub3JhLWFwaTppc0VkaXRhYmxlJzogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tub3JhLWFwaTppc1Jlc291cmNlUHJvcGVydHknLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyAna25vcmEtYXBpOmlzUmVzb3VyY2VQcm9wZXJ0eSc6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdrbm9yYS1hcGk6Y2FuQmVJbnN0YW50aWF0ZWQnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyAna25vcmEtYXBpOmNhbkJlSW5zdGFudGlhdGVkJzogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuXG5cbn1cblxuIl19