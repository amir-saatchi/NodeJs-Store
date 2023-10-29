const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const { SECRET_KEY } = require("./constants");

function randomNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const secret = "";
    const options = {
      expiresIn: "1h",
    };

    JWT.sign(payload, SECRET_KEY, options, (error, token) => {
      if (error) reject(createError.InternalServerError());
      resolve(token);
    });
  });
}

module.exports = {
  SignAccessToken,
  randomNumber,
};
