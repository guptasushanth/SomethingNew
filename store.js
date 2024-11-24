const { Store } = require("./config/models");

const updateStoreStatus = async (numValue, storeValue, accessToken) => {
  try {
    let updateStore = await Store.findOneAndUpdate(
      { businessNum: numValue, name: storeValue },
      { connStatus: "connected", token: accessToken }
    );

    if (updateStore) {
      console.log("Successfully connected store");
    } else {
      console.log("Error occured while connecting store");
    }
  } catch (error) {
    console.log(error);
  }
};

const createStores = async (businessNum) => {
  try {
    let supportedStores = ["shopify", "myStore", "yourStore"];
    let mappedStore = [];
    for (let store of supportedStores) {
      mappedStore.push({
        name: store,
        connStatus: "disconnect",
        token: "",
        businessNum: businessNum,
      });
    }
    let insert = await Store.insertMany(mappedStore);
    if (insert) {
      console.log("Stores created successfully");
    } else {
      console.log("Error while creating store");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateStoreStatus, createStores };
