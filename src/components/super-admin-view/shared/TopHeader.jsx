import { NotificationIcon } from "../../../utils/icon";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useGetSuperAdminProfile } from "../../../hooks/super-admin/useProfile";
import { useGetNotifications } from "../../../hooks/super-admin/useNotifications";
import tokenService from "../../../services/super-admin/tokenService";
import { useState } from "react";
import NotificationSideDrawer from "./NotificationSideDrawer";
import { CircleQuestionMarkIcon, UserIcon } from "lucide-react";

const TopHeader = () => {
  const { data: profileData } = useGetSuperAdminProfile();
  const { data: notificationsData } = useGetNotifications({ isRead: false });
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Get profile from API or fallback to localStorage
  const apiProfile = profileData?.data?.data || {};
  const storedProfile = tokenService.getProfile() || {};
  const profile = { ...storedProfile, ...apiProfile };

  const unreadCount = notificationsData?.data?.unreadCount || 0;

  return (
    <>
      <div className="flex items-center gap-3 justify-end">
        <div className="cursor-pointer py-2 px-4 rounded-full border border-gray-700 flex items-center gap-2 text-sm">
          Support
          <CircleQuestionMarkIcon className="w-5 h-5" strokeWidth={1.5} />
        </div>

        <div
          className="relative cursor-pointer p-3 rounded-full border border-gray-700 flex items-center gap-2"
          onClick={() => setNotificationDrawerOpen(true)}
        >
          <NotificationIcon className="w-5 h-5" strokeWidth={1.5} />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="relative">
          {profile?.profileImage ? (
            <img
              className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover"
              src={profile?.profileImage}
              alt={profile?.name}
            />
          ) : (
            <UserIcon
              className="w-10 h-10 border border-gray-700 rounded-full p-2"
              strokeWidth={1.5}
            />
          )}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-800"></div>
        </div>
      </div>
      <Sheet
        open={notificationDrawerOpen}
        onOpenChange={setNotificationDrawerOpen}
      >
        <SheetContent
          side="right"
          className="w-full sm:w-[456px] sm:max-w-[456px] p-0 
          scrollbar-hide 
          [&>button.absolute]:top-2 
          [&>button.absolute]:right-2 
          [&>button.absolute]:rounded-full 
          overflow-y-auto border-transparent"
        >
          <div className="w-full h-full">
            <NotificationSideDrawer />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TopHeader;
