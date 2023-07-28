const router = require("express").Router();
const {
	addToCart,
	removeFromCart,
	updateQuantity,
	getCartDetails
} = require("../controllers/v1/cart");

router.post("/addtocart", addToCart);
router.delete("/removetocart", removeFromCart);
router.put("/updateQuantity", updateQuantity);
router.get("/cart", getCartDetails);
module.exports = router;
