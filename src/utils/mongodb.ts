import mongoose from "mongoose";
import { getEnv } from "./environment";

export const initMongoDB = async () => {
  const { mongoDBConnection } = getEnv();

  mongoose.connect(mongoDBConnection, { dbName: "main" });
  const db = mongoose.connection;

  db.on("err", (err) => console.error(`❌ Connect MongoDB failed`, err));

  db.once("open", () => console.log("🚀 Connect MongoDB Success"));
};
