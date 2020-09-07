const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, min: 3, max: 20 },
    secoundName: { type: String, required: true, min: 3, max: 20 },
    password: { type: String, required: true },
});

const register = mongoose.model("Reigster", registerSchema);



module.exports = register;