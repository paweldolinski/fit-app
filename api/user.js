const router = require("express").Router();
const UserController = require("../controllers/userController");

router.route("/register").post(UserController.makeNewUser);
router.route("/login").post(UserController.loginUser);
router.route("/verify").get(UserController.verify);
router.route("/logout").get(UserController.logout);
router.route("/addWorkout").post(UserController.addToWorkout);
router.route("/saveTemplate").post(UserController.saveWorkoutTemplate);
router.route("/removeTemplate").post(UserController.removeSavedTemplate);

module.exports = router;
