import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUploadFile } from "../../../../hooks/super-admin/useUploadFile";
import { INDUSTRIES } from "@/constants/super-admin";

const EditRecruiterForm = ({ recruiter, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUploadFile();

  const basicInfoFields = [
    {
      row: [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter First Name",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter Last Name",
          componentType: "input",
          type: "text",
          width: "2/3",
        },
        {
          name: "profileImage",
          label: "",
          placeholder: "Profile Picture",
          componentType: "file",
          type: "file",
          width: "1/3",
          accept: "image",
        },
      ],
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      componentType: "input",
      type: "email",
    },
    {
      name: "phone",
      label: "Contact Information",
      placeholder: "Ex. XXXXX XXXXX",
      componentType: "phone",
      type: "number",
    },
    {
      name: "currentAddress.address",
      label: "Current Address",
      placeholder: "Enter Address",
      componentType: "textarea",
      type: "text",
    },
    {
      row: [
        {
          name: "currentAddress.city",
          label: "",
          placeholder: "Enter City",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "currentAddress.state",
          label: "",
          placeholder: "Enter State",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "currentAddress.pincode",
          label: "",
          placeholder: "Enter Pincode",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
      ],
    },
  ];

  const documentsFields = [
    {
      name: "documents.panCard",
      label: "PAN Card",
      placeholder: "Upload PAN Card",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.aadharCard",
      label: "Aadhar Card",
      placeholder: "Upload Aadhar Card",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.cancelledCheque",
      label: "Cancel Cheque",
      placeholder: "Upload Cancel Cheque",
      componentType: "file",
      accept: "image",
    },
    {
      name: "documents.relievingLetter",
      label: "Relieving Letter",
      placeholder: "Upload Relieving Letter",
      componentType: "file",
      accept: "pdf",
    },
    {
      name: "latestQualification",
      label: "Latest Qualification",
      placeholder: "Upload Latest Qualification",
      componentType: "file",
      accept: "pdf",
    },
  ];

  const professionalFields = [
    {
      name: "sectorSpecialization",
      label: "Sectoral Specialization",
      componentType: "multi-select",
      max: 3,
      options: INDUSTRIES,
    },
    {
      name: "totalExperience",
      label: "Total Years of Experience (In years)",
      componentType: "input",
      type: "number",
      placeholder: "e.g. 5",
    },
    {
      name: "experienceLevel",
      label: "Expertise in",
      componentType: "multi-select",
      max: 3,
      options: [
        { id: "frontline", label: "Frontline Hirings" },
        { id: "midlevel", label: "Mid Level Hirings" },
        { id: "senior", label: "Senior Level Hirings" },
      ],
    },
    {
      name: "lastOrganization.name",
      label: "Last Organization Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Organization Name",
    },
    {
      name: "lastOrganization.position",
      label: "Designation in Last Organization",
      componentType: "input",
      type: "text",
      placeholder: "Enter Designation",
    },
    {
      name: "linkedinProfile",
      label: "LinkedIn Profile URL",
      componentType: "input",
      type: "url",
      placeholder: "Enter LinkedIn URL",
    },
  ];

  const additionalInfoFields = [
    {
      name: "fatherName",
      label: "Father's Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Father's Name",
    },
    {
      name: "motherName",
      label: "Mother's Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Mother's Name",
    },
    {
      name: "medicalProblemDetails",
      label: "Medical Problem Details",
      componentType: "textarea",
      placeholder: "Enter medical problem details or leave blank if none",
    },
  ];

  useEffect(() => {
    if (recruiter) {
      setFormData({
        firstName: recruiter.firstName || "",
        lastName: recruiter.lastName || "",
        email: recruiter.email || "",
        profileImage: recruiter.profileImage || "",
        phone: recruiter.phone || {
          number: "",
          countryCode: "+91",
        },
        currentAddress: recruiter.currentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
        documents: recruiter.documents || {
          panCard: "",
          aadharCard: "",
          cancelledCheque: "",
          relievingLetter: "",
        },
        sectorSpecialization: recruiter.sectorSpecialization || [],
        totalExperience: recruiter.totalExperience || "",
        experienceLevel: recruiter.experienceLevel || [],
        lastOrganization: recruiter.lastOrganization || {
          name: "",
          position: "",
        },
        linkedinProfile: recruiter.linkedinProfile || "",
        latestQualification: recruiter.latestQualification || "",
        fatherName: recruiter.fatherName || "",
        motherName: recruiter.motherName || "",
        medicalProblemDetails: recruiter.medicalProblemDetails || "",
      });
    }
  }, [recruiter]);

  const handleUpload = (file, callback) => {
    uploadFile(
      { file, role: "super-admin", folder: "documents" },
      {
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
      }
    );
  };

  const transformFormDataToPayload = (formData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber:
        formData.phone?.countryCode && formData.phone?.number
          ? `${formData.phone.countryCode}${formData.phone.number}`
          : undefined,
      profilePicture: formData.profileImage,
      location:
        formData.currentAddress?.city && formData.currentAddress?.state
          ? `${formData.currentAddress.city}, ${formData.currentAddress.state}`
          : formData.currentAddress?.city || formData.currentAddress?.state,
      companyName: formData.lastOrganization?.name,
      position: formData.lastOrganization?.position,
      experience: formData.totalExperience,
      skills: formData.experienceLevel || [],
      specializations:
        formData.sectorSpecialization?.map((item) =>
          typeof item === "string" ? item : item.name || item.label
        ) || [],
      linkedinProfile: formData.linkedinProfile,
    };

    if (formData.documents) {
      payload.documents = formData.documents;
    }
    if (formData.latestQualification) {
      payload.latestQualification = formData.latestQualification;
    }
    if (formData.fatherName) {
      payload.fatherName = formData.fatherName;
    }
    if (formData.motherName) {
      payload.motherName = formData.motherName;
    }
    if (formData.medicalProblemDetails) {
      payload.medicalProblemDetails = formData.medicalProblemDetails;
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = transformFormDataToPayload(formData);
      await onSave(payload);
    } catch (error) {
      console.error("Error updating recruiter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatedProfessionalFields = professionalFields;

  return (
    <div className="w-full h-screen p-6 bg-white overflow-y-auto overscroll-contain">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Recruiter Profile
          </h2>
          <p className="text-gray-600">
            Update recruiter information and details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInfoFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Documents
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={documentsFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={updatedProfessionalFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={additionalInfoFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
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
              buttonText={isSubmitting ? "Updating..." : "Update Recruiter"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecruiterForm;
