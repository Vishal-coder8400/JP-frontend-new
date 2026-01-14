import { Fragment } from "react";
import useAuthStore from "../../../stores/useAuthStore";

const HeroProfile = () => {
  const { user } = useAuthStore();
  return (
    <Fragment>
      <div className="hidden lg:flex flex-col gap-[30px]">
        <div className="text-3xl text-[#171923] font-bold">
          Hello,{" "}
          {user?.name || user?.basicInformation?.companyName || user?.firstName}
        </div>
      </div>
      <div className="lg:hidden self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-gray-900 text-lg font-bold leading-tight">
          Hello,{" "}
          {user?.name || user?.basicInformation?.companyName || user?.firstName}
        </div>
      </div>
    </Fragment>
  );
};

export default HeroProfile;
