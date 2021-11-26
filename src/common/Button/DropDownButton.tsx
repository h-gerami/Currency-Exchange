import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {wp, CColor, CCFont} from '../../styles/CustomStyle';
import {currencyType} from '../../Types/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface DropDownButtonType {
  onPress: () => void;
}
const DropDownButton = (props: DropDownButtonType & currencyType) => {
  const {onPress, name, img} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <View style={styles.imgText}>
          <Image style={styles.img} source={img!} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <Icon name="chevron-down" size={wp(6)} color={CColor.gray} />
      </View>
    </TouchableOpacity>
  );
};
export {DropDownButton};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(10),
    borderWidth: 0.5,
    borderColor: CColor.lightGray,
    backgroundColor: CColor.lightGray,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
  },
  imgText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: CCFont.medium,
    fontSize: wp(3),
    color: CColor.black,
    marginHorizontal: wp(3),
  },
  img: {
    width: wp(8),
    resizeMode: 'contain',
  },
});
