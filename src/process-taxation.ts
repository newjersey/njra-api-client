import fs from 'fs';
import path from 'path';
import neatCsv from 'neat-csv';

import { Application } from './Pipeline';
import { associateTags } from './undocumented';
import mapApplications from './map-applications';

type CleanInd = 'Y' | 'N' | 'X';
interface TaxationRecord {
  readonly TIN: string;
  readonly 'Clean Ind': CleanInd;
}

let RECORDS: TaxationRecord[];

async function init(path: string) {
  const encoding = 'utf8';
  console.log(`Loading taxation data from ${path} as ${encoding}`);
  const raw: string = fs.readFileSync(path, { encoding });
  RECORDS = await neatCsv(raw);
  console.log(RECORDS);
}

const mapFunc = async (application: Application, offset: number, count: number) => {
  const appId = application.application_id;
  const ein = application.application_data.input_ou1s8P.raw_value?.replace(/\D/g, '');
  const matches: TaxationRecord[] = RECORDS.filter((record) => `${ein}` === `${record.TIN}`);
  const cleanInds: CleanInd[] = matches.map((match) => match['Clean Ind']);
  const uniqueCleanInds: CleanInd[] = Array.from(new Set(cleanInds));
  const log = (message: string) => {
    console.log(`${count} (#${offset}): ${appId} / ${ein} - ${message}`);
  };
  const tag = (tagName: string) => {
    associateTags(appId, [tagName]);
  };

  if (!ein) {
    log('Missing EIN');
    tag('Missing EIN');
  } else if (uniqueCleanInds.length === 0) {
    log(`****** No taxation entry, not even an X`);
  } else if (uniqueCleanInds.length > 1) {
    log(`****** Unexpected multiple and differing EIN matches from Taxation`);
  } else {
    const cleanInd = uniqueCleanInds[0];
    switch (cleanInd) {
      case 'N':
        log('N');
        tag('Taxation Dirty');
        break;
      case 'Y':
        log('Y');
        tag('Taxation Clear');
        break;
      case 'X':
        log('X');
        tag('Unknown to Taxation');
        break;
      default:
        log(`****** Unexpected clean ind: ${cleanInd}`);
    }
  }
};

async function main() {
  await init(path.join('data', 'NJRA-taxation-all.csv'));

  mapApplications({ mapFunc });
}

main();
