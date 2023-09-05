const express = require("express");
const {
  getAllUsers,
  registerUser,
  login,
} = require("../controllers/user.controller");

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/registerUser", registerUser)
  .post("/login", login);

module.exports = { userRouter };
