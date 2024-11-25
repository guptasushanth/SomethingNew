const express = require("express");
const orderRouter = express.Router();
const authenticateToken = require("../middleware/jwtVerify");

const { createOrder, getOrderList } = require("./order.js");

orderRouter.post("/createOrder", authenticateToken, createOrder);
orderRouter.get("/orderList", authenticateToken, getOrderList);

module.exports = orderRouter;
