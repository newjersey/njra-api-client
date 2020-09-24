interface Signer {
    key: string;
    reference: string;
    known_list: string;
    recipient_custom_message: null;
    can_delegate: 'true' | 'false';
    include_pdf_as_attachment: 't' | 'f';
    include_pdf_as_link: 't' | 'f';
    recipient_type: string;
    order: string;
    color: string;
    signer_type: string;
    signer_key: string;
}
declare type ResponseBodySuccess = Signer[];
export declare function getSigners(apiKey: string, apiSecret: string, formId: string): Promise<ResponseBodySuccess>;
export {};
