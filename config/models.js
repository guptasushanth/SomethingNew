const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    businessNum: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const inventryLock = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    reservedQuantity: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model("Business", businessSchema);
const InventryLock = mongoose.model("InventryLock", inventryLock);

module.exports = { Business, InventryLock };
