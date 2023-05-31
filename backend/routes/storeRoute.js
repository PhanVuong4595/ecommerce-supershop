import express from "express";

import {
  addStore,
  deleteStore,
  getStoreDetails,
  getStores,
  updateStore,
} from "../controllers/storeController";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "../middleware/filesPayloadExists";
import fileUpload from "express-fileupload";

const router = express.Router();

router.get("/stores", getStores);
router.post(
  "/stores",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  addStore
);
router.get("/stores/:id", getStoreDetails);
router.put(
  "/stores/:id",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  updateStore
);
router.get("/stores/:id", deleteStore);

export default router;
