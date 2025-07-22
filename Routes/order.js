import express from "express";
import { Middleware } from "../config/middleware.js";
import Orders from "../Schema/order.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", Middleware, async (req, res) => {
  try {
    const { userId, body } = req;
    const order = await Orders.create({ ...body, userId });
    return res.status(200).send({
      status: 200,
      message: "Order place successfully",
      orderId: order?._id,
    });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.get("/", Middleware, async (req, res) => {
  try {
    let { objectUserId } = req;
    const orders = await Orders.aggregate([
      {
        $match: {
          userId: objectUserId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productsDetails.id",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $project: {
          "users.password": 0,
        },
      },
    ]);
    return res.status(200).send({
      status: 200,
      message: "Order place successfully",
      orders,
    });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

router.patch("/:id", Middleware, async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const product = await Orders.findById(id);
    if (product.userId.toString() != userId) {
      return res.status(401).send({
        status: 401,
        message: "You are not authorized for cancel this order",
      });
    }
    if (product.status != "Pending") {
      return res.status(401).send({
        status: 400,
        message: `Order is in ${product.status} state. So, you can't able to cancel`,
      });
    }
    const changeStatus = await Orders.findByIdAndUpdate(id, {
      status: "Cancel",
    });
    return res.status(200).send({
      status: 200,
      message: `Order is in successfully cancel`,
    });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});
export default router;
