import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { validateFormData } from "@/utils/commonFunctions";
import {
  trainingController1,
  trainingController2,
  trainingController3,
  trainingMode,
  trainingAddress,
} from "@/config";
import { z } from "zod";
import { toast } from "sonner";

// Validation schema matching the training creation form
const editTrainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  skills: z.array(z.string()).default([]),

  // mode/frequency as free strings
  trainingMode: z.string().optional().nullable().default(""),
  sessionFrequency: z.string().optional().nullable().default(""),

  // numeric fields
  totalDurationDays: z.number().int().nonnegative().default(0),
  hoursPerDay: z.number().nonnegative().default(0),

  minimumExperience: z.string().optional().nullable().default(""),
  subjectMatterExpertise: z.string().optional().nullable().default(""),
  qualificationsRequired: z.string().optional().nullable().default(""),

  // certificationUpload as URL or filename
  certificationUpload: z.string().optional().nullable().default(""),

  sessionsExpected: z.number().int().nonnegative().default(0),

  travelRequired: z.boolean().default(false),
  languagesFluent: z.array(z.string()).default([]),

  participantsPerBatch: z.number().int().nonnegative().default(0),

  studyMaterialsProvided: z.boolean().default(false),
  demoSessionBeforeConfirming: z.boolean().default(false),
  recommendationsFromPastClients: z.boolean().default(false),

  // Address fields for in-person/hybrid training
  currentAddress: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
});

const EditTrainingForm = ({ training, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    trainingMode: "",
    sessionFrequency: "",
    totalDurationDays: 0,
    hoursPerDay: 0,
    minimumExperience: "",
    subjectMatterExpertise: "",
    qualificationsRequired: "",
    certificationUpload: "",
    sessionsExpected: 0,
    travelRequired: false,
    languagesFluent: [],
    participantsPerBatch: 0,
    studyMaterialsProvided: false,
    demoSessionBeforeConfirming: false,
    recommendationsFromPastClients: false,
    currentAddress: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with training data
  useEffect(() => {
    if (training) {
      setFormData({
        title: training.title || "",
        description: training.description || "",
        skills: training.skills || [],
        trainingMode: training.trainingMode || "",
        sessionFrequency: training.sessionFrequency || "",
        totalDurationDays: training.totalDurationDays || 0,
        hoursPerDay: training.hoursPerDay || 0,
        minimumExperience: training.minimumExperience || "",
        subjectMatterExpertise: training.subjectMatterExpertise || "",
        qualificationsRequired: training.qualificationsRequired || "",
        certificationUpload: training.certificationUpload || "",
        sessionsExpected: training.sessionsExpected || 0,
        travelRequired:
          training.travelRequired === true
            ? "yes"
            : training.travelRequired === false
            ? "no"
            : "",
        languagesFluent: training.languagesFluent || [],
        participantsPerBatch: training.participantsPerBatch || 0,
        studyMaterialsProvided:
          training.studyMaterialsProvided === true
            ? "yes"
            : training.studyMaterialsProvided === false
            ? "no"
            : "",
        demoSessionBeforeConfirming:
          training.demoSessionBeforeConfirming === true
            ? "yes"
            : training.demoSessionBeforeConfirming === false
            ? "no"
            : "",
        recommendationsFromPastClients:
          training.recommendationsFromPastClients === true
            ? "yes"
            : training.recommendationsFromPastClients === false
            ? "no"
            : "",
        currentAddress: {
          address: training.currentAddress?.address || training.address || "",
          city: training.currentAddress?.city || training.city || "",
          state: training.currentAddress?.state || training.state || "",
          pincode: training.currentAddress?.pincode || training.pincode || "",
        },
      });
    }
  }, [training]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload = { ...formData };

      // Convert boolean fields from "yes"/"no" to boolean
      const booleanFields = [
        "travelRequired",
        "studyMaterialsProvided",
        "demoSessionBeforeConfirming",
        "recommendationsFromPastClients",
      ];
      booleanFields.forEach((field) => {
        payload[field] = formData[field] === "yes";
      });

      // Convert numeric fields
      payload.totalDurationDays = Number(payload.totalDurationDays);
      payload.hoursPerDay = Number(payload.hoursPerDay);
      payload.sessionsExpected = Number(payload.sessionsExpected);
      payload.participantsPerBatch = Number(payload.participantsPerBatch);

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
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Training</h2>
          <p className="text-gray-600 mt-1">Update training information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Training Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Training Basic Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainingController1}
                formData={formData}
                setFormData={setFormData}
              />
              <CommonForm
                formControls={trainingMode}
                formData={formData}
                setFormData={setFormData}
              />

              {/* Training Address - only show for in-person/hybrid */}
              {(formData?.trainingMode === "In-person / On-site" ||
                formData?.trainingMode === "Hybrid") && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-4">
                    Training Location
                  </h4>
                  <CommonForm
                    formControls={trainingAddress}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Training Schedule & Requirements */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Training Schedule & Requirements
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainingController2}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Additional Training Details */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Additional Training Details
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={trainingController3}
                formData={formData}
                setFormData={setFormData}
              />
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

export default EditTrainingForm;
