import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/home/Home';
import Overview from '../pages/overview/Overview';
import Setting from '../pages/setting/Setting';
import Trade from '../pages/trade/Trade';
import Wallet from '../pages/wallet/Wallet';
import {MyTabBar} from './MyTabbar';
import HomeHeader from './HomeHeader';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Home">
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen
        options={{
          header: () => <HomeHeader />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};
export default Tabs;
