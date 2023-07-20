const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["customer", "seller", "superadmin"],
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	pincode: {
		type: Number,
		required: true,
	},
	profileImage: {
		type: String,
	},
	forgotPasswordToken: {
		type: String,
	},
	forgotPasswordExpiery: {
		type: Date,
	},
});

module.exports = mongoose.model("User", userSchema);
