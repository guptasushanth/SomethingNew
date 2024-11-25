const express = require("express");
const shipmentRouter = express.Router();
const authenticateToken = require("../middleware/jwtVerify");

const { confirmshipment } = require("./shipment");
shipmentRouter.post("/confirmShipment", authenticateToken, confirmshipment);

module.exports = shipmentRouter;
