export declare enum USER_IDS {
    Ross = "BU20071000167727735",
    Jennell = "BU20081000171005582",
    Dawn = "BU20071000167494399",
    Oscar = "BU20081000171006060",
    Diana = "BU20081000171006343",
    Darryl = "BU20081000171005812",
    Leslie = "BU20081000171005690",
    Jackie = "BU20081000171006503",
    Ashley = "BU20081000173096307",
    Cecily = "BU20081000173559642",
    Jarrett = "BU20081000171006577",
    Kayla = "BU20081000173559868",
    Angela = "BU20081000171005904",
    Janet = "BU20081000171005970"
}
export declare const OLD_RECEIVERS: USER_IDS[];
export declare const RECEIVERS: USER_IDS[];
export declare const REVIEWERS: USER_IDS[];
export declare const OLD_ELIGIBILITY_REVIEWERS: USER_IDS[];
export declare const ELIGIBILITY_REVIEWERS: USER_IDS[];
export declare function getReceiver(): USER_IDS;
export declare function getEligibilityReviewer(): USER_IDS;
