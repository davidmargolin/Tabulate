import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import ItemDetail from '../components/ItemDetail';
import Header from '../components/Header';

export default class DetailScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <ItemDetail data={this.props.data} />
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
