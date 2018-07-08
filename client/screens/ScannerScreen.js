import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import TabScreen from './TabScreen'
import { BarCodeScanner, Permissions } from 'expo';
import {withNavigation} from 'react-navigation'
import firebase from 'firebase'
class ScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    sessionStarted: false,
    bar: 'Scan a BARcode to begin'
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = (code) => {
    firebase.database().ref(code.data+'/Helghardt Avenant').set({info: {
      customerNum: 15,
      email: "helghardtAvenant@gmail.com",
      name: 'Helghardt Avenant',
      picture: "https://avatars3.githubusercontent.com/u/5997897?s=400&v=4"
    }})
    this.setState({bar: code.data, sessionStarted: true})
  }

  end = () => {
    this.setState({sessionStarted: false, bar: 'Scan a BARcode to begin'})
  }

  render() {
    if (this.state.sessionStarted){
      return (
        <View style={{flex: 1}}>
          <Header bar={this.state.bar}/>
          <TabScreen bar={this.state.bar} end={()=>this.end()}/>
        </View>
      )
    }else{
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View></View>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Header  bar={this.state.bar}/>
            <BarCodeScanner
              style={{flex:1}}
              onBarCodeRead={this._handleBarCodeRead}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
        );
      }
    }
  }
}

export default withNavigation(ScannerScreen)
