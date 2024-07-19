import mongoose, { Schema } from "mongoose";

export interface Group {
  _id: typeof Schema.ObjectId;
  groupId: string;
  groupName: string;
  createdDate: Date;
  allow: boolean;
}

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  allow: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const GroupModel = mongoose.model("groups", groupSchema);

export default GroupModel;
