import React from "react";
import {
  useGetNotifications,
  useMarkNotificationAsRead,
} from "../../../hooks/super-admin/useNotifications";
import { getRelativeTime } from "../../../utils/relativeTime";
import { ArrowRight } from "lucide-react";

const NotificationSideDrawer = () => {
  const { data: notificationsData, isLoading } = useGetNotifications({
    isRead: false,
  });
  const markAsReadMutation = useMarkNotificationAsRead();

  const notifications = notificationsData?.data?.data || [];

  const groupNotificationsByTime = (notifications) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [],
      thisWeek: [],
      thisMonth: [],
      older: [],
    };

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification.createdAt);

      if (notificationDate >= today) {
        groups.today.push(notification);
      } else if (notificationDate >= weekAgo) {
        groups.thisWeek.push(notification);
      } else if (notificationDate >= monthAgo) {
        groups.thisMonth.push(notification);
      } else {
        groups.older.push(notification);
      }
    });

    return groups;
  };

  const handleMarkAsRead = (notificationId) => {
    markAsReadMutation.mutate(notificationId);
  };

  const groupedNotifications = groupNotificationsByTime(notifications);

  const renderNotificationGroup = (title, notifications) => {
    if (notifications.length === 0) return null;

    return (
      <>
        <div className="justify-start text-neutral-400 text-xs font-medium capitalize">
          {title}
        </div>
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="self-stretch p-1 inline-flex justify-start items-center gap-2"
          >
            <img
              className="size-10 rounded-full object-cover"
              src={notification.senderImage || "/person.png"}
              alt={notification.senderName || "User"}
            />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="justify-start text-gray-600 text-sm font-medium">
                {notification.message}
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-neutral-400 text-xs font-medium lowercase">
                  {getRelativeTime(notification.createdAt)}
                </div>
                {notification.link && (
                  <div
                    className="flex justify-start items-center gap-1 cursor-pointer"
                    onClick={() => {
                      handleMarkAsRead(notification._id);
                      window.location.href = notification.link;
                    }}
                  >
                    <div className="justify-start text-violet-600 text-xs font-medium">
                      Check now
                    </div>
                    <ArrowRight className="w-3 h-3 text-violet-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-5 bg-white rounded-l-2xl flex justify-center items-center">
        <div className="text-gray-500">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-5 bg-white rounded-l-2xl inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="self-stretch pb-3 border-b border-zinc-300 inline-flex justify-between items-center">
        <div className="justify-start text-gray-900 text-xl font-semibold capitalize">
          Notifications
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex-1 flex justify-center items-center text-neutral-400">
          No new notifications
        </div>
      ) : (
        <>
          {renderNotificationGroup("Today", groupedNotifications.today)}
          {renderNotificationGroup("This week", groupedNotifications.thisWeek)}
          {renderNotificationGroup(
            "This Month",
            groupedNotifications.thisMonth
          )}
          {renderNotificationGroup("Older", groupedNotifications.older)}
        </>
      )}
    </div>
  );
};

export default NotificationSideDrawer;
