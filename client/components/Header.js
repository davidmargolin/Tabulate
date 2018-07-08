import React from 'react'
import {View,Text, Image, Platform, StatusBar,TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'

class Header extends React.Component{
  state={
    bar: 'Scan a BARcode to begin'
  }

  render(){
    return(
      <View style={{paddingTop: STATUSBAR_HEIGHT, backgroundColor: '#9428ff'}}>
        <View style={{marginVertical: 8,marginLeft: 12,marginRight: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{color: 'white', fontSize: 18}}>Tabulate</Text>
          {/* <Image
            resizeMode="contain"
            style={{width: 50, height: null, flex: 1}}
            source={require('../images/tabulatelgw.png')}
          /> */}
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('profile')}
            style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color: 'white', fontSize: 18}}>Helghardt Avenant</Text>
            <Image
              style={{height: 34, width: 34, borderRadius: 17, marginLeft: 8, borderColor: 'white', borderWidth: 2}}
              source={require('../images/helghardt.jpg')}
            />
          </TouchableOpacity>
        </View>
        <Text style={{textAlign: 'center', color: 'white', margin: 8, fontSize: 20}}>{this.props.bar}</Text>
      </View>
    )
  }
}

export default withNavigation(Header)

const STATUSBAR_HEIGHT = StatusBar.currentHeight
