require("dotenv").config();
require("./auth.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "amazonwebapp/build");
const passport = require("passport");
const session = require("express-session");

const express = require("express");
const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const { createStores } = require("./store/store.js");
const { Business } = require("./config/models.js");
const { createProducts } = require("./product/product.js");

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
    origin: process.env.DOMAIN_URL,
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

const orderRouter = require("./order/route");
const productRouter = require("./product/route");
const storeRouter = require("./store/route");
const shipmentRouter = require("./shipment/route");

app.use("", productRouter);
app.use("", storeRouter);
app.use("", orderRouter);
app.use("", shipmentRouter);
// To test the end-point
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip);
  res.send("Our Server is live");
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
    await createProducts(businessNum);

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

// Catch-all route (Serve React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "amazonwebapp/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
