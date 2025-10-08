import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUpload } from "../../../../hooks/common/useUpload";

const EditCompanyForm = ({ company, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUpload();

  useEffect(() => {
    if (company) {
      setFormData({
        basicInformation: {
          companyName:
            company.basicInformation?.companyName || company.companyName || "",
          websiteURL:
            company.basicInformation?.websiteURL || company.websiteURL || "",
          companyType:
            company.basicInformation?.companyType || company.companyType || "",
        },
        spocInformation: {
          fullName: company.spocInformation?.fullName || company.spocName || "",
          contactNumber: company.spocInformation?.contactNumber ||
            company.spocContactNumber || {
              number: "",
              countryCode: "+91",
            },
        },
        companyDetails: {
          currentAddress:
            company.companyDetails?.currentAddress ||
            company.currentAddress ||
            "",
          industryType:
            company.companyDetails?.industryType || company.industryType || "",
          panCardNumber:
            company.companyDetails?.panCardNumber ||
            company.panCardNumber ||
            "",
          gstin: company.companyDetails?.gstin || company.gstin || "",
          bankName:
            company.companyDetails?.bankName ||
            company.bankDetails?.bankName ||
            "",
          bankAccountNumber:
            company.companyDetails?.bankAccountNumber ||
            company.bankDetails?.accountNumber ||
            "",
          chequeOrStatementFile:
            company.companyDetails?.chequeOrStatementFile ||
            company.cancelChequeOrPassbookImage ||
            "",
        },
      });
    }
  }, [company]);

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
      options: [
        { id: "privateCompany", label: "Private company" },
        { id: "proprietorship", label: "Proprietorship" },
        { id: "lld", label: "LLD" },
      ],
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
  ];

  const companyDetailsControls = [
    {
      label: "Company Address",
      name: "companyDetails.currentAddress",
      placeholder: "Enter company address",
      componentType: "textarea",
    },
    {
      label: "Industry Type",
      name: "companyDetails.industryType",
      placeholder: "Select industry type",
      componentType: "select",
      options: [
        { id: "manufacturing", label: "Manufacturing" },
        { id: "services", label: "Services" },
        { id: "trading", label: "Trading" },
        { id: "other", label: "Other" },
      ],
    },
    {
      label: "PAN Card Number",
      name: "companyDetails.panCardNumber",
      placeholder: "Enter PAN Card Number",
      componentType: "input",
      type: "text",
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
      label: "Cancel Cheque / Account Statement",
      name: "companyDetails.chequeOrStatementFile",
      placeholder: "Upload Cheque / Statement",
      componentType: "file",
      formats: "JPG, PNG, PDF.",
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
