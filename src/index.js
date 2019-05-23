import React from 'react';
import ReactDOM from 'react-dom';
// Ionic 4 styles
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAu8p1mKl7gQYrG7cL-E7zB6dXNBIZ-Cbo',
  authDomain: 'gastos-comunes-d9d31.firebaseapp.com',
  databaseURL: 'https://gastos-comunes-d9d31.firebaseio.com',
  projectId: 'gastos-comunes-d9d31',
  storageBucket: 'gastos-comunes-d9d31.appspot.com',
  messagingSenderId: '840895294670',
  appId: '1:840895294670:web:b75b298056bffed4'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
