const express = require("express");
const productRouter = express.Router();
const authenticateToken = require("../middleware/jwtVerify");

const { getProductList } = require("./product");

productRouter.get("/productList", authenticateToken, getProductList);

module.exports = productRouter;
