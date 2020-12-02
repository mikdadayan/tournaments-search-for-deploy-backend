const express = require("express");
const Tournament = require("../../models/Tournament");

const router = express.Router();

// @route   Get api/tournaments
// @desc    Register route
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
    console.log("^^^^^^^^^^^^^^");
    return res.status(500).json({
      msg: "Server error. Something went wrong...",
    });
  }
});

// @route   Post api/tournaments
// @desc    Register route
router.post("/", async (req, res, next) => {
  let newTournament;
  if (req.body.user_id) {
    newTournament = new Tournament({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      user_id: req.body.user_id,
    });
  } else {
    newTournament = new Tournament({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
    });
  }

  try {
    const tournament = await newTournament.save();
    res.status(201).json({
      tournamnent: tournament,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }

  console.log(newTournament);
});

module.exports = router;
