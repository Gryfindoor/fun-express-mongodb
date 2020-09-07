const express = require("express");
const app = express();
const decrypt = require("../crypto/decrypt");
const inviteSchema = require("./../dataSchema/inviteSchema");

const findKey = app.get("/:id", async (req, res, next) => {
  const key = req.params.id;
  await inviteSchema.findOne({ key: key }, (err, adventure) => {
    if (err) {
      console.log(err);
    }
    if (!adventure) {
      res.status(404).send({
        status: "Fail",
        message: `No such key exists`,
      });
      return console.log(new Error("No such key!"));
    }
    next();
  });
});

const isKeyValid = app.get("/:id", async (req, res, next) => {
  const key = req.params.id;
  const decryptKey = JSON.parse(decrypt(key));
  if (!(decryptKey.date > Date.now())) {
    await inviteSchema.findOneAndDelete({ key: key });
    res.status(404).send({
      status: "Fail",
      message: `Key has expired`,
    });
    return console.log(new Error("Key expired!"));
  }
  next();
});

module.exports = isKeyValid,findKey;
