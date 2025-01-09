#!/usr/bin/env node
import { Command } from 'commander';
import getFileData from '../src/index.js';
import compareKeys from '../src/compare.js';
import buildAst from '../src/buildAst.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import gendiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format','stylish')
  .action((filepath1, filepath2, options) => {
    const res = gendiff(filepath1, filepath2, options.format);  
    console.log(res);
  });

program.parse();
