import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { useUploadFile } from "../../../../hooks/super-admin/useUploadFile";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";

const EditRecruiterForm = ({ recruiter, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: uploadFile } = useUploadFile();
  const { data: dropdownData } = useGetDropdownValues("industries");

  const sectorOptions =
    dropdownData?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];

  const { data: expertiseDropdownData } =
    useGetDropdownValues("expertise-area");

  const expertiseOptions =
    expertiseDropdownData?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];

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
    {
      name: "permanentAddress.address",
      label: "Permanent Address",
      placeholder: "Enter Permanent Address",
      componentType: "textarea",
      type: "text",
    },
    {
      row: [
        {
          name: "permanentAddress.city",
          label: "",
          placeholder: "Enter City",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "permanentAddress.state",
          label: "",
          placeholder: "Enter State",
          componentType: "input",
          type: "text",
          width: "1/3",
        },
        {
          name: "permanentAddress.pincode",
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
      name: "documents.resume",
      label: "Resume",
      placeholder: "Upload Resume",
      componentType: "file",
      accept: "pdf",
    },
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
      options: sectorOptions,
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
      label: "Experience in",
      componentType: "multi-select",
      max: 3,
      options: expertiseOptions,
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
    {
      name: "monthlyClosures",
      label: "Monthly Closures",
      componentType: "input",
      type: "number",
      placeholder: "Enter monthly closures",
    },
    {
      name: "whyYouWantToJoin",
      label: "Why do you want to join?",
      componentType: "textarea",
      placeholder: "Enter your reason for wanting to join",
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
      name: "isMedicalProblem",
      label: "Do you have any medical problem?",
      componentType: "selection",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },
    {
      name: "medicalProblemDetails",
      label: "Medical Problem Details",
      componentType: "textarea",
      placeholder: "Enter medical problem details",
      disabled: !(formData.isMedicalProblem === "yes"),
    },
    {
      name: "howDidYouKnowAboutThisJob",
      label: "How did you know about this job?",
      componentType: "textarea",
      placeholder: "Enter how you came to know about this job",
    },
  ];

  const kycFields = [
    {
      name: "kycDetails.panDetails.number",
      label: "PAN Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter PAN Number",
    },
    {
      name: "kycDetails.aadharDetails.number",
      label: "Aadhaar Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter Aadhaar Number",
    },
  ];

  const bankDetailsFields = [
    {
      name: "kycDetails.bankDetails.accountNumber",
      label: "Account Number",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Number",
    },
    {
      name: "kycDetails.bankDetails.accountHolderName",
      label: "Account Holder Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Holder Name",
    },
    {
      name: "kycDetails.bankDetails.bankName",
      label: "Bank Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter Bank Name",
    },
    {
      name: "kycDetails.bankDetails.ifscCode",
      label: "IFSC Code",
      componentType: "input",
      type: "text",
      placeholder: "Enter IFSC Code",
    },
    {
      name: "kycDetails.bankDetails.accountType",
      label: "Account Type",
      componentType: "input",
      type: "text",
      placeholder: "Enter Account Type",
    },
  ];

  useEffect(() => {
    if (recruiter) {
      const medicalDetails = recruiter.medicalProblemDetails || "";
      const hasMedicalProblem = medicalDetails && medicalDetails.length > 0;

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
        permanentAddress: recruiter.permanentAddress || {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
        documents: recruiter.documents || {
          resume: "",
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
        isMedicalProblem: hasMedicalProblem ? "yes" : "no",
        medicalProblemDetails: medicalDetails,
        kycDetails: recruiter.kycDetails || {
          panDetails: {
            number: "",
          },
          aadharDetails: {
            number: "",
          },
          bankDetails: {
            accountNumber: "",
            accountHolderName: "",
            bankName: "",
            ifscCode: "",
            accountType: "",
          },
        },
        monthlyClosures: recruiter.monthlyClosures || "",
        references: (() => {
          const existingRefs = recruiter.references || [];
          const emptyRef = {
            name: "",
            contactNo: "",
            organization: "",
            designation: "",
          };
          return [existingRefs[0] || emptyRef, existingRefs[1] || emptyRef];
        })(),
        whyYouWantToJoin: recruiter.whyYouWantToJoin || "",
        howDidYouKnowAboutThisJob: recruiter.howDidYouKnowAboutThisJob || "",
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

  const updateReference = (index, field, value) => {
    setFormData((prev) => {
      const currentRefs = prev.references || [];
      const updatedRefs = [...currentRefs];
      while (updatedRefs.length < 2) {
        updatedRefs.push({
          name: "",
          contactNo: "",
          organization: "",
          designation: "",
        });
      }
      updatedRefs[index] = {
        ...updatedRefs[index],
        [field]: value,
      };
      return {
        ...prev,
        references: updatedRefs.slice(0, 2),
      };
    });
  };

  const getValueOrNull = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "string" && value.trim() === "") return null;
    if (Array.isArray(value) && value.length === 0) return null;
    return value;
  };

  const transformFormDataToPayload = (formData) => {
    const payload = {
      firstName: getValueOrNull(formData.firstName) ?? null,
      lastName: getValueOrNull(formData.lastName) ?? null,
      email: getValueOrNull(formData.email) ?? null,
      phone: formData.phone
        ? {
            number: getValueOrNull(formData.phone.number) ?? null,
            countryCode: formData.phone.countryCode || "+91",
          }
        : { number: null, countryCode: "+91" },
      profileImage: getValueOrNull(formData.profileImage) ?? null,
      location:
        formData.currentAddress?.city && formData.currentAddress?.state
          ? `${formData.currentAddress.city}, ${formData.currentAddress.state}`
          : formData.currentAddress?.city ||
            formData.currentAddress?.state ||
            null,
      lastOrganization: {
        name: getValueOrNull(formData.lastOrganization?.name) ?? null,
        position: getValueOrNull(formData.lastOrganization?.position) ?? null,
      },
      totalExperience:
        formData.totalExperience && formData.totalExperience !== ""
          ? typeof formData.totalExperience === "string"
            ? parseFloat(formData.totalExperience)
            : formData.totalExperience
          : null,
      experienceLevel:
        formData.experienceLevel && formData.experienceLevel.length > 0
          ? formData.experienceLevel.map((item) =>
              typeof item === "string" ? item : item.id || item.value
            )
          : null,
      sectorSpecialization:
        formData.sectorSpecialization &&
        formData.sectorSpecialization.length > 0
          ? formData.sectorSpecialization.map((item) =>
              typeof item === "string" ? item : item.id || item.value
            )
          : null,
      linkedinProfile: getValueOrNull(formData.linkedinProfile) ?? null,
      monthlyClosures:
        formData.monthlyClosures && formData.monthlyClosures !== ""
          ? typeof formData.monthlyClosures === "string"
            ? parseInt(formData.monthlyClosures, 10)
            : formData.monthlyClosures
          : null,
      currentAddress: formData.currentAddress
        ? {
            address: getValueOrNull(formData.currentAddress.address) ?? null,
            city: getValueOrNull(formData.currentAddress.city) ?? null,
            state: getValueOrNull(formData.currentAddress.state) ?? null,
            pincode: getValueOrNull(formData.currentAddress.pincode) ?? null,
          }
        : {
            address: null,
            city: null,
            state: null,
            pincode: null,
          },
      permanentAddress: formData.permanentAddress
        ? {
            address: getValueOrNull(formData.permanentAddress.address) ?? null,
            city: getValueOrNull(formData.permanentAddress.city) ?? null,
            state: getValueOrNull(formData.permanentAddress.state) ?? null,
            pincode: getValueOrNull(formData.permanentAddress.pincode) ?? null,
          }
        : {
            address: null,
            city: null,
            state: null,
            pincode: null,
          },
      documents: formData.documents
        ? {
            resume: getValueOrNull(formData.documents.resume) ?? null,
            panCard: getValueOrNull(formData.documents.panCard) ?? null,
            aadharCard: getValueOrNull(formData.documents.aadharCard) ?? null,
            cancelledCheque:
              getValueOrNull(formData.documents.cancelledCheque) ?? null,
            relievingLetter:
              getValueOrNull(formData.documents.relievingLetter) ?? null,
            latestQualification:
              getValueOrNull(formData.latestQualification) ?? null,
          }
        : {
            resume: null,
            panCard: null,
            aadharCard: null,
            cancelledCheque: null,
            relievingLetter: null,
            latestQualification: null,
          },
      fatherName: getValueOrNull(formData.fatherName) ?? null,
      motherName: getValueOrNull(formData.motherName) ?? null,
      medicalProblemDetails:
        formData.medicalProblemDetails && formData.medicalProblemDetails.trim()
          ? formData.medicalProblemDetails
          : null,
      howDidYouKnowAboutThisJob:
        getValueOrNull(formData.howDidYouKnowAboutThisJob) ?? null,
      whyYouWantToJoin: getValueOrNull(formData.whyYouWantToJoin) ?? null,
      kycDetails: formData.kycDetails
        ? {
            panDetails: {
              number:
                getValueOrNull(formData.kycDetails.panDetails?.number) ?? null,
            },
            aadharDetails: {
              number:
                getValueOrNull(formData.kycDetails.aadharDetails?.number) ??
                null,
            },
            bankDetails: formData.kycDetails.bankDetails
              ? {
                  accountNumber:
                    getValueOrNull(
                      formData.kycDetails.bankDetails.accountNumber
                    ) ?? null,
                  accountHolderName:
                    getValueOrNull(
                      formData.kycDetails.bankDetails.accountHolderName
                    ) ?? null,
                  bankName:
                    getValueOrNull(formData.kycDetails.bankDetails.bankName) ??
                    null,
                  ifscCode:
                    getValueOrNull(formData.kycDetails.bankDetails.ifscCode) ??
                    null,
                  accountType:
                    getValueOrNull(
                      formData.kycDetails.bankDetails.accountType
                    ) ?? null,
                }
              : {
                  accountNumber: null,
                  accountHolderName: null,
                  bankName: null,
                  ifscCode: null,
                  accountType: null,
                },
          }
        : {
            panDetails: {
              number: null,
            },
            aadharDetails: {
              number: null,
            },
            bankDetails: {
              accountNumber: null,
              accountHolderName: null,
              bankName: null,
              ifscCode: null,
              accountType: null,
            },
          },
      references: (() => {
        const refs = formData.references || [];
        const paddedRefs = [...refs];
        while (paddedRefs.length < 2) {
          paddedRefs.push({
            name: null,
            contactNo: null,
            organization: null,
            designation: null,
          });
        }
        return paddedRefs.slice(0, 2).map((ref) => ({
          name: getValueOrNull(ref?.name) ?? null,
          contactNo: getValueOrNull(ref?.contactNo) ?? null,
          organization: getValueOrNull(ref?.organization) ?? null,
          designation: getValueOrNull(ref?.designation) ?? null,
        }));
      })(),
    };

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

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              KYC Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={kycFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bank Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={bankDetailsFields}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              References
            </h3>
            <div className="space-y-4">
              {[0, 1].map((index) => {
                const ref = formData.references?.[index] || {
                  name: "",
                  contactNo: "",
                  organization: "",
                  designation: "",
                };
                return (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg space-y-3"
                  >
                    <h4 className="text-sm font-semibold text-gray-700">
                      Reference #{index + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={ref.name || ""}
                        onChange={(e) =>
                          updateReference(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Contact No"
                        value={ref.contactNo || ""}
                        onChange={(e) =>
                          updateReference(index, "contactNo", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Organization"
                        value={ref.organization || ""}
                        onChange={(e) =>
                          updateReference(index, "organization", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Designation"
                        value={ref.designation || ""}
                        onChange={(e) =>
                          updateReference(index, "designation", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                );
              })}
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
