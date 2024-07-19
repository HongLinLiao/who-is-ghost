type NotifyType =
  | "message"
  | "follow"
  | "unfollow"
  | "join"
  | "leave"
  | "postback"
  | "beacon";

type NotifySourceType = "user" | "group" | "room";

type MessageType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "file"
  | "location"
  | "sticker";

interface Source {
  type: NotifySourceType;
  userId: string;
  groupId?: string;
  roomId?: string;
}

interface Message {
  id: string;
  type: MessageType;
}

export interface TextMessage extends Message {
  type: "text";
  text: string;
}

export interface Notify {
  type: NotifyType;
  source: Source;
  timestamp: number;
  message: Message;
  replyToken: string;
}

export interface Group {
  groupId: string;
  groupName: string;
  pictureUrl?: string;
}

export interface User {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}
