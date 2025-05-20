import { useState } from "react";
import Navbar from "../../components/recruiter-view/navbar";
import LogInComponent from "../../components/recruiter-view/log-in";
import { useLogin } from "../../hooks/recruiter/useAuth";
import { z } from "zod";
import { validateFormData } from "../../utils/objectUtils";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  rememberme: z.boolean(),
});

const RecruiterLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const signUpLink = "/recruiter/profile-setup/basic-details";
  const { mutate, isPending, isError, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFormData(loginSchema, formData);
    if (!isValid) return;
    mutate(formData);
  };
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <LogInComponent
        formData={formData}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        isPending={isPending}
        signUpLink={signUpLink}
      />
    </div>
  );
};

export default RecruiterLogin;
