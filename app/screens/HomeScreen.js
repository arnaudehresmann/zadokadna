import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import firebase from 'react-native-firebase';
import * as DateHelper from '../utils/Date'
import zadokaFirebase from '../utils/Firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: 'yellow'
    },
    zadokaImage: {
        flex: 1,
        height: height,
        width: width,
    }
  });
  
export default class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('zadokaDay', DateHelper.toHeaderDate(new Date())),
          headerRight:(
            <Icon.Button 
                onPress={navigation.getParam('showCalendar')}
                name="calendar" 
                size={30} 
                backgroundColor='transparent'
                color="black" >
                <DateTimePicker
                date={navigation.getParam('currentDate', new Date())}
                isVisible={navigation.getParam('isCalendarVisible', false)}
                onConfirm={navigation.getParam('changeDate', () => {})}
                onCancel={navigation.getParam('hideCalendar', () =>{})}
              />
            </Icon.Button>
          ),
        };
      };

    constructor(props) {
        super(props);

        this.state = {
            swiped: undefined,
            dailyUrl: undefined,
            currentDate: new Date(), 
        }

        this.showCalendar = this.showCalendar.bind(this);
        this.hideCalendar = this.hideCalendar.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    componentDidMount() {
        zadokaFirebase.getZadokaUrl(DateHelper.toZadokaDate(this.state.currentDate)).then((url) => this.setState({dailyUrl: url}));   
        this.props.navigation.setParams({ 
            showCalendar: this.showCalendar,
            changeDate: this.changeDate,
            hideCalendar: this.hideCalendar,
         }); 
    }

    showCalendar() {
        this.props.navigation.setParams({isCalendarVisible: !this.props.navigation.getParam('isCalendarVisible', false)});
    }

    changeDate(date) {
        this.setState({currentDate: date})
        zadokaFirebase.getZadokaUrl(DateHelper.toZadokaDate(date))
            .then((url) => this.setState({dailyUrl: url}))
            .then(() => this.props.navigation.setParams({zadokaDay: DateHelper.toHeaderDate(date), currentDate: date}));    
        this.hideCalendar();
    }

    hideCalendar() {
        this.props.navigation.setParams({isCalendarVisible: false});
    }

    swipe(dateChanger) {
        const currentDate = this.state.currentDate;
        const newDate = dateChanger(currentDate);
        this.setState({currentDate: newDate});
        zadokaFirebase.getZadokaUrl(DateHelper.toZadokaDate(newDate))
            .then((url) => this.setState({dailyUrl: url}))
            .then(() => this.props.navigation.setParams({zadokaDay: DateHelper.toHeaderDate(newDate), currentDate: newDate}));    

    }
    onSwipeLeft() {
        this.swipe(DateHelper.incDays);
    }

    onSwipeRight() {
        this.swipe(DateHelper.decDays);
    }

    renderDailyZadoka() {
        if(this.state.dailyUrl) {
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