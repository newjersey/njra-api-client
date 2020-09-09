declare type tf = 't' | 'f';
declare type yn = 'Yes' | 'No';
declare type timestamp = string;
export interface AddressData {
    input_name: 'grp_OaJ6rc';
    label: 'Business Address';
    raw_value: string;
    field_map: [{
        input_name: 'street_address';
        raw_value: string;
        label: 'Street Address';
    }, {
        input_name: 'address2';
        raw_value: string;
        label: 'Business Address';
    }, {
        input_name: 'city';
        raw_value: string;
        label: 'City';
    }, {
        input_name: 'state';
        raw_value: string;
        label: 'State';
    }, {
        input_name: 'zip';
        raw_value: string;
        label: 'Zip';
    }];
}
interface ApplicationData {
    input_mAnKeq: {
        input_name: 'input_mAnKeq';
        label: 'Business Name';
        raw_value: string;
    };
    grp_83oWbz: {
        input_name: 'grp_83oWbz';
        label: 'Your Name';
        raw_value: string;
        field_map: [{
            input_name: 'first_name';
            raw_value: string;
            label: 'First Name';
        }, {
            input_name: 'last_name';
            raw_value: string;
            label: 'Last Name';
        }];
    };
    input_692Vda: {
        input_name: 'input_692Vda';
        label: 'Email';
        raw_value: string;
    };
    input_KEBGNW: {
        input_name: 'input_KEBGNW';
        label: 'Phone Number';
        raw_value: string;
    };
    grp_OaJ6rc: AddressData;
    input_I5MsMc: {
        input_name: 'input_I5MsMc';
        label: 'Nature of Business';
        raw_value: string;
    };
    plugin_SaIfQ8: {
        input_name: 'plugin_SaIfQ8';
        label: 'Does your business have a federal Employer Identification Number (EIN)?';
        raw_value: yn;
    };
    input_ou1s8P: {
        input_name: 'input_ou1s8P';
        label: 'Employer Identification Number (EIN)';
        raw_value: string;
    };
    plugin_HCPQkX: {
        input_name: 'plugin_HCPQkX';
        label: 'Business Designations';
        raw_value: string;
    };
    input_hOdfxp: {
        input_name: 'input_hOdfxp';
        label: 'Landlord Name';
        raw_value: string;
    };
    input_RxrdKF: {
        input_name: 'input_RxrdKF';
        label: 'Landlord Phone Number';
        raw_value: string;
    };
    input_04AOr3: {
        input_name: 'input_04AOr3';
        label: 'Landlord Email';
        raw_value: string;
    };
    plugin_6tJdOG: {
        input_name: 'plugin_6tJdOG';
        label: 'Lease Start Date';
        raw_value: string;
    };
    input_NL2w0I: {
        input_name: 'input_NL2w0I';
        label: 'Lease Duration';
        raw_value: string;
    };
    plugin_v8xLPU: {
        input_name: 'plugin_v8xLPU';
        label: 'Date of Last Lease Payment';
        raw_value: string;
    };
    input_nuag3V: {
        input_name: 'input_nuag3V';
        label: 'Amount Requested (not to exceed $10,000)';
        raw_value: string;
    };
    plugin_OUnBtf: {
        input_name: 'plugin_OUnBtf';
        label: 'Has your business been adversely impacted by COVID-19?';
        raw_value: yn;
    };
    input_BsWzwc: {
        input_name: 'input_BsWzwc';
        label: 'How has your business been adversely impacted by COVID-19?';
        raw_value: string;
    };
    plugin_gIA9uv: {
        input_name: 'plugin_gIA9uv';
        label: 'Has your business received CARES Act (Coronavirus Relief Fund) financial assistance (local/county/state/federal) for lease payments (rent) as a result of COVID-19?';
        raw_value: yn;
    };
    plugin_1nmWmT: {
        input_name: 'plugin_1nmWmT';
        label: 'Use of Space';
        raw_value: string;
    };
    plugin_4HCqsT: {
        input_name: 'plugin_4HCqsT';
        label: 'Is your business in good standing with the State of New Jersey?';
        raw_value: yn;
    };
    plugin_pNnW0r: {
        input_name: 'plugin_pNnW0r';
        label: 'Business Tax Clearance Certificate.';
        raw_value: string;
    };
    plugin_bmudle: {
        input_name: 'plugin_bmudle';
        label: 'Have you been convicted and/or found guilty and/or pled guilty and/or found liable and/or paid a fine or otherwise paid to settle any allegations made by the government in any court to any violation of law, other than minor traffic offenses?';
        raw_value: yn;
    };
    plugin_Cw6e16: {
        input_name: 'plugin_Cw6e16';
        label: 'Have you been denied a license or permit required to engage in its business or profession or has any such license or permit or been suspended or revoked by any government?';
        raw_value: yn;
    };
    plugin_GNx0C6: {
        input_name: 'plugin_GNx0C6';
        label: 'Signature Data';
        raw_value: string;
        field_map: [{
            input_name: 'first_name';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'last_name';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'email';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'image';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'timestamp';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'ip_address';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'referrer_url';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'agent_type';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'agent_name';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'agent_version';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'platform_type';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'platform_os_name';
            raw_value: string;
            label: 'Sign Here';
        }, {
            input_name: 'platform_os_version';
            raw_value: string;
            label: 'Sign Here';
        }];
    };
    select_figLKP: {
        input_name: 'select_figLKP';
        raw_value: 'Months' | 'Years' | null;
        label: 'Lease Duration Unit';
    };
    plugin_1kDKrB: {
        input_name: 'plugin_1kDKrB';
        raw_value: string;
        label: 'Please upload a copy of your lease';
        field_map: [{
            input_name: 'file_url_0';
            raw_value: string;
            label: string;
        }, {
            input_name: 'file_url_0_name';
            raw_value: string;
            label: '';
        }];
    };
    plugin_AUl2Bf: {
        input_name: 'plugin_AUl2Bf';
        raw_value: string | null;
        label: 'On what did you spend the CARES Act financial assistance?';
    };
    input_qkFsnJ: {
        input_name: 'input_qkFsnJ';
        raw_value: string | null;
        label: 'Please explain:';
    };
    textarea_Wka1kl: {
        input_name: 'textarea_Wka1kl';
        raw_value: string | null;
        label: 'Please explain:';
    };
    plugin_SKnTOT: {
        input_name: 'plugin_SKnTOT';
        raw_value: string | null;
        label: 'User&#39;s Session Information';
        field_map: [{
            input_name: 'ip_address';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'referrer_url';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'agent_type';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'agent_name';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'agent_version';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'platform_type';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'platform_os_name';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }, {
            input_name: 'platform_os_version';
            raw_value: string;
            label: 'User&amp;amp;#39;s Session Information';
        }];
    };
    input_DIBnt4: {
        input_name: 'input_DIBnt4';
        raw_value: string;
        label: 'Total Square Footage of Leased Space';
    };
    uniquestring_Xoqb1g: {
        input_name: 'uniquestring_Xoqb1g';
        raw_value: string | null;
        label: 'Application ID';
    };
    plugin_LsXiVv: {
        input_name: 'plugin_LsXiVv';
        raw_value: null;
        label: 'SQFTOK';
    };
    textarea_RDNJmm: {
        input_name: 'textarea_RDNJmm';
        raw_value: string | null;
        label: 'Please explain:';
    };
}
export interface Application {
    can_view: tf;
    can_edit: tf;
    can_delete: tf;
    modified_ts: timestamp;
    created_ts: timestamp;
    application_id: string;
    user_id: null;
    notes: null;
    is_active: tf;
    is_incomplete: null;
    application_data: ApplicationData;
    pdf_cloud_file_id: null;
    referrer_url: null;
    submission_pdf_url: string;
    custom_status: null;
    is_executed: tf;
    submitted_by: string;
    num_messages: number;
    attachments: unknown[];
    assignees: null;
    status: {
        status: string;
        status_code: string;
    };
    has_attachments: boolean;
    has_payments: boolean;
    meta: {
        resume_url: string;
        live_view: string;
    };
}
interface Columns {
    modified_ts: {
        column_id: 'modified_ts';
        printable_name: 'Last Modified';
    };
    created_ts: {
        column_id: 'created_ts';
        printable_name: 'Created';
    };
    notes: {
        column_id: 'notes';
        printable_name: 'notes';
    };
    is_active: {
        column_id: 'is_active';
        printable_name: 'is_active';
    };
    user_agent_xml: {
        column_id: 'user_agent_xml';
        printable_name: 'user_agent_xml';
    };
    geo_data_xml: {
        column_id: 'geo_data_xml';
        printable_name: 'geo_data_xml';
    };
    referrer_url: {
        column_id: 'referrer_url';
        printable_name: 'referrer_url';
    };
    ip_address: {
        column_id: 'ip_address';
        printable_name: 'ip_address';
    };
    submission_pdf_url: {
        column_id: 'submission_pdf_url';
        printable_name: 'submission_pdf_url';
    };
    group_id: {
        column_id: 'group_id';
        printable_name: 'group_id';
    };
    is_incomplete: {
        column_id: 'is_incomplete';
        printable_name: 'is_incomplete';
    };
    application_id: {
        column_id: 'application_id';
        printable_name: 'application_id';
    };
    form_id: {
        column_id: 'form_id';
        printable_name: 'form_id';
    };
    user_id: {
        column_id: 'user_id';
        printable_name: 'user_id';
    };
    pdf_cloud_file_id: {
        column_id: 'pdf_cloud_file_id';
        printable_name: 'pdf_cloud_file_id';
    };
    custom_status: {
        column_id: 'custom_status';
        printable_name: 'Custom Status';
    };
    num_messages: {
        column_id: 'num_messages';
        printable_name: 'Number of Messages';
    };
    submitted_by: {
        column_id: 'submitted_by';
        printable_name: 'Submitted By';
    };
    assignees: {
        column_id: 'assignees';
        printable_name: 'Assignees';
    };
    is_executed: {
        column_id: 'is_executed';
        printable_name: 'Document Executed';
    };
    input_mAnKeq: {
        column_id: 'input_mAnKeq';
        printable_name: 'Business Name';
    };
    grp_83oWbz: {
        column_id: 'grp_83oWbz';
        printable_name: 'Your Name';
    };
    input_692Vda: {
        column_id: 'input_692Vda';
        printable_name: 'Email';
    };
    input_KEBGNW: {
        column_id: 'input_KEBGNW';
        printable_name: 'Phone Number';
    };
    grp_OaJ6rc: {
        column_id: 'grp_OaJ6rc';
        printable_name: 'Business Address';
    };
    input_I5MsMc: {
        column_id: 'input_I5MsMc';
        printable_name: 'Nature of Business';
    };
    plugin_SaIfQ8: {
        column_id: 'plugin_SaIfQ8';
        printable_name: 'Does your business have a federal Employer Identification Number (EIN)?';
    };
    input_ou1s8P: {
        column_id: 'input_ou1s8P';
        printable_name: 'Employer Identification Number (EIN)';
    };
    plugin_HCPQkX: {
        column_id: 'plugin_HCPQkX';
        printable_name: 'Business Designations';
    };
    input_hOdfxp: {
        column_id: 'input_hOdfxp';
        printable_name: 'Landlord Name';
    };
    input_RxrdKF: {
        column_id: 'input_RxrdKF';
        printable_name: 'Landlord Phone Number';
    };
    input_04AOr3: {
        column_id: 'input_04AOr3';
        printable_name: 'Landlord Email';
    };
    plugin_6tJdOG: {
        column_id: 'plugin_6tJdOG';
        printable_name: 'Lease Start Date';
    };
    input_NL2w0I: {
        column_id: 'input_NL2w0I';
        printable_name: 'Lease Duration';
    };
    plugin_v8xLPU: {
        column_id: 'plugin_v8xLPU';
        printable_name: 'Date of Last Lease Payment';
    };
    input_nuag3V: {
        column_id: 'input_nuag3V';
        printable_name: 'Amount Requested (not to exceed $10,000)';
    };
    plugin_OUnBtf: {
        column_id: 'plugin_OUnBtf';
        printable_name: 'Has your business been adversely impacted by COVID-19?';
    };
    input_BsWzwc: {
        column_id: 'input_BsWzwc';
        printable_name: 'How has your business been adversely impacted by COVID-19?';
    };
    plugin_gIA9uv: {
        column_id: 'plugin_gIA9uv';
        printable_name: 'Has your business received CARES Act (Coronavirus Relief Fund) financial assistance (local/county/state/federal) for lease payments (rent) as a result of COVID-19?';
    };
    plugin_1nmWmT: {
        column_id: 'plugin_1nmWmT';
        printable_name: 'Use of Space';
    };
    plugin_4HCqsT: {
        column_id: 'plugin_4HCqsT';
        printable_name: 'Is your business in good standing with the State of New Jersey?';
    };
    plugin_pNnW0r: {
        column_id: 'plugin_pNnW0r';
        printable_name: 'Business Tax Clearance Certificate.';
    };
    plugin_bmudle: {
        column_id: 'plugin_bmudle';
        printable_name: 'Have you been convicted and/or found guilty and/or pled guilty and/or found liable and/or paid a fine or otherwise paid to settle any allegations made by the government in any court to any violation of law, other than minor traffic offenses?';
    };
    plugin_Cw6e16: {
        column_id: 'plugin_Cw6e16';
        printable_name: 'Have you been denied a license or permit required to engage in its business or profession or has any such license or permit or been suspended or revoked by any government?';
    };
    plugin_GNx0C6: {
        column_id: 'plugin_GNx0C6';
        printable_name: 'Signature Data';
    };
    select_figLKP: {
        column_id: 'select_figLKP';
        printable_name: 'Lease Duration Unit';
    };
    plugin_1kDKrB: {
        column_id: 'plugin_1kDKrB';
        printable_name: 'Please upload a copy of your lease';
    };
    plugin_AUl2Bf: {
        column_id: 'plugin_AUl2Bf';
        printable_name: 'On what did you spend the CARES Act financial assistance?';
    };
    input_qkFsnJ: {
        column_id: 'input_qkFsnJ';
        printable_name: 'Please explain:';
    };
    textarea_Wka1kl: {
        column_id: 'textarea_Wka1kl';
        printable_name: 'Please explain:';
    };
    plugin_SKnTOT: {
        column_id: 'plugin_SKnTOT';
        printable_name: 'User&#39;s Session Information';
    };
    input_pqumDR: {
        column_id: 'input_pqumDR';
        printable_name: 'Social Security Number (SSN)';
    };
    input_DIBnt4: {
        column_id: 'input_DIBnt4';
        printable_name: 'Total Square Footage of Leased Space';
    };
    uniquestring_Xoqb1g: {
        column_id: 'uniquestring_Xoqb1g';
        printable_name: 'Application ID';
    };
    plugin_LsXiVv: {
        column_id: 'plugin_LsXiVv';
        printable_name: 'SQFTOK';
    };
    textarea_RDNJmm: {
        column_id: 'textarea_RDNJmm';
        printable_name: 'Please explain:';
    };
}
export default interface Pipeline {
    items_count: number;
    items: Application[];
    columns: Columns;
}
export {};
