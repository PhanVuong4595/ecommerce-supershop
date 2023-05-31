import asyncHandler from "express-async-handler";
import Stripe from "stripe";

export const processPayment = asyncHandler(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    automatic_payment_methods: { enabled: true },
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

export const sendStripePublishableKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
