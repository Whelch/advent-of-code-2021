import { times, random } from 'lodash';

export function firstLastDigits(first: string, last: string, domain: string) {
  const digits = times(random(2, 8), () => random(9)).join('');
  return `${first}${last}${digits}${domain}`;
}