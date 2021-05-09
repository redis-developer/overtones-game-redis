import Redis from "ioredis";

const host = process.env.REDIS_HOST
const port = parseInt(process.env.REDIS_PORT)

const client = new Redis({host: host, port: port});

export default client;
