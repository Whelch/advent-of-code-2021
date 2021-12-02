import { chain, times, constant, random } from 'lodash';

export function weightedRandom<T>(weights: {weight: number, value: T}[]): T {
  const entries: T[] = chain(weights)
    .map(entry => times(entry.weight, constant(entry.value)))
    .flatten()
    .valueOf() as T[];

  return entries[random(entries.length-1)];
}