function showHideShuttle(courtType, courtSide, serviceSide) {
    // Hide all the shuttlecock image first
    hideElement(`#left-court-left-side-shuttle`);
    hideElement(`#left-court-right-side-shuttle`);
    hideElement(`#right-court-left-side-shuttle`);
    hideElement(`#right-court-right-side-shuttle`);
    hideElement(`#mini-left-court-left-side-shuttle`);
    hideElement(`#mini-left-court-right-side-shuttle`);
    hideElement(`#mini-right-court-left-side-shuttle`);
    hideElement(`#mini-right-court-right-side-shuttle`);

    // then show only the shuttle on the side of the player who will serve
    if(courtType == "mini") {
        showElement(`#${courtType}-${courtSide}-court-${serviceSide}-side-shuttle`);
    }
    showElement(`#${courtSide}-court-${serviceSide}-side-shuttle`);
}