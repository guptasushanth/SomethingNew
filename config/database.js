const mongoose = require("mongoose");

exports.connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://myProject:yLEXUZ9ySGMP0Z0j@myproject.c7xfc.mongodb.net/myProject"
  );
  //   for (let i = 0; i < 10000; i++) console.log("This will run no matter what");
};
