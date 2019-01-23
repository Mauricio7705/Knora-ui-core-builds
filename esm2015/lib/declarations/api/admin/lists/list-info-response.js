import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { ListInfo } from './list-info';
let ListInfoResponse = class ListInfoResponse {
    constructor() {
        this.listinfo = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('listinfo', ListInfo, false),
    tslib_1.__metadata("design:type", ListInfo)
], ListInfoResponse.prototype, "listinfo", void 0);
ListInfoResponse = tslib_1.__decorate([
    JsonObject('ListInfoResponse')
], ListInfoResponse);
export { ListInfoResponse };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbmZvLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztJQUcxQixnQkFBZ0I7SUFEN0I7UUFJVyxhQUFRLEdBQWEsU0FBUyxDQUFDO0lBQzFDLENBQUM7Q0FBQSxDQUFBO0FBREc7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7c0NBQ3pCLFFBQVE7a0RBQWE7QUFIN0IsZ0JBQWdCO0lBRDVCLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztHQUNsQixnQkFBZ0IsQ0FJNUI7U0FKWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0SW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RpbmZvJywgTGlzdEluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0aW5mbzogTGlzdEluZm8gPSB1bmRlZmluZWQ7XG59XG5cblxuIl19