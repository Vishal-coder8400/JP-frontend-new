import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logOut = () => {
    // Simple localStorage logout
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/super-admin/log-in");
  };

  return logOut;
};
