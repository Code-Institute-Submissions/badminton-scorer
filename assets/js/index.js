$("document").ready(function () {
    // ----- Initialize Mini-Court Area on Game Settings Modal and Menu settings -----
    // Hide End Match menu
    hideElement(`#end-match`);

    // --- Hide shuttles ---
    showHideShuttle("main", "left", "right");
    showHideShuttle("mini", "left", "right");
    
    // --- Hide Players ---
    showHidePlayers("main", "hide", "1");
    showHidePlayers("mini", "hide", "1");

    // Main Court Area
    disableElement(`#team-a-player-1`);
    disableElement(`#team-a-player-2`);
    disableElement(`#team-b-player-1`);
    disableElement(`#team-b-player-2`);

    console.log("Initialized")
});

var intMidIntervalBreak = 0;
var intFullIntervalBreak = 0;
var blnVoiceOver = true;

//Instantiate each player with default names and icon color
var playerA = new Player("Player One", "blue"); //Variable to hold the Player A object
var playerB = new Player("Player Two", "blue"); //Variable to hold the Player B object
var playerC = new Player("Player Three", "blue"); //Variable to hold the Player C object
var playerD = new Player("Player Four", "blue"); //Variable to hold the Player D object
var gameMatchType = 1; //variable to hold the Match Type 1-Singles Match/2-Dubles Match

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
  if($('#mid-interval-seconds').val()>60 ){
      $("#mid-interval-seconds" ).val("");
  }
});

$("#full-interval-seconds").keyup(function() {
  if($('#full-interval-seconds').val()>120 ){
      $("#full-interval-seconds" ).val("");
  }
});

$(`.left-scorer`).hover(function() {
    startGame ? setBackgroundColor(`.left-scorer`, "green"): setBackgroundColor(`.left-scorer`, "gray");
});

$(`.left-scorer`).mouseleave(function() {
    setBackgroundColor(`.left-scorer`, "gray");
});

$(`.right-scorer`).hover(function() {
    startGame ? setBackgroundColor(`.right-scorer`, "green"): setBackgroundColor(`.right-scorer`, "gray");
});

$(`.right-scorer`).mouseleave(function() {
    setBackgroundColor(`.right-scorer`, "gray");
});

function enableMidIntervalInput() {
    if($(`#mid-interval-break`).is(':checked')) {
        enableElement(`#mid-interval-seconds`);
    } else {
        disableElement(`#mid-interval-seconds`);
        intMidIntervalBreak = 0;
    };
};

function enableFullIntervalInput() {
    if($(`#full-interval-break`).is(':checked')) {
        enableElement(`#full-interval-seconds`);
    } else {
        disableElement(`#full-interval-seconds`);
        intFullIntervalBreak = 0;
    };
};

function enableVoiceOver() {
    $(`#voice-over`).is(':checked') ? blnVoiceOver = true: blnVoiceOver = false;
};

// Check for orientation changes
window.addEventListener("orientationchange", function() {
        //centerMenuSetting();
}, false);

function endMatch() {
    hideElement(`#end-match`);
    showElement(`#new-match`);
};

function gameStart() {
    showElement(`#end-match`);
    hideElement(`#new-match`);
    disableElement(`#team-a-player-1`);
    disableElement(`#team-a-player-2`);
    disableElement(`#team-b-player-1`);
    disableElement(`#team-b-player-2`);
    startGame = true;

    //From this block of codes need to move when user press Start Match button
    if (teamAScore == 0 && teamBScore == 0) {
        $(`#left-service`).is(':checked') ? speakThisMsg(playerB.name + " to " + playerD.name): speakThisMsg(playerD.name + " to " + playerB.name);
        speakThisMsg("love all");
        speakThisMsg("play");
    };
    //To this block of codes need to move when user press Start Match button
};

// This function will disable element passed 
function disableElement(selector) {
    $(`${selector}`).attr("disabled", true);
};

// This function will enable element passed 
function enableElement(selector) {
    $(`${selector}`).attr("disabled", false);
};

// This function will hide element passed 
function hideElement(selector) {
    $(`${selector}`).hide();
};

// This function will show element passed 
function showElement(selector) {
    $(`${selector}`).show();
};

function setBackgroundColor(selector, color) {
    $(`${selector}`).css("background-color", color);
};

function speakThisMsg(message) {
    let thisMsg = new SpeechSynthesisUtterance();
    thisMsg = message;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(thisMsg));
};