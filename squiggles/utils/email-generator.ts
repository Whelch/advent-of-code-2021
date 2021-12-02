import { times, random } from 'lodash';
import {weightedRandom} from "./weighted-random";

enum NameStyle {
  FirstLast,
  FLast,
  FirstL,
  FirLast,
  Las,
  FirFir,
}

enum Variants {
  Normal,
  First_Last,
  FirstLast_,
}


export function emailGenerator(first: string, last: string, domain: string) {
  const numDigits = weightedRandom([
    {
      value: 3,
      weight: 15,
    },
    {
      value: 4,
      weight: 13,
    },
    {
      value: 5,
      weight: 8,
    },
    {
      value: 6,
      weight: 3,
    },
    {
      value: 7,
      weight: 2,
    },
    {
      value: 8,
      weight: 1,
    }
  ]);

  const nameStyle = weightedRandom([
    {
      value: NameStyle.FirstLast,
      weight: 15,
    },
    {
      value: NameStyle.FLast,
      weight: 7,
    },
    {
      value: NameStyle.FirstL,
      weight: 8,
    },
    {
      value: NameStyle.FirLast,
      weight: 6,
    },
    {
      value: NameStyle.Las,
      weight: 9,
    },
    {
      value: NameStyle.FirFir,
      weight: 2,
    }
  ]);

  const variant = weightedRandom([
    {
      value: Variants.Normal,
      weight: 30,
    },
    {
      value: Variants.First_Last,
      weight: 3,
    },
    {
      value: Variants.FirstLast_,
      weight: 5,
    },
  ]);

  let firstStyled;
  let lastStyled;

  switch(nameStyle) {
    case NameStyle.FirstLast:
      firstStyled = first;
      lastStyled = last;
      break;
    case NameStyle.FLast:
      firstStyled = first.substring(0, 1);
      lastStyled = last;
      break;
    case NameStyle.FirstL:
      firstStyled = first;
      lastStyled = last.substring(0, 1);
      break;
    case NameStyle.FirLast:
      firstStyled = first.substring(0, random(3,5));
      lastStyled = last.substring(0, 1);
      break;
    case NameStyle.Las:
      firstStyled = '';
      lastStyled = last.substring(0, random(4,6));
      break;
    case NameStyle.FirFir:
      const firfir = first.substring(0, random(3, 5));
      firstStyled = `${firfir}${firfir}`;
      lastStyled = '';
      break;
  }

  const digits = times(numDigits, () => random(9)).join('');
  return `${first}${variant===Variants.First_Last?'_':''}${last}${variant===Variants.FirstLast_?'_':''}${digits}${domain}`;
}