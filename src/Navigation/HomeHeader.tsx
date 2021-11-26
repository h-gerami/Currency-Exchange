import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NotificationButton, ProfileButton} from '../common';
import {CCFont, CColor, wp} from '../styles/CustomStyle';
export interface HomeHeaderType {}

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.userName}>Hossein Gerami</Text>
      </View>
      <View style={styles.profileNotifWrapper}>
        <NotificationButton />
        <ProfileButton style={styles.profileButton} />
      </View>
    </View>
  );
};
export default HomeHeader;
const styles = StyleSheet.create({
  container: {
    height: wp(15),
    backgroundColor: CColor.white,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  profileButton: {
    marginLeft: wp(5),
  },
  profileNotifWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontFamily: CCFont.medium,
    fontSize: wp(4),
    lineHeight: wp(4),
    color: CColor.black,
    marginBottom: wp(1),
  },
  userName: {
    fontFamily: CCFont.regular,
    fontSize: wp(3),
    lineHeight: wp(3),
    color: CColor.black,
  },
});
