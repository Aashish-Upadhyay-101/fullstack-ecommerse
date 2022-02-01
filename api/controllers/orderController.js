const catchAsync = require("../utils/catchAsync");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51KLszlAOCbZpLbN5bGqqXjLoEjoZwc4fpq6YFh99C3Fvd66v2bsFQ2RPCrakV6aieBUCNxgzMCDefYwGXt5q52sS002SpmNkNc"
);
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const grandPrice = req.params.totalPrice;

  console.log(`${req.protocol}://${req.get("host")}/`);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:3000`,
    cancel_url: `${req.protocol}://${req.get("host")}/user/cart`,
    customer_email: req.user.email,
    client_reference_id: grandPrice,
    line_items: [
      {
        name: "Checkout your cart items",
        amount: grandPrice * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
});
