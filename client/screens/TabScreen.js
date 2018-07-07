import React from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import firebase from 'firebase';
import TabItem from '../components/TabItem';
import Header from '../components/Header';

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
      console.log(list);
      this.setState({ items: list });
    });
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        {this.state.items.map(data => <TabItem data={data} />)}
      </View>
    );
  }
}
