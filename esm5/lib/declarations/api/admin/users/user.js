import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Group } from '../groups/group';
import { PermissionData } from '../permissions/permission-data';
import { Project } from '../projects/project';
var User = /** @class */ (function () {
    function User() {
        this.id = undefined;
        this.email = undefined;
        this.password = undefined;
        this.token = undefined;
        this.givenName = undefined;
        this.familyName = undefined;
        this.status = undefined;
        this.lang = undefined;
        this.groups = undefined;
        this.projects = undefined;
        this.sessionId = undefined;
        this.permissions = undefined;
        this.systemAdmin = false;
    }
    tslib_1.__decorate([
        JsonProperty('id', String),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "id", void 0);
    tslib_1.__decorate([
        JsonProperty('email', String),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "email", void 0);
    tslib_1.__decorate([
        JsonProperty('password', String, true),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "password", void 0);
    tslib_1.__decorate([
        JsonProperty('token', String, true),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "token", void 0);
    tslib_1.__decorate([
        JsonProperty('givenName', String),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "givenName", void 0);
    tslib_1.__decorate([
        JsonProperty('familyName', String),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "familyName", void 0);
    tslib_1.__decorate([
        JsonProperty('status', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], User.prototype, "status", void 0);
    tslib_1.__decorate([
        JsonProperty('lang', String),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "lang", void 0);
    tslib_1.__decorate([
        JsonProperty('groups', [Group]),
        tslib_1.__metadata("design:type", Array)
    ], User.prototype, "groups", void 0);
    tslib_1.__decorate([
        JsonProperty('projects', [Project]),
        tslib_1.__metadata("design:type", Array)
    ], User.prototype, "projects", void 0);
    tslib_1.__decorate([
        JsonProperty('sessionId', String, true),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "sessionId", void 0);
    tslib_1.__decorate([
        JsonProperty('permissions', PermissionData),
        tslib_1.__metadata("design:type", PermissionData)
    ], User.prototype, "permissions", void 0);
    tslib_1.__decorate([
        JsonProperty('systemAdmin', Boolean, true),
        tslib_1.__metadata("design:type", Boolean)
    ], User.prototype, "systemAdmin", void 0);
    User = tslib_1.__decorate([
        JsonObject('User')
    ], User);
    return User;
}());
export { User };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vdXNlcnMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFFOUM7UUFJVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBR3ZCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFHMUIsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUc3QixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRzFCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFHOUIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUcvQixXQUFNLEdBQVksU0FBUyxDQUFDO1FBRzVCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUc1QixhQUFRLEdBQWMsU0FBUyxDQUFDO1FBR2hDLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFHOUIsZ0JBQVcsR0FBbUIsU0FBUyxDQUFDO1FBR3hDLGdCQUFXLEdBQWEsS0FBSyxDQUFDO0lBR3pDLENBQUM7SUF2Q0c7UUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7b0NBQ0c7SUFHOUI7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQzs7dUNBQ0c7SUFHakM7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzBDQUNIO0lBR3BDO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzt1Q0FDSDtJQUdqQztRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDOzsyQ0FDRztJQUdyQztRQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDOzs0Q0FDRztJQUd0QztRQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDOzt3Q0FDRztJQUduQztRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOztzQ0FDRztJQUdoQztRQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7d0NBQ0c7SUFHbkM7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7OzBDQUNHO0lBR3ZDO1FBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzsyQ0FDSDtJQUdyQztRQURDLFlBQVksQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDOzBDQUN4QixjQUFjOzZDQUFhO0lBRy9DO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDOzs2Q0FDTjtJQXZDNUIsSUFBSTtRQURoQixVQUFVLENBQUMsTUFBTSxDQUFDO09BQ04sSUFBSSxDQTBDaEI7SUFBRCxXQUFDO0NBQUEsSUFBQTtTQTFDWSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vZ3JvdXBzL2dyb3VwJztcbmltcG9ydCB7IFBlcm1pc3Npb25EYXRhIH0gZnJvbSAnLi4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1VzZXInKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdlbWFpbCcsIFN0cmluZylcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bhc3N3b3JkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdnaXZlbk5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGdpdmVuTmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZmFtaWx5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgZmFtaWx5TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFuZycsIFN0cmluZylcbiAgICBwdWJsaWMgbGFuZzogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzJywgW0dyb3VwXSlcbiAgICBwdWJsaWMgZ3JvdXBzOiBHcm91cFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzZXNzaW9uSWQnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncGVybWlzc2lvbnMnLCBQZXJtaXNzaW9uRGF0YSlcbiAgICBwdWJsaWMgcGVybWlzc2lvbnM6IFBlcm1pc3Npb25EYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3lzdGVtQWRtaW4nLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBzeXN0ZW1BZG1pbj86IGJvb2xlYW4gPSBmYWxzZTtcblxuXG59XG4iXX0=