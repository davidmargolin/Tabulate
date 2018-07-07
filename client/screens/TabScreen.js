import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import TabItem from '../components/TabItem';
import Header from '../components/Header';
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
      <View>
        <Header />
        <TabItem />
      </View>
    );
  }
}
