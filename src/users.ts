export enum USER_IDS {
  Ross = 'BU20071000167727735',
  Jennell = 'BU20081000171005582',
  Dawn = 'BU20071000167494399',
  Oscar = 'BU20081000171006060',
  Elly = 'BU20081000171005970',
  Diana = 'BU20081000171006343',
  Sharon = 'BU20081000171005904',
  Darryl = 'BU20081000171005812',
  Kim = 'BU20081000171005764',
  Leslie = 'BU20081000171005690',
  Jarrett = 'BU20081000171006577',
  Jackie = 'BU20081000171006503',
  Ashley = 'BU20081000173096307',
}

export const RECEIVERS = [USER_IDS.Jackie, USER_IDS.Jarrett, USER_IDS.Diana];
export const REVIEWERS = [USER_IDS.Darryl, USER_IDS.Jennell];

let receiverIndex = 0;
export function getReceiver(): USER_IDS {
  const receiver = RECEIVERS[receiverIndex];

  receiverIndex = (receiverIndex + 1) % RECEIVERS.length;

  return receiver;
}
