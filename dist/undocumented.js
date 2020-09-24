"use strict";
/* Methods for interacting with undocumented API. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignSubmission = exports.disassociateTags = exports.disassociateStage = exports.associateTags = exports.associateStage = exports.assignSubmission = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("config"));
const UID = config_1.default.get('seamless.api.undocumented.uid');
const MAID = config_1.default.get('seamless.api.undocumented.maid');
const TOKEN = config_1.default.get('seamless.api.undocumented.token');
const request = async (path, body = {}) => {
    const response = await node_fetch_1.default(`https://backend.prod.seamlessdocs.com/grm/${path}.json`, {
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            authorization: `Bearer ${TOKEN}`,
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            pragma: 'no-cache',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'NJRA API Client (https://github.com/newjersey/njra-api-client)',
            'x-requested-with': 'XMLHttpRequest',
        },
        body: JSON.stringify({
            credentials: { uid: UID, maid: MAID },
            ...body,
        }),
        method: 'POST',
    });
    const responseText = await response.text();
    if (response.status !== 200 || responseText.match(/"failed":\[[^\]]/)) {
        console.log(path, JSON.stringify(body), response.status, response.statusText, responseText);
    }
    return response;
};
const assignSubmission = async (submissionId, userIds) => {
    return request('assignSubmission', {
        shouldSendEmailNotification: false,
        submissionId,
        userIds,
    });
};
exports.assignSubmission = assignSubmission;
const associateStage = async (submissionId, stageName) => {
    return request('stages/associate', {
        submissionId,
        stageName,
    });
};
exports.associateStage = associateStage;
const associateTags = async (submissionId, tagNames) => {
    return request('tags/associate', {
        submissionId,
        tagNames,
    });
};
exports.associateTags = associateTags;
const disassociateStage = async (submissionId, stageName) => {
    return request('stages/disassociate', {
        submissionId,
        stageName,
    });
};
exports.disassociateStage = disassociateStage;
const disassociateTags = async (submissionId, tagNames) => {
    return request('tags/disassociate', {
        submissionId,
        tagNames,
    });
};
exports.disassociateTags = disassociateTags;
const unassignSubmission = async (submissionId, userIds) => {
    return request('unassignSubmission', {
        submissionId,
        userIds,
    });
};
exports.unassignSubmission = unassignSubmission;
