const { sendTextMessage } = require("../message");

const confirmShipment = async () => {
  // Call Mcf Api to initiate the process and if api return true
  sendTextMessage("Shipment Started");

  //Update the database

  //Update the connected stores

  //Eery 6 hours product list should be called and synced
};

module.exports = { confirmShipment };
