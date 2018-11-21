import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import firebase from 'react-native-firebase';
import * as DateHelper from '../utils/Date'
import zadokaFirebase from '../utils/Firebase';

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
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
        //zadokaFirebase.getZadokaUrl(DateHelper.toZadokaDate(new Date())).then((url) => this.setState({dailyUrl: url}));    
    }

    swipe(dateChanger) {
        console.log("swipe");
        const currentDate = this.state.currentDate;
        console.log("swipe currentDate:"+ currentDate);
        const newDate = dateChanger(currentDate);
        console.log("swipe newDate:"+ newDate);
        this.setState({currentDate: newDate});
        console.log("swipe zadokadate:"+ DateHelper.toZadokaDate(newDate));
        zadokaFirebase.getZadokaUrl(DateHelper.toZadokaDate(newDate)).then((url) => { console.log("swipe url:"+url);this.setState({dailyUrl: url});});    

    }
    onSwipeLeft() {
        console.log("onSwipeLeft");
        this.swipe(DateHelper.incDays);
    }

    onSwipeRight() {
        console.log("onSwipeRight");
        this.swipe(DateHelper.decDays);
    }

    renderDailyZadoka() {
        if(this.state.dailyUrl) {
            console.log(this.state.dailyUrl)
            return (<Image source={{uri: this.state.dailyUrl}} style={styles.zadokaImage} resizeMode="contain" resizeMethod="scale"></Image>);
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