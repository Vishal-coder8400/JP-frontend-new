import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useDatabaseUIStore from "../../../stores/useDatabaseUIStore";
import useApprovalsUIStore from "../../../stores/useApprovalsUIStore";
import useDatabaseTabStore from "../database/zustand";
import useJobsAndTrainingsTabStore from "../jobs-and-trainings/zustand";
import useAuthStore from "../../../stores/useAuthStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    // Clear all super-admin related queries
    queryClient.invalidateQueries({ queryKey: ["superAdmin-"] });
    queryClient.invalidateQueries({ queryKey: ["database-"] });
    queryClient.invalidateQueries({ queryKey: ["approvals-"] });
    queryClient.invalidateQueries({ queryKey: ["dropdowns"] });
    queryClient.invalidateQueries({ queryKey: ["dropdownValues"] });
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    queryClient.invalidateQueries({ queryKey: ["training-applications"] });
    queryClient.invalidateQueries({ queryKey: ["approval-details"] });

    // Clear all cached data
    queryClient.clear();

    // Clear Zustand stores to reset UI state
    const databaseStore = useDatabaseUIStore.getState();
    const approvalsStore = useApprovalsUIStore.getState();
    const databaseTabStore = useDatabaseTabStore.getState();
    const jobsAndTrainingsTabStore = useJobsAndTrainingsTabStore.getState();

    // Reset database store
    databaseStore.companies.clearFilters();
    databaseStore.trainers.clearFilters();
    databaseStore.recruiters.clearFilters();
    databaseStore.candidates.clearFilters();

    // Reset approvals store
    approvalsStore.companies.clearFilters();
    approvalsStore.trainers.clearFilters();
    approvalsStore.recruiters.clearFilters();
    approvalsStore.jobsAndTrainings.clearFilters();

    // Reset tab stores to default tabs
    databaseTabStore.setActiveTab("companies");
    jobsAndTrainingsTabStore.setActiveTab("jobs");

    // Clear auth store
    useAuthStore.getState().logout();

    // Simple localStorage logout
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    navigate("/super-admin/log-in");
  };

  return logOut;
};
