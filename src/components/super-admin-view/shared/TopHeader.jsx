import { NotificationIcon } from "../../../utils/icon";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useGetSuperAdminProfile } from "../../../hooks/super-admin/useProfile";
import { useGetNotifications } from "../../../hooks/super-admin/useNotifications";
import tokenService from "../../../services/super-admin/tokenService";
import { useState } from "react";
import NotificationSideDrawer from "./NotificationSideDrawer";

const TopHeader = () => {
  const { data: profileData } = useGetSuperAdminProfile();
  const { data: notificationsData } = useGetNotifications({ isRead: false });
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Get profile from API or fallback to localStorage
  const apiProfile = profileData?.data?.data || {};
  const storedProfile = tokenService.getProfile() || {};
  const profile = { ...storedProfile, ...apiProfile };

  const unreadCount = notificationsData?.data?.data?.length || 0;

  return (
    <>
      {/* Top Right Header */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Support Button */}
        <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium flex items-center gap-2">
          Support
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </button>

        {/* Notification Bell */}
        <div
          className="cursor-pointer p-2 rounded-full hover:bg-gray-700 relative bg-gray-800"
          onClick={() => setNotificationDrawerOpen(true)}
        >
          <NotificationIcon className="w-5 h-5 text-white" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover"
            src={profile?.profileImage || "/person.png"}
            alt={
              profile?.firstName
                ? `${profile.firstName} ${profile.lastName}`
                : "Super Admin"
            }
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
        </div>
      </div>

      {/* Notification Drawer */}
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
