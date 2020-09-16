import { request } from './documented';

interface Signer {
  key: string;
  reference: string;
  known_list: string;
  recipient_custom_message: null;
  can_delegate: 'true' | 'false';
  include_pdf_as_attachment: 't' | 'f';
  include_pdf_as_link: 't' | 'f';
  recipient_type: string;
  order: string;
  color: string;
  signer_type: string;
  signer_key: string;
}

type ResponseBodySuccess = Signer[];

interface ErrorEntry {
  error_code: string; // form_init_error
  error_message: string; // "Form 'x' not found"
  error_description?: string;
}

interface ResponseBodyFailure {
  error: boolean;
  error_log: ErrorEntry[];
}

type ResponseBody = ResponseBodySuccess | ResponseBodyFailure;

export async function getSigners(formId: string): Promise<ResponseBodySuccess> {
  const { body } = await request('GET', `form/${formId}/signers`);

  if (!Array.isArray(body)) {
    throw new Error(JSON.stringify((body as ResponseBodyFailure).error_log));
  }

  return body as ResponseBodySuccess;
}
