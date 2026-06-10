import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "book-api",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export async function connectProducer(): Promise<void> {
  await producer.connect();
  console.log("Producer connected");
}

export async function disconnectProducer(): Promise<void> {
  await producer.disconnect();
  console.log("Producer disconnected");
}

export async function publishBookCreated(event: {
  userId: string;
  bookId: string;
  title: string;
}): Promise<void> {
  await producer.send({
    topic: "book-events",
    messages: [
      {
        value: JSON.stringify({
          eventType: "BOOK_CREATED",
          ...event,
          createdAt: new Date().toISOString(),
        }),
      },
    ],
  });
}
