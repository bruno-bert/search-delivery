import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCec0MFAEBTJHX__GR3Brd17zdAQ5sIiCQ",
    authDomain: "jazz-app-3ea68.firebaseapp.com",
    databaseURL: "https://jazz-app-3ea68.firebaseio.com",
    projectId: "jazz-app-3ea68",
    storageBucket: "jazz-app-3ea68.appspot.com",
    messagingSenderId: "159381504388",
    appId: "1:159381504388:web:a51dac20ff7bceda84ddd1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 