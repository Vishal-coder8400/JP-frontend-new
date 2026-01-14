import useAuthStore from "../../stores/useAuthStore";
import { Link } from "react-router-dom";
import { ArrowRight, EditIcon, QuestionMarkIcon } from "../../utils/icon";

const ProfileSideDrawer = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full h-full p-5 bg-white rounded-l-2xl inline-flex flex-col justify-start items-end overflow-hidden">
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="self-stretch px-5 py-4 relative rounded-lg inline-flex justify-center items-start gap-4">
          <img
            className="size-20 rounded-full border-[1.25px] border-black object-cover"
            src={user?.profileImage || user?.basicInformation?.companyLogo}
            alt={user?.name || user?.basicInformation?.companyName}
          />
          <div className="flex-1 inline-flex flex-col justify-start items-center gap-1.5">
            <div className="self-stretch justify-start text-gray-900 text-xl font-semibold capitalize">
              {user?.name || user?.basicInformation?.companyName}
            </div>
            <div className="self-stretch justify-start text-gray-600 text-xs font-medium capitalize">
              continue your journey and achieve All Your Target
            </div>
            <Link
              to={`/${user?.role}/profile`}
              className="self-stretch inline-flex justify-start items-center gap-1.5"
            >
              <EditIcon />
              <div className="justify-start text-[#6945ED] text-xs font-semibold capitalize">
                Edit Profile
              </div>
            </Link>
          </div>
          <div className="size-3.5 left-[75px] top-[75px] absolute bg-lime-600 rounded-full" />
        </div>
        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
        <div className="self-stretch py-2 inline-flex justify-between items-center">
          <Link
            to={`/${user?.role}/faq`}
            className="flex justify-start items-center gap-2"
          >
            <QuestionMarkIcon />
            <div className="justify-start text-zinc-600 text-base font-medium capitalize">
              FAQs
            </div>
          </Link>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ProfileSideDrawer;
