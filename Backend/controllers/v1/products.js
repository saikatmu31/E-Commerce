const Product = require("../../models/Product");

// Register a Product
exports.registerProduct = async (req, res) => {
	try {
		const { name, price, description, photos, category, stock, user } =
			req.body;

		if (!name || !price || !description || !category || !stock) {
			return res
				.status(400)
				.json({ success: false, error: "Please provide all required fields" });
		}

		const newProduct = await Product.create({
			name,
			price,
			description,
			photos,
			category,
			stock,
			user,
		});

		res.status(201).json({ success: true, data: newProduct });
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

// Get Product Details
exports.getProductDetails = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res
				.status(404)
				.json({ success: false, error: "Product not found" });
		}
		res.status(200).json({ success: true, data: product });
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

// Get All Product Details
exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({ success: true, data: products });
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

// Delete Product
exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res
				.status(404)
				.json({ success: false, error: "Product not found" });
		}
		res.status(200).json({
			success: true,
			data: {},
			message: `Product Deleted Successfully`,
		});
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};

exports.addReviews = async (req, res) => {
	try {
		const { productId, user, rating, comment } = req.body;

		// Additional validation (you can customize these as per your requirements)
		if (!productId || !user || !rating || !comment) {
			return res
				.status(400)
				.json({ success: false, error: "Please provide all required fields" });
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res
				.status(404)
				.json({ success: false, error: "Product not found" });
		}

		const review = {
			user,
			rating,
			comment,
		};

		product.reviews.push(review);

		const totalRatings = product.ratings * product.numberOfReviews + rating;
		product.numberOfReviews += 1;
		product.ratings = totalRatings / product.numberOfReviews;

		await product.save();

		res.status(201).json({ success: true, data: product });
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ success: false, error: error.message });
	}
};
