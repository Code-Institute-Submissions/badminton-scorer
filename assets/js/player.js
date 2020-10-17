$('a').click(function(player) {
    console.log($(this).text().toLowerCase());
    $(this).parent().parent().prev().children('img').attr("src", `assets/images/${$(this).text().toLowerCase()}-player.png`);
});

function showHidePlayers(option) {
    if(option == 'hide') {
        $(`.left-court-left-player-container`).hide();
        $(`.team-a-player-1`).hide();
        $(`.right-court-left-player-container`).hide();
        $(`.team-b-player-1`).hide();
    } else {
        $(`.left-court-left-player-container`).show();
        $(`.team-a-player-1`).show();
        $(`.right-court-left-player-container`).show();
        $(`.team-b-player-1`).show();
    }
}