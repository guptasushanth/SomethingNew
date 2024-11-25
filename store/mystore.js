require("dotenv").config();

const myStoreDetails = () => {
  const data = {
    CLIENT_ID: "mockClientID",
    CLIENT_SECRET: "mockClientSecret",
    REDIRECT_URI: process.env.REDIRECT_URI,
  };
  return data;
};
module.exports = { myStoreDetails };
