import fs from 'fs';
import path from 'path';
import neatCsv from 'neat-csv';
import stringSimilarity from 'string-similarity';

import { Application } from './Pipeline';
import mapApplications from './map-applications';

interface SamsExclusionRecord {
  readonly Classification: string;
  readonly Name: string;
  readonly Prefix: string;
  readonly First: string;
  readonly Middle: string;
  readonly Last: string;
  readonly Suffix: string;
  readonly 'Address 1': string;
  readonly 'Address 2': string;
  readonly 'Address 3': string;
  readonly 'Address 4': string;
  readonly City: string;
  readonly 'State / Province': string;
  readonly Country: string;
  readonly 'Zip Code': string;
  readonly DUNS: string;
  readonly 'Exclusion Program': string;
  readonly 'Excluding Agency': string;
  readonly 'CT Code': string;
  readonly 'Exclusion Type': string;
  readonly 'Additional Comments': string;
  readonly 'Active Date': string;
  readonly 'Termination Date': string;
  readonly 'Record Status': string;
  readonly 'Cross-Reference': string;
  readonly 'SAM Number': string;
  readonly CAGE: string;
  readonly NPI: string;
  readonly Creation_Date: string;
}

let SAMS_EXCLUSION_RECORDS: SamsExclusionRecord[];

async function init(path: string) {
  const encoding = 'utf8';
  console.log(`Loading SAMS data from ${path} as ${encoding}`);
  const raw: string = fs.readFileSync(path, { encoding });
  SAMS_EXCLUSION_RECORDS = await neatCsv(raw);
}

function shouldFlag(a: string, b: string): boolean {
  const TOLERANCE = 0.85;

  return (
    !!a?.trim() &&
    !!b?.trim() &&
    stringSimilarity.compareTwoStrings(a.trim().toUpperCase(), b.trim().toUpperCase()) >= TOLERANCE
  );
}

function isPossibleMatch(application: Application, record: SamsExclusionRecord): boolean {
  // return false; // debug
  return (
    record.Country === 'USA' &&
    ['NJ', 'NY', 'PA', 'CT', 'DE'].includes(record['State / Province']) &&
    shouldFlag(record.Name, application.application_data.input_mAnKeq.raw_value)
  );
}

const mapFunc = async (application: Application, offset: number, count: number) => {
  const possibleMatches: SamsExclusionRecord[] = SAMS_EXCLUSION_RECORDS.filter((record) =>
    isPossibleMatch(application, record)
  );

  if (possibleMatches.length) {
    const business = {
      name: application.application_data.input_mAnKeq.raw_value,
      ein: application.application_data.input_ou1s8P,
      uniqueId: application.application_data.uniquestring_Xoqb1g,
      applicatoin_id: application.application_id,
    };
    console.log(`${count} (#${offset})`, business, possibleMatches);
  }
};

async function main() {
  await init(path.join('data', 'SAM_Exclusions_Public_Extract_20270.CSV'));

  mapApplications({ mapFunc });
}

main();
