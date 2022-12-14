const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
// are function that executed before route is executed
// app.use("/posts", (req, res, next) => {
//   console.log("Middleware is running");
//   next(); //next is used to executed next code. in this case it will exectue app.get("posts")....
// });
app.use(cors());

// YOU HAVE THE ABILITY TO CREATE ROUTE IN SIMPLE WAY

// Import Routes
const postsRoute = require("./routes/posts");

// ROUTES
app.use("/posts", postsRoute);
// app.use("user", userRoute);

app.get("/", (req, res) => {
  res.send("We Are on Home");
});

// Connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

// HOW WE START LISTENING THE SERVER?
app.listen(3000);
