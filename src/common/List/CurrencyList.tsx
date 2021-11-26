import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';

export interface CurrencyListType {
  name: string;
  img: ImageSourcePropType;
  onPress: () => void;
  isLast?: boolean;
}
const CurrencyList = (props: CurrencyListType) => {
  const {name, isLast, img, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, isLast && {borderBottomWidth: 0}]}>
        <Image style={styles.img} source={img} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
export {CurrencyList};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(12),
    borderBottomWidth: 0.5,
    borderColor: CColor.lightGray,
    paddingHorizontal: wp(5),
  },
  name: {
    fontFamily: CCFont.medium,
    fontSize: wp(4),
    color: CColor.black,
    marginHorizontal: wp(3),
  },
  img: {
    width: wp(12),
    resizeMode: 'contain',
  },
});
