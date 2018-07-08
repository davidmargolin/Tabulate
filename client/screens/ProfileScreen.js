import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Modal, AsyncStorage, FlatList, Platform} from 'react-native';
import { CreditCardInput} from "react-native-credit-card-input";
import moment from 'moment'
var stripe = require('stripe-client')('pk_test_N3lSyyoi2V88h1JgZ5OVb1ug');

export default class ProfileScreen extends React.Component {
  state={
    modalVisible: false,
    cardNumber: '',
    transactions: null
  }

  componentDidMount=()=>{
    fetch('https://us-central1-tabulate-b824d.cloudfunctions.net/findAllTransactions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: "Helghardt Avenant",
      }),
    }).then((response) => {
      response.json().then(transactions=>{
        this.setState({transactions})
      })
    })
    this.getCard()
  }

  saveCard=()=>{
    if (this.formData && this.formData.valid){
      stripe.createToken({
        card: {
          number: this.formData.values.number,
          exp_month: this.formData.values.expiry.split("/")[0],
          exp_year: this.formData.values.expiry.split("/")[1],
          cvc: this.formData.values.cvc,
          name: this.formData.values.name
        }
      }).then((card)=>{
        AsyncStorage.setItem('cardnumber', this.formData.values.number.substr(this.formData.values.number.length-4)).then(()=>{
          console.log("saved card number")
          AsyncStorage.setItem('token', card.id).then(()=>{
            console.log("saved token")
            AsyncStorage.multiSet([
              ['number', this.formData.values.number],
              ['exp_month', this.formData.values.expiry.split("/")[0]],
              ['exp_year',this.formData.values.expiry.split("/")[1]],
              ['cvc', this.formData.values.cvc],
              ['name', this.formData.values.name]
            ], ()=>{
              console.log("saved card info")
              this.setState({'modalVisible': false, card: this.formData.values.number.substr(this.formData.values.number.length-4)})
            })
          }).catch(error=>{
            console.log("failed to save data")
          })
        }).catch(error=>{
          console.log("failed to save data")
        })
      }).catch(error=>console.log(error));
    }else{
      console.log("invalid form")
    }
  }

  getCard=()=>{
    AsyncStorage.getItem('cardnumber').then(value=>{
      if (value == null){
        this.setState({cardNumber: 'No Card Set'})
      }else{
        this.setState({cardNumber: value})
      }
    }).catch (error=> {
      console.log('Error retrieving data')
    })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#9428ff', paddingTop: STATUSBAR_HEIGHT}}>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={()=>this.setState({modalVisible: false})}
          visible={this.state.modalVisible}>
          <View
            style={{flex:1, backgroundColor: 'white', paddingTop: 40}}
          >
            <CreditCardInput
              autoFocus
              requiresName
              requiresCVC
              requiresPostalCode
              validatePostalCode={()=>("valid")}
              labelStyle={{color: 'black', fontSize: 12}}
              inputStyle={{fontSize: 16, color: 'black'}}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onChange={(formData)=>this.formData=formData} />
            <Text style={{textAlign:'center', margin: 4, color: 'red'}}>{this.state.errorText}</Text>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFCA28', margin: 8, borderRadius: 10}}
              onPress={()=>this.saveCard()}
            >
              <Text style={{margin: 12, fontSize: 18, color: 'white'}}>Save Card</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <View>
          <View style={{marginHorizontal: 12, marginVertical: 8}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                resizeMode="contain"
                style={{width: 24, height: 24, margin: 8}}
                source={Platform.OS === 'ios' ?  require('../images/ic_action_chevron_left.png') : require('../images/ic_action_arrow_back.png')}
              />
              <Text style={{color: 'white', fontSize: 16}}>Tabulate</Text>
            </TouchableOpacity>

          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{height: 150, width: 150, borderRadius: 75, marginLeft: 8, borderColor: 'white', borderWidth: 5}}
              source={require('../images/helghardt.jpg')}
            />
            <Text style={{color: 'white', fontSize: 28, textAlign: 'center'}}>Helghardt Avenant</Text>
          </View>

        </View>
        <View style={{margin: 16}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 12}}>Payment Method</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', margin: 4}}>
            <Text style={{color: 'white',  flex: 1}}>{(this.state.cardNumber===''?"No Card Set":"**** **** **** "+this.state.cardNumber)}</Text>
            <TouchableOpacity
              onPress={()=>this.setState({modalVisible: true})}
            >
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 12}}>Transaction History</Text>
          <View style={{flexDirection: 'row',margin: 4}}>
            {
              this.state.transactions
                ?
                  this.state.transactions.length===0
                    ?
                      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>No Transactions Completed</Text>
                    :
                    <FlatList
                      style={{flex:1}}
                      data={this.state.transactions.reverse()}
                      renderItem={(transaction) =>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1}}>
                          <Text style={{color: 'white'}}>{moment(transaction.item.date).format("ddd, MMM Do YYYY, h:mm a")}</Text>
                          {('location' in transaction.item)?<Text style={{color: 'white'}}>{transaction.item.location}</Text>:<View></View>}
                            <Text style={{color: 'white'}}>{"$"+Number.parseFloat(transaction.item.amount.toString().substring(0,transaction.item.amount.toString().length-2)+"."+transaction.item.amount.toString().substring(transaction.item.amount.toString().length-2)).toFixed(2).toString()}</Text>
                            </View>
                            }
                            />
                          :
                          <View/>
                          }
          </View>
        </View>
      </View>
    );
  }
}
const STATUSBAR_HEIGHT = StatusBar.currentHeight
