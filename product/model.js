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

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
