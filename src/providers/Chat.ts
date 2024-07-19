import mongoose, { Schema } from "mongoose";

export interface Chat {
  _id: typeof Schema.ObjectId;
  groupId: typeof Schema.ObjectId;
  userId: typeof Schema.ObjectId;
  count: number;
  updateTime: Date;
  createTime: Date;
}

const chatSchema = new mongoose.Schema<Chat>({
  groupId: {
    type: Schema.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
  },
  count: {
    type: Number,
    require: true,
  },
  updateTime: {
    type: Date,
    require: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

const ChatModel = mongoose.model("chats", chatSchema);

export default ChatModel;
