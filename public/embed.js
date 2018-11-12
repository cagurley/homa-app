window.Player = null;
function onYouTubeIframeAPIReady() {
  window.Player = new YT.Player('player', {});
}
