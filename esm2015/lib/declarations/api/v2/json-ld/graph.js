import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let Graph = Graph_1 = class Graph {
    constructor() {
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
};
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
export { Graph };
var Graph_1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2pzb24tbGQvZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7SUFJOUMsS0FBSztJQURsQjtRQUlXLFdBQUssR0FBVyxTQUFTLENBQUM7UUFHMUIsYUFBTyxHQUFXLFNBQVMsQ0FBQztRQUc1QixrQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUdqQyxvQkFBYyxHQUFXLFNBQVMsQ0FBQztRQUduQyx1QkFBaUIsR0FBVSxTQUFTLENBQUM7UUFHckMsMEJBQW9CLEdBQVUsU0FBUyxDQUFDO1FBR3hDLG1DQUE2QixHQUFVLFNBQVMsQ0FBQztRQUdqRCw0QkFBc0IsR0FBVSxTQUFTLENBQUM7UUFHMUMsNkJBQXVCLEdBQVUsU0FBUyxDQUFDO1FBRzNDLDRCQUFzQixHQUFZLFNBQVMsQ0FBQztRQUc1QyxvQ0FBOEIsR0FBWSxTQUFTLENBQUM7UUFHcEQsbUNBQTZCLEdBQVksU0FBUyxDQUFDO0lBSTlELENBQUM7Q0FBQSxDQUFBO0FBckNHO0lBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O2tDQUNLO0FBR2pDO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztvQ0FDRDtBQUduQztJQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7eUNBQ0Q7QUFHeEM7SUFEQyxZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzJDQUNEO0FBRzFDO0lBREMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE9BQUssRUFBRSxJQUFJLENBQUM7c0NBQ25CLEtBQUs7OENBQWE7QUFHNUM7SUFEQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsT0FBSyxFQUFFLElBQUksQ0FBQztzQ0FDbkIsS0FBSztpREFBYTtBQUcvQztJQURDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxPQUFLLEVBQUUsSUFBSSxDQUFDO3NDQUNuQixLQUFLOzBEQUFhO0FBR3hEO0lBREMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLE9BQUssRUFBRSxJQUFJLENBQUM7c0NBQ25CLEtBQUs7bURBQWE7QUFHakQ7SUFEQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsT0FBSyxFQUFFLElBQUksQ0FBQztzQ0FDbkIsS0FBSztvREFBYTtBQUdsRDtJQURDLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDOzttREFDRDtBQUduRDtJQURDLFlBQVksQ0FBQyw4QkFBOEIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDOzsyREFDRDtBQUczRDtJQURDLFlBQVksQ0FBQyw2QkFBNkIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDOzswREFDRDtBQXBDakQsS0FBSztJQURqQixVQUFVLENBQUMsT0FBTyxDQUFDO0dBQ1AsS0FBSyxDQXdDakI7U0F4Q1ksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cblxuQEpzb25PYmplY3QoJ0dyYXBoJylcbmV4cG9ydCBjbGFzcyBHcmFwaCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdAaWQnLCBTdHJpbmcpXG4gICAgcHVibGljICdAaWQnOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdAdHlwZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgJ0B0eXBlJzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncmRmczpsYWJlbCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgJ3JkZnM6bGFiZWwnOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdyZGZzOmNvbW1lbnQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljICdyZGZzOmNvbW1lbnQnOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdyZGZzOnN1YkNsYXNzT2YnLCBHcmFwaCwgdHJ1ZSlcbiAgICBwdWJsaWMgJ3JkZnM6c3ViQ2xhc3NPZic6IEdyYXBoID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncmRmczpzdWJQcm9wZXJ0eU9mJywgR3JhcGgsIHRydWUpXG4gICAgcHVibGljICdyZGZzOnN1YlByb3BlcnR5T2YnOiBHcmFwaCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tub3JhLWFwaTphdHRhY2hlZFRvUHJvamVjdCcsIEdyYXBoLCB0cnVlKVxuICAgIHB1YmxpYyAna25vcmEtYXBpOmF0dGFjaGVkVG9Qcm9qZWN0JzogR3JhcGggPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdrbm9yYS1hcGk6b2JqZWN0VHlwZScsIEdyYXBoLCB0cnVlKVxuICAgIHB1YmxpYyAna25vcmEtYXBpOm9iamVjdFR5cGUnOiBHcmFwaCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tub3JhLWFwaTpzdWJqZWN0VHlwZScsIEdyYXBoLCB0cnVlKVxuICAgIHB1YmxpYyAna25vcmEtYXBpOnN1YmplY3RUeXBlJzogR3JhcGggPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdrbm9yYS1hcGk6aXNFZGl0YWJsZScsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljICdrbm9yYS1hcGk6aXNFZGl0YWJsZSc6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdrbm9yYS1hcGk6aXNSZXNvdXJjZVByb3BlcnR5JywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgJ2tub3JhLWFwaTppc1Jlc291cmNlUHJvcGVydHknOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgna25vcmEtYXBpOmNhbkJlSW5zdGFudGlhdGVkJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgJ2tub3JhLWFwaTpjYW5CZUluc3RhbnRpYXRlZCc6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cblxuXG59XG5cbiJdfQ==