import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import firebase from 'react-native-firebase';
import ImageLoader from '../utils/ImageLoader';
import * as DateHelper from '../utils/Date';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

const { height, width } = Dimensions.get('window');

export default class Loading extends React.Component {

    componentDidMount() {
        ImageLoader.get(DateHelper.toZadokaDate(new Date()))
            .then(() => {
                firebase.auth().signInAnonymously()
                    .then(setTimeout(() => this.props.navigation.navigate('Home'), 3000))
            })
    }

    render() {
        return (
        <View style={styles.container}>
        <ImageBackground 
            resizeMode='contain' 
            source={require('../assets/splash.png')} 
            style={styles.background}>
            <PacmanIndicator size={54} color='black' />
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
  },
  background: {
    flex: 1, 
    width: width, 
    height: height,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  }
})