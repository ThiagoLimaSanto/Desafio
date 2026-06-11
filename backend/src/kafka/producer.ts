import { Kafka } from "kafkajs";
import { AppError } from "../errors/AppError";

if (!process.env.KAFKA_BROKER) {
  throw new AppError("Kafka broker not defined");
}

const kafka = new Kafka({
  clientId: "book-api",
  brokers: [process.env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export async function connectProducer(): Promise<void> {
  await producer.connect();
  console.log("Producer connected");
}

export async function publishBookCreated(event: {
  bookId: string;
  title: string;
}): Promise<void> {
  await producer.send({
    topic: "book-events",
    messages: [
      {
        value: JSON.stringify({
          eventType: "BOOK_CREATED",
          bookId: event.bookId,
          title: event.title,
          createdAt: new Date().toISOString(),
        }),
      },
    ],
  });
}
