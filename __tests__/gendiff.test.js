import getFileData from '../src/index.js';
import compareKeys from '../src/compare.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import buildAst from '../src/buildAst.js';
import fs from 'node:fs';

const fileJson1 = './__fixtures__/file1.json';
const fileJson2 = './__fixtures__/file2.json';
const fileYaml1 = './__fixtures__/file1.yaml';
const fileYaml2 = './__fixtures__/file2.yaml';


const data1Json = getFileData(fileJson1);
const data2Json = getFileData(fileJson2);
const data1Yaml = getFileData(fileYaml1);
const data2Yaml = getFileData(fileYaml2);

const ast = buildAst(data1Json, data2Json);

const expectedFileStylish = fs
  .readFileSync('./__fixtures__/expectedStylish_JSON.txt', 'utf-8');

const expectedFilePlain = fs
  .readFileSync('./__fixtures__/expectedPlain_JSON.txt', 'utf-8');


test('comparing files with nesting', () => {
  expect(stylish(ast)).toEqual(expectedFileStylish);
  expect(plain(ast)).toEqual(expectedFilePlain);

  // expect(compareAst(data1Yaml,data2Yaml)).toEqual(expectedFile);
});
