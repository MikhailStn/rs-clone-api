const Router = require("express");
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");


router.post(
  "/register/owner",
  [
    check("firstName", "First name can't be empty").notEmpty(),
    check("lastName", "Last name can't be empty").notEmpty(),
    check("password", "Password must be 4 or less than 10 characters").isLength({ min: 4, max: 10 }),
    check("email", "Please enter a valid email address").isEmail(),
    check("city", "City can't be empty").notEmpty(),
    check("phone", "Please enter a valid phone").isMobilePhone()
  ],
  controller.registration
);
router.post("/register/petsitter",
[
  check("firstName", "First name can't be empty").notEmpty(),
  check("lastName", "Last name can't be empty").notEmpty(),
  check("password", "Password must be 4 or less than 10 characters").isLength({ min: 4, max: 10 }),
  check("email", "Please enter a valid email address").isEmail(),
  check("city", "City can't be empty").notEmpty(),
  check("phone", "Please enter a valid phone").isMobilePhone()
],
controller.registrationPetsitter);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);
router.get("/user", controller.getUserByID);
router.get("/user/role", controller.getRoleByUserID);

module.exports = router;
