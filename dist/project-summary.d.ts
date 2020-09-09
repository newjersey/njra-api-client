interface ResponseBodyBase {
    result: boolean;
}
interface ResponseBodySuccess extends ResponseBodyBase {
    application_id: string;
    description: string;
}
interface ErrorEntry {
    error_code: string;
    error_message: string;
    error_description: string;
}
interface ResponseBodyFailure extends ResponseBodyBase {
    error_log: ErrorEntry[];
}
declare type ResponseBody = ResponseBodySuccess | ResponseBodyFailure;
export declare function prepare({ applicationId, landlortCertId, landlortCertRef, tenantGrantAgreementId, tenantGrantAgreementRef, refsOnly, }: {
    applicationId: string;
    landlortCertId: string;
    landlortCertRef: string;
    tenantGrantAgreementId: string;
    tenantGrantAgreementRef: string;
    refsOnly?: boolean;
}): Promise<ResponseBody>;
export {};
