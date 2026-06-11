import { Kafka } from "kafkajs";
import { AppError } from "../../errors/AppError";
import { NotificationService } from "../services/NotificationService";
import { sendNotificationToClients } from "../websocket/notificationSocket";

interface BookCreatedEvent {
  eventType: "BOOK_CREATED";
  bookId: string;
  title: string;
  createdAt: string;
}

if (!process.env.KAFKA_BROKER) {
  throw new AppError("Kafka broker not defined");
}

const kafka = new Kafka({
  clientId: "notification-api",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({
  groupId: "notification-api",
});

const notificationService = new NotificationService();

export async function startConsumer(): Promise<void> {
  await consumer.connect();

  await consumer.subscribe({
    topic: "book-events",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString()) as BookCreatedEvent;

      console.log("Evento recebido:", event);

      if (event.eventType === "BOOK_CREATED") {
        const notification = await notificationService.create({
          bookId: event.bookId,
          title: event.title,
          message: `Livro ${event.title} cadastrado no estoque!`,
        });

        sendNotificationToClients(notification);

        console.log(`Notificação criada para o livro: ${event.title}`);
      }
    },
  });
}
