"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INELIGIBILITIES = void 0;
const date_fns_1 = require("date-fns");
const geography_1 = require("./geography");
exports.INELIGIBILITIES = [
    {
        trigger: (app) => !!app.application_data.plugin_AUl2Bf.raw_value && app.application_data.plugin_AUl2Bf.raw_value.includes('Rent'),
        tagName: 'CARES Spent on Rent',
        severity: 'Decline',
    },
    {
        trigger: (app) => app.application_data.plugin_OUnBtf.raw_value === 'No',
        tagName: 'No Adverse Impact',
        severity: 'Decline',
    },
    {
        trigger: (app) => { var _a; return parseInt((_a = app.application_data.input_DIBnt4.raw_value) === null || _a === void 0 ? void 0 : _a.replace(/\D/, '')) > 5000; },
        tagName: 'Property Too Large',
        severity: 'Eligibility Review',
    },
    {
        trigger: (app) => date_fns_1.isBefore(new Date(app.application_data.plugin_v8xLPU.raw_value), new Date('March 1, 2020')),
        tagName: 'Delinquent Before COVID',
        severity: 'Decline',
    },
    {
        trigger: (app) => !!app.application_data.select_figLKP.raw_value &&
            date_fns_1.isPast(date_fns_1.add(new Date(app.application_data.plugin_6tJdOG.raw_value), {
                [app.application_data.select_figLKP.raw_value.toLowerCase()]: parseInt(app.application_data.input_NL2w0I.raw_value),
            })),
        tagName: 'Lease Expired',
        severity: 'Eligibility Review',
    },
    {
        trigger: (app) => !geography_1.eligibleAddress(app.application_data.grp_OaJ6rc),
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
        trigger: (app) => app.application_data.plugin_4HCqsT.raw_value === 'No',
        tagName: 'Standing',
        severity: 'Review',
    },
    {
        trigger: (app) => app.application_data.plugin_bmudle.raw_value === 'Yes',
        tagName: 'Conviction',
        severity: 'Review',
    },
    {
        trigger: (app) => app.application_data.plugin_Cw6e16.raw_value === 'Yes',
        tagName: 'License Decline',
        severity: 'Review',
    },
];
