import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import TabItem from '../components/TabItem';

export default class TabScreen extends React.Component {
  // state = {};
  // componentDidMount() {
  //   //fetch data from firebase
  // }
  // renderItems = () => {
  //   return this.state.albums.map(album => <TabItem data={data} />);
  // };
  render() {
    return (
      //<ScrollView>{this.renderItems()}</ScrollView>;
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <TabItem />
      </View>
    );
  }
}
