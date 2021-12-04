import { readFileSync } from 'fs';
import { chain } from 'lodash';

const file = readFileSync('./day1/input.txt');

const result = chain(file)
  .split('\n')
  .map(val => +val)
  .filter((val, index, list) => list[index] > list[index-1])
  .size()
  .valueOf();

console.log(result);


console.log(require('fs')
  .readFileSync('./day1/input.txt')
  .toString()
  .split('\n')
  .map((val: string) => +val)
  .filter((val: number, index: number, list: number[]) => val > list[index-1])
  .length
)