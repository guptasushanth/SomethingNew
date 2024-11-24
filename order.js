//Most crucial function for this project concepts used are transactions
//and mongodb works on documentation level locking thus maintaining concurrency and if other document
//is req mongo can handle concurrently..
const createOrder = async (req, res) => {
  let response = { status: "fail" };
  try {
    let { businessId, products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .send({ message: "Invalid request. Products are required." });
    }

    const session = client.startSession();
    let orderCompletion = true;

    // Start MongoDB transaction
    await session.withTransaction(async () => {
      // Validate and reserve inventory for each product
      for (const { product_id, quantity } of products) {
        // Check product stock
        const product = await products.findOne({ _id: product_id });

        if (!product) {
          orderCompletion = false;
          throw new Error(`Product ${product_id} does not exist.`);
        }

        // Calculate reserved inventory
        const reserved = await inventryLock
          .aggregate([
            { $match: { product_id } },
            {
              $group: {
                _id: null,
                totalReserved: { $sum: "$reservedQuantity" },
              },
            },
          ])
          .toArray();

        const totalReserved =
          reserved.length > 0 ? reserved[0].totalReserved : 0;
        const availableStock = product.stock - totalReserved;

        if (availableStock < quantity) {
          orderCompletion = false;
          throw new Error(`Product ${product_id} is out of stock.`);
        }

        // Reserve inventory
        await reservedInventoryCollection.insertOne(
          {
            product_id,
            reservedQuantity: quantity,
            order_id: ObjectId().toString(),
          },
          { session }
        );
      }
    });

    if (reservationSuccessful) {
      // Finalize order
      const order = {
        _id: ObjectId(),
        products,
        status: "pending", // Set status to pending until fully processed
        createdAt: new Date(),
      };

      await orders.insertOne(order);
      res.status(201).send({ message: "Order placed successfully.", order });
    }
  } catch (error) {}
  res.send(response);
};

module.exports = { createOrder };
