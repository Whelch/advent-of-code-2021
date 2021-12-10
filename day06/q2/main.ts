import { readFileSync } from 'fs';
import { chain, times, constant } from 'lodash';

const file = readFileSync('./day6/input.txt');

let fishies = times(9, constant(0));

const ages = chain(file)
  .split(',')
  .map(val => +val)
  .valueOf();

ages.forEach(age => fishies[age]++);

for (let i = 0; i < 256; i++) {
  fishies = [...fishies.slice(1), fishies[0]];
  fishies[6] += fishies[8];
}

const answer = chain(fishies)
  .sum()
  .valueOf();

console.log(answer);