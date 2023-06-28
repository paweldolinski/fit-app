const router = require("express").Router();
const UserController = require("../controllers/userController");
const {
  addToWorkout,
  saveWorkoutTemplate,
  removeSavedTemplate,
  addToBestResult,
} = UserController;

router.post("/addWorkout", addToWorkout);
router.post("/saveTemplate", saveWorkoutTemplate);
router.post("/removeTemplate", removeSavedTemplate);
router.post("/addToBestResult", addToBestResult);

module.exports = router;
