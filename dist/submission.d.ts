import { Application } from './application';
interface SubmissionData {
    'Your Name': {
        'First Name': string;
        'Last Name': string;
        value: string;
    };
    Email: string;
    'Phone Number': string;
    'Name of Business': string;
    'Business Address': {
        'Street Address': string;
        'Business Address': '';
        City: string;
        State: string;
        Zip: string;
        value: string;
    };
    'Nature of Business': string;
    'Does your business have a federal Employer Identification Number (EIN)?': 'Yes' | 'No';
    'Employer Identification Number (EIN)': string;
    'Landlord Name': string;
    'Landlord Phone Number': string;
    'Landlord Email': string;
    'Lease Start Date': string;
    'Lease Duration (e.g. 1, 6)': string;
    'Lease Duration Unit': 'Years' | 'Months';
    'Date of Last Lease Payment': string;
    'Please upload a copy of your lease': {
        'LEASE A&amp;amp;B DENTAL LABORATORY 2.pdf': string;
        '': string;
        value: string;
    };
    'Amount Requested (not to exceed $10,000)': string;
    'Has your business been adversely impacted by COVID-19?': 'Yes' | 'No';
    'How has your business been adversely impacted by COVID-19?': string;
    'Has your business received CARES Act (Coronavirus Relief Fund) financial assistance (local/county/state/federal) for lease payments (rent) as a result of COVID-19?': 'Yes' | 'No';
    'Building Type': string;
    'Total Square Footage of Leased Space': string;
    'Is your business in good standing with the State of New Jersey?': 'Yes' | 'No';
    'Have you been convicted and/or found guilty and/or pled guilty and/or found liable and/or paid a fine or otherwise paid to settle any allegations made by the government in any court to any violation of law, other than minor traffic offenses?': 'Yes' | 'No';
    'Have you been denied a license or permit required to engage in its business or profession or has any such license or permit or been suspended or revoked by any government?': 'Yes' | 'No';
    'Signature Data': {
        'Sign Here': '';
        value: string;
    };
    'Application ID (ignore)': string;
    'Internal Codes (ignore)': 'SQFTOK' | 'SQFTNOK';
    'User&#39;s Session Information': {
        'User&amp;amp;#39;s Session Information': string;
        value: string;
    };
}
export declare function getSubmissionData(application: Application): SubmissionData;
export {};
