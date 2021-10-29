//YOUTUBE VIDEO API 사용
// 참고  https://developers.google.com/youtube/iframe_api_reference?hl=ko
//       https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ko#Parameters

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'An6LvWQuj_8',
    playerVars: {
      autoplay: true, //자동재생
      loop: true,  //반복재생
      playlist: 'An6LvWQuj_8'
    },
    events: {
      'onReady': function(event){
        event.target.mute()//음소거
      }
    }
  });
}