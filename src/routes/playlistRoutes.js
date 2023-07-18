const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistControllers");

router.post("/", playlistController.addSong);
router.get("/:id/play", playlistController.playSong);
router.get("/", playlistController.getPlaylist);
router.get("/sorted", playlistController.getSortedPlaylist);

module.exports = router;
