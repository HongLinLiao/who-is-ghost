import GroupModel, { Group } from "../providers/Group";
import { Group as LineGroup } from "../types/line";

export const findGroupById = async (groupId: string): Promise<Group | null> => {
  return (
    (await GroupModel.findOne({ groupId }).exec())?.toObject<Group>() ?? null
  );
};

export const createGroup = async ({
  groupId,
  groupName,
}: LineGroup): Promise<Group> => {
  return (await GroupModel.create({ groupId, groupName })).toObject<Group>();
};
