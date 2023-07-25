// Importing the Category model
const Category = require("../../models/Category");

// Controller to Add a New Category by Admin Only
exports.addCategory = async (req, res) => {
	try {
		// Extracting the "name" field from the request body
		const { name } = req.body;

		// Checking if the "name" field is provided
		if (!name) {
			return res.status(400).json({
				success: false,
				message: "Name is required",
			});
		}

		// Creating a new category with the provided name
		const newCategory = await Category.create({ name });

		// Sending a successful response with the newly created category
		res.status(201).json({
			success: true,
			data: newCategory,
			message: "Category created successfully",
		});
	} catch (error) {
		// Handling any errors that might occur during category creation
		res.status(500).json({
			success: false,
			message: "Error creating the category",
			error: error.message,
		});
	}
};

// Controller to handle category updatation
exports.renameCategory = async (req, res) => {
	try {
		// Extracting the "categoryId" and "newName" fields from the request body
		const { categoryId, newName } = req.body;

		// Updating the category with the provided categoryId to have the new name
		const updatedCategory = await Category.findByIdAndUpdate(
			categoryId,
			{ name: newName },
			{ new: true }
		);

		// Checking if the category was found and updated successfully
		if (!updatedCategory) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}

		// Sending a successful response with the updated category
		res.status(200).json({
			success: true,
			data: updatedCategory,
			message: "Category updated successfully",
		});
	} catch (error) {
		// Handling any errors that might occur during category update
		res.status(500).json({
			success: false,
			message: "Error updating the category",
			error: error.message,
		});
	}
};
