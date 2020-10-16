$("document").ready(function () {
    var teamAScore = 0;
    var teamBScore = 0;
    function incrementScore() {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            showHideShuttle(`left-court-right-side-player`);
        } else {
            showHideShuttle(`left-court-left-side-player`);
        }
        console.log(teamAScore);
    }
});