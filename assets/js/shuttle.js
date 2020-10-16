function showHideShuttle(servicePlayer) {
    switch (servicePlayer) {
        case 'left-court-left-side-player':
            $('#left-court-left-side-shuttle').show();
            $('#left-court-right-side-shuttle').hide();
            $('#right-court-left-side-shuttle').hide();
            $('#right-court-right-side-shuttle').hide();
            break;
        case 'left-court-right-side-player':
            $('#left-court-left-side-shuttle').hide();
            $('#left-court-right-side-shuttle').show();
            $('#right-court-left-side-shuttle').hide();
            $('#right-court-right-side-shuttle').hide();
            break;
        case 'right-court-left-side-player':
            $('#left-court-left-side-shuttle').hide();
            $('#left-court-right-side-shuttle').hide();
            $('#right-court-left-side-shuttle').show();
            $('#right-court-right-side-shuttle').hide();
            break;
        case 'right-court-right-side-player':
            $('#left-court-left-side-shuttle').hide();
            $('#left-court-right-side-shuttle').hide();
            $('#right-court-left-side-shuttle').hide();
            $('#right-court-right-side-shuttle').show();
            break;
    };
}