import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chatSchema);
export default Chat;
