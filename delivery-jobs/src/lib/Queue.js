import Queue from "bull";
import redisConfig from "../config/redis";

import * as jobs from "../jobs";

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options
}));

export default {
  queues,
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);
      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log(err);
      });
    });
  }
};
