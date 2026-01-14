import { updateRecruiter } from "../../api/super-admin/database";
import { useUpdateMutation } from "./useBaseMutation";

export const useUpdateRecruiter = () => {
  return useUpdateMutation(
    ({ id, data }) => updateRecruiter({ id, data }),
    "Recruiter",
    ["superAdmin-recruiters", "superAdmin-recruiter", "database-recruiters"]
  );
};
