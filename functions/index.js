const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// exports.touch = functions.database.ref('/todoList/{message}').onWrite(
//   event => admin.database().ref('/lastmodified').set(event.timestamp)
// );

// exports.timer = functions.database.ref('/todoList/{message}').onWrite((event) => {
//   admin.database().ref('/timerId').once('value', (data) => {
//     clearInterval(data.val());
//   })
//   var refreshIntervalId = setInterval(function(){ admin.database().ref('/last').set((event + "/" + (new Date().toISOString()))) }, 1000);
//   admin.database().ref('/timerId').set(refreshIntervalId)
// });
