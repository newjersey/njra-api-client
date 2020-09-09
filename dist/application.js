"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
const documented_1 = require("./documented");
async function getApplication(applicationId) {
    const { body } = await documented_1.request('POST', `application/${applicationId}`);
    return body;
}
exports.getApplication = getApplication;
