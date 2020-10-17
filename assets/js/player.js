$("document").ready(function () {
    $('a').click(function(player) {
        $(this).parent().parent().prev().children('img').attr("src", `assets/images/${$(this).text().toLowerCase()}-player.png`);
    });
});