import { useState } from "react";
import CommonForm from "../../components/common/form";
import { sectoralFieldsForm } from "../../config";
import { useSectoralDetails } from "../../hooks/recruiter/useProfile";
import { useSectorOptions } from "../../hooks/recruiter/useSectoralOption";
import { z } from "zod";
import { validateFormData } from "../../utils/commonFunctions";
import ButtonComponent from "../../components/common/button";
import { useUpload } from "../../hooks/common/useUpload";
import Navbar from "../../components/recruiter-view/navbar";

export const profileSchema = z.object({
  sectorSpecialization: z
    .array(z.string().min(1, "Sector specialization cannot be empty"))
    .min(1, "At least 1 sector specialization is required")
    .max(3, "You can select up to 3 sector specializations"),

  totalExperience: z
    .number({ invalid_type_error: "Total experience is required" })
    .min(0, "Experience cannot be negative"),

  experienceLevel: z
    .array(z.string().min(1, "Experience level cannot be empty"))
    .min(1, "At least 1 experience level is required")
    .max(2, "You can select up to 2 experience levels"),

  lastOrganization: z.object({
    name: z.string().min(1, "Organization name is required"),
    position: z.string().min(1, "Position is required"),
  }),

  permanentAddress: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(1, "Pincode is required"),
    state: z.string().min(1, "State is required"),
  }),

  relievingLetter: z
    .string()
    .url("Relieving letter must be a valid URL")
    .optional()
    .or(z.literal("")),

  linkedinProfile: z
    .string()
    .min(1, "LinkedIn profile is required")
    .url("LinkedIn profile must be a valid URL"),
});

const SectoralDetails = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    sectorSpecialization: [],
    totalExperience: null,
    experienceLevel: [],
    lastOrganization: {
      name: "",
      position: "",
    },
    permanentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    linkedinProfile: "",
  });

  const { data: sectorOptions = [], isLoading, error } = useSectorOptions();
  const updatedFields = sectoralFieldsForm.map((field) =>
    field.name === "sectorSpecialization"
      ? { ...field, options: sectorOptions }
      : field
  );
  const { mutate, isPending } = useSectoralDetails();
  const { mutate: UploadImage } = useUpload();
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      sectorSpecialization: formData.sectorSpecialization.map(
        (option) => option.id
      ),
      experienceLevel: formData.experienceLevel.map((ex) => ex.id),
    };
    const { isValid, errors } = validateFormData(profileSchema, payload);
    if (!isValid) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage({});
    mutate(payload);
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
      <div className="w-full flex justify-start items-start gap-3">
        <div className="justify-start text-gray-900 lg:text-3xl text-lg font-bold leading-loose">
          Recruiter Profile Setup
        </div>
      </div>
      <div className="w-full h-14 flex flex-col justify-start items-start lg:gap-4 gap-[15px]">
        <div className="justify-start text-gray-900 lg:text-xl text-md font-bold leading-tight">
          Almost there – 50% completed!
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-lime-600 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
          <div className="flex-1 h-2 bg-zinc-300 rounded-xl" />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="self-stretch flex flex-col justify-start items-start gap-10"
      >
        <div className="w-full">
          <CommonForm
            formControls={updatedFields}
            formData={formData}
            setFormData={setFormData}
            handleUpload={handleUpload}
            errors={errorMessage}
          />
        </div>
        <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
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

export default SectoralDetails;
