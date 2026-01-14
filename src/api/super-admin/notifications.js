import api from "../../lib/axios";
import { buildPaginationParams } from "../../utils/super-admin/apiHelpers";

export const getNotifications = async ({
  signal,
  isRead,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 50,
} = {}) => {
  const queryParams = buildPaginationParams({
    isRead,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  const response = await api.get("/notifications", {
    signal,
    params: queryParams,
  });

  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await api.patch("/notifications/toggle-read", {
    notificationId,
  });
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.patch("/notifications/mark-all-read");
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await api.post("/notifications", notificationData);
  return response.data;
};
