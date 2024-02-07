const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const getAll = async (req, res) => {
  try {
    const tasks = await User.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const user = await User.create({ name, email, password, avatar });
    const token = createJWT(user);

    res.status(201).json({ token });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      return res.status(400).json({ error: "Email already in use" });
    }

    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });

    if (foundUser === null) {
      res.status(401).json({ msg: "User not found" });
      return;
    }

    const check = await bcrypt.compare(password, foundUser.password);
    if (!check) {
      res.status(401).json({ msg: "Wrong password" });
      return;
    }

    const token = createJWT(foundUser);
    res.json({ token, foundUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id: _id });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  register,
  login,
  getUser,
};
