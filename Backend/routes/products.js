const router = require("express").Router();
//Importing the Controllers
const {
	registerProduct,
	getProductDetails,
	getAllProducts,
	deleteProduct,
	addReviews,
} = require("../controllers/v1/products");

router.post("/addProduct", registerProduct);
router.get("/productDetails/:id", getProductDetails);
router.get("/getAllProducts", getAllProducts);
router.put("/addReviews", addReviews);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
