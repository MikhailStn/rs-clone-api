const Router = require("express");
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");

router.post(
  "/register/owner",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 }),
    check("email", "Введите корректный адрес электронной почты").isEmail(),
  ],
  controller.registration
);
router.post("/register/petsitter", controller.registration);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
