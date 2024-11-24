const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
    },
    businessNum: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //Beautifull thing automatically adds createdAt and updatedAt fields and also updates the updatedAt field
  }
);

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    connStatus: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    businessNum: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //Beautifull thing automatically adds createdAt and updatedAt fields and also updates the updatedAt field
  }
);

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

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required,
    },
    businessNum: {
      type: String,
      required,
    },
    status: {
      type: String,
      required,
    },
    products: [{ SKU: String, quantity: Number, description: String }],
  },
  {
    timestamps: true, //Beautifull thing automatically adds createdAt and updatedAt fields and also updates the updatedAt field
  }
);

const Product = mongoose.model("Product", productSchema);
const Store = mongoose.model("Store", storeSchema);
const Business = mongoose.model("Business", businessSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Product, Store, Business, Order };
