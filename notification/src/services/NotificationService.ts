import { Notification } from "../models/NotificationModel";

interface CreateNotificationDTO {
  bookId: string;
  title: string;
  message: string;
}

export class NotificationService {
  async create(data: CreateNotificationDTO) {
    return await Notification.create(data);
  }
}