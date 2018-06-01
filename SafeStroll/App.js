import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import RNShakeEvent from 'react-native-shake-event';
import Communications from 'react-native-communications';
import GlobalFont from 'react-native-global-font';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

const ShakeEvent = require('react-native-shake-event'); //shake event stuff

class App extends Component {
  componentWillMount() {
    const fontName = 'Heiti TC';
    GlobalFont.applyGlobal(fontName);
    ShakeEvent.addEventListener('shake', () => {
    Communications.phonecall('112', true);
  });
    const config = {
      apiKey: 'AIzaSyAyliELgXeuVzjCet4TZJmELmvc9B-JqvQ',
      authDomain: 'safestroll-ccf3c.firebaseapp.com',
      databaseURL: 'https://safestroll-ccf3c.firebaseio.com',
      projectId: 'safestroll-ccf3c',
      storageBucket: 'safestroll-ccf3c.appspot.com',
      messagingSenderId: '125161140529'
    };

firebase.initializeApp(config);
}

componentWillUnmount() {
  RNShakeEvent.removeEventListener('shake');
}

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
