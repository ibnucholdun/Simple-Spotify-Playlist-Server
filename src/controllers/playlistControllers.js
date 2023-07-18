const Song = require("../models/songSchema");

exports.addSong = async (req, res) => {
  try {
    const { title, artists, url } = req.body;
    if (!title || !artists || !url) {
      throw new Error("Invalid song data.");
    }
    const newSong = new Song({
      title,
      artists,
      url,
      playCount: 0,
    });
    await newSong.save();
    res.status(201).json({ message: "Song added to playlist." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.playSong = async (req, res) => {
  try {
    const id = req.params.id;
    const song = await Song.findByIdAndUpdate(
      id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    if (!song) {
      throw new Error("Song not found.");
    }
    res.status(200).json({ message: "Now playing:", song });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPlaylist = async (req, res) => {
  try {
    const songs = await Song.find().exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getSortedPlaylist = async (req, res) => {
  try {
    const songs = await Song.find().sort({ playCount: -1 }).exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
