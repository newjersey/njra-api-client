import config from 'config';
import countapi from 'countapi-js';
import pluralize from 'pluralize';
import { request } from './documented';
import { getApplication } from './application';
import { getSubmissionData } from './submission';
import { prepareForm, ResponseBodySuccess } from './form-prepare';

const FORM_ID: string = config.get('seamless.projectSummaryFormId');

interface PrepareParams {
  applicationId: string;
  landlortCertId: string;
  landlortCertRef: string;
  tenantGrantAgreementId: string;
  tenantGrantAgreementRef: string;
  refsOnly?: boolean;
}

async function getOptionalData(params: PrepareParams) {
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

  const application = await getApplication(params.applicationId);
  const submissionData = getSubmissionData(application);

  return {
    SBLEAGP_PJS_Applicant: submissionData['Name of Business'],
    SBLEAGP_PJS_Nature: submissionData['Nature of Business'],
    SBLEAGP_PJS_Address: submissionData['Business Address']['Street Address'],
    SBLEAGP_PJS_City: submissionData['Business Address'].City,
    SBLEAGP_PJS_OwnerName: `${submissionData['Your Name']['First Name']} ${submissionData['Your Name']['Last Name']}`,
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

export async function prepare(params: PrepareParams): Promise<ResponseBodySuccess> {
  const data = await getOptionalData(params);
  const response = await prepareForm(FORM_ID, data);
  const { application_id: applicationId } = response;

  console.log(response);
  console.log(
    `Getting invite URL for application ${applicationId}:`,
    (await request('POST', `application/${applicationId}/get_invite_url`)).body
  );
  console.log(
    `Inviting next signer for application ${applicationId}:`,
    (
      await request('POST', `application/${applicationId}/invite_next_signer`, {
        email_index: 2,
      })
    ).body
  );

  return response;
}

async function main() {
  //   const responseBody = await prepare({
  //     applicationId: 'AP20081000171509249',
  //     landlortCertId: 'AP20091000178306590',
  //     landlortCertRef: 'SBLEAGP-LC-00003',
  //     tenantGrantAgreementId: 'AP20091000178305732',
  //     tenantGrantAgreementRef: 'SBLEAGP-TGA-00003',
  //   });
  //   const responseBody = await prepare({
  //     applicationId: 'AP20081000171509266',
  //     landlortCertId: 'AP20091000178340667',
  //     landlortCertRef: 'SBLEAGP-LC-00006',
  //     tenantGrantAgreementId: 'AP20091000178333822',
  //     tenantGrantAgreementRef: 'SBLEAGP-TGA-00006',
  //   });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171509375',
  //   landlortCertId: 'AP20091000178298667',
  //   landlortCertRef: 'SBLEAGP-LC-00002',
  //   tenantGrantAgreementId: 'AP20091000178629638',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00008',
  // });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171509344',
  //   landlortCertId: 'AP20091000178319347',
  //   landlortCertRef: 'SBLEAGP-LC-00004',
  //   tenantGrantAgreementId: 'AP20091000178317921',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00004',
  // });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171509215',
  //   landlortCertId: 'AP20091000178324742',
  //   landlortCertRef: 'SBLEAGP-LC-00005',
  //   tenantGrantAgreementId: 'AP20091000178322667',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00005',
  // });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171509085',
  //   landlortCertId: 'AP20091000178343108',
  //   landlortCertRef: 'SBLEAGP-LC-00007',
  //   tenantGrantAgreementId: 'AP20091000178341946',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00007',
  // });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171544171',
  //   landlortCertId: 'AP20091000178651013',
  //   landlortCertRef: 'SBLEAGP-LC-00008',
  //   tenantGrantAgreementId: 'AP20091000178649018',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00009',
  // });
  // const responseBody = await prepare({
  //   applicationId: 'AP20081000171540270',
  //   landlortCertId: 'AP20091000179333563',
  //   landlortCertRef: 'SBLEAGP-LC-00015',
  //   tenantGrantAgreementId: 'AP20091000179333959',
  //   tenantGrantAgreementRef: 'SBLEAGP-TGA-00015',
  // });
  const responseBody = await prepare({
    applicationId: 'AP20081000171536650',
    landlortCertId: 'AP20091000179390035',
    landlortCertRef: 'SBLEAGP-LC-00022',
    tenantGrantAgreementId: 'AP20091000179389593',
    tenantGrantAgreementRef: 'SBLEAGP-TGA-00022',
  });
  //   const responseBody = await prepare({
  //     applicationId: '',
  //     landlortCertId: '',
  //     landlortCertRef: '',
  //     tenantGrantAgreementId: '',
  //     tenantGrantAgreementRef: '',
  //   });
}

main();
