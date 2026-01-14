import useAuthStore from "../../stores/useAuthStore";
import { MobileMenuIcon } from "../../utils/icon";

const MobileNav = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <div className="z-100 fixed top-0 left-0 w-full lg:hidden self-stretch px-5 py-4 bg-[#141E2B] inline-flex justify-between items-center overflow-hidden">
      <div className="justify-start text-white text-base font-bold leading-none">
        Company
      </div>
      <div className="size- flex justify-start items-center gap-5">
        {isAuthenticated && (
          <img
            className="size-7 rounded-full"
            src="https://placehold.co/27x27"
          />
        )}
        <div className="p-[5px] bg-[#6945ED] rounded-sm flex justify-center items-center gap-4">
          <MobileMenuIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
