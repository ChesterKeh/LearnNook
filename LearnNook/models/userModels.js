const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: string,
  },
  email: {
    type: string,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  timestampss: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
  },
});

const SALT_ROUNDS = 10;

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);
