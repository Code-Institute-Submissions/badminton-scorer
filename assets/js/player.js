$('a').click(function() {
    //console.log($(this).text().toLowerCase());
    $(this).parent().parent().prev().children('img').attr("src", `assets/images/${$(this).text().toLowerCase()}-player.png`);
    var classNames = $(this).parent().parent().parent().parent().attr("class").split(" ");
    if ($(`.${classNames[1]}`).attr("class").indexOf("left-court-left-player-container") != -1 ) {
        //Player A changed color
        playerA.color = $(this).text().toLowerCase();
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("left-court-right-player-container") != -1 ) {
        //Player B changed color
        playerB.color = $(this).text().toLowerCase();
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("right-court-left-player-container") != -1 ) {
        //Player C changed color
        playerC.color = $(this).text().toLowerCase();
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("right-court-right-player-container") != -1 ) {
        //Player D changed color
        playerD.color = $(this).text().toLowerCase();
    };
});

// Variable to hold the macth type Singles/Doubles
function showHidePlayers(courtType, option, matchType) {
    if(option == 'hide') {
        $(`.team-a-player-1-img`).hide();
        $(`#team-a-player-1`).hide();
        $(`.team-b-player-1-img`).hide();
        $(`#team-b-player-1`).hide();
        if (courtType == "mini") {
            $(`.mini-left-court-left-player-container`).hide();
            $(`#mini-team-a-player-1`).hide();
            $(`.mini-right-court-left-player-container`).hide();
            $(`#mini-team-b-player-1`).hide();
        };
    } else {
        $(`.team-a-player-1-img`).show();
        $(`#team-a-player-1`).show();
        $(`.team-b-player-1-img`).show();
        $(`#team-b-player-1`).show();
        if (courtType == "mini") {
            $(`.mini-left-court-left-player-container`).show();
            $(`#mini-team-a-player-1`).show();
            $(`.mini-right-court-left-player-container`).show();
            $(`#mini-team-b-player-1`).show();
        };
    }
    gameMatchType = matchType;
};

function player (name, color, isVisible) {
    this.name = name;
    this.color = color;
    this.isVisible = isVisible;
};

$('#mini-team-a-player-1').on("change", function() { 
    playerA.name = getElementValue(`#mini-team-a-player-1`);
    setElementValue(`#team-a-player-1`, playerA.name)
});

$('#mini-team-a-player-2').on("change", function() { 
    playerB.name = getElementValue(`#mini-team-a-player-2`);
    setElementValue(`#team-a-player-2`, playerB.name)
});

$('#mini-team-b-player-1').on("change", function() { 
    playerC.name = getElementValue(`#mini-team-b-player-1`);
    setElementValue(`#team-b-player-1`, playerC.name)
});

$('#mini-team-b-player-2').on("change", function() { 
    playerD.name = getElementValue(`#mini-team-b-player-2`);
    setElementValue(`#team-b-player-2`, playerD.name)
});