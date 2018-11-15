import React, { Component } from 'react';

class YTPlayer extends Component {
  // The below global variable is used by the embedded script
  // to check if the YT.Player obejct can be instantiated by
  // the YouTube iframe API. Check ../public/embed.js for more.
  componentDidMount() {
    window.PlayerComponent = true;
  }

  render() {
    return (
      <div id="playerWrapper">
        <iframe id="player" frameBorder="0" allowFullScreen="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="390" src="https://www.youtube.com/embed/?enablejsapi=1"></iframe>
      </div>
    );
  }
}

export default YTPlayer;
