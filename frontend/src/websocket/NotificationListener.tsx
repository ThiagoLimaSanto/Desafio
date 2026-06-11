import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function NotificationListener() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3334/notifications/ws");

    socket.onopen = () => {
      console.log("Conectado");
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      console.log("Nova notificação:", notification);

      alert(notification.message);

      queryClient.invalidateQueries({ queryKey: ["books"] });
    };

    socket.onclose = () => {
      console.log("Desconectado");
    };

    return () => {
      socket.close();
    };
  }, []);

  return null;
}
