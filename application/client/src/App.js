import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './componenets/Main.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <Main />
    );
  }
}

export default App;
