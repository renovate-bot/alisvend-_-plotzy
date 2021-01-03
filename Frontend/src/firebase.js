import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDKcl3CSBywJAz75jM8m8xTQQupAOiT5eM",
  authDomain: "plotzy-300112.firebaseapp.com",
  databaseURL: "https://plotzy-300112-default-rtdb.firebaseio.com",
  projectId: "plotzy-300112",
  storageBucket: "plotzy-300112.appspot.com",
  messagingSenderId: "206533900915",
  appId: "1:206533900915:web:582b57e007f39f6c598806"
};

firebase.initializeApp(firebaseConfig);

export default firebase;