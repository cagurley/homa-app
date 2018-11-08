import React, { Component } from 'react';

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('existing-iframe-example', {
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//     });
//   }

class YTPlayer extends Component {
  // onYouTubeIframeAPIReady() {
  //   return (
  //     new YT.Player('player', {
  //       height: '390',
  //       width: '640',
  //       videoId: 'M7lc1UVf-VE',
  //       events: {
  //         'onReady': onPlayerReady,
  //         'onStateChange': onPlayerStateChange
  //       }
  //     })
  //   );
  // }

  render() {
    return (
      <div id="player"></div>
    );
  }
}

export default YTPlayer;
