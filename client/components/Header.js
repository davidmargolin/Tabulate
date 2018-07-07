import React from 'react'
import {View,Text, Image, Platform} from 'react-native'
import {Constants} from 'expo'
export default class Header extends React.Component{
  render(){
    return(
      <View style={{paddingTop: STATUSBAR_HEIGHT, backgroundColor: '#FFCA28', flexDirection: 'row'}}>
        <View style={{alignItems: 'center', margin: 8, flexDirection: 'row',flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{color: 'white', fontSize: 18}}>David Margolin</Text>
          <Image
            style={{height: 34, width: 34, borderRadius: 17, marginLeft: 8, borderColor: 'white', borderWidth: 2}}
            source={{uri:'https://vignette.wikia.nocookie.net/naginoasukara/images/8/86/Placeholder_person.png/revision/latest/scale-to-width-down/480?cb=20130924151342'}}
          />
        </View>
      </View>
    )
  }
}

const STATUSBAR_HEIGHT = Constants.statusBarHeight
