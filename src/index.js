import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import parse from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
  const absoluteFilePath = getAbsolutePath(filepath);
  const format = getFileFormat(filepath);
  const data = parse(fs.readFileSync(absoluteFilePath, 'utf8'), format);

  return data;
};

// const gendiff = (filepath1, filepath2, formatName)
// {
//   //1. получить абсолютные пути до файла
//   //2. прочитать и спарсить json
//   //3. построение AST
//   //4.
// }

export default getFileData;
