import useAuthStore from "../../stores/useAuthStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ProfileSideDrawer from "../common/profileSideDrawer";
import NotificationSideDrawer from "../common/notificationSideDrawer";
import {
  ContactUsIcon,
  NotificationIcon,
  SupportIcon,
  WhatsappIcon,
} from "../../utils/icon";

const Navbar = ({ onlySupport }) => {
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:inline-flex hidden relative justify-end items-center gap-4">
        <Popover open={supportDialogOpen} onOpenChange={setSupportDialogOpen}>
          <PopoverTrigger asChild>
            <div
              onClick={() => setSupportDialogOpen(true)}
              variant="outline"
              className="cursor-pointer pl-3.5 pr-2 py-2 rounded-[50px] border-1 border-[#6B6B6B] flex justify-center items-center gap-2.5 bg-white"
            >
              <div className="text-center justify-center text-neutral-500 text-sm font-medium">
                Support
              </div>
              <SupportIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="size- px-3.5 py-2.5 bg-white rounded-lg shadow-[0px_3px_13px_0px_rgba(0,0,0,0.07)] outline outline-1 outline-offset-[-0.50px] outline-zinc-100 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
              <div className="size- inline-flex justify-start items-center gap-2">
                <ContactUsIcon />
                <div className="size- inline-flex flex-col justify-center items-start gap-[5px]">
                  <div className="text-center justify-start text-gray-900 text-xs font-medium leading-none">
                    Email us at connect@ghrig.in
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-100"></div>
              <div className="size- inline-flex justify-start items-center gap-2">
                <WhatsappIcon />
                <div className="w-28 h-2 justify-start text-gray-900 text-xs font-medium leading-none">
                  +91 97118 25377
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {!onlySupport && (
          <div
            onClick={() => setNotificationDialogOpen(true)}
            className="cursor-pointer p-2 rounded-[50px] outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-center items-center gap-2.5"
          >
            <NotificationIcon />
          </div>
        )}
        <Sheet
          open={notificationDialogOpen}
          onOpenChange={setNotificationDialogOpen}
        >
          <SheetContent
            side="right"
            className="
              w-full h-screen 
            lg:max-w-[399px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent"
          >
            <div className="w-full h-full">
              <NotificationSideDrawer />
            </div>
          </SheetContent>
        </Sheet>
        {!onlySupport && (
          <div
            onClick={() => setModalOpen(true)}
            className="relative cursor-pointer"
          >
            <img
              className="size-8 rounded-full border border-neutral-500 object-cover bg-black"
              src={user?.profileImage || user?.basicInformation?.companyLogo}
              alt={user?.name}
            />
            <div className="size-2.5 right-[0px] top-[23px] absolute bg-lime-600 rounded-full" />
          </div>
        )}
        <Sheet open={modalOpen} onOpenChange={setModalOpen}>
          <SheetContent
            side="right"
            className="
              w-full h-screen 
            lg:max-w-[399px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent"
          >
            <div className="w-full h-full">
              <ProfileSideDrawer />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
