const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Import Router
const authRoute = require("./routes/auth");

dotenv.config();

// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db"));

// Middleware

app.use(express.json());

// Router Middleawre
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server up and RUnning"));
