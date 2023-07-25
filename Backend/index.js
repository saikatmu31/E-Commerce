// Module Imports
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const auth = require("./routes/auth");
const products = require("./routes/products");
const Category = require("./routes/category");
const PORT = process.env.PORT || 8080;

// Connect to DB
require("./config/database").connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", auth);
app.use("/api/v1/products", products);
app.use("/api/v1/category", Category);

// Initializeing Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.send("Hello");
});
