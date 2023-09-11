const express = require("express");
const { createCheckoutSession } = require("../controllers/order.controller");
const { auth } = require("../middlewares/middlewares");

const orderRouter = express
  .Router()
  .post("/create_checkout_session", auth, createCheckoutSession);

module.exports = { orderRouter };
