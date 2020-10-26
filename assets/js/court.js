$("document").ready(function () {
    // ----- Initialize Mini-Court Area on Game Settings Modal and Menu settings -----
    // Hide End Match menu
    hideElement(`#end-match`);
    addClass(`#team-a-yellow-card`, "not-active");
    addClass(`#team-a-red-card`, "not-active");
    addClass(`#team-a-black-card`, "not-active");
    addClass(`#team-b-yellow-card`, "not-active");
    addClass(`#team-b-red-card`, "not-active");
    addClass(`#team-b-black-card`, "not-active");
    addStyle(`#team-a-yellow-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-a-red-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-a-black-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-b-yellow-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-b-red-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-b-black-card`, "text-shadow", "gray 1px 1px 1px")

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

    playerA = new player("PLAYER NAME", "assets/images/blue-player.png", false); //Variable to hold the Player A object
    playerB = new player("PLAYER NAME", "assets/images/yellow-player.png", true); //Variable to hold the Player B object
    playerC = new player("PLAYER NAME", "assets/images/green-player.png", false); //Variable to hold the Player C object
    playerD = new player("PLAYER NAME", "assets/images/red-player.png", true); //Variable to hold the Player D object

    console.log("Initialized")
});

var intMidIntervalBreak = 0;
var intFullIntervalBreak = 0;
var blnVoiceOver = true;
var gameMatchType = 1; //variable to hold the Match Type 1-Singles Match/2-Dubles Match
var issuedLeftCard = 0;
var issuedRightCard = 0;

// This will show the game match settings
function startNewMatch() {
    $('#game-settings').modal('show');
}

// This will start the Badminton Scorer and initialize everything
function gameStart() {
    showElement(`#end-match`);
    hideElement(`#new-match`);
    disableElement(`#team-a-player-1`);
    disableElement(`#team-a-player-2`);
    disableElement(`#team-b-player-1`);
    disableElement(`#team-b-player-2`);
    removeClass(`#team-a-yellow-card`, "not-active");
    removeClass(`#team-b-yellow-card`, "not-active");
    removeStyle(`#team-a-yellow-card`);
    removeStyle(`#team-a-yellow-card`);

    // set Player's Image color and Name
    setElementSrc(`.team-a-player-1-img`, playerA.src)
    setElementSrc(`.team-a-player-2-img`, playerB.src)
    setElementSrc(`.team-b-player-1-img`, playerC.src)
    setElementSrc(`.team-b-player-2-img`, playerD.src)
    setElementValue(`#team-a-player-1`, playerA.name)
    setElementValue(`#team-a-player-2`, playerB.name)
    setElementValue(`#team-b-player-1`, playerC.name)
    setElementValue(`#team-b-player-2`, playerD.name)
    if (gameMatchType == 1) {
        setElementSrc(`.team-a-player-1-img`, playerB.src)
        setElementSrc(`.team-b-player-1-img`, playerD.src)
        setElementValue(`#team-a-player-1`, playerB.name)
        setElementValue(`#team-b-player-1`, playerD.name)
        playerA.name = playerB.name;
        playerA.src = playerB.src;
        playerC.name = playerD.name
        playerC.src = playerD.src
    };

    // set ScoreBoards Player Names and all Score default to zero
    setElementInnerHTML(`#team-a-names`, gameMatchType == 2 ? playerA.name + "<br>" + playerB.name: playerB.name)
    setElementInnerHTML(`#team-b-names`, gameMatchType == 2 ? playerC.name + "<br>" + playerD.name: playerD.name)
    setElementInnerHTML(`.tally-team-a-players`, gameMatchType == 2 ? playerA.name + "/" + playerB.name : playerB.name);
    setElementInnerHTML(`.tally-team-b-players`, gameMatchType == 2 ? playerC.name + "/" + playerD.name : playerD.name);

    setElementInnerHTML(`#team-a-set-one`, "0")
    setElementInnerHTML(`#team-b-set-one`, "0")
    setElementInnerHTML(`#team-a-set-two`, "0")
    setElementInnerHTML(`#team-b-set-two`, "0")
    setElementInnerHTML(`#team-a-set-three`, "0")
    setElementInnerHTML(`#team-b-set-three`, "0")

    $(`#mid-interval-break`).is(':checked') ? intMidIntervalBreak = getElementValue(`#mid-interval-seconds`) : intMidIntervalBreak = 0;
    $(`#full-interval-break`).is(':checked') ? intFullIntervalBreak = getElementValue(`#full-interval-seconds`) : intFullIntervalBreak = 0;

    // Set Warnings Cards
    addStyle(`#team-a-red-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-a-black-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-b-red-card`, "text-shadow", "gray 1px 1px 1px")
    addStyle(`#team-b-black-card`, "text-shadow", "gray 1px 1px 1px")
    addClass(`#team-a-red-card`, "not-active");
    addClass(`#team-a-black-card`, "not-active");
    addClass(`#team-b-red-card`, "not-active");
    addClass(`#team-b-black-card`, "not-active");

    startGame = true;

    if (teamAScore == 0 && teamBScore == 0) {
        $(`#left-service`).is(':checked') ? speakThisMsg(playerB.name + " to " + playerD.name): speakThisMsg(playerD.name + " to " + playerB.name);
        speakThisMsg("love all");
        speakThisMsg("play");
    };
};

// Start Source https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function validate(interval, evt) {
  var theEvent = evt || window.event;

  // Handle paste on input text of numeric type
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

// This will caught keyup function on the mid-interval timer input text 
$("#mid-interval-seconds").keyup(function() {
  if($('#mid-interval-seconds').val()>60 ){
      $("#mid-interval-seconds" ).val("");
  }
});

// This will caught keyup function on the full-interval timer input text 
$("#full-interval-seconds").keyup(function() {
  if($('#full-interval-seconds').val()>120 ){
      $("#full-interval-seconds" ).val("");
  }
});

// This will caught hover event on left scorer button 
$(`.left-scorer`).hover(function() {
    startGame ? setBackgroundColor(`.left-scorer`, "green"): setBackgroundColor(`.left-scorer`, "gray");
});

// This will caught mouseleave event on left scorer button 
$(`.left-scorer`).mouseleave(function() {
    setBackgroundColor(`.left-scorer`, "gray");
});

// This will caught hover event on right scorer button 
$(`.right-scorer`).hover(function() {
    startGame ? setBackgroundColor(`.right-scorer`, "green"): setBackgroundColor(`.right-scorer`, "gray");
});

// This will caught mpuseleave event on right scorer button 
$(`.right-scorer`).mouseleave(function() {
    setBackgroundColor(`.right-scorer`, "gray");
});

// This will enable/disable mid-interval input text when the mid-interval checkbox changed
function enableMidIntervalInput() {
    if($(`#mid-interval-break`).is(':checked')) {
        enableElement(`#mid-interval-seconds`);
    } else {
        disableElement(`#mid-interval-seconds`);
        intMidIntervalBreak = 0;
    };
};

// This will enable/disable full-interval input text when the mid-interval checkbox changed
function enableFullIntervalInput() {
    if($(`#full-interval-break`).is(':checked')) {
        enableElement(`#full-interval-seconds`);
    } else {
        disableElement(`#full-interval-seconds`);
        intFullIntervalBreak = 0;
    };
};

// This will hold the variable whether voice-over will be enabled/disable when checkbox changed
function enableVoiceOver() {
    $(`#voice-over`).is(':checked') ? blnVoiceOver = true: blnVoiceOver = false;
};

// Check for orientation changes
window.addEventListener("orientationchange", function() {
        //centerMenuSetting();
}, false);

// This will end the current match with input notes and will show the Match Result Tally Score Board after. 
function endMatch() {
    startGame = false;
    hideElement(`#end-match`);
    showElement(`#new-match`);
    //Show modal for End-Game Reason
    $('#game-interval').modal('hide');
    $('#end-game-set').modal('show');
};

function showGameResult() {
    //Show modal Match Result Tally Score Board
    appendChild(`#umpire-notes`, `<p style="margin-left:1vw;">${getElementValue("#additional-notes")}</p>`);
    $('#end-game-result').modal('show');
};

// This will issue a yellow card to the team base on passed parameter
function issueYellowCard(side) {
    var issuedCard = 0; 
    (side == 'left') ? issuedLeftCard++ : issuedRightCard++ ;
    (side == 'left') ? issuedCard = issuedLeftCard : issuedCard = issuedRightCard;
    issueProperYellowCard(side, issuedCard);
}

function issueProperYellowCard(side, noOfIssue) {
    if(noOfIssue == 1) {
        setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-first-yellow-warning`, "yellow");
        setElementInnerHTML(`#team-${(side == 'left'? 'a':'b')}-first-warning`, noOfIssue)
        // For Match Results
        setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-yellow-one`, "yellow");
    } else if(noOfIssue == 2) {
        setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-second-yellow-warning`, "yellow");
        setElementInnerHTML(`#team-${(side == 'left'? 'a':'b')}-second-warning`, noOfIssue)
        addClass(`#team-${(side == 'left'? 'a':'b')}-yellow-card`, "not-active");
        addStyle(`#team-${(side == 'left'? 'a':'b')}-yellow-card`, "text-shadow", "gray 1px 1px 1px")
        removeClass(`#team-${(side == 'left'? 'a':'b')}-red-card`, "not-active");
        removeStyle(`#team-${(side == 'left'? 'a':'b')}-red-card`);
        // For Match Results
        setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-yellow-two`, "yellow");
    };
};

// This will issue a Red card to the team base on passed parameter
function issueRedCard(side) {
    setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-red-warning`, "red");
    addClass(`#team-${(side == 'left'? 'a':'b')}-red-card`, "not-active");
    addStyle(`#team-${(side == 'left'? 'a':'b')}-red-card`, "text-shadow", "gray 1px 1px 1px")
    removeClass(`#team-${(side == 'left'? 'a':'b')}-black-card`, "not-active");
    removeStyle(`#team-${(side == 'left'? 'a':'b')}-black-card`);
    // For Match Results
    setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-red`, "red");
};

// This will issue a Red card to the team base on passed parameter
function issueBlackCard(side) {
    setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-black-warning`, "black");
    addClass(`#team-${(side == 'left'? 'a':'b')}-black-card`, "not-active");
    addStyle(`#team-${(side == 'left'? 'a':'b')}-black-card`, "text-shadow", "gray 1px 1px 1px")
    // For Match Results
    setBackgroundColor(`#team-${(side == 'left'? 'a':'b')}-black`, "black");
};

// This function will add style to an element
function addStyle(selector, style, value){
    $(`${selector}`).css(style, value);
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

// This function will set element background color 
function setBackgroundColor(selector, color) {
    $(`${selector}`).css("background-color", color);
};

// This function will get element's value 
function getElementValue(selector) {
    return $(`${selector}`).val();
};

// This function will set element's value 
function setElementValue(selector, value) {
    $(`${selector}`).val(value);
};

// This function will set image element's src attribute 
function setElementSrc(selector, source) {
    $(`${selector}`).attr("src", source);
};

// This function will set image element's src attribute 
function getElementSrc(selector, source) {
    return $(`${selector}`).attr("src");
};

// This function will set element's innerText
function setElementInnerHTML(selector, innerHTML) {
    $(`${selector}`).html(innerHTML);
};

// This function will append child to a parent
function appendChild(selector, htmlText) {
    $(`${selector}`).append(htmlText);
}

// This function will add class to an element
function addClass(selector, className) {
    $(`${selector}`).addClass(className);
};

// This function will remove class to an element
function removeClass(selector, className) {
    $(`${selector}`).removeClass(className);
};

// This function will remove css style to an element
function removeStyle(selector) {
    $(`${selector}`).removeAttr("style");
};

// Voice-Over synthesizer for text input
function speakThisMsg(message) {
    if(blnVoiceOver) {
        let thisMsg = new SpeechSynthesisUtterance();
        thisMsg = message;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(thisMsg));
    };
};