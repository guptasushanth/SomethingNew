const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Simulated user database
const USERS = { user1: { id: 1, name: "John Doe", email: "john@example.com" } };

// Store temporary authorization codes
const CODES = {};
const TOKENS = {};

// Authorization endpoint
app.get("/authorize", (req, res) => {
  const { client_id, redirect_uri, state } = req.query;

  // Simulate a login page (hardcoded user)
  const authCode = "mockAuthCode123"; // In a real setup, generate a unique code
  CODES[authCode] = USERS["user1"]; // Associate code with the user

  res.redirect(`${redirect_uri}?code=${authCode}&state=${state}`);
});

// app.get("/");

// Token endpoint
app.post("/token", (req, res) => {
  const { code, client_id, client_secret, redirect_uri } = req.body;

  if (!CODES[code]) {
    return res.status(400).json({ error: "Invalid authorization code" });
  }

  const accessToken = "mockAccessToken456"; // In a real setup, generate a unique token
  TOKENS[accessToken] = CODES[code]; // Associate token with the user

  delete CODES[code]; // Consume the code

  res.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600,
  });
});

// User info endpoint
app.get("/userinfo", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!TOKENS[token]) {
    return res.status(401).json({ error: "Invalid token" });
  }

  res.json(TOKENS[token]);
});

// Start mock OAuth2 provider
app.listen(4000, () => {
  console.log("Mock OAuth2 provider running on http://localhost:4000");
});
