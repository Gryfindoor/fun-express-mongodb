const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  key: { type: String, required: true },
});

const invite = mongoose.model("Invite", inviteSchema);

module.exports = invite;
