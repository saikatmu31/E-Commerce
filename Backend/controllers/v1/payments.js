const mongoose = require("mongoose");
const Cart = require("../../models/Cart"); // Replace with the actual path to your Cart model
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// Initialize Razorpay with your Razorpay API key and secret
const instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.KEY_SECRET,
});

exports.payment = async (req, res) => {
	const { cartId } = req.body;
	console.log(cartId);
	if (!cartId) {
		return res.json({ success: false, message: "Please Provide Cart ID" });
	}

	try {
		// Fetch the cart from the database based on the cartId
		const cart = await Cart.findById(cartId).populate("items.productId");

		if (!cart) {
			return res.json({ success: false, message: "Cart not found." });
		}

		// Calculate the total amount based on the items in the cart
		let total_amount = 0;
		cart.items.forEach((item) => {
			total_amount += item.quantity * item.productId.price; // Assuming each product has a "price" field
		});

		// Create options for the payment
		const options = {
			amount: total_amount * 100, // Amount should be in paise, so multiply by 100
			currency: "INR",
			receipt: uuidv4(), // Generate a unique receipt ID
		};

		// Initiate the payment using Razorpay
		const paymentResponse = await instance.orders.create(options);
		console.log(paymentResponse);
		cart.items = [];
		await cart.save();
		res.json({
			success: true,
			data: paymentResponse,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Could not initiate order." });
	}
};

exports.verifyPayment = async (req, res) => {
	const razorpay_order_id = req.body?.razorpay_order_id;
	const razorpay_payment_id = req.body?.razorpay_payment_id;
	const razorpay_signature = req.body?.razorpay_signature;

	console.log("Body", req.body);

	if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
		return res.status(200).json({ success: false, message: "Payment Failed" });
	}

	let body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_SECRET)
		.update(body.toString())
		.digest("hex");

	if (expectedSignature === razorpay_signature) {
		// Process the payment

		return res.status(200).json({ success: true, message: "Payment Verified" });
	}

	return res.status(200).json({ success: false, message: "Payment Failed" });
};
