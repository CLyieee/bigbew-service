const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    firstname: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    lastname: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    email: {
      type: String,
      minLength: 1,
      maxLength: 255,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 255,
    },

    type: {
      type: String,
      enum: ["admin", "sk", "bo"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
