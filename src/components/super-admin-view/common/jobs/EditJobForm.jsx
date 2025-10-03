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
import { validateFormData } from "@/utils/commonFunctions";
import { jobController1, jobController2, walkinAdress } from "@/config";
import { z } from "zod";
import { toast } from "sonner";

// Validation schema matching the job creation form
const editJobSchema = z
  .object({
    jobTitle: z
      .string({ required_error: "Job title is required" })
      .min(1, "Job title cannot be empty"),

    jobType: z.enum(["Full-Time", "Part-Time", "Both", "Night-Time"], {
      errorMap: () => ({ message: "Select a valid job type" }),
    }),

    workingHours: z
      .string({ required_error: "Working hours are required" })
      .min(1, "Working hours cannot be empty"),

    workingDays: z
      .string({ required_error: "Working days are required" })
      .min(1, "Working days cannot be empty"),

    isSundayWorking: z.boolean({
      required_error: "Please specify if Sunday is working or not",
    }),

    officeLocation: z
      .string({ required_error: "Office location is required" })
      .min(1, "Office location cannot be empty"),

    city: z
      .string({ required_error: "City is required" })
      .min(1, "City cannot be empty"),

    state: z
      .string({ required_error: "State is required" })
      .min(1, "State cannot be empty"),

    pincode: z
      .string({ required_error: "Pincode is required" })
      .regex(/^\d{6}$/, "Pincode must be a 6-digit number"),

    modeOfWork: z.enum(["Work from Office", "Work from Home", "Hybrid"], {
      errorMap: () => ({ message: "Select a valid mode of work" }),
    }),

    experienceLevel: z
      .string({ required_error: "Experience level is required" })
      .min(1, "Experience level cannot be empty"),

    genderPreference: z.enum(["Male", "Female", "Any"], {
      errorMap: () => ({ message: "Select a valid gender preference" }),
    }),

    minimumEducation: z
      .string({ required_error: "Minimum education is required" })
      .min(1, "Minimum education cannot be empty"),

    englishLevel: z.enum(["basic", "moderate", "fluent"], {
      errorMap: () => ({ message: "Select a valid English level" }),
    }),

    regionalLanguageRequired: z.boolean({
      required_error: "Please specify if regional language is required",
    }),

    preferredAgeRange: z
      .string({ required_error: "Preferred age range is required" })
      .regex(
        /^\d{2}-\d{2}$/,
        "Age range must be in format 'xx-yy' (e.g., 22-35)"
      ),

    salaryRange: z
      .object({
        min: z.number().min(1, "Minimum salary is required"),
        max: z.number().min(1, "Maximum salary is required"),
      })
      .refine((data) => parseInt(data.min, 10) <= parseInt(data.max, 10), {
        message: "Minimum salary cannot be greater than maximum salary",
        path: ["min"],
      }),

    twoWheelerMandatory: z.boolean({
      required_error: "Please specify if two-wheeler is mandatory",
    }),

    jobDescription: z
      .string({ required_error: "Job description is required" })
      .min(50, "Job description must be at least 50 characters"),

    isWalkInInterview: z.boolean({
      required_error: "Please specify if it's a walk-in interview",
    }),

    // These fields are optional by default
    walkInDate: z.string().optional(),
    walkInTime: z.string().optional(),
    walkInAddress: z.string().optional(),
    spocName: z.string().optional(),
    spocNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Only validate these if isWalkInInterview is true
    if (data.isWalkInInterview) {
      if (!data.walkInDate?.trim()) {
        ctx.addIssue({
          path: ["walkInDate"],
          message: "Date is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.walkInTime?.trim()) {
        ctx.addIssue({
          path: ["walkInTime"],
          message: "Time is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.walkInAddress?.trim()) {
        ctx.addIssue({
          path: ["walkInAddress"],
          message: "Address is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.spocName?.trim()) {
        ctx.addIssue({
          path: ["spocName"],
          message: "Name is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!/^\d{10}$/.test(data.spocNumber || "")) {
        ctx.addIssue({
          path: ["spocNumber"],
          message: "Phone number must be exactly 10 digits",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const EditJobForm = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    workingHours: "",
    workingDays: "",
    isSundayWorking: "",
    officeLocation: "",
    city: "",
    state: "",
    pincode: "",
    modeOfWork: "",
    experienceLevel: "",
    genderPreference: "",
    minimumEducation: "",
    englishLevel: "",
    regionalLanguageRequired: "",
    preferredAgeRange: "",
    requiredSkills: [],
    salaryRange: {
      min: "",
      max: "",
    },
    twoWheelerMandatory: "",
    jobDescription: "",
    isWalkInInterview: "",
    walkInDate: "",
    walkInTime: "",
    walkInAddress: "",
    spocName: "",
    spocNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with job data
  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || job.title || "",
        jobType: job.jobType || "",
        workingHours: job.workingHours || "",
        workingDays: job.workingDays || "",
        isSundayWorking:
          job.isSundayWorking === true
            ? "yes"
            : job.isSundayWorking === false
            ? "no"
            : "",
        officeLocation: job.officeLocation || job.location || "",
        city: job.city || "",
        state: job.state || "",
        pincode: job.pincode || "",
        modeOfWork: job.modeOfWork || "",
        experienceLevel: job.experienceLevel || "",
        genderPreference: job.genderPreference || "",
        minimumEducation: job.minimumEducation || "",
        englishLevel: job.englishLevel || "",
        regionalLanguageRequired:
          job.regionalLanguageRequired === true
            ? "yes"
            : job.regionalLanguageRequired === false
            ? "no"
            : "",
        preferredAgeRange: job.preferredAgeRange || "",
        requiredSkills: job.requiredSkills || [],
        salaryRange: {
          min: job.salaryRange?.min || job.minSalary || "",
          max: job.salaryRange?.max || job.maxSalary || "",
        },
        twoWheelerMandatory:
          job.twoWheelerMandatory === true
            ? "yes"
            : job.twoWheelerMandatory === false
            ? "no"
            : "",
        jobDescription: job.jobDescription || job.description || "",
        isWalkInInterview:
          job.isWalkInInterview === true
            ? "yes"
            : job.isWalkInInterview === false
            ? "no"
            : "",
        walkInDate: job.walkInDate || "",
        walkInTime: job.walkInTime || "",
        walkInAddress: job.walkInAddress || "",
        spocName: job.spocName || "",
        spocNumber: job.spocNumber || "",
      });
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload = { ...formData };

      // Convert boolean fields from "yes"/"no" to boolean
      const booleanFields = [
        "isWalkInInterview",
        "twoWheelerMandatory",
        "regionalLanguageRequired",
        "isSundayWorking",
      ];
      booleanFields.forEach((field) => {
        payload[field] = formData[field] === "yes";
      });

      // Convert salary range to numbers
      payload.salaryRange = {
        min: Number(payload.salaryRange.min),
        max: Number(payload.salaryRange.max),
      };

      const isValid = validateFormData(editJobSchema, payload);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Call the save function passed from parent
      if (onSave) {
        await onSave(payload);
      }

      toast.success("Job updated successfully!");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Job</h2>
          <p className="text-gray-600 mt-1">Update job information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              Job Basic Information
            </h3>
            <div className="space-y-4">
              <CommonForm
                formControls={jobController1}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Job Requirements */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Job Requirements</h3>
            <div className="space-y-4">
              <CommonForm
                formControls={jobController2}
                formData={formData}
                setFormData={setFormData}
              />

              {/* Walk-in Interview Details */}
              {formData?.isWalkInInterview === "yes" && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-4">
                    Walk-in Interview Details
                  </h4>
                  <CommonForm
                    formControls={walkinAdress}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              )}
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

export default EditJobForm;
