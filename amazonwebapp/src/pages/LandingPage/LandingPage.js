import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connectStore, store } from "../api";
import { useEffect } from "react";

function LandingPage() {
  // State to control the visibility of the popup/modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeList, setStoreList] = useState([]);

  // State to store the store name and URL entered by the user
  const [selectedStore, setSelectedStore] = useState("");
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    // Function to fetch data when the Home page renders
    const fetchData = async () => {
      try {
        const response = await store();
        console.log(response.data);
        setStoreList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function
  }, []);

  // Function to open the modal and set the selected store name
  const handleConnectClick = (store) => {
    setSelectedStore(store); // Set the store name (e.g., Shopify, Amazon)
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle the form submission inside the modal
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    if (storeUrl.trim() === "") {
      alert("Please enter a valid store URL."); // Validate input
      return;
    }
    //Api call to send the url to back-end to start OAuth
    const checkConn = await connectStore({
      url: storeUrl,
      store: selectedStore,
    });
    const newTab = window.open(checkConn, "_blank");
    const checkTab = setInterval(() => {
      if (newTab.closed) {
        clearInterval(checkTab);
        window.location.reload(); // Refresh the main tab after OAuth is done
      }
    }, 1000);
    // alert(`Store "${selectedStore}" connected with URL: ${storeUrl}`);
    setIsModalOpen(false); // Close the modal after submission
    setStoreUrl(""); // Clear the URL input
  };
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

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome to Amazonment!</h2>
          <p className="text-gray-600 mt-2">
            Streamline your online business management with ease.
          </p>
        </div>

        {/* Step 1: Connect a Store */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">
            Step 1: Connect a Store
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Store Cards */}
            {storeList.map((store) => (
              <div
                key={store}
                className="card bg-white shadow-lg p-6 rounded-lg"
              >
                <h4 className="text-xl font-semibold">{store.name}</h4>
                <button
                  onClick={() => handleConnectClick(store.name)}
                  className="btn btn-primary mt-4 w-full bg-blue-600 hover:bg-blue-700"
                >
                  {store.connStatus == "connected" ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Connect Carrier Service */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Step 2: Connect Carrier Service
          </h3>
          <div className="card bg-white shadow-lg p-6 rounded-lg w-full md:w-1/2 mx-auto">
            <h4 className="text-xl font-semibold">
              Amazon Multi-Channel Fulfillment
            </h4>
            <button className="btn btn-primary mt-4 w-full bg-green-600 hover:bg-green-700">
              Connect
            </button>
          </div>
        </div>
      </div>
      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Connect {selectedStore}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2 font-medium">Store URL:</label>
              <input
                type="url"
                placeholder="Enter the store URL"
                className="input input-bordered w-full mb-4 p-2 border border-gray-300 rounded"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)} // Update state on input
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn btn-secondary bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
