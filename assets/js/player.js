// This function will listen to event when user click the player image and select a color from the dropdown list. It will set each player's color
$('a').click(function() {
    //console.log($(this).text().toLowerCase());
    $(this).parent().parent().prev().children('img').attr("src", `assets/images/${$(this).text().toLowerCase()}-player.png`);
    var classNames = $(this).parent().parent().parent().parent().attr("class").split(" ");
    if ($(`.${classNames[1]}`).attr("class").indexOf("left-court-left-player-container") != -1 ) {
        //Player A set src attribute
        playerA.src = `assets/images/${$(this).text().toLowerCase()}-player.png`;
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("left-court-right-player-container") != -1 ) {
        //Player B set src attribute
        playerB.src = `assets/images/${$(this).text().toLowerCase()}-player.png`;
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("right-court-left-player-container") != -1 ) {
        //Player C set src attribute
        playerC.src = `assets/images/${$(this).text().toLowerCase()}-player.png`;
    } else if ($(`.${classNames[1]}`).attr("class").indexOf("right-court-right-player-container") != -1 ) {
        //Player D set src attribute
        playerD.src = `assets/images/${$(this).text().toLowerCase()}-player.png`;
    };
});

// Variable to hold the macth type Singles/Doubles
function showHidePlayers(courtType, option, matchType) {
    if(option == 'hide') {
        hideElement(`.team-a-player-1-img`);
        hideElement(`#team-a-player-1`);
        hideElement(`.team-b-player-1-img`);
        hideElement(`#team-b-player-1`);
        if (courtType == "mini") {
            hideElement(`.mini-left-court-left-player-container`);
            hideElement(`#mini-team-a-player-1`);
            hideElement(`.mini-right-court-left-player-container`);
            hideElement(`#mini-team-b-player-1`);
        };
    } else {
        showElement(`.team-a-player-1-img`);
        showElement(`#team-a-player-1`);
        showElement(`.team-b-player-1-img`);
        showElement(`#team-b-player-1`);
        if (courtType == "mini") {
            showElement(`.mini-left-court-left-player-container`);
            showElement(`#mini-team-a-player-1`);
            showElement(`.mini-right-court-left-player-container`);
            showElement(`#mini-team-b-player-1`);
        };
    }
    gameMatchType = matchType;
};

function player (name, src, isVisible) {
    this.name = name;
    this.src = src;
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

function switchCourt(courtServe) {
    console.log(gameSet, courtServe)
    if (gameSet % 2 == 0) {
        setElementValue(`#team-a-player-1`, playerC.name);
        setElementSrc(`.team-a-player-1-img`, playerC.src);
        setElementValue(`#team-a-player-2`, playerD.name);
        setElementSrc(`.team-a-player-2-img`, playerD.src);
        setElementValue(`#team-b-player-1`, playerA.name);
        setElementSrc(`.team-b-player-1-img`, playerA.src);
        setElementValue(`#team-b-player-2`, playerB.name);
        setElementSrc(`.team-b-player-2-img`, playerB.src);
        if (gameMatchType == 1) {
            switchPlayerSide("a");
            switchPlayerSide("b");
        }
        showHideShuttle("main", courtServe, "right");
    } else {
        if (gameSet == 3 && blnMidBreak == true) {
            console.log("Game Set 3 should not enter here first")
            setElementValue(`#team-a-player-1`, playerC.name);
            setElementSrc(`.team-a-player-1-img`, playerC.src);
            setElementValue(`#team-a-player-2`, playerD.name);
            setElementSrc(`.team-a-player-2-img`, playerD.src);
            setElementValue(`#team-b-player-1`, playerB.name);
            setElementSrc(`.team-b-player-1-img`, playerB.src);
            setElementValue(`#team-b-player-2`, playerA.name);
            setElementSrc(`.team-b-player-2-img`, playerA.src);
            if (teamAScore == 11 && teamBScore < 11) {
                showHideShuttle("main", "right", "left")
            } else if (teamBScore == 11 && teamAScore < 11) {
                showHideShuttle("main", "left", "left")
            };
            var tempScore = teamAScore;
            teamAScore = teamBScore;
            teamBScore = tempScore;
        } else {
            console.log("Game Set 3 should ENTER here first, Player One should be on the leftcourt, Player Two should be on the right court")
            setElementValue(`#team-a-player-1`, playerA.name);
            setElementSrc(`.team-a-player-1-img`, playerA.src);
            setElementValue(`#team-a-player-2`, playerB.name);
            setElementSrc(`.team-a-player-2-img`, playerB.src);
            setElementValue(`#team-b-player-1`, playerC.name);
            setElementSrc(`.team-b-player-1-img`, playerC.src);
            setElementValue(`#team-b-player-2`, playerD.name);
            setElementSrc(`.team-b-player-2-img`, playerD.src);
            if (gameMatchType == 1) {
                switchPlayerSide("a");
                switchPlayerSide("b");
            }
            showHideShuttle("main", courtServe, "right");
        };
        //showHideShuttle("main", courtServe, "right");
    };

    //if (gameMatchType == 1 && (gameSet != 3 && blnMidBreak == false)) {
    //    $(`#team-a-player-1`).hide()
    //    $(`.team-a-player-1-img`).hide()
    //    $(`#team-a-player-2`).show()
    //    $(`.team-a-player-2-img`).show()
    //    $(`#team-b-player-1`).hide()
    //    $(`.team-b-player-1-img`).hide()
    //    $(`#team-b-player-2`).show()
    //    $(`.team-b-player-2-img`).show()
    //}
}

function switchPlayerSide(side) {
    let tempPlayer = new player();
    tempPlayer.name = getElementValue(`#team-${side}-player-1`);
    tempPlayer.src = getElementSrc(`.team-${side}-player-1-img`);

    setElementValue(`#team-${side}-player-1`, getElementValue(`#team-${side}-player-2`));
    setElementSrc(`.team-${side}-player-1-img`, getElementSrc(`.team-${side}-player-2-img`));
    setElementValue(`#team-${side}-player-2`, tempPlayer.name);
    setElementSrc(`.team-${side}-player-2-img`, tempPlayer.src);
    //if (gameMatchType == 1) {
        hideElement(`.team-${side}-player-1-img`);
        hideElement(`#team-${side}-player-1`);
        showElement(`.team-${side}-player-2-img`);
        showElement(`#team-${side}-player-2`);
    //}
};