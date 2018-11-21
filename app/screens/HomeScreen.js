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
            currentDate: new Date(),        
        }
    }

    componentDidMount() {
        //this.getImageUrlFromFirebase(this.toZadokaDate(new Date())).then((url) => this.setState({dailyUrl: url}));    
    }

    toZadokaDate(date) {
        return date.getFullYear().toString() 
            + ("0"+(date.getMonth()+1)).slice(-2) 
            + ("0" + date.getDate()).slice(-2);
    }

    async getPathFromZadokDay(zadokaDay) {
        console.log("getPathFromZadokDay(" + zadokaDay + ")");
        const doc = await firebase.firestore().doc('daily/' + zadokaDay).get();
        return doc.get('path');
    }

    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    async getImageUrlFromFirebase(zadokaDay) {
        console.log("getImageUrlFromFirebase("+zadokaDay+")");
        const path = await this.getPathFromZadokDay(zadokaDay);
        console.log("getImageUrlFromFirebase path:" + path);
        const ref = firebase.storage().ref(path);
        const url = await ref.getDownloadURL();
        return url;
    }

    onSwipeLeft() {
        const currentDate = this.state.currentDate;
        const newDate = this.addDays(currentDate, 1);
        this.setState({currentDate: newDate});
        this.getImageUrlFromFirebase(this.toZadokaDate(newDate)).then((url) => this.setState({dailyUrl: url}));    
    }

    onSwipeRight() {
        const currentDate = this.state.currentDate;
        const newDate = this.addDays(currentDate, -1);
        this.setState({currentDate: newDate});
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
                    <Text>No Zadoka for this day</Text>
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