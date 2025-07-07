import express from "express";
import Products from "../Schema/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const products = await Products.find(filters);
    return res.status(200).send({ status: 200, products });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.get("/:find", async (req, res) => {
  try {
    const { find } = req.params;
    const products = await Products.distinct(find);
    return res.status(200).send({ status: 200, products });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

export default router;
