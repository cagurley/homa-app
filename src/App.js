import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Background from './Background';
import Nav from './Nav';
import Gallery from './Gallery';
import Music from './Music';
import Museum from './Museum';
import NotFound from './NotFound';

class App extends Component {
  state = {
    backgroundStyle: {
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bilbao_-_Guggenheim_aurore.jpg/1200px-Bilbao_-_Guggenheim_aurore.jpg)'
    }
  }

  updateBackground = url => {
    url = `url(${url})`;
    console.log(url);
    this.setState(prevState => ({
      backgroundStyle: {
        backgroundImage: url
      }
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Background backgroundStyle={this.state.backgroundStyle} />
          <Nav />
          <Switch>
            <Route
              exact path="/"
              component={Gallery} />
            <Route
              exact path='/Music'
              component={Music} />
            <Route
              exact path='/Museum'
              render={() =>
                <Museum handleBackgroundUpdate={this.updateBackground} />
              } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
