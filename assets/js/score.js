var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var startGame = false;
var player = {};
var gameSet = 1;
var voiceTimer = 3;
var timeToVoiceOver = 0;
var blnMidBreak = false;

function incrementScore(scoreSide) {
    if(!startGame) {
        alert("Game not started yet!");
        console.log("Game not started yet!")
        return;
    };
    console.log('Game On!', teamAScore, teamBScore);
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

    // This will enable the mid-game interval timer when a team reached 11 points first
    if ((teamAScore == 11 && teamBScore < 11) || (teamBScore == 11 || teamAScore < 11))  {
        setElementInnerHTML(`#interval-timer`, intMidIntervalBreak);
        $('#game-interval').modal('show');
        hideElement(`#close-interval`);
        intervalCountdown(intMidIntervalBreak);
        (gameSet == 3) ? blnMidBreak = true : blnMidBreak = false;
    };

    // This will enable the full-game interval timer if one of the following condition is met
    // 1. If a team score 21 points first and with a lead points of 2 or more (i.e. 21:19 or 19:21, or 21:7 etc)
    // 2. if a team score is greater than 21 points with a lead points of 2 (i.e. 22:20, 20:22, 23:21 etc.)
    // 3. if a team reaches 30 points first (i.e. 30:29 or 29:30)
    console.log(teamAScore, teamBScore)
    if ((teamAScore == 21 && teamBScore <= 19) || (teamBScore == 21 || teamAScore <= 19)
        || (teamAScore > 21 && (teamAScore-teamBScore) >= 2) || (teamBScore > 21 && teamBScore - teamAScore > 2)
        || (teamAScore == 30 || teamBScore == 30)) {
        setElementInnerHTML(`#interval-timer`, intFullIntervalBreak);
        $('#game-interval').modal('show');
        hideElement(`#close-interval`);
        intervalCountdown(intFullIntervalBreak);
        gameSet++;
        teamAScore = 0;
        teamBScore = 0;
    }

    // Reflect the score on the Score Tally Board
    switch(gameSet) {
        case 1:
            setElementValue(`#team-a-set-one`, teamAScore);
            setElementValue(`#team-b-set-one`, teamBScore);
            break;
        case 2:
            setElementValue(`#team-a-set-one`, teamBScore);
            setElementValue(`#team-b-set-one`, teamAScore);
            break;
        case 3:
            switch(blnMidBreak) {
                case false:
                    setElementValue(`#team-a-set-one`, teamAScore);
                    setElementValue(`#team-b-set-one`, teamBScore);
                    break;
                case true:
                    setElementValue(`#team-a-set-one`, teamBScore);
                    setElementValue(`#team-b-set-one`, teamAScore);
                    break;
            }
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

