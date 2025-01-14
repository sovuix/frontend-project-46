import fs from 'node:fs';
import gendiff from '../src/index.js';
import path from 'node:path';
import process from 'node:process';
import { describe } from 'node:test';
import test from 'node:test';
import expect from 'node:test';

const expectedFileStylish = fs.readFileSync(
  './__fixtures__/expectedStylish_JSON.txt',
  'utf-8'
);

const expectedFilePlain = fs.readFileSync(
  './__fixtures__/expectedPlain_JSON.txt',
  'utf-8'
);

// const expectedFileJson = fs
//   .readFileSync('./__fixtures__/filejson.json', 'utf-8');

const resultPath = (filename) =>
  path.join(process.cwd(), '__fixtures__', filename);

describe('gendiff', () => {
  test('stylish', () => {
    const result = gendiff(
      resultPath('file1.json'),
      resultPath('file2.json'),
      'stylish'
    );
    expect(result.trim()).toEqual(expectedFileStylish);
  });

  test('plain', () => {
    const result = gendiff(
      resultPath('file1.json'),
      resultPath('file2.json'),
      'plain'
    );
    expect(result.trim()).toEqual(expectedFilePlain);
  });

  // test('json', () => {
  //       const result = JSON.parse(gendiff(resultPath('file1.json'), resultPath('file2.json'), 'json'));
  //        expect (result).toEqual(JSON.parse(expectedFileJson));
  //     });
});
