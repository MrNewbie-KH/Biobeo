const {promisify}=require("util")
const jwt = require("jsonwebtoken")
exports.protect = async (req, res, next) => {
    let token;  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } 
    //2)verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECURET);
    console.log(decoded);
    next();
}