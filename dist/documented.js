"use strict";
/* Method for interacting with documented API. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const got_1 = __importDefault(require("got"));
const config_1 = __importDefault(require("config"));
const crypto = require("crypto");
const cryptoRandomString = require("crypto-random-string");
const KEY = config_1.default.get('seamless.api.documented.key');
const SECRET = config_1.default.get('seamless.api.documented.secret');
const makeAuthHeader = (uri, method, timestamp) => {
    const nonce = cryptoRandomString({ length: 10, type: 'base64' });
    const signatureBase = `${method}+/${uri}+${timestamp}+${nonce}`;
    const signature = crypto.createHmac('sha256', SECRET).update(signatureBase).digest('hex');
    return `api_key=${KEY} nonce=${nonce} signature=${signature}`;
};
async function request(method, uri, json) {
    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    try {
        return await got_1.default(uri, {
            http2: true,
            headers: {
                AuthDate: timestamp,
                Authorization: makeAuthHeader(uri, method, timestamp),
                'user-agent': 'NJRA API Client (https://github.com/newjersey/njra-api-client)',
            },
            json,
            method,
            prefixUrl: 'https://njra.seamlessdocs.com/api',
            responseType: 'json',
        });
    }
    catch (error) {
        console.log(error.response.statusCode, error.response.body);
        console.log(error.request);
        return Promise.reject(error);
    }
}
exports.request = request;
