import React, { Component } from 'react';

class YTPlayer extends Component {

  render() {
    return (
      <iframe id="player" frameBorder="0" allowFullScreen="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="390" src="https://www.youtube.com/embed/?enablejsapi=1"></iframe>
    );
  }
}

export default YTPlayer;
