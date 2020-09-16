import { request } from './documented';
import { getSigners } from './form-signers';

interface Recipient {
  fullname: string;
  email: string;
}

type Recipients = Record<string, Recipient>;

interface RequiredData {
  signer_data: {
    fullname: string;
    email: string;
  };
  recipients: Recipients;
}

interface ResponseBodyBase {
  result: boolean;
}

export interface ResponseBodySuccess extends ResponseBodyBase {
  application_id: string;
  description: string; // 'Submission successful'
}

interface ErrorEntry {
  error_code: string; // submission_halt
  error_message: string; // "Error executing signature workflow: Unable to find recipient info of the next signer '71f0d6844867a206d837f6728ddb545b'"
  error_description: string; // submission:execute
}

interface ResponseBodyFailure extends ResponseBodyBase {
  error_log: ErrorEntry[];
}

type ResponseBody = ResponseBodySuccess | ResponseBodyFailure;

async function getRecipients(formId: string): Promise<Recipients> {
  const signers = await getSigners(formId);
  const signer = signers[0];
  const listEntries = signer.known_list.split('\n');
  const [fullname, email] = listEntries[2].split(', ');

  // could round-robin among the listEntries rather than just using the first
  return {
    [signer.signer_key]: {
      fullname,
      email,
    },
  };
}

export async function prepareForm(formId: string, optionalData = {}): Promise<ResponseBodySuccess> {
  const requiredData: RequiredData = {
    recipients: await getRecipients(formId),
    signer_data: {
      fullname: 'NJRA',
      email: 'sbleagp@njra.us',
    },
  };

  const data = { ...optionalData, ...requiredData };

  console.log('Preparing a new form from data:', data);

  const { body } = await request('POST', `form/${formId}/prepare`, data);

  if (!(body as ResponseBody).result) {
    throw new Error(JSON.stringify((body as ResponseBodyFailure).error_log));
  }

  return body as ResponseBodySuccess;
}
