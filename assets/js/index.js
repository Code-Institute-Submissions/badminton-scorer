$("document").ready(function () {
    $(`.left-scorer`).attr("disabled", "disabled");
    $(`.right-scorer`).attr("disabled", "disabled");
    $(`.left-court-left-player-container`).hide();
    $(`.team-a-player-1`).hide();
    $(`.right-court-left-player-container`).hide();
    $(`.team-b-player-1`).hide();
    $(`#left-court-right-side-shuttle`).show();
});
// Start Source https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function validate(interval, evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
};
// End Source https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

$("#mid-interval-seconds").keyup(function() {
  if($('#mid-interval-seconds').val()>360 ){
      $("#mid-interval-seconds" ).val("");
  }
});
$("#full-interval-seconds").keyup(function() {
  if($('#full-interval-seconds').val()>360 ){
      $("#full-interval-seconds" ).val("");
  }
});

// This will automatically position the Setup Menu element to the center if the window is resize.
function centerMenuSetting() {
    $(`.setup-menu-option`).css("left", ($(`.master-container`).width() / 2) - ($(`.setup-menu-option`).width() / 2));
    $(`.setup-menu-option`).css("top", ($(`.master-container`).height() / 2) );
    $(`.left-court-shuttles`).css("left", ($(".left-court-left-service-area").width() / 2) + $(`.left-court-shuttles`).width() / 2);
    $(`.right-court-shuttles`).css("left", ($(".right-court-left-service-area").width() / 2) - $(`.right-court-shuttles`).width() / 2);
    $(`.team-player`).width($(`.left-court-left-service-area`).width() * 0.5);
    $(`#team-a-player-1`).css("top", ($(`.master-container`).height() / 2) - $(`#team-a-player-1`).height() * 4);
    $(`#team-b-player-2`).css("top", ($(`.master-container`).height() / 2) - $(`#team-a-player-2`).height() * 4);
    $(`#team-a-player-2`).css("top", ($(`.master-container`).height()) - $(`#team-a-player-1`).height() * 6);
    $(`#team-b-player-1`).css("top", ($(`.master-container`).height()) - $(`#team-a-player-2`).height() * 6);
};

// Check for orientation changes
window.addEventListener("orientationchange", function() {
        centerMenuSetting();
}, false);

function gameStart() {
    $(`.left-scorer`).attr("disabled", "enabled");
    $(`.right-scorer`).attr("disabled", "enabled");
    $(".player-drop-down-toggle").prop("disabled", true);
    $(`.setup-menu-option`).hide();
    startGame = true;

    //Instantiate each player with names and icon color
    let playerA = new Player("Player A", "blue");
    let playerB = new Player("Player A", "blue");
    let playerC = new Player("Player A", "blue");
    let playerD = new Player("Player A", "blue");

    //From this block of codes need to move when user press Start Match button
    if (teamAScore == 0 && teamBScore == 0) {
        let speakThisMsg = new SpeechSynthesisUtterance();
        speakThisMsg = "Player B to server Player C";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        speakThisMsg = "love all";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        speakThisMsg = "play";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
    };

    //To this block of codes need to move when user press Start Match button
    return;
};

function Player (name, color) {
    this.name = name;
    this.color = color;
};