const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Controller to Add a Product to the Cart
exports.addToCart = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		// Find the product to check if it exists and has enough stock
		const product = await Product.findById(productId);


		if (!product) {
			return res
				.status(404)
				.json({ success: false, error: "Product not found" });
		}

		if (product.stock < quantity) {
			return res.status(400).json({
				success: false,
				error: "Insufficient stock for the requested quantity",
			});
		}

		// Find the cart for the given user
		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({ userId, items: [] });
		}

		const existingProductIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId
		);

		if (existingProductIndex !== -1) {
			// Check if adding the quantity exceeds the available stock
			if (
				cart.items[existingProductIndex].quantity + quantity >
				product.stock
			) {
				return res.status(400).json({
					success: false,
					error: "Adding this quantity exceeds the available stock",
				});
			}

			cart.items[existingProductIndex].quantity += quantity;
		} else {
			cart.items.push({ productId, quantity });
		}

		// Update the product inventory
		product.stock -= quantity;
		await product.save();

		// Save the updated cart
		await cart.save();

		res.status(200).json({
			success: true,
			message: "Product added to cart successfully",
			cart,
		});
	} catch (err) {
		res.status(500).json({ success: false, error: "Internal server error" });
	}
};

// Controller to Remove a Product from the Cart
exports.removeFromCart = async (req, res) => {
	try {
		const { userId, productId } = req.body;

		const cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		cart.items = cart.items.filter(
			(item) => item.productId.toString() !== productId
		);

		await cart.save();

		res.status(200).json({
			success: true,
			message: "Product removed from cart successfully",
			cart,
		});
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
};

// Controller to Update the Quantity of a Product in the Cart
exports.updateQuantity = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		const cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		const existingProduct = cart.items.find(
			(item) => item.productId.toString() === productId
		);

		if (!existingProduct) {
			return res.status(404).json({ error: "Product not found in cart" });
		}

		existingProduct.quantity = quantity;

		await cart.save();

		res
			.status(200)
			.json({ message: "Cart quantity updated successfully", cart });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getCartDetails = async (req, res) => {
	try {
		const { userId } = req.params;

		// Find the cart for the given user
		const cart = await Cart.findOne({ userId }).populate({
			path: "items.productId",
			select: "name price",
		});

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		res.status(200).json({ cart });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
};
