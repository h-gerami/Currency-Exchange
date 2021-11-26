import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';
const Overview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageName}>Overview</Text>
    </View>
  );
};
export default Overview;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageName: {
    fontFamily: CCFont.medium,
    fontSize: wp(4),
    color: CColor.black,
  },
});
