import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './Reducers/index';
import ReduxThunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(
  persistedReducer,
  {},
  applyMiddleware(ReduxThunk),
);
export let persistor = persistStore(store);
