import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ScannerScreen from './screens/ScannerScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabScreen from './screens/TabScreen';
import Rehive from 'rehive';

const rehive = new Rehive(config);
var config = {
  apiVersion: 3,
  // storageMethod: "local", // for client side
  apiToken: "2017207572adb52036968d5542c505eac3eebeb3797cee36f5bb82be9a6d7a01"
}

window.onload = function () {

    window.rehive = new Rehive({apiVersion: 3});

    // login('ark.aquib17+042@gmail.com','test_company_042','test1234');
    login('test1@rehive.com','test_company_1','test1234');
};

function convertToText(data) {
    if (!data) {
        return '';
    }
    var dataString = JSON.stringify(data, null, 1);
    dataString = dataString.replace(/[{",\\}]/g, '').trim();
    return dataString;
}

// line 367
function createUserBankAccount(name, number, type, bank_name, bank_code, branch_code, swift, iban, bic) {
    rehive.user.bankAccounts.create(
        {
            name: name,
            number: number,
            type: type,
            bank_name: bank_name,
            bank_code: bank_code,
            branch_code: branch_code,
            swift: swift,
            iban: iban,
            bic: bic
        }).then(function (res) {
        console.log(res);
        document.getElementById('result').innerHTML = convertToText(res);
    }, function (err) {
        console.log(err);
    });
}
// line 358
function getUserBankAccount(bankId) {
    rehive.user.bankAccounts.get(bankId).then(function (res) {
        console.log(res);
        document.getElementById('result').innerHTML = convertToText(res);
    }, function (err) {
        console.log(err);
    });
}

// line 653
function createDebit(amount, currency, account, reference, subtype, note, metadata) {
    rehive.transactions.createDebit(
        {
            amount: amount,
            currency: currency,
            account: account,
            reference: reference,
            subtype: subtype,
            note: note,
            metadata: metadata
        }).then(function (res) {
        console.log(res);
        document.getElementById('result').innerHTML = convertToText(res);
    }, function (err) {
        console.log(err);
    });
}
function createCredit(amount, currency, account, reference, subtype, note, metadata) {
    rehive.transactions.createCredit(
        {
            amount: amount,
            currency: currency,
            account: account,
            reference: reference,
            subtype: subtype,
            note: note,
            metadata: metadata
        }).then(function (res) {
        console.log(res);
        document.getElementById('result').innerHTML = convertToText(res);
    }, function (err) {
        console.log(err);
    });
}


const MainNavigator = createStackNavigator(
  {
    welcome: {
      screen: TabScreen
    },
    profile: {
      screen: ProfileScreen
    },
    form: {
      screen: TabScreen
    }
  },
  {
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    //  alignItems: 'center',
    //justifyContent: 'center'
  }
});
