import {ImageSourcePropType} from 'react-native';

export interface currencyType {
  id: string;
  name: string;
  img?: ImageSourcePropType;
}
export interface walletBoardItemType {
  id: string;
  currency: currencyType;
  total: number;
}

export interface walletType {
  USD: walletBoardItemType;
  EUR: walletBoardItemType;
  GBP: walletBoardItemType;
}
