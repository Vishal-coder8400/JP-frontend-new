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
        name: "profileImage",
        label: "Profile Image",
        placeholder: "Upload Profile Image",
        componentType: "file",
        accept: "image",
      },
      {
        name: "location",
        label: "Location",
        placeholder: "Enter location",
        componentType: "input",
        type: "text",
      },
    ],
  },
];

const trainerProfessionalInfo = [
  {
    name: "bio",
    label: "Bio",
    placeholder: "Enter your bio",
    componentType: "textarea",
    rows: 4,
  },
  {
    row: [
      {
        name: "specialization",
        label: "Specialization",
        placeholder: "Enter specialization",
        componentType: "input",
        type: "text",
      },
      {
        name: "experience",
        label: "Experience (years)",
        placeholder: "Enter years of experience",
        componentType: "input",
        type: "number",
      },
    ],
  },
  {
    row: [
      {
        name: "linkedinProfile",
        label: "LinkedIn Profile",
        placeholder: "Enter LinkedIn profile URL",
        componentType: "input",
        type: "text",
      },
      {
        name: "portfolio",
        label: "Portfolio",
        placeholder: "Enter portfolio URL",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    name: "website",
    label: "Website",
    placeholder: "Enter website URL",
    componentType: "input",
    type: "text",
  },
  {
    name: "expertise",
    label: "Skills",
    placeholder: "Enter skills separated by commas",
    componentType: "input",
    type: "text",
  },
];

const trainerTrainingInfo = [
  {
    row: [
      {
        name: "teachingExperience",
        label: "Teaching Experience (years)",
        placeholder: "Enter teaching experience",
        componentType: "input",
        type: "number",
      },
      {
        name: "hourlyRate",
        label: "Hourly Rate",
        placeholder: "Enter hourly rate",
        componentType: "input",
        type: "number",
      },
    ],
  },
  {
    name: "teachingStyle",
    label: "Teaching Style",
    placeholder: "Describe your teaching style",
    componentType: "textarea",
    rows: 3,
  },
];

const EditTrainerForm = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (trainer) {
      setFormData({
        firstName: trainer.firstName || "",
        lastName: trainer.lastName || "",
        email: trainer.email || "",
        phoneNumber: trainer.phoneNumber || trainer.phone || "",
        profileImage: trainer.profileImage || trainer.profilePicture || "",
        location: trainer.location || trainer.address || "",
        bio: trainer.bio || "",
        specialization: trainer.specialization || "",
        experience: trainer.experience || "",
        expertise: Array.isArray(trainer.expertise)
          ? trainer.expertise.join(", ")
          : trainer.expertise || "",
        linkedinProfile: trainer.linkedinProfile || trainer.linkedin || "",
        portfolio: trainer.portfolio || "",
        website: trainer.website || "",
        teachingExperience: trainer.teachingExperience || "",
        teachingStyle: trainer.teachingStyle || "",
        hourlyRate: trainer.hourlyRate || "",
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
      const payload = {
        // Personal Information
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email || "",
        phoneNumber: formData.phoneNumber || "",
        profileImage: formData.profileImage || "",
        location: formData.location || "",

        // Professional Information
        bio: formData.bio || "",
        specialization: formData.specialization || "",
        experience: formData.experience
          ? parseInt(formData.experience)
          : undefined,
        skills: formData.expertise
          ? formData.expertise
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        linkedinProfile: formData.linkedinProfile || "",
        portfolio: formData.portfolio || "",
        website: formData.website || "",

        // Training Information
        teachingExperience: formData.teachingExperience
          ? parseInt(formData.teachingExperience)
          : undefined,
        teachingStyle: formData.teachingStyle || "",
        hourlyRate: formData.hourlyRate
          ? parseFloat(formData.hourlyRate)
          : undefined,
      };

      // Remove undefined values to keep payload clean
      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined || payload[key] === "") {
          delete payload[key];
        }
      });

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

          {/* Training Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Training Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainerTrainingInfo}
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
