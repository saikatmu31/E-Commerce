// Module Imports
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Connect to DB
require("./config/database").connect();

// Initializeing Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
