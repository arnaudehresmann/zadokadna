import React  from 'react';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import LoadingScreen from '../screens/Loading';
import HomeNavigator from './HomeNavigation';
import SettingsNavigator from './SettingsNavigation';

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Settings: SettingsNavigator,
},
);

export default createAppContainer(createSwitchNavigator(
  {
    Loading: LoadingScreen,
    TabNavigator: TabNavigator,
  },
  {
    initialRouteName: 'Loading',
  }
));