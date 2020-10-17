$("document").ready(function () {
    $(`.left-scorer`).attr("disabled", "disabled");
    $(`.right-scorer`).attr("disabled", "disabled");
    $(`.left-court-left-player-container`).hide();
    $(`.team-a-player-1`).hide();
    $(`.right-court-left-player-container`).hide();
    $(`.team-b-player-1`).hide();
    $(`#left-court-right-side-shuttle`).show();
});