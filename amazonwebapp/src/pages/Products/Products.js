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
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Amazonment</h1>
          <ul className="flex space-x-4">
            <li className="hover:underline cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/Products">Products</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/OrdersPage">Orders</Link>
            </li>
            <li className="hover:underline cursor-pointer">Returns</li>
            <li className="hover:underline cursor-pointer">Tools</li>
          </ul>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:block">Profile</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-800">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-600">
              <span className="font-semibold">15 Orders</span> | Updated a few
              seconds ago
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">Sync</button>
            <button className="btn btn-outline">Create</button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Orders"
            className="input input-bordered w-full"
          />
          <select className="select select-bordered">
            <option>Order List:Recently Added</option>
            <option>Order List:Alphabetical</option>
          </select>
          <select className="select select-bordered">
            <option>Platform: All</option>
            <option>Platform: Shopify</option>
          </select>
          <select className="select select-bordered">
            <option>Priority: High</option>
            <option>Priority: Low</option>
          </select>
        </div>

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
                <th className="border border-gray-300 px-4 py-2">Action</th>
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
                      {item.product}
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
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="btn btn-sm btn-outline mr-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>{" "}
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
