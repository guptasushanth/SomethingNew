const { sendTextMessage } = require("./message");
const { searchForTheProduct } = require("./product");
const { confirmShipment } = require("../mcf_services/mcf");

const messageHandler = async (message) => {
  try {
    console.log("inside message Handler", message);
    if (message == "order") {
      await sendTextMessage("Please provide basic description,SKU of item");
    } else if (message == "Confirm Shipment") {
      await confirmShipment();
    } else {
      await searchForTheProduct(message);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { messageHandler };
