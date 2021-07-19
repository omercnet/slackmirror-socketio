import { Server } from "socket.io";
import { RedisClient } from "redis";

const PORT = parseInt(process.env.PORT) || 3000;
const REDIS_URL = process.env.REDIS_URL;
const io = new Server(PORT);

const redis = new RedisClient({ url: REDIS_URL });

io.on("connect", (socket) => {
    socket.on("ping", (cb) => {
        console.debug("pong");
        cb();
    });
});


redis.on("pmessage", (pattern, channel, message) => {
    console.log(channel, message);
    io.emit(message);
})

redis.psubscribe("slack.*");

