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

const formSchema = z.object({
  sectorSpecialization: z
    .array(z.string().min(1, "Sector name cannot be empty"))
    .min(1, "At least one sector specialization is required"),

  totalExperience: z
    .number()
    .min(0, "Total experience cannot be negative")
    .optional(), // You can remove optional if it's required

  experienceLevel: z
    .array(z.string().min(1))
    .min(1, "At least 1 experience levels is required"),

  permanentAddress: z.object({
    address: z.string().min(1, "Permanent address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),

  lastOrganization: z.object({
    name: z.string().min(1, "Organization name is required"),
    position: z.string().min(1, "Position is required"),
    employmentType: z.string().optional(),
    startYear: z.number().int(),
  }),

  relievingLetter: z
    .string()
    .min(1, "Relieving Letter is required")
    .url("Relieving letter must be a valid URL"),

  linkedinProfile: z
    .string()
    .url("Linkedin profile must be a valid URL")
    .or(z.literal("")), // allow empty string or valid URL
});

const SectoralDetails = () => {
  const [formData, setFormData] = useState({
    sectorSpecialization: [],
    totalExperience: 0,
    experienceLevel: [],
    lastOrganization: {
      name: "",
      position: "",
      employmentType: "",
      startYear: 0,
    },
    permanentAddress: {
      address: "",
      city: "",
      pincode: "",
      state: "",
    },
    relievingLetter: "",
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
    const isValid = validateFormData(formSchema, payload);
    if (!isValid) return;
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
          />
        </div>
        <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
          <ButtonComponent
            isPending={isPending}
            color={"#6945ED"}
            buttonText={"Save & Update Profile"}
          />
        </div>
      </form>
    </div>
  );
};

export default SectoralDetails;
