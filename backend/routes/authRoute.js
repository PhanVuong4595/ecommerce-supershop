import express from "express";
import {
  loginUser,
  logout,
  refreshToken,
  registerUser,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/authController";
import fileUpload from "express-fileupload";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "../middleware/filesPayloadExists";

const router = express.Router();

router.post("/login", loginUser);
router.post(
  "/register",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  registerUser
);
router.post("/logout", logout);

router.put("/password/update", updatePassword);
router.put(
  "/me/update",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  updateProfile
);
router.delete("/users/:id", updateUserRole);
router.get("/refresh", refreshToken);

export default router;
