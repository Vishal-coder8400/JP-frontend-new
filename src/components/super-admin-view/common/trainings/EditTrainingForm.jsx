import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { validateFormData } from "@/utils/commonFunctions";
import { z } from "zod";
import { toast } from "sonner";

// Validation schema with only fields displayed in TrainingDetailsDrawer
const editTrainingSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  responsibilities: z.string().optional(), // Will be converted to array
  minimumEducation: z.string().optional(),
  minimumExperience: z.string().optional(),
  trainingMode: z.string().optional(),
  sessionFrequency: z.string().optional(),
  totalDurationDays: z.number().optional(),
  hoursPerDay: z.string().optional(), // Keep as string for display
  participantsPerBatch: z.number().optional(),
  subjectMatterExpertise: z.string().optional(),
  qualificationsRequired: z.string().optional(),
  travelRequired: z.boolean().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  requiredSkills: z.string().optional(), // Will be converted to array
  skills: z.string().optional(), // Will be converted to array
  technicalSkills: z.string().optional(), // Will be converted to array
  languagesFluent: z.string().optional(), // Will be converted to array
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
          { id: "daily", label: "Daily" },
          { id: "alternateDays", label: "Alternate Days" },
          { id: "weekly", label: "Weekly" },
          { id: "monthly", label: "Monthly" },
          { id: "quarterly", label: "Quarterly" },
          { id: "halfYearly", label: "Half-yearly" },
          { id: "yearly", label: "Yearly" },
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
        placeholder: "e.g. 4 hours",
        componentType: "input",
        type: "text",
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
          { id: "high", label: "High" },
          { id: "moderate", label: "Moderate" },
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
];

const trainingAdditionalInfo = [
  {
    name: "travelRequired",
    label: "Travel Required",
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
    hoursPerDay: "",
    participantsPerBatch: 0,
    subjectMatterExpertise: "",
    qualificationsRequired: "",
    travelRequired: false,
    contactEmail: "",
    requiredSkills: "",
    skills: "",
    technicalSkills: "",
    languagesFluent: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with training data
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
        hoursPerDay: training.hoursPerDay || "",
        participantsPerBatch: training.participantsPerBatch || 0,
        subjectMatterExpertise: training.subjectMatterExpertise || "",
        qualificationsRequired: training.qualificationsRequired || "",
        travelRequired: training.travelRequired || false,
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
      // Transform form data to match API expectations
      const payload = {
        ...formData,
        // Convert string arrays back to arrays
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
        // Convert numeric fields
        totalDurationDays: formData.totalDurationDays
          ? Number(formData.totalDurationDays)
          : undefined,
        participantsPerBatch: formData.participantsPerBatch
          ? Number(formData.participantsPerBatch)
          : undefined,
      };

      // Remove empty fields
      Object.keys(payload).forEach((key) => {
        if (
          payload[key] === "" ||
          payload[key] === undefined ||
          payload[key] === null
        ) {
          delete payload[key];
        }
      });

      const isValid = validateFormData(editTrainingSchema, payload);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Call the save function passed from parent
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
              <CommonForm
                formControls={trainingBasicInfo}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Training Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Training Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainingDetails}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainingAdditionalInfo}
                formData={formData}
                setFormData={setFormData}
              />
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
