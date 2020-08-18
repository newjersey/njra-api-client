/* Methods for interacting with undocumented API. */

import fetch, { Response } from 'node-fetch';

import config from 'config';

const UID: string = config.get('seamless.api.undocumented.uid');
const MAID: string = config.get('seamless.api.undocumented.maid');
const TOKEN: string = config.get('seamless.api.undocumented.token');

const request = async (path: string, body: Record<string, unknown> = {}): Promise<Response> => {
  const response = await fetch(`https://backend.prod.seamlessdocs.com/grm/${path}.json`, {
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

const assignSubmission = async (submissionId: string, userIds: string[]): Promise<Response> => {
  return request('assignSubmission', {
    shouldSendEmailNotification: false,
    submissionId,
    userIds,
  });
};

const associateStage = async (submissionId: string, stageName: string): Promise<Response> => {
  return request('stages/associate', {
    submissionId,
    stageName,
  });
};

const associateTags = async (submissionId: string, tagNames: string[]): Promise<Response> => {
  return request('tags/associate', {
    submissionId,
    tagNames,
  });
};

const disassociateStage = async (submissionId: string, stageName: string): Promise<Response> => {
  return request('stages/disassociate', {
    submissionId,
    stageName,
  });
};

const disassociateTags = async (submissionId: string, tagNames: string[]): Promise<Response> => {
  return request('tags/disassociate', {
    submissionId,
    tagNames,
  });
};

const unassignSubmission = async (submissionId: string, userIds: string[]): Promise<Response> => {
  return request('unassignSubmission', {
    submissionId,
    userIds,
  });
};

export { assignSubmission, associateStage, associateTags, disassociateStage, disassociateTags, unassignSubmission };
