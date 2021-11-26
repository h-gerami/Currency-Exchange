import {currencyType} from './types';
export enum Symbols {
  EUR = '€',
  USD = '$',
  GBP = '£',
}
export const currencyPrefixReturner = (currency: currencyType) => {
  let cc: {[key: string]: Symbols} = Symbols;
  return cc[currency.name];
};

export const rateReturner = (
  currencyToSell: currencyType,
  currencyToBuy: currencyType,
  rates: any,
) => {
  if (currencyToSell === currencyToBuy) {
    return 1;
  } else {
    return parseFloat(rates[currencyToBuy.name]);
  }
};

export const rateReverseReturner = (
  currencyToSell: currencyType,
  currencyToBuy: currencyType,
  rates: any,
) => {
  if (currencyToSell === currencyToBuy) {
    return 1;
  } else {
    return 1 / parseFloat(rates[currencyToBuy.name]);
  }
};

export const convert = (cr1: number, convertRate: any): number => {
  return parseFloat((cr1 * convertRate).toFixed(4));
};
