const express = require("express");
const cookieParser = require("cookie-parser")



const App = express();

App.use(express.json());
App.use(cookieParser());

// Require all the routes here
const authRouter = require("./routes/Auth.routes");

// Use all the routes here
App.use("/api/auth",authRouter);

module.exports = App;