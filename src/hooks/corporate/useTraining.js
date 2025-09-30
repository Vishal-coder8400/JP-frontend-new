import { useMutation, useQuery } from "@tanstack/react-query";
import { omit } from "../../utils/commonFunctions";
import {
  corporateTrainingById,
  corporateTrainingPost,
  getTrainingList,
} from "../../api/corporate/training";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "../../stores/useAuthStore";
import { useApproval } from "../common/useApproval";

export const useTraining = (filters) => {
  const sanotizedFilters = omit(filters, ["jobType"]);
  return useQuery({
    queryKey: ["trainingList", sanotizedFilters],
    queryFn: getTrainingList,
    keepPreviousData: true, // helpful for pagination
    enabled: filters?.jobType === "training",
  });
};

export const useCorporateTrainingPost = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { mutate: approve } = useApproval();
  return useMutation({
    mutationFn: corporateTrainingPost,
    onSuccess: (data) => {
      toast.success(data.data.message);
      approve({
        type: "training",
        applicantId: data.data.data._id,
        applicantType: "training",
      });
      navigate(`/${user?.role}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useGetTrainningById = (id, jobType) => {
  return useQuery({
    queryKey: ["corporateTrainingById", id],
    queryFn: () => corporateTrainingById(id),
    enabled: jobType === "training",
    retry: false,
  });
};
