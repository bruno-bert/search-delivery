const Queue = require("bull");

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
};

const jobs = [{ key: "RegistrationMail" }, { key: "AccountCreationMail" }];

const queues = jobs.map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  options: job.options
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
    return queue.bull.add(data, queue.options);
  }
};
