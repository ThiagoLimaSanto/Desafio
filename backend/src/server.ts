import { fastify } from "fastify";
import "dotenv/config";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { connect } from "./repository/mongoose";

export const app = fastify();

connect();

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

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
