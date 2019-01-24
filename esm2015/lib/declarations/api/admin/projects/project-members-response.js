import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from '../users/user';
let ProjectMembersResponse = class ProjectMembersResponse {
    constructor() {
        this.members = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('members', [User]),
    tslib_1.__metadata("design:type", Array)
], ProjectMembersResponse.prototype, "members", void 0);
ProjectMembersResponse = tslib_1.__decorate([
    JsonObject('ProjectMembersResponse')
], ProjectMembersResponse);
export { ProjectMembersResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1tZW1iZXJzLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztJQUd4QixzQkFBc0I7SUFEbkM7UUFHVyxZQUFPLEdBQVcsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7Q0FBQSxDQUFBO0FBREc7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7O3VEQUNHO0FBRjFCLHNCQUFzQjtJQURsQyxVQUFVLENBQUMsd0JBQXdCLENBQUM7R0FDeEIsc0JBQXNCLENBR2xDO1NBSFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy91c2VyJztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RNZW1iZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RNZW1iZXJzUmVzcG9uc2Uge1xuICAgIEBKc29uUHJvcGVydHkoJ21lbWJlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIG1lbWJlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==