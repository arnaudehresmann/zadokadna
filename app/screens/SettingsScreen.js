import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import Version from '../components/Version'
export default class SettingsScreen extends React.Component {

    render() {
        return (
        <View style={styles.container}>
            <FlatList style={styles.container}
                data={[
                    {
                        key: '1', 
                        render: () => {
                            return (<View style={styles.item}>
                                    <Text style={styles.itemHeader}>Version</Text>
                                    <Version style={styles.versionNumber}></Version>
                                </View>);
                        }
                    }
                ]}
                renderItem={({item}) => item.render()}
            >
            </FlatList>
        </View>
        )
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
      padding: 10,
  },
  versionNumber: {
    fontSize: 18,
    color: 'darkgrey',
},
  itemHeader: {
      fontSize: 24,
      fontWeight: 'bold',
  }
})