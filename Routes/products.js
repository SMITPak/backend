import express from "express";
import { findProduct, getProduct } from "../controller/product.js";

const router = express.Router();

router.get("/", getProduct);
router.get("/:find", findProduct);

export default router;
