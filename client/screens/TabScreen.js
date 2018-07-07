import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase';
import TabItem from '../components/TabItem';
import Header from '../components/Header';
var stripe = require('stripe-client')('pk_test_Eslvav5ELSvHrXpJ2GZmqE1q');

export default class TabScreen extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    //fetch data from firebase
    let ref = firebase.database().ref('Funtime Bar/David Margolin/tab');
    ref.on('value', snapshot => {
      let result = snapshot.val();
      let list = [];
      for (let row of Object.keys(result)) {
        list.push(result[row]);
      }
      //console.log(list);
      this.setState({ items: list });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:1}}>
          <FlatList
            style={{flex:1}}
            data={this.state.items}
            renderItem={({item}) => <TabItem data={item} />}
          />
        </View>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFCA28', margin: 8, borderRadius: 10}}>
          <Text style={{margin: 12, fontSize: 18, color: 'white'}}>Close Tab</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
