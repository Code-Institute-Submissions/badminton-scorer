function showHideShuttle(courtType, courtSide, serviceSide) {
    // Hide all the shuttlecock image first
    $(`#left-court-left-side-shuttle`).hide();
    $(`#left-court-right-side-shuttle`).hide();
    $(`#right-court-left-side-shuttle`).hide();
    $(`#right-court-right-side-shuttle`).hide();
    $(`#mini-left-court-left-side-shuttle`).hide();
    $(`#mini-left-court-right-side-shuttle`).hide();
    $(`#mini-right-court-left-side-shuttle`).hide();
    $(`#mini-right-court-right-side-shuttle`).hide();

    // then show only the shuttle on the side of the player who will serve
    if(courtType == "mini") {
        $(`#${courtType}-${courtSide}-court-${serviceSide}-side-shuttle`).show();
    };
    $(`#${courtSide}-court-${serviceSide}-side-shuttle`).show();
    console.log(`#${courtSide}-court-${serviceSide}-side-shuttle`);
    //console.log(teamAScore, teamBScore, courtSide, serviceSide);
};