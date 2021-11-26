import {currencyType} from './types';

export const currencyPrefixReturner = (currency: currencyType) => {
  if (currency.name === 'EUR') {
    return '€';
  } else if (currency.name === 'USD') {
    return '$';
  } else {
    return '£';
  }
};

export const rateReturner = (
  currencyToSell: currencyType,
  currencyToBuy: currencyType,
  rates: any,
) => {
  if (currencyToSell === currencyToBuy) {
    return 1;
  } else {
    if (currencyToBuy.name === 'USD') {
      return rates.USD;
    } else if (currencyToBuy.name === 'EUR') {
      return rates.EUR;
    } else {
      return rates.GBP;
    }
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
    if (currencyToBuy.name === 'USD') {
      return 1 / rates.USD;
    } else if (currencyToBuy.name === 'EUR') {
      return 1 / rates.EUR;
    } else {
      return 1 / rates.GBP;
    }
  }
};

export const convert = (cr1: number, convertRate: any) => {
  console.log(cr1, convertRate);
  return cr1 * convertRate;
};
