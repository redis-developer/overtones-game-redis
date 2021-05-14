import Redis from "ioredis";
import Rejson from "iorejson";

const host = process.env.REDIS_HOST || "localhost"
const port = parseInt(process.env.REDIS_PORT) || 6379
const user = process.env.REDIS_USER || ""
const password = process.env.REDIS_PASSWORD || ""

const redisOpts = {
    host: host, 
    port: port, 
    username: user,
    password: password,
}

const client  = () => {
    if (password) {
        return new Redis(redisOpts);
    } else {
        return new Redis({
            host: host, 
            port: port
        });
    }
}

const rejsonClient = new Rejson(redisOpts);
rejsonClient.connect()

export const redis = client();
export const redisjson = rejsonClient;
