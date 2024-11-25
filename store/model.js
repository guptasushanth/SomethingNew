const mongoose = require("mongoose");

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

const Store = mongoose.model("Store", storeSchema);
module.exports = { Store };
