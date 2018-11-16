/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
export declare class KuiCoreConfig {
    /**
     * (Salsah) name of the app
     * @type {string}
     */
    name: string;
    /**
     * (knora) url of the api
     * @type {string}
     */
    api: string;
    /**
     * (sipi) url of media/file server
     * @type {string}
     */
    media: string;
    /**
     * (salsah) url of the app
     * @type {undefined}
     */
    app: string;
}
