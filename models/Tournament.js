const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    auto: true,
  },
  tournament_id: {
    type: String,
    required: true,
  },
});

module.exports = Tournament = mongoose.model("tournament", TournamentSchema);
