import mongoose from "mongoose";

const { Schema } = mongoose;

export const Notification = mongoose.model(
  "Notification",
  new Schema(
    {
      bookId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
