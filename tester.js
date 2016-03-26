var player = require('./player');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

player.bet_request({
    "players": [
        {
            "name": "Player 1",
            "stack": 1000,
            "status": "active",
            "bet": 0,
            "version": "Version name 1",
            "id": 0
        },
        {
            "name": "Player 2",
            "stack": 1000,
            "status": "active",
            "bet": 10,
            "hole_cards": [{rank: '3', suit: 'hearts'},
                {rank: '3', suit: 'hearts'}],
            "version": "Version name 2",
            "id": 1
        }
    ],
    "tournament_id": "550d1d68cd7bd10003000003",
    "game_id": "550da1cb2d909006e90004b1",
    "round": 0,
    in_action: 1,
    "bet_index": 0,
    "small_blind": 10,
    "orbits": 0,
    "dealer": 0,
    "community_cards": [                            // Finally the array of community cards.

        {
            "rank": "A",
            "suit": "hearts"
        },
        {
            "rank": "4",
            "suit": "hearts"
        },
        {
            "rank": "6",
            "suit": "hearts"
        }
    ],
    "current_buy_in": 100,
    "pot": 0
}, function () {
});