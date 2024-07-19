import mongoose, { Schema } from "mongoose";

export interface User {
  _id: typeof Schema.ObjectId;
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
  },
  statusMessage: {
    type: String,
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
