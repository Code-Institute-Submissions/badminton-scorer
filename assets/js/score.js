var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var startGame = false;
var player = {};
var numberOfSet = 1;

function incrementScore(scoreSide) {
    if(!startGame) {
        alert("Game not started yet!");
        console.log("Game not started yet!")
        return;
    };
    if (gameMatchType == 1) {
        setElementValue(`#team-a-player-1`, getElementValue(`#team-a-player-2`));
        setElementSrc(`.team-a-player-1-img`, getElementSrc(`.team-a-player-2-img`));
        setElementValue(`#team-b-player-1`, getElementValue(`#team-b-player-2`));
        setElementSrc(`.team-b-player-1-img`, getElementSrc(`.team-b-player-2-img`));
    };
    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle("main", `${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                evenScoreShowHidePlayers();
            }
        } else {
            showHideShuttle("main", `${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                oddScoreShowHidePlayers();
            }
        };
        if (scoreSide == 'left' && serviceOver == 'left') {
            speakThisMsg("Service  Over");
        } else {
            switchPlayer(`${scoreSide}`);
        };
        speakThisMsg("Score");
        if (teamAScore == teamBScore) {
            speakThisMsg(teamAScore);   
            speakThisMsg("all");
        } else {
            speakThisMsg(teamAScore);   
            speakThisMsg(teamBScore);
        };
        serviceOver = 'right';
    } else if (scoreSide == 'right') {
        teamBScore++;
        if (teamBScore % 2 == 0) {
            showHideShuttle("main", `${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                evenScoreShowHidePlayers();
            }
        } else {
            showHideShuttle("main", `${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                oddScoreShowHidePlayers();
            }
        };
        if (scoreSide == 'right' && serviceOver == 'right') {
            speakThisMsg("Service  Over");
        } else {
            switchPlayer(`${scoreSide}`);
        };
        speakThisMsg("Score");
        if (teamBScore == teamAScore) {
            speakThisMsg(teamBScore);   
            speakThisMsg("all");
            speakThisMsg(speakThisMsg);
        } else {
            //Here to put logic to end game set base on team score
            speakThisMsg(teamBScore);   
            speakThisMsg(teamAScore);
        };
        serviceOver = 'left';
    };

    // let's put some delay (2secs) here if voice over is enabled
    var voiceTimer = 5;
    var timeToVoiceOver = setInterval(delayforVoice, 5000);
    function delayforVoice() {
        if (voiceTimer == -1) {
            clearTimeout(voiceTimer);
            enableElement(`.left-scorer`);
            enableElement(`.right-scorer`);
        } else {
            voiceTimer--;
            disableElement(`left-scorer`);
            disableElement(`right-scorer`);
        }
    };

    // This will enable the mid-game timer when a team reached 11 points
    if(teamAScore == 11 || teamBScore == 11) {
        setElementInnerHTML(`#interval-timer`, intMidIntervalBreak);
        $('#game-interval').modal('show');
        hideElement(`#close-interval`);
        var timeLeft = intMidIntervalBreak-1;
        var timerSec = setInterval(countdown, 1000);
        function countdown() {
            if (timeLeft == -1) {
                clearTimeout(timerSec);
                $("#close-interval").click();
            } else {
                $('#game-interval').modal('show');
                setElementInnerHTML(`#interval-timer`, timeLeft);
                timeLeft--
            }
        };
    };
};

// function to call for set timeout
function switchPlayer(scoreSide) {
    var tempName = "";
    var tempColor = "";
    if (scoreSide == 'left') {
        tempName = getElementValue(`#team-a-player-1`);
        tempColor = getElementSrc(`.team-a-player-1-img`);
        setElementValue(`#team-a-player-1`, getElementValue(`#team-a-player-2`));
        setElementSrc(`.team-a-player-1-img`, getElementSrc(`.team-a-player-2-img`));
        setElementValue(`#team-a-player-2`, tempName);
        setElementSrc(`.team-a-player-2-img`, tempColor);
    } else if (scoreSide == 'right') {
        tempName = getElementValue(`#team-b-player-1`);
        tempColor = getElementSrc(`.team-b-player-1-img`);
        setElementValue(`#team-b-player-1`, getElementValue(`#team-b-player-2`));
        setElementSrc(`.team-b-player-1-img`, getElementSrc(`.team-b-player-2-img`));
        setElementValue(`#team-b-player-2`, tempName);
        setElementSrc(`.team-b-player-2-img`, tempColor);
    };
};

function evenScoreShowHidePlayers() {
    showElement(`.team-a-player-2-img`);
    showElement(`#team-a-player-2`);
    hideElement(`.team-a-player-1-img`);
    hideElement(`#team-a-player-1`);
    showElement(`.team-b-player-2-img`);
    showElement(`#team-b-player-2`);
    hideElement(`.team-b-player-1-img`);
    hideElement(`#team-b-player-1`);
};

function oddScoreShowHidePlayers() {
    hideElement(`.team-a-player-2-img`);
    hideElement(`#team-a-player-2`);
    showElement(`.team-a-player-1-img`);
    showElement(`#team-a-player-1`);
    hideElement(`.team-b-player-2-img`);
    hideElement(`#team-b-player-2`);
    showElement(`.team-b-player-1-img`);
    showElement(`#team-b-player-1`);
};