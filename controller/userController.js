const Tenant = require("../models/Tenant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  const { firstname, lastname, city, email, password } = req.body;
  console.log([email, password]);
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required " });

  try {
    // check for duplicate email in the db
    const duplicate = await Tenant.findOne({ emailaddress: email }).exec();
    console.log(duplicate);
    if (duplicate) return res.sendStatus(409);
    //password encryption
    const hashedPwd = await bcrypt.hash(password, 8);

    //create and store new user
    const result = await Tenant.create({
      emailaddress: email,
      password: hashedPwd,
      firstname: firstname,
      lastname: lastname,
      city: city,
    });
    console.log(result);

    res.status(201).json({ success: `New Tenant ${email} created!` });
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

    const user = await Tenant.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: `Invalid credentials` });
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
module.exports = { handleNewUser, handleLogin };
