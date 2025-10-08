import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUpload } from "../../../../hooks/common/useUpload";
import { setNestedValue } from "../../../../utils/commonFunctions";
import {
  basicInformation,
  KycVerificationDetails,
  sectoralFieldsForm,
  sectoralFieldsForm2,
} from "../../../../config";

const EditRecruiterForm = ({ recruiter, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (recruiter) {
      setFormData({
        // Basic Information
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
        resume: recruiter.resume || "",

        // KYC and Bank Details
        cancelChequeOrPassbookImage:
          recruiter.cancelChequeOrPassbookImage || "",
        panDetails: recruiter.panDetails || {
          number: "",
          image: "",
        },
        aadharDetails: recruiter.aadharDetails || {
          number: "",
          image: "",
        },
        bankDetails: recruiter.bankDetails || {
          accountNumber: "",
          accountHolderName: "",
          bankName: "",
          ifscCode: "",
          accountType: "saving",
        },

        // Sectoral Information
        sectorSpecialization: recruiter.sectorSpecialization || [],
        totalExperience: recruiter.totalExperience || "",
        experienceLevel: recruiter.experienceLevel || [],
        lastOrganization: recruiter.lastOrganization || {
          name: "",
          position: "",
        },
        relievingLetter: recruiter.relievingLetter || "",
        linkedinProfile: recruiter.linkedinProfile || "",

        // Additional Information
        latestQualifications: recruiter.latestQualifications || "",
        latestQualification: recruiter.latestQualification || "",
        joinReason: recruiter.joinReason || "",
        monthlyClosures: recruiter.monthlyClosures || "",
        jobSource: recruiter.jobSource || "",
        fatherName: recruiter.fatherName || "",
        motherName: recruiter.motherName || "",
        hasMedicalProblem: recruiter.hasMedicalProblem || "no",
        medicalProblemDetails: recruiter.medicalProblemDetails || "",

        // Permanent Address
        permanentAddress: recruiter.permanentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },

        // References
        references: recruiter.references || [
          {
            name: "",
            contactNo: "",
            organization: "",
            designation: "",
          },
        ],
      });
    }
  }, [recruiter]);

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

  const transformFormDataToPayload = (formData) => {
    return {
      // Personal Information
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

      // Professional Information
      companyName: formData.lastOrganization?.name,
      position: formData.lastOrganization?.position,
      about: formData.joinReason,
      experience: formData.totalExperience,
      skills: formData.experienceLevel || [],
      specializations:
        formData.sectorSpecialization?.map((item) =>
          typeof item === "string" ? item : item.name || item.label
        ) || [],
      linkedinProfile: formData.linkedinProfile,

      // Additional Information
      certifications: formData.latestQualification
        ? [
            {
              name: formData.latestQualification,
              issuer: "Not specified",
              date: new Date().toISOString().split("T")[0],
            },
          ]
        : undefined,

      // Password fields (if provided)
      ...(formData.currentPassword &&
        formData.newPassword &&
        formData.confirmPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
    };
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

  // Build sector options from recruiter data to avoid extra fetches
  const sectorOptionsFromRecruiter = Array.isArray(
    recruiter?.sectorSpecialization
  )
    ? recruiter.sectorSpecialization.map((item) => ({
        id: item?.id || item?._id || item?.name,
        label: item?.name || item?.label || "",
      }))
    : [];

  const updatedSectorFields = sectoralFieldsForm.map((field) =>
    field.name === "sectorSpecialization"
      ? { ...field, options: sectorOptionsFromRecruiter }
      : field
  );

  // References section is intentionally removed in edit mode

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
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInformation}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* KYC and Bank Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              KYC & Bank Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={KycVerificationDetails}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Sectoral Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={updatedSectorFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={sectoralFieldsForm2}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* References section removed */}

          {/* Action Buttons */}
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
