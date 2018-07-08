const functions = require('firebase-functions');
var stripe = require("stripe")("sk_test_SWu8uCLLjcfBjtm7ZuANmq24");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
const username = encodeURIComponent('firebase')
const password = encodeURIComponent('a1s2d3f4')
var url = 'mongodb://'+username+':'+password+'@ds229621.mlab.com:29621/tabulate_transactions';

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.payForDrinks = functions.https.onRequest((request,response) => {
  // Use connect method to connect to the server
  const token = request.body.stripeToken; // Using Express
  const amount = request.body.amount
  const user = request.body.user
  const charge = stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'Charge for drinks',
    source: token,
  }).then((charge)=>{

    MongoClient.connect(url, (err, client) => {
      if (err) throw err
      let db = client.db('tabulate_transactions')
      console.log("connected to serversss")

      db.collection('transactions').insertOne({user: user, amount: amount, date: new Date()}, (err,r)=>{
        console.log("kill me please")
        if (err) throw err
        console.log("success!!!")
        client.close();
      })

    });
    console.log("got this far")

    return response.send("life sucks")

  })


  })


  exports.findAllTransactions = functions.https.onRequest((request,response) => {

    MongoClient.connect(url, (err, client) => {
      const user = request.body.user;
      if (err) throw err;
      var db = client.db("tabulate_transactions");
      //Find all documents in the customers collection:
      db.collection("transactions").find({ user: RegExp(user)}).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        client.close();
        return response.send(JSON.stringify(result))
      });
    });

  })
