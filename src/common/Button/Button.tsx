import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';
interface ButtonType {
  title: string;
  onPress?: () => void;
  style?: object;
}
const Button = (props: ButtonType) => {
  const {title, style, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export {Button};
const styles = StyleSheet.create({
  container: {
    backgroundColor: CColor.white,
    borderRadius: wp(1),
    borderWidth: 0.5,
    borderColor: CColor.black,
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: CCFont.regular,
    fontSize: wp(4),
    lineHeight: wp(4),
    color: CColor.black,
  },
});
