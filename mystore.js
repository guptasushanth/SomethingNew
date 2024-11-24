const myStoreDetails = () => {
  const data = {
    CLIENT_ID: "mockClientID",
    CLIENT_SECRET: "mockClientSecret",
    REDIRECT_URI:
      "http://ec2-65-2-120-70.ap-south-1.compute.amazonaws.com:5000/auth/callback",
  };
  return data;
};
module.exports = { myStoreDetails };
