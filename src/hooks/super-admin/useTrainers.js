import { useQuery } from "@tanstack/react-query";
import { getAllTrainers, getTrainerById } from "../../api/super-admin/database";

export const useGetAllTrainers = () => {
  return useQuery({
    queryKey: ["superAdmin-trainers"],
    queryFn: ({ signal }) => getAllTrainers({ signal }),
    keepPreviousData: true,
  });
};

export const useGetTrainerDetails = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainer", id],
    queryFn: ({ signal }) => getTrainerById({ signal, id }),
    enabled: enabled && !!id,
  });
};
