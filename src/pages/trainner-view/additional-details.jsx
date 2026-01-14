import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/recruiter-view/navbar";
import CommonForm from "../../components/common/form";
import ButtonComponent from "../../components/common/button";
import { gigTrainingFormConfig } from "../../config";
import { useTrainerStage4 } from "@/hooks/trainer/useProfile";

const AdditionalDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    maritalStatus: "",
  });

  const { mutate: submitStage4, isPending } = useTrainerStage4({
    onSuccess: (res) => {
      console.log("✔ FINAL STEP SUCCESS", res);
      navigate("/trainer/dashboard");
    },
    onError: (err) => console.log("❌ ERROR", err),
  });

  const handleSubmit = () => {
    console.log("🚀 SUBMIT CLICKED", formData);
    submitStage4(formData);
  };

  return (
    <div className="w-full self-stretch px-[20px] py-[20px] lg:px-36 lg:py-[0px] lg:pb-[32px] inline-flex flex-col gap-[18px]">
      <Navbar onlySupport={true} />

      <div className="text-3xl font-bold">Additional Information</div>

      <CommonForm
        formControls={gigTrainingFormConfig}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="self-stretch flex justify-end">
        <ButtonComponent
          color={"#6945ED"}
          buttonText={"Continue"}
          isPending={isPending}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
