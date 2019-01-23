import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
/**
 * Result class used as API url response in ApiService
 */
export class ApiServiceResult {
    constructor() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
    }
    /**
     * Gets the result body as instance of classObject.
     * @param classObject
     * @returns {any}
     * @throws
     */
    getBody(classObject) {
        // console.log(this.body);
        return ApiServiceResult.jsonConvert.deserialize(this.body, classObject);
    }
}
ApiServiceResult.jsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXNlcnZpY2UtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhGOztHQUVHO0FBQ0gsTUFBTTtJQUFOO1FBSUk7O1dBRUc7UUFDSCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVg7O1dBRUc7UUFDSCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCOztXQUVHO1FBQ0gsUUFBRyxHQUFHLEVBQUUsQ0FBQztJQW9CYixDQUFDO0lBYkc7Ozs7O09BS0c7SUFFSCxPQUFPLENBQUMsV0FBNEI7UUFDaEMsMEJBQTBCO1FBQzFCLE9BQU8sZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7O0FBaENjLDRCQUFXLEdBQWdCLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEpzb25Db252ZXJ0LCBPcGVyYXRpb25Nb2RlLCBWYWx1ZUNoZWNraW5nTW9kZSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogUmVzdWx0IGNsYXNzIHVzZWQgYXMgQVBJIHVybCByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVzdWx0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGpzb25Db252ZXJ0OiBKc29uQ29udmVydCA9IG5ldyBKc29uQ29udmVydChPcGVyYXRpb25Nb2RlLkVOQUJMRSwgVmFsdWVDaGVja2luZ01vZGUuQUxMT1dfTlVMTCk7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBhcyBKU09OXG4gICAgICovXG4gICAgYm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzdWx0IGJvZHkgYXMgaW5zdGFuY2Ugb2YgY2xhc3NPYmplY3QuXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAdGhyb3dzXG4gICAgICovXG5cbiAgICBnZXRCb2R5KGNsYXNzT2JqZWN0PzogeyBuZXcoKTogYW55IH0pOiBhbnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJvZHkpO1xuICAgICAgICByZXR1cm4gQXBpU2VydmljZVJlc3VsdC5qc29uQ29udmVydC5kZXNlcmlhbGl6ZSh0aGlzLmJvZHksIGNsYXNzT2JqZWN0KTtcbiAgICB9XG5cblxufVxuIl19