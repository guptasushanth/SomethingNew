const Product = require("./config/models");
const { sendTemplateMessage } = require("./message");

// Generalized function to extract values
function extractValue(input, key) {
  const regex = new RegExp(`${key} is (\\w+)`);
  const match = input.match(regex);
  return match ? match[1] : null;
}

const searchForTheProduct = async (message) => {
  try {
    const description = extractValue(message, "description");
    const sku = extractValue(message, "SKU");
    let product = "Not Found";
    if (sku) {
      product = await Product.findOne({ SKU: sku });
    } else {
      product = await Product.find({ description: description });
    }
    console.log(product);
    if (product) {
      await sendTemplateMessage();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchForTheProduct };
