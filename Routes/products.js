import express from "express";
import Products from "../Schema/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, ...filters } = req.query;
    const totalRecord = await Products.countDocuments(filters);
    const skipData = (page - 1) * parseInt(limit);
    const products = await Products.find(filters).skip(skipData).limit(parseInt(limit));

    return res.status(200).send({
      status: 200,
      products,
      pagination: {
        totalRecord,
        totalPage: Math.ceil(totalRecord / parseInt(limit)),
        limit: parseInt(limit),
        page: parseInt(page),
      },
    });
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
