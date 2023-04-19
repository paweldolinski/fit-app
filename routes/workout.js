const router = require("express").Router();
const UserController = require("../controllers/userController");
const { addToWorkout, saveWorkoutTemplate, removeSavedTemplate } =
  UserController;

router.post("/addWorkout", addToWorkout);
router.post("/saveTemplate", saveWorkoutTemplate);
router.post("/removeTemplate", removeSavedTemplate);

module.exports = router;
