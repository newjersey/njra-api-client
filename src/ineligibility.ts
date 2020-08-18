import { add, isBefore, isPast } from 'date-fns';

import { Application } from './Pipeline';
import { eligibleAddress } from './geography';

interface Ineligibility {
  trigger(application: Application, eins?: Set<string>): boolean;
  tagName: string;
  severity: 'Decline' | 'Review';
}

export const INELIGIBILITIES: Ineligibility[] = [
  {
    trigger: (app: Application): boolean =>
      !!app.application_data.plugin_AUl2Bf.raw_value && app.application_data.plugin_AUl2Bf.raw_value.includes('Rent'),
    tagName: 'CARES Spent on Rent',
    severity: 'Decline',
  },
  {
    trigger: (app: Application): boolean => app.application_data.plugin_OUnBtf.raw_value === 'No',
    tagName: 'No Adverse Impact',
    severity: 'Decline',
  },
  {
    trigger: (app: Application): boolean =>
      parseInt(app.application_data.input_DIBnt4.raw_value.replace(/\D/, '')) > 5000,
    tagName: 'Property Too Large',
    severity: 'Decline',
  },
  {
    trigger: (app: Application): boolean =>
      isBefore(new Date(app.application_data.plugin_v8xLPU.raw_value), new Date('March 1, 2020')),
    tagName: 'Delinquent Before COVID',
    severity: 'Decline',
  },
  {
    trigger: (app: Application): boolean =>
      !!app.application_data.select_figLKP.raw_value &&
      isPast(
        add(new Date(app.application_data.plugin_6tJdOG.raw_value), {
          [app.application_data.select_figLKP.raw_value.toLowerCase()]: parseInt(
            app.application_data.input_NL2w0I.raw_value
          ),
        })
      ),
    tagName: 'Lease Expired',
    severity: 'Decline',
  },
  {
    trigger: (app: Application): boolean => !eligibleAddress(app.application_data.grp_OaJ6rc),
    tagName: 'Ineligible Zip',
    severity: 'Decline',
  },
  // {
  //   trigger: (app: Application, eins): boolean =>
  //     (!!app.application_data.input_ou1s8P && eins?.has(app.application_data.input_ou1s8P)) ||
  //     (!!app.application_data.input_ou1s8P && eins?.has(app.application_data.input_ou1s8P)),
  //   tagName: 'Duplicate',
  //   severity: 'Decline',
  // },
  {
    trigger: (app: Application): boolean => app.application_data.plugin_4HCqsT.raw_value === 'No',
    tagName: 'Standing',
    severity: 'Review',
  },
  {
    trigger: (app: Application): boolean => app.application_data.plugin_bmudle.raw_value === 'Yes',
    tagName: 'Conviction',
    severity: 'Review',
  },
  {
    trigger: (app: Application): boolean => app.application_data.plugin_Cw6e16.raw_value === 'Yes',
    tagName: 'License Decline',
    severity: 'Review',
  },
];
