import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Transformers from './components/transformers';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Transformers />
      </div>
    );
  }
}

export default App;
