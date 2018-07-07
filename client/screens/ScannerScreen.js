import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import TabScreen from './TabScreen'
import { BarCodeScanner, Permissions } from 'expo';
import {withNavigation} from 'react-navigation'

class ScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    sessionStarted: true,
    bar: 'Scan a BARcode to begin'
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = (code) => {
    this.setState({bar: code.data, sessionStarted: true})
  }

  render() {
    if (this.state.sessionStarted){
      return (
        <View style={{flex: 1}}>
          <Header bar={this.state.bar}/>
          <TabScreen/>
        </View>
      )
    }else{
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
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
