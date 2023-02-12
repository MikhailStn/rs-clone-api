// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
// export const sequelize = require("./db");
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require("./authRouter");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use('/uploads', express.static('./uploads'));

// Устанавливаем сервер и соединение с базой данных

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mikhail:29947219@cluster0.4lx7owr.mongodb.net/rs-clone?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
