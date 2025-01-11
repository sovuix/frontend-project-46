import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import parse from './parser.js';
import buildAst from './buildAst.js';
import plain from './formatters/plain.js';
import stylish from './formatters/stylish.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
  const absoluteFilePath = getAbsolutePath(filepath);
  const format = getFileFormat(filepath);
  const data = parse(fs.readFileSync(absoluteFilePath, 'utf8'), format);
  return data;
};

const format = (ast, formatName) => {
  switch(formatName) {
    case 'stylish':
      return stylish(ast);
    case 'plain': 
      return plain(ast); 
  }
}

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const ast = buildAst(data1, data2);
  return format(ast, formatName);
}

export default gendiff;
// export default getFileData;

