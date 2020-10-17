$("document").ready(function () {
    function showHideShuttle(courtSide, serviceSide) {
        // Hide all the shuttlecock image first
        $(`#left-court-left-side-shuttle`).hide();
        $(`#left-court-right-side-shuttle`).hide();
        $(`#right-court-left-side-shuttle`).hide();
        $(`#right-court-right-side-shuttle`).hide();
        // then show the player who will serve    
        $(`#${courtSide}-court-${serviceSide}-side-shuttle`).show();
        console.log(teamAScore, teamBScore, courtSide, serviceSide);
    };
});