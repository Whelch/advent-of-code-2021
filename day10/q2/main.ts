import { readFileSync } from 'fs';
import { chain, sortBy } from 'lodash';
import {validSymbols} from '../valid-symbols';
import {openingSymbol} from '../opening-symbol';

const file = readFileSync('./day10/input.txt');

const lines = chain(file)
  .split('\n')
  .valueOf();

function symbolCost(symbol: string): number {
  switch(symbol) {
    case '(':
      return 1;
    case '[':
      return 2;
    case '{':
      return 3;
    case '<':
      return 4;
  }
}

let scores: number[] = [];

lines.forEach((line: string) => {
  const buildup: string[] = [];
  let failed = false;

  for (let l = 0; l < line.length; l++) {
    if (openingSymbol(line[l])) {
      buildup.push(line[l]);
    } else if(!validSymbols(buildup.pop(), line[l])) {
      failed = true;
      break;
    }
  }

  if (!failed) {
    const score = chain(buildup)
      .map(symbolCost)
      .reduceRight((curr, next) => curr * 5 + next)
      .valueOf();

    scores.push(score);
  }
});

const answer = sortBy(scores)[Math.floor(scores.length/2)];

console.log(answer);
