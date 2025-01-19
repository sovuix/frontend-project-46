import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import gendiff from '../src/index.js';

const expectedFileStylish = fs.readFileSync(
  './__fixtures__/expectedStylish_JSON.txt',
  'utf-8',
);

const expectedFilePlain = fs.readFileSync(
  './__fixtures__/expectedPlain_JSON.txt',
  'utf-8',
);

const expectedFileJSON = fs.readFileSync(
  './__fixtures__/filejson.json',
  'utf-8',
);

const resultPath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

describe('gendiff', () => {
  test('stylish', () => {
    const result = gendiff(
      resultPath('file1.json'),
      resultPath('file2.json'),
      'stylish',
    );
    expect(result.trim()).toEqual(expectedFileStylish);
  });

  test('plain', () => {
    const result = gendiff(
      resultPath('file1.json'),
      resultPath('file2.json'),
      'plain',
    );
    expect(result.trim()).toEqual(expectedFilePlain);
  });

  test('json', () => {
    const result = gendiff(
      resultPath('file1.json'),
      resultPath('file2.json'),
      'json',
    );
    expect(result.trim()).toEqual(expectedFileJSON);
  });
});
