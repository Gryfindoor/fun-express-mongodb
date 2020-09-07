const express = require("express");

const encrypt = require("./../crypto/encrypt");
const inviteSchema = require("./../dataSchema/inviteSchema");
const app = express();
const invate = new express.Router();
const mailSent = require("./../mailSender/sender");
const ejs = require("ejs");
const validateEmpty = require('./../middleware/validInvite');


invate.get("/", (req,res) => {
  res.status(200).render("invite.ejs");
});

invate.post("/", validateEmpty,  async (req, res) => {
  console.log(req.body);
  const date = Date.now() +  60 * 60 * 1000; // minutes x sec x milisec
  const body = req.body;
  body["date"] = date;

  const encryptKey = encrypt(JSON.stringify(body));
  const data = await ejs.renderFile("./mailSender/inviteMail/message.ejs", {
    name: req.body.firstName,
    encryptKey: `http://localhost:3000/register/${encryptKey}`
  });

  const newKey = new inviteSchema({key: encryptKey.toString()});
  newKey.save(function (err, newKey) {
    if (err) return console.error(err);
  });

  const mail = await mailSent(req.body.email, `Hi ${req.body.firstName}, welcome on board !`, data);
  res.status(200).send({
    status: "Successful",
    message: `Done`,
  });
});

module.exports = invate;
