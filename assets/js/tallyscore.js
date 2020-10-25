// This javascript code is for the tallyresult page alone

function generateTallyScoreBoard () {
    //Initialize table headings and table span attributes
    // setElementAttr(`.score-tally-set`, "rowspan", gameMatchType)
    // setElementAttr(`.warning-cards`, "rowspan", gameMatchType)

    setElementInnerHTML(`.tally-team-a-players`, gameMatchType == 2 ? playerA.name + "/" + playerB.name : playerB.name);
    setElementInnerHTML(`.tally-team-b-players`, gameMatchType == 2 ? playerC.name + "/" + playerD.name : playerD.name);
}

// Change/Set attribute of Game Set based on the Game Match Type
function setElementAttr(selector, attr, source) {
    $(`${selector}`).attr(attr, source);
};
