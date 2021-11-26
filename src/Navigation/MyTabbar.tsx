import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {CColor, wp} from '../styles/CustomStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tabbarImg}
        source={require('../../assets/images/tabbar.png')}
      />
      {state.routes.map(
        (route: {key: string | number; name: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return label !== 'Home' ? (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.iconButtonWrapper}>
              {label === 'Overview' && (
                <Icon
                  name="view-grid-outline"
                  size={wp(6)}
                  color={isFocused ? CColor.black : CColor.gray}
                />
              )}
              {label === 'Wallet' && (
                <Icon
                  name="wallet-outline"
                  size={wp(6)}
                  color={isFocused ? CColor.black : CColor.gray}
                />
              )}
              {label === 'Trade' && (
                <Icon
                  name="waveform"
                  size={wp(6)}
                  color={isFocused ? CColor.black : CColor.gray}
                />
              )}
              {label === 'Setting' && (
                <Icon
                  name="cog-outline"
                  size={wp(6)}
                  color={isFocused ? CColor.black : CColor.gray}
                />
              )}
            </TouchableOpacity>
          ) : (
            <View key={label} style={styles.centerButtonWrapperContainer}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.centerButtonWrapper}>
                <Image
                  style={styles.centerImg}
                  source={require('../../assets/images/homeButton.png')}
                />
              </TouchableOpacity>
            </View>
          );
        },
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: wp(22),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabbarImg: {
    width: wp(100),
    height: wp(22),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -wp(2),
  },
  iconButtonWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    margin: wp(2),
    height: wp(13),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImg: {
    height: wp(17),
    width: wp(17),
    resizeMode: 'contain',
  },
  centerButtonWrapperContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonWrapper: {
    position: 'absolute',
    bottom: wp(6),
  },
});
