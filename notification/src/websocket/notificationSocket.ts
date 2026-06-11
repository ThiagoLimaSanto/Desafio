import "@fastify/websocket";
import { FastifyInstance } from "fastify";
import { WebSocket } from "ws";

const clients = new Set<WebSocket>();

export async function notificationSocket(app: FastifyInstance) {
  app.get("/notifications/ws", { websocket: true }, async (socket, request) => {
    try {
      await request.jwtVerify({ onlyCookie: true });

      if (request.user.role === "ADMIN") {
        return socket.close();
      }

      clients.add(socket);

      socket.on("close", () => {
        clients.delete(socket);
      });
    } catch {
      socket.close();
    }
  });
}

export function sendNotificationToClients(data: unknown) {
  const message = JSON.stringify(data);

  clients.forEach((client) => {
    client.send(message);
  });
}
