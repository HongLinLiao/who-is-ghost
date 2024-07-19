import ChatModel, { Chat } from "../providers/Chat";

export const addChatCount = async (
  groupObjectId: string,
  userObjectId: string
): Promise<Chat | null> => {
  const filter = {
    groupId: groupObjectId,
    userId: userObjectId,
  };
  const update = { $inc: { count: 1 }, updateTime: Date.now() };
  const options = { new: true, upsert: true };

  return (
    (
      await ChatModel.findOneAndUpdate(filter, update, options).exec()
    )?.toObject<Chat>() ?? null
  );
};
