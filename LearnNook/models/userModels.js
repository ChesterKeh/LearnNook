const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const SALT_ROUNDS = 10;

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);
