import config from 'config';
import pluralize from 'pluralize';
import { request } from './documented';
import { getApplication } from './application';
import { getSubmissionData } from './submission';
import { Body } from 'node-fetch';

const FORM_ID: string = config.get('seamless.projectSummaryFormId');

interface ResponseBodyBase {
  result: boolean;
}

interface ResponseBodySuccess extends ResponseBodyBase {
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

export async function prepare({
  applicationId,
  landlortCertId,
  landlortCertRef,
  tenantGrantAgreementId,
  tenantGrantAgreementRef,
  refsOnly = false,
}: {
  applicationId: string;
  landlortCertId: string;
  landlortCertRef: string;
  tenantGrantAgreementId: string;
  tenantGrantAgreementRef: string;
  refsOnly?: boolean;
}): Promise<ResponseBody> {
  let data;
  const refs = {
    SBLEAGP_PJS_ApplicationID: applicationId,
    SBLEAGP_PJS_LCID: landlortCertId,
    SBLEAGP_PJS_LCRef: landlortCertRef,
    SBLEAGP_PJS_TGAID: tenantGrantAgreementId,
    SBLEAGP_PJS_TGARef: tenantGrantAgreementRef,
  };

  if (refsOnly) {
    data = refs;
  } else {
    const application = await getApplication(applicationId);
    const submissionData = getSubmissionData(application);

    data = {
      SBLEAGP_PJS_Applicant: submissionData['Name of Business'],
      SBLEAGP_PJS_Nature: submissionData['Nature of Business'],
      SBLEAGP_PJS_Address: submissionData['Business Address']['Street Address'],
      SBLEAGP_PJS_City: submissionData['Business Address'].City,
      SBLEAGP_PJS_OwnerName: `${submissionData['Your Name']['First Name']} + ${submissionData['Your Name']['Last Name']}`,
      // SBLEAGP_PJS_Inception:
      SBLEAGP_PJS_SquareFeet: submissionData['Total Square Footage of Leased Space'],
      SBLEAGP_PJS_LandlordName: submissionData['Landlord Name'],
      SBLEAGP_PJS_LastPayment: submissionData['Date of Last Lease Payment'],
      SBLEAGP_PJS_LeaseExecuted: submissionData['Lease Start Date'],
      // SBLEAGP_PJS_MonthlyLeasePayment:
      SBLEAGP_PJS_LeaseTerm: pluralize(
        submissionData['Lease Duration Unit'],
        parseInt(submissionData['Lease Duration (e.g. 1, 6)'], 10),
        true
      ),
      ...refs,
    };
  }

  console.log('Preparing a new Project Summary from data:', data);

  const { body } = await request('POST', `form/${FORM_ID}/prepare`, data);

  return body as ResponseBody;
}

async function main() {
  const responseBody = await prepare({
    applicationId: 'AP20081000171868637',
    landlortCertId: 'abc',
    landlortCertRef: 'def',
    tenantGrantAgreementId: 'ghi',
    tenantGrantAgreementRef: 'jkl',
  });

  console.log(responseBody);

  if (!responseBody.result) {
    throw new Error(JSON.stringify((responseBody as ResponseBodyFailure).error_log));
  }
}

main();
