import React, { Component } from 'react';
import YTPlayer from './YTPlayer';

class Music extends Component {
  state = {
    player: null,
    done: false
  }

  render(props) {
    return (
      <div className="container">
        <YTPlayer />
      </div>
    );
  }
}

export default Music;
