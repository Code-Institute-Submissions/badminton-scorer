var teamAScore = 0;
var teamBScore = 0;
function incrementScore(scoreSide) {
    $(".player-drop-down-toggle").prop("disabled", true);
    if (scoreSide == 'left') {
        teamAScore++;
        if (teamAScore % 2 == 0) {
            //showHideShuttle(`${scoreSide}-court-right-side-player`);
            showHideShuttle(scoreSide, 'right');
        } else {
            //showHideShuttle(`${scoreSide}-court-left-side-player`);
            showHideShuttle(scoreSide, 'left');
        };
    } else if (scoreSide == 'right') {
        teamBScore++;
        if (teamBScore % 2 == 0) {
            //showHideShuttle(`${scoreSide}-court-right-side-player`);
            showHideShuttle(scoreSide, 'right');
        } else {
            //showHideShuttle(`${scoreSide}-court-left-side-player`);
            showHideShuttle(scoreSide, 'left');
        };
    };
    console.log(teamAScore, teamBScore);
}
