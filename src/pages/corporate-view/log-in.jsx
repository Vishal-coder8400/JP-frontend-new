import { useState } from "react";
import { useLogin } from "../../hooks/corporate/useAuth";
import Navbar from "../../components/recruiter-view/navbar";
import LogInComponent from "../../components/recruiter-view/log-in";

const CorporateLogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  const signUpLink = "/corporate/profile-setup/basic-details";
  const { mutate, isPending, isError, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
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

export default CorporateLogIn;
