import "dotenv/config";
import express from "express";
import BullBoard from "bull-board";
import Queue from "./lib/Queue";

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());

app.use("/", BullBoard.UI);

const port = process.env.HTTP_PORT || 3335;
app.listen(port, () => {
  console.log("BullBoard UI running on port " + String(port));
});
