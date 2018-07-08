const functions = require('firebase-functions');
var stripe = require("stripe")("sk_test_SWu8uCLLjcfBjtm7ZuANmq24");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.payForDrinks = functions.https.onRequest((request,response) => {
  // Use connect method to connect to the server
  const token = "tok_1ClW8BF0bNLd1tiiUfdWKOYr"; // Using Express
  const amount = 500
  const charge = stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'Example charge',
    source: token,
  }).then((charge)=>{
    const username = encodeURIComponent('firebase')
    const password = encodeURIComponent('a1s2d3f4')
    var url = 'mongodb://'+username+':'+password+'@ds229621.mlab.com:29621/tabulate_transactions';
    MongoClient.connect(url, (err, client) => {
      if (err) throw err
      let db = client.db('tabulate_transactions')
      console.log("connected to serversss")

      db.collection('transactions').insertOne({user: 'David Margolin', amount: 555, date: new Date()}, (err,r)=>{
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
