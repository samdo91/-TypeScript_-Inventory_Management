const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ID: String,
  name: String,
  eMail: { type: String, unique: true },
  password: String,
  phoneNumber: Number,
  companyDepartment: String,
  position: String,
  companyName: String,
});

const userModel = mongoose.model(`User`, userSchema);

module.exports = userModel;
