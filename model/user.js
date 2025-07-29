import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  phoneNo: {
    type: Schema.Types.Number,
  },
  otp: {
    type: Schema.Types.Number,
  },
  role: {
    type: Schema.Types.String,
    required: true,
    default: "User"
  },
});

const User = mongoose.model("users", userSchema);

export default User;
