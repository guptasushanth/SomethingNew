const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  return mongoose.connect(process.env.MONGOOSE_URL);
};
