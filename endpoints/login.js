const express = require("express");
const app = express();
const loginModel = require("./../dataSchema/registerSchema");
const login = new express.Router();
const CryptoJS = require("crypto-js");
const ejs = require("ejs");

login.get("/", (req, res) => {
  res.status(200).render("login.ejs", {err:""});
})

login.post("/", async (req, res) => {
  const password = CryptoJS.MD5(req.body.password).toString();
  const findUser = await loginModel.findOne(
    { email: req.body.email },
    (err, adventure) => {
      return adventure;
    }
  );
  if (!findUser || !((findUser.password) === password) ) {
    res.status(404).render("login.ejs", {err:"Invalid data"});
  } else {
    res.status(202).render("home.ejs");
  }
});

module.exports = login;
