import Redis from "ioredis";

const host = process.env.REDIS_HOST || "localhost"
const port = parseInt(process.env.REDIS_PORT) || 6379
const user = process.env.REDIS_USER || ""
const password = process.env.REDIS_PASSWORD || ""

const client  = () => {
    if (password) {
        return new Redis({
            host: host, 
            port: port, 
            username: user,
            password: password,
        });
    } else {
        return new Redis({
            host: host, 
            port: port
        });
    }
}
    
export default client();
