import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {wp, CColor, CCFont} from '../../styles/CustomStyle';
interface IconButtonType {
  icon: string;
  title: string;
}
const IconButton = (props: IconButtonType) => {
  const {icon, title} = props;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon name={icon} size={wp(5)} color={CColor.black} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export {IconButton};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: CColor.white,
    width: wp(9),
    height: wp(9),
    borderRadius: 100,
    marginBottom: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CColor.gray,
  },
  title: {
    fontFamily: CCFont.regular,
    fontSize: wp(3),
    color: '#373737',
    lineHeight: wp(3.5),
  },
});
