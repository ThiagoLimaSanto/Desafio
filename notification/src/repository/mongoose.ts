import mongoose from "mongoose";
import "dotenv/config";
import { AppError } from "../../errors/AppError";

export const connect = async () => {
  if (!process.env.DATABASE_URL2) {
    throw new AppError("Variaveis de ambiente não definida");
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL2);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

connect();
