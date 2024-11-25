import React, { useState } from "react";
import img1 from "../../images/1.jpeg";
import img2 from "../../images/2.jpeg";
import img3 from "../../images/3.jpeg";
import { createOrder } from "../api";

function App() {
  // Define an array of products
  const products = [
    {
      id: 1,
      SKU: "SKU10",
      customerName: "my store customer",
      platform: "my store",
      priority: "medium",
      title: "Wireless Earbuds, IPX8",
      description: "Organic Cotton, fairtrade certified",
      price: 10,
      image: img1,
    },
    {
      id: 2,
      SKU: "SKU11",
      customerName: "my store customer",
      platform: "my store",
      priority: "medium",
      title: "AirPods Max",
      description: "A perfect balance of high-fidelity audio",
      price: 10,
      image: img2,
    },
    {
      id: 3,
      SKU: "SKU12",
      customerName: "my store customer",
      platform: "my store",
      priority: "medium",
      title: "Bose BT Earphones",
      description: "Table with air purifier, stained veneer/black",
      price: 10,
      image: img3,
    },
  ];

  // State to store quantity of each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Default quantity is 1 for each product
      return acc;
    }, {})
  );

  // Function to handle quantity increment
  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Function to handle quantity decrement
  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0, // Minimum quantity is 1
    }));
  };
  // Calculate total price based on quantities
  const totalPrice = products.reduce(
    (total, product) => total + product.price * quantities[product.id],
    0
  );
  const handleBuyNow = async () => {
    // Prepare data to send to the server
    let orderData = {
      customerName: "",
      platform: "MyStore",
      priority: "High",
      status: "pending",
    };
    orderData["products"] = products.map((product) => ({
      sku: product.SKU,
      quantity: quantities[product.id],
      description: "Demo Description",
    }));
    console.log(orderData);
    let orderConfirmation = await createOrder(orderData);
    if (orderConfirmation.message != "success") {
      alert(orderConfirmation.message);
    } else {
      window.location.href = "/Home";
    }
    // Simulate sending data to the server
    //console.log("Sending the following order data to the server:", orderData);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="bg-primary text-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Store</h1>
        <nav className="flex space-x-4">
          <button className="btn btn-ghost btn-sm">Categories</button>
          <button className="btn btn-ghost btn-sm">Deals</button>
          <button className="btn btn-ghost btn-sm">What's New</button>
          <button className="btn btn-ghost btn-sm">Delivery</button>
        </nav>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search Product"
            className="input input-bordered input-sm"
          />
          <button className="btn btn-ghost btn-sm">Account</button>
          <button className="btn btn-ghost btn-sm">Cart</button>
        </div>
      </header>

      {/* Products */}
      <section className="container mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="card shadow-xl">
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p>{product.description}</p>
              <p className="font-bold text-lg">₹{product.price}</p>
              <div className="card-actions flex items-center space-x-4">
                {/* Stepper */}
                <div className="flex items-center">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </button>
                  <span mt-2 className="mx-2">
                    {quantities[product.id]}
                  </span>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* Footer with Buy Now Button */}
      <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={handleBuyNow}
          className="btn btn-success"
          disabled={totalPrice === 0} // Disable button if total price is 0
        >
          Buy Now
        </button>
      </footer>
    </div>
  );
}

export default App;
