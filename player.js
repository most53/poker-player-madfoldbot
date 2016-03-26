module.exports = {

    VERSION: "Default JavaScript folding player",

    bet_request: function (game_state, bet) {

        var current_bet = bet;
        var our_cards = [];
        var community_cards = game_state.community_cards;

        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                our_cards = game_state.players[p]['hole_cards'];
            }
        }
        console.log('OUR CARDS');
        console.log(our_cards);

        console.log('COMMUNITY CARDS');
        console.log(game_state.community_cards);

        if (our_cards[0]['rank'] == our_cards[1]['rank']) {
            console.log('HAS PAIR!');
            current_bet += 300;
        }



        var pairs = {};
        pairs[our_cards[0]['rank']] = 1;

        if (typeof (our_cards[1]['rank']) == 'undefined') {
            pairs[our_cards[1]['rank']] = 1;
        } else {
            pairs[our_cards[1]['rank']]++;
        }

        if (typeof community_cards != 'undefined') {
            for (var cc in community_cards) {
                if (typeof(pairs[community_cards[cc]['rank']]) == 'undefined') {
                    pairs[community_cards[cc]['rank']] = 1;
                } else {
                    pairs[community_cards[cc]['rank']] += 1;
                }
            }
        }


        console.log('PAIRS');
        console.log(pairs);
        bet(current_bet);
    },

    showdown: function (game_state) {

    },

    isHigh: function (card) {
        return ['J', 'Q', 'K', 'A'].indexOf(card) == -1 ? false : true;
    }
};


