import express from "express";
import {
  deleteUser,
  getUserDetails,
  getUsers,
} from "../controllers/userController";


const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserDetails);
router.get("/user/:id", deleteUser);

export default router;
