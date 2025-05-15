import React from "react";
import Navbar from "./navbar";
import {
  Bag,
  BellIcon,
  BookIcon,
  Cubed,
  Dash,
  LogoutIcon,
  Slate2,
  Users,
} from "../../utils/icon";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "../../stores/useAuthStore";

const dashboardMenu = [
  {
    name: "Dashboard",
    link: "/recruiter/dashboard",
    icon: <Cubed className="h-[20px] w-[20px]" />,
  },
  {
    name: "Candidates",
    link: "/recruiter/candidates",
    icon: <Users className="h-[20px] w-[20px]" />,
  },
  {
    name: "Job Openings",
    link: "/recruiter/job-openings",
    icon: <Bag className="h-[20px] w-[20px]" />,
  },
  {
    name: "Analytics & Reports",
    link: "/recruiter/analytics-and-reports",
    icon: <Slate2 className="h-[20px] w-[20px]" />,
  },
  {
    name: "Matches & Submissions",
    link: "/recruiter/matches-and-submissions",
    icon: <BookIcon className="h-[20px] w-[20px]" />,
  },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const logOut = () => {
    logout();
    navigate("/recruiter/log-in");
  };
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      {/* desktop-view */}
      <aside className="fixed top-[80px] left-0 h-[calc(100vh-80px)] hidden w-[338px] bg-[#141E2B] lg:flex flex-col overflow-hidden">
        <div className="p-[24px] flex flex-col gap-[35px] overflow-y-auto scrollbar-hide scroll-smooth">
          {/* Profile Card */}
          <div className="relative overflow-hidden flex flex-col gap-[16px] px-[20px] py-[45px] rounded-[16px] border-[#474747] border min-h-[265px]">
            <div className="absolute inset-0 bg-noise-pattern bg-cover mix-blend-soft-light"></div>
            <div className="absolute inset-0 bg-gradient-radial from-[#6945ED] to-[#1E2D42]"></div>
            <div className="flex gap-[33px] z-10 items-center justify-center">
              <div className="flex items-center justify-center h-[100px] w-[100px]">
                <img src="" alt="" className="h-full w-full rounded-[88px]" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-center p-[12px] rounded-[50px] border border-[#fff]">
                  <BellIcon className="h-[16px] w-[16px]" />
                </div>
                <div className="flex items-center justify-center p-[12px] rounded-[50px] border border-[#fff]">
                  <Dash className="h-[16px] w-[16px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[6px] items-center justify-center z-10 ">
              <div className="text-[#fff] text-md font-medium">
                {user?.name}
              </div>
              <div className="text-[#A2A2A2] text-base font-medium text-center">
                Continue your journey and achieve Your Target
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[19px]">
            {dashboardMenu.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className={`flex gap-[24px] px-[20px] py-[10px] ${
                  location.pathname.includes(item.link)
                    ? "bg-[#23344B] rounded-[4px]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-white text-md2 ">{item.name}</div>
              </Link>
            ))}
          </div>
          <Button
            onClick={logOut}
            className="cursor-pointer self-stretch px-5 py-2.5 rounded inline-flex justify-start items-center gap-6"
          >
            <div className="w-5 h-5 relative overflow-hidden">
              <LogoutIcon className="h-full w-full" />
            </div>
            <div className="justify-start text-red-400 text-lg font-normal leading-relaxed">
              Logout
            </div>
          </Button>
        </div>
      </aside>

      {/* mobile-view */}
      <div className="lg:hidden w-full p-6 pt-[84px] bg-gray-900 border-r border-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="relative overflow-hidden self-stretch px-5 py-3.5 bg-blend-soft-light rounded-2xl outline outline-offset-[-1px] outline-zinc-700 inline-flex justify-between items-center gap-4">
          <div className="absolute inset-0 bg-noise-pattern bg-cover mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-gradient-radial from-[#6945ED] to-[#1E2D42]"></div>
          <div className="z-1 flex justify-center items-center gap-5">
            <div className="flex justify-center items-center">
              <img
                className="w-16 h-16 rounded-full"
                src="https://placehold.co/65x65"
              />
            </div>
          </div>
          <div className="z-1 inline-flex flex-col justify-start items-center gap-1.5">
            <div className="self-stretch text-center justify-start text-white text-base font-medium capitalize">
              {user?.name}
            </div>
            <div className="self-stretch text-center justify-start text-neutral-400 text-sm font-medium capitalize">
              continue your journey and <br />
              achieve Your Target
            </div>
          </div>
          <div
            onClick={logOut}
            className="z-1 inline-flex flex-col justify-center items-end gap-2.5"
          >
            <div className="w-9 h-9 p-3 rounded-[50px] outline  outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5">
              <div className="w-4 h-4 relative">
                <Dash className="h-[16px] w-[16px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-between items-center gap-[4px]">
          {dashboardMenu.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`px-5 py-2.5 ${
                location.pathname.includes(item.link) ? "bg-slate-800" : ""
              } rounded flex justify-start items-center gap-4`}
            >
              <div className="w-5 h-5 relative overflow-hidden">
                {item.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <section className="lg:ml-[338px] flex-1 flex-col flex lg:py-[47px] lg:px-[78px] lg:pl-[54px]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
