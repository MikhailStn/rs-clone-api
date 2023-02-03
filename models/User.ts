const { Schema, model } = require("mongoose");

/* const User = userInfo.define(modelName: 'user', attributes: {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement = true}
}) */

/* export class User {
  name: string;
  email: string;
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
  }
} */

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("User", User);
