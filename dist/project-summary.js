"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
// import config from 'config';
const countapi_js_1 = __importDefault(require("countapi-js"));
const got_1 = __importDefault(require("got"));
const pluralize_1 = __importDefault(require("pluralize"));
const documented_1 = require("./documented");
const application_1 = require("./application");
const submission_1 = require("./submission");
const form_prepare_1 = require("./form-prepare");
async function getOptionalData(apiKey, apiSecret, params) {
    const refs = {
        SBLEAGP_PJS_GrantNumber: 'SBL-EAGP-' + `${(await countapi_js_1.default.event('njra_project_summary')).value}`.padStart(5, '0'),
        SBLEAGP_PJS_ApplicationID: params.applicationId,
        SBLEAGP_PJS_LCID: params.landlortCertId,
        SBLEAGP_PJS_LCRef: params.landlortCertRef,
        SBLEAGP_PJS_TGAID: params.tenantGrantAgreementId,
        SBLEAGP_PJS_TGARef: params.tenantGrantAgreementRef,
    };
    if (params.refsOnly) {
        return refs;
    }
    const application = await application_1.getApplication(apiKey, apiSecret, params.applicationId);
    const submissionData = submission_1.getSubmissionData(application);
    return {
        SBLEAGP_PJS_Applicant: submissionData['Name of Business'],
        SBLEAGP_PJS_Nature: submissionData['Nature of Business'],
        SBLEAGP_PJS_Address: submissionData['Business Address']['Street Address'],
        SBLEAGP_PJS_City: submissionData['Business Address'].City,
        SBLEAGP_PJS_OwnerName: `${submissionData['Your Name']['First Name']} ${submissionData['Your Name']['Last Name']}`,
        SBLEAGP_PJS_SquareFeet: submissionData['Total Square Footage of Leased Space'],
        SBLEAGP_PJS_LandlordName: submissionData['Landlord Name'],
        SBLEAGP_PJS_LastPayment: submissionData['Date of Last Lease Payment'],
        SBLEAGP_PJS_LeaseExecuted: submissionData['Lease Start Date'],
        SBLEAGP_PJS_LeaseTerm: pluralize_1.default(submissionData['Lease Duration Unit'], parseInt(submissionData['Lease Duration (e.g. 1, 6)'], 10), true),
        ...refs,
    };
}
async function prepare(params, formId, formUrl, apiKey, apiSecret) {
    const data = await getOptionalData(apiKey, apiSecret, params);
    const response = await form_prepare_1.prepareForm(apiKey, apiSecret, formId, data);
    const { application_id: grantId } = response;
    const [inviteUrl] = (await documented_1.request(apiKey, apiSecret, 'POST', `application/${grantId}/get_invite_url`))
        .body;
    console.log(response);
    console.log(`Invite URL for grant ${grantId}:`, inviteUrl);
    // doesn't work (Seamless bug?)
    // console.log(
    //   `Inviting next signer for grant ${grantId}:`,
    //   (
    //     await request(apiKey, spiSecret, 'POST', `application/${grantId}/invite_next_signer`, {
    //       email_index: 0,
    //     })
    //   ).body
    // );
    const dataMess = { data, grantId, inviteUrl };
    await got_1.default.post(formUrl, { json: dataMess });
    return dataMess;
}
exports.prepare = prepare;
// async function main() {
//   const FORM_ID: string = config.get('seamless.projectSummaryFormId');
//   const FLOW_URL: string = config.get('seamless.projectSummaryFlowUrl');
//   const API_KEY: string = config.get('seamless.api.documented.key');
//   const API_SECRET: string = config.get('seamless.api.documented.secret');
//   const responseBody = await prepare(
//     {
//       applicationId: '',
//       landlortCertId: '',
//       landlortCertRef: '',
//       tenantGrantAgreementId: '',
//       tenantGrantAgreementRef: '',
//     },
//     FORM_ID,
//     FLOW_URL,
//     API_KEY,
//     API_SECRET,
//   );
// }
// main();
