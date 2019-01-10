import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let OntologyInfoShort = class OntologyInfoShort {
    constructor() {
        this.ontologyIri = undefined;
        this.ontologyName = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('ontologyIri', String),
    tslib_1.__metadata("design:type", String)
], OntologyInfoShort.prototype, "ontologyIri", void 0);
tslib_1.__decorate([
    JsonProperty('ontologyName', String),
    tslib_1.__metadata("design:type", String)
], OntologyInfoShort.prototype, "ontologyName", void 0);
OntologyInfoShort = tslib_1.__decorate([
    JsonObject('OntologyInfoShort')
], OntologyInfoShort);
export { OntologyInfoShort };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3ktaW5mby1zaG9ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vb250b2xvZ2llcy9vbnRvbG9neS1pbmZvLXNob3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBRzlDLGlCQUFpQjtJQUQ5QjtRQUlXLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBR2hDLGlCQUFZLEdBQVcsU0FBUyxDQUFDO0lBRTVDLENBQUM7Q0FBQSxDQUFBO0FBTEc7SUFEQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzs7c0RBQ0c7QUFHdkM7SUFEQyxZQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs7dURBQ0c7QUFOL0IsaUJBQWlCO0lBRDdCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztHQUNuQixpQkFBaUIsQ0FRN0I7U0FSWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnT250b2xvZ3lJbmZvU2hvcnQnKVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb1Nob3J0IHtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SXJpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ3lOYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIl19