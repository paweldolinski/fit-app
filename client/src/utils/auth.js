// const jwt = require("jsonwebtoken");
// const secret = process.env.JWTPRIVATEKEY;
// const getItemFormLocalstorage = require("../Utiles/localStorage");
//
// export const requireAuth = (req, res, next) => {
//   const token = req.getItemFormLocalstorage("token");
//   console.log("token,,,", token);
//   if (token) {
//     jwt.verify(token, secret, (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect("/login");
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect("/login");
//   }
// };
