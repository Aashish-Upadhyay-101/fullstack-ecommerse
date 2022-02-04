const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");
const { route } = require("./productRoute");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgetpassword", userController.forgetPassword);
// router.patch("/resetpassword/:token", userController.resetPassword);

// router.post("/getuserfromcookie", userController.getCurrentUserById); // get user from cookie

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

// remove from cart
router.post("/removefromcart", cartController.deleteCartItem);

module.exports = router;
