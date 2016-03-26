var rank = require('./rank');

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

module.exports = {

    VERSION: "MadFoldBot v2",

    bet_request: function (game_state, bet) {
        return this.strategy1(game_state, bet);
    },

    showdown: function (game_state) {

    },

    strategy1: function (game_state, bet) {
        var our_bet = this.getBet(game_state);
        console.log('OUR BET: ' + our_bet);

        bet(our_bet);
    },

    getBet: function (game_state) {
        var all_cards = this.getAllCards(game_state);
        var myself = game_state.players[game_state.in_action];
        var call = game_state.current_buy_in - myself["bet"];

        var isAllIn = this.isAllIn(game_state);
        console.log('CURRENT CALL: ' + call);

        if (false && isAllIn) {
            console.log("WARNING - ALL IN!!!");

            if (game_state.community_cards.length < 1) {
                if (
                    (myself.hole_cards[0].rank == 'A' && myself.hole_cards[1].rank == 'A') ||
                    (myself.hole_cards[0].rank == 'K' && myself.hole_cards[1].rank == 'K') ||
                    (myself.hole_cards[0].rank == 'Q' && myself.hole_cards[1].rank == 'Q') ||
                    (myself.hole_cards[0].rank == 'A' && myself.hole_cards[1].rank == 'K') ||
                    (myself.hole_cards[0].rank == 'K' && myself.hole_cards[1].rank == 'A')
                ) {
                } else {
                    return 0;
                }
            }
        } else {

        }


        if (game_state.community_cards.length < 1) {
            console.log('PREFLOP');
            // we're before flop
            if (lameCards(myself.hole_cards)) {
                console.log('LAME CARDS');
                return 0;
            } else {
                if (toNum(myself.hole_cards[1].rank) > 9 && toNum(myself.hole_cards[0].rank) > 9 ||
                    (myself.hole_cards[1].suit == myself.hole_cards[1].suit)
                ) {
                    console.log('HIGH CARDS. DOING CALL');
                    return call;
                }

                if (compute_chip_factor(game_state) > 3) {
                    console.log('CHIP FACTOR');
                    return call;
                }
                else {
                    return 0;
                }
            }
        }

        var our_hand = rank.rank(all_cards);

        console.log('OUR HAND');
        console.log(our_hand);

        if (our_hand.contains('flush')) {
            return 10000;
        }

        if (our_hand.contains('full_house')) {
            return 10000;
        }

        if (our_hand.contains('tree_of_a_kind')) {
            return 700;
        }

        if (our_hand.contains('two_pairs')) {
            return 250;
        }

        if (our_hand.contains('pair')) {
            return 100;
        }

        return call;
    },

    isAllIn: function (game_state) {
        var players = game_state.players;

        for (var i in players) {
            if (i != game_state.in_action && players[i].status == "active" && players[i].stack == 0 && players[i].bet > 200) {
                return true;
            }
        }

        return false;
    },

    getAllCards: function (game_state) {
        var cards = [];
        var community_cards = game_state.community_cards;

        for (var p in game_state.players) {
            if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
                cards = game_state.players[p]['hole_cards'];
            }
        }

        cards = cards.concat(community_cards);

        return cards;
    }

};

function toNum(c) {
    switch (c) {
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;

        default:
            return c;
    }
}

function lameCards(cards) {
    if (
        toNum(cards[0].rank) >= 12 || toNum(cards[1].rank) >= 12
    ) {
        return false;
    } else if (cards[0].rank == 'A' || cards[1].rank == 'A') {
        return false;
    }
    else if (
        (toNum(cards[0].rank) < 4 || toNum(cards[1].rank) < 4) && cards[0].rank != cards[1].rank
    ) {
        return true
    } else {
        return false
    }
}

function compute_avg_stack(players) {
    var sum = 0;
    for (var i in players) {
        if (players[i].status == "active") {
            sum += players[i].stack;
        }
    }
    return sum / players.length;
}

function compute_chip_factor(g) {
    var average_stack = compute_avg_stack(g.players);
    var myself = g.players[g.in_action];

    var strength = (myself.stack > average_stack) ? (myself.stack / average_stack) : 0.5;

    if (g.current_buy_in < g.pot) {
        return strength;
    }
    else {
        return strength * g.pot / g.current_buy_in;
    }
}