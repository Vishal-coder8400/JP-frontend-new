import useAuthStore from "../../stores/useAuthStore";
import CheckAuth from "./checkAuth";
import ProfileSetupLayout from "../recruiter-view/profile-setup-layout/index";
import Congratulation from "../../pages/common/congratulation";
import { useGetCorporateUserProfile } from "../../hooks/corporate/useProfile";
import { useGetUserProfile as useGetRecruiterUserProfile } from "../../hooks/recruiter/useProfile";

const DynamicCheckAuthWrapper = () => {
  const { user } = useAuthStore();

  // Select the appropriate hook based on the role
  const fetchProfileHook =
    user?.role === "recruiter"
      ? useGetRecruiterUserProfile
      : useGetCorporateUserProfile;

  return (
    <CheckAuth
      fetchProfileHook={fetchProfileHook}
      allowedRoles={["recruiter", "corporate"]}
    >
      <Congratulation />
    </CheckAuth>
  );
};

export default DynamicCheckAuthWrapper;
