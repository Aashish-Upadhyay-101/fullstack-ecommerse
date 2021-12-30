const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/:category").get(productController.getProductByCategory);

router
  .route("/one/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
