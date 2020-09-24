// import config from 'config';
import countapi from 'countapi-js';
import got from 'got';
import pluralize from 'pluralize';
import { request } from './documented';
import { getApplication } from './application';
import { getSubmissionData } from './submission';
import { prepareForm, ResponseBodySuccess } from './form-prepare';

interface PrepareParams {
  applicationId: string;
  landlortCertId: string;
  landlortCertRef: string;
  tenantGrantAgreementId: string;
  tenantGrantAgreementRef: string;
  refsOnly?: boolean;
}

interface OptionalDataRefs {
  SBLEAGP_PJS_GrantNumber: string;
  SBLEAGP_PJS_ApplicationID: string;
  SBLEAGP_PJS_LCID: string;
  SBLEAGP_PJS_LCRef: string;
  SBLEAGP_PJS_TGAID: string;
  SBLEAGP_PJS_TGARef: string;
}

interface OptionalDataExtended extends OptionalDataRefs {
  SBLEAGP_PJS_Applicant: string;
  SBLEAGP_PJS_Nature: string;
  SBLEAGP_PJS_Address: string;
  SBLEAGP_PJS_City: string;
  SBLEAGP_PJS_OwnerName: string;
  SBLEAGP_PJS_SquareFeet: string;
  SBLEAGP_PJS_LandlordName: string;
  SBLEAGP_PJS_LastPayment: string;
  SBLEAGP_PJS_LeaseExecuted: string;
  SBLEAGP_PJS_LeaseTerm: string;
}

type OptionalData = OptionalDataRefs | OptionalDataExtended;

async function getOptionalData(apiKey: string, apiSecret: string, params: PrepareParams): Promise<OptionalData> {
  const refs = {
    SBLEAGP_PJS_GrantNumber: 'SBL-EAGP-' + `${(await countapi.event('njra_project_summary')).value}`.padStart(5, '0'),
    SBLEAGP_PJS_ApplicationID: params.applicationId,
    SBLEAGP_PJS_LCID: params.landlortCertId,
    SBLEAGP_PJS_LCRef: params.landlortCertRef,
    SBLEAGP_PJS_TGAID: params.tenantGrantAgreementId,
    SBLEAGP_PJS_TGARef: params.tenantGrantAgreementRef,
  };

  if (params.refsOnly) {
    return refs;
  }

  const application = await getApplication(apiKey, apiSecret, params.applicationId);
  const submissionData = getSubmissionData(application);

  return {
    SBLEAGP_PJS_Applicant: submissionData['Name of Business'],
    SBLEAGP_PJS_Nature: submissionData['Nature of Business'],
    SBLEAGP_PJS_Address: submissionData['Business Address']['Street Address'],
    SBLEAGP_PJS_City: submissionData['Business Address'].City,
    SBLEAGP_PJS_OwnerName: `${submissionData['Your Name']['First Name']} ${submissionData['Your Name']['Last Name']}`,
    SBLEAGP_PJS_SquareFeet: submissionData['Total Square Footage of Leased Space'],
    SBLEAGP_PJS_LandlordName: submissionData['Landlord Name'],
    SBLEAGP_PJS_LastPayment: submissionData['Date of Last Lease Payment'],
    SBLEAGP_PJS_LeaseExecuted: submissionData['Lease Start Date'],
    SBLEAGP_PJS_LeaseTerm: pluralize(
      submissionData['Lease Duration Unit'],
      parseInt(submissionData['Lease Duration (e.g. 1, 6)'], 10),
      true
    ),
    ...refs,
  };
}

interface PrepareResponse {
  data: OptionalData;
  response: ResponseBodySuccess;
}

export async function prepare(
  params: PrepareParams,
  formId: string,
  formUrl: string,
  apiKey: string,
  apiSecret: string
): Promise<{
  data: OptionalData;
  grantId: string;
  inviteUrl: string;
}> {
  const data = await getOptionalData(apiKey, apiSecret, params);
  const response = await prepareForm(apiKey, apiSecret, formId, data);
  const { application_id: grantId } = response;
  const [inviteUrl] = (await request(apiKey, apiSecret, 'POST', `application/${grantId}/get_invite_url`))
    .body as string[];

  console.log(response);
  console.log(`Invite URL for grant ${grantId}:`, inviteUrl);

  // doesn't work (Seamless bug?)
  // console.log(
  //   `Inviting next signer for grant ${grantId}:`,
  //   (
  //     await request(apiKey, spiSecret, 'POST', `application/${grantId}/invite_next_signer`, {
  //       email_index: 0,
  //     })
  //   ).body
  // );

  const dataMess = { data, grantId, inviteUrl };

  await got.post(formUrl, { json: dataMess });

  return dataMess;
}

// async function main() {
//   const FORM_ID: string = config.get('seamless.projectSummaryFormId');
//   const FLOW_URL: string = config.get('seamless.projectSummaryFlowUrl');
//   const API_KEY: string = config.get('seamless.api.documented.key');
//   const API_SECRET: string = config.get('seamless.api.documented.secret');

//   const responseBody = await prepare(
//     {
//       applicationId: '',
//       landlortCertId: '',
//       landlortCertRef: '',
//       tenantGrantAgreementId: '',
//       tenantGrantAgreementRef: '',
//     },
//     FORM_ID,
//     FLOW_URL,
//     API_KEY,
//     API_SECRET,
//   );
// }

// main();
