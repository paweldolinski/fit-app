const jwt = require("jsonwebtoken");
const secret = process.env.JWTPRIVATEKEY;

console.log("test");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token, "token=========================");

  if (!token) {
    return res
      .status(403)
      .send("A token is required for authentication" + token);
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
  return next();
};
