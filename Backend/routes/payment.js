const router = require("express").Router();

const { payment, verifyPayment } = require("../controllers/v1/payments");

router.post("/payment", payment);
router.post("/verifyPayment", verifyPayment);

module.exports = router;
