import mongoose from "mongoose";
const { Schema } = mongoose;

export const User = mongoose.model(
  "User",
  new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  }),
);