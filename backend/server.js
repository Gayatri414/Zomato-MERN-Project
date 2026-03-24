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
/*
When a client sends a request, it first hits the route layer, 
which defines the API endpoints. The request then passes through 
middleware such as authentication to verify the user and multer
 for file handling. After that, the controller processes the request,
  applies business logic, and interacts with the database using models. 
  Finally, the server sends a JSON response back to the client. 
  This layered architecture ensures scalability, security, and maintainability.
*/