const jwt = require("jsonwebtoken");
const secret = process.env.JWTPRIVATEKEY;
const { User } = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../model/utils");

const getUserByEmail = (email) => User.findOne({ email });

const makeNewUser = async (req, res) => {
  const { name, password, email } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await getUserByEmail(email);

    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: `User with ${email} already exist` });
    }

    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    });

    if (newUser) {
      res.status(201).json({
        user: newUser._id,
      });
    } else {
      res.send({ status: "error", message: "Server error" });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatchedPassword = await user?.matchPassword(password);

    if (!user) {
      return res.status(400).json({ status: "error", message: "Invalid user" });
    }

    if (user && !isMatchedPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid password" });
    }

    if (user && isMatchedPassword) {
      const token = generateAuthToken(user._id);

      return res.status(200).json({
        message: "User login successfully",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        message: "Invalid login or password",
      });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

const verify = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, secret);

  try {
    const id = decoded.id;
    const user = await User.findOne({ _id: id });

    if (user) {
      res.json({ status: "ok", message: "Login successfully" });
    }
  } catch (error) {
    res.json({ status: "error", message: `invalid token: ${error}` });
  }
};

const logout = async (req, res, next) => {
  res.send({ message: "user logout." });
};

const addToWorkout = async (req, res, next) => {
  const { email, finishedWorkout } = req.body;
  const { name } = finishedWorkout;

  try {
    const userUpdate = User.findOneAndUpdate(
      { email },
      { $push: { workoutsArr: finishedWorkout } }
    );
    const data = await userUpdate;

    if (data) {
      return res.status(200).json({
        message: `Workout ${name} has been added`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const saveWorkoutTemplate = async (req, res, next) => {
  const { email, savedWorkoutTemplate } = req.body;
  const { title } = savedWorkoutTemplate;

  try {
    const userUpdate = User.findOneAndUpdate(
      { email },
      { $push: { workoutTemplates: savedWorkoutTemplate } }
    );
    const data = await userUpdate;

    if (data) {
      return res.status(200).json({
        message: `Workout template: ${title} has been added`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const removeSavedTemplate = async (req, res, next) => {
  const { title, email } = req.body;

  try {
    const removeTemplate = User.findOneAndUpdate(
      { email: email },
      { $pull: { workoutTemplates: { title: title } } }
    );
    await removeTemplate;

    if (removeTemplate) {
      return res.status(200).json({
        message: `Workout template: ${title} has been removed`,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  makeNewUser,
  loginUser,
  verify,
  logout,
  addToWorkout,
  saveWorkoutTemplate,
  removeSavedTemplate,
};
