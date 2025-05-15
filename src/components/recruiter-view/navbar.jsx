import React from "react";
import { BurgerIcon, GearIcon } from "../../utils/icon";

const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 bg-[#141E2B] w-full flex items-center justify-center z-50">
      <div className="w-full flex justify-between items-center lg:py-[24px] lg:px-[167px] py-[16px] px-[24px]">
        <div className="flex justify-center items-center lg:text-xl font-bold text-white text-md">
          Company
        </div>
        <div className="lg:flex items-center gap-[24px] text-[#F4F4F4] text-base font-medium hidden ">
          <span className="cursor-pointer">Dashboard</span>
          <span className="cursor-pointer">Applied Job/Internship</span>
          <span className="cursor-pointer">Courses</span>
          <span className="cursor-pointer">Chat</span>
        </div>
        <div className="lg:flex justify-center items-center hidden">
          <GearIcon className="h-[32px] w-[32px]" />
        </div>
        <div className="lg:hidden items-center gap-[20px] flex">
          <div></div>
          <div className="flex justify-center items-center p-[4px] rounded-[4px] bg-[#6945ED]">
            <BurgerIcon className="h-[18px] w-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
