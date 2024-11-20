const { sendTextMessage } = require("./message");
const { searchForTheProduct } = require("./product");

const messageHandler = async (message) => {
  try {
    console.log("inside message Handler", message);
    if (message == "order") {
      await sendTextMessage("Please provide basic description,SKU of item");
    } else {
      await searchForTheProduct(message);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { messageHandler };
