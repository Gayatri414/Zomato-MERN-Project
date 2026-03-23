const express = require("express");
require("dotenv").config();

const app = express();

//  middleware
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//  DB connection
const connectDB = require("./src/db/db.js");
connectDB();

// routes import
const authRoutes = require("./src/routes/auth.routes");

//  routes use
app.use("/api/auth/user", authRoutes);

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});