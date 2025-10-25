import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUploadFile } from "../../../../hooks/super-admin/useUploadFile";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";
import { COMPANY_TYPES } from "@/constants/super-admin";

const EditCompanyForm = ({ company, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUploadFile();
  const { data: industriesDropdown } = useGetDropdownValues("industries");
  const industryOptions =
    industriesDropdown?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];
  useEffect(() => {
    if (company) {
      setFormData({
        basicInformation: {
          companyName: company.basicInformation?.companyName || "",
          websiteURL: company.basicInformation?.websiteURL || "",
          companyType: company.basicInformation?.companyType || "",
          companyLogo: company.basicInformation?.companyLogo || "",
          companyEmail: company.basicInformation?.companyEmail || "",
        },
        spocInformation: {
          fullName: company.spocInformation?.fullName || "",
          contactNumber: company.spocInformation?.contactNumber || {
            number: "",
            countryCode: "+91",
          },
          email: company.spocInformation?.email || "",
        },
        companyDetails: {
          currentAddress: company.companyDetails?.currentAddress || "",
          city: company.companyDetails?.city || "",
          state: company.companyDetails?.state || "",
          pincode: company.companyDetails?.pincode || "",
          industryType:
            company.companyDetails?.industryType || company.industryType || "",
          panCardNumber: company.companyDetails?.panCardNumber || "",
          panCardFile: company.companyDetails?.panCardFile || "",
          gstin: company.companyDetails?.gstin || "",
          bankName: company.companyDetails?.bankName || "",
          bankAccountNumber: company.companyDetails?.bankAccountNumber || "",
          ifscCode: company.companyDetails?.ifscCode || "",
          chequeOrStatementFile:
            company.companyDetails?.chequeOrStatementFile || "",
        },
      });
    }
  }, [company]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const basicInfoControls = [
    {
      name: "basicInformation.companyName",
      label: "Company Name",
      placeholder: "Enter company name",
      componentType: "input",
      type: "text",
    },
    {
      name: "basicInformation.websiteURL",
      label: "Website URL",
      componentType: "input",
      type: "text",
      placeholder: "Enter Website URL",
    },
    {
      name: "basicInformation.companyType",
      label: "Company Type",
      componentType: "select",
      placeholder: "Select a type",
      options: COMPANY_TYPES,
    },
    {
      name: "basicInformation.companyLogo",
      label: "Company Logo",
      placeholder: "Upload company logo",
      componentType: "file",
      accept: "image",
      formats: "PNG, JPG",
    },
    {
      name: "basicInformation.companyEmail",
      label: "Company Email",
      placeholder: "Enter company email",
      componentType: "input",
      type: "email",
    },
  ];

  const spocControls = [
    {
      name: "spocInformation.fullName",
      label: "Company Owner",
      componentType: "input",
      type: "text",
      placeholder: "Enter full name",
    },
    {
      name: "spocInformation.contactNumber",
      label: "Mobile Number",
      componentType: "phone",
      placeholder: "Ex. XXXXXXXXXX",
    },
    {
      name: "spocInformation.email",
      label: "Email",
      componentType: "input",
      type: "email",
      placeholder: "Enter email",
    },
  ];

  const companyDetailsControls = [
    {
      label: "Company Address",
      name: "companyDetails.currentAddress",
      placeholder: "Enter company address",
      componentType: "textarea",
    },
    {
      label: "City",
      name: "companyDetails.city",
      placeholder: "Enter city",
      componentType: "input",
      type: "text",
    },
    {
      label: "State",
      name: "companyDetails.state",
      placeholder: "Enter state",
      componentType: "input",
      type: "text",
    },
    {
      label: "Pincode",
      name: "companyDetails.pincode",
      placeholder: "Enter pincode",
      componentType: "input",
      type: "text",
    },
    {
      label: "Industry Type",
      name: "companyDetails.industryType",
      placeholder: "Select industry type",
      componentType: "select",
      options: industryOptions,
    },
    {
      label: "PAN Card Number",
      name: "companyDetails.panCardNumber",
      placeholder: "Enter PAN Card Number",
      componentType: "input",
      type: "text",
    },
    {
      label: "PAN Card Image",
      name: "companyDetails.panCardFile",
      placeholder: "Upload PAN Card Image",
      componentType: "file",
      accept: "image",
      formats: "PNG, JPG",
    },
    {
      label: "GSTIN",
      name: "companyDetails.gstin",
      placeholder: "Enter GSTIN",
      componentType: "input",
      type: "text",
    },
  ];

  const bankDetailsControls = [
    {
      label: "Bank Name",
      name: "companyDetails.bankName",
      placeholder: "Enter Bank Name",
      componentType: "input",
      type: "text",
    },
    {
      label: "Bank Account Number",
      name: "companyDetails.bankAccountNumber",
      placeholder: "Enter Account Number",
      componentType: "input",
      type: "text",
    },
    {
      label: "IFSC Code",
      name: "companyDetails.ifscCode",
      placeholder: "Enter IFSC Code",
      componentType: "input",
      type: "text",
    },
    {
      label: "Cancel Cheque / Account Statement",
      name: "companyDetails.chequeOrStatementFile",
      placeholder: "Upload Cheque / Statement",
      componentType: "file",
      accept: "pdf",
      formats: "PDF",
    },
  ];

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="w-full max-w-none">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Company Profile
          </h2>
          <p className="text-gray-600">
            Update company information and details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInfoControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Company Owner Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Company Owner Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={spocControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Company Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={companyDetailsControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bank Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={bankDetailsControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
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
              buttonText={isSubmitting ? "Updating..." : "Update Company"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyForm;
