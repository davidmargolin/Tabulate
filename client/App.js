import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ScannerScreen from './screens/ScannerScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabScreen from './screens/TabScreen';
import firebase from 'firebase';

<<<<<<< HEAD
=======



>>>>>>> 1447c40025b17afa0ea56b0050908648338f7493
const MainNavigator = createStackNavigator(
  {
    form: {
      screen: ScannerScreen
    },
    profile: {
      screen: ProfileScreen
    }
  },
  {
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCFNRnholi7b2qNHflrKZVLJDs498QJ0jE',
      authDomain: 'tabulate-b824d.firebaseapp.com',
      databaseURL: 'https://tabulate-b824d.firebaseio.com',
      projectId: 'tabulate-b824d',
      storageBucket: 'tabulate-b824d.appspot.com',
      messagingSenderId: '162137507006'
    };
    firebase.initializeApp(config);
  }
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
  }
});
