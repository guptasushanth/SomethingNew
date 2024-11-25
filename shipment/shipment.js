const { Product } = require("../product/model");
const { Order } = require("../order/model");
const { Store } = require("../store/model");
const { InventryLock } = require("../config/models");

const confirmshipment = async (req, res) => {
  try {
    let { businessNum } = req.user;
    let orderList = await Order.findOneAndUpdate(
      { businessNum: businessNum, orderId: req.body.orderId },
      { status: "shipped" },
      { new: true }
    );
    // deleting from the inventoryLock collection so that we can retrieve the locked stocks
    let clearInventory = await InventryLock.deleteMany({
      orderId: req.body.orderId,
    });
    // updating the product collection
    for (let product of orderList.products) {
      let productUpdate = await Product.findOneAndUpdate(
        {
          sku: product.sku,
          businessNum: businessNum,
          quantity: { $gte: product.quantity },
        }, // Filter: ensure stock is sufficient
        { $inc: { quantity: -product.quantity } }, // Update: decrease stock
        { new: true } // Options: return the updated document
      );
    }

    // calling the connected stores to update their inventory using token
    let connectedStores = await Store.find({
      businessNum: businessNum,
      status: "connected",
    });
    // updateInventory -- function to update the inventory using tokens

    res.status(200).json({ data: orderList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = { confirmshipment };
