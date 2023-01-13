const bcrypt = require("bcrypt");
const Tenants = require("../models/Tenant");
const Landlords = require("../models/Landlord");
const Admins = require("../models/Admin");
const cloudinary = require("../utils/Cloudinary");
const jwt = require("jsonwebtoken");

const upload = async (req, res) => {
  try {
    console.log(req.user._doc._id, "doc id");

    await cloudinary.uploader.upload(req.file.path);

    let newHouse = await Houses.create({
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

    const user = await Admins.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: `No Admin found with these credentials` });
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
    const { _id, firstname, lastname, emailaddress, city } = user;

    res.status(200).json({
      success: `Logged in succesfully`,
      data: {
        user: {
          id: _id,
          name: `${firstname} ${lastname}`,
          email: emailaddress,
          city,
        },
      },
      authorization: {
        token: accessToken,
        type: "bearer",
        role: "landlord",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listTenants = async (req, res) => {
  const param = req.query;
  const tenants = await Tenants.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched tenants successfully", data: [...tenants] });
};
const listLandlords = async (req, res) => {
  const param = req.query;
  const landlords = await Landlords.find({ ...param });
  console.log(landlords, "the landlords");

  res
    .status(200)
    .json({ message: "Fetched landlords successfully", data: [...landlords] });
};
const listAdmins = async (req, res) => {
  const param = req.query;
  const admins = await Admins.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched admins successfully", data: [...admins] });
};

module.exports = {
  upload,
  listAdmins,
  listLandlords,
  listTenants,
  handleLogin,
};
