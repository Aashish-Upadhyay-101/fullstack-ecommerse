const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(
    authController.protected,
    authController.restrictUser("seller", "super-user"),
    productController.createProduct
  );

router.route("/:category").get(productController.getProductByCategory);

router
  .route("/one/:id")
  .get(productController.getSingleProduct)
  .patch(
    authController.protected,
    authController.restrictUser("seller", "super-user"),
    productController.updateProduct
  )
  .delete(
    authController.protected,
    authController.restrictUser("seller", "super-user"),
    productController.deleteProduct
  );

// add to cart
router.post(
  "/one/:id/addtocart",
  authController.protected,
  cartController.addCartItem
);

module.exports = router;
