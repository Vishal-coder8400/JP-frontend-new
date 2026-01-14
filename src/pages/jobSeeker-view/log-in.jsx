import { useState } from "react";
import { useLogin } from "../../hooks/job-seeker/useAuth";
import LogInComponent from "../../components/recruiter-view/log-in";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const signUpLink = "/job-seeker/profile-setup/basic-details";
  const { mutate, isPending, isError, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="flex flex-col w-full">
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

export default Login;
