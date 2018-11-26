import React  from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import LoadingScreen from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen'
import Icon from "react-native-vector-icons/FontAwesome";

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  }
)

HomeNavigator.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <Icon name='home' size={horizontal ? 20 : 25} color='black' />
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Settings: {
    screen : SettingsScreen,
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Icon name='cogs' size={horizontal ? 20 : 25} color='black' />
      }
    }) 
  }
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