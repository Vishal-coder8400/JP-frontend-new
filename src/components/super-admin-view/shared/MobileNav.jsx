import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { DASHBOARD_MENU_SUPER_ADMIN } from "./constants.jsx";

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
        {DASHBOARD_MENU_SUPER_ADMIN.slice(0, 4).map((item, index) => (
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
