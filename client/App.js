import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ScannerScreen from './screens/ScannerScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabScreen from './screens/TabScreen';

const MainNavigator = createStackNavigator(
  {
    welcome: {
      screen: ScannerScreen
    },
    profile: {
      screen: ProfileScreen
    },
    form: {
      screen: TabScreen
    }
  },
  {
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    //  alignItems: 'center',
    //justifyContent: 'center'
  }
});
