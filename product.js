const { Product } = require("./config/models");
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

const createProducts = async (businessNum) => {
  try {
    let demoProducts = ["Earphone", "Laptop", "Mobile", "Salt", "Shampoo"];
    let mappedProduct = [];
    let index = 10;
    for (let product of demoProducts) {
      mappedProduct.push({
        name: product,
        description: "This is demo Product",
        price: "10$",
        sku: "SKU" + index,
        quantity: 50,
        status: "sync",
        businessNum: businessNum,
      });
      index++;
    }
    console.log(mappedProduct);
    let insert = await Product.insertMany(mappedProduct);
    if (insert) {
      console.log("Product created successfully");
    } else {
      console.log("Error while creating Products");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchForTheProduct, createProducts };
