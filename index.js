require("dotenv").config();
const axios = require("axios");

async function sendTemplateMessage() {
  const response = await axios({
    url: "https://graph.facebook.com/v21.0/518986904622311/messages",
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      to: "918309742589",
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    }),
  });
  console.log(response.data);
}

async function sendTextMessage() {
  const response = await axios({
    url: "https://graph.facebook.com/v21.0/518986904622311/messages",
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      to: "918309742589",
      type: "text",
      text: {
        body: "This is a text message",
      },
    }),
  });
  console.log(response.data);
}

async function sendImageMessage() {
  const response = await axios({
    url: "https://graph.facebook.com/v21.0/518986904622311/messages",
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      to: "918309742589",
      type: "image",
      image: {
        link: "This is a text message",
        caption: "This is a media message",
      },
    }),
  });
  console.log(response.data);
}
// sendTemplateMessage();
sendTextMessage();
