const db = require("../Config/dbConfig");
const bcrypt = require("bcryptjs");

const User = {};
// No entering here
User.createUser = async (newUser) => {
  try {
    const queryResult = await db.query(
      "INSERT INTO Users (username) VALUES (?)",
      [newUser.username]
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
User.getAllUsers = async () => {
  try {
    const queryResult = await db.query(`SELECT * FROM Users`);
    return queryResult[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

User.findUserByUsername = async (username) => {

const data = await db.query(
    `SELECT * FROM Users WHERE username = ?`,username)  
    return data[0];
};

module.exports = User;
