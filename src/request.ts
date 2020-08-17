import got, { Response } from 'got';

import config from 'config';
import crypto from 'crypto';
import cryptoRandomString from 'crypto-random-string';

type method =
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

const key: string = config.get('seamless.api.key');
const secret: string = config.get('seamless.api.secret');

const makeAuthHeader = (uri: string, method: method, timestamp: string) => {
  const nonce = cryptoRandomString({ length: 10, type: 'base64' });
  const signatureBase = `${method}+/${uri}+${timestamp}+${nonce}`;
  const signature = crypto.createHmac('sha256', secret).update(signatureBase).digest('hex');

  return `api_key=${key} nonce=${nonce} signature=${signature}`;
};

export default async function makeRequest(method: method, uri: string): Promise<Response> {
  const timestamp = `${Math.floor(Date.now() / 1000)}`;

  try {
    return await got(uri, {
      http2: true,
      headers: {
        AuthDate: timestamp,
        Authorization: makeAuthHeader(uri, method, timestamp),
        'user-agent': 'NJRA API Client (https://github.com/newjersey/njra-api-client)',
      },
      method,
      prefixUrl: 'https://njra.seamlessdocs.com/api',
    });
  } catch (error) {
    console.log(error.response.statusCode, error.response.body);
    console.log(error.request);
    return Promise.reject(error);
  }
}
