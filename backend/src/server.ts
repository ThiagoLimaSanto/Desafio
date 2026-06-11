import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import { fastify } from "fastify";
import { connectProducer } from "./kafka/producer";
import { connect } from "./repository/mongoose";
import { BookRouter } from "./routes/BookRouter";
import { UserRouter } from "./routes/UserRouter";
import { AppError } from "./errors/AppError";

export const app = fastify();

if (
  !process.env.FRONTEND_URL ||
  !process.env.PORT1 ||
  !process.env.JWT_SECRET ||
  !process.env.COOKIE_SECRET
) {
  throw new AppError("Variaveis de ambiente não definida");
}

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

app.register(UserRouter, { prefix: "/user" });
app.register(BookRouter, { prefix: "/book" });

const start = async () => {
  try {
    await connect();

    await app.listen({
      port: Number(process.env.PORT1),
      host: "0.0.0.0",
    });

    await connectProducer();
    console.log(`Server running on port ${process.env.PORT1}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
