const functions = require('firebase-functions');
var stripe = require("stripe")("sk_test_SWu8uCLLjcfBjtm7ZuANmq24");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.payForDrinks = functions.https.onRequest((request,response) => {

})
