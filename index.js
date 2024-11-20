require("dotenv").config();
const axios = require("axios");
const { sendTemplateMessage, sendTextMessage } = require("./message.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

// Webhook endpoint for receiving messages
app.post("/webhook", async (req, res) => {
  const data = req.body;

  // Check if the payload contains messages
  if (data.messages) {
    data.messages.forEach((message) => {
      const sender = message.from; // Sender's phone number
      const userMessage = message.text.body; // User's message
      console.log(`Message from ${sender}: ${userMessage}`);

      // Process the message or take actions as needed
    });
    try {
      await sendTextMessage();
    } catch (error) {
      console.log(error);
    }
    res.status(200).send("Message received");
  } else {
    res.status(200).send("No messages received");
  }
});

// To test the end-point
app.get("/", (req, res) => {
  res.send("Our Server is live");
});

// To check whether we are able to send messagge on Api call
app.get("/sendTemplateMessage", async (req, res) => {
  try {
    await sendTemplateMessage();
  } catch (error) {
    console.log(error);
  }
  return res.send("We were ablt to send message through api");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
