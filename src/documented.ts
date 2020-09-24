/* Method for interacting with documented API. */

import got, { Response } from 'got';

import crypto = require('crypto');
import cryptoRandomString = require('crypto-random-string');

type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'head'
  | 'delete'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'
  | 'TRACE'
  | 'options'
  | 'trace'
  | undefined;

const makeAuthHeader = (uri: string, method: Method, timestamp: string, apiKey: string, apiSecret: string) => {
  const nonce = cryptoRandomString({ length: 10, type: 'base64' });
  const signatureBase = `${method}+/${uri}+${timestamp}+${nonce}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(signatureBase).digest('hex');

  return `api_key=${apiKey} nonce=${nonce} signature=${signature}`;
};

export async function request(
  apiKey: string,
  apiSecret: string,
  method: Method,
  uri: string,
  json?: Record<string, unknown>
): Promise<Response> {
  const timestamp = `${Math.floor(Date.now() / 1000)}`;

  try {
    return await got(uri, {
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
  } catch (error) {
    console.log(error);
    console.log(error.response?.statusCode, error.response?.body);
    console.log(error.request);
    return Promise.reject(error);
  }
}
