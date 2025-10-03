import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CommonForm from "@/components/common/form";
import Address from "@/components/common/address";
import UploadResume from "@/components/common/uploadResume";
import { useUpload } from "@/hooks/common/useUpload";
import { setNestedValue, validateFormData } from "@/utils/commonFunctions";
import {
  trainerFormControls1,
  kycBankFormControls,
  experienceFormControls,
  jobSeekerEducationFormControls,
  certificateFormControls,
} from "@/config";
import { z } from "zod";
import { toast } from "sonner";

// Validation schemas
const editTrainerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  profilePicture: z.string().optional(),

  phone: z.object({
    countryCode: z.string().min(1, "Country code is required"),
    number: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long"),
  }),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  currentAddress: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z
      .string()
      .min(6, "Pincode must be 6 digits")
      .max(6, "Pincode must be 6 digits"),
    state: z.string().min(1, "State is required"),
  }),

  permanentAddress: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z
      .string()
      .min(6, "Pincode must be 6 digits")
      .max(6, "Pincode must be 6 digits"),
    state: z.string().min(1, "State is required"),
  }),

  resume: z.string().optional(),

  panDetails: z.object({
    number: z.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
    image: z.string().optional(),
  }),

  aadharDetails: z.object({
    number: z.string().regex(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),
    image: z.string().optional(),
  }),

  bankDetails: z.object({
    accountNumber: z.string().min(6, "Account number is required"),
    accountHolderName: z.string().min(1, "Account holder name is required"),
    branchName: z.string().min(1, "Branch name is required"),
    ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  }),

  cancelChequeOrPassbookImage: z.string().optional(),

  // Experience fields
  expertiseLevel: z.string().min(1, "Expertise level is required"),
  totalYearsExperience: z.string().optional(),
  totalMonthsExperience: z.string().optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),

  WorkingDetails: z.object({
    companyName: z.string().min(1, "Company name is required"),
    designation: z.string().min(1, "Designation is required"),
    startDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "Start date must be a valid date"
      ),
    endDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "End date must be a valid date"
      ),
  }),

  relievingLetter: z.string().optional(),
  expertiseAreas: z
    .array(z.string().min(1))
    .min(1, "Select at least one area of expertise"),

  // Education fields
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        startDate: z
          .string()
          .refine(
            (val) => !isNaN(new Date(val).getTime()),
            "Start date must be a valid date"
          ),
        endDate: z
          .string()
          .refine(
            (val) => !isNaN(new Date(val).getTime()),
            "End date must be a valid date"
          ),
        document: z.string().optional(),
        fieldOfStudy: z.string().min(1, "Field of study is required"),
      })
    )
    .min(1, "At least one education entry is required"),

  // Certificate fields
  certificates: z
    .array(
      z.object({
        title: z.string().min(1, "Certificate title is required"),
        organisation: z.string().min(1, "Organisation name is required"),
        issueDate: z.string().min(1, "Issue date is required"),
        expiryDate: z.string().optional(),
      })
    )
    .min(1, "At least one certificate is required"),
});

const EditTrainerForm = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: "",
    phone: {
      countryCode: "+91",
      number: "",
    },
    email: "",
    currentAddress: {
      city: "",
      pincode: "",
      state: "",
      address: "",
    },
    permanentAddress: {
      city: "",
      pincode: "",
      state: "",
      address: "",
    },
    resume: "",
    panDetails: {
      number: "",
      image: "",
    },
    aadharDetails: {
      number: "",
      image: "",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      branchName: "",
      ifscCode: "",
    },
    cancelChequeOrPassbookImage: "",
    expertiseLevel: "",
    totalYearsExperience: "",
    totalMonthsExperience: "",
    linkedin: "",
    WorkingDetails: {
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
    },
    relievingLetter: "",
    expertiseAreas: [],
    education: [
      {
        degree: "",
        institution: "",
        studyType: "",
        startDate: "",
        endDate: "",
        document: "",
        fieldOfStudy: "",
      },
    ],
    certificates: [
      { title: "", organisation: "", issueDate: "", expiryDate: "" },
    ],
  });

  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: UploadImage } = useUpload();

  // Populate form with trainer data
  useEffect(() => {
    if (trainer) {
      setFormData({
        fullName:
          trainer.fullName || trainer.firstName + " " + trainer.lastName || "",
        profilePicture: trainer.profilePicture || trainer.profileImage || "",
        phone: {
          countryCode: trainer.phone?.countryCode || "+91",
          number: trainer.phone?.number || trainer.phone || "",
        },
        email: trainer.email || "",
        currentAddress: {
          city: trainer.currentAddress?.city || "",
          pincode: trainer.currentAddress?.pincode || "",
          state: trainer.currentAddress?.state || "",
          address: trainer.currentAddress?.address || "",
        },
        permanentAddress: {
          city: trainer.permanentAddress?.city || "",
          pincode: trainer.permanentAddress?.pincode || "",
          state: trainer.permanentAddress?.state || "",
          address: trainer.permanentAddress?.address || "",
        },
        resume: trainer.resume || "",
        panDetails: {
          number: trainer.panDetails?.number || "",
          image: trainer.panDetails?.image || "",
        },
        aadharDetails: {
          number: trainer.aadharDetails?.number || "",
          image: trainer.aadharDetails?.image || "",
        },
        bankDetails: {
          accountNumber: trainer.bankDetails?.accountNumber || "",
          accountHolderName: trainer.bankDetails?.accountHolderName || "",
          branchName: trainer.bankDetails?.branchName || "",
          ifscCode: trainer.bankDetails?.ifscCode || "",
        },
        cancelChequeOrPassbookImage: trainer.cancelChequeOrPassbookImage || "",
        expertiseLevel: trainer.expertiseLevel || "",
        totalYearsExperience: trainer.totalYearsExperience || "",
        totalMonthsExperience: trainer.totalMonthsExperience || "",
        linkedin: trainer.linkedin || "",
        WorkingDetails: {
          companyName: trainer.WorkingDetails?.companyName || "",
          designation: trainer.WorkingDetails?.designation || "",
          startDate: trainer.WorkingDetails?.startDate || "",
          endDate: trainer.WorkingDetails?.endDate || "",
        },
        relievingLetter: trainer.relievingLetter || "",
        expertiseAreas: trainer.expertiseAreas || trainer.expertise || [],
        education:
          trainer.education && trainer.education.length > 0
            ? trainer.education
            : [
                {
                  degree: "",
                  institution: "",
                  studyType: "",
                  startDate: "",
                  endDate: "",
                  document: "",
                  fieldOfStudy: "",
                },
              ],
        certificates:
          trainer.certificates && trainer.certificates.length > 0
            ? trainer.certificates
            : [{ title: "", organisation: "", issueDate: "", expiryDate: "" }],
      });
    }
  }, [trainer]);

  const handleUpload = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) {
          callback(fileUrl, fileName);
        }
      },
    });
  };

  const handleUpload2 = (file, callback) => {
    UploadImage(file, {
      onSuccess: (data) => {
        const fileUrl = data?.data?.fileUrl;
        const fileName = data?.data?.fileName;
        if (callback) {
          callback(fileUrl, fileName);
        }
      },
    });
  };

  const handleRemoveFile = () => {
    setFormData((prev) => setNestedValue(prev, "resume", ""));
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { ...formData };

      // Handle same address logic
      if (formData.sameAs) {
        payload.permanentAddress = { ...formData.currentAddress };
      }

      const isValid = validateFormData(editTrainerSchema, payload);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Call the save function passed from parent
      if (onSave) {
        await onSave(payload);
      }

      toast.success("Trainer updated successfully!");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      toast.error("Failed to update trainer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Trainer</h2>
          <p className="text-gray-600 mt-1">Update trainer information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainerFormControls1}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
              <Address setFormData={setFormData} formData={formData} />
              <UploadResume
                setFormData={setFormData}
                fileName={fileName}
                setFileName={setFileName}
                handleRemoveFile={handleRemoveFile}
                handleUpload={handleUpload2}
              />
            </div>
          </div>

          {/* KYC Verification */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">KYC Verification</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={kycBankFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={experienceFormControls}
                formData={formData}
                setFormData={setFormData}
                handleUpload={handleUpload}
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {formData.education.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {index > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newEducation = [...formData.education];
                          newEducation.splice(index, 1);
                          setFormData({ ...formData, education: newEducation });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <CommonForm
                    i={index}
                    formType="education"
                    formControls={jobSeekerEducationFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    handleUpload={handleUpload}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    education: [
                      ...formData.education,
                      {
                        degree: "",
                        institution: "",
                        studyType: "",
                        startDate: "",
                        endDate: "",
                        document: "",
                        fieldOfStudy: "",
                      },
                    ],
                  });
                }}
              >
                Add Education
              </Button>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-4">
              {formData.certificates.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {index > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Certificate {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCertificates = [...formData.certificates];
                          newCertificates.splice(index, 1);
                          setFormData({
                            ...formData,
                            certificates: newCertificates,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <CommonForm
                    formControls={certificateFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    key={index}
                    i={index}
                    formType="certificates"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    certificates: [
                      ...formData.certificates,
                      {
                        title: "",
                        organisation: "",
                        issueDate: "",
                        expiryDate: "",
                      },
                    ],
                  });
                }}
              >
                Add Certificate
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pb-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerForm;
