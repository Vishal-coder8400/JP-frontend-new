import useAuthStore from "../../stores/useAuthStore";

import Congratulation from "../../pages/common/congratulation";
import { useGetCorporateUserProfile } from "../../hooks/corporate/useProfile";
import { useGetUserProfile as useGetRecruiterUserProfile } from "../../hooks/recruiter/useProfile";

const DynamicCheckAuthWrapper = () => {
  return <Congratulation />;
};

export default DynamicCheckAuthWrapper;
