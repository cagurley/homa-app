console.log('LOADED');
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady
    },
    playerVars: {
      listType:'playlist',
      list: 'PL0igqK_a_sAgTtXdUP-SXN2Fvu8mRvXlV'
    }
  });
}
function onPlayerReady() {
    console.log('HERE', player.getDuration(), player.getVideoUrl())
    player.playVideo();
}
