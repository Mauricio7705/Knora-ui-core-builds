import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
var KuiCoreConfig = /** @class */ (function () {
    function KuiCoreConfig() {
        /**
         * (Salsah) name of the app
         * @type {string}
         */
        this.name = undefined;
        /**
         * (knora) url of the api
         * @type {string}
         */
        this.api = undefined;
        /**
         * (sipi) url of media/file server
         * @type {string}
         */
        this.media = undefined;
        /**
         * (salsah) url of the app
         * @type {undefined}
         */
        this.app = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('name', String),
        tslib_1.__metadata("design:type", String)
    ], KuiCoreConfig.prototype, "name", void 0);
    tslib_1.__decorate([
        JsonProperty('api', String),
        tslib_1.__metadata("design:type", String)
    ], KuiCoreConfig.prototype, "api", void 0);
    tslib_1.__decorate([
        JsonProperty('media', String),
        tslib_1.__metadata("design:type", String)
    ], KuiCoreConfig.prototype, "media", void 0);
    tslib_1.__decorate([
        JsonProperty('app', String),
        tslib_1.__metadata("design:type", String)
    ], KuiCoreConfig.prototype, "app", void 0);
    KuiCoreConfig = tslib_1.__decorate([
        JsonObject('KuiCoreConfig')
    ], KuiCoreConfig);
    return KuiCoreConfig;
}());
export { KuiCoreConfig };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvY29yZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0Q7Ozs7O0dBS0c7O0lBQ0g7UUFHSTs7O1dBR0c7UUFFSSxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRWhDOzs7V0FHRztRQUVJLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFFL0I7OztXQUdHO1FBRUksVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUVqQzs7O1dBR0c7UUFFSSxRQUFHLEdBQVcsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUF0Qkc7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7K0NBQ0c7SUFPaEM7UUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7OENBQ0c7SUFPL0I7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQzs7Z0RBQ0c7SUFPakM7UUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7OENBQ0c7SUE1QnRCLGFBQWE7UUFEekIsVUFBVSxDQUFDLGVBQWUsQ0FBQztPQUNmLGFBQWEsQ0E2QnpCO0lBQUQsb0JBQUM7Q0FBQSxJQUFBO1NBN0JZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIEtub3JhLXVpIGNvcmUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBzZXJ2ZXIgZGVmaW5pdGlvbnMgb2Y6XG4gKiAgLSBhcGk6IFVSTCBvZiBkYXRhIHNlcnZpY2UgZS5nLiBrbm9yYTogaHR0cDovL2xvY2FsaG9zdDozMzMzXG4gKiAgLSBtZWRpYTogVVJMIG9mIG1lZGlhIHNlcnZlciBzZXJ2aWNlIGUuZy4gc2lwaTogaHR0cDovL2xvY2FsaG9zdDoxMDI0XG4gKiAgLSBhcHA6IFVSTCBvZiB0aGUgYXBwIGUuZy4gc2Fsc2FoOiBodHRwOi8vbG9jYWxob3N0OjQyMDBcbiAqL1xuQEpzb25PYmplY3QoJ0t1aUNvcmVDb25maWcnKVxuZXhwb3J0IGNsYXNzIEt1aUNvcmVDb25maWcge1xuXG4gICAgLyoqXG4gICAgICogKFNhbHNhaCkgbmFtZSBvZiB0aGUgYXBwXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAoa25vcmEpIHVybCBvZiB0aGUgYXBpXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcGknLCBTdHJpbmcpXG4gICAgcHVibGljIGFwaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogKHNpcGkpIHVybCBvZiBtZWRpYS9maWxlIHNlcnZlclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVkaWEnLCBTdHJpbmcpXG4gICAgcHVibGljIG1lZGlhOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAoc2Fsc2FoKSB1cmwgb2YgdGhlIGFwcFxuICAgICAqIEB0eXBlIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBwJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcHA6IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==