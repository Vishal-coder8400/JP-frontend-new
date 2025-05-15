import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import CommonForm from "../../components/common/form";
import { sectoralFieldsForm } from "../../config";
import { useSectoralDetails } from "../../hooks/useProfile";
import { useSectorOptions } from "../../hooks/useSectoralOption";

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
    relievingLetter: "https://example.com/relieving-letter.pdf",
    linkedinProfile: "",
  });
  const { data: sectorOptions = [], isLoading, error } = useSectorOptions();
  const updatedFields = sectoralFieldsForm.map((field) =>
    field.name === "sectorSpecialization"
      ? { ...field, options: sectorOptions }
      : field
  );
  const { mutate, isPending } = useSectoralDetails();
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      sectorSpecialization: formData.sectorSpecialization.map(
        (option) => option.id
      ),
    };
    mutate(payload);
  };
  return (
    <div className="w-full self-stretch lg:px-36 lg:py-14 p-[20px] inline-flex flex-col justify-start items-start lg:gap-2 gap-[10px]">
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
          />
        </div>
        <div className="self-stretch flex flex-col justify-end items-end gap-2.5">
          <Button className="cursor-pointer w-64 px-5 py-2.5 bg-[#6945ED] rounded-3xl inline-flex justify-center items-center gap-2.5">
            <div className="justify-start text-white text-sm font-medium capitalize">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-2 w-2" /> Please wait
                </span>
              ) : (
                "Save & Update Profile"
              )}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SectoralDetails;
