import {
  getSectoralOptions,
  createSectoralOption,
  updateSectoralOption,
  deleteSectoralOption,
} from "../../api/super-admin/sectoralOption";
import { useBaseListQuery } from "./useBaseQuery";
import {
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} from "./useBaseMutation";
import { QUERY_KEYS } from "../../constants/super-admin/queryKeys";

export const useGetSectoralOptions = (options = {}) => {
  return useBaseListQuery(
    QUERY_KEYS.sectoralOptions,
    getSectoralOptions,
    {},
    options
  );
};

export const useCreateSectoralOption = () => {
  return useCreateMutation(createSectoralOption, "Sectoral option", [
    "superAdmin-sectoral-options",
  ]);
};

export const useUpdateSectoralOption = () => {
  return useUpdateMutation(updateSectoralOption, "Sectoral option", [
    "superAdmin-sectoral-options",
  ]);
};

export const useDeleteSectoralOption = () => {
  return useDeleteMutation(deleteSectoralOption, "Sectoral option", [
    "superAdmin-sectoral-options",
  ]);
};
