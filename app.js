require("dotenv").config();
const axios = require("axios");
require("./auth.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "amazonwebapp/build");
console.log(buildpath);
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const session = require("express-session");

const express = require("express");
const { connectDB } = require("./config/database.js");
const { myStoreDetails } = require("./mystore.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const { updateStoreStatus, createStores } = require("./store.js");
const { createOrder } = require("./order.js");
const {
  Business,
  Store,
  Product,
  Order,
  InventryLock,
} = require("./config/models.js");

app.use(express.static(buildpath));

// Middleware to handle sessions
app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS for all routes and allow requests from localhost:3001
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true, // If you need to include cookies or authorization headers
  })
);
app.use(cookieParser());

// Middleware to parse JSON requests
app.use(express.json());

// Start connecting the database
connectDB()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error while connecting to the data base");
  });

// To test the end-point
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip);
  res.send("Our Server is live");
});
// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
}

const storeDetailsHandler = (store) => {
  if (store == "myStore") {
    return myStoreDetails();
  }
  return { CLIENT_ID: "", CLIENT_SECRET: "" };
};
app.post("/connectStore", (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = storeDetailsHandler(
      req.body.store
    );
    const { businessNum } = jwt.verify(token, process.env.JWT_SECRET);
    // Dynamically configure Passport strategy for this user
    passport.use(
      "dynamic-oauth",
      new OAuth2Strategy(
        {
          authorizationURL: req.body.url, //state can be to made complex to handle CSRF Attacks
          tokenURL: process.env.TOKEN_URL,
          clientID: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          callbackURL: REDIRECT_URI,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log(accessToken);
            await updateStoreStatus(businessNum, req.body.store, accessToken);
            done(null, { accessToken, profile });
          } catch (error) {
            done(error);
          }
        }
      )
    );

    // Redirect the user to start the OAuth flow
    const authUrl = `${req.body.url}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=state`;
    res.send(authUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server occured");
  }
});

// OAuth Authorization route
app.get("/auth/redirect", (req, res, next) => {
  // Trigger OAuth authentication
  passport.authenticate("dynamic-oauth")(req, res, next);
});

// Callback route after mock provider authenticates the user
app.get(
  "/auth/callback",
  passport.authenticate("dynamic-oauth", { failureRedirect: "/login" }),
  (req, res) => res.send("Store Connected")
);

app.post("/createOrder", authenticateToken, createOrder);

// Signup Route
app.post("/signup", async (req, res) => {
  const { businessNum, businessName } = req.body;
  try {
    const existingUser = await Business.findOne({ businessNum });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new Business({ businessNum: businessNum, name: businessName });
    await user.save();

    await createStores(businessNum);

    res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { businessNum } = req.body;

  try {
    const user = await Business.findOne({ businessNum });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { businessNum: businessNum },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set the token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side scripts from accessing the cookie
      secure: false, // Set to true in production (requires HTTPS)
      sameSite: "Lax",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//fetch the store
app.get("/store", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let storeList = await Store.find(
      { businessNum: decoded.businessNum },
      { token: 0 }
    );
    res.status(200).json({ data: storeList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/productList", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let productList = await Product.find({ businessNum: decoded.businessNum });
    res.status(200).json({ data: productList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/orderList", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let orderList = await Order.find({ businessNum: decoded.businessNum });
    res.status(200).json({ data: orderList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/confirmShipment", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let { businessNum } = decoded;
    let orderList = await Order.findOneAndUpdate(
      { businessNum: businessNum, orderId: req.body.orderId },
      { status: "shipped" },
      { new: true }
    );
    // deleting from the inventoryLock collection so that we can retrieve the locked stocks
    let clearInventory = await InventryLock.deleteMany({
      orderId: req.body.orderId,
    });
    // updating the product collection
    console.log(orderList);
    for (let product of orderList.products) {
      let productUpdate = await Product.findOneAndUpdate(
        {
          sku: product.sku,
          businessNum: businessNum,
          quantity: { $gte: product.quantity },
        }, // Filter: ensure stock is sufficient
        { $inc: { quantity: -product.quantity } }, // Update: decrease stock
        { new: true } // Options: return the updated document
      );
    }

    // calling the connected stores to update their inventory using token
    let connectedStores = await Store.find({
      businessNum: businessNum,
      status: "connected",
    });
    // updateInventory -- function to update the inventory using tokens

    res.status(200).json({ data: orderList });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Catch-all route (Serve React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "amazonwebapp/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
