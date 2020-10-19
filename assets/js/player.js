//Instantiate each player with default names and icon color
var playerA = new Player("Player A", "blue");
var playerB = new Player("Player B", "blue");
var playerC = new Player("Player C", "blue");
var playerD = new Player("Player D", "blue");
var gameMatchType = 1;

$('a').click(function() {
    console.log($(this).text().toLowerCase());
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
function showHidePlayers(option, matchType) {
    if(option == 'hide') {
        $(`.left-court-left-player-container`).hide();
        $(`.team-a-player-1`).hide();
        $(`#team-a-player-1`).hide();
        $(`.right-court-left-player-container`).hide();
        $(`.team-b-player-1`).hide();
        $(`#team-b-player-1`).hide();
    } else {
        $(`.left-court-left-player-container`).show();
        $(`.team-a-player-1`).show();
        $(`#team-a-player-1`).show();
        $(`.right-court-left-player-container`).show();
        $(`.team-b-player-1`).show();
        $(`#team-b-player-1`).show();
    }
    gameMatchType = matchType;
};

function Player (name, color) {
    this.name = name;
    this.color = color;
};

$('#team-a-player-1').on("change", function() { 
    playerA.name = this.value;
    $(`#team-a-player-1`).attr("Value", this.value);
});

$('#team-a-player-2').on("change", function() { 
    playerB.name = this.value;
    $(`#team-a-player-2`).attr("Value", this.value);
});

$('#team-b-player-1').on("change", function() { 
    playerB.name = this.value;
    $(`#team-b-player-1`).attr("Value", this.value);
});

$('#team-b-player-2').on("change", function() { 
    playerB.name = this.value;
    $(`#team-b-player-2`).attr("Value", this.value);
});