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
