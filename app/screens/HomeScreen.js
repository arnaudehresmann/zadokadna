import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
    },
  });

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            swiped: undefined
        }
    }

    onSwipeLeft() {
        this.setState({swiped: 'Swiped Left'});
    }

    onSwipeRight() {
        this.setState({swiped: 'Swiped Right'});
    }

    renderSwiped() {
        if(this.state.swiped) {
            return (<Text>{this.state.swiped}</Text>);
        }
    }

    render () {
        return (
            <GestureRecognizer
                style={styles.container}
                onSwipeLeft={() => this.onSwipeLeft()}
                onSwipeRight={() => this.onSwipeRight()}
                config={config}>
                    <Text>Zadoka is alive</Text>
                    <Text>Swipe to test</Text>
                    {this.renderSwiped()}
            </GestureRecognizer>
        );
    }
}