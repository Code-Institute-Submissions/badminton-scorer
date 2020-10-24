var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var startGame = false;
var player = {};
var numberOfSet = 1;
var voiceTimer = 3;
var timeToVoiceOver = 0;

function incrementScore(scoreSide) {
    if(!startGame) {
        alert("Game not started yet!");
        console.log("Game not started yet!")
        return;
    };

    // disable the button until all have been executed
    disableElement(`.left-scorer`);
    disableElement(`.right-scorer`);
    setBackgroundColor(`.left-scorer`, "gray")
    setBackgroundColor(`.right-scorer`, "gray")

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
        } else {
            //Here to put logic to end game set base on team score
            speakThisMsg(teamBScore);   
            speakThisMsg(teamAScore);
        };
        serviceOver = 'left';
    };

    // let's put some delay (2secs) here if voice over is enabled
    voiceTimer = 3;
    if (blnVoiceOver) {
        delayForVoice(voiceTimer);
    } else {
        enableElement(`.left-scorer`);
        enableElement(`.right-scorer`);
    };
    // This will enable the mid-game timer when a team reached 11 points
    if(teamAScore == 11 || teamBScore == 11) {
        setElementInnerHTML(`#interval-timer`, intMidIntervalBreak);
        $('#game-interval').modal('show');
        hideElement(`#close-interval`);
        intervalCountdown(intMidIntervalBreak);
    };
};

function intervalCountdown(seconds) {
    let counter = seconds;
    const interval = setInterval(() => {
        setElementInnerHTML(`#interval-timer`, counter);
        counter--;
        if (counter < 0 ) {
            clearInterval(interval);
            $("#close-interval").click();
        }
    }, 1000);
};

function delayForVoice(seconds) {
    let counter = seconds;
    const interval = setInterval(() => {
        counter--;
        if (counter < 0 ) {
            clearInterval(interval);
            enableElement(`.left-scorer`);
            enableElement(`.right-scorer`);
        }
    }, 1000);
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

