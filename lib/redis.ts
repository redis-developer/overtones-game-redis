import Redis from "ioredis";
import Rejson from "iorejson";

const host = process.env.REDIS_HOST || "localhost";
const port = parseInt(process.env.REDIS_PORT) || 6379;
const user = process.env.REDIS_USER || "";
const password = process.env.REDIS_PASSWORD || "";

const connectionDetails = password
  ? {
      host: host,
      port: port,
      username: user,
      password: password,
    }
  : {
      host: host,
      port: port,
    };

const client = () => {
  return new Redis(connectionDetails);
};

const rejsonClient = new Rejson(connectionDetails);
rejsonClient.connect();

export const redis = client();
export const redisjson = rejsonClient;
