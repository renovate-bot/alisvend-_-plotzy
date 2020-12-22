import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBq4rB1eeYRAeqUDy1mfkDwRhotPSzUtGo",
  authDomain: "plotzy-6fce8.firebaseapp.com",
  databaseURL: "https://plotzy-6fce8-default-rtdb.firebaseio.com",
  projectId: "plotzy-6fce8",
  storageBucket: "plotzy-6fce8.appspot.com",
  messagingSenderId: "375408189253",
  appId: "1:375408189253:web:9fd748fdba080d5485682c",
  measurementId: "G-G9H81MW0CM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;