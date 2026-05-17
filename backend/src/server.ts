import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import { fastify } from "fastify";
import { connect } from "./repository/mongoose";
import { UserRouter } from "./routes/UserRouter";

export const app = fastify();

if (
  !process.env.FRONTEND_URL ||
  !process.env.PORT ||
  !process.env.JWT_SECRET ||
  !process.env.COOKIE_SECRET
) {
  throw new Error("Variaveis de ambiente não definida");
}

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

app.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(UserRouter, { prefix: "/user" });

const start = async () => {
  try {
    await connect();

    await app.listen({
      port: Number(process.env.PORT),
      host: "0.0.0.0",
    });

    console.log(`Server running on port ${process.env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
