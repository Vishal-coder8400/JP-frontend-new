import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";

// Error display component
const FieldError = ({ error }) => {
  if (!error) return null;
  return (
    <p className="text-red-500 text-sm mt-1">
      {Array.isArray(error) ? error[0] : error}
    </p>
  );
};

// Form controllers for job editing - only fields displayed in JobDetailsDrawer
const jobBasicInfo = [
  {
    name: "jobTitle",
    label: "Job Title",
    placeholder: "Enter job title",
    componentType: "input",
    type: "text",
  },
  {
    name: "jobType",
    label: "Job Type",
    componentType: "select",
    placeholder: "Select job type",
    options: [
      { id: "Full-Time", label: "Full-Time" },
      { id: "Part-Time", label: "Part-Time" },
      { id: "Both", label: "Both" },
      { id: "Night-Time", label: "Night-Time" },
    ],
  },
  {
    name: "jobDescription",
    label: "Job Description",
    placeholder: "Enter job description",
    componentType: "textarea",
    rows: 4,
  },
  {
    name: "keyResponsibilities",
    label: "Key Responsibilities (one per line)",
    placeholder: "Enter key responsibilities, one per line",
    componentType: "textarea",
    rows: 4,
  },
];

const jobDetails = [
  {
    row: [
      {
        name: "minimumEducation",
        label: "Education",
        componentType: "select",
        placeholder: "Select education",
        options: [
          { id: "10th Pass", label: "10th Pass" },
          { id: "12th Pass", label: "12th Pass" },
          { id: "Diploma", label: "Diploma" },
          { id: "Graduate", label: "Graduate" },
          { id: "Postgraduate", label: "Postgraduate" },
        ],
      },
      {
        name: "experienceLevel",
        label: "Experience Level",
        componentType: "select",
        placeholder: "Select experience",
        options: [
          { id: "0-1 year", label: "0-1 year" },
          { id: "1-2 year", label: "1-2 year" },
          { id: "2-3 years", label: "2-3 years" },
          { id: "3-4 years", label: "3-4 years" },
          { id: "4-5 years", label: "4-5 years" },
          { id: "5-7 years", label: "5-7 years" },
          { id: "7-10 years", label: "7-10 years" },
          { id: "10+ years", label: "10+ years" },
        ],
      },
    ],
  },
  {
    row: [
      {
        name: "modeOfWork",
        label: "Mode of Work",
        componentType: "select",
        placeholder: "Select mode",
        options: [
          { id: "Work from Office", label: "Work from Office" },
          { id: "Work from Home", label: "Work from Home" },
          { id: "Hybrid", label: "Hybrid" },
        ],
      },
      {
        name: "modeOfInterview",
        label: "Mode of Interview",
        placeholder: "e.g. Walk In, Online",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    row: [
      {
        name: "workingHours",
        label: "Working Hours",
        placeholder: "e.g. 8 hours/day",
        componentType: "input",
        type: "text",
      },
      {
        name: "genderPreference",
        label: "Gender Preference",
        componentType: "select",
        placeholder: "Select preference",
        options: [
          { id: "Male", label: "Male" },
          { id: "Female", label: "Female" },
          { id: "Any", label: "Any" },
        ],
      },
    ],
  },
  {
    name: "officeLocation",
    label: "Office Location",
    placeholder: "Enter office address",
    componentType: "textarea",
    rows: 2,
  },
  {
    row: [
      {
        name: "city",
        label: "City",
        placeholder: "Enter city",
        componentType: "input",
        type: "text",
      },
      {
        name: "state",
        label: "State",
        placeholder: "Enter state",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    name: "salaryRange",
    label: "Salary Range",
    placeholder: "e.g. ₹50,000 - ₹75,000",
    componentType: "input",
    type: "text",
  },
];

const jobAdditionalInfo = [
  {
    name: "regionalLanguageRequired",
    label: "Regional Language Required",
    componentType: "checkbox",
  },
  {
    name: "requiredSkills",
    label: "Required Skills (comma separated)",
    placeholder: "Enter required skills separated by commas",
    componentType: "textarea",
    rows: 2,
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    placeholder: "Enter contact email",
    componentType: "input",
    type: "email",
  },
];

// Validation schema - all fields are optional since BE accepts all optional
const editJobSchema = z.object({
  jobTitle: z.string().optional(),
  jobType: z.string().optional(),
  jobDescription: z.string().optional(),
  keyResponsibilities: z.array(z.string()).optional(),
  minimumEducation: z.string().optional(),
  experienceLevel: z.string().optional(),
  modeOfWork: z.string().optional(),
  modeOfInterview: z.string().optional(),
  officeLocation: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  salaryRange: z.string().optional(),
  workingHours: z.string().optional(),
  genderPreference: z.string().optional(),
  regionalLanguageRequired: z.boolean().optional(),
  requiredSkills: z.array(z.string()).optional(),
  contactEmail: z.string().optional(), // Removed email validation since BE accepts any string
});

const EditJobForm = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    jobDescription: "",
    keyResponsibilities: "",
    minimumEducation: "",
    experienceLevel: "",
    modeOfWork: "",
    modeOfInterview: "",
    officeLocation: "",
    city: "",
    state: "",
    salaryRange: "",
    workingHours: "",
    genderPreference: "",
    regionalLanguageRequired: false,
    requiredSkills: "",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear field error when user starts typing
  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Populate form with job data
  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || job.title || "",
        jobType: job.jobType || "",
        jobDescription: job.jobDescription || job.description || "",
        keyResponsibilities: Array.isArray(job.keyResponsibilities)
          ? job.keyResponsibilities.join("\n")
          : job.keyResponsibilities || "",
        minimumEducation: job.minimumEducation || "",
        experienceLevel: job.experienceLevel || "",
        modeOfWork: job.modeOfWork || "",
        modeOfInterview: job.modeOfInterview || "",
        officeLocation: job.officeLocation || job.location || "",
        city: job.city || "",
        state: job.state || "",
        salaryRange: job.salaryRange || "",
        workingHours: job.workingHours || "",
        genderPreference: job.genderPreference || "",
        regionalLanguageRequired: job.regionalLanguageRequired || false,
        requiredSkills: Array.isArray(job.requiredSkills)
          ? job.requiredSkills.join(", ")
          : job.requiredSkills || "",
        contactEmail: job.contactEmail || "",
      });
    }
  }, [job]);

  const transformFormDataToPayload = (formData) => {
    return {
      jobTitle: formData.jobTitle || undefined,
      jobType: formData.jobType || undefined,
      jobDescription: formData.jobDescription || undefined,
      keyResponsibilities: formData.keyResponsibilities
        ? formData.keyResponsibilities.split("\n").filter((item) => item.trim())
        : undefined,
      minimumEducation: formData.minimumEducation || undefined,
      experienceLevel: formData.experienceLevel || undefined,
      modeOfWork: formData.modeOfWork || undefined,
      modeOfInterview: formData.modeOfInterview || undefined,
      officeLocation: formData.officeLocation || undefined,
      city: formData.city || undefined,
      state: formData.state || undefined,
      salaryRange: formData.salaryRange || undefined,
      workingHours: formData.workingHours || undefined,
      genderPreference: formData.genderPreference || undefined,
      regionalLanguageRequired: formData.regionalLanguageRequired,
      requiredSkills: formData.requiredSkills
        ? formData.requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill)
        : undefined,
      contactEmail: formData.contactEmail || undefined,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clear previous errors
      setFieldErrors({});

      const payload = transformFormDataToPayload(formData);

      // Remove undefined values to keep payload clean
      Object.keys(payload).forEach((key) => {
        if (payload[key] === undefined || payload[key] === "") {
          delete payload[key];
        }
      });

      await onSave(payload);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Job</h2>
          <p className="text-gray-600">Update job information and details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Job Basic Information
            </h3>
            <div className="space-y-4">
              {jobBasicInfo.map((control, index) => (
                <div key={control.name} className="flex flex-col gap-2">
                  <CommonForm
                    formControls={[control]}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <FieldError error={fieldErrors[control.name]} />
                </div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Job Details
            </h3>
            <div className="space-y-4">
              {jobDetails.map((control, index) => {
                if (control.row) {
                  return (
                    <div
                      key={index}
                      className="flex gap-[8px] w-full flex-wrap justify-end items-end"
                    >
                      {control.row.map((item, i) => (
                        <div
                          key={item.name}
                          className="gap-[8px] flex-2/3 lg:flex-1"
                        >
                          <div className="flex flex-col gap-[8px]">
                            <CommonForm
                              formControls={[item]}
                              formData={formData}
                              setFormData={setFormData}
                            />
                            <FieldError error={fieldErrors[item.name]} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <div key={control.name} className="flex flex-col gap-2">
                      <CommonForm
                        formControls={[control]}
                        formData={formData}
                        setFormData={setFormData}
                      />
                      <FieldError error={fieldErrors[control.name]} />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              {jobAdditionalInfo.map((control, index) => (
                <div key={control.name} className="flex flex-col gap-2">
                  <CommonForm
                    formControls={[control]}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <FieldError error={fieldErrors[control.name]} />
                </div>
              ))}
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
              buttonText={isSubmitting ? "Updating..." : "Update Job"}
              isPending={isSubmitting}
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobForm;
