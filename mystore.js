const myStoreDetails = () => {
  const data = {
    CLIENT_ID: "mockClientID",
    CLIENT_SECRET: "mockClientSecret",
    REDIRECT_URI: "http://localhost:5000/auth/callback",
  };
  return data;
};
module.exports = { myStoreDetails };
