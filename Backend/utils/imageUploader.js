const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
	try {
		const options = { folder };
		if (height) {
			options.height = height;
		}
		if (quality) {
			options.quality = quality;
		}
		options.resource_type = "auto";
		console.log("OPTIONS", options);
		return await cloudinary.uploader.upload(file.tempFilePath, options);
	} catch (error) {
		console.log("ERROR IN UPLOAD", error);
		return { error: error.message };
	}
};
