import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import FieldError from "@/components/common/FieldError";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";
import ButtonComponent from "@/components/common/button";
import {
  EXPERIENCE_LEVELS,
  TRAINING_MODES,
  SESSION_FREQUENCIES,
} from "@/constants/super-admin";
import { useDropDown } from "@/hooks/common/useDropDown";
import { useGetDropdownValues } from "@/hooks/super-admin/useDropdowns";

const editTrainingSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  minimumExperience: z.string().optional(),
  trainingMode: z.string().optional(),
  sessionFrequency: z.string().optional(),
  totalDurationDays: z.number().optional(),
  hoursPerDay: z.number().optional(),
  participantsPerBatch: z.number().optional(),
  subjectMatterExpertise: z.string().optional(),
  qualificationsRequired: z.string().optional(),
  travelRequired: z.boolean().optional(),
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
];

const trainingDetails = [
  {
    name: "minimumExperience",
    label: "Experience Level",
    componentType: "select",
    placeholder: "Select experience",
    options: EXPERIENCE_LEVELS,
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
        label: "How many participants will be in each batch:",
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
    placeholder: "Select qualification",
    componentType: "select",
    options: [],
  },
  {
    name: "sessionsExpected",
    label: "Total Number of Sessions:",
    placeholder: "Enter number of sessions",
    componentType: "input",
    type: "number",
  },
];

const trainingAdditionalInfo = [
  {
    name: "travelRequired",
    label: "Will you cover travel/stay if the trainer needs to relocate:",
    componentType: "checkbox",
  },
  {
    name: "studyMaterialsProvided",
    label: "Do you expect the trainer to provide study materials or slides?",
    componentType: "checkbox",
  },
  {
    name: "demoSessionBeforeConfirming",
    label: "Would you like a demo session before confirming:",
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
    componentType: "multi-select",
    max: 10,
    options: [],
  },
  {
    name: "languagesFluent",
    label: "What languages should the trainer be fluent in?",
    placeholder: "Enter languages separated by commas",
    componentType: "textarea",
    rows: 2,
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
  const { data: educationLevelDropdown } = useDropDown("education-level");

  const educationLevelOptions =
    educationLevelDropdown?.data?.values?.map((item) => ({
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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
    requiredSkills: [],
    languagesFluent: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (training) {
      setFieldErrors({});

      setFormData({
        title: training.title || "",
        description: training.description || "",
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
        requiredSkills: Array.isArray(training.requiredSkills)
          ? training.requiredSkills
          : [],
        languagesFluent: Array.isArray(training.languagesFluent)
          ? training.languagesFluent.join(", ")
          : training.languagesFluent || "",
        currentAddress: training.postedBy?.currentAddress || "",
        city: training.postedBy?.city || "",
        state: training.postedBy?.state || "",
        pincode: training.postedBy?.pincode || "",
      });
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
        requiredSkills: Array.isArray(formData.requiredSkills)
          ? formData.requiredSkills.map((skill) =>
              typeof skill === "string" ? skill : skill.id || skill.value
            )
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
        // TODO: Uncomment this when BE is fixed
        // postedBy: {
        //   ...(currentAddress && { currentAddress }),
        //   ...(city && { city }),
        //   ...(state && { state }),
        //   ...(pincode && { pincode }),
        // },
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
              {trainingBasicInfo.map((control) => (
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
                  const finalControl =
                    control.name === "qualificationsRequired"
                      ? { ...control, options: educationLevelOptions }
                      : control;

                  return (
                    <div key={control.name} className="flex flex-col gap-2">
                      <CommonForm
                        formControls={[finalControl]}
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
                .map((control) => {
                  const finalControl =
                    control.name === "requiredSkills"
                      ? { ...control, options: expertiseOptions }
                      : control;

                  return (
                    <div key={control.name} className="flex flex-col gap-2">
                      <CommonForm
                        formControls={[finalControl]}
                        formData={formData}
                        setFormData={setFormData}
                      />
                      <FieldError error={fieldErrors[control.name]} />
                    </div>
                  );
                })}
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
