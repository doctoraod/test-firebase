import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC4sllU_bF50FKjwESix638Y4yMNEEnYGw",
  authDomain: "aod-test-everything.firebaseapp.com",
  databaseURL: "https://aod-test-everything.firebaseio.com",
  projectId: "aod-test-everything",
  storageBucket: "aod-test-everything.appspot.com",
  messagingSenderId: "923749057368"
}
firebase.initializeApp(config)

export default firebase.database()
