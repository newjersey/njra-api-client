"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissionData = void 0;
function toSubmissionDatum(applicationDatum) {
    const fields = {};
    if (applicationDatum.field_map) {
        applicationDatum.field_map.forEach((appDatum) => {
            fields[appDatum.label] = appDatum.raw_value;
        });
        fields.value = applicationDatum.raw_value;
        return fields;
    }
    return applicationDatum.raw_value;
}
function getSubmissionData(application) {
    const { application_data: applicationData } = application;
    const submission = {};
    Object.values(applicationData).forEach((applicationDatum) => {
        submission[applicationDatum.label] = toSubmissionDatum(applicationDatum);
    });
    return submission;
}
exports.getSubmissionData = getSubmissionData;
