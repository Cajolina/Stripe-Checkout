const express = require("express");
const { getAllProducts } = require("../controllers/product.controller");

const productRouter = express.Router().get("/products", getAllProducts);

module.exports = productRouter;
