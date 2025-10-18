import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../api/super-admin/notifications";
import tokenService from "../../services/super-admin/tokenService";
import { createQueryConfig } from "../../services/super-admin/queryConfigFactory";

export const useGetNotifications = ({ isRead, enabled = true } = {}) => {
  const token = tokenService.getToken();
  const config = createQueryConfig({ enabled });

  return useQuery({
    queryKey: QUERY_KEYS.notifications(token, { isRead }),
    queryFn: ({ signal }) => getNotifications({ signal, isRead }),
    ...config,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const token = tokenService.getToken();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications(token),
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const token = tokenService.getToken();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notifications(token),
      });
    },
  });
};
