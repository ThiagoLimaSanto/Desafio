import mongoose from "mongoose";
import "dotenv/config";

export const connect = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Variaveis de ambiente não definida");
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

connect();
