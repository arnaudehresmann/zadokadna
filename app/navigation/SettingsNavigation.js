import React  from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen'
import Icon from "react-native-vector-icons/FontAwesome";
import AuthNavigator from './AuthNavigation';

const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Auth: AuthNavigator,
  }
)
  
SettingsNavigator.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <Icon name='cogs' size={horizontal ? 20 : 25} color='black' />
  }
}

export default SettingsNavigator;