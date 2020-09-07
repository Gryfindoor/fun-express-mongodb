const express = require("express");
const CryptoJS = require("crypto-js");
const secretKey = process.env.CRYPTOJS_KEY;
const decrypt = require('./../crypto/decrypt');
const app = express();
const registerUser = require('./../dataSchema/registerSchema');
const { render } = require("../middleware/validRegisterKey");
const ejs = require("ejs");
const login = require("./login");
const register = express.Router();

register.get("/:id", (req,res) => {
  res.render("register.ejs");
})

register.post("/:id", async (req, res) => {
  console.log(req.body);
  let decryptKey = JSON.parse(decrypt(req.params.id));
  decryptKey["password"] = CryptoJS.MD5(req.body.password.toString());
  console.log(decryptKey);

  const newUser = new registerUser(decryptKey);
  console.log(newUser);

  newUser.save(function (err, newUser) {
    if (err) return console.error(err);
  });
  res.status(200).send({
    status: "Succesful",
    message: `Done ${JSON.stringify(newUser)}`,
  });
});

module.exports = register;
