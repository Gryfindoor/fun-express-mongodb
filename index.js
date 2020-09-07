require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./routers");
const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});