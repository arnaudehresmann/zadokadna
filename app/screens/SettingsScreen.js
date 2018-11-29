import React from 'react'
import { View, StyleSheet, Text, Platform, RefreshControl, Image, Switch } from 'react-native'
import Version from '../components/Version'
import * as SettingsScreenComponents from "react-native-settings-screen"
import Icon from "react-native-vector-icons/Entypo";
import firebase from 'react-native-firebase';

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif';



export default class SettingsScreen extends React.Component {
    state = {
        refreshing: false,
        user: undefined,
      };

      componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({user: user});
        })
      }

      renderUser = () => {
        let userPicture = require('../assets/nouser.png');
        let userName = 'You are not logged in';
        let userEmail = '';
        if(this.state.user && !this.state.user.isAnonymous) {
          userPicture = require('../assets/splash.png');
          userName = this.state.user.displayName;
          userEmail = this.state.user.email;
        }
        return (
          <View style={styles.heroContainer}>
            <Image source={userPicture} style={styles.userImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.userTitle}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
          </View>);
      }

      data = [
        { type: 'CUSTOM_VIEW', key: 'user', render: this.renderUser },
        // {
        //   type: 'SECTION',
        //   header: 'My Section'.toUpperCase(),
        //   footer:
        //     'Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
        //   rows: [
        //     {
        //       title: 'A row',
        //       showDisclosureIndicator: true,
        //     },
        //     { title: 'A non-tappable row' },
        //     {
        //       title: 'This row has a',
        //       subtitle: 'Subtitle',
        //       showDisclosureIndicator: true,
        //     },
        //     {
        //       title: 'Long title. So long long long long long long long',
        //       subtitle:
        //         'And so is the subtitle. Even longer longer longer longer longer',
        //     },
        //     {
        //       title: 'Switch',
        //       renderAccessory: () => <Switch value onValueChange={() => {}} />,
        //     },
        //     {
        //       title: 'Text',
        //       renderAccessory: () => (
        //         <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
        //           Maybe
        //         </Text>
        //       ),
        //     },
        //     {
        //       title: 'Custom view',
        //       renderAccessory: () => (
        //         <View
        //           style={{
        //             width: 30,
        //             height: 30,
        //             backgroundColor: 'blue',
        //           }}
        //         />
        //       ),
        //       showDisclosureIndicator: true,
        //     },
        //   ],
        // },
        // {
        //   type: 'SECTION',
        //   header: 'My Other Section'.toUpperCase(),
        //   rows: [
        //     {
        //       title: 'Dolor Nullam',
        //       showDisclosureIndicator: true,
        //     },
        //     {
        //       title: 'Nulla vitae elit libero',
        //       renderAccessory: () => (
        //         <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
        //           Dapibus
        //         </Text>
        //       ),
        //     },
        //     {
        //       title: 'Ipsum Lorem Venenatis',
        //       subtitle: 'Vestibulum Inceptos Fusce Justo',
        //       renderAccessory: () => (
        //         <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
        //           Yes
        //         </Text>
        //       ),
        //       showDisclosureIndicator: true,
        //     },
        //     {
        //       title: 'Cras Euismod',
        //       renderAccessory: () => (
        //         <Icon
        //           style={{ marginTop: 3, marginRight: 6 }}
        //           name="colours"
        //           size={32}
        //           color="black"
        //         />
        //       ),
        //       showDisclosureIndicator: true,
        //     },
        //   ],
        // },
        // {
        //   type: 'SECTION',
        //   header: 'My Third Section'.toUpperCase(),
        //   rows: [
        //     {
        //       title: 'Different title style',
        //       showDisclosureIndicator: true,
        //       titleStyle: {
        //         color: 'red',
        //       },
        //     },
        //   ],
        // },
        {
          type: 'CUSTOM_VIEW',
          render: () => (
            <Version style={styles.versionNumber}></Version>
          ),
        },
      ];
    render() {
        return (
            <View style={styles.container}>
            <SettingsScreenComponents.SettingsScreen
              data={this.data}
              globalTextStyle={{ fontFamily }}
              scrollViewProps={{
                refreshControl: (
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      this.setState({ refreshing: true })
                      setTimeout(() => this.setState({ refreshing: false }), 3000)
                    }}
                  />
                ),
              }}
            />
          </View>
        );

        // return (
        // <View style={styles.container}>
        //     <FlatList style={styles.container}
        //         data={[
        //             {
        //                 key: '1', 
        //                 render: () => {
        //                     return (<View style={styles.item}>
        //                             <Text style={styles.itemHeader}>Version</Text>
        //                             <Version style={styles.versionNumber}></Version>
        //                         </View>);
        //                 }
        //             },
        //             {
        //                 key: '2',
        //                 render: () => {
        //                     return (<View style={styles.item}>
        //                         <Text style={styles.itemHeader}>Protection</Text>
        //                     </View>);
        //                 }
        //             }
        //         ]}
        //         renderItem={({item}) => item.render()}
        //     >
        //     </FlatList>
        // </View>
        // )
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroContainer: {
      marginTop: 40,
      marginBottom: 50,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ccc',
      flexDirection: 'row',
    },
    userImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: 'black',
      marginHorizontal: 20,
    },
    userTitle: {
      fontFamily,
      color: 'black',
      fontSize: 24,
    },
    userEmail: {
      fontFamily,
      color: '#999',
      fontSize: 14,
    },
    versionNumber: {
      fontSize: 18,
      color: 'darkgrey',
      alignSelf: 'center',
      marginTop: -30,
    },
  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//       padding: 10,
//   },
//   versionNumber: {
//     fontSize: 18,
//     color: 'darkgrey',
// },
//   itemHeader: {
//       fontSize: 24,
//       fontWeight: 'bold',
//   }
// })