const Tenant = require("../models/Tenant");
const Landlord = require("../models/Landlord");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  const { firstname, lastname, city, email, password, userType } = req.body;
  console.log([email, password, userType]);
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required " });

  try {
    //password encryption
    if (userType === "Landlord" || userType === "Tenant") {
      const hashedPwd = await bcrypt.hash(password, 8);

      //create and store new user
      let result;
      if (userType == "tenant") {
        const duplicate = await Tenant.findOne({ emailaddress: email }).exec();
        console.log(duplicate);
        if (duplicate) return res.sendStatus(409);
        result = await Tenant.create({
          emailaddress: email,
          password: hashedPwd,
          firstname: firstname,
          lastname: lastname,
          city: city,
        });
      } else if (userType == "landlord") {
        const duplicate = await Landlord.findOne({
          emailaddress: email,
        }).exec();
        console.log(duplicate);
        if (duplicate) return res.sendStatus(409);
        result = await Landlord.create({
          emailaddress: email,
          password: hashedPwd,
          firstname: firstname,
          lastname: lastname,
          city: city,
        });
      }

      res.status(201).json({ success: `New Landlord ${email} created!` });
    } else
      return res.status(400).json({
        message: "User Type is required. Please choose: Landlord or Tenant",
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listTenants = async (req, res) => {
  const param = req.query;
  const tenants = await Tenant.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched tenants successfully", data: [...tenants] });
};
const listLandlords = async (req, res) => {
  const param = req.query;
  console.log(param, "the param query");
  const landlords = await Landlord.find({ ...param });

  res
    .status(200)
    .json({ message: "Fetched landlords successfully", data: [...landlords] });
};

module.exports = { handleNewUser, listTenants, listLandlords };
