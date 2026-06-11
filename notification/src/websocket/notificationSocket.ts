import "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { WebSocket } from "ws";

const clients = new Set<WebSocket>();

export async function notificationSocket(app: FastifyInstance) {
  app.get("/notifications/ws", { websocket: true }, (socket) => {
    clients.add(socket);

    console.log("Cliente conectado");

    socket.on("close", () => {
      clients.delete(socket);
      console.log("Cliente desconectado");
    });
  });
}

export function sendNotificationToClients(data: unknown) {
  const message = JSON.stringify(data);

  clients.forEach((client) => {
    client.send(message);
  });
}
