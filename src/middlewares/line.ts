import { Router } from "express";
import { Notify, TextMessage } from "../types/line";
import { countMessageSource, registerGroup, replyMessage } from "../libs/line";

const route = Router();

route.get("/healthy", (req, res) => {
  res.send("OK");
});

route.post("/webhook", async function (req, res) {
  if (req.body?.events?.[0]) {
    const notify = req.body.events[0] as Notify;
    const { type, source, message, replyToken } = notify;

    if (type !== "message") {
      console.warn("Ignore because is not message notify");
      return res.status(200).send("Ignore because is not message notify");
    }

    if (source.type === "group" && message.type === "text") {
      const textMsg = message as TextMessage;
      if (textMsg.text === "NGO:註冊群組" && source.groupId) {
        const registerResult = await registerGroup(source.groupId);
        replyMessage(replyToken, registerResult.message);
        return res
          .status(registerResult.status ? 200 : 400)
          .send(registerResult.message);
      }
    }

    const result = await countMessageSource(notify);

    if (!result.status && result.message) {
      console.error(result.message);
    }
    return res.status(result.status ? 200 : 400).send(result.message);
  }

  console.error("Invalid payload");
  return res.status(400).send("Invalid payload");
});

export default route;
