import { Link, Outlet, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Dash } from "@/utils/icon";
import { DASHBOARD_MENU_SUPER_ADMIN } from "./constants.jsx";
import { useLogout } from "./utils";

const Layout = () => {
  const location = useLocation();
  const dashboardMenu = DASHBOARD_MENU_SUPER_ADMIN;
  const logOut = useLogout();

  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">
      <MobileNav />
      {/* desktop-view */}
      <Navbar />

      {/* mobile-view */}
      <div className="lg:hidden w-full p-6 pt-[84px] bg-gray-900 border-r border-zinc-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="relative overflow-hidden self-stretch px-5 py-3.5 bg-blend-soft-light rounded-2xl outline outline-offset-[-1px] outline-zinc-700 inline-flex justify-between items-center gap-4">
          <div className="absolute inset-0 bg-noise-pattern bg-cover mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-gradient-radial from-[#6945ED] to-[#1E2D42]"></div>
          <div className="z-1 flex justify-center items-center gap-5">
            <div className="flex justify-center items-center">
              <img
                className="w-16 h-16 rounded-full"
                src="/image.png"
                alt="Super Admin"
              />
            </div>
          </div>
          <div className="z-1 inline-flex flex-col justify-start items-center gap-1.5">
            <div className="self-stretch text-center justify-start text-white text-base font-medium capitalize">
              Super Admin
            </div>
            <div className="self-stretch text-center justify-start text-neutral-400 text-sm font-medium capitalize">
              System Administrator <br />
              Full Control Access
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
          {dashboardMenu.slice(0, 4).map((item, index) => (
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
      <section className="lg:ml-[327px] flex-col flex lg:py-[32px] lg:px-[16px] min-w-0">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
