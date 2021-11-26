import {set_is_loading} from '../src/Redux/Actions';
import reducer, {
  CurrencyReducerInitType,
} from '../src/Redux/Reducers/CurrencyReducer';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    loading: false,
    wallet: {
      EUR: {
        currency: {
          id: '2',
          name: 'EUR',
        },
        id: '2',
        total: 150,
      },
      GBP: {
        currency: {
          id: '3',
          name: 'GBP',
        },
        id: '3',
        total: 10,
      },
      USD: {
        currency: {
          id: '1',
          name: 'USD',
        },
        id: '1',
        total: 200,
      },
    },
    rates: {},
    err: '',
  });
});

test('should handle loading state be false', () => {
  const previousState: CurrencyReducerInitType = {
    loading: false,
    err: 'test error',
    wallet: {
      EUR: {
        currency: {
          id: '2',
          name: 'EUR',
        },
        id: '2',
        total: 350,
      },
      GBP: {
        currency: {
          id: '3',
          name: 'GBP',
        },
        id: '3',
        total: 120,
      },
      USD: {
        currency: {
          id: '1',
          name: 'USD',
        },
        id: '1',
        total: 100,
      },
    },
    rates: {},
  };
  expect(reducer(previousState, set_is_loading(false))).toEqual({
    loading: false,
    err: 'test error',
    rates: {},
    wallet: {
      EUR: {
        currency: {
          id: '2',
          name: 'EUR',
        },
        id: '2',
        total: 350,
      },
      GBP: {
        currency: {
          id: '3',
          name: 'GBP',
        },
        id: '3',
        total: 120,
      },
      USD: {
        currency: {
          id: '1',
          name: 'USD',
        },
        id: '1',
        total: 100,
      },
    },
  });
});
