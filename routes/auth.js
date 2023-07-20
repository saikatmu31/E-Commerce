const express = require("express");
const router = express.Router();
const { signup, login, sendotp } = require("../controllers/v1/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendotp);

module.exports = router;
