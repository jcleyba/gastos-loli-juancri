import React from 'react';
import ReactDOM from 'react-dom';
// Ionic 4 styles
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDXFZnzQ2zbxrtwzhC5RFX2Q9KsnJgZFVI",
  authDomain: "misgastospormes.firebaseapp.com",
  databaseURL: "https://misgastospormes.firebaseio.com",
  projectId: "misgastospormes",
  storageBucket: "misgastospormes.appspot.com",
  messagingSenderId: "67917001311",
  appId: "1:67917001311:web:cc1ba7dd408f5624"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
