window.PlayerComponent = null; // Is set to true by ../src/YTPlayer.js
window.Ytapi = null;
window.Player = null;

/*****
The below functions allow two chances to properly instantiate the player.
This helps with the disconnect between the mandatorily embedded YouTube script
and the strict requirements of React components.
*****/
function onYouTubeIframeAPIReady() {
  window.Ytapi = true;
  if (window.PlayerComponent) {
    console.log('CALLED ON APIREADY');
    window.Player = new YT.Player('player', {});
  }
}

function bodyReady() {
  if (window.PlayerComponent && window.Ytapi && !window.Player) {
    console.log('CALLED ON BODYREADY');
    window.Player = new YT.Player('player', {});
  }
}
