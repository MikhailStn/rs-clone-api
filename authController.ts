// import { Role } from "./models/Role";
const User1 = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccesToken = (userId: string) => {
  const payload = {
    userId,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req: any, res: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }
      const { username, email, password } = req.body;
      const candidate = await User1.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
      }
      const candidateEmail = await User1.findOne({ email });
      if (candidateEmail) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User1({ username, email, password: hashPassword });
      await user.save();
      return res.json({ message: "Польователь зарегистрирован" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: any, res: any) {
    try {
      const { username, password } = req.body;
      const user2 = await User1.findOne({ username });
      if (!user2) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user2.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = generateAccesToken(user2._id);
      return res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req: string, res: any) {
    try {
        const users = await User1.find()
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get users" });
    }
  }
}

module.exports = new authController();
