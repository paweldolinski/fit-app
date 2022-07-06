const router = require("express").Router();
const UserController = require("../controllers/userController");

router.route("/register").post(UserController.makeNewUser);
router.route("/login").post(UserController.loginUser);
router.route("/verify").post(UserController.verify);
router.route("/logout").get(UserController.logout);
router.route("/addWorkout").post(UserController.addToWorkout);

module.exports = router;
