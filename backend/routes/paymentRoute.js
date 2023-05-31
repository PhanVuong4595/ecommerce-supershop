import express from "express";
import {
  processPayment,
  sendStripePublishableKey,
} from "../controllers/paymentController";

const router = express.Router();

router.get("/publishable-key", sendStripePublishableKey);
router.post("/create-payment-intent", processPayment);

export default router;
