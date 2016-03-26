
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    console.log(game_state.players);
    console.log(bet);
    bet(0);
  },

  showdown: function(game_state) {

  }
};
