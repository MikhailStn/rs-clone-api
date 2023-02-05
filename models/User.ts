const { Schema, model } = require("mongoose");

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, require: true },
  pets: { type: Array }
});

module.exports = model("User", User);
