const express = require("express");
const cors = require("cors");

const { userRouter } = require("./routes/user.router");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//Routing
app.use("/api", userRouter);

module.exports = { app };
