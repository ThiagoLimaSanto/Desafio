import mongoose from "mongoose";
const { Schema } = mongoose;

export const Book = mongoose.model(
  "Books",
  new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    ano: { type: Number, required: true },
    estoque: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
  }),
);