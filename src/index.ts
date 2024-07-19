import express from "express";
import "dotenv/config";
import morgan from "morgan";

import { getEnv } from "./utils/environment";
import lineMIddleware from "./middlewares/line";
import { initMongoDB } from "./utils/mongodb";

const app = express();
const { port } = getEnv();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));

initMongoDB();

app.get("/", (req, res) => {
  res.send(`OK`);
});

app.use("/line", lineMIddleware);

app.listen(port, () => {
  console.log(`🚀 Server is running in http://localhost:${port}`);
});
