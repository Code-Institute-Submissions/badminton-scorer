var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var pending = false;
var startGame = false;
var player = {};
var numberOfSet = 1;

function incrementScoreDelay(scoreSide) {
    $(`.left-scorer`).prop("disabled", true);
    $('.left-scorer').off('mouseenter mouseleave'); 
    if (!pending) {
        pending = true;     
        setTimeout(() => { 
            incrementScorewithDelay(`${scoreSide}`);
            pending = false;
        }, 3000);
    };
    $(`.left-scorer`).prop("disabled", false);
    $('.left-scorer').on('mouseenter mouseleave');
    return;
};

function incrementScore(scoreSide) {
    if(!startGame) {
        alert("Game not started yet!");
        console.log("Game not started yet!")
        return;
    };
    if (gameMatchType == 1) {
        $(`#team-a-player-1`).val($(`#team-a-player-2`).val());
        $(`.team-a-player-1-img`).attr("src", $(`.team-a-player-2-img`).attr("src"));
        $(`#team-b-player-1`).val($(`#team-b-player-2`).val());
        $(`.team-b-player-1-img`).attr("src", $(`.team-b-player-2-img`).attr("src"));
    };
    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle(`${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                $(`.left-court-right-player-container`).show();
                $(`.team-a-player-2`).show();
                $(`#team-a-player-2`).show();
                $(`.left-court-left-player-container`).hide();
                $(`.team-a-player-1`).hide();
                $(`#team-a-player-1`).hide();
                $(`.right-court-right-player-container`).show();
                $(`.team-b-player-2`).show();
                $(`#team-b-player-2`).show();
                $(`.right-court-left-player-container`).hide();
                $(`.team-b-player-1`).hide();
                $(`#team-b-player-1`).hide();
            }
        } else {
            showHideShuttle(`${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                $(`.left-court-right-player-container`).hide();
                $(`.team-a-player-2`).hide();
                $(`#team-a-player-2`).hide();
                $(`.left-court-left-player-container`).show();
                $(`.team-a-player-1`).show();
                $(`#team-a-player-1`).show();
                $(`.right-court-right-player-container`).hide();
                $(`.team-b-player-2`).hide();
                $(`#team-b-player-2`).hide();
                $(`.right-court-left-player-container`).show();
                $(`.team-b-player-1`).show();
                $(`#team-b-player-1`).show();
            }
        };
        if (scoreSide == 'left' && serviceOver == 'left') {
            speakThisMsg = "Service  Over";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        } else {
            switchPlayer(`${scoreSide}`);
        };
        speakThisMsg = "Score";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        if (teamAScore == teamBScore) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamAScore));   
            speakThisMsg = "all";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        } else {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamAScore));   
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamBScore));
        };
        serviceOver = 'right';
    } else if (scoreSide == 'right') {
        teamBScore++;
        if (teamBScore % 2 == 0) {
            showHideShuttle(`${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                $(`.left-court-right-player-container`).show();
                $(`.team-a-player-2`).show();
                $(`#team-a-player-2`).show();
                $(`.left-court-left-player-container`).hide();
                $(`.team-a-player-1`).hide();
                $(`#team-a-player-1`).hide();
                $(`.right-court-right-player-container`).show();
                $(`.team-b-player-2`).show();
                $(`#team-b-player-2`).show();
                $(`.right-court-left-player-container`).hide();
                $(`.team-b-player-1`).hide();
                $(`#team-b-player-1`).hide();
            }
        } else {
            showHideShuttle(`${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                $(`.left-court-right-player-container`).hide();
                $(`.team-a-player-2`).hide();
                $(`#team-a-player-2`).hide();
                $(`.left-court-left-player-container`).show();
                $(`.team-a-player-1`).show();
                $(`#team-a-player-1`).show();
                $(`.right-court-right-player-container`).hide();
                $(`.team-b-player-2`).hide();
                $(`#team-b-player-2`).hide();
                $(`.right-court-left-player-container`).show();
                $(`.team-b-player-1`).show();
                $(`#team-b-player-1`).show();
            }
        };
        if (scoreSide == 'right' && serviceOver == 'right') {
            speakThisMsg = "Service  Over";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        } else {
            switchPlayer(`${scoreSide}`);
        };
        speakThisMsg = "Score";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        if (teamBScore == teamAScore) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamBScore));   
            speakThisMsg = "all";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        } else {
            //Here to put logic to end game set base on team score
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamBScore));   
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamAScore));
        };
        serviceOver = 'left';
    };
    //This will enable to +1 Div until all the following code has been executed.
    $(`.left-scorer`).prop("disabled", false);
    console.log('enable')
    return;
};

function switchPlayer(scoreSide) {
    var tempName = "";
    var tempColor = "";
    if (scoreSide == 'left') {
        tempName = $(`#team-a-player-1`).val();
        tempColor = $(`.team-a-player-1-img`).attr("src");
        $(`#team-a-player-1`).val($(`#team-a-player-2`).val());
        $(`.team-a-player-1-img`).attr("src", $(`.team-a-player-2-img`).attr("src"));
        $(`#team-a-player-2`).val(tempName);
        $(`.team-a-player-2-img`).attr("src", tempColor);
    } else if (scoreSide == 'right') {
        tempName = $(`#team-b-player-1`).val();
        tempColor = $(`.team-b-player-1-img`).attr("src");
        $(`#team-b-player-1`).val($(`#team-b-player-2`).val());
        $(`.team-b-player-1-img`).attr("src", $(`.team-b-player-2-img`).attr("src"));
        $(`#team-b-player-2`).val(tempName);
        $(`.team-b-player-2-img`).attr("src", tempColor);
    };

};