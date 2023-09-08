const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const { userRouter } = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

//Routing
app.use("/api", userRouter, productRouter);

module.exports = { app };
