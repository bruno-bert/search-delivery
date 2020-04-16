const Queue = require("bull");

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
};

const jobs = [
  { key: "RegistrationMail" },
  { key: "AccountCreationMail" },
  { key: "PasswordResetMail" },
  { key: "ChangePasswordMail" }
];

const queues = jobs.map(job => ({
  bull: new Queue(job.key, `redis://${redisConfig.host}:${redisConfig.port}`),
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
