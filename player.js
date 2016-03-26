
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    var our_cards = [];
    for( var p in game_state.players) {
      if (typeof game_state.players[p]['hole_cards'] != 'undefined') {
        our_cards = game_state.players[p]['hole_cards'];
      }
    }
    console.log(our_cards);
    //console.log(bet);
    bet(0);
  },

  showdown: function(game_state) {

  }
};
