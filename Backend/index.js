// Module Imports
const cookieParser = require("cookie-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
const auth = require("./routes/auth");
const products = require("./routes/products");
const Category = require("./routes/category");
const Cart = require("./routes/cart");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
// Connect to DB
require("./config/database").connect();
const { cloudinaryConnect } = require("./config/cloudinary");
// Middlewares
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", auth);
app.use("/api/v1/products", products);
app.use("/api/v1/category", Category);
app.use("/api/v1/cart", Cart);
cloudinaryConnect();
// Initializeing Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
	return res.send("Hello");
});
