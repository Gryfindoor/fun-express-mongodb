const express = require("express");
const app = express();

const isKeyValid = require("./middleware/validRegisterKey");
const login = require("./endpoints/login");
const invate = require("./endpoints/invite");
const register = require("./endpoints/register");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/login", login);
app.use("/invite", invate);
app.use("/register", isKeyValid , register);

module.exports = app;