import axios from "axios";

// Base configuration for your API
const apiClient = axios.create({
  baseURL: "http://ec2-65-2-120-70.ap-south-1.compute.amazonaws.com:5000",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

// Api to connect Store
export const connectStore = async (data) => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.post("/connectStore", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to login
export const login = async (data) => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.post("/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("post request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to signup
export const signup = async (data) => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.post("/signup", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("post request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to get all the stores
export const store = async () => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.get("/store", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to get all the products
export const product = async () => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.get("/productList", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    window.location.href = "/";
  }
  return response;
};
// Api to get all the orders
export const order = async () => {
  let response = { messasge: "fail" };
  try {
    const response = await apiClient.get("/orderList", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to Create Order
export const createOrder = async (data) => {
  let response = { message: "fail" };
  try {
    response = await apiClient.post("/createOrder", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("post request failed:", error);
    window.location.href = "/";
  }
  return response;
};

// Api to Confirm the Shipment
export const confirmShipment = async (data) => {
  let response = { message: "fail" };
  try {
    response = await apiClient.post("/confirmShipment", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("post request failed:", error);
    window.location.href = "/";
  }
  return response;
};
