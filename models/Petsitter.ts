const { Schema1, model1 } = require("mongoose");

const Petsitter = new Schema1({
  
  birth: { type: String, required: true },
  gender: { type: String, required: true },
  services: { type: Array, required: true },
  address: { type: String, unique: true, required: true },
  avatarPath: { type: String, unique: true, required: true },
});

module.exports = model1("Petsitter", Petsitter);