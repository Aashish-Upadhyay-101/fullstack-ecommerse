const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// below this all need to begin login to the action
router.use(authController.protected);

router.patch("/updatePassword", authController.updatePassword);

router
  .route("/")
  .get(authController.restrictUser("super-user"), userController.getAllUsers)
  .post(authController.restrictUser("super-user"), userController.createUser);

router
  .route("/:id")
  .delete(authController.restrictUser("super-user"), userController.deleteUser);

// to display your profile
router.get("/myprofile", userController.getMe);

// add to cart
router.get("/cart", cartController.getUserCart);
router.get(
  "/allcart",
  authController.restrictUser("super-user"),
  cartController.getAllCart
);

module.exports = router;
