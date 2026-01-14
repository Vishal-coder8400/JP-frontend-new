import { useState, useEffect } from "react";
import CommonForm from "../../../common/form";
import ButtonComponent from "../../../common/button";
import FieldError from "../../../common/FieldError";
import { toast } from "sonner";
import { useGetDropdownValues } from "../../../../hooks/super-admin/useDropdowns";
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
    row: [
      {
        name: "minSalary",
        label: "Min Salary (LPA)",
        placeholder: "e.g. 4",
        componentType: "input",
        type: "number",
      },
      {
        name: "maxSalary",
        label: "Max Salary (LPA)",
        placeholder: "e.g. 6",
        componentType: "input",
        type: "number",
      },
    ],
  },
  {
    name: "numberOfOpenings",
    label: "Number of Openings",
    placeholder: "e.g. 5",
    componentType: "input",
    type: "number",
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
    label: "Required Skills",
    componentType: "multi-select",
    max: 10,
    options: [],
  },
  {
    name: "spocName",
    label: "Contact Person Name",
    placeholder: "Enter contact person name",
    componentType: "input",
    type: "text",
  },
  {
    name: "spocNumber",
    label: "Contact Person Number",
    placeholder: "Enter contact person number",
    componentType: "input",
    type: "text",
  },
  {
    name: "workingDays",
    label: "Working Days",
    placeholder: "e.g. Monday to Friday",
    componentType: "input",
    type: "text",
  },
  {
    name: "isSundayWorking",
    label: "Is Sunday Working",
    componentType: "checkbox",
  },
  {
    name: "englishLevel",
    label: "English Level",
    componentType: "select",
    placeholder: "Select English level",
    options: [], // Will be populated dynamically
  },
  {
    name: "preferredAgeRange",
    label: "Preferred Age Range",
    placeholder: "e.g. 25-35",
    componentType: "input",
    type: "text",
  },
  {
    name: "twoWheelerMandatory",
    label: "Two Wheeler Mandatory",
    componentType: "checkbox",
  },
  {
    name: "isWalkInInterview",
    label: "Is Walk-In Interview",
    componentType: "checkbox",
  },
  {
    row: [
      {
        name: "walkInDate",
        label: "Walk-In Date",
        componentType: "input",
        type: "date",
      },
      {
        name: "walkInTime",
        label: "Walk-In Time",
        placeholder: "e.g. 10:00 AM",
        componentType: "input",
        type: "text",
      },
    ],
  },
  {
    name: "walkInAddress",
    label: "Walk-In Address",
    placeholder: "Enter walk-in address",
    componentType: "textarea",
    rows: 2,
  },
];

const EditJobForm = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    jobDescription: "",
    minimumEducation: "",
    experienceLevel: "",
    modeOfWork: "",
    modeOfInterview: "",
    officeLocation: "",
    city: "",
    state: "",
    minSalary: "",
    maxSalary: "",
    numberOfOpenings: "",
    workingHours: "",
    genderPreference: "",
    regionalLanguageRequired: false,
    requiredSkills: [],
    spocName: "",
    spocNumber: "",
    workingDays: "",
    isSundayWorking: false,
    englishLevel: "",
    preferredAgeRange: "",
    twoWheelerMandatory: false,
    isWalkInInterview: false,
    walkInDate: "",
    walkInTime: "",
    walkInAddress: "",
  });

  // Fetch language proficiency dropdown values
  const { data: languageProficiencyDropdown } = useGetDropdownValues(
    "language-proficiency-level"
  );
  const languageProficiencyOptions =
    languageProficiencyDropdown?.data?.values?.map((item) => ({
      id: item.value,
      label: item.label,
    })) || [];

  // Fetch expertise area dropdown values
  const { data: skillDropdownData } = useGetDropdownValues("skills");
  const skillOptions =
    skillDropdownData?.data?.values?.map((item) => ({
      id: item._id,
      label: item.label,
    })) || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleFieldChange = (fieldNameOrUpdater, value) => {
    // Handle both function updater and direct field updates
    if (typeof fieldNameOrUpdater === "function") {
      // This is the function updater from CommonForm
      setFormData((prev) => {
        const newData = fieldNameOrUpdater(prev);

        // Check if isWalkInInterview was set to false and clear related fields
        if (newData.isWalkInInterview === false) {
          newData.walkInDate = "";
          newData.walkInTime = "";
          newData.walkInAddress = "";
        }

        return newData;
      });
    } else {
      // This is direct field update
      setFormData((prev) => {
        const newData = { ...prev, [fieldNameOrUpdater]: value };

        // If isWalkInInterview is set to false, clear walk-in related fields
        if (fieldNameOrUpdater === "isWalkInInterview" && !value) {
          newData.walkInDate = "";
          newData.walkInTime = "";
          newData.walkInAddress = "";
        }

        return newData;
      });

      if (fieldErrors[fieldNameOrUpdater]) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldNameOrUpdater];
          return newErrors;
        });
      }
    }
  };

  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || job.title || "",
        jobType: job.jobType || "",
        jobDescription: job.jobDescription || job.description || "",
        minimumEducation: job.minimumEducation || "",
        experienceLevel: job.experienceLevel || "",
        modeOfWork: job.modeOfWork || "",
        modeOfInterview: job.modeOfInterview || "",
        officeLocation: job.officeLocation || job.location || "",
        city: job.city || "",
        state: job.state || "",
        minSalary: job.salaryRange?.min || "",
        maxSalary: job.salaryRange?.max || "",
        numberOfOpenings: job.numberOfOpenings || "",
        workingHours: job.workingHours || "",
        genderPreference: job.genderPreference || "",
        regionalLanguageRequired: job.regionalLanguageRequired || false,
        requiredSkills: Array.isArray(job.requiredSkills)
          ? job.requiredSkills
          : [],
        spocName: job.spocName || "",
        spocNumber: job.spocNumber || "",
        workingDays: job.workingDays || "",
        isSundayWorking: job.isSundayWorking || false,
        englishLevel: job.englishLevel || "",
        preferredAgeRange: job.preferredAgeRange || "",
        twoWheelerMandatory: job.twoWheelerMandatory || false,
        isWalkInInterview: job.isWalkInInterview || false,
        walkInDate: job.walkInDate || "",
        walkInTime: job.walkInTime || "",
        walkInAddress: job.walkInAddress || "",
      });
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clear previous errors
      setFieldErrors({});

      const payload = {
        ...formData,
        requiredSkills: formData.requiredSkills.map((skill) => skill.id) || [],
      };

      if (formData.minSalary && formData.maxSalary) {
        payload.salaryRange = {
          min: parseFloat(formData.minSalary),
          max: parseFloat(formData.maxSalary),
          currency: "INR",
        };
      }

      delete payload.minSalary;
      delete payload.maxSalary;

      if (formData.numberOfOpenings !== "" && formData.numberOfOpenings !== undefined) {
        payload.numberOfOpenings = parseInt(formData.numberOfOpenings, 10);
      }

      // Remove empty/undefined values to keep payload clean
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
              {jobBasicInfo.map((control, index) => (
                <div key={control.name} className="flex flex-col gap-2">
                  <CommonForm
                    formControls={[control]}
                    formData={formData}
                    setFormData={handleFieldChange}
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
                              setFormData={handleFieldChange}
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
                        setFormData={handleFieldChange}
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
              {jobAdditionalInfo.map((control, index) => {
                // Handle row controls (like walk-in date/time)
                if (control.row) {
                  const isWalkInRow = control.row.some(
                    (item) =>
                      item.name === "walkInDate" ||
                      item.name === "walkInTime" ||
                      item.name === "walkInAddress"
                  );
                  const isDisabled = isWalkInRow && !formData.isWalkInInterview;

                  return (
                    <div
                      key={index}
                      className={`flex gap-[8px] w-full flex-wrap justify-end items-end ${
                        isDisabled ? "opacity-50 pointer-events-none" : ""
                      }`}
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
                              setFormData={handleFieldChange}
                            />
                            <FieldError error={fieldErrors[item.name]} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                // Handle individual controls
                const isWalkInField =
                  control.name === "walkInDate" ||
                  control.name === "walkInTime" ||
                  control.name === "walkInAddress";
                const isDisabled = isWalkInField && !formData.isWalkInInterview;

                // Update controls with dynamic options
                let updatedControl = control;
                if (control.name === "englishLevel") {
                  updatedControl = {
                    ...control,
                    options: languageProficiencyOptions,
                  };
                } else if (control.name === "requiredSkills") {
                  updatedControl = { ...control, options: skillOptions };
                }

                return (
                  <div key={control.name} className="flex flex-col gap-2">
                    <div
                      className={
                        isDisabled ? "opacity-50 pointer-events-none" : ""
                      }
                    >
                      <CommonForm
                        formControls={[updatedControl]}
                        formData={formData}
                        setFormData={handleFieldChange}
                      />
                    </div>
                    <FieldError error={fieldErrors[control.name]} />
                  </div>
                );
              })}
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
