const jwt = require("jsonwebtoken");
const secret = process.env.JWTPRIVATEKEY;
const { User } = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../model/utils");

const makeNewUser = async (req, res) => {
  const { name, password, email } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.findOne({ email: email });

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

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user && user === null) {
      res.status(400).json({ status: "error", message: "Invalid user" });
    }

    if (user && !(await user.matchPassword(password))) {
      res.status(400).json({ status: "error", message: "Invalid password" });
    }

    if (user && (await user.matchPassword(password))) {
      const token = generateAuthToken(user._id);
      const { name, email, _id, workoutsArr } = user;

      return res.status(200).json({
        message: "Valid login",
        user: { name, email, _id, workoutsArr },
        token,
      });
    } else {
      return res.status(400).json({
        message: "Invalid login or password",
      });
    }
  } catch (error) {
    return;
  }
};

const verify = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  console.log(token);

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded, "decode");
    const id = decoded.id;
    const user = await User.findOne({ _id: id });

    if (user) {
      console.log("ok token");
      res.json({ status: "ok", message: "login successfully" });
    }
  } catch {
    console.log("zle token");
    res.json({ status: "error", message: "invalid token" });
  }
};

const logout = async (req, res, next) => {
  res.send({ message: "user logout" });
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

module.exports = {
  makeNewUser,
  loginUser,
  verify,
  logout,
  addToWorkout,
};
