import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController";

const router = express.Router();

router.get("/orders", newOrder);
router.get("/orders", myOrders);
router.put("/authorized/orders/:id", updateOrder);
router.get("/orders/:id", getSingleOrder);
router.get("/authorized/orders", getAllOrders);
router.delete("/authorized/orders/:id", deleteOrder);

export default router;
