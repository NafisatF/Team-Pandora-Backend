const bcrypt = require("bcrypt");
// const Book = require("../models/Book");
const Houses = require("../models/House");
const Landlord = require("../models/Landlord");
const cloudinary = require("../utils/Cloudinary");

const upload = async (req, res) => {
  try {
    console.log(req.user._doc._id, "doc id");
    const result = await cloudinary.uploader.upload(req.file.path);
    let newHouse = new Houses({
      title: req.body.title,
      address: req.body.address,
      state: req.body.state,
      model: req.body.model,
      plan: req.body.plan,
      description: req.body.description,
      uploadedDate: req.body.uploadedDate,
      landlordName: req.body.landlordName,
    });

    res.status(201).json({
      message: "New House uploaded successfully",
      data: {
        ...newHouse,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required " });

  try {
    //password encryption

    const user = await Landlord.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: `No Landlord found with these credentials` });
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

const list = async (req, res) => {
  const param = req.query;
  const houses = await Houses.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched houses successfully", data: [...houses] });
};

module.exports = { upload, list, handleLogin };
