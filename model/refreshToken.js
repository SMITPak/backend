import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  refreshToken: {
    type: Schema.Types.String,
    required: true,
  },
  expiry: {
    type: Schema.Types.Date,
    required: true,
  },
});

const Token = mongoose.model('tokens', tokenSchema)

export default Token;