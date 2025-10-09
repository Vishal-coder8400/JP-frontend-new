import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";

const FieldError = ({ error }) => {
  if (!error) return null;
  return (
    <p className="text-red-500 text-sm mt-1">
      {Array.isArray(error) ? error[0] : error}
    </p>
  );
};

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
  skills: z.array(z.string()).optional(),
  technicalSkills: z.array(z.string()).optional(),
  languagesFluent: z.array(z.string()).optional(),
  sessionsExpected: z.number().optional(),
  studyMaterialsProvided: z.boolean().optional(),
  demoSessionBeforeConfirming: z.boolean().optional(),
  recommendationsFromPastClients: z.boolean().optional(),
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
    label: "Key Responsibilities (one per line)",
    placeholder: "Enter key responsibilities, one per line",
    componentType: "textarea",
    rows: 4,
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
        options: [
          { id: "10th Pass", label: "10th Pass" },
          { id: "12th Pass", label: "12th Pass" },
          { id: "Diploma", label: "Diploma" },
          { id: "Graduate", label: "Graduate" },
          { id: "Postgraduate", label: "Postgraduate" },
        ],
      },
      {
        name: "minimumExperience",
        label: "Experience Level",
        componentType: "select",
        placeholder: "Select experience",
        options: [
          { id: "Fresher", label: "Fresher" },
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
        name: "trainingMode",
        label: "Mode of Training",
        componentType: "select",
        placeholder: "Select mode",
        options: [
          { id: "Online", label: "Online" },
          { id: "Virtual / Online", label: "Virtual / Online" },
          { id: "In-person / On-site", label: "In-person / On-site" },
          { id: "Hybrid", label: "Hybrid" },
        ],
      },
      {
        name: "sessionFrequency",
        label: "Session Frequency",
        componentType: "select",
        placeholder: "Select frequency",
        options: [
          { id: "Daily", label: "Daily" },
          { id: "Alternate Days", label: "Alternate Days" },
          { id: "Weekly", label: "Weekly" },
          { id: "Monthly", label: "Monthly" },
          { id: "Quarterly", label: "Quarterly" },
          { id: "Half-yearly", label: "Half-yearly" },
          { id: "Yearly", label: "Yearly" },
        ],
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
    label: "Required Skills (comma separated)",
    placeholder: "Enter required skills separated by commas",
    componentType: "textarea",
    rows: 2,
  },
  {
    name: "skills",
    label: "Skills (comma separated)",
    placeholder: "Enter skills separated by commas",
    componentType: "textarea",
    rows: 2,
  },
  {
    name: "technicalSkills",
    label: "Technical Skills (comma separated)",
    placeholder: "Enter technical skills separated by commas",
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
    skills: "",
    technicalSkills: "",
    languagesFluent: "",
  });

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

  useEffect(() => {
    if (training) {
      setFormData({
        title: training.title || "",
        description: training.description || "",
        responsibilities: Array.isArray(training.responsibilities)
          ? training.responsibilities.join("\n")
          : training.responsibilities || "",
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
        travelRequired: training.travelRequired || false,
        studyMaterialsProvided: training.studyMaterialsProvided || false,
        demoSessionBeforeConfirming:
          training.demoSessionBeforeConfirming || false,
        recommendationsFromPastClients:
          training.recommendationsFromPastClients || false,
        contactEmail: training.contactEmail || "",
        requiredSkills: Array.isArray(training.requiredSkills)
          ? training.requiredSkills.join(", ")
          : training.requiredSkills || "",
        skills: Array.isArray(training.skills)
          ? training.skills.join(", ")
          : training.skills || "",
        technicalSkills: Array.isArray(training.technicalSkills)
          ? training.technicalSkills.join(", ")
          : training.technicalSkills || "",
        languagesFluent: Array.isArray(training.languagesFluent)
          ? training.languagesFluent.join(", ")
          : training.languagesFluent || "",
      });
    }
  }, [training]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      setFieldErrors({});

      const payload = {
        ...formData,
        responsibilities: formData.responsibilities
          ? formData.responsibilities.split("\n").filter((item) => item.trim())
          : [],
        requiredSkills: formData.requiredSkills
          ? formData.requiredSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill)
          : [],
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill)
          : [],
        technicalSkills: formData.technicalSkills
          ? formData.technicalSkills
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

      const validationResult = validateFormData(payload, editTrainingSchema);
      if (!validationResult.isValid) {
        setFieldErrors(validationResult.errors || {});
        toast.error("Please fix validation errors");
        setIsSubmitting(false);
        return;
      }

      if (onSave) {
        await onSave(payload);
      }

      toast.success("Training updated successfully!");
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
              {trainingAdditionalInfo.map((control) => (
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
