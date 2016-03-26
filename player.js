module.exports = {

    VERSION: "Default JavaScript folding player",

    bet_request: function (game_state, bet) {

        var our_cards = [];
        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                our_cards = game_state.players[p]['hole_cards'];
            }
        }
        console.log('OUR CARDS: ' + our_cards);

        if (our_cards[0]['rank'] == our_cards[1]['rank']) {
            console.log('HAS PAIR!');
            bet(300);
            return;
        }

        //console.log(bet);
        bet(0);
    },

    showdown: function (game_state) {

    }
};
