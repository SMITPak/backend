import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "chats",
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("messages", messageSchema);
export default Message;
