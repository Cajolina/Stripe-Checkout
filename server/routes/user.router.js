const express = require("express");
const {
  getAllUsers,
  registerUser,
  login,
  authorize,
  logout,
} = require("../controllers/user.controller");

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/registerUser", registerUser)
  .post("/login", login)
  .post("/logout", logout)
  .get("/authorize", authorize);

module.exports = { userRouter };
