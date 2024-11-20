require("dotenv").config();
const axios = require("axios");
const { sendTemplateMessage, sendTextMessage } = require("./message.js");
const { messageHandler } = require("./messageHandler.js");

const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/database");

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
  const body = req.body;
  console.log(JSON.stringify(body, null, 2));
  let messageContent = "";
  if (body.object === "whatsapp_business_account") {
    body.entry.forEach((entry) => {
      const changes = entry.changes;
      changes.forEach((change) => {
        if (change.value.messages) {
          const messages = change.value.messages;
          messages.forEach((message) => {
            console.log("Message received:", message);
            messageContent = message.text.body;
            // Example: Reply to a text message
            if (message.type === "text") {
              console.log("Text message:", message.text.body);
            }
          });
        }
      });
    });
    try {
      if (messageContent) {
        await messageHandler(messageContent);
      }
    } catch (error) {
      console.log("line 53:", error);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.status(404).send("Something Went Wrong");
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

// To check whether we are able to send messagge on Api call
app.get("/messageHandler", async (req, res) => {
  try {
    await messageHandler(req.body.message);
  } catch (error) {
    console.log(error);
  }
  return res.send("We were ablt to send message through api");
});

connectDB()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error while connecting to the data base");
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
