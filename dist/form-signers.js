"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigners = void 0;
const documented_1 = require("./documented");
async function getSigners(apiKey, apiSecret, formId) {
    const { body } = await documented_1.request(apiKey, apiSecret, 'GET', `form/${formId}/signers`);
    if (!Array.isArray(body)) {
        throw new Error(JSON.stringify(body.error_log));
    }
    return body;
}
exports.getSigners = getSigners;
