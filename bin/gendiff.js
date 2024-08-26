#!/usr/bin/env node
import { Command } from 'commander';
import getFileData from '../src/index.js';
import compareKeys from '../src/compare.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = getFileData(filepath1);
    const data2 = getFileData(filepath2);

    console.log(compareKeys(data1, data2));
  });

program.parse();
