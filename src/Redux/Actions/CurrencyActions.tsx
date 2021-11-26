import {NETWORK_ERROR} from '../../global/Errors';
import services from '../../global/Services';
import {walletType} from '../../Types/types';
import {
  GET_CURRENCY_RATE,
  SET_ERR,
  SET_IS_LOADING,
  UPDATE_WALLET,
} from './types';

export const set_is_loading = (loading: boolean) => {
  return {
    type: SET_IS_LOADING,
    payload: loading,
  };
};
export const set_err = (err: string) => {
  return {
    type: SET_ERR,
    payload: err,
  };
};

export const update_wallet = (wallet: walletType) => {
  return {
    type: UPDATE_WALLET,
    payload: wallet,
  };
};
export const get_currency_rate = (base: string) => {
  return (dispatch: (value: any) => void) => {
    dispatch(set_is_loading(true));
    services
      .GetRate(base)
      .then(res => {
        if (res && res.data) {
          dispatch({
            type: GET_CURRENCY_RATE,
            payload: res.data,
          });
        } else {
          dispatch({
            type: SET_ERR,
            payload: NETWORK_ERROR,
          });
        }

        dispatch(set_is_loading(false));
      })
      .catch(err => {
        console.log(err, 'err');
        dispatch(set_is_loading(false));
      });
  };
};
