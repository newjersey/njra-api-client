import Pipeline, { Application } from './Pipeline';
import config from 'config';
import { request } from './documented';

type MapFunc = (application: Application, offset: number, count: number) => Promise<unknown>;

const FORM_ID: string = config.get('seamless.formId');

async function mapBatch({
  apiKey,
  apiSecret,
  limit,
  offset,
  countStart,
  mapFunc,
}: {
  apiKey: string;
  apiSecret: string;
  limit?: number;
  offset: number;
  countStart: number;
  mapFunc: MapFunc;
}): Promise<number> {
  const response = await request(apiKey, apiSecret, 'POST', `form/${FORM_ID}/pipeline`, {
    full_list: true,
    order_by: 'created_ts',
    order_by_direction: 'ASC',
    offset,
  });
  const pipeline = <Pipeline>response.body;
  const { items } = pipeline;
  let count = countStart;

  for (let i = 0; i < items.length; i++) {
    if (typeof limit !== 'undefined' && count++ >= limit) {
      return 0;
    }

    await mapFunc(items[i], offset + i, count);
  }

  return items.length;
}

export default async function mapApplications({
  start = 0,
  limit,
  mapFunc,
}: {
  start?: number;
  limit?: number;
  mapFunc: MapFunc;
}): Promise<void> {
  const API_KEY: string = config.get('seamless.api.documented.key');
  const API_SECRET: string = config.get('seamless.api.documented.secret');

  let count = 0;
  let offset = start;
  let isComplete = false;

  try {
    do {
      console.log(`\nProcessing batch${limit ? ` of ${limit}` : ''} starting at ${offset}...`);
      const n = await mapBatch({ apiKey: API_KEY, apiSecret: API_SECRET, limit, offset, countStart: count, mapFunc });
      offset += n;
      count += n;
      isComplete = n === 0;
    } while (!isComplete);
  } catch (error) {
    console.log('ERROR', error.message);
  }
}
