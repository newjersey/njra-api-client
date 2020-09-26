import {
  assignSubmission,
  associateStage,
  associateTags,
  disassociateStage,
  disassociateTags,
  unassignSubmission,
} from './undocumented';

import { Application } from './Pipeline';
import { Response } from 'node-fetch';
import { getEligibilityReviewer, getReceiver, REVIEWERS, OLD_RECEIVERS, OLD_ELIGIBILITY_REVIEWERS } from './users';
import { INELIGIBILITIES } from './ineligibility';
import mapApplications from './map-applications';

const eins: Set<string> = new Set();

const mapFunc = async (application: Application, offset: number, count: number): Promise<Response[]> => {
  const promises: Promise<Response>[] = [];

  console.log(`${count} (#${offset})`);

  // determine eligibility
  const tags = INELIGIBILITIES.filter((ineligibility) => ineligibility.trigger(application, eins));

  // clear existing data
  await Promise.all([
    unassignSubmission(application.application_id, OLD_RECEIVERS),
    // unassignSubmission(application.application_id, REVIEWERS), // causes a 500 error, but don't need since they're not randomly assigned
    unassignSubmission(application.application_id, OLD_ELIGIBILITY_REVIEWERS), // also causes a 500 error, don't know why
    disassociateStage(application.application_id, 'Received'),
    disassociateStage(application.application_id, 'Lease Review'),
    disassociateStage(application.application_id, 'Eligibility Review'),
    disassociateStage(application.application_id, 'Additional Review'),
    disassociateStage(application.application_id, 'Ineligible'),
    disassociateTags(
      application.application_id,
      INELIGIBILITIES.map((i) => i.tagName)
    ),
  ]);

  // set tags
  if (tags.length) {
    promises.push(
      associateTags(
        application.application_id,
        tags.map((ineligibility) => ineligibility.tagName)
      )
    );
  }

  // set stage and assignments
  if (tags.filter((ineligibility) => ineligibility.severity === 'Decline').length) {
    // Decline
    promises.push(associateStage(application.application_id, 'Ineligible'));
  } else if (tags.filter((ineligibility) => ineligibility.severity === 'Eligibility Review').length) {
    // Eligibility Review
    promises.push(associateStage(application.application_id, 'Eligibility Review'));
    promises.push(assignSubmission(application.application_id, [getEligibilityReviewer(), getReceiver()]));
  } else if (tags.filter((ineligibility) => ineligibility.severity === 'Review').length) {
    // Review
    promises.push(associateStage(application.application_id, 'Additional Review'));
    promises.push(assignSubmission(application.application_id, REVIEWERS));
  } else {
    // Passes
    promises.push(associateStage(application.application_id, 'Lease Review'));
    promises.push(assignSubmission(application.application_id, [getReceiver()]));
  }

  return Promise.all(promises);
};

function main() {
  mapApplications({ start: 1000, limit: 2000, mapFunc });
}

main();
