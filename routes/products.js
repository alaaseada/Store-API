const express = require("express");
const router = express.Router();
const controllers = require("../controllers/products");


router.route("/").get(controllers.getAllProducts);
router.route("/static").get(controllers.getAllProductStatic);

module.exports = router;