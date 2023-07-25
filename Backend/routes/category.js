const router = require("express").Router();
const { addCategory, renameCategory } = require("../controllers/v1/category");
router.post("/createCategory", addCategory);
router.patch("/renameCategory", renameCategory);
module.exports = router;
