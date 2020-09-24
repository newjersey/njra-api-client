interface ResponseBodyBase {
    result: boolean;
}
export interface ResponseBodySuccess extends ResponseBodyBase {
    application_id: string;
    description: string;
}
export declare function prepareForm(apiKey: string, apiSecret: string, formId: string, optionalData?: {}): Promise<ResponseBodySuccess>;
export {};
