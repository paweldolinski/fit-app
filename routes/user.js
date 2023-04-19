const router = require("express").Router();
const UserController = require("../controllers/userController");
const { makeNewUser, loginUser, verify, logout } = UserController;

router.post("/register", makeNewUser);
router.post("/login", loginUser);
router.get("/verify", verify);
router.get("/logout", logout);

module.exports = router;
