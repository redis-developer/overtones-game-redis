import redis from "redis";

const client = redis.createClient({
  host: "redis-11797.c247.eu-west-1-1.ec2.cloud.redislabs.com:11797",
  password: "ek9kTC8GU9vMp7gut1GfqL1z1XPPuGkd",
});

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", () => {
  console.log("connected to redis");
});

console.log("hello");

export default client;
