#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import updateCommand from './utils/commands/updateCommand.js';

const program = new Command();

try {
  program
    .name('package version update util')
    .description('CLI to update package version')
    .version('0.0.1');

  updateCommand(program);

  program.parse(process.argv);
} catch (error) {
  console.error(error);
}

// import fetch from 'node-fetch';
// import base64 from 'base-64';

// const USER_NAME = process.env.USER_NAME;

// const PASSWORD = process.env.PASSWORD;

// const URL_PREFIX = 'https://api.bitbucket.org/2.0';

// fetch(URL_PREFIX + '/user', {
//   method: 'GET',
//   headers: {
//     Authorization: 'Basic ' + base64.encode(USER_NAME + ':' + PASSWORD),
//   },
// })
//   .then((response) => {
//     console.log(response.status);
//     return response.text();
//   })
//   .then((text) => console.log(text))
//   .catch((err) => console.log(err));
