import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryDetails,
  updateCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.get("categories", getCategories);
router.post("categories", addCategory);

router.get("/categories/:id", getCategoryDetails);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
