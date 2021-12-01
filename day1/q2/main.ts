import { readFileSync } from 'fs';
import { chain } from 'lodash';

const file = readFileSync('./day1/input.txt');

const result = chain(file)
  .split('\n')
  .map(val => +val)
  .map((val, index, list) => {
    return index <= list.length-3 ? list[index] + list[index+1] + list[index+2] : NaN
  })
  .filter(val => !!val)
  .filter((val, index, list) => {
    return index > 0 && list[index] > list[index-1]
  })
  .size()
  .valueOf();

console.log(result);