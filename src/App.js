import React, { Component } from 'react';
import './App.css';

import TextInputPanel from './TextInputPanel'
import ChordEditPanel from './ChordEditPanel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextInputPanel />
        <ChordEditPanel />
      </div>
    );
  }
}

export default App;
