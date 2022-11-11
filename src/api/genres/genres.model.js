const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    genre: { type: String, trim: true, unique: true, required: true },
    movies: [{
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: false,
      ref: "movies"
    }],
  },
  { timestamps: true, collection: "genres" }
);

const Genre = mongoose.model("genres", genreSchema);
module.exports = Genre;
