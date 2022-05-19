// CONFIG Để kết nối với database

const mongoose = require("mongoose");
const DATABASE_PASSWORD = "RuOFobV8Pw9gaIuD";
// const URI = `mongodb+srv://admin:${DATABASE_PASSWORD}@cluster0.dhw8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const URI = `mongodb+srv://admin:${DATABASE_PASSWORD}@cluster0.dhw8r.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.Promise = require('bluebird')
async function connect() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };
