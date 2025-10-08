import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUpload } from "../../../../hooks/common/useUpload";
import { setNestedValue } from "../../../../utils/commonFunctions";
import {
  basicCorporateInformation,
  basicInformationControls,
  spocInformationControls,
  corporateFormControls,
  formControlsForIndividual,
  formControlsBankDetails,
} from "../../../../config";

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
          companyLogo:
            company.basicInformation?.companyLogo ||
            company.companyLogo ||
            company.logo ||
            "",
          companyContactNumber: company.basicInformation
            ?.companyContactNumber ||
            company.companyContactNumber || {
              number: "",
              countryCode: "+91",
            },
          companyEmail:
            company.basicInformation?.companyEmail ||
            company.companyEmail ||
            "",
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
          email: company.spocInformation?.email || company.spocEmail || "",
        },
        currentAddress: company.companyDetails?.currentAddress ||
          company.currentAddress || {
            address: "",
            city: "",
            state: "",
            pincode: "",
          },
        industryType:
          company.companyDetails?.industryType || company.industryType || "",
        panCardNumber:
          company.companyDetails?.panCardNumber || company.panCardNumber || "",
        panCardFile:
          company.companyDetails?.panCardFile || company.panCardFile || "",
        gstin: company.companyDetails?.gstin || company.gstin || "",
        aadharCardNumber:
          company.companyDetails?.aadharCardNumber ||
          company.aadharCardNumber ||
          "",
        aadharCardFile:
          company.companyDetails?.aadharCardFile ||
          company.aadharCardFile ||
          "",
        bankDetails: {
          bankName:
            company.companyDetails?.bankName ||
            company.bankDetails?.bankName ||
            "",
          accountNumber:
            company.companyDetails?.bankAccountNumber ||
            company.bankDetails?.accountNumber ||
            "",
          accountHolderName:
            company.companyDetails?.accountHolderName ||
            company.bankDetails?.accountHolderName ||
            "",
          branchName:
            company.companyDetails?.branchName ||
            company.bankDetails?.branchName ||
            "",
          ifscCode:
            company.companyDetails?.ifscCode ||
            company.bankDetails?.ifscCode ||
            "",
        },
        cancelChequeOrPassbookImage:
          company.companyDetails?.chequeOrStatementFile ||
          company.cancelChequeOrPassbookImage ||
          "",
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

  const getFormControls = () => {
    const companyType =
      formData.basicInformation?.companyType ||
      company?.basicInformation?.companyType ||
      company?.companyType;

    return companyType === "privateCompany"
      ? corporateFormControls
      : formControlsForIndividual;
  };

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
                formControls={basicCorporateInformation}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Additional Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Company Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={basicInformationControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* SPOC Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              SPOC Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={spocInformationControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Company Type Specific Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {formData.basicInformation?.companyType === "privateCompany"
                ? "Private Limited Company Details"
                : "Individual Company Details"}
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={getFormControls()}
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
                formControls={formControlsBankDetails}
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
