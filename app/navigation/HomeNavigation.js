import React  from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
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
};

export default HomeNavigator;
