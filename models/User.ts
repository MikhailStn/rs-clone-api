const { Schema, model } = require("mongoose");

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, require: true },
  pets: { type: Array },
  avatarPath: { type: String },
  petsitterData: { 
    birth: { type: String },
    gender: { type: String },
    services: { type: Array },
    address: { type: String },
    aboutMe: { type: String },
    carers: { type: String },
    skills: { type: String },
    qualifications: { type: Array },
    homeConditions: { type: Array },
    tenatsAtHome: { type: Array },
    otherAnimals: { type: Array },
    level: { type: String },
    rate: { type: String },
    availableDates: { type: Array },
    prices: { type: Array },
    reviews: { type: Array }
  },
});

module.exports = model("User", User);
