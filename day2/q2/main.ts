import { readFileSync } from 'fs';
import { chain, times, constant } from 'lodash';
import {Metric} from '../metric.enum';
import {Instruction} from '../instruction.enum';

const file = readFileSync('./day2/input.txt');

const result = chain(file)
  .split('\n')
  .map(val => val.split(' '))
  .map(([instruction, val]) => times(+val, constant(instruction)) as Instruction[])
  .flatten()
  .reduce((prev: Record<Metric, number>, curr: Instruction) => {
    let newP = prev[Metric.P];
    let newA = prev[Metric.A];
    let newD = prev[Metric.D];
    switch(curr) {
      case Instruction.F:
        newP++;
        newD += prev[Metric.A];
        break;
      case Instruction.D:
        newA++;
        break;
      case Instruction.U:
        newA--;
        break;
    }
    return {
      [Metric.P]: newP,
      [Metric.A]: newA,
      [Metric.D]: newD,
    };
  }, { [Metric.P]: 0, [Metric.A]: 0, [Metric.D]: 0 })
  .filter((val, metric) => metric != Metric.A)
  .reduce((prev, curr) => prev * curr)
  .valueOf();

console.log(result);
