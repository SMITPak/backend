import express from "express";
import { forgetPassword, login, sendOtp, signup } from "../controller/user.js";
import { cloudinaryUpload } from "../controller/uploadCloudinary.js";
import { deleteImage, uploadServer } from "../controller/uploadServer.js";

const router = express.Router();

router.post("/upload", uploadServer);
router.delete("/delete-image", deleteImage);
router.post("/", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/forgetPassword", forgetPassword);
router.post("/cloudinaryUpload", cloudinaryUpload);

export default router;
