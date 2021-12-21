import { get, set } from 'lodash';

const rollWeights: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

/**
 * [
 * { // turn 0
 *   p1 score: {
 *     p2 score: {
 *       p1 position: {
 *         p2 position: multiplicity
 *       }
 *     }
 *   }
 * },
 * { // turn 1
 *   p1 score: {
 *     p2 score: {
 *       p1 position: {
 *         p2 position: multiplicity
 *       }
 *     }
 *   }
 * }
 * ]
 */
let universesMap: [any, any] = [{}, {}];

function updateUniverse(turn: number, scores: [number, number], positions: [number, number], multiplicity: number) {
  set(universesMap, [turn, scores[0], scores[1], positions[0], positions[1]], multiplicity);
}

let universeWinners: [number, number] = [0, 0];

updateUniverse(0, [0, 0], [5, 1], 1);

let didSomething = true;

const startTime = new Date();

while(didSomething) {
  didSomething = false;
  for (let turn = 0; turn < 2; turn++) {
    for (let p1Score = 0; p1Score < 21; p1Score++) {
      for (let p2Score = 0; p2Score < 21; p2Score++) {
        for (let p1Position = 0; p1Position < 10; p1Position++) {
          for (let p2Position = 0; p2Position < 10; p2Position++) {
            for (let i = 3; i <= 9; i++) {
              if (get(universesMap, [turn, p1Score, p2Score, p1Position, p2Position])) {
                didSomething = true;
                const positions: [number, number] = [p1Position, p2Position];
                const scores: [number, number] = [p1Score, p2Score];
                const multiplicity = (universesMap[turn][p1Score][p2Score][p1Position][p2Position] * rollWeights[i]);
                positions[turn] = (positions[turn] + i) % 10;
                scores[turn] += positions[turn] + 1;

                if (scores[turn] >= 21) {
                  universeWinners[turn] += multiplicity;
                } else {
                  updateUniverse((turn+1)%2, scores, positions, multiplicity);
                }
              }
            }

            set(universesMap, [turn, p1Score, p2Score, p1Position, p2Position], 0);
          }
        }
      }
    }
  }
}

const endTime = new Date();

console.log(endTime.valueOf() - startTime.valueOf());

console.log(universeWinners);