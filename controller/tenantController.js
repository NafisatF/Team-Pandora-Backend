const bcrypt = require("bcrypt");
const Book = require("../models/Book");
const Houses = require("../models/House");
const Tenant = require("../models/Tenant");
const cloudinary = require("../utils/Cloudinary");

const list = async (req, res) => {
  const param = req.query;
  const houses = await Houses.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched houses successfully", data: [...houses] });
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required " });

  try {
    //password encryption

    const user = await Tenant.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: `No tenant found with these credentials` });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: `Invalid credentials` });
    }

    delete user, password;
    const accessToken = jwt.sign(
      {
        ...user,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //create and store new user

    res
      .status(200)
      .json({ success: `Logged in succesfully`, data: { token: accessToken } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleLogin, list };
