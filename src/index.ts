import {
  assignSubmission,
  associateStage,
  associateTags,
  disassociateStage,
  disassociateTags,
  unassignSubmission,
} from './undocumented';

import Pipeline, { Application } from './Pipeline';
import config from 'config';
import { request } from './documented';
import { Response } from 'node-fetch';
import { getEligibilityReviewer, getReceiver, RECEIVERS, REVIEWERS } from './users';
import { INELIGIBILITIES } from './ineligibility';

const START = 1000;
const LIMIT = 2000; // max count, not max ID
const FORM_ID: string = config.get('seamless.formId');

const eins: Set<string> = new Set();
let count = 0;
let n = START;

async function processApplication(application: Application): Promise<Response[]> {
  const promises: Promise<Response>[] = [];

  console.log(`${++count} (#${n++})`);

  // determine eligibility
  const tags = INELIGIBILITIES.filter((ineligibility) => ineligibility.trigger(application, eins));

  // clear existing data
  await Promise.all([
    unassignSubmission(application.application_id, RECEIVERS),
    // unassignSubmission(application.application_id, REVIEWERS), // causes a 500 error, but don't need since they're not randomly assigned
    // unassignSubmission(application.application_id, ELIGIBILITY_REVIEWERS), // also causes a 500 error, don't know why
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
}

async function processBatch(offset: number): Promise<number> {
  const response = await request('POST', `form/${FORM_ID}/pipeline`, {
    full_list: true,
    order_by: 'created_ts',
    order_by_direction: 'ASC',
    offset,
  });
  const pipeline = <Pipeline>response.body;
  const { items } = pipeline;

  for (let i = 0; i < items.length; i++) {
    if (count >= LIMIT) {
      return 0;
    }

    await processApplication(items[i]);
  }

  return items.length;
}

async function main(): Promise<void> {
  let offset = START;
  let isComplete = false;

  try {
    do {
      console.log(`\nProcessing batch of ${LIMIT} starting at ${offset}...`);
      const n = await processBatch(offset);
      offset += n;
      isComplete = n === 0;
    } while (!isComplete);
  } catch (error) {
    console.log('ERROR', error.message);
  }
}

main();
