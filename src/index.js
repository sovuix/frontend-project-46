// import _ from 'lodash';
import buildAst from './buildAst.js';
import format from './formatters/index.js';
import getFileData from './getFileData.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);
  const ast = buildAst(data1, data2);
  return format(ast, formatName);
};

export default gendiff;
