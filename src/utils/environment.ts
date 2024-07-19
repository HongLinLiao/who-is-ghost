import { Env, Environment } from "../types/environment";

export const getEnv = (): Environment => {
  return {
    environment: (process.env.ENV as Env) ?? "LOCAL",
    port: process.env.PORT ?? "3000",
    lineChannelId: process.env.LINE_CHANNEL_ID ?? "",
    lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "",
    lineChannelSecret: process.env.LINE_CHANNEL_SECRET ?? "",
    mongoDBConnection: process.env.MONGODB_CONNECTION ?? "",
  };
};
