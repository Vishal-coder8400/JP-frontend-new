import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import FieldError from "@/components/common/FieldError";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";
import { PlusIcon, XIcon } from "lucide-react";
import ButtonComponent from "@/components/common/button";
import {
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  TRAINING_MODES,
  SESSION_FREQUENCIES,
} from "@/constants/super-admin";

const editTrainingSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  minimumEducation: z.string().optional(),
  minimumExperience: z.string().optional(),
  trainingMode: z.string().optional(),
  sessionFrequency: z.string().optional(),
  totalDurationDays: z.number().optional(),
  hoursPerDay: z.number().optional(),
  participantsPerBatch: z.number().optional(),
  subjectMatterExpertise: z.string().optional(),
  qualificationsRequired: z.string().optional(),
  travelRequired: z.boolean().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  requiredSkills: z.array(z.string()).optional(),
  languagesFluent: z.array(z.string()).optional(),
  sessionsExpected: z.number().optional(),
  studyMaterialsProvided: z.boolean().optional(),
  demoSessionBeforeConfirming: z.boolean().optional(),
  recommendationsFromPastClients: z.boolean().optional(),
  postedBy: z
    .object({
      currentAddress: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
});

// Form controllers for the simplified training form
const trainingBasicInfo = [
  {
    name: "title",
    label: "Training Title",
    placeholder: "Enter training title",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Training Description",
    placeholder: "Enter training description",
    componentType: "textarea",
    rows: 4,
  },
  {
    name: "responsibilities",
    label: "Key Responsibilities",
    placeholder: "Enter key responsibility",
    componentType: "input",
    type: "text",
  },
];

const trainingDetails = [
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
        name: "minimumExperience",
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
        name: "trainingMode",
        label: "Mode of Training",
        componentType: "select",
        placeholder: "Select mode",
        options: TRAINING_MODES,
      },
      {
        name: "sessionFrequency",
        label: "Session Frequency",
        componentType: "select",
        placeholder: "Select frequency",
        options: SESSION_FREQUENCIES,
      },
    ],
  },
  {
    row: [
      {
        name: "totalDurationDays",
        label: "Total Duration (days)",
        placeholder: "Enter duration",
        componentType: "input",
        type: "number",
      },
      {
        name: "hoursPerDay",
        label: "Hours Per Day",
        placeholder: "Enter hours",
        componentType: "input",
        type: "number",
      },
    ],
  },
  {
    row: [
      {
        name: "participantsPerBatch",
        label: "Participants Per Batch",
        placeholder: "Enter number",
        componentType: "input",
        type: "number",
      },
      {
        name: "subjectMatterExpertise",
        label: "Subject Matter Expertise",
        componentType: "select",
        placeholder: "Select level",
        options: [
          { id: "Beginner", label: "Beginner" },
          { id: "Intermediate", label: "Intermediate" },
          { id: "Advanced", label: "Advanced" },
          { id: "Expert", label: "Expert" },
        ],
      },
    ],
  },
  {
    name: "qualificationsRequired",
    label: "Qualifications Required",
    placeholder: "Enter qualifications",
    componentType: "input",
    type: "text",
  },
  {
    name: "sessionsExpected",
    label: "Sessions Expected",
    placeholder: "Enter number of sessions",
    componentType: "input",
    type: "number",
  },
];

const trainingAdditionalInfo = [
  {
    name: "travelRequired",
    label: "Travel Required",
    componentType: "checkbox",
  },
  {
    name: "studyMaterialsProvided",
    label: "Study Materials Provided",
    componentType: "checkbox",
  },
  {
    name: "demoSessionBeforeConfirming",
    label: "Demo Session Before Confirming",
    componentType: "checkbox",
  },
  {
    name: "recommendationsFromPastClients",
    label: "Recommendations From Past Clients",
    componentType: "checkbox",
  },
  {
    name: "requiredSkills",
    label: "What skills should the trainer have?",
    placeholder: "Enter required skills separated by commas",
    componentType: "textarea",
    rows: 2,
  },
  {
    name: "languagesFluent",
    label: "Languages Fluent (comma separated)",
    placeholder: "Enter languages separated by commas",
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

const trainingAddressInfo = [
  {
    name: "currentAddress",
    label: "Address",
    placeholder: "Enter address",
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
      {
        name: "pincode",
        label: "Pin Code",
        placeholder: "Enter pin code",
        componentType: "input",
        type: "text",
      },
    ],
  },
];

const EditTrainingForm = ({ training, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    minimumEducation: "",
    minimumExperience: "",
    trainingMode: "",
    sessionFrequency: "",
    totalDurationDays: 0,
    hoursPerDay: 0,
    participantsPerBatch: 0,
    subjectMatterExpertise: "",
    qualificationsRequired: "",
    sessionsExpected: 0,
    travelRequired: false,
    studyMaterialsProvided: false,
    demoSessionBeforeConfirming: false,
    recommendationsFromPastClients: false,
    contactEmail: "",
    requiredSkills: "",
    languagesFluent: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [responsibilitiesList, setResponsibilitiesList] = useState([]);
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

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

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setResponsibilitiesList((prev) => [
        ...prev,
        currentResponsibility.trim(),
      ]);
      setCurrentResponsibility("");
    }
  };

  const removeResponsibility = (index) => {
    setResponsibilitiesList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (training) {
      // Clear any existing field errors when loading training data
      setFieldErrors({});

      setFormData({
        title: training.title || "",
        description: training.description || "",
        responsibilities: "",
        minimumEducation: training.minimumEducation || "",
        minimumExperience: training.minimumExperience || "",
        trainingMode: training.trainingMode || "",
        sessionFrequency: training.sessionFrequency || "",
        totalDurationDays: training.totalDurationDays || 0,
        hoursPerDay: training.hoursPerDay || 0,
        participantsPerBatch: training.participantsPerBatch || 0,
        subjectMatterExpertise: training.subjectMatterExpertise || "",
        qualificationsRequired: training.qualificationsRequired || "",
        sessionsExpected: training.sessionsExpected || 0,
        travelRequired:
          training.travelRequired === true ||
          training.travelRequired === "true",
        studyMaterialsProvided:
          training.studyMaterialsProvided === true ||
          training.studyMaterialsProvided === "true",
        demoSessionBeforeConfirming:
          training.demoSessionBeforeConfirming === true ||
          training.demoSessionBeforeConfirming === "true",
        recommendationsFromPastClients:
          training.recommendationsFromPastClients === true ||
          training.recommendationsFromPastClients === "true",
        contactEmail: training.contactEmail || "",
        requiredSkills: Array.isArray(training.requiredSkills)
          ? training.requiredSkills.join(", ")
          : training.requiredSkills || "",
        languagesFluent: Array.isArray(training.languagesFluent)
          ? training.languagesFluent.join(", ")
          : training.languagesFluent || "",
        currentAddress: training.postedBy?.currentAddress || "",
        city: training.postedBy?.city || "",
        state: training.postedBy?.state || "",
        pincode: training.postedBy?.pincode || "",
      });

      if (Array.isArray(training.responsibilities)) {
        setResponsibilitiesList(training.responsibilities);
      } else if (training.responsibilities) {
        setResponsibilitiesList([training.responsibilities]);
      }
    }
  }, [training]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      setFieldErrors({});

      const { currentAddress, city, state, pincode, ...restFormData } =
        formData;

      const payload = {
        ...restFormData,
        responsibilities:
          responsibilitiesList.length > 0 ? responsibilitiesList : undefined,
        requiredSkills: formData.requiredSkills
          ? formData.requiredSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill)
          : [],
        languagesFluent: formData.languagesFluent
          ? formData.languagesFluent
              .split(",")
              .map((lang) => lang.trim())
              .filter((lang) => lang)
          : [],
        totalDurationDays: formData.totalDurationDays
          ? Number(formData.totalDurationDays)
          : undefined,
        hoursPerDay: formData.hoursPerDay
          ? Number(formData.hoursPerDay)
          : undefined,
        participantsPerBatch: formData.participantsPerBatch
          ? Number(formData.participantsPerBatch)
          : undefined,
        sessionsExpected: formData.sessionsExpected
          ? Number(formData.sessionsExpected)
          : undefined,
        postedBy: {
          ...(currentAddress && { currentAddress }),
          ...(city && { city }),
          ...(state && { state }),
          ...(pincode && { pincode }),
        },
      };

      Object.keys(payload).forEach((key) => {
        if (
          payload[key] === "" ||
          payload[key] === undefined ||
          payload[key] === null
        ) {
          delete payload[key];
        }
      });

      if (Object.keys(payload.postedBy || {}).length === 0) {
        delete payload.postedBy;
      }

      const validationResult = validateFormData(editTrainingSchema, payload);

      if (!validationResult.isValid) {
        setFieldErrors(validationResult.errors || {});
        toast.error("Please fix validation errors");
        setIsSubmitting(false);
        return;
      }

      if (onSave) {
        await onSave(payload);
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error updating training:", error);
      toast.error("Failed to update training");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Edit Training
          </h2>
          <p className="text-gray-600">
            Update training information and details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Training Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Training Basic Information
            </h3>
            <div className="space-y-4">
              {trainingBasicInfo.map((control) => {
                if (control.name === "responsibilities") {
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
                      {responsibilitiesList.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {responsibilitiesList.map((responsibility, idx) => (
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
                          ))}
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

          {/* Training Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Training Details
            </h3>
            <div className="space-y-4">
              {trainingDetails.map((control, index) => {
                if (control.row) {
                  return (
                    <div
                      key={index}
                      className="flex gap-[8px] w-full flex-wrap justify-end items-end"
                    >
                      {control.row.map((item) => (
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
              {/* Checkbox fields in a horizontal grid */}
              <div className="grid grid-cols-2 gap-4">
                {trainingAdditionalInfo
                  .filter((control) => control.componentType === "checkbox")
                  .map((control) => (
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

              {/* Other fields */}
              {trainingAdditionalInfo
                .filter((control) => control.componentType !== "checkbox")
                .map((control) => (
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

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Address Information
            </h3>
            <div className="space-y-4">
              {trainingAddressInfo.map((control, index) => {
                if (control.row) {
                  return (
                    <div
                      key={index}
                      className="flex gap-[8px] w-full flex-wrap justify-end items-end"
                    >
                      {control.row.map((item) => (
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

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#6945ED] hover:bg-[#5a3dd1] text-white"
            >
              {isSubmitting ? "Updating..." : "Update Training"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainingForm;
