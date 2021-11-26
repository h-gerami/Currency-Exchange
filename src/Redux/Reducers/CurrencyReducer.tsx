import {walletType} from '../../Types/types';
import {
  GET_CURRENCY_RATE,
  SET_ERR,
  SET_IS_LOADING,
  UPDATE_WALLET,
} from '../Actions/types';
export interface CurrencyReducerInitType {
  loading: boolean;
  wallet: walletType;
  rates: object;
  err: string;
}
// USD (initial balance $200)
// EUR (initial balance €150)
// GBP (initial balance £10)
const INITIAL_STATE: CurrencyReducerInitType = {
  loading: false,
  wallet: {
    USD: {
      id: '1',
      total: 200,
      currency: {
        id: '1',
        name: 'USD',
      },
    },
    EUR: {
      id: '2',
      total: 150,
      currency: {
        id: '2',
        name: 'EUR',
      },
    },
    GBP: {
      id: '3',
      total: 10,
      currency: {
        id: '3',
        name: 'GBP',
      },
    },
  },
  rates: {},
  err: '',
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ERR:
      return {...state, err: action.payload};
    case GET_CURRENCY_RATE:
      return {...state, rates: action.payload};
    case UPDATE_WALLET:
      return {...state, wallet: action.payload};
    case SET_IS_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};
