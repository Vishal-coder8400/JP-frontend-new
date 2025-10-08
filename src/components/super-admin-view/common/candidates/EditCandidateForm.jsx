import { useEffect, useState } from "react";
import CommonForm from "@/components/common/form";
import ButtonComponent from "@/components/common/button";
import {
  jobSeekerBasicDetails,
  workExperienceFormControls,
  roleExpertiseFormControls,
  additionalDetailsJobSeeker,
  additionalDetailsJobSeeker2,
  additionalDetailsJobSeeker3,
  jobSeekerEducationFormControls,
  certificateFormControls,
} from "@/config";
import { useUpload } from "@/hooks/common/useUpload";

const EditCandidateForm = ({ candidate, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (!candidate) return;

    setFormData({
      // Basic Details
      name: candidate?.data?.name || candidate?.name || "",
      birthDate: candidate?.data?.birthDate || candidate?.birthDate || "",
      phone: candidate?.data?.phone ||
        candidate?.phone || { countryCode: "+91", number: "" },
      email: candidate?.data?.email || candidate?.email || "",
      password: "",
      confirmPassword: "",
      bio: candidate?.data?.bio || candidate?.bio || candidate?.summary || "",
      profilePicture:
        candidate?.data?.profilePicture || candidate?.profilePicture || "",
      currentAddress: candidate?.data?.currentAddress ||
        candidate?.currentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
      permanentAddress: candidate?.data?.permanentAddress ||
        candidate?.permanentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
      gender: candidate?.data?.gender || candidate?.gender || "",
      resume: candidate?.data?.resume || candidate?.resume || "",
      currentWorkingStatus:
        candidate?.data?.currentWorkingStatus ||
        candidate?.currentWorkingStatus ||
        "",

      // Working Details
      totalExperience:
        candidate?.data?.totalExperience || candidate?.totalExperience || "",
      totalExperienceInMonth:
        candidate?.data?.totalExperienceInMonth ||
        candidate?.totalExperienceInMonth ||
        "",
      position: candidate?.data?.position || candidate?.position || "",
      employmentType:
        candidate?.data?.employmentType || candidate?.employmentType || "",
      startingYear:
        candidate?.data?.startingYear || candidate?.startingYear || "",
      endingYear: candidate?.data?.endingYear || candidate?.endingYear || "",
      skillSet: candidate?.data?.skillSet || candidate?.skills || [],

      // Role & Expertise
      roleLookingFor:
        candidate?.data?.roleLookingFor || candidate?.roleLookingFor || "",
      currentIndustry:
        candidate?.data?.currentIndustry || candidate?.currentIndustry || "",
      areaOfExpertise:
        candidate?.data?.areaOfExpertise || candidate?.areaOfExpertise || [],
      functionalAreas:
        candidate?.data?.functionalAreas || candidate?.functionalAreas || [],
      location:
        candidate?.data?.location ||
        candidate?.preferredWorkLocation ||
        candidate?.preferredLocation ||
        [],

      // Additional Details
      maritalStatus:
        candidate?.data?.maritalStatus || candidate?.maritalStatus || "",
      handleTeam: candidate?.data?.handleTeam || candidate?.handleTeam || "",
      willingTo6DayWork:
        candidate?.data?.willingTo6DayWork ||
        candidate?.willingTo6DayWork ||
        "",
      willingToRelocate:
        candidate?.data?.willingToRelocate ||
        candidate?.willingToRelocate ||
        "",
      earlyStageStartup:
        candidate?.data?.earlyStageStartup ||
        candidate?.earlyStageStartup ||
        "",
      differentlyAbled:
        candidate?.data?.differentlyAbled || candidate?.differentlyAbled || "",
      medicalProblem:
        candidate?.data?.medicalProblem || candidate?.medicalProblem || "",
      willingToTravel:
        candidate?.data?.willingToTravel || candidate?.willingToTravel || "",
      languages: candidate?.data?.languages || candidate?.languages || [],

      // Salary & Notice Period
      noticePeriod:
        candidate?.data?.noticePeriod || candidate?.noticePeriod || "",
      currentSalary:
        candidate?.data?.currentSalary || candidate?.currentSalary || "",
      expectedSalary:
        candidate?.data?.expectedSalary || candidate?.expectedSalary || "",

      // Education & Certifications
      education: candidate?.data?.education || candidate?.education || [],
      certifications:
        candidate?.data?.certifications || candidate?.certifications || [],
    });
  }, [candidate]);

  const handleUpload = (file, callback) => {
    uploadFile(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) callback(fileUrl, fileName);
      },
      onError: () => {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      delete payload.password;
      delete payload.confirmPassword;
      await onSave(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Candidate
          </h2>
          <p className="text-gray-600">Update candidate profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={jobSeekerBasicDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Working Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Professional Experience
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={workExperienceFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Role & Expertise */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Role & Expertise</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={roleExpertiseFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={additionalDetailsJobSeeker}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
              <CommonForm
                formControls={additionalDetailsJobSeeker2}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
              <CommonForm
                formControls={additionalDetailsJobSeeker3}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={jobSeekerEducationFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={certificateFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <ButtonComponent
              type="button"
              color="gray"
              buttonText="Cancel"
              onClick={onClose}
              className="px-6 py-2"
            />
            <ButtonComponent
              type="submit"
              color="#6945ED"
              buttonText={isSubmitting ? "Updating..." : "Update Candidate"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidateForm;
