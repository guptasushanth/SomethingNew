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
    SKU: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, //Beautifull thing automatically adds createdAt and updatedAt fields and also updates the updatedAt field
  }
);

module.exports = mongoose.model("Product", productSchema);
