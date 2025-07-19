import express from "express";
import { Middleware } from "../config/middleware.js";
import Orders from "../Schema/order.js";

const router = express.Router();

router.post("/", Middleware, async (req, res) => {
  try {
    const { userId, body } = req;
    const order = await Orders.create({ ...body, userId });
    // await order.save();
    return res
      .status(200)
      .send({ status: 200, message: "Order place successfully", orderId: order?._id });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

export default router;
