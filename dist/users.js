"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEligibilityReviewer = exports.getReceiver = exports.ELIGIBILITY_REVIEWERS = exports.OLD_ELIGIBILITY_REVIEWERS = exports.REVIEWERS = exports.RECEIVERS = exports.OLD_RECEIVERS = exports.USER_IDS = void 0;
var USER_IDS;
(function (USER_IDS) {
    USER_IDS["Ross"] = "BU20071000167727735";
    USER_IDS["Jennell"] = "BU20081000171005582";
    USER_IDS["Dawn"] = "BU20071000167494399";
    USER_IDS["Oscar"] = "BU20081000171006060";
    USER_IDS["Diana"] = "BU20081000171006343";
    USER_IDS["Darryl"] = "BU20081000171005812";
    USER_IDS["Leslie"] = "BU20081000171005690";
    USER_IDS["Jackie"] = "BU20081000171006503";
    USER_IDS["Ashley"] = "BU20081000173096307";
    USER_IDS["Cecily"] = "BU20081000173559642";
    USER_IDS["Jarrett"] = "BU20081000171006577";
    USER_IDS["Kayla"] = "BU20081000173559868";
    USER_IDS["Angela"] = "BU20081000171005904";
    USER_IDS["Janet"] = "BU20081000171005970";
})(USER_IDS = exports.USER_IDS || (exports.USER_IDS = {}));
exports.OLD_RECEIVERS = [USER_IDS.Jackie, USER_IDS.Diana, USER_IDS.Jarrett];
exports.RECEIVERS = [USER_IDS.Jackie, USER_IDS.Diana, USER_IDS.Kayla, USER_IDS.Angela];
exports.REVIEWERS = [USER_IDS.Darryl, USER_IDS.Jennell];
exports.OLD_ELIGIBILITY_REVIEWERS = [USER_IDS.Jennell, USER_IDS.Dawn, USER_IDS.Janet];
exports.ELIGIBILITY_REVIEWERS = [USER_IDS.Janet];
let receiverIndex = 0;
function getReceiver() {
    const user = exports.RECEIVERS[receiverIndex];
    receiverIndex = (receiverIndex + 1) % exports.RECEIVERS.length;
    return user;
}
exports.getReceiver = getReceiver;
let eligibilityReviewerIndex = 0;
function getEligibilityReviewer() {
    const user = exports.ELIGIBILITY_REVIEWERS[eligibilityReviewerIndex];
    eligibilityReviewerIndex = (eligibilityReviewerIndex + 1) % exports.ELIGIBILITY_REVIEWERS.length;
    return user;
}
exports.getEligibilityReviewer = getEligibilityReviewer;
