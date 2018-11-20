import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import firebase from 'react-native-firebase';

const { height, width } = Dimensions.get('window');

export default class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().signInAnonymously().then(setTimeout(() => this.props.navigation.navigate('Home'), 3000));
    }

    render() {
        return (
        <View style={styles.container}>
        <ImageBackground resizeMethod='scale' source={require('../assets/splash.png')} style={{width: width, height: height}}>
            <ActivityIndicator size="large" />
        </ImageBackground>
        </View>
        )
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})