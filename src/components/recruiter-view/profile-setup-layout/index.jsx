import MobileNav from "../mobileNav";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <main className="w-full h-full flex flex-col lg:flex-row">
      {/* <Navbar /> */}
      <MobileNav />
      <div className="pt-[58px] lg:pt-[32px] w-full h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Index;
