import { readFileSync } from 'fs';
import { chain } from 'lodash';

const file = readFileSync('./day5/input.txt');

enum Direction {
  Vertical,
  Horizontal,
  Diagonal
}

const straightLines = chain(file)
  .split('\n')
  .map(line => line.split(' -> ').map(coord => coord.split(',').map(val => +val)))
  .groupBy(([start, end]) => start[0] === end[0] ? Direction.Horizontal : start[1] === end[1] ? Direction.Vertical : Direction.Diagonal)
  .valueOf();

let grid: number[][] = [];

function incGrid(x: number, y: number) {
  if(!grid[x]) {
    grid[x] = [];
  }
  grid[x][y] = grid[x][y] ? grid[x][y] + 1 : 1;
}

straightLines[Direction.Vertical].forEach(
  ([[x0, y0], [x1, y1]]) => {
    incGrid(x0, y0);
    while (x0 != x1) {
      x0 += Math.sign(x1 - x0);
      incGrid(x0, y0);
    }
  }
);

straightLines[Direction.Horizontal].forEach(
  ([[x0, y0], [x1, y1]]) => {
    incGrid(x0, y0);
    while(y0 != y1) {
      y0 += Math.sign(y1 - y0);
      incGrid(x0, y0);
    }
  }
);

let answer = chain(grid)
  .flatten()
  .filter(val => val > 1)
  .size()
  .valueOf();

console.log(answer);