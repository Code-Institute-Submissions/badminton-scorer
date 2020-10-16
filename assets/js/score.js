var teamAScore = 0;
var teamBScore = 0;
var serviceOver = 2;
function incrementScore(scoreSide) {
    if (teamAScore == 0 && teamBScore == 0) {
        /*let speakThisMsg = new SpeechSynthesisUtterance();
        speakThisMsg = "Player B to server Player C";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        speakThisMsg = "love all";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));
        speakThisMsg = "play";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakThisMsg));*/
    };

    //this needs to move when user press Start Match button
    $(".player-drop-down-toggle").prop("disabled", true);


    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle(`${scoreSide}`, 'right');
        } else {
            showHideShuttle(`${scoreSide}`, 'left');
        };
        if (scoreSide == 'left' && serviceOver == 'left') {
            speakThisMsg = "Service Over";
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
            speakThisMsg = "Service Over";
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
};
