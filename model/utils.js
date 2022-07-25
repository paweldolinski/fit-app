const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

const validateUser = (user) => {
  if (!user.email) return "Error: Email cannot be blank.";
  if (!user.password) return "Error: Password cannot be blank.";
  if (!user) return "Invalid user";
  if (user.name !== undefined) {
    if (!user.name) {
      return "Name cant be blank.";
    }
  } else {
    return "";
  }
};

const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWTPRIVATEKEY);
};

module.exports = {
  generateHash,
  validPassword,
  validateUser,
  generateAuthToken,
};
