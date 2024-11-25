import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { product } from "../api";

function Products() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    // Function to fetch data when the Product page renders
    const fetchData = async () => {
      try {
        const response = await product();
        console.log(response.data);
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-center items-center p-4">
          <h1 className="text-2xl font-bold absolute left-4">Amazonment</h1>
          <ul className="flex space-x-4 items-center">
            <li className="hover:underline cursor-pointer">
              <Link to="/Home">Home</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/Products">Products</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/Orders">Orders</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-600">
              <span className="font-semibold">
                {productList.length} Products
              </span>{" "}
              | Updated a few seconds ago
            </p>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Table */}
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">Products Table</h1>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">SKU</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/Products/${index + 1}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sku}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      item.status === "sync" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
