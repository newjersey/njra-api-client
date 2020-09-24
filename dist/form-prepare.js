"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareForm = void 0;
const documented_1 = require("./documented");
const form_signers_1 = require("./form-signers");
async function getRecipients(apiKey, apiSecret, formId) {
    const signers = await form_signers_1.getSigners(apiKey, apiSecret, formId);
    const signer = signers[0];
    const listEntries = signer.known_list.split('\n');
    const [fullname, email] = listEntries[0].split(', ');
    // could round-robin among the listEntries rather than just using the first
    return {
        [signer.signer_key]: {
            fullname,
            email,
        },
    };
}
async function prepareForm(apiKey, apiSecret, formId, optionalData = {}) {
    const requiredData = {
        recipients: await getRecipients(apiKey, apiSecret, formId),
        signer_data: {
            fullname: 'NJRA',
            email: 'sbleagp@njra.us',
        },
    };
    const data = { ...optionalData, ...requiredData };
    console.log('Preparing a new form from data:', data);
    const { body } = await documented_1.request(apiKey, apiSecret, 'POST', `form/${formId}/prepare`, data);
    if (!body.result) {
        throw new Error(JSON.stringify(body.error_log));
    }
    return body;
}
exports.prepareForm = prepareForm;
