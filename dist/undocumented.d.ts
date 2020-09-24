import { Response } from 'node-fetch';
declare const assignSubmission: (submissionId: string, userIds: string[]) => Promise<Response>;
declare const associateStage: (submissionId: string, stageName: string) => Promise<Response>;
declare const associateTags: (submissionId: string, tagNames: string[]) => Promise<Response>;
declare const disassociateStage: (submissionId: string, stageName: string) => Promise<Response>;
declare const disassociateTags: (submissionId: string, tagNames: string[]) => Promise<Response>;
declare const unassignSubmission: (submissionId: string, userIds: string[]) => Promise<Response>;
export { assignSubmission, associateStage, associateTags, disassociateStage, disassociateTags, unassignSubmission };
