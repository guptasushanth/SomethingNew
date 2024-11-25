const express = require("express");
const storeRouter = express.Router();
const authenticateToken = require("../middleware/jwtVerify");

const { getStoreList, connectStore } = require("./store");

//fetch the store
storeRouter.get("/store", authenticateToken, getStoreList);

storeRouter.post("/connectStore", authenticateToken, connectStore);

module.exports = storeRouter;
