module.exports = {

    VERSION: "Default JavaScript folding player",

    bet_request: function (game_state, bet) {
        return this.strategy1(game_state, bet);
    },

    showdown: function (game_state) {

    },

    strategy1: function(game_state, bet) {
        var current_bet = 0;
        var our_cards = [];

        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                our_cards = game_state.players[p]['hole_cards'];
            }
        }
        console.log('OUR CARDS');
        console.log(our_cards);

        console.log('COMMUNITY CARDS');
        console.log(game_state);

        if (our_cards[0]['rank'] == our_cards[1]['rank']) {
            console.log('HAS PAIR!');
            current_bet += 300;
        }

        console.log('OUR BET:' + current_bet);
        return bet(current_bet);
    },


    isHigh: function (card) {
        return ['J', 'Q', 'K', 'A'].indexOf(card) == -1 ? false : true;
    },

    strategy1: function(game_state, bet) {
        var current_bet = game_state.pot;
        var our_cards = {};

        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                our_cards = game_state.players[p]['hole_cards'];
            }
        }
        console.log('OUR CARDS');
        console.log(our_cards);

        console.log('COMMUNITY CARDS');
        console.log(game_state);

        if (our_cards[0]['rank'] == our_cards[1]['rank']) {
            console.log('HAS PAIR!');
            current_bet += 100;
        }

        this.getPairs(game_state);

        return bet(current_bet);
    },

    getPairs: function(game_state) {
        var cards = [];
        var community_cards = game_state.community_cards;

        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                cards = game_state.players[p]['hole_cards'];
                console.log(game_state.players[p]['hole_cards']);
            }
        }

        cards = cards.concat(community_cards);

        var pairs = [];
        for (var c in cards) {
            if (typeof pairs[cards[c]['rank']] == 'undefined') {
                pairs[cards[c]['rank']] = 1;
            } else {
                pairs[cards[c]['rank']]++;
            }
        }

        console.log("ALL PAIRS");
        console.log(pairs);

        return pairs;

    },

    shouldPlay: function ( card1, card2 ) {

    if ( card1.rank === 'A' || card2.rank === 'A' ) {
        return true;
    }

    if ( ranks.indexOf(card1.rank) > -1 && ranks.indexOf(card2.rank) > -1 ) {
        return true;
    }

    if ( card1.rank === card2.rank ) {
        return true;
    }

    if ( card1.suit === card2.suit ) {
        if ( isAKQ(card1) || isAKQ(card2) ) {
            return true;
        }
    }

    return false;
}
};


