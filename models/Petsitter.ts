const Petsitter = new Schema({
  birth: { type: String, required: true },
  gender: { type: String, required: true },
  services: { type: Array, required: true },
  address: { type: String, unique: true, required: true },
  avatarPath: { type: String, required: true },
});

module.exports = model("Petsitter", Petsitter);