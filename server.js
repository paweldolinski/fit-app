const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const checkAuth = require("./middlewares/auth");



console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (!err) {
    console.log("=====================MongoDB connected.");
  } else {
    console.log("=====================MongoDB connected FAILED", err);
  }
});

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/user");
const workoutRouter = require("./routes/workout");

app.use("/", userRouter);
app.use("/workout", checkAuth, workoutRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
