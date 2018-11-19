import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import firebase from 'react-native-firebase';

const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80
  };

  const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: 'yellow',
    },
    zadokaImage: {
        flex: 1,
        height: height,
        width: width,
    }
  });

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            swiped: undefined,
            dailyUrl: undefined,
        }
    }

    async getImageUrlFromFirebase() {
        const ref = firebase.storage().ref('daily/00000D76_Perfect_skin.jpg');
        const url = await ref.getDownloadURL();
        return url;
    }

    onSwipeLeft() {
        this.getImageUrlFromFirebase().then((url) => this.setState({dailyUrl: url}));    
    }

    onSwipeRight() {
        this.getImageUrlFromFirebase().then((url) => this.setState({dailyUrl: url}));    
    }

    renderDailyZadoka() {
        if(this.state.dailyUrl) {
            console.log(this.state.dailyUrl)
            return (<Image source={{uri: this.state.dailyUrl}} style={styles.zadokaImage}></Image>);
        }
        else{
            return(
                <View style={styles.container}>
                    <Text>Zadoka is alive</Text>
                    <Text>Swipe to test</Text>
                </View>)
        }
    }

    render () {
        return (
            <GestureRecognizer
                style={styles.container}
                onSwipeLeft={() => this.onSwipeLeft()}
                onSwipeRight={() => this.onSwipeRight()}
                config={config}>
                    {this.renderDailyZadoka()}
            </GestureRecognizer>
        );
    }
}