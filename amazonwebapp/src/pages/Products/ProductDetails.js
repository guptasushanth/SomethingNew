import React from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  // Assuming product details are passed dynamically via route parameters
  const { id } = useParams(); // Replace with actual logic to fetch product ID
  const product = {
    id,
    name: `Product ${id}`,
    sku: `SKU00${id}`,
    price: `$${id * 10}`,
    quantity: 100 - id * 2,
    description: `This is a detailed description of Product ${id}.`,
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/Products" className="text-blue-600 hover:underline">
          Products
        </Link>{" "}
        / <span>{product.name}</span>
      </nav>
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">
              <span className="font-semibold">40 units</span> | Updated a few
              seconds ago
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline">Sync</button>
          </div>
        </div>
      </header>
      {/* Product Details */}
      <div className="bg-white shadow  p-6">
        <p className="text-gray-800">
          <span className="font-semibold">SKU:</span> {product.sku}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Price:</span> {product.price}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Quantity:</span> {product.quantity}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Stores connected:</span> Own Website
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Current Quantity:</span>{" "}
          {product.quantity}
        </p>
        <p className="text-red-600">
          <span className="font-semibold">Recommended:</span> 60
        </p>
        <p className="text-gray-800 mt-4">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
