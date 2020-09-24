declare type FieldMap = ApplicationDatum[];
export interface ApplicationDatum {
    input_name: string;
    label: string;
    raw_value: string;
    field_map?: FieldMap;
}
declare type ApplicationData = Record<string, ApplicationDatum>;
export interface Application {
    modified_ts: string;
    created_ts: string;
    application_id: string;
    form_id: string;
    user_id: null;
    notes: null;
    is_active: 't' | 'f';
    application_data: ApplicationData;
    pdf_cloud_file_id: null;
    user_agent_xml: {
        platform: string;
        browser: string;
        version: string;
        robot: null;
        string: string;
    };
    geo_data_xml: {
        ip_address: string;
    };
    referrer_url: null;
    ip_address: string;
    submission_pdf_url: string;
    field_positions_xml: [];
    group_id: null;
    overrides_xml: [];
    is_incomplete: null;
}
export declare function getApplication(apiKey: string, apiSecret: string, applicationId: string): Promise<Application>;
export {};
