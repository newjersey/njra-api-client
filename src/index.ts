import config from 'config';
import request from './request';

const formId: string = config.get('seamless.formId');

async function main() {
  try {
    const response = await request('GET', `form/${formId}/elements`);

    console.log(response.body);
  } catch (error) {
    console.log(error.message);
  }
}

main();
