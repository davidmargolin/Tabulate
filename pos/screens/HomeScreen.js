import React from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase';
import DetailScreen from './DetailScreen';
import ItemDetail from '../components/ItemDetail';

export default class HomeScreen extends React.Component {
  state = {
    items: []
  };
  componentDidMount() {
    let ref = firebase.database().ref('Funtime Bar');
    ref.on('value', snapshot => {
      let result = snapshot.val();
      let list = [];
      let sublist = [];
      let counter = 0;
      for (let row of Object.keys(result)) {
        sublist.push(result[row]);
        if (counter === 2) {
          counter = 0;
          list.push(sublist);
          sublist = [];
        } else {
          counter++;
        }
      }
      this.setState({ items: list });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.items}
          renderItem={item => {
            return (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <DetailScreen data={item.item[0]} />
                <DetailScreen data={item.item[1]} />
                <DetailScreen data={item.item[2]} />
              </View>
            );
          }}
        />
        <Text onPress={() => console.log(this.state.items)}>Debugg</Text>
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};
