export enum USER_IDS {
  Ross = 'BU20071000167727735',
  Jennell = 'BU20081000171005582',
  Dawn = 'BU20071000167494399',
  Oscar = 'BU20081000171006060',
  Diana = 'BU20081000171006343',
  Darryl = 'BU20081000171005812',
  Leslie = 'BU20081000171005690',
  Jackie = 'BU20081000171006503',
  Ashley = 'BU20081000173096307',
  Cecily = 'BU20081000173559642',
  Jarrett = 'BU20081000171006577',
  Kayla = 'BU20081000173559868',
  Angela = 'BU20081000171005904',
  Janet = 'BU20081000171005970',
}

export const OLD_RECEIVERS = [USER_IDS.Jackie, USER_IDS.Diana, USER_IDS.Jarrett];
export const RECEIVERS = [USER_IDS.Jackie, USER_IDS.Diana, USER_IDS.Kayla, USER_IDS.Angela];

export const REVIEWERS = [USER_IDS.Darryl, USER_IDS.Jennell];

export const OLD_ELIGIBILITY_REVIEWERS = [USER_IDS.Jennell, USER_IDS.Dawn, USER_IDS.Janet];
export const ELIGIBILITY_REVIEWERS = [USER_IDS.Janet];

let receiverIndex = 0;
export function getReceiver(): USER_IDS {
  const user = RECEIVERS[receiverIndex];

  receiverIndex = (receiverIndex + 1) % RECEIVERS.length;

  return user;
}

let eligibilityReviewerIndex = 0;
export function getEligibilityReviewer(): USER_IDS {
  const user = ELIGIBILITY_REVIEWERS[eligibilityReviewerIndex];

  eligibilityReviewerIndex = (eligibilityReviewerIndex + 1) % ELIGIBILITY_REVIEWERS.length;

  return user;
}
