import { find } from 'lodash';

const rollWeights: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

interface Universe {
  scores: [number, number];
  positions: [number, number];
  turn: number;
  multiplicity: number;
}

let universes: Universe[] = [{
  scores: [0, 0],
  positions: [5, 1],
  turn: 0,
  multiplicity: 1
}];

function addUniverse(universe: Universe) {
  const existingUniverse = universes.find(
    uni => uni.scores[0] === universe.scores[0]
    && uni.scores[1] === universe.scores[1]
    && uni.positions[0] === universe.positions[0]
    && uni.positions[1] === universe.positions[1]
    && uni.turn === universe.turn
  );

  if (existingUniverse) {
    existingUniverse.multiplicity += universe.multiplicity;
  } else {
    universes.push(universe);
  }
}

let universeWinners: [number, number] = [0, 0];



while(universes.length > 0) {
  const universe = universes.shift();

  const newTurn = (universe.turn+1) % 2;

  for (let i = 3; i <= 9; i++) {
    const positions: [number, number] = [...universe.positions];
    const scores: [number, number] = [...universe.scores];
    const multiplicity = (universe.multiplicity * rollWeights[i]);
    positions[universe.turn] = (positions[universe.turn] + i) % 10;
    scores[universe.turn] += positions[universe.turn] + 1;

    if (scores[universe.turn] >= 21) {
      universeWinners[universe.turn] += multiplicity;
    } else {
      addUniverse({
        scores,
        positions,
        turn: newTurn,
        multiplicity,
      });
    }
  }
}

console.log(Math.max(...universeWinners));