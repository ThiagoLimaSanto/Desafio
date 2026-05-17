import mongoose from "mongoose";
import "dotenv/config";

export const connect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Variaveis de ambiente não definida");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

connect();
