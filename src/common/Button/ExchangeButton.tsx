import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';
import {currencyType} from '../../Types/types';
import {currencyPrefixReturner} from '../../Types/utils';
export interface ExchangeButtonType {
  currencyToSell: currencyType;
  currencyToBuy: currencyType;
  rates: any;
  onPress: () => void;
  loading: boolean;
  style: object;
  error: boolean;
}
const ExchangeButton = (props: ExchangeButtonType) => {
  const {currencyToBuy, error, loading, currencyToSell, style, onPress, rates} =
    props;
  const converReturner = useMemo(() => {
    if (currencyToSell === currencyToBuy) {
      return 1;
    } else {
      return rates[currencyToBuy.name];
    }
  }, [currencyToBuy, currencyToSell, rates]);

  return (
    <TouchableOpacity disabled={error} onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          error && {backgroundColor: CColor.gray},
        ]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={CColor.white} />
        ) : (
          <View>
            <Text
              style={styles.convert}>{`Exchange  |  ${currencyPrefixReturner(
              currencyToSell,
            )} 1 = ${currencyPrefixReturner(currencyToBuy)} ${
              converReturner || 1
            }`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export {ExchangeButton};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CColor.black,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
  },
  convert: {
    fontFamily: CCFont.medium,
    fontSize: wp(4),
    color: CColor.white,
  },
});
