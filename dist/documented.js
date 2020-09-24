"use strict";
/* Method for interacting with documented API. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const got_1 = __importDefault(require("got"));
const crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");
const makeAuthHeader = (uri, method, timestamp, apiKey, apiSecret) => {
    const nonce = cryptoRandomString({ length: 10, type: 'base64' });
    const signatureBase = `${method}+/${uri}+${timestamp}+${nonce}`;
    const signature = crypto.createHmac('sha256', apiSecret).update(signatureBase).digest('hex');
    return `api_key=${apiKey} nonce=${nonce} signature=${signature}`;
};
async function request(apiKey, apiSecret, method, uri, json) {
    var _a, _b;
    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    try {
        return await got_1.default(uri, {
            http2: true,
            headers: {
                AuthDate: timestamp,
                Authorization: makeAuthHeader(uri, method, timestamp, apiKey, apiSecret),
                'user-agent': 'NJRA API Client (https://github.com/newjersey/njra-api-client)',
            },
            json,
            method,
            prefixUrl: 'https://njra.seamlessdocs.com/api',
            responseType: 'json',
        });
    }
    catch (error) {
        console.log(error);
        console.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusCode, (_b = error.response) === null || _b === void 0 ? void 0 : _b.body);
        console.log(error.request);
        return Promise.reject(error);
    }
}
exports.request = request;
