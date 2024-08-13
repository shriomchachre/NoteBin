import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,deleteImage
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/register", registerUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/deleteImageurl").post(deleteImage);

export default router;
