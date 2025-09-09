import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bag,
  BookIcon,
  Cubed,
  CursorIcon,
  Slate2,
  Users,
} from "../../utils/icon";
import useAuthStore from "../../stores/useAuthStore";

const dashboardMenuSuperAdmin = [
  {
    name: "Dashboard",
    link: "/superAdmin/dashboard",
    icon: <Cubed className="h-[20px] w-[20px]" />,
  },
  {
    name: "Users Management",
    link: "/superAdmin/users",
    icon: <Users className="h-[20px] w-[20px]" />,
  },
  {
    name: "Job Management",
    link: "/superAdmin/job-openings",
    icon: <Bag className="h-[20px] w-[20px]" />,
  },
  {
    name: "Training Management",
    link: "/superAdmin/trainings",
    icon: <BookIcon className="h-[20px] w-[20px]" />,
  },
  {
    name: "System Settings",
    link: "/superAdmin/settings",
    icon: <CursorIcon className="h-[20px] w-[20px]" />,
  },
  {
    name: "Analytics",
    link: "/superAdmin/analytics",
    icon: <Slate2 className="h-[20px] w-[20px]" />,
  },
];

const MobileNav = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  if (user?.role !== "superAdmin") return null;

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">GHRIG Super Admin</h2>
      </div>
      <div className="flex justify-between">
        {dashboardMenuSuperAdmin.slice(0, 4).map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`p-2 rounded ${
              location.pathname.includes(item.link) ? "bg-[#6945ED]" : ""
            }`}
          >
            <div className="w-6 h-6 text-white">{item.icon}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
