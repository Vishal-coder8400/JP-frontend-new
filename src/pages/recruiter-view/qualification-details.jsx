import { useState } from "react";
import CommonForm from "../../components/common/form";
import { referenceFields, sectoralFieldsForm2 } from "../../config";
import { useSectoralDetails } from "../../hooks/recruiter/useProfile";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import { useUpload } from "../../hooks/common/useUpload";
import Navbar from "../../components/recruiter-view/navbar";

export const employeeSchema = z
  .object({
    latestQualification: z
      .string()
      .min(1, "Latest qualification is required")
      .optional()
      .or(z.literal("")),

    latestQualificationName: z
      .string()
      .min(1, "Qualification name is required"),
    joinReason: z.string().min(1, "Join reason is required"),
    monthlyClosures: z
      .number({ invalid_type_error: "Monthly closures must be a number" })
      .optional(),
    jobSource: z.string().min(1, "Job source is required"),
    fatherName: z.string().min(1, "Father name is required"),
    motherName: z.string().min(1, "Mother name is required"),

    references: z
      .array(
        z.object({
          name: z.string().min(1, "Reference name is required"),
          contactNo: z.string().min(1, "Reference contact is required"),
          organization: z.string().min(1, "Reference organization is required"),
          designation: z.string().min(1, "Reference designation is required"),
        })
      )
      .length(2, "Exactly 2 references are required"),

    hasMedicalProblem: z.boolean(),
    medicalProblemDetails: z.string().optional(),
  })
  .refine(
    (data) => {
      // If hasMedicalProblem is true, medicalProblemDetails must not be empty
      if (data.hasMedicalProblem) {
        return (
          data.medicalProblemDetails && data.medicalProblemDetails.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Medical problem details are required",
      path: ["medicalProblemDetails"], // attach error to the field
    }
  );

const QualificationDetails = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    latestQualificationName: "",
    joinReason: "",
    monthlyClosures: 0,
    jobSource: "",
    fatherName: "",
    motherName: "",
    references: [
      {
        name: "",
        contactNo: "",
        organization: "",
        designation: "",
      },
      {
        name: "",
        contactNo: "",
        organization: "",
        designation: "",
      },
    ],
    hasMedicalProblem: "no",
    medicalProblemDetails: "",
  });
  const { mutate, isPending } = useSectoralDetails();
  const { mutate: UploadImage } = useUpload();

  const onSubmit = (e) => {
    e.preventDefault();
    const payLoad = {
      ...formData,
      hasMedicalProblem: formData.hasMedicalProblem === "yes" ? true : false,
    };
    const { isValid, errors } = validateFormData(employeeSchema, payLoad);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(payLoad);
  };
  const handleUpload = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) {
          callback(fileUrl, fileName);
        }
      },
    });
  };
  return (
    <div className="w-full self-stretch lg:px-36 lg:py-[0px] lg:pb-[32px] p-[20px] inline-flex flex-col justify-start items-start lg:gap-2 gap-[10px]">
      <Navbar onlySupport={true} />
      <div className="w-full inline-flex justify-start items-start gap-3">
        <div className="justify-start text-gray-900 lg:text-3xl text-lg font-bold leading-loose">
          Recruiter Profile Setup
        </div>
      </div>
      <div className="w-full h-14 flex flex-col justify-start items-start lg:gap-4 gap-[15px]">
        <div className="justify-start text-gray-900 lg:text-xl text-md font-bold leading-tight">
          Almost there – 75% completed!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="self-stretch flex flex-col justify-start items-start gap-10"
      >
        <div className="w-full flex flex-col gap-[18px]">
          <CommonForm
            formControls={sectoralFieldsForm2}
            formData={formData}
            setFormData={setFormData}
            handleUpload={handleUpload}
            errors={errorMessage}
          />
          {formData.references.map((item, index) => (
            <CommonForm
              key={index}
              i={index}
              formControls={referenceFields}
              formData={formData}
              setFormData={setFormData}
              formType={"references"}
              errors={errorMessage}
            />
          ))}
        </div>
        <div className="self-stretch flex justify-end items-end gap-2.5">
          {/* <PrevButton link={"/recruiter/profile-setup/sectoral-details"} /> */}
          <ButtonComponent
            isPending={isPending}
            color={"#6945ED"}
            buttonText={"Continue"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default QualificationDetails;
