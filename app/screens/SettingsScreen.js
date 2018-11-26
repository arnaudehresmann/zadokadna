import React from 'react'
import { View, StyleSheet } from 'react-native'

export default class SettingsScreen extends React.Component {
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
      
    render() {
        return (
        <View style={styles.container}>
        </View>
        )
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})