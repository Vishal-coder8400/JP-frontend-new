import Navbar from "./navbar";
import {
  Bag,
  BookIcon,
  Cubed,
  CursorIcon,
  Dash,
  LogoutIcon,
  Slate2,
  Users,
} from "../../utils/icon";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "../../stores/useAuthStore";

const dashboardMenuRecruiter = [
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
    name: "Matches & Submissions",
    link: "/recruiter/matches-and-submissions",
    icon: <BookIcon className="h-[20px] w-[20px]" />,
  },
];
const dashboardMenuCorporate = [
  {
    name: "Dashboard",
    link: "/corporate/dashboard",
    icon: <Cubed className="h-[20px] w-[20px]" />,
  },
  {
    name: "Candidates",
    link: "/corporate/candidates",
    icon: <Users className="h-[20px] w-[20px]" />,
  },
  {
    name: "Job Postings",
    link: "/corporate/job-posting/analytics",
    icon: <Bag className="h-[20px] w-[20px]" />,
  },
  {
    name: "Resume Filtering",
    link: "/corporate/resume-filtering",
    icon: <Slate2 className="h-[20px] w-[20px]" />,
  },
  {
    name: "Referral Management",
    link: "/corporate/referal-management",
    icon: <CursorIcon className="h-[20px] w-[20px]" />,
  },
];
const dashboardMenus = {
  recruiter: dashboardMenuRecruiter,
  corporate: dashboardMenuCorporate,
};

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const dashboardMenu = dashboardMenus[user?.role] || [];
  const logOut = () => {
    navigate(`/${user?.role}/log-in`);
    logout();
  };
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">
      <Navbar />
      {/* desktop-view */}
      <div className="lg:w-[calc(100%-calc(100%-338px))]">
        <aside className="fixed top-[80px] left-0 h-[calc(100vh-80px)] hidden w-[338px] bg-[#141E2B] lg:flex flex-col overflow-hidden">
          <div className="p-[24px] flex flex-col gap-[35px] overflow-y-auto scrollbar-hide scroll-smooth">
            {/* Profile Card */}
            <div className="self-stretch px-5 py-4 relative bg-slate-800 rounded-lg inline-flex justify-center items-center gap-4">
              <img
                className="size-12 rounded-full border border-black object-cover"
                src={user?.profileImage || user?.basicInformation?.companyLogo}
                alt={user?.name || user?.basicInformation?.companyName}
              />
              <div className="flex-1 inline-flex flex-col justify-start items-center gap-1.5">
                <div className="self-stretch text-center justify-start text-white text-base font-medium capitalize">
                  {user?.name || user?.basicInformation?.companyName}
                </div>
                <div className="self-stretch text-center justify-start text-neutral-400 text-xs font-medium capitalize">
                  continue your journey and <br />
                  achieve Your Target
                </div>
              </div>
              <div className="size-2.5 left-[52px] top-[59px] absolute bg-lime-600 rounded-full" />
            </div>
            <div className="size- inline-flex flex-col justify-start items-start gap-2.5">
              <div className="justify-start text-stone-500 text-xs font-semibold leading-none tracking-widest">
                MENU
              </div>
              <div className="w-full h-0 outline-1 outline-offset-[-0.50px] outline-stone-500"></div>
            </div>
            <div className="flex flex-col gap-[19px]">
              {dashboardMenu.map((item, index) => {
                let link = item.link;
                if (link === "/corporate/job-posting/analytics") {
                  link = "/corporate/job-posting";
                }
                return (
                  <Link
                    to={item.link}
                    key={index}
                    className={`flex gap-[24px] px-[20px] py-[10px] ${
                      location.pathname.includes(link)
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
      </div>

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
      <section className="lg:w-[calc(100%-338px)] flex-col flex lg:py-[47px] lg:px-[58px]">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
