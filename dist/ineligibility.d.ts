import { Application } from './Pipeline';
interface Ineligibility {
    trigger(application: Application, eins?: Set<string>): boolean;
    tagName: string;
    severity: 'Decline' | 'Review' | 'Eligibility Review';
}
export declare const INELIGIBILITIES: Ineligibility[];
export {};
