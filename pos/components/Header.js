import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
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
        <View
          style={{
            marginVertical: 8,
            marginLeft: 12,
            marginRight: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Tabulate</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('profile')}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>David Margolin</Text>
            <Image
              style={{
                height: 34,
                width: 34,
                borderRadius: 17,
                marginLeft: 8,
                borderColor: 'white',
                borderWidth: 2
              }}
              source={{
                uri:
                  'https://vignette.wikia.nocookie.net/naginoasukara/images/8/86/Placeholder_person.png/revision/latest/scale-to-width-down/480?cb=20130924151342'
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            margin: 8,
            fontSize: 16
          }}
        >
          {this.props.bar}
        </Text>
      </View>
    );
  }
}

export default withNavigation(Header);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
