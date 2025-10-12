import { updateCompany } from "../../api/super-admin/database";
import { useUpdateMutation } from "./useBaseMutation";

export const useUpdateCompany = () => {
  return useUpdateMutation(
    ({ id, data }) => updateCompany({ id, data }),
    "Company",
    ["superAdmin-companies", "superAdmin-company", "database-companies"]
  );
};
