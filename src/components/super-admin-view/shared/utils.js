import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useDatabaseUIStore from "../../../stores/useDatabaseUIStore";
import useApprovalsUIStore from "../../../stores/useApprovalsUIStore";
import useDatabaseTabStore from "../database/zustand";
import useJobsAndTrainingsTabStore from "../jobs-and-trainings/zustand";
import useAuthStore from "../../../stores/useAuthStore";
import tokenService from "../../../services/super-admin/tokenService";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    queryClient.invalidateQueries({ queryKey: ["superAdmin-"] });
    queryClient.invalidateQueries({ queryKey: ["database-"] });
    queryClient.invalidateQueries({ queryKey: ["approvals-"] });
    queryClient.invalidateQueries({ queryKey: ["dropdowns"] });
    queryClient.invalidateQueries({ queryKey: ["dropdownValues"] });
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    queryClient.invalidateQueries({ queryKey: ["training-applications"] });
    queryClient.invalidateQueries({ queryKey: ["approval-details"] });

    queryClient.clear();

    const databaseStore = useDatabaseUIStore.getState();
    const approvalsStore = useApprovalsUIStore.getState();
    const databaseTabStore = useDatabaseTabStore.getState();
    const jobsAndTrainingsTabStore = useJobsAndTrainingsTabStore.getState();

    databaseStore.companies.clearFilters();
    databaseStore.trainers.clearFilters();
    databaseStore.recruiters.clearFilters();
    databaseStore.candidates.clearFilters();

    approvalsStore.companies.clearFilters();
    approvalsStore.trainers.clearFilters();
    approvalsStore.recruiters.clearFilters();
    approvalsStore.jobsAndTrainings.clearFilters();

    databaseTabStore.setActiveTab("companies");
    jobsAndTrainingsTabStore.setActiveTab("jobs");

    useAuthStore.getState().logout();

    tokenService.clearAll();

    navigate("/super-admin/log-in");
  };

  return logOut;
};
