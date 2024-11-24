import React, { useState } from "react";
import { login } from "../api";

function Login() {
  // States for mobile number and OTP
  const [mobileNumber, setMobileNumber] = useState("1111111111");
  const [otp, setOtp] = useState("123456");
  const [otpSent, setOtpSent] = useState(false); // To toggle OTP input visibility

  // Function to handle mobile number submission
  const handleMobileSubmit = (event) => {
    event.preventDefault();

    if (mobileNumber.match(/^[0-9]{10}$/)) {
      // Simulate OTP sending
      setOtpSent(true);
      alert(`OTP sent to ${mobileNumber}`);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  // Function to handle OTP verification
  const handleOtpVerification = async (event) => {
    event.preventDefault();

    if (otp === "123456") {
      // Simulate successful OTP verification
      let data = { businessNum: mobileNumber };
      let response = await login(data);
      if (response.message == "success") {
        alert("OTP verified successfully!");
        window.location.href = "/Home";
      } else {
        alert("User not found. Please signup.");
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        {!otpSent ? (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Welcome Back!
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Enter your mobile number to continue
            </p>
            <form onSubmit={handleMobileSubmit} className="mt-6">
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
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Verify OTP
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Enter the OTP sent to {mobileNumber}
            </p>
            <form onSubmit={handleOtpVerification} className="mt-6">
              {/* OTP Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">OTP</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input input-bordered w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  pattern="[0-9]{6}" // Ensures a 6-digit OTP
                />
              </div>
              {/* Verify Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full bg-green-600 hover:bg-green-700"
                >
                  Verify
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
