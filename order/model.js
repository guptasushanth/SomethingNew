const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    businessNum: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    products: [{ sku: String, quantity: Number, description: String }],
  },
  {
    timestamps: true, //Beautifull thing automatically adds createdAt and updatedAt fields and also updates the updatedAt field
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
