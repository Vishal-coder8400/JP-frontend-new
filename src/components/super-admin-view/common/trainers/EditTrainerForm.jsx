import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUpload } from "../../../../hooks/common/useUpload";

const trainerPersonalInfo = [
  {
    row: [
      {
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
        componentType: "input",
        type: "text",
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter last name",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "email",
        label: "Email",
        placeholder: "Enter email address",
        componentType: "input",
        type: "email",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "Enter phone number",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "fatherName",
        label: "Father Name",
        placeholder: "Enter father name",
        componentType: "input",
        type: "text",
      },
      {
        name: "motherName",
        label: "Mother Name",
        placeholder: "Enter mother name",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "profileImage",
        label: "Profile Image",
        placeholder: "Upload Profile Image",
        componentType: "file",
        accept: "image",
      },
      {
        name: "hasMedicalProblem",
        label: "Any Medical Problem",
        componentType: "select",
        options: [
          { label: "No", value: false },
          { label: "Yes", value: true },
        ],
      },
    ],
  },
  {
    name: "currentAddress",
    label: "Address",
    placeholder: "Enter current address",
    componentType: "textarea",
    rows: 2,
  },
];

const trainerProfessionalInfo = [
  {
    row: [
      {
        name: "totalYearsExperience",
        label: "Total Years Experience",
        placeholder: "Enter years of experience",
        componentType: "input",
        type: "number",
      },
      {
        name: "linkedin",
        label: "LinkedIn",
        placeholder: "Enter LinkedIn profile URL",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "latestQualification",
        label: "Latest Qualification",
        placeholder: "Enter latest qualification",
        componentType: "input",
        type: "text",
      },
      {
        name: "lastOrganizationName",
        label: "Last Organization Name",
        placeholder: "Enter last organization name",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "lastDesignation",
        label: "Designation in Last Organization",
        placeholder: "Enter last designation",
        componentType: "input",
        type: "text",
      },
      {
        name: "averageMonthlySessions",
        label: "Average Monthly Sessions",
        placeholder: "Enter average monthly sessions",
        componentType: "input",
        type: "number",
      },
    ],
  },
  {
    name: "expertiseAreas",
    label: "Expertise Areas",
    placeholder: "Enter expertise areas separated by commas",
    componentType: "input",
    type: "text",
  },
  {
    name: "certifications",
    label: "Certifications",
    placeholder: "Enter certifications separated by commas",
    componentType: "input",
    type: "text",
  },
  {
    name: "professionalAchievements",
    label: "Professional Achievements",
    placeholder: "Enter professional achievements",
    componentType: "textarea",
    rows: 3,
  },
];

const trainerAdditionalInfo = [
  {
    name: "whyProceedWithGigTraining",
    label: "Why do you want to proceed with this Gig Training assignment?",
    placeholder: "Enter your reason",
    componentType: "textarea",
    rows: 3,
  },
  {
    name: "howDidYouKnowAboutOpportunity",
    label: "How did you come to know about this opportunity?",
    placeholder: "Enter your response",
    componentType: "textarea",
    rows: 2,
  },
];

const EditTrainerForm = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (trainer) {
      const phoneNumber =
        typeof trainer.phoneNumber === "object"
          ? `${trainer.phoneNumber?.countryCode || ""} ${
              trainer.phoneNumber?.number || ""
            }`
          : trainer.phoneNumber || "";

      setFormData({
        firstName: trainer.firstName || "",
        lastName: trainer.lastName || "",
        email: trainer.email || "",
        phoneNumber: phoneNumber,
        fatherName: trainer.fatherName || "",
        motherName: trainer.motherName || "",
        profileImage: trainer.profileImage || "",
        hasMedicalProblem: trainer.hasMedicalProblem || false,
        currentAddress:
          trainer.currentAddress || trainer.permanentAddress || "",
        totalYearsExperience: trainer.totalYearsExperience || "",
        linkedin: trainer.linkedin || "",
        latestQualification: trainer.latestQualification || "",
        lastOrganizationName:
          trainer.WorkingDetails?.lastOrganizationName || "",
        lastDesignation: trainer.WorkingDetails?.lastDesignation || "",
        averageMonthlySessions: trainer.averageMonthlySessions || "",
        expertiseAreas: Array.isArray(trainer.expertiseAreas)
          ? trainer.expertiseAreas.join(", ")
          : "",
        certifications: Array.isArray(trainer.certifications)
          ? trainer.certifications.join(", ")
          : "",
        professionalAchievements: trainer.professionalAchievements || "",
        whyProceedWithGigTraining: trainer.whyProceedWithGigTraining || "",
        howDidYouKnowAboutOpportunity:
          trainer.howDidYouKnowAboutOpportunity || "",
      });
    }
  }, [trainer]);

  const handleUpload = (file, callback) => {
    uploadFile(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) {
          callback(fileUrl, fileName);
        }
      },
      onError: (error) => {
        console.error("Upload error:", error);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {};

      if (formData.firstName) payload.firstName = formData.firstName;
      if (formData.lastName) payload.lastName = formData.lastName;
      if (formData.email) payload.email = formData.email;
      if (formData.phoneNumber) payload.phoneNumber = formData.phoneNumber;
      if (formData.fatherName) payload.fatherName = formData.fatherName;
      if (formData.motherName) payload.motherName = formData.motherName;
      if (formData.profileImage) payload.profileImage = formData.profileImage;
      if (formData.hasMedicalProblem !== undefined)
        payload.hasMedicalProblem = formData.hasMedicalProblem;
      if (formData.currentAddress)
        payload.currentAddress = formData.currentAddress;

      if (formData.totalYearsExperience) {
        payload.totalYearsExperience = parseInt(formData.totalYearsExperience);
      }

      if (formData.linkedin) payload.linkedin = formData.linkedin;
      if (formData.latestQualification)
        payload.latestQualification = formData.latestQualification;

      if (formData.lastOrganizationName || formData.lastDesignation) {
        payload.WorkingDetails = {};
        if (formData.lastOrganizationName)
          payload.WorkingDetails.lastOrganizationName =
            formData.lastOrganizationName;
        if (formData.lastDesignation)
          payload.WorkingDetails.lastDesignation = formData.lastDesignation;
      }

      if (formData.averageMonthlySessions) {
        payload.averageMonthlySessions = parseInt(
          formData.averageMonthlySessions
        );
      }

      if (formData.expertiseAreas) {
        const areas = formData.expertiseAreas
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        if (areas.length > 0) payload.expertiseAreas = areas;
      }

      if (formData.certifications) {
        const certs = formData.certifications
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        if (certs.length > 0) payload.certifications = certs;
      }

      if (formData.professionalAchievements)
        payload.professionalAchievements = formData.professionalAchievements;
      if (formData.whyProceedWithGigTraining)
        payload.whyProceedWithGigTraining = formData.whyProceedWithGigTraining;
      if (formData.howDidYouKnowAboutOpportunity)
        payload.howDidYouKnowAboutOpportunity =
          formData.howDidYouKnowAboutOpportunity;

      await onSave(payload);
    } catch (error) {
      console.error("Error updating trainer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Trainer Profile
          </h2>
          <p className="text-gray-600">
            Update trainer information and details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainerPersonalInfo}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainerProfessionalInfo}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainerAdditionalInfo}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              buttonText={isSubmitting ? "Updating..." : "Update Trainer"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerForm;
