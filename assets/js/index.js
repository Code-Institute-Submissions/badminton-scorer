$("document").ready(function () {
    $(`#end-match`).hide()

    // ----- Initialize Mini-Court Area on Game Settings Modal -----
    // --- Hide shuttles ---
    /*
    $(`#left-court-left-side-shuttle`).hide();
    $(`#left-court-right-side-shuttle`).show();
    $(`#right-court-left-side-shuttle`).hide();
    $(`#right-court-right-side-shuttle`).hide();
    $(`#mini-left-court-left-side-shuttle`).hide();
    $(`#mini-left-court-right-side-shuttle`).show();
    $(`#mini-right-court-left-side-shuttle`).hide();
    $(`#mini-right-court-right-side-shuttle`).hide();
    */
    showHideShuttle("main", "left", "right");
    showHideShuttle("mini", "left", "right");
    
    // --- Hide Players ---
    showHidePlayers("main", "hide", "1");
    showHidePlayers("mini", "hide", "1");

    /*
    $(`.mini-left-court-left-player-container`).hide();
    $(`#left-court-left-side-shuttle`).show();


    $(`.team-a-player-1`).hide();
    $(`#team-a-player-1`).hide();
    $(`.right-court-left-player-container`).hide();
    $(`.team-b-player-1`).hide();
    $(`#team-b-player-1`).hide();
    $(`#left-court-right-side-shuttle`).show();
    */
    // Main COurt Area
    $(`#team-a-player-1`).attr("disabled", "disabled");
    $(`#team-a-player-2`).attr("disabled", "disabled");
    $(`#team-b-player-1`).attr("disabled", "disabled");
    $(`#team-b-player-2`).attr("disabled", "disabled");
});


function showHideGameMenuItems(option, matchType) {

};

// This function will disable element passed 
function disableElement(selector) {
    $(`${selector}`).attr("disabled", "disabled");
};

// This function will enable element passed 
function disableElement(selector) {
    $(`${selector}`).attr("disabled", "enabled");
};

// This function will hide element passed 
function hideElement(selector) {
    $(`${selector}`).hide();
};

// This function will show element passed 
function showElement(selector) {
    $(`${selector}`).show();
}

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

$(`.left-scorer`).hover(function() {
    if(startGame == true) {
        $(`.left-scorer`).css("background-color", "green")
    }
});

$(`.left-scorer`).mouseleave(function() {
    $(`.left-scorer`).css("background-color", "gray")
});

$(`.right-scorer`).hover(function() {
    if(startGame == true) {
        $(`.right-scorer`).css("background-color", "green")
    }
});

$(`.right-scorer`).mouseleave(function() {
    $(`.right-scorer`).css("background-color", "gray")
});

// Check for orientation changes
window.addEventListener("orientationchange", function() {
        //centerMenuSetting();
}, false);

function endMatch() {
    $(`#end-match`).hide();
    $(`#new-match`).show();
};

function gameStart() {
    $(`#end-match`).show();
    $(`#new-match`).hide();
    $(`#team-a-player-1`).attr("disabled", "disabled");
    $(`#team-a-player-2`).attr("disabled", "disabled");
    $(`#team-b-player-1`).attr("disabled", "disabled");
    $(`#team-b-player-2`).attr("disabled", "disabled");
    startGame = true;

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
};
