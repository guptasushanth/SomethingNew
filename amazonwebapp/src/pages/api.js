import axios from "axios";

// Base configuration for your API
const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});

// Api to connect Store
export const connectStore = async (data) => {
  try {
    const response = await apiClient.post("/connectStore", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Api to login
export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Api to signup
export const signup = async (data) => {
  try {
    const response = await apiClient.post("/signup", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Api to get all the stores
export const store = async () => {
  try {
    const response = await apiClient.get("/store", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// Api to get all the products
export const product = async () => {
  try {
    const response = await apiClient.get("/productList", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};
// Api to get all the orders
export const order = async () => {
  try {
    const response = await apiClient.get("/orderList", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};
