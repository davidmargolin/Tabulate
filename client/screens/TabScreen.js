import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, FlatList, AsyncStorage, Linking} from 'react-native';
import firebase from 'firebase';
import TabItem from '../components/TabItem';
import Header from '../components/Header';
var stripe = require('stripe-client')('pk_test_N3lSyyoi2V88h1JgZ5OVb1ug');

export default class TabScreen extends React.Component {
  state = {
    items: [],
    tip: 10,
    rideoffer: false,
    saving: false
  };

  componentDidMount() {
    let ref = firebase.database().ref(this.props.bar+'/Helghardt Avenant/tab');
    ref.on('value', snapshot => {
      let result = snapshot.val();
      if (result){
        let list = [];
        for (let row of Object.keys(result)) {
          list.push(result[row]);
        }
        this.setState({ items: list });
      }
    });
  }

  closeTab = () => {
    AsyncStorage.multiGet(['number','exp_month','exp_year','cvc','name'], (err, response)=>{
      stripe.createToken({
        card: {
          number: response[0][1],
          exp_month: response[1][1],
          exp_year: response[2][1],
          cvc: response[3][1],
          name: response[4][1]
        }
      }).then((card)=>{
        this.setState({saving: true})
        fetch('https://us-central1-tabulate-b824d.cloudfunctions.net/payForDrinks', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: (((this.add(this.state.items.map(item=>parseFloat(item.price)))+(this.state.tip/100)*this.add(this.state.items.map(item=>parseFloat(item.price))))).toFixed(2)*100).toString(),
            stripeToken: card.id,
            user: "Helghardt Avenant",
            location: this.props.bar

          }),
        }).then((response) => {
          firebase.database().ref('Funtime Bar/Helghardt Avenant').remove()
          this.setState({rideoffer: true})
          console.log("request sent")
        })
      })
    })
  }

  setTip = (amount) => {
    this.setState({tip: amount})
  }

  add = (array) => {
    let total = 0
    for (let item of array){
      total += item
    }
    return total
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>

        <View style={{flex:1}}>
          <FlatList
            style={{flex:1}}
            data={this.state.items}
            renderItem={({item}) => <TabItem data={item} />}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'flex-end', margin: 12, flexDirection: 'row', flex:1}}>
              <Text style={{fontSize: 14}}>Tip: </Text>
              <TouchableOpacity
                onPress={()=> this.setTip(10)}
              >
                <Text style={{fontSize: 20, marginHorizontal: 4, color: (this.state.tip === 10?'#9428ff': 'black')}}>10%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> this.setTip(15)}
              >
                <Text style={{fontSize: 20, marginHorizontal: 4, color: (this.state.tip === 15?'#9428ff': 'black')}}>15%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> this.setTip(20)}
              >
                <Text style={{fontSize: 20, marginHorizontal: 4, color: (this.state.tip === 20?'#9428ff': 'black')}}>20%</Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 12}}>
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>Subtotal: </Text>
                <Text style={{fontSize: 22}}>{"$" + this.add(this.state.items.map(item=>parseFloat(item.price))).toFixed(2).toString()}</Text>
              </View>
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <Text style={{fontSize: 14}}>With Tip: </Text>
                <Text style={{fontSize: 22}}>{"$" + ((this.add(this.state.items.map(item=>parseFloat(item.price)))+(this.state.tip/100)*this.add(this.state.items.map(item=>parseFloat(item.price))))).toFixed(2).toString()}</Text>
              </View>

            </View>
          </View>
          {!this.state.rideoffer && <TouchableOpacity
            onPress={()=>this.closeTab()}
            style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFCA28', margin: 8, borderRadius: 10}}>
            <Text style={{margin: 12, fontSize: 18, color: 'white'}}>{this.state.saving?"Processing":"Close My Tab"}</Text>
          </TouchableOpacity>}
          {this.state.rideoffer && <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={()=>{
                Linking.openURL('https://m.uber.com/ul/')
                this.props.end()
              }}
              style={{alignItems: 'center', justifyContent: 'center',flex:1, backgroundColor: 'black', margin: 8, borderRadius: 10}}>
              <Text style={{margin: 12, fontSize: 18, color: 'white'}}>Tab Closed. Need A Ride?</Text>
            </TouchableOpacity><TouchableOpacity
              onPress={()=>this.props.end()}
              style={{alignItems: 'center', justifyContent: 'center', margin: 8, borderRadius: 10, borderColor: 'black', borderWidth: 3}}>
              <Text style={{margin: 12, fontSize: 18, color: 'black'}}>No Thanks</Text>
          </TouchableOpacity>
          </View>}
        </View>
      </View>
    );
  }
}
