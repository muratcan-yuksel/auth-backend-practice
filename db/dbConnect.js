const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    mongoose.connect(process.env.DB_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
