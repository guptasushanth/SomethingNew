const { Store } = require("./model");
const { myStoreDetails } = require("./mystore");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");

const getStoreList = async (req, res) => {
  try {
    const { businessNum } = req.user;
    let storeList = await Store.find({ businessNum: businessNum });
    res.status(200).json({ data: storeList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
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

const storeDetailsHandler = (store) => {
  if (store == "myStore") {
    return myStoreDetails();
  }
  return { CLIENT_ID: "", CLIENT_SECRET: "" };
};

const connectStore = (req, res) => {
  try {
    let { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = storeDetailsHandler(
      req.body.store
    );
    const { businessNum } = req.user;
    // Dynamically configure Passport strategy for this user
    passport.use(
      "dynamic-oauth",
      new OAuth2Strategy(
        {
          authorizationURL: req.body.url, //state can be to made complex to handle CSRF Attacks
          tokenURL: process.env.TOKEN_URL,
          clientID: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          callbackURL: REDIRECT_URI,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log(accessToken);
            await updateStoreStatus(businessNum, req.body.store, accessToken);
            done(null, { accessToken, profile });
          } catch (error) {
            done(error);
          }
        }
      )
    );

    // Redirect the user to start the OAuth flow
    const authUrl = `${req.body.url}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=state`;
    res.send(authUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server occured");
  }
};

module.exports = {
  updateStoreStatus,
  createStores,
  storeDetailsHandler,
  getStoreList,
  connectStore,
};
