import getFileData from '../src/index.js';
import compareKeys from '../src/compare.js';
import fs from 'node:fs';

const fileJson1 = './__fixtures__/file1.json';
const fileJson2 = './__fixtures__/file2.json';

const data1 = getFileData(fileJson1);
const data2 = getFileData(fileJson2);

const expectedFile = fs
  .readFileSync('./__fixtures__/expected_JSON.txt', 'utf-8');

test('comparing files with nesting', () => {
  expect(compareKeys(data1, data2)).toEqual(expectedFile);
});
