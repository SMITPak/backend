import express from "express";
import { getOrder, postOrder, updateOrder } from "../controller/order.js";

const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrder);
router.patch("/:id", updateOrder);

export default router;
