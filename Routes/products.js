import express from "express";
import { products } from "../constant/data.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res.status(200).send({ status: 200, products });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

export default router