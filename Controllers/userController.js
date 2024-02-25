const UserModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username } = req.body;
    
 
    if (!username) {

        return res.status(400).send({ message: "User name must be provided" });
    }
    
    try {
        console.log("aza");
        console.log(username);
        // check if this user already in the database
        const user = await UserModel.findUserByUsername(username);

        if (user.length) {
            return res.status(409).send({ message: "Username is already in use." });
        }
        const newUserToAdd = {
            username
        }
        // create user
        
        const data = await UserModel.createUser(newUserToAdd);
        // create token for the user
        const user2 = await UserModel.findUserByUsername(data.username)
        console.log(user2);
        const token =  jwt.sign({ id: user2[0].id }, process.env.JWT_SECRET);

        res.status(200).json({ ...data, token });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

exports.login = async (req, res) => {
    const users = await UserModel.getAllUsers()
    res.send({users})
};
