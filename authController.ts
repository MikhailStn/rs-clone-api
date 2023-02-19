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
        orders: []
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
        orders: []
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
        servicesArr,
        active_hotel,
        active_walking,
        active_homevisits,
        animals_hotel,
        animals_homevisits,
        price_hotel,
        price_walking,
        price_homevisits,
        serviceArea_walking,
        serviceArea_homevisits,
        kindOfDogs,
        ageOfDogs,
        genderOfDogs,
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
        typeOfHome,
        petsObj,
        order,
        message
      } = req.body;
      const user2 = await User1.findOne({ _id });
      if (petsObj) {
        user2.pets.push(petsObj);
      }
      if (birth) {
        user2.petsitterData.birth = birth;
      }
      if (servicesArr) {
        user2.petsitterData.services.servicesArr = servicesArr;
      }
      if (gender) {
        user2.petsitterData.gender = gender;
      }
      if (active_hotel) {
        user2.petsitterData.services.hotel.active = active_hotel;
      }
      if (active_walking) {
        user2.petsitterData.services.walking.active = active_walking;
      }
      if (active_homevisits) {
        user2.petsitterData.services.homevisits.active = active_homevisits;
      }
      if (animals_hotel) {
        user2.petsitterData.services.hotel.animals = animals_hotel;
      }
      if (animals_homevisits) {
        user2.petsitterData.services.homevisits.animals = animals_homevisits;
      }
      if (price_hotel) {
        user2.petsitterData.services.hotel.price = price_hotel;
      }
      if (price_walking) {
        user2.petsitterData.services.walking.price = price_walking;
      }
      if (price_homevisits) {
        user2.petsitterData.services.homevisits.price = price_homevisits;
      }
      if (serviceArea_walking) {
        user2.petsitterData.services.walking.serviceArea = serviceArea_walking;
      } else {
        user2.petsitterData.services.walking.serviceArea = "all";
      }
      if (serviceArea_homevisits) {
        user2.petsitterData.services.homevisits.serviceArea =
          serviceArea_homevisits;
      } else {
        user2.petsitterData.services.homevisits.serviceArea = "all";
      }
      if (kindOfDogs) {
        user2.petsitterData.services.walking.kindOfDogs = kindOfDogs;
      }
      if (ageOfDogs) {
        user2.petsitterData.services.walking.ageOfDogs = ageOfDogs;
      }
      if (genderOfDogs) {
        user2.petsitterData.services.walking.genderOfDogs = genderOfDogs;
      }
      if (address) {
        user2.petsitterData.address = address;
      }
      if (avatarPath) {
        user2.avatarPath = avatarPath;
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
      if (typeOfHome) {
        user2.petsitterData.typeOfHome = typeOfHome;
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
      if (order) {
        user2.orders.push(order)
      }
      if (availableDates) {
        for (let i = 0; i < availableDates.length; i++) {
          if (user2.petsitterData.availableDates.includes(availableDates[i])) {
            return;
          } else {
            user2.petsitterData.availableDates.push(availableDates[i]);
          }
        }
      }
      if (prices) {
        user2.petsitterData.prices = prices;
      }
      if (message) {
        user2.petsitterData.order.messages.push(message)
      }
      res.json({ user2 });
      await user2.save();
    } catch (err) {
      console.log(err);
    }
  }
  async getPetsitters(req: any, res: any) {
    try {
      const users = await User1.find();
      const petsitters: object[] = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].role === "PETSITTER") {
          petsitters.push(users[i] as never);
        }
      }
      res.json(petsitters);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get users" });
    }
  }
  async getOwners(req: any, res: any) {
    try {
      const users = await User1.find();
      const owners: object[] = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].role === "OWNER") {
          owners.push(users[i] as never);
        }
      }
      res.json(owners);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error to get users" });
    }
  }
  link = ``;
  async createChat(req: any, res: any) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
  async createOrder(req: any, res: any) {
    try {
      const order = {};
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();

const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
