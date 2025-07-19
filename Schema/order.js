import mongoose from "mongoose";
const { Schema } = mongoose;

const productDetailsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  count: {
    type: Schema.Types.Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    totalPrice: {
      type: Schema.Types.Number,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      default: "Pending",
    },
    productsDetails: [productDetailsSchema],
  },
  { timestamps: true }
);

const Orders = mongoose.model("orders", orderSchema);

export default Orders;
