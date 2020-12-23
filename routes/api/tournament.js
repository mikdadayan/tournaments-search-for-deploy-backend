const express = require("express");

const favorites = require("../../controllers/favorites");

const router = express.Router();

router.get("/", favorites.getFavoritesContoller);

router.post("/favorites", favorites.addFavoriteController)

router.delete("/favorites/:id", favorites.deleteFavoriteController );

module.exports = router;
