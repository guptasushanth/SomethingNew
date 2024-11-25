import React, { useState } from "react";
import { signup } from "../api";

function Signup() {
  // States for mobile number and OTP
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");

  // Function to handle mobile number submission
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    let data = { businessNum: mobileNumber, businessName: name };
    let response = await signup(data);
    if (response.message != "success") {
      alert("User already exists");
    }
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back!
          </h1>
          <p className="mt-2 text-center text-gray-600">Please Signup</p>
          <form onSubmit={handleSignupSubmit} className="mt-6">
            {/* Mobile Number Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="input input-bordered w-full"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                pattern="[0-9]{10}" // Ensures a 10-digit number
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Business Name</span>
              </label>
              <input
                type="string"
                placeholder="Enter your Business Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default Signup;
