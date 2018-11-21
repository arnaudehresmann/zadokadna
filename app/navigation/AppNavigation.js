import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from '../screens/Loading';
import HomeScreen from '../screens/HomeScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  }
)

export default createAppContainer(createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Home: HomeNavigator,
  },
  {
    initialRouteName: 'Loading',
  }
));