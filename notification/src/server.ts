import cors from "@fastify/cors";
import "dotenv/config";
import { fastify } from "fastify";
import { connect } from "./repository/mongoose";
import { startConsumer } from "./kafka/consumer";
import { notificationSocket } from "./websocket/notificationSocket";
import websocket from "@fastify/websocket";
import { AppError } from "./errors/AppError";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

if (!process.env.FRONTEND_URL || !process.env.PORT2 || !process.env.JWT_SECRET || !process.env.COOKIE_SECRET) {
  throw new AppError("Variaveis de ambiente não definida");
}

app.register(websocket);
app.register(notificationSocket);

app.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

const start = async () => {
  try {
    await connect();

    await app.listen({
      port: Number(process.env.PORT2),
      host: "0.0.0.0",
    });

    await startConsumer();
    console.log(`Server running on port ${process.env.PORT2}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
