const express = require("express");
const Tournament = require("../../models/Tournament");

const router = express.Router();

// @route   Get api/tournaments
// @desc    Get all Favorites
router.get("/", async (req, res, next) => {
  const session = req.header("x-auth-token");
  console.log(session);
  if (!session) {
    return res.status(401).json({
      msg: "there are no favorite tournaments",
    });
  }
  try {
    const tournaments = await Tournament.find({
      user_id: session,
    }).select("title description image");
    res.status(200).json({
      msg: "Tournament fetched",
      tournaments: tournaments,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error. Something went wrong...",
    });
  }
});

// @route   Post api/tournaments
// @desc    Add Favorite Route
router.post("/favorites", async (req, res, next) => {
  try {
    // console.log(req.body);
    if (!req.body) {
      return res.status(401).json({
        error: { msg: "Please fill all fields." },
      });
    }
    let newTournament;
    if (req.body.user_id) {
      console.log("&&&&&&&&&&&&&&&&&&&")
      let existingFavorites = await Tournament.find({
        tournament_id: req.body.tournament_id,
      });
      // console.log("*****************", existingFavorites);

      existingFavorites = existingFavorites.filter((favorite) => {
        return favorite.user_id.toString() === req.body.user_id.toString() ? favorite : null;
      });
      // console.log("baaa");
      console.log("^^^^^^^^^^^^^^^^^", existingFavorites);

      // console.log(req.body.user_id);
      if (existingFavorites.length > 0) {
        return res.status(409).json({
          error: { msg: "You already added this tournament in favorites." },
        });
      }
      newTournament = new Tournament({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        user_id: req.body.user_id,
        tournament_id: req.body.tournament_id,
      });
    } else {
      newTournament = new Tournament({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        tournament_id: req.body.tournament_id,
      });
    }

    const tournament = await newTournament.save();
    res.status(201).json({
      tournament: tournament,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
});

// @route   Get api/tournaments
// @desc    Delete Item route
router.delete("/favorites/:id", async (req, res, next) => {
  try {
    let deletedFavorite = await Tournament.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(202).json({
      msg: "Favorite item deleted.",
      deletedFavorite: deletedFavorite,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
