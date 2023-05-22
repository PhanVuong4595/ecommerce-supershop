import express from "express";
import {
  addBrand,
  deleteBrand,
  getBrand,
  getBrandDetails,
  updateBrand,
} from "../controllers/brandController";

const router = express.Router();

router.get("/brand", getBrand);
router.post("/brand", addBrand);

router.get("/brand/:id", getBrandDetails);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);

export default router;
