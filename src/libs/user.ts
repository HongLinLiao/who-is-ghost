import UserModel, { User } from "../providers/User";
import { User as LineUser } from "../types/line";

export const findUserById = async (userId: string): Promise<User | null> => {
  return (await UserModel.findOne({ userId }).exec())?.toObject<User>() ?? null;
};

export const createUser = async (user: LineUser): Promise<User> => {
  return (await UserModel.create(user)).toObject<User>();
};
