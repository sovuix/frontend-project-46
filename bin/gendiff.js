#!/usr/bin/env node
import { Command } from 'commander';
import getData from '../src/index.js';


const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1,filepath2) => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);

    console.log(data1, data2);
  })

program.parse();

// export default gendiff;
