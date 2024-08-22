import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0');
// .command('compare')
// .option('-v, --version', 'output the version number')
// .option('-f, --format <type>', 'output format', 'stylish')
// .argument('<filepath1>')
// .argument('<filepath2>')
// .action((filepath1, filepath2) => {
//   const options = program.opts().format;
//   const result = gendiff(filepath1, filepath2, options);
//   console.log(result);
// });
program.parse();
