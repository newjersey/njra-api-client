"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
const documented_1 = require("./documented");
async function getApplication(apiKey, apiSecret, applicationId) {
    const { body } = await documented_1.request(apiKey, apiSecret, 'POST', `application/${applicationId}`);
    return body;
}
exports.getApplication = getApplication;
