const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    favoriteGenre: { type: mongoose.Schema.Types.ObjectId, required: false, trim: true, ref: "genres" },
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {

    this.password = bcrypt.hashSync(this.password, 10);
    next();

})

const User = mongoose.model('users', userSchema);
module.exports = User;