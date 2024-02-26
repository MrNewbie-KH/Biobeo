const UserModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username } = req.body;

  //  no user with such a username in the req.body
  if (!username) {
    return res.status(400).send({ message: "User name must be provided" });
  }

  try {
    // check if this user already in the database
    // test
    console.log("Before first time to db");
    const user = await UserModel.findUserByUsername(username);
    if (user.length) {
      return res.status(409).send({ message: "Username is already in use." });
    }
    console.log("after first time to db");
    const newUserToAdd = {
      username,
    };
    // create user
     await UserModel.createUser(newUserToAdd);
    // create token for the user

    const user2 = await UserModel.findUserByUsername(username);

    const token = jwt.sign({ id: user2[0].id }, process.env.JWT_SECRET);
    res.status(200).json({...user2[0], token }); // to look what it looks like at the front
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }
};


exports.login = async (req, res) => {
  const { username } = req.body;

  //  no user with such a username in the req.body
  if (!username) {
    return res.status(400).send({ message: "User name must be provided" });
  }

  try {
    // check if this user already in the database
    const user = await UserModel.findUserByUsername(username);
    if (user.length===0) {
      return res.status(400).send({ message: "No user with this username, please sign up" });
    }
    console.log(user[0]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    res.status(200).json({...user[0], token }); 
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }



};

