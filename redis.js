// redisClient.js
const { createClient } = require("redis");

const client = createClient(); // defaults to localhost:6379

client.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await client.connect();
})();

module.exports = client;
