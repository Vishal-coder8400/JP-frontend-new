import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import FieldError from "../../../common/FieldError";
import { z } from "zod";
import { toast } from "sonner";
import { PlusIcon, XIcon } from "lucide-react";
import {
  JOB_TYPES,
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  WORK_MODES,
  GENDER_OPTIONS,
  INTERVIEW_MODES,
} from "@/constants/super-admin";

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
    options: JOB_TYPES,
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
    label: "Key Responsibilities",
    placeholder: "Enter key responsibility",
    componentType: "input",
    type: "text",
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
        options: EDUCATION_LEVELS,
      },
      {
        name: "experienceLevel",
        label: "Experience Level",
        componentType: "select",
        placeholder: "Select experience",
        options: EXPERIENCE_LEVELS,
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
        options: WORK_MODES,
      },
      {
        name: "modeOfInterview",
        label: "Mode of Interview",
        componentType: "select",
        placeholder: "Select interview mode",
        options: INTERVIEW_MODES,
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
        options: GENDER_OPTIONS,
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

  const [keyResponsibilitiesList, setKeyResponsibilitiesList] = useState([]);
  const [currentResponsibility, setCurrentResponsibility] = useState("");

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

  // Add responsibility to the list
  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setKeyResponsibilitiesList((prev) => [
        ...prev,
        currentResponsibility.trim(),
      ]);
      setCurrentResponsibility("");
    }
  };

  // Remove responsibility from the list
  const removeResponsibility = (index) => {
    setKeyResponsibilitiesList((prev) => prev.filter((_, i) => i !== index));
  };

  // Populate form with job data
  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || job.title || "",
        jobType: job.jobType || "",
        jobDescription: job.jobDescription || job.description || "",
        keyResponsibilities: "",
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

      // Populate responsibilities list
      if (Array.isArray(job.keyResponsibilities)) {
        setKeyResponsibilitiesList(job.keyResponsibilities);
      } else if (job.keyResponsibilities) {
        setKeyResponsibilitiesList([job.keyResponsibilities]);
      }
    }
  }, [job]);

  const transformFormDataToPayload = (formData) => {
    return {
      jobTitle: formData.jobTitle || undefined,
      jobType: formData.jobType || undefined,
      jobDescription: formData.jobDescription || undefined,
      keyResponsibilities:
        keyResponsibilitiesList.length > 0
          ? keyResponsibilitiesList
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
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="w-full p-6">
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
              {jobBasicInfo.map((control, index) => {
                if (control.name === "keyResponsibilities") {
                  return (
                    <div key={control.name} className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        {control.label}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={control.placeholder}
                          value={currentResponsibility}
                          onChange={(e) =>
                            setCurrentResponsibility(e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addResponsibility();
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <ButtonComponent
                          type="button"
                          color="#6945ED"
                          buttonText="Add"
                          onClick={addResponsibility}
                          className="flex items-center gap-2"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </ButtonComponent>
                      </div>
                      {keyResponsibilitiesList.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {keyResponsibilitiesList.map(
                            (responsibility, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border"
                              >
                                <span className="text-sm text-gray-700">
                                  {responsibility}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeResponsibility(idx)}
                                  className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      <FieldError error={fieldErrors[control.name]} />
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
