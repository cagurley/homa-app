import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
          <Route
            path="/"
            render={({ location }) => {
              let hiddenGallery = true;
              let hiddenMusic = true;
              if (location.pathname === '/Gallery') {
                hiddenGallery = false;
              } else if (location.pathname === '/Music') {
                hiddenMusic = false;
              }
              return (
                <div>
                  <Gallery hidden={hiddenGallery}/>
                  <Music hidden={hiddenMusic} />
                </div>
              );
            }} />
          <Switch>
            <Redirect exact from="/" to="/Gallery"/>
            <Route exact path="/Gallery" />
            <Route exact path="/Music" />
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
