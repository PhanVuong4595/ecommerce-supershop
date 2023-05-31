import express from "express";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "../middleware/filesPayloadExists";
import fileUpload from "express-fileupload";
import {
  addProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/products", getProducts);
router.post(
  "/products",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  addProduct
);
router.get("/products/:id", getProductDetails);
router.put(
  "/products/:id",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  updateProduct
);
router.get("/products/:id", deleteProduct);

export default router;
