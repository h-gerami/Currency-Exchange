import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';
import {walletBoardItemType} from '../../Types/types';
import {currencyPrefixReturner} from '../../Types/utils';

export interface AssetCardType {
  selected?: boolean;
  onPress?: () => void;
  style?: object;
}

const AssetCard = (props: walletBoardItemType & AssetCardType) => {
  const {style, currency, total, onPress, selected} = props;
  const imgReturner = () => {
    if (currency.name === 'EUR') {
      return (
        <Image
          style={styles.img}
          source={require('../../../assets/images/eur.jpg')}
        />
      );
    } else if (currency.name === 'USD') {
      return (
        <Image
          style={styles.img}
          source={require('../../../assets/images/usd.jpg')}
        />
      );
    } else {
      return (
        <Image
          style={styles.img}
          source={require('../../../assets/images/gbp.jpg')}
        />
      );
    }
  };

  return (
    <View style={[styles.container, style, selected && styles.selected]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconWrapper}>{imgReturner()}</View>
        <Text style={styles.title}>{currency?.name}</Text>
        <Text style={styles.total}>
          {currencyPrefixReturner({
            id: currency.id,
            name: currency.name,
          }) + total.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export {AssetCard};
const styles = StyleSheet.create({
  container: {
    height: wp(23),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  selected: {
    elevation: 6,
    backgroundColor: '#D8D8D8',
  },
  iconWrapper: {
    width: wp(10),
    height: wp(7),
    borderRadius: 3,
    marginBottom: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontFamily: CCFont.regular,
    fontSize: wp(3.5),
    color: '#373737',
    lineHeight: wp(4),
  },
  total: {
    fontFamily: CCFont.medium,
    fontSize: wp(5),
    color: CColor.black,
    lineHeight: wp(5),
    marginTop: wp(1),
  },
  img: {
    width: wp(13),
    resizeMode: 'contain',
  },
});
