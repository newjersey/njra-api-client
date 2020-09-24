interface PrepareParams {
    applicationId: string;
    landlortCertId: string;
    landlortCertRef: string;
    tenantGrantAgreementId: string;
    tenantGrantAgreementRef: string;
    refsOnly?: boolean;
}
interface OptionalDataRefs {
    SBLEAGP_PJS_GrantNumber: string;
    SBLEAGP_PJS_ApplicationID: string;
    SBLEAGP_PJS_LCID: string;
    SBLEAGP_PJS_LCRef: string;
    SBLEAGP_PJS_TGAID: string;
    SBLEAGP_PJS_TGARef: string;
}
interface OptionalDataExtended extends OptionalDataRefs {
    SBLEAGP_PJS_Applicant: string;
    SBLEAGP_PJS_Nature: string;
    SBLEAGP_PJS_Address: string;
    SBLEAGP_PJS_City: string;
    SBLEAGP_PJS_OwnerName: string;
    SBLEAGP_PJS_SquareFeet: string;
    SBLEAGP_PJS_LandlordName: string;
    SBLEAGP_PJS_LastPayment: string;
    SBLEAGP_PJS_LeaseExecuted: string;
    SBLEAGP_PJS_LeaseTerm: string;
}
declare type OptionalData = OptionalDataRefs | OptionalDataExtended;
export declare function prepare(params: PrepareParams, formId: string, formUrl: string, apiKey: string, apiSecret: string): Promise<{
    data: OptionalData;
    grantId: string;
    inviteUrl: string;
}>;
export {};
