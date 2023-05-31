import express from "express";
import {
  createProductReview,
  deleteProductReview,
  getProductReviews,
} from "../controllers/reviewController";

const router = express.Router();

router.get("/reviews", getProductReviews);
router.put("/reviews/:id", createProductReview);
router.delete("/reviews/:id", deleteProductReview);

export default router;
