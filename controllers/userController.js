const { User } = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../model/utils");

const makeNewUser = async (req, res) => {
  const { name, password, email } = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ message: `User with ${email} exist already` });

    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateAuthToken(newUser._id),
      });
    } else {
      res.send({ message: "chuj go wie" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user && user === null) {
      res.status(400).json({ message: "Invalid user" });
    }

    if (user && !(await user.matchPassword(password))) {
      res.status(400).json({ message: "Invalid password" });
    }

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        message: "Valid login",
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          workoutsArr: user.workoutsArr,
          token: generateAuthToken(user._id),
        },
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

const verify = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateAuthToken(user._id),
    });
  } else {
    res.send({ message: "bad auth" });
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
      { $push: { workoutsArr:  finishedWorkout  } }
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
