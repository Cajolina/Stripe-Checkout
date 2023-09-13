const express = require("express");
const {
  createCheckoutSession,
  verifySession,
  getOrder,
} = require("../controllers/order.controller");
const { auth } = require("../middlewares/middlewares");

const orderRouter = express
  .Router()
  .post("/create_checkout_session", auth, createCheckoutSession)
  .post("/verify_session", verifySession)
  .get("/getOrder", getOrder);

module.exports = { orderRouter };
