const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
		},
	], // Array of cart items
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Create the Cart model
module.exports = mongoose.model("Cart", cartSchema);
