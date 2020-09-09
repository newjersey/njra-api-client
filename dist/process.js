"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undocumented_1 = require("./undocumented");
const config_1 = __importDefault(require("config"));
const documented_1 = require("./documented");
const users_1 = require("./users");
const ineligibility_1 = require("./ineligibility");
const START = 1000;
const LIMIT = 2000; // max count, not max ID
const FORM_ID = config_1.default.get('seamless.formId');
const eins = new Set();
let count = 0;
let n = START;
async function processApplication(application) {
    const promises = [];
    console.log(`${++count} (#${n++})`);
    // determine eligibility
    const tags = ineligibility_1.INELIGIBILITIES.filter((ineligibility) => ineligibility.trigger(application, eins));
    // clear existing data
    await Promise.all([
        undocumented_1.unassignSubmission(application.application_id, users_1.OLD_RECEIVERS),
        // unassignSubmission(application.application_id, REVIEWERS), // causes a 500 error, but don't need since they're not randomly assigned
        undocumented_1.unassignSubmission(application.application_id, users_1.OLD_ELIGIBILITY_REVIEWERS),
        undocumented_1.disassociateStage(application.application_id, 'Received'),
        undocumented_1.disassociateStage(application.application_id, 'Lease Review'),
        undocumented_1.disassociateStage(application.application_id, 'Eligibility Review'),
        undocumented_1.disassociateStage(application.application_id, 'Additional Review'),
        undocumented_1.disassociateStage(application.application_id, 'Ineligible'),
        undocumented_1.disassociateTags(application.application_id, ineligibility_1.INELIGIBILITIES.map((i) => i.tagName)),
    ]);
    // set tags
    if (tags.length) {
        promises.push(undocumented_1.associateTags(application.application_id, tags.map((ineligibility) => ineligibility.tagName)));
    }
    // set stage and assignments
    if (tags.filter((ineligibility) => ineligibility.severity === 'Decline').length) {
        // Decline
        promises.push(undocumented_1.associateStage(application.application_id, 'Ineligible'));
    }
    else if (tags.filter((ineligibility) => ineligibility.severity === 'Eligibility Review').length) {
        // Eligibility Review
        promises.push(undocumented_1.associateStage(application.application_id, 'Eligibility Review'));
        promises.push(undocumented_1.assignSubmission(application.application_id, [users_1.getEligibilityReviewer(), users_1.getReceiver()]));
    }
    else if (tags.filter((ineligibility) => ineligibility.severity === 'Review').length) {
        // Review
        promises.push(undocumented_1.associateStage(application.application_id, 'Additional Review'));
        promises.push(undocumented_1.assignSubmission(application.application_id, users_1.REVIEWERS));
    }
    else {
        // Passes
        promises.push(undocumented_1.associateStage(application.application_id, 'Lease Review'));
        promises.push(undocumented_1.assignSubmission(application.application_id, [users_1.getReceiver()]));
    }
    return Promise.all(promises);
}
async function processBatch(offset) {
    const response = await documented_1.request('POST', `form/${FORM_ID}/pipeline`, {
        full_list: true,
        order_by: 'created_ts',
        order_by_direction: 'ASC',
        offset,
    });
    const pipeline = response.body;
    const { items } = pipeline;
    for (let i = 0; i < items.length; i++) {
        if (count >= LIMIT) {
            return 0;
        }
        await processApplication(items[i]);
    }
    return items.length;
}
async function main() {
    let offset = START;
    let isComplete = false;
    try {
        do {
            console.log(`\nProcessing batch of ${LIMIT} starting at ${offset}...`);
            const n = await processBatch(offset);
            offset += n;
            isComplete = n === 0;
        } while (!isComplete);
    }
    catch (error) {
        console.log('ERROR', error.message);
    }
}
main();
