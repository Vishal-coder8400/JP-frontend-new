import { useState } from "react";
import LogInComponent from "../../components/super-admin-view/log-in";
import { useLogin } from "../../hooks/super-admin/useAuth";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is Required"),
});

const SuperAdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { mutate, isPending, isError, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateFormData(loginSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  return (
    <div className="flex flex-col w-full">
      <LogInComponent
        formData={formData}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        isPending={isPending}
      />
    </div>
  );
};

export default SuperAdminLogin;
