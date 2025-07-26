import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  category: {
    type: Schema.Types.String,
  },
  price: {
    type: Schema.Types.Number
  }
});

const Products = mongoose.model('Products', productSchema)

export default Products;