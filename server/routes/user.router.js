const express = require("express");
const {
  getAllUsers,
  registerUser,
  login,
} = require("../controllers/user.controller");
const { auth } = require("../middlewares/middlewares");

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/registerUser", registerUser)
  .post("/login", login);

module.exports = { userRouter };
