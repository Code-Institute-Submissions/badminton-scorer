var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var pending = false;
var startGame = false;
var player = {};
var numberOfSet = 1;
/*
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
*/
function incrementScore(scoreSide) {
    if(!startGame) {
        alert("Game not started yet!");
        console.log("Game not started yet!")
        return;
    };
    if (gameMatchType == 1) {
        setElementValue(`#team-a-player-1`, getElementValue(`#team-a-player-2`));
        setElementSrc(`.team-a-player-1-img`, $(`.team-a-player-2-img`).attr("src"));
        setElementValue(`#team-b-player-1`, getElementValue(`#team-b-player-2`));
        setElementSrc(`.team-b-player-1-img`, $(`.team-b-player-2-img`).attr("src"));
    };
    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle("main", `${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                $(`.team-a-player-2-img`).show();
                $(`#team-a-player-2`).show();
                $(`.team-a-player-1-img`).hide();
                $(`#team-a-player-1`).hide();
                $(`.team-b-player-2-img`).show();
                $(`#team-b-player-2`).show();
                $(`.team-b-player-1-img`).hide();
                $(`#team-b-player-1`).hide();
            }
        } else {
            showHideShuttle("main", `${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                $(`.team-a-player-2-img`).hide();
                $(`#team-a-player-2`).hide();
                $(`.team-a-player-1-img`).show();
                $(`#team-a-player-1`).show();
                $(`.team-b-player-2-img`).hide();
                $(`#team-b-player-2`).hide();
                $(`.team-b-player-1-img`).show();
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
            showHideShuttle("main", `${scoreSide}`, 'right');
            if (gameMatchType == 1) {
                $(`.team-a-player-2-img`).show();
                $(`#team-a-player-2`).show();
                $(`.team-a-player-1-img`).hide();
                $(`#team-a-player-1`).hide();
                $(`.team-b-player-2-img`).show();
                $(`#team-b-player-2`).show();
                $(`.team-b-player-1-img`).hide();
                $(`#team-b-player-1`).hide();
            }
        } else {
            showHideShuttle("main", `${scoreSide}`, 'left');
            if (gameMatchType == 1) {
                $(`.team-a-player-2-img`).hide();
                $(`#team-a-player-2`).hide();
                $(`.team-a-player-1-img`).show();
                $(`#team-a-player-1`).show();
                $(`.team-b-player-2-img`).hide();
                $(`#team-b-player-2`).hide();
                $(`.team-b-player-1-img`).show();
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
    //This will enable the +1 Div until all the following code has been executed.
    $(`.left-scorer`).prop("disabled", false);
    if(teamAScore == 11 || teamBScore == 11) {
        $('#game-interval').modal('show');
        console.log(intMidIntervalBreak);
        for (i = intMidIntervalBreak; i > 0 ; i--) {
            $.wait(1000);
            console.log(i);
            setElementInnerHTML(`#interval-timer`, i);
            //$('#game-interval').modal('show');
        }
        //$("#close-interval").click();
    };
    //console.log('enable')
};

// function to wait
$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
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