import React, {Component} from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as DateHelper from '../utils/Date';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from "react-native-vector-icons/FontAwesome";
import ImageLoader from '../utils/ImageLoader';

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
        height: undefined,
        width: undefined,
    },
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
                onConfirm={navigation.getParam('loadDate', () => {})}
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
        this.loadDate = this.loadDate.bind(this);
    }

    componentDidMount() {
        this.loadDate(this.state.currentDate);
        this.props.navigation.setParams({ 
            showCalendar: this.showCalendar,
            loadDate: this.loadDate,
            hideCalendar: this.hideCalendar,
         }); 
    }

    showCalendar() {
        this.props.navigation.setParams({isCalendarVisible: !this.props.navigation.getParam('isCalendarVisible', false)});
    }

    loadDate(date) {
        this.setState({currentDate: date})
        this.props.navigation.setParams({zadokaDay: DateHelper.toHeaderDate(date), currentDate: date});
        let zadokaDate = undefined;
        if(date <= new Date()) {
            zadokaDate = DateHelper.toZadokaDate(date);
        }
        ImageLoader.get(zadokaDate).then((uri) => this.setState({dailyUrl: uri}));
        
        this.hideCalendar();
    }

    hideCalendar() {
        this.props.navigation.setParams({isCalendarVisible: false});
    }

    swipe(dateChanger) {
        const currentDate = this.state.currentDate;
        const newDate = dateChanger(currentDate);
        this.loadDate(newDate);
    }
    onSwipeLeft() {
        this.swipe(DateHelper.incDays);
    }

    onSwipeRight() {
        this.swipe(DateHelper.decDays);
    }

    renderDailyZadoka() {
        if(this.state.dailyUrl) {
            return (
            <Image 
                source={{uri: this.state.dailyUrl}} 
                style={styles.zadokaImage} 
                resizeMode='contain'
                >
            </Image>);
        }
        else {
            return(
                <Image 
                source={require('../assets/notAvailable.jpg')} 
                style={styles.zadokaImage} 
                resizeMode='contain'
                >
            </Image>)
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