import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
import ItemDetail from './components/ItemDetail';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const MainNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen
    },
    profile: {
      screen: DetailScreen
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
    justifyContent: 'center'
  }
});
