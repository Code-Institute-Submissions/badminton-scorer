var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
var pending = false;
var startGame = false;
var player = {};


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
    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle(`${scoreSide}`, 'right');
        } else {
            showHideShuttle(`${scoreSide}`, 'left');
        };
        if (scoreSide == 'left' && serviceOver == 'left') {
            speakThisMsg = "Service  Over";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        }
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
        } else {
            showHideShuttle(`${scoreSide}`, 'left');
        };
        if (scoreSide == 'right' && serviceOver == 'right') {
            speakThisMsg = "Service  Over";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        }
        speakThisMsg = "Score";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        if (teamBScore == teamAScore) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(teamBScore));   
            speakThisMsg = "all";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        } else {
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

