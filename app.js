const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const bcrypt = require("bcrypt");

// db connection
dbConnect();

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", async (request, response) => {
  try {
    bcrypt.hash(request.body.password, 10, async (error, hash) => {
      if (error) {
        response.json({
          error: error,
        });
      }
      const user = new User({
        email: request.body.email,
        password: hash,
      });
      const savedUser = await user.save();
      response.json(savedUser);
    });
  } catch (error) {
    response.json({ message: error });
  }
});

module.exports = app;
