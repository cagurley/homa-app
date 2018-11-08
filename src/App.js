import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Gallery from './Gallery';
import Music from './Music';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Gallery} />
          <Route exact path='/Music' component={Music} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
