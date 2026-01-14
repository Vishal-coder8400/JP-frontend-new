import { LogoutIcon, SignOutIcon } from "../../../utils/icon";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSuperAdminProfile } from "../../../hooks/super-admin/useProfile";
import { DASHBOARD_MENU_SUPER_ADMIN } from "./constants.jsx";
import { useLogout } from "./utils";

const Navbar = () => {
  const location = useLocation();
  const { data: profileData, isLoading: profileLoading } =
    useGetSuperAdminProfile();
  const dashboardMenu = DASHBOARD_MENU_SUPER_ADMIN;
  const logOut = useLogout();

  const profile = profileData?.data?.data || {};

  return (
    <aside className="fixed top-[18px] left-[19px] hidden w-[308px] bg-[#060606] lg:flex flex-col overflow-hidden rounded-[16px]">
      <div className="relative h-[90vh] w-full">
        <div className="flex-1 px-[18px] py-[24px] h-full flex flex-col gap-[35px] overflow-y-auto scrollbar-hide scroll-smooth">
          <div className="self-stretch inline-flex justify-start items-center gap-3">
            <img
              src="/ghrig_logo.png"
              alt="GHRIG Logo"
              className="h-auto w-40 mx-auto bg-white rounded-md px-4 py-1"
            />
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-2.5">
            <div className="justify-start text-stone-500 text-xs font-semibold leading-none tracking-widest">
              MENU
            </div>
            <div className="w-full h-0 outline-1 outline-offset-[-0.50px] outline-stone-500"></div>
          </div>
          <div className="flex flex-col gap-[19px] mb-[58.03px]">
            {dashboardMenu.map((item, index) => {
              return (
                <Link
                  to={item.link}
                  key={index}
                  className={`flex gap-[24px] px-[20px] py-[10px] ${
                    location.pathname.includes(item.link)
                      ? "rounded-[1.125rem] bg-[#6945ED]"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-white text-md2 ">{item.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black absolute bottom-0 left-0 w-full cursor-pointer rounded-[0px] self-stretch px-[38px] py-7.5 inline-flex justify-start items-center gap-6 border-t-2 border-[#686868]">
              <div className="w-5 h-5 relative overflow-hidden">
                <LogoutIcon className="h-full w-full" />
              </div>
              <div className="justify-start text-red-400 text-lg font-normal leading-relaxed">
                Logout
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[312px] border-0 shadow-none [&>button.absolute]:hidden">
            <div className="w-full h-full p-6 bg-white rounded-2xl shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-start items-center gap-12">
              <div className="self-stretch flex flex-col justify-start items-center gap-6">
                <div className="size-14 px-4 py-4 bg-rose-50 rounded-[29px] inline-flex justify-start items-center gap-2.5">
                  <SignOutIcon />
                </div>
                <div className="self-stretch flex flex-col justify-start items-center gap-3">
                  <div className="self-stretch text-center justify-start text-gray-900 text-3xl font-semibold leading-7">
                    Sign out
                  </div>
                  <div className="w-72 text-center justify-start text-zinc-600 text-base font-medium leading-none">
                    Are you sure you want to sign out?
                  </div>
                </div>
              </div>
              <div className="size- inline-flex justify-start items-center gap-6">
                <Button
                  onClick={logOut}
                  className="cursor-pointer w-28 px-4 py-3.5 bg-neutral-800 rounded-md shadow-[0px_1px_4px_0px_rgba(25,33,61,0.08)] flex justify-center items-center gap-[3px]"
                >
                  <div className="text-center justify-start text-white text-xs font-semibold leading-tight">
                    Sign Out
                  </div>
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer w-28 px-4 py-3.5 bg-white rounded-md outline-1 outline-offset-[-0.50px] outline-slate-500 flex justify-center items-center gap-[3px]"
                  >
                    <div className="text-center justify-start text-slate-500 text-xs font-semibold leading-tight">
                      Cancel
                    </div>
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
};

export default Navbar;
