import https from "https";
import { Group, Notify, User as LineUser } from "../types/line";
import { Result } from "../types/result";
import { getEnv } from "../utils/environment";
import { createGroup, findGroupById } from "./group";
import { createUser, findUserById } from "./user";
import { addChatCount } from "./chat";

const LINE_API_ENDPOINT = `https://api.line.me/v2/bot`;
const { lineChannelAccessToken } = getEnv();

const getGroupInfo = async (groupId: string): Promise<Result<Group>> => {
  const result: Result<Group> = { status: true };
  try {
    const endpoint = `${LINE_API_ENDPOINT}/group/${groupId}/summary`;
    const headers = {
      Authorization: `Bearer ${lineChannelAccessToken}`,
    };

    const res = await fetch(endpoint, { headers });
    result.data = await res.json();
  } catch (error) {
    result.status = false;
    result.message = `Get group ${groupId} info error: ${error}`;
  }

  return result;
};

const getUserInfo = async (userId: string): Promise<Result<LineUser>> => {
  const result: Result<LineUser> = { status: true };
  try {
    const endpoint = `${LINE_API_ENDPOINT}/profile/${userId}`;
    const headers = {
      Authorization: `Bearer ${lineChannelAccessToken}`,
    };

    const res = await fetch(endpoint, { headers });
    result.data = await res.json();
  } catch (error) {
    result.status = false;
    result.message = `Get user ${userId} info error: ${error}`;
  }

  return result;
};

export const registerGroup = async (groupId: string) => {
  const group = await findGroupById(groupId);
  if (group) {
    return { status: false, message: "已註冊該群組" };
  }

  const groupResult = await getGroupInfo(groupId);

  if (!groupResult.status || !groupResult.data) {
    console.error("取得群組資訊失敗", groupResult.message);
    return { status: false, message: "取得群組資訊失敗" };
  }

  const { data } = groupResult;
  await createGroup(data);
  return { status: true, message: "註冊成功" };
};

export const replyMessage = (replyToken: string, message: string) => {
  const dataString = JSON.stringify({
    replyToken,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${lineChannelAccessToken}`,
  };

  const webhookOptions = {
    hostname: "api.line.me",
    path: "/v2/bot/message/reply",
    method: "POST",
    headers: headers,
    body: dataString,
  };

  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      // process.stdout.write(d);
    });
  });

  request.on("error", (err) => {
    console.error(`Send message ${message} error: ${err}`);
  });

  request.write(dataString);
  request.end();
};

export const countMessageSource = async (notify: Notify): Promise<Result> => {
  const { type, source } = notify;
  if (type !== "message") {
    return { status: false, message: "Notify is not message type" };
  }

  if (source.type !== "group" || !source.groupId) {
    return {
      status: false,
      message: "Only support count message feature in message from group",
    };
  }

  const group = await findGroupById(source.groupId);
  if (!group || !group.allow) {
    return {
      status: false,
      message: "Please register group with specific command",
    };
  }

  if (!source.userId) {
    return {
      status: false,
      message: "User not found",
    };
  }

  let user = await findUserById(source.userId);
  if (!user) {
    const userInfoResult = await getUserInfo(source.userId);
    if (!userInfoResult.status || !userInfoResult.data) {
      return { status: false, message: userInfoResult.message };
    }
    user = await createUser(userInfoResult.data);
  }

  await addChatCount(group._id.toString(), user._id.toString());
  return { status: true, message: "Ok" };
};
