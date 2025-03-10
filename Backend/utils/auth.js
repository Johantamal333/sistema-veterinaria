const jwt = require("jsonwebtoken");
require("dotenv").config();

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = generarJWT;
