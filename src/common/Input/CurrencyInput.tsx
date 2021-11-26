import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import {CColor, CCFont, wp} from '../../styles/CustomStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export interface CurrencyInputType {
  placeHolder: string;
  disable: boolean;
  label?: string;
  onChangeText: (v: any) => void;
  style?: object;
  value: string;
  icon: string;
  prefix: string;
  labelPadding: number;
  error?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}
const CurrencyInput = (props: CurrencyInputType) => {
  const {
    placeHolder,
    disable,
    label,
    onChangeText,
    style,
    value,
    icon,
    prefix,
    labelPadding,
    error,
    onBlur,
    onFocus,
  } = props;
  return (
    <View style={[styles.container, style, error && {borderColor: CColor.red}]}>
      {prefix && <Text style={[styles.label]}>{prefix}</Text>}
      <TextInput
        onBlur={onBlur}
        onFocus={onFocus}
        style={[
          styles.textInput,
          label ? {paddingLeft: wp(labelPadding || 10)} : null,
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={CColor.gray}
        placeholder={!label ? placeHolder : ''}
        keyboardType={'numeric'}
        editable={!disable}
      />
      {icon ? (
        <Icon
          name={error ? 'alert' : icon}
          size={wp(4)}
          color={error ? CColor.red : CColor.gray}
        />
      ) : null}
    </View>
  );
};
export {CurrencyInput};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: wp(10),
    borderWidth: 0.5,
    borderColor: CColor.lightGray,
    backgroundColor: CColor.lightGray,
    borderRadius: wp(2),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    alignItems: 'center',
  },
  label: {
    fontFamily: CCFont.bold,
    color: CColor.gray,
    fontSize: wp(4),
    lineHeight: wp(4),
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    backgroundColor: CColor.blue,
    height: wp(10),
    width: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  textInput: {
    fontFamily: CCFont.medium,
    color: CColor.black,
    fontSize: wp(4),
    flex: 1,
    marginLeft: wp(1),
  },
});
