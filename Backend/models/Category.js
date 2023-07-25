const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
		unique: true,
		maxLength: 32,
	},
});

module.exports = mongoose.model("Category", categorySchema);
