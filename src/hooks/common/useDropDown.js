import { dropDown } from "@/api/common/dropdown";
import { useQuery } from "@tanstack/react-query";

export const useDropDown = (dropDownId) => {
  return useQuery({
    queryKey: ["dropDown", dropDownId],
    queryFn: () => dropDown(dropDownId),
    retry: false,
  });
};
