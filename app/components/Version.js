import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import VersionNumber from 'react-native-version-number';

export default class Version extends React.Component {

    renderVersionNumber() {
        return VersionNumber.appVersion;
    }

    render() {
        return (
        <Text style={this.props.style}>
            {this.renderVersionNumber()}
        </Text>
        )
    } 
}