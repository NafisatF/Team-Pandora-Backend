const Tenant = require("../models/Tenant");
const Landlord = require("../models/Landlord");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  let { firstname, lastname, city, email, password, userType } = req.body;
  console.log([email, password, userType], "req body");
  userType = userType.toLowerCase();
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required " });
  let result;
  try {
    //password encryption
    const hashedPwd = await bcrypt.hash(password, 8);
    switch (userType) {
      case "landlord": {
        const duplicate = await Landlord.findOne({
          emailaddress: email,
        }).exec();

        console.log(duplicate);

        if (duplicate) return res.sendStatus(409);

        result = await Landlord.create({
          emailaddress: email,
          password: hashedPwd,
          firstname,
          lastname,
          city,
          userType,
        });
        res.status(201).json({ success: `New ${userType} ${email} created!` });
      }
      case "tenant": {
        const duplicate = await Tenant.findOne({
          emailaddress: email,
        }).exec();

        console.log(duplicate);

        if (duplicate) return res.sendStatus(409);

        result = await Tenant.create({
          emailaddress: email,
          password: hashedPwd,
          firstname,
          lastname,
          city,
          userType,
        });
        res.status(201).json({ success: `New ${userType} ${email} created!` });
      }
      case "admin": {
        const duplicate = await Admin.findOne({
          emailaddress: email,
        }).exec();

        console.log(duplicate);

        if (duplicate) return res.sendStatus(409);

        result = await Admin.create({
          emailaddress: email,
          password: hashedPwd,
          firstname,
          lastname,
          userType,
        });
        res.status(201).json({ success: `New ${userType} ${email} created!` });
      }
      default:
        return res.status(400).json({
          message:
            "User Type is required. Please choose: Landlord or Tenant or Admin",
        });
    }

    // if (userType === "landlord" || userType === "tenant") {
    //   const hashedPwd = await bcrypt.hash(password, 8);

    //   //create and store new user
    //   let result;

    //   if (userType == "tenant") {
    //     const duplicate = await Tenant.findOne({ emailaddress: email }).exec();

    //     console.log(duplicate);

    //     if (duplicate) return res.sendStatus(409);

    //     result = await Tenant.create({
    //       emailaddress: email,
    //       password: hashedPwd,
    //       firstname,
    //       lastname,
    //       city,
    //       userType,
    //     });
    //   } else if (userType == "landlord") {
    //     const duplicate = await Landlord.findOne({
    //       emailaddress: email,
    //     }).exec();

    //     console.log(duplicate);

    //     if (duplicate) return res.sendStatus(409);

    //     result = await Landlord.create({
    //       emailaddress: email,
    //       password: hashedPwd,
    //       firstname,
    //       lastname,
    //       city,
    //       userType,
    //     });
    //   }

    //   res.status(201).json({ success: `New ${userType} ${email} created!` });
    // } else
    //   return res.status(400).json({
    //     message: "User Type is required. Please choose: Landlord or Tenant",
    //   });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const documentation = async (req, res) => {
  res.status(200).json({
    message:
      "Welcome to Team Pandora Backend. <br/> Please visit https://documenter.getpostman.com/view/23126468/2s8Z75TAQp  to see the documentation. <br/> Happy Coding!!!",
  });
};

module.exports = { handleNewUser, documentation };

/* 

For endpoints that do not require authentication

const makeRequest = async (urlToBack) => {
  const { data, status } = await fetch(urlToBack, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  })


  

let urlToBack = "htpps://backend.test";
token = "jhadguyueguyjadscYuwsaygchJQWKASC"

For endpoints that require authentication

const makeRequest = async (urlToBack) => {
  const { data, status } = await fetch(urlToBack, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    }
  })

  if(status === 200) {
    do whatever on the frontend
  }

  

}


*/
