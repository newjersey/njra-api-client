"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const config_1 = __importDefault(require("config"));
const pluralize_1 = __importDefault(require("pluralize"));
const documented_1 = require("./documented");
const application_1 = require("./application");
const submission_1 = require("./submission");
const FORM_ID = config_1.default.get('seamless.projectSummaryFormId');
async function prepare({ applicationId, landlortCertId, landlortCertRef, tenantGrantAgreementId, tenantGrantAgreementRef, refsOnly = false, }) {
    let data;
    const refs = {
        SBLEAGP_PJS_ApplicationID: applicationId,
        SBLEAGP_PJS_LCID: landlortCertId,
        SBLEAGP_PJS_LCRef: landlortCertRef,
        SBLEAGP_PJS_TGAID: tenantGrantAgreementId,
        SBLEAGP_PJS_TGARef: tenantGrantAgreementRef,
    };
    if (refsOnly) {
        data = refs;
    }
    else {
        const application = await application_1.getApplication(applicationId);
        const submissionData = submission_1.getSubmissionData(application);
        data = {
            SBLEAGP_PJS_Applicant: submissionData['Name of Business'],
            SBLEAGP_PJS_Nature: submissionData['Nature of Business'],
            SBLEAGP_PJS_Address: submissionData['Business Address']['Street Address'],
            SBLEAGP_PJS_City: submissionData['Business Address'].City,
            SBLEAGP_PJS_OwnerName: `${submissionData['Your Name']['First Name']} + ${submissionData['Your Name']['Last Name']}`,
            // SBLEAGP_PJS_Inception:
            SBLEAGP_PJS_SquareFeet: submissionData['Total Square Footage of Leased Space'],
            SBLEAGP_PJS_LandlordName: submissionData['Landlord Name'],
            SBLEAGP_PJS_LastPayment: submissionData['Date of Last Lease Payment'],
            SBLEAGP_PJS_LeaseExecuted: submissionData['Lease Start Date'],
            // SBLEAGP_PJS_MonthlyLeasePayment:
            SBLEAGP_PJS_LeaseTerm: pluralize_1.default(submissionData['Lease Duration Unit'], parseInt(submissionData['Lease Duration (e.g. 1, 6)'], 10), true),
            ...refs,
        };
    }
    console.log('Preparing a new Project Summary from data:', data);
    const { body } = await documented_1.request('POST', `form/${FORM_ID}/prepare`, data);
    return body;
}
exports.prepare = prepare;
async function main() {
    const responseBody = await prepare({
        applicationId: 'AP20081000171868637',
        landlortCertId: 'abc',
        landlortCertRef: 'def',
        tenantGrantAgreementId: 'ghi',
        tenantGrantAgreementRef: 'jkl',
    });
    console.log(responseBody);
    if (!responseBody.result) {
        throw new Error(JSON.stringify(responseBody.error_log));
    }
}
main();
