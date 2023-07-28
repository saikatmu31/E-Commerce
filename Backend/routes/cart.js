const router = require("express").Router();
const {
	addToCart,
	removeFromCart,
	updateQuantity,
	getCartDetails
} = require("../controllers/v1/cart");

router.post("/addtocart", addToCart);
router.post("/removefromcart", removeFromCart);
router.post("/updateQuantity", updateQuantity);
router.post("/cart", getCartDetails);
module.exports = router;
