export type Env = "LOCAL" | "PROD";

export interface Environment {
  environment: Env;
  port: string;
  lineChannelId: string;
  lineChannelAccessToken: string;
  lineChannelSecret: string;
  mongoDBConnection: string;
}
