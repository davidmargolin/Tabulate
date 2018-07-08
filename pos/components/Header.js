import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';
import { withNavigation } from 'react-navigation';

class Header extends React.Component {
  state = {
    bar: 'Scan a BARcode to begin'
  };

  render() {
    return (
      <View
        style={{ paddingTop: STATUSBAR_HEIGHT, backgroundColor: '#9428ff' }}
      >
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View
          style={{
            marginVertical: 16,
            marginLeft: 12,
            marginRight: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: 'white', fontSize: 32, margin: 8 }}>
            Tabulate
          </Text>
          <Text
            style={{
              color: 'white',
              margin: 8,
              fontSize: 28
            }}
          >
            Funtimes Bar
          </Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(Header);

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
