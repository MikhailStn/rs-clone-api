// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
// export const sequelize = require("./db");
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require('./authRouter')

/* const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sunc();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}; */

app.use(express.json())
app.use('/auth', authRouter)
// Устанавливаем сервер и соединение с базой данных

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://mikhail:29947219@cluster0.4lx7owr.mongodb.net/rs-clone?retryWrites=true&w=majority`)
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start()