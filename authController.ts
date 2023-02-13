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
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { firstName, lastName, city, email, password, phone } = req.body;
      const candidateEmail = await User1.findOne({ email });
      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User1({
        firstName,
        lastName,
        city,
        email,
        password: hashPassword,
        phone,
        role: "OWNER",
        pets: [],
      });
      await user.save();
      return res.json({
        message: "Пользователь зарегистрирован",
        id: user._id,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const user2 = await User1.findOne({ email });
      if (!user2) {
        return res
          .status(400)
          .json({ message: `Пользователь c таким адресом почты не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user2.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = generateAccesToken(user2._id);
      return res.json({ token, id: user2._id, role: user2.role });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req: string, res: any) {
    try {
      const users = await User1.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get users" });
    }
  }
  async getUserByID(req: any, res: any) {
    try {
      const { _id } = req.body;
      const currentUser = await User1.findOne({ _id });
      if (!currentUser) {
        return res
          .status(400)
          .json({ message: `Пользователь c таким id не найден` });
      }
      return res.json(currentUser);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get user" });
    }
  }
  async registrationPetsitter(req: any, res: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { firstName, lastName, city, email, password, phone } = req.body;
      const candidateEmail = await User1.findOne({ email });
      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User1({
        firstName,
        lastName,
        city,
        email,
        password: hashPassword,
        phone,
        role: "PETSITTER",
      });
      await user.save();
      return res.json({
        message: "Пользователь зарегистрирован",
        id: user._id,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async getRoleByUserID(req: any, res: any) {
    try {
      const { _id } = req.body;
      const currentUser = await User1.findOne({ _id });
      if (!currentUser) {
        return res
          .status(400)
          .json({ message: `Пользователь c таким id не найден` });
      }
      return res.json(currentUser.role);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get user" });
    }
  }
  // WORK WITH PHOTO UPLOAD
  async addPhoto(req: any, res: any) {
    const file = req.file;
    if (!file) {
      return res.json({ error: "Incorrect input name" });
    }
    try {
      res.json({
        message: "File upload",
        filePath: `uploads/${file.filename}`,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "No file upload" });
    }
  }
  //ADD DATA FOR PETSITTER
  async addPetsitterData(req: any, res: any) {
    try {
      const {
        _id,
        birth,
        gender,
        services,
        address,
        avatarPath,
        aboutMe,
        carers,
        skills,
        qualifications,
        homeConditions,
        tenatsAtHome,
        otherAnimals,
        level,
        rate,
        availableDates,
        prices,
      } = req.body;
      const user2 = await User1.findOne({ _id });
      if (birth) {
        user2.petsitterData.birth = birth;
      }
      if (gender) {
        user2.petsitterData.gender = gender;
      }
      if (services) {
        user2.petsitterData.services = services;
      }
      if (address) {
        user2.petsitterData.address = address;
      }
      if (avatarPath) {
        user2.petsitterData.avatarPath = avatarPath;
      }
      if (aboutMe) {
        user2.petsitterData.aboutMe = aboutMe;
      }
      if (carers) {
        user2.petsitterData.carers = carers;
      }
      if (skills) {
        user2.petsitterData.skills = skills;
      }
      if (qualifications) {
        user2.petsitterData.qualifications = qualifications;
      }
      if (homeConditions) {
        user2.petsitterData.homeConditions = homeConditions;
      }
      if (tenatsAtHome) {
        user2.petsitterData.tenatsAtHome = tenatsAtHome;
      }
      if (otherAnimals) {
        user2.petsitterData.otherAnimals = otherAnimals;
      }
      if (level) {
        user2.petsitterData.level = level;
      }
      if (rate) {
        user2.petsitterData.rate = rate;
      }
      if (availableDates) {
        user2.petsitterData.availableDates = availableDates;
      }
      if (prices) {
        user2.petsitterData.prices = prices;
      }
      res.json({ user2 });
      await user2.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();
