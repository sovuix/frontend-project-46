import getFileData from '../src/index.js';
import compareKeys from '../src/compare.js';
import compareAst from '../src/compareAst.js';
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

const expectedFile = fs
  .readFileSync('./__fixtures__/expected_JSON.txt', 'utf-8');

// test('comparing files with nesting', () => {
//   expect(compareKeys(data1Json,data2Json)).toEqual(expectedFile);
//   expect(compareKeys(data1Yaml,data2Yaml)).toEqual(expectedFile);
// });

test('comparing files with nesting', () => {
  expect(compareAst(ast)).toEqual(expectedFile);
  // expect(compareAst(data1Yaml,data2Yaml)).toEqual(expectedFile);
});
