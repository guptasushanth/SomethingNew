//Most crucial function for this project concepts used are transactions
//and mongodb works on documentation level locking thus maintaining concurrency and if other document
//is requested mongo can handle concurrently.. thus performance is not hendered

const { Product, Order, InventryLock } = require("./config/models");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
  let response = { status: "fail" };
  try {
    let { products, platform, orderId } = req.body;
    let { businessNum } = req.user;
    if (!orderId) {
      orderId = uuidv4();
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .send({ message: "Invalid request. Products are required." });
    }

    const session = await mongoose.startSession(); // Start a session
    // session.startTransaction(); // Begin the transaction

    let orderCompletion = true;

    // Start MongoDB transaction
    await session.withTransaction(async () => {
      // Validate and reserve inventory for each product
      for (const { sku, quantity } of products) {
        // Check product stock
        const warehouseProduct = await Product.findOne({ sku, businessNum });
        console.log(warehouseProduct);
        if (!warehouseProduct) {
          orderCompletion = false;
          throw new Error(`not exist`);
        }

        // Calculate reserved inventory
        const reserved = await InventryLock.aggregate([
          { $match: { productId: warehouseProduct["_id"].toString() } },
          {
            $group: {
              _id: null,
              totalReserved: { $sum: "$reservedQuantity" },
            },
          },
        ]);
        console.log(reserved);
        const totalReserved =
          reserved.length > 0 ? reserved[0].totalReserved : 0;
        const availableStock = warehouseProduct.quantity - totalReserved;

        if (availableStock < quantity) {
          orderCompletion = false;
          throw new Error(`Product is out of stock.`);
        }

        // Reserve inventory
        await InventryLock.create(
          [
            {
              productId: warehouseProduct["_id"].toString(),
              reservedQuantity: quantity,
              orderId: orderId,
            },
          ],
          { session }
        );
      }
    });

    if (orderCompletion) {
      console.log(products);
      // Finalize order
      const order = {
        orderId: orderId,
        products: products,
        status: "pending",
        storeName: platform,
        businessNum: businessNum,
      };
      console.log(order);
      const orderDoc = await Order.create([order]);

      res.status(201).send({ message: "success", order });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Order could not be placeds" });
  }
};

module.exports = { createOrder };
