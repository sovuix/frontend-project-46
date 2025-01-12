import path from 'node:path';
import fs from 'node:fs';
import parse from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const getFileData = (filepath) => {
  const absoluteFilePath = getAbsolutePath(filepath);
  const format = getFileFormat(filepath);
  const data = parse(fs.readFileSync(absoluteFilePath, 'utf8'), format);
  return data;
};

export default getFileData;